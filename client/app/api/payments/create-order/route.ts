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
// BODY
// ==========================================================

async function parseBody(
  request: Request
): Promise<CreateOrderBody | null> {
  try {
    const parsed = (await request.json()) as unknown;

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
    // AUTH
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
    // BODY
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
    // PREMIUM
    // ------------------------------------------------------

    if (!course.isPremium) {
      return jsonError(
        "This course does not require a Razorpay payment."
      );
    }

    // ------------------------------------------------------
    // PRICE
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
          message:
            "You are already enrolled in this course.",
          courseId: course.id,
        },
        { status: 200 }
      );
    }

    // ------------------------------------------------------
    // EXISTING PAYMENT ORDER
    // ------------------------------------------------------
    //
    // Reuse an existing pending Razorpay order instead
    // of creating unnecessary duplicate orders.
    //
    // ------------------------------------------------------

    const existingPayment =
      await prisma.payment.findFirst({
        where: {
          userId: user.id,
          courseId: course.id,
          status: {
            not: "SUCCESS",
          },
          razorpayOrderId: {
            not: null,
          },
        },
        orderBy: {
          id: "desc",
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

    if (
      existingPayment?.razorpayOrderId
    ) {
      const existingAmount =
        rupeesToPaise(
          existingPayment.amount
        );

      if (
        existingAmount ===
        amountInPaise
      ) {
        return NextResponse.json(
          {
            success: true,
            alreadyEnrolled: false,
            existingOrder: true,
            keyId: getRazorpayKeyId(),
            order: {
              id:
                existingPayment.razorpayOrderId,
              amount: amountInPaise,
              currency: "INR",
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
          { status: 200 }
        );
      }
    }

    // ------------------------------------------------------
    // RECEIPT
    // ------------------------------------------------------

    const receipt =
      `icu_${user.id.slice(-8)}_${course.id.slice(-8)}_${Date.now()}`
        .slice(0, 40);

    // ------------------------------------------------------
    // CREATE RAZORPAY ORDER
    // ------------------------------------------------------

    const order =
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

    // ------------------------------------------------------
    // SAFETY VALIDATION
    // ------------------------------------------------------

    if (
      order.currency.toUpperCase() !==
      "INR"
    ) {
      console.error(
        "Razorpay returned unexpected currency:",
        order.currency
      );

      return jsonError(
        "Payment currency validation failed.",
        502
      );
    }

    if (
      order.amount !== amountInPaise
    ) {
      console.error(
        "Razorpay order amount mismatch:",
        {
          expected: amountInPaise,
          received: order.amount,
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

    const payment =
      await prisma.payment.create({
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

    // ------------------------------------------------------
    // RESPONSE
    // ------------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        alreadyEnrolled: false,
        existingOrder: false,

        keyId:
          getRazorpayKeyId(),

        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
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