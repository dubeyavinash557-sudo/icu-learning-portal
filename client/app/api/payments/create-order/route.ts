import { NextResponse } from "next/server";
import Razorpay from "razorpay";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

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

    const body = await request.json();

    const courseId =
      typeof body?.courseId === "string"
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

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error(
        "Razorpay environment variables are missing."
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

    if (course.price <= 0) {
      return NextResponse.json(
        {
          message:
            "This course does not require payment.",
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
          message: "You are already enrolled in this course.",
          alreadyEnrolled: true,
        },
        {
          status: 409,
        }
      );
    }

    const amountInPaise = Math.round(
      course.price * 100
    );

    if (amountInPaise <= 0) {
      return NextResponse.json(
        {
          message: "Invalid course amount.",
        },
        {
          status: 400,
        }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receipt = `course_${course.id}_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt,
      notes: {
        userId: user.id,
        courseId: course.id,
      },
    });

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
      keyId,
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
        message: "Unable to create payment order.",
      },
      {
        status: 500,
      }
    );
  }
}