import { NextResponse } from "next/server";
import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

export const runtime = "nodejs";

type RazorpayPaymentEntity = {
  id?: unknown;
  order_id?: unknown;
  amount?: unknown;
  currency?: unknown;
  status?: unknown;
  method?: unknown;
};

type RazorpayWebhookPayload = {
  event?: unknown;
  payload?: {
    payment?: {
      entity?: RazorpayPaymentEntity;
    };
  };
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalize(value: unknown): string {
  return isNonEmptyString(value)
    ? value.trim().toUpperCase()
    : "";
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

function rupeesToPaise(amount: unknown): number | null {
  const rupees = Number(amount);

  if (!Number.isFinite(rupees) || rupees <= 0) {
    return null;
  }

  const paise = Math.round(rupees * 100);

  if (!Number.isSafeInteger(paise) || paise <= 0) {
    return null;
  }

  return paise;
}

function webhookAmountInPaise(amount: unknown): number | null {
  const paise = Number(amount);

  if (!Number.isSafeInteger(paise) || paise <= 0) {
    return null;
  }

  return paise;
}

function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  const expected = createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}

export async function POST(request: Request) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim();

    if (!webhookSecret) {
      console.error("RAZORPAY_WEBHOOK_SECRET is missing.");
      return errorResponse("Webhook is not configured.", 500);
    }

    // Never call request.json() before signature verification.
    const rawBody = await request.text();

    if (!rawBody) {
      return errorResponse("Empty webhook body.");
    }

    const signature = request.headers
      .get("x-razorpay-signature")
      ?.trim();

    if (!signature) {
      return errorResponse("Missing Razorpay webhook signature.");
    }

    if (
      !verifyWebhookSignature(
        rawBody,
        signature,
        webhookSecret
      )
    ) {
      console.error("Invalid Razorpay webhook signature.");
      return errorResponse("Invalid webhook signature.");
    }

    const eventId = request.headers
      .get("x-razorpay-event-id")
      ?.trim();

    if (!eventId) {
      return errorResponse("Missing Razorpay webhook event ID.");
    }

    let payload: RazorpayWebhookPayload;
    let eventPayload: Prisma.InputJsonValue;

    try {
      const parsed = JSON.parse(rawBody) as unknown;

      if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        return errorResponse("Invalid webhook payload.");
      }

      payload = parsed as RazorpayWebhookPayload;
      eventPayload = parsed as Prisma.InputJsonValue;
    } catch {
      return errorResponse("Invalid webhook JSON.");
    }

    const eventType = isNonEmptyString(payload.event)
      ? payload.event.trim()
      : "";

    if (!eventType) {
      return errorResponse("Webhook event type is missing.");
    }

    const paymentEntity = payload.payload?.payment?.entity;

    const razorpayPaymentId = isNonEmptyString(paymentEntity?.id)
      ? paymentEntity.id.trim()
      : null;

    const razorpayOrderId = isNonEmptyString(paymentEntity?.order_id)
      ? paymentEntity.order_id.trim()
      : null;

    // Save webhook event first. eventId is unique in Prisma.
    let webhookEvent:
      | {
          id: string;
          processed: boolean;
        }
      | null = null;

    try {
      webhookEvent = await prisma.paymentWebhookEvent.create({
        data: {
          eventId,
          eventType,
          razorpayOrderId,
          razorpayPaymentId,
          payload: eventPayload,
        },
        select: {
          id: true,
          processed: true,
        },
      });
    } catch (error) {
      if (!isUniqueConstraintError(error)) {
        console.error("Unable to create webhook event.", error);
        return errorResponse("Webhook processing failed.", 500);
      }

      webhookEvent = await prisma.paymentWebhookEvent.findUnique({
        where: { eventId },
        select: {
          id: true,
          processed: true,
        },
      });

      if (!webhookEvent) {
        return errorResponse("Webhook processing failed.", 500);
      }

      if (webhookEvent.processed) {
        return NextResponse.json(
          {
            success: true,
            duplicate: true,
            alreadyProcessed: true,
          },
          { status: 200 }
        );
      }
    }

    const isCapturedEvent =
      eventType === "payment.captured" ||
      eventType === "order.paid";

    const isFailedEvent = eventType === "payment.failed";

    // Audit unsupported events but do not grant course access.
    if (!isCapturedEvent && !isFailedEvent) {
      await prisma.paymentWebhookEvent.update({
        where: { id: webhookEvent.id },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });

      return NextResponse.json(
        {
          success: true,
          ignored: true,
          eventType,
        },
        { status: 200 }
      );
    }

    if (!razorpayPaymentId || !razorpayOrderId) {
      // Return 500 so Razorpay retries.
      return errorResponse("Payment information is missing.", 500);
    }

    const localPayment = await prisma.payment.findUnique({
      where: {
        razorpayOrderId,
      },
      select: {
        id: true,
        userId: true,
        courseId: true,
        amount: true,
        status: true,
        razorpayOrderId: true,
        razorpayPaymentId: true,
      },
    });

    if (!localPayment || !localPayment.courseId) {
      console.error("Local payment record not found.", {
        eventId,
        razorpayOrderId,
      });

      // Local payment may appear before Razorpay retries.
      return errorResponse("Payment record not found.", 500);
    }

    // Handle failed payment without changing a successful payment.
    if (isFailedEvent) {
      await prisma.$transaction(async (tx) => {
        await tx.$queryRaw(
          Prisma.sql`
            SELECT "id"
            FROM "PaymentWebhookEvent"
            WHERE "id" = ${webhookEvent.id}
            FOR UPDATE
          `
        );

        const currentEvent =
          await tx.paymentWebhookEvent.findUnique({
            where: { id: webhookEvent.id },
            select: { processed: true },
          });

        if (currentEvent?.processed) {
          return;
        }

        const currentPayment = await tx.payment.findUnique({
          where: { id: localPayment.id },
          select: {
            id: true,
            status: true,
            razorpayPaymentId: true,
          },
        });

        if (!currentPayment) {
          throw new Error("PAYMENT_NOT_FOUND");
        }

        if (normalize(currentPayment.status) !== "SUCCESS") {
          await tx.payment.update({
            where: { id: currentPayment.id },
            data: {
              status: "FAILED",
              paymentMethod: "razorpay",
              razorpayPaymentId:
                currentPayment.razorpayPaymentId ??
                razorpayPaymentId,
            },
          });
        }

        await tx.paymentWebhookEvent.update({
          where: { id: webhookEvent.id },
          data: {
            processed: true,
            processedAt: new Date(),
          },
        });
      });

      return NextResponse.json(
        {
          success: true,
          processed: true,
          eventType,
          message: "Payment failure recorded.",
        },
        { status: 200 }
      );
    }

    const webhookStatus = normalize(paymentEntity?.status);

    if (webhookStatus !== "CAPTURED") {
      return errorResponse("Payment is not captured.", 500);
    }

    const webhookCurrency = normalize(paymentEntity?.currency);

    if (webhookCurrency !== "INR") {
      return errorResponse("Unsupported payment currency.");
    }

    // Razorpay webhook amount is ALREADY in paise.
    const receivedAmountInPaise = webhookAmountInPaise(
      paymentEntity?.amount
    );

    if (receivedAmountInPaise === null) {
      return errorResponse("Invalid Razorpay payment amount.");
    }

    const course = await prisma.course.findUnique({
      where: {
        id: localPayment.courseId,
      },
      select: {
        id: true,
        price: true,
        isPremium: true,
      },
    });

    if (!course || !course.isPremium) {
      return errorResponse("Paid course not found.", 500);
    }

    const courseAmountInPaise = rupeesToPaise(course.price);
    const paymentAmountInPaise = rupeesToPaise(localPayment.amount);

    if (
      courseAmountInPaise === null ||
      paymentAmountInPaise === null ||
      courseAmountInPaise !== paymentAmountInPaise ||
      receivedAmountInPaise !== courseAmountInPaise
    ) {
      console.error("Razorpay amount verification failed.", {
        eventId,
        receivedAmountInPaise,
        courseAmountInPaise,
        paymentAmountInPaise,
      });

      return errorResponse("Payment amount mismatch.");
    }

    const paymentMethod = isNonEmptyString(paymentEntity?.method)
      ? paymentEntity.method.trim()
      : "razorpay";

    const result = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw(
        Prisma.sql`
          SELECT "id"
          FROM "PaymentWebhookEvent"
          WHERE "id" = ${webhookEvent.id}
          FOR UPDATE
        `
      );

      const currentEvent =
        await tx.paymentWebhookEvent.findUnique({
          where: { id: webhookEvent.id },
          select: { processed: true },
        });

      if (currentEvent?.processed) {
        return {
          duplicate: true,
          paymentId: localPayment.id,
          enrollmentId: null as string | null,
        };
      }

      const currentPayment = await tx.payment.findUnique({
        where: { id: localPayment.id },
        select: {
          id: true,
          userId: true,
          courseId: true,
          status: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
        },
      });

      if (!currentPayment || !currentPayment.courseId) {
        throw new Error("PAYMENT_NOT_FOUND");
      }

      if (currentPayment.razorpayOrderId !== razorpayOrderId) {
        throw new Error("ORDER_MISMATCH");
      }

      if (
        currentPayment.razorpayPaymentId &&
        currentPayment.razorpayPaymentId !== razorpayPaymentId
      ) {
        throw new Error("PAYMENT_ID_CONFLICT");
      }

      // Course access can be restored safely on duplicate events.
      const enrollment = await tx.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: currentPayment.userId,
            courseId: currentPayment.courseId,
          },
        },
        update: {},
        create: {
          userId: currentPayment.userId,
          courseId: currentPayment.courseId,
          progress: 0,
          completed: false,
        },
        select: {
          id: true,
        },
      });

      if (normalize(currentPayment.status) !== "SUCCESS") {
        await tx.payment.update({
          where: { id: currentPayment.id },
          data: {
            status: "SUCCESS",
            paymentMethod,
            razorpayPaymentId,
            transactionId: razorpayPaymentId,
          },
        });
      }

      await tx.paymentWebhookEvent.update({
        where: { id: webhookEvent.id },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });

      return {
        duplicate: false,
        paymentId: currentPayment.id,
        enrollmentId: enrollment.id,
      };
    });

    return NextResponse.json(
      {
        success: true,
        processed: true,
        duplicate: result.duplicate,
        paymentId: result.paymentId,
        enrollmentId: result.enrollmentId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Razorpay webhook error:", error);

    // HTTP 500 makes Razorpay retry the webhook.
    return errorResponse("Webhook processing failed.", 500);
  }
}