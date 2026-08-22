import crypto from "node:crypto";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import razorpay from "@/lib/razorpay";

export const runtime = "nodejs";

type VerifyBody = {
  courseId?: unknown;
  razorpayOrderId?: unknown;
  razorpayPaymentId?: unknown;
  razorpaySignature?: unknown;
};

type RazorpayPayment = {
  id?: unknown;
  order_id?: unknown;
  amount?: unknown;
  currency?: unknown;
  status?: unknown;
  method?: unknown;
  captured?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
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

function safeCompare(expected: string, received: string): boolean {
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(received, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

function verifyCheckoutSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`, "utf8")
    .digest("hex");

  return safeCompare(expected, signature);
}

function responseError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}

async function parseBody(request: Request): Promise<VerifyBody | null> {
  try {
    const parsed = (await request.json()) as unknown;

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return null;
    }

    return parsed as VerifyBody;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return responseError("Unauthorized.", 401);
    }

    const body = await parseBody(request);

    if (
      !body ||
      !isNonEmptyString(body.courseId) ||
      !isNonEmptyString(body.razorpayOrderId) ||
      !isNonEmptyString(body.razorpayPaymentId) ||
      !isNonEmptyString(body.razorpaySignature)
    ) {
      return responseError("Incomplete payment verification data.");
    }

    const courseId = body.courseId.trim();
    const razorpayOrderId = body.razorpayOrderId.trim();
    const razorpayPaymentId = body.razorpayPaymentId.trim();
    const razorpaySignature = body.razorpaySignature.trim();

    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keySecret) {
      console.error("RAZORPAY_KEY_SECRET is missing.");
      return responseError("Payment gateway is not configured.", 500);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return responseError("User not found.", 404);
    }

    const payment = await prisma.payment.findUnique({
      where: {
        razorpayOrderId,
      },
      select: {
        id: true,
        userId: true,
        courseId: true,
        amount: true,
        status: true,
        paymentMethod: true,
        transactionId: true,
        razorpayOrderId: true,
        razorpayPaymentId: true,
        razorpaySignature: true,
      },
    });

    if (!payment) {
      return responseError("Payment order not found.", 404);
    }

    if (payment.userId !== user.id) {
      return responseError("Access denied.", 403);
    }

    if (payment.courseId !== courseId) {
      return responseError("Course does not match payment.");
    }

    if (payment.razorpayOrderId !== razorpayOrderId) {
      return responseError("Payment order verification failed.");
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        price: true,
        isPremium: true,
      },
    });

    if (!course || !course.isPremium) {
      return responseError("Paid course not found.", 404);
    }

    const expectedAmountInPaise = rupeesToPaise(course.price);
    const paymentAmountInPaise = rupeesToPaise(payment.amount);

    if (
      expectedAmountInPaise === null ||
      paymentAmountInPaise === null ||
      expectedAmountInPaise !== paymentAmountInPaise
    ) {
      console.error("Local payment amount mismatch.", {
        paymentId: payment.id,
      });

      return responseError("Payment amount verification failed.", 409);
    }

    if (
      payment.razorpayPaymentId &&
      payment.razorpayPaymentId !== razorpayPaymentId
    ) {
      return responseError(
        "Payment record has already been processed.",
        409
      );
    }

    if (
      !verifyCheckoutSignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        keySecret
      )
    ) {
      console.error("Invalid Razorpay checkout signature.", {
        paymentId: payment.id,
      });

      return responseError("Payment signature verification failed.");
    }

    let razorpayPayment: RazorpayPayment;

    try {
      razorpayPayment = (await razorpay.payments.fetch(
        razorpayPaymentId
      )) as RazorpayPayment;
    } catch (error) {
      console.error("Unable to fetch Razorpay payment.", error);
      return responseError(
        "Unable to confirm payment status with Razorpay.",
        502
      );
    }

    if (
      !isNonEmptyString(razorpayPayment.id) ||
      razorpayPayment.id !== razorpayPaymentId ||
      !isNonEmptyString(razorpayPayment.order_id) ||
      razorpayPayment.order_id !== razorpayOrderId
    ) {
      return responseError("Razorpay payment verification failed.");
    }

    const razorpayAmount = Number(razorpayPayment.amount);

    if (
      !Number.isSafeInteger(razorpayAmount) ||
      razorpayAmount <= 0 ||
      razorpayAmount !== expectedAmountInPaise
    ) {
      return responseError("Razorpay payment amount mismatch.");
    }

    if (
      !isNonEmptyString(razorpayPayment.currency) ||
      razorpayPayment.currency.toUpperCase() !== "INR"
    ) {
      return responseError("Unsupported payment currency.");
    }

    const paymentCaptured =
      razorpayPayment.status === "captured" ||
      razorpayPayment.captured === true;

    if (!paymentCaptured) {
      return responseError(
        "Payment is not captured yet. Course access will be granted after capture.",
        409
      );
    }

    const paymentMethod = isNonEmptyString(razorpayPayment.method)
      ? razorpayPayment.method.trim()
      : "razorpay";

    const result = await prisma.$transaction(async (tx) => {
      const currentPayment = await tx.payment.findUnique({
        where: {
          id: payment.id,
        },
        select: {
          id: true,
          userId: true,
          courseId: true,
          amount: true,
          status: true,
          paymentMethod: true,
          transactionId: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
          razorpaySignature: true,
        },
      });

      if (!currentPayment || !currentPayment.courseId) {
        throw new Error("PAYMENT_NOT_FOUND");
      }

      if (
        currentPayment.userId !== user.id ||
        currentPayment.courseId !== courseId ||
        currentPayment.razorpayOrderId !== razorpayOrderId
      ) {
        throw new Error("PAYMENT_MAPPING_MISMATCH");
      }

      if (
        currentPayment.razorpayPaymentId &&
        currentPayment.razorpayPaymentId !== razorpayPaymentId
      ) {
        throw new Error("PAYMENT_ID_CONFLICT");
      }

      const currentAmount = rupeesToPaise(currentPayment.amount);

      if (
        currentAmount === null ||
        currentAmount !== expectedAmountInPaise
      ) {
        throw new Error("PAYMENT_AMOUNT_MISMATCH");
      }

      let finalPayment;

      if (currentPayment.status.toUpperCase() === "SUCCESS") {
        finalPayment = currentPayment;
      } else {
        finalPayment = await tx.payment.update({
          where: {
            id: currentPayment.id,
          },
          data: {
            status: "SUCCESS",
            paymentMethod,
            transactionId: razorpayPaymentId,
            razorpayPaymentId,
            razorpaySignature,
          },
          select: {
            id: true,
            amount: true,
            status: true,
            paymentMethod: true,
            transactionId: true,
            razorpayOrderId: true,
            razorpayPaymentId: true,
            razorpaySignature: true,
          },
        });
      }

      const enrollment = await tx.enrollment.upsert({
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
        select: {
          id: true,
          progress: true,
          completed: true,
        },
      });

      return {
        payment: finalPayment,
        enrollment,
        alreadyProcessed:
          currentPayment.status.toUpperCase() === "SUCCESS",
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: result.alreadyProcessed
          ? "Payment was already verified. Course access is active."
          : "Payment verified successfully. Course unlocked.",
        payment: {
          id: result.payment.id,
          status: result.payment.status,
          amount: result.payment.amount,
          paymentMethod: result.payment.paymentMethod,
          transactionId: result.payment.transactionId,
          razorpayOrderId: result.payment.razorpayOrderId,
          razorpayPaymentId: result.payment.razorpayPaymentId,
        },
        course: {
          id: course.id,
          title: course.title,
          price: course.price,
        },
        enrollment: {
          id: result.enrollment.id,
          progress: result.enrollment.progress,
          completed: result.enrollment.completed,
        },
        alreadyProcessed: result.alreadyProcessed,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("VERIFY RAZORPAY PAYMENT ERROR:", error);

    return responseError(
      "Unable to verify payment. Please contact support if money was deducted.",
      500
    );
  }
}