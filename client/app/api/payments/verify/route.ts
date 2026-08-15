import crypto from "crypto";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import razorpay from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          message: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof body !== "object" ||
      body === null
    ) {
      return NextResponse.json(
        {
          message: "Invalid payment data.",
        },
        {
          status: 400,
        }
      );
    }

    const data = body as Record<
      string,
      unknown
    >;

    const courseId =
      typeof data.courseId === "string"
        ? data.courseId
        : "";

    const razorpayOrderId =
      typeof data.razorpayOrderId === "string"
        ? data.razorpayOrderId
        : "";

    const razorpayPaymentId =
      typeof data.razorpayPaymentId === "string"
        ? data.razorpayPaymentId
        : "";

    const razorpaySignature =
      typeof data.razorpaySignature === "string"
        ? data.razorpaySignature
        : "";

    if (
      !courseId ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        {
          message:
            "Incomplete payment verification data.",
        },
        {
          status: 400,
        }
      );
    }

    const secret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.error(
        "RAZORPAY_KEY_SECRET is missing."
      );

      return NextResponse.json(
        {
          message:
            "Payment gateway is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * IMPORTANT:
     *
     * We find the payment using the order ID
     * stored by OUR server.
     */
    const payment =
      await prisma.payment.findUnique({
        where: {
          razorpayOrderId,
        },
      });

    if (!payment) {
      return NextResponse.json(
        {
          message:
            "Payment order not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Ensure the payment belongs to
     * the currently authenticated user.
     */
    if (payment.userId !== user.id) {
      return NextResponse.json(
        {
          message: "Access denied.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * Ensure the payment belongs to
     * the requested course.
     */
    if (payment.courseId !== courseId) {
      return NextResponse.json(
        {
          message:
            "Course does not match payment.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * If this payment was already successfully
     * processed, return success instead of
     * creating duplicate enrollment.
     */
    if (
      payment.status.toUpperCase() ===
        "SUCCESS" &&
      payment.razorpayPaymentId ===
        razorpayPaymentId
    ) {
      return NextResponse.json({
        success: true,
        message:
          "Payment was already verified.",
      });
    }

    /*
     * Prevent a different Razorpay payment ID
     * from being attached to an already completed
     * payment record.
     */
    if (
      payment.razorpayPaymentId &&
      payment.razorpayPaymentId !==
        razorpayPaymentId
    ) {
      return NextResponse.json(
        {
          message:
            "Payment record has already been processed.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * Fetch the course from our database.
     *
     * This lets us verify the server-side price.
     */
    const course =
      await prisma.course.findUnique({
        where: {
          id: courseId,
        },
        select: {
          id: true,
          title: true,
          price: true,
        },
      });

    if (!course) {
      return NextResponse.json(
        {
          message: "Course not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * The payment amount stored in our database
     * must match the current course price.
     *
     * We do NOT trust the frontend price.
     */
    if (payment.amount !== course.price) {
      console.error(
        "PAYMENT AMOUNT MISMATCH",
        {
          paymentId: payment.id,
          paymentAmount: payment.amount,
          coursePrice: course.price,
        }
      );

      return NextResponse.json(
        {
          message:
            "Payment amount does not match the course price.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Generate the expected HMAC signature.
     *
     * IMPORTANT:
     * Razorpay's signature is:
     *
     * HMAC_SHA256(
     *   order_id + "|" + payment_id,
     *   key_secret
     * )
     */
    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(
          `${razorpayOrderId}|${razorpayPaymentId}`
        )
        .digest("hex");

    /*
     * timingSafeEqual throws when the buffers
     * have different lengths.
     *
     * Therefore check length first.
     */
    const generatedBuffer =
      Buffer.from(
        generatedSignature,
        "utf8"
      );

    const receivedBuffer =
      Buffer.from(
        razorpaySignature,
        "utf8"
      );

    const signaturesMatch =
      generatedBuffer.length ===
        receivedBuffer.length &&
      crypto.timingSafeEqual(
        generatedBuffer,
        receivedBuffer
      );

    if (!signaturesMatch) {
      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: "FAILED",
        },
      });

      return NextResponse.json(
        {
          message:
            "Payment signature verification failed.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Optional additional Razorpay verification.
     *
     * Fetch the payment from Razorpay so that
     * the server can confirm the payment is linked
     * to the expected order and amount.
     */
    let razorpayPayment;

    try {
      razorpayPayment =
        await razorpay.payments.fetch(
          razorpayPaymentId
        );
    } catch (razorpayError) {
      console.error(
        "RAZORPAY PAYMENT FETCH ERROR:",
        razorpayError
      );

      return NextResponse.json(
        {
          message:
            "Unable to confirm payment status with Razorpay.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * Confirm Razorpay payment belongs to
     * the expected order.
     */
    if (
      razorpayPayment.order_id !==
      razorpayOrderId
    ) {
      return NextResponse.json(
        {
          message:
            "Razorpay payment does not belong to this order.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Confirm amount.
     *
     * Razorpay returns amount in paise.
     */
    const expectedAmountInPaise =
      Math.round(course.price * 100);

    if (
      razorpayPayment.amount !==
      expectedAmountInPaise
    ) {
      return NextResponse.json(
        {
          message:
            "Razorpay payment amount does not match the course price.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Currency should be INR for our courses.
     */
    if (
      razorpayPayment.currency !==
      "INR"
    ) {
      return NextResponse.json(
        {
          message:
            "Unsupported payment currency.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Do not unlock a course unless payment
     * is captured.
     *
     * Razorpay distinguishes authorized and
     * captured payments.
     */
    if (
      razorpayPayment.status !==
      "captured"
    ) {
      return NextResponse.json(
        {
          message:
            `Payment is not captured yet. Current status: ${razorpayPayment.status}`,
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Everything has passed verification.
     *
     * Update Payment + create Enrollment
     * atomically.
     */
    const result =
      await prisma.$transaction(
        async (tx) => {
          const updatedPayment =
            await tx.payment.update({
              where: {
                id: payment.id,
              },
              data: {
                status: "SUCCESS",
                paymentMethod: "razorpay",
                razorpayPaymentId,
                razorpaySignature,
                transactionId:
                  razorpayPaymentId,
              },
            });

          const enrollment =
            await tx.enrollment.upsert({
              where: {
                userId_courseId: {
                  userId: user.id,
                  courseId,
                },
              },
              update: {},
              create: {
                userId: user.id,
                courseId,
                progress: 0,
                completed: false,
              },
            });

          return {
            paymentId:
              updatedPayment.id,
            enrollmentId:
              enrollment.id,
          };
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Payment verified successfully. Course unlocked.",
      ...result,
    });
  } catch (error) {
    console.error(
      "VERIFY RAZORPAY PAYMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to verify payment.",
      },
      {
        status: 500,
      }
    );
  }
}