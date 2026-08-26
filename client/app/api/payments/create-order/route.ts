import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

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

// ==========================================================
// HELPERS
// ==========================================================

function jsonError(
  message: string,
  status = 400
) {
  return NextResponse.json(
    {
      success: false,
      message,
      error: message,
    },
    { status }
  );
}

function isNonEmptyString(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function rupeesToPaise(
  amount: unknown
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

// ==========================================================
// BODY PARSER
// ==========================================================

async function parseBody(
  request: Request
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
  request: Request
) {
  try {
    // ------------------------------------------------------
    // AUTHENTICATION
    // ------------------------------------------------------

    const session = await auth();

    const email =
      session?.user?.email
        ?.trim()
        .toLowerCase();

    if (!email) {
      return jsonError(
        "Please login before purchasing this course.",
        401
      );
    }

    // ------------------------------------------------------
    // REQUEST BODY
    // ------------------------------------------------------

    const body =
      await parseBody(request);

    if (
      !body ||
      !isNonEmptyString(body.courseId)
    ) {
      return jsonError(
        "Course ID is required."
      );
    }

    const courseId =
      body.courseId.trim();

    // ------------------------------------------------------
    // USER
    // ------------------------------------------------------

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          mobile: true,
        },
      });

    if (!user) {
      return jsonError(
        "User account was not found.",
        404
      );
    }

    // ------------------------------------------------------
    // COURSE
    // ------------------------------------------------------

    const course =
      await prisma.course.findUnique({
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
        404
      );
    }

    // ------------------------------------------------------
    // PREMIUM COURSE CHECK
    // ------------------------------------------------------

    if (!course.isPremium) {
      return jsonError(
        "This course does not require a Razorpay payment."
      );
    }

    // ------------------------------------------------------
    // COURSE PRICE
    // ------------------------------------------------------

    const amountInPaise =
      rupeesToPaise(course.price);

    if (
      amountInPaise === null ||
      amountInPaise < 100
    ) {
      console.error(
        "Invalid course price:",
        {
          courseId: course.id,
          price: course.price,
        }
      );

      return jsonError(
        "Invalid course price configuration.",
        500
      );
    }

    // ------------------------------------------------------
    // EXISTING ENROLLMENT
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

    if (existingEnrollment) {
      return NextResponse.json(
        {
          success: true,
          alreadyEnrolled: true,
          alreadyPurchased: true,

          message:
            "You are already enrolled in this course.",

          courseId: course.id,

          enrollment: {
            id: existingEnrollment.id,
            progress:
              existingEnrollment.progress,
            completed:
              existingEnrollment.completed,
          },
        },
        { status: 200 }
      );
    }

    // ------------------------------------------------------
    // IMPORTANT
    //
    // DO NOT REUSE OLD RAZORPAY ORDERS
    //
    // Older pending orders may belong to:
    // - an old course price
    // - an expired checkout attempt
    // - an abandoned payment
    // - an already attempted Razorpay order
    //
    // Therefore every fresh purchase attempt creates
    // a fresh Razorpay order.
    // ------------------------------------------------------

    // ------------------------------------------------------
    // RECEIPT
    // ------------------------------------------------------

    const receipt =
      `icu_${user.id.slice(-8)}_${course.id.slice(-8)}_${Date.now()}`
        .slice(0, 40);

    // ------------------------------------------------------
    // CREATE RAZORPAY ORDER
    // ------------------------------------------------------

    let order;

    try {
      order =
        await createRazorpayOrder({
          amount: amountInPaise,

          currency: "INR",

          receipt,

          notes: {
            userId: user.id,

            courseId: course.id,

            courseTitle:
              course.title.slice(0, 240),

            customerEmail:
              user.email ?? "",
          },
        });
    } catch (error) {
      console.error(
        "RAZORPAY ORDER CREATION FAILED:",
        error
      );

      return jsonError(
        "Unable to create Razorpay payment order. Please try again.",
        502
      );
    }

    // ------------------------------------------------------
    // RAZORPAY ORDER VALIDATION
    // ------------------------------------------------------

    if (
      !order ||
      !isNonEmptyString(order.id)
    ) {
      console.error(
        "Razorpay returned invalid order:",
        order
      );

      return jsonError(
        "Razorpay returned an invalid payment order.",
        502
      );
    }

    // ------------------------------------------------------
    // CURRENCY VALIDATION
    // ------------------------------------------------------

    if (
      !isNonEmptyString(order.currency) ||
      order.currency.toUpperCase() !== "INR"
    ) {
      console.error(
        "Razorpay returned unexpected currency:",
        {
          orderId: order.id,
          currency: order.currency,
        }
      );

      return jsonError(
        "Payment currency validation failed.",
        502
      );
    }

    // ------------------------------------------------------
    // AMOUNT VALIDATION
    // ------------------------------------------------------

    const razorpayOrderAmount =
      Number(order.amount);

    if (
      !Number.isSafeInteger(
        razorpayOrderAmount
      ) ||
      razorpayOrderAmount <= 0
    ) {
      console.error(
        "Razorpay returned invalid amount:",
        {
          orderId: order.id,
          amount: order.amount,
        }
      );

      return jsonError(
        "Razorpay returned an invalid payment amount.",
        502
      );
    }

    if (
      razorpayOrderAmount !==
      amountInPaise
    ) {
      console.error(
        "Razorpay order amount mismatch:",
        {
          courseId: course.id,

          coursePrice:
            course.price,

          expectedAmountInPaise:
            amountInPaise,

          razorpayAmount:
            razorpayOrderAmount,

          orderId:
            order.id,
        }
      );

      return jsonError(
        "Payment amount validation failed.",
        502
      );
    }

    // ------------------------------------------------------
    // LOCAL PAYMENT RECORD
    // ------------------------------------------------------

    let payment;

    try {
      payment =
        await prisma.payment.create({
          data: {
            userId: user.id,

            courseId: course.id,

            amount: course.price,

            status: "PENDING",

            paymentMethod:
              "razorpay",

            transactionId: null,

            razorpayOrderId:
              order.id,

            razorpayPaymentId:
              null,

            razorpaySignature:
              null,
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
          razorpayOrderId:
            order.id,
          userId: user.id,
          courseId: course.id,
        }
      );

      return jsonError(
        "Payment order was created, but the local payment record could not be saved. Please contact support before retrying.",
        500
      );
    }

    // ------------------------------------------------------
    // FINAL RESPONSE
    // ------------------------------------------------------

    return NextResponse.json(
      {
        success: true,

        alreadyEnrolled: false,

        alreadyPurchased: false,

        existingOrder: false,

        keyId:
          getRazorpayKeyId(),

        order: {
          id: order.id,

          amount:
            razorpayOrderAmount,

          currency: "INR",

          receipt:
            order.receipt,

          status:
            order.status,
        },

        payment: {
          id: payment.id,

          status:
            payment.status,
        },

        course: {
          id: course.id,

          title: course.title,

          price: course.price,
        },

        customer: {
          name:
            user.fullName ?? "",

          email:
            user.email ?? "",

          contact:
            user.mobile ?? "",
        },
      },

      { status: 200 }
    );
  } catch (error) {
    console.error(
      "CREATE RAZORPAY ORDER ERROR:",
      error
    );

    return jsonError(
      "Unable to create payment order. Please try again.",
      500
    );
  }
}