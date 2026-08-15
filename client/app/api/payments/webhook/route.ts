import crypto from "crypto";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

export const runtime = "nodejs";

type RazorpayPaymentEntity = {
  id?: string;
  order_id?: string;
  amount?: number;
  currency?: string;
  status?: string;
};

type RazorpayWebhookEvent = {
  entity?: string;
  event?: string;
  account_id?: string;
  created_at?: number;

  payload?: {
    payment?: {
      entity?: RazorpayPaymentEntity;
    };
  };
};

export async function POST(request: Request) {
  try {
    /*
     * IMPORTANT:
     *
     * Razorpay signature verification MUST use
     * the original raw request body.
     *
     * Do NOT use request.json() before verifying
     * the signature.
     */
    const rawBody = await request.text();

    if (!rawBody) {
      return NextResponse.json(
        {
          message: "Empty webhook body.",
        },
        {
          status: 400,
        }
      );
    }

    const webhookSecret =
      process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error(
        "RAZORPAY_WEBHOOK_SECRET is missing."
      );

      return NextResponse.json(
        {
          message:
            "Webhook is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const receivedSignature =
      request.headers.get(
        "x-razorpay-signature"
      );

    if (!receivedSignature) {
      return NextResponse.json(
        {
          message:
            "Missing Razorpay webhook signature.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Generate expected HMAC SHA256 signature
     * using the RAW request body.
     */
    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          webhookSecret
        )
        .update(rawBody, "utf8")
        .digest("hex");

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
        "utf8"
      );

    const receivedBuffer =
      Buffer.from(
        receivedSignature,
        "utf8"
      );

    /*
     * timingSafeEqual throws when buffers have
     * different lengths, so check first.
     */
    const signaturesMatch =
      expectedBuffer.length ===
        receivedBuffer.length &&
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    if (!signaturesMatch) {
      console.error(
        "INVALID RAZORPAY WEBHOOK SIGNATURE"
      );

      return NextResponse.json(
        {
          message:
            "Invalid webhook signature.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Parse JSON ONLY AFTER signature verification.
     */
    let event: RazorpayWebhookEvent;
    let payload: Prisma.InputJsonValue;

    try {
      payload =
        JSON.parse(
          rawBody
        ) as Prisma.InputJsonValue;

      event =
        payload as RazorpayWebhookEvent;
    } catch {
      return NextResponse.json(
        {
          message:
            "Invalid webhook JSON.",
        },
        {
          status: 400,
        }
      );
    }

    const eventId =
      request.headers.get(
        "x-razorpay-event-id"
      );

    if (!eventId) {
      return NextResponse.json(
        {
          message:
            "Missing Razorpay event ID.",
        },
        {
          status: 400,
        }
      );
    }

    const eventType =
      typeof event.event === "string"
        ? event.event
        : "";

    if (!eventType) {
      return NextResponse.json(
        {
          message:
            "Webhook event type is missing.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * We currently process payment events.
     */
    const supportedEvents = new Set([
      "payment.captured",
      "payment.failed",
    ]);

    /*
     * Store every valid Razorpay webhook event,
     * including events that we do not currently
     * process.
     *
     * This gives us an audit trail and protects
     * against duplicate event delivery.
     */
    try {
      await prisma.paymentWebhookEvent.create({
        data: {
          eventId,
          eventType,
          payload,
        },
      });
    } catch (error) {
      /*
       * A duplicate eventId means Razorpay has
       * delivered the same event again.
       *
       * Because eventId is UNIQUE in Prisma,
       * this is our idempotency protection.
       */
      if (
        isUniqueConstraintError(error)
      ) {
        const existingEvent =
          await prisma.paymentWebhookEvent.findUnique(
            {
              where: {
                eventId,
              },
              select: {
                processed: true,
              },
            }
          );

        if (existingEvent?.processed) {
          return NextResponse.json({
            success: true,
            duplicate: true,
            message:
              "Webhook event already processed.",
          });
        }

        /*
         * If the previous attempt created the
         * event but failed during processing,
         * we continue and retry processing it.
         */
      } else {
        console.error(
          "PAYMENT WEBHOOK EVENT CREATE ERROR:",
          error
        );

        return NextResponse.json(
          {
            message:
              "Unable to record webhook event.",
          },
          {
            status: 500,
          }
        );
      }
    }

    /*
     * Ignore unsupported events safely.
     *
     * The webhook was authenticated and recorded,
     * so return 200 rather than causing Razorpay
     * to retry it.
     */
    if (
      !supportedEvents.has(eventType)
    ) {
      await prisma.paymentWebhookEvent.update({
        where: {
          eventId,
        },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        ignored: true,
        event: eventType,
      });
    }

    /*
     * Extract the Razorpay payment entity.
     */
    const paymentEntity =
      event.payload?.payment?.entity;

    /*
     * Explicitly validate that the payment
     * entity exists before accessing its fields.
     */
    if (!paymentEntity) {
      console.error(
        "RAZORPAY WEBHOOK PAYMENT ENTITY MISSING",
        {
          eventId,
          eventType,
        }
      );

      return NextResponse.json(
        {
          message:
            "Payment entity is missing from webhook.",
        },
        {
          status: 400,
        }
      );
    }

    const razorpayPaymentId =
      paymentEntity.id || "";

    const razorpayOrderId =
      paymentEntity.order_id || "";

    if (
      !razorpayPaymentId ||
      !razorpayOrderId
    ) {
      console.error(
        "RAZORPAY WEBHOOK PAYMENT DATA MISSING",
        {
          eventId,
          eventType,
        }
      );

      return NextResponse.json(
        {
          message:
            "Payment information is missing from webhook.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Find OUR payment record using the
     * Razorpay order ID created by our server.
     */
    const payment =
      await prisma.payment.findUnique({
        where: {
          razorpayOrderId,
        },
      });

    if (!payment) {
      console.error(
        "PAYMENT RECORD NOT FOUND FOR WEBHOOK",
        {
          eventId,
          eventType,
          razorpayOrderId,
          razorpayPaymentId,
        }
      );

      /*
       * Do not mark this event as processed.
       *
       * A missing payment may indicate that the
       * event arrived before our local record or
       * that the event does not belong to us.
       */
      return NextResponse.json(
        {
          message:
            "Payment record not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Verify the payment belongs to the same
     * Razorpay order stored in our database.
     */
    if (
      payment.razorpayOrderId !==
      razorpayOrderId
    ) {
      return NextResponse.json(
        {
          message:
            "Payment order mismatch.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Handle payment.captured
     *
     * This is the successful payment event.
     */
    if (
      eventType ===
      "payment.captured"
    ) {
      /*
       * Do not downgrade or replace an already
       * completed payment.
       */
      if (
        payment.status.toUpperCase() ===
        "SUCCESS"
      ) {
        await prisma.paymentWebhookEvent.update({
          where: {
            eventId,
          },
          data: {
            processed: true,
            processedAt: new Date(),
          },
        });

        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          message:
            "Payment was already completed.",
        });
      }

      /*
       * Validate the Razorpay payment amount.
       */
      const expectedAmount =
        Math.round(
          payment.amount * 100
        );

      if (
        typeof paymentEntity.amount ===
          "number" &&
        paymentEntity.amount !==
          expectedAmount
      ) {
        console.error(
          "RAZORPAY WEBHOOK AMOUNT MISMATCH",
          {
            eventId,
            paymentId: payment.id,
            expectedAmount,
            receivedAmount:
              paymentEntity.amount,
          }
        );

        return NextResponse.json(
          {
            message:
              "Webhook payment amount mismatch.",
          },
          {
            status: 400,
          }
        );
      }

      /*
       * Validate currency.
       */
      if (
        paymentEntity.currency &&
        paymentEntity.currency !==
          "INR"
      ) {
        return NextResponse.json(
          {
            message:
              "Webhook payment currency mismatch.",
          },
          {
            status: 400,
          }
        );
      }

      /*
       * Payment + Enrollment + Webhook event
       * are updated atomically.
       */
      await prisma.$transaction(
        async (tx) => {
          await tx.payment.update({
            where: {
              id: payment.id,
            },
            data: {
              status: "SUCCESS",
              paymentMethod:
                "razorpay",
              razorpayPaymentId,
              transactionId:
                razorpayPaymentId,
            },
          });

          if (payment.courseId) {
            await tx.enrollment.upsert({
              where: {
                userId_courseId: {
                  userId:
                    payment.userId,
                  courseId:
                    payment.courseId,
                },
              },
              update: {},
              create: {
                userId:
                  payment.userId,
                courseId:
                  payment.courseId,
                progress: 0,
                completed: false,
              },
            });
          }

          await tx.paymentWebhookEvent.update({
            where: {
              eventId,
            },
            data: {
              processed: true,
              processedAt:
                new Date(),
            },
          });
        }
      );

      console.log(
        "RAZORPAY PAYMENT CAPTURED:",
        {
          eventId,
          razorpayOrderId,
          razorpayPaymentId,
          paymentId:
            payment.id,
          courseId:
            payment.courseId,
        }
      );

      return NextResponse.json({
        success: true,
        message:
          "Payment captured and course access granted.",
      });
    }

    /*
     * Handle payment.failed
     */
    if (
      eventType ===
      "payment.failed"
    ) {
      /*
       * IMPORTANT:
       *
       * A failed event must NEVER downgrade a
       * payment that has already been successfully
       * captured.
       */
      if (
        payment.status.toUpperCase() !==
        "SUCCESS"
      ) {
        await prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: "FAILED",
            paymentMethod:
              "razorpay",
            razorpayPaymentId,
          },
        });
      }

      await prisma.paymentWebhookEvent.update({
        where: {
          eventId,
        },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });

      console.log(
        "RAZORPAY PAYMENT FAILED:",
        {
          eventId,
          razorpayOrderId,
          razorpayPaymentId,
          paymentId:
            payment.id,
        }
      );

      return NextResponse.json({
        success: true,
        message:
          "Payment failure recorded.",
      });
    }

    /*
     * Safety fallback.
     */
    return NextResponse.json({
      success: true,
      message:
        "Webhook received.",
    });
  } catch (error) {
    console.error(
      "RAZORPAY WEBHOOK ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to process webhook.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * Prisma throws a known request error when
 * the unique eventId already exists.
 *
 * We intentionally keep this helper small so
 * the webhook route does not depend on Prisma's
 * internal error structure elsewhere.
 */
function isUniqueConstraintError(
  error: unknown
): boolean {
  if (
    typeof error !== "object" ||
    error === null
  ) {
    return false;
  }

  if (
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code === "P2002";
  }

  return false;
}