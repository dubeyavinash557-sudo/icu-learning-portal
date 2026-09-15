import { NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import {
  createRazorpayOrder,
  getRazorpayKeyId,
} from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ==========================================================
// TYPES
// ==========================================================

type CreateOrderBody = {
  courseId?: unknown;
};

type ExistingPayment = {
  id: string;
  amount: number;
  status: string;
  transactionId: string | null;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
};

// ==========================================================
// HELPERS
// ==========================================================

function jsonError(
  message: string,
  status = 400,
  code?: string,
) {
  return NextResponse.json(
    {
      success: false,
      message,
      error: message,
      ...(code ? { code } : {}),
    },
    {
      status,
    },
  );
}

function isNonEmptyString(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function rupeesToPaise(
  amount: unknown,
): number | null {
  const rupees = Number(amount);

  if (
    !Number.isFinite(rupees) ||
    rupees <= 0
  ) {
    return null;
  }

  const paise = Math.round(rupees * 100);

  if (
    !Number.isSafeInteger(paise) ||
    paise <= 0
  ) {
    return null;
  }

  return paise;
}

function hasValidPaymentIdentifier(
  payment: ExistingPayment,
): boolean {
  return Boolean(
    payment.razorpayPaymentId?.trim() ||
      payment.transactionId?.trim(),
  );
}

function paymentAmountMatchesCourse(
  payment: ExistingPayment,
  coursePrice: number,
): boolean {
  const paidAmountInPaise = rupeesToPaise(
    payment.amount,
  );

  const courseAmountInPaise = rupeesToPaise(
    coursePrice,
  );

  return (
    paidAmountInPaise !== null &&
    courseAmountInPaise !== null &&
    paidAmountInPaise === courseAmountInPaise
  );
}

// ==========================================================
// BODY PARSER
// ==========================================================

async function parseBody(
  request: Request,
): Promise<CreateOrderBody | null> {
  try {
    const parsed =
      (await request.json()) as unknown;

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return null;
    }

    return parsed as CreateOrderBody;
  } catch {
    return null;
  }
}

// ==========================================================
// POST
// ==========================================================

export async function POST(
  request: Request,
) {
  try {
    // ------------------------------------------------------
    // 1. AUTHENTICATION
    // ------------------------------------------------------

    const session = await auth();

    const email =
      session?.user?.email
        ?.trim()
        .toLowerCase();

    if (!email) {
      return jsonError(
        "Please login before purchasing this course.",
        401,
        "AUTH_REQUIRED",
      );
    }

    // ------------------------------------------------------
    // 2. REQUEST BODY
    // ------------------------------------------------------

    const body = await parseBody(request);

    if (
      !body ||
      !isNonEmptyString(body.courseId)
    ) {
      return jsonError(
        "Course ID is required.",
        400,
        "COURSE_ID_REQUIRED",
      );
    }

    const courseId = body.courseId.trim();

    // ------------------------------------------------------
    // 3. CURRENT USER
    // ------------------------------------------------------

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        role: true,
      },
    });

    if (!user) {
      return jsonError(
        "User account was not found.",
        404,
        "USER_NOT_FOUND",
      );
    }

        // ------------------------------------------------------
    // 4. COURSE
    // ------------------------------------------------------

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

    if (!course) {
      return jsonError(
        "Course not found.",
        404,
        "COURSE_NOT_FOUND",
      );
    }

    // ------------------------------------------------------
    // 5. PREMIUM COURSE VALIDATION
    // ------------------------------------------------------

    const amountInPaise = rupeesToPaise(
      course.price,
    );

    if (
      course.isPremium !== true ||
      amountInPaise === null ||
      amountInPaise < 100
    ) {
      console.error(
        "INVALID PREMIUM COURSE PAYMENT CONFIGURATION:",
        {
          courseId: course.id,
          price: course.price,
          isPremium: course.isPremium,
          amountInPaise,
        },
      );

      return jsonError(
        "This course is not correctly configured for online payment.",
        500,
        "INVALID_COURSE_PAYMENT_CONFIGURATION",
      );
    }

    // ------------------------------------------------------
    // 6. EXISTING SUCCESSFUL PAYMENT
    //
    // A successful payment is the actual purchase proof.
    // Enrollment alone is not treated as a purchase.
    // ------------------------------------------------------

    const successfulPayment =
      await prisma.payment.findFirst({
        where: {
          userId: user.id,
          courseId: course.id,
          status: "SUCCESS",
        },
        select: {
          id: true,
          amount: true,
          status: true,
          transactionId: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (successfulPayment) {
      const paymentIsValid =
        paymentAmountMatchesCourse(
          successfulPayment,
          course.price,
        ) &&
        hasValidPaymentIdentifier(
          successfulPayment,
        );

      if (paymentIsValid) {
        const enrollment =
          await prisma.enrollment.findUnique({
            where: {
              userId_courseId: {
                userId: user.id,
                courseId: course.id,
              },
            },
            select: {
              id: true,
              progress: true,
              completed: true,
            },
          });

        return NextResponse.json(
          {
            success: true,
            alreadyEnrolled: Boolean(enrollment),
            alreadyPurchased: true,
            existingOrder: false,
            message:
              "This course has already been purchased.",
            courseId: course.id,
            enrollment: enrollment
              ? {
                  id: enrollment.id,
                  progress: enrollment.progress,
                  completed: enrollment.completed,
                }
              : null,
          },
          {
            status: 200,
          },
        );
      }

      console.error(
        "INVALID SUCCESSFUL PAYMENT RECORD:",
        {
          userId: user.id,
          courseId: course.id,
          paymentId: successfulPayment.id,
          amount: successfulPayment.amount,
          coursePrice: course.price,
          transactionId:
            successfulPayment.transactionId,
          razorpayPaymentId:
            successfulPayment.razorpayPaymentId,
        },
      );

      return jsonError(
        "Your previous payment requires verification. Please contact support before making another payment.",
        409,
        "PAYMENT_RECORD_REQUIRES_REVIEW",
      );
    }

        // ------------------------------------------------------
    // 7. EXISTING ENROLLMENT
    //
    // Enrollment without SUCCESS payment is not considered
    // a completed purchase.
    //
    // This can happen because of:
    // - old test data
    // - free/demo enrollment
    // - abandoned checkout
    // - incomplete payment verification
    //
    // Therefore we do not return alreadyPurchased here.
    // A fresh Razorpay order will be created below.
    // ------------------------------------------------------

    const existingEnrollment =
      await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
        select: {
          id: true,
          progress: true,
          completed: true,
        },
      });

    // ------------------------------------------------------
    // 8. RECEIPT
    // ------------------------------------------------------

    const receipt =
      `icu_${user.id.slice(-8)}_${course.id.slice(-8)}_${Date.now()}`
        .slice(0, 40);

    // ------------------------------------------------------
    // 9. CREATE FRESH RAZORPAY ORDER
    // ------------------------------------------------------

    let order;

    try {
      order = await createRazorpayOrder({
        amount: amountInPaise,
        currency: "INR",
        receipt,
        notes: {
          userId: user.id,
          courseId: course.id,
          courseTitle: course.title.slice(0, 240),
          customerEmail: user.email ?? "",
        },
      });
    } catch (error) {
      console.error(
        "RAZORPAY ORDER CREATION FAILED:",
        error,
      );

      return jsonError(
        "Unable to create Razorpay payment order. Please try again.",
        502,
        "RAZORPAY_ORDER_CREATION_FAILED",
      );
    }

    // ------------------------------------------------------
    // 10. ORDER ID VALIDATION
    // ------------------------------------------------------

    if (
      !order ||
      !isNonEmptyString(order.id)
    ) {
      console.error(
        "RAZORPAY RETURNED INVALID ORDER:",
        order,
      );

      return jsonError(
        "Razorpay returned an invalid payment order.",
        502,
        "INVALID_RAZORPAY_ORDER",
      );
    }

        // ------------------------------------------------------
    // 11. CURRENCY VALIDATION
    // ------------------------------------------------------

    if (
      !isNonEmptyString(order.currency) ||
      order.currency.toUpperCase() !== "INR"
    ) {
      console.error(
        "RAZORPAY CURRENCY MISMATCH:",
        {
          orderId: order.id,
          currency: order.currency,
        },
      );

      return jsonError(
        "Payment currency validation failed.",
        502,
        "RAZORPAY_CURRENCY_MISMATCH",
      );
    }

    // ------------------------------------------------------
    // 12. AMOUNT VALIDATION
    // ------------------------------------------------------

    const razorpayOrderAmount = Number(
      order.amount,
    );

    if (
      !Number.isSafeInteger(
        razorpayOrderAmount,
      ) ||
      razorpayOrderAmount <= 0
    ) {
      console.error(
        "RAZORPAY RETURNED INVALID AMOUNT:",
        {
          orderId: order.id,
          amount: order.amount,
        },
      );

      return jsonError(
        "Razorpay returned an invalid payment amount.",
        502,
        "INVALID_RAZORPAY_AMOUNT",
      );
    }

    if (
      razorpayOrderAmount !== amountInPaise
    ) {
      console.error(
        "RAZORPAY ORDER AMOUNT MISMATCH:",
        {
          courseId: course.id,
          coursePrice: course.price,
          expectedAmountInPaise: amountInPaise,
          razorpayAmount: razorpayOrderAmount,
          orderId: order.id,
        },
      );

      return jsonError(
        "Payment amount validation failed.",
        502,
        "RAZORPAY_AMOUNT_MISMATCH",
      );
    }

    // ------------------------------------------------------
    // 13. LOCAL PAYMENT RECORD
    // ------------------------------------------------------

    let payment;

    try {
      payment = await prisma.payment.create({
        data: {
          userId: user.id,
          courseId: course.id,
          amount: course.price,
          status: "PENDING",
          paymentMethod: "razorpay",
          transactionId: null,
          razorpayOrderId: order.id,
          razorpayPaymentId: null,
          razorpaySignature: null,
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
    } catch (error) {
      console.error(
        "LOCAL PAYMENT RECORD CREATION FAILED:",
        {
          error,
          razorpayOrderId: order.id,
          userId: user.id,
          courseId: course.id,
        },
      );

      return jsonError(
        "Payment order was created, but the local payment record could not be saved. Please contact support before retrying.",
        500,
        "LOCAL_PAYMENT_RECORD_FAILED",
      );
    }

        // ------------------------------------------------------
    // 14. FINAL RESPONSE
    // ------------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        alreadyEnrolled: Boolean(existingEnrollment),
        alreadyPurchased: false,
        existingOrder: false,
        message:
          "Payment order created successfully.",

        keyId: getRazorpayKeyId(),

        order: {
          id: order.id,
          amount: razorpayOrderAmount,
          currency: "INR",
          receipt: order.receipt,
          status: order.status,
        },

        payment: {
          id: payment.id,
          status: payment.status,
        },

        course: {
          id: course.id,
          title: course.title,
          price: course.price,
        },

        customer: {
          name: user.fullName ?? "",
          email: user.email ?? "",
          contact: user.mobile ?? "",
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "CREATE RAZORPAY ORDER ERROR:",
      error,
    );

    return jsonError(
      "Unable to create payment order. Please try again.",
      500,
      "CREATE_ORDER_ERROR",
    );
  }
}