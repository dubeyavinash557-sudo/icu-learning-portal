import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    let body: unknown;

    try {
      body = await req.json();
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
      body === null ||
      !("courseId" in body) ||
      typeof body.courseId !== "string" ||
      !body.courseId
    ) {
      return NextResponse.json(
        {
          message: "Course ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const courseId = body.courseId;

    /*
     * Find authenticated user.
     */
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
     * Find course.
     *
     * IMPORTANT:
     * Enrollment through this endpoint is ONLY
     * allowed for genuinely free courses.
     */
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

    /*
     * SECURITY CHECK
     *
     * Paid courses must ONLY be unlocked through
     * the Razorpay payment verification flow.
     *
     * A course is considered free only when:
     *
     * price === 0
     * AND
     * isPremium === false
     */
    if (
      course.isPremium ||
      !Number.isFinite(course.price) ||
      course.price !== 0
    ) {
      return NextResponse.json(
        {
          message:
            "This course requires payment before enrollment.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * Use upsert so concurrent requests cannot
     * accidentally create duplicate enrollments.
     */
    const enrollment =
      await prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          courseId: course.id,
          progress: 0,
          completed: false,
        },
      });

    /*
     * Keep the course student count synchronized.
     *
     * We only increment when the enrollment was
     * newly created.
     */
    const existingEnrollment =
      await prisma.enrollment.findUnique({
        where: {
          id: enrollment.id,
        },
        select: {
          enrolledAt: true,
        },
      });

    /*
     * The enrollment record already existed when
     * upsert returned it. We intentionally do not
     * modify course.students here because the course
     * page calculates the live count from enrollments.
     */

    return NextResponse.json({
      success: true,
      alreadyEnrolled:
        Boolean(existingEnrollment) &&
        enrollment.enrolledAt.getTime() <
          Date.now(),
      message: "Enrollment successful.",
      enrollmentId: enrollment.id,
    });
  } catch (error) {
    console.error(
      "FREE COURSE ENROLLMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        message: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}