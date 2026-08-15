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

    const courseId =
      typeof body === "object" &&
      body !== null &&
      "courseId" in body &&
      typeof body.courseId === "string"
        ? body.courseId
        : "";

    if (!courseId) {
      return NextResponse.json(
        {
          message: "Course ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
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
      return NextResponse.json(
        {
          message: "Course not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (!Number.isFinite(course.price) || course.price <= 0) {
      return NextResponse.json(
        {
          message: "Invalid course price.",
        },
        {
          status: 400,
        }
      );
    }

    const existingEnrollment =
      await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
      });

    if (existingEnrollment) {
      return NextResponse.json(
        {
          message:
            "You are already enrolled in this course.",
          alreadyEnrolled: true,
        },
        {
          status: 409,
        }
      );
    }

    /*
     * Razorpay amount is always sent in the smallest
     * currency unit. For INR:
     *
     * ₹499 = 49900 paise
     */
    const amountInPaise = Math.round(
      course.price * 100
    );

    if (
      !Number.isSafeInteger(amountInPaise) ||
      amountInPaise <= 0
    ) {
      return NextResponse.json(
        {
          message: "Invalid payment amount.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Create a unique receipt for this payment attempt.
     */
    const receipt = `course_${course.id}_${Date.now()}`;

    /*
     * Create Razorpay Order SERVER-SIDE.
     *
     * The amount comes from our database.
     * Never trust the price sent by the browser.
     */
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt,
      notes: {
        userId: user.id,
        courseId: course.id,
      },
    });

    /*
     * Save the payment attempt in our database
     * before returning the order to the browser.
     */
    await prisma.payment.create({
      data: {
        userId: user.id,
        courseId: course.id,
        amount: course.price,
        status: "PENDING",
        paymentMethod: "razorpay",
        razorpayOrderId: order.id,
      },
    });

    return NextResponse.json({
      success: true,

      /*
       * Key ID is safe to send to the browser.
       *
       * NEVER send RAZORPAY_KEY_SECRET.
       */
      keyId: process.env.RAZORPAY_KEY_ID,

      orderId: order.id,
      amount: order.amount,
      currency: order.currency,

      course: {
        id: course.id,
        title: course.title,
        price: course.price,
      },
    });
  } catch (error) {
    console.error(
      "CREATE RAZORPAY ORDER ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to create payment order.",
      },
      {
        status: 500,
      }
    );
  }
}