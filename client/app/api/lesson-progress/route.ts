import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ProgressRequestBody = {
  lessonId?: string;
};

function isValidLessonId(lessonId: unknown): lessonId is string {
  return typeof lessonId === "string" && lessonId.trim().length > 0;
}

function isFreeDemoCourse(course: {
  price: number;
  isPremium: boolean;
}) {
  return course.price === 0 && course.isPremium === false;
}

function isPremiumCourse(course: {
  price: number;
  isPremium: boolean;
}) {
  return course.price > 0 && course.isPremium === true;
}

function getPaymentAmountInPaise(
  amount: number | null | undefined
): number {
  if (amount === null || amount === undefined) {
    return 0;
  }

  return Math.round(Number(amount) * 100);
}

function createCertificateNumber(isDemo: boolean): string {
  const prefix = isDemo ? "DEMO-ICU" : "ICU-PREMIUM";

  const timestamp = Date.now();

  const randomPart = Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase();

  return `${prefix}-${timestamp}-${randomPart}`;
}

export async function POST(request: NextRequest) {
  try {
    /*
     * ---------------------------------------------------------
     * 1. Authenticate user
     * ---------------------------------------------------------
     */

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: "AUTH_REQUIRED",
          message: "Please login to continue.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * 2. Parse request body
     * ---------------------------------------------------------
     */

    let body: ProgressRequestBody;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_JSON",
          message: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const lessonId = body.lessonId?.trim();

    if (!isValidLessonId(lessonId)) {
      return NextResponse.json(
        {
          success: false,
          error: "LESSON_ID_REQUIRED",
          message: "Lesson ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * 3. Find current user
     * ---------------------------------------------------------
     */

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "USER_NOT_FOUND",
          message: "User account was not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * 4. Find lesson and course
     * ---------------------------------------------------------
     */

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        id: true,
        title: true,
        lessonOrder: true,
        courseId: true,
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            isPremium: true,
            lessons: {
              select: {
                id: true,
              },
              orderBy: {
                lessonOrder: "asc",
              },
            },
          },
        },
      },
    });

    if (!lesson || !lesson.course) {
      return NextResponse.json(
        {
          success: false,
          error: "LESSON_NOT_FOUND",
          message: "Lesson or course was not found.",
        },
        {
          status: 404,
        }
      );
    }

    const course = lesson.course;

    /*
     * ---------------------------------------------------------
     * 5. Course access policy
     * ---------------------------------------------------------
     *
     * Free demo:
     * - price = 0
     * - isPremium = false
     * - no enrollment required
     * - no payment required
     *
     * Premium:
     * - price > 0
     * - isPremium = true
     * - enrollment required
     * - successful payment required
     * ---------------------------------------------------------
     */

    const freeDemoCourse = isFreeDemoCourse(course);
    const premiumCourse = isPremiumCourse(course);

    if (!freeDemoCourse && !premiumCourse) {
      console.error("INVALID COURSE ACCESS CONFIGURATION", {
        userId: user.id,
        courseId: course.id,
        courseTitle: course.title,
        price: course.price,
        isPremium: course.isPremium,
      });

      return NextResponse.json(
        {
          success: false,
          error: "COURSE_ACCESS_NOT_CONFIGURED",
          message:
            "This course is not correctly configured. Please contact support.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * 6. Find enrollment
     * ---------------------------------------------------------
     */

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
      select: {
        id: true,
        userId: true,
        courseId: true,
        progress: true,
        completed: true,
      },
    });

    /*
     * ---------------------------------------------------------
     * 7. Premium enrollment verification
     * ---------------------------------------------------------
     */

    if (premiumCourse && !enrollment) {
      console.warn("LESSON PROGRESS DENIED - NO ENROLLMENT", {
        userId: user.id,
        courseId: course.id,
        lessonId: lesson.id,
      });

      return NextResponse.json(
        {
          success: false,
          error: "ENROLLMENT_REQUIRED",
          message:
            "You are not enrolled in this premium course. Please purchase the course first.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * 8. Premium payment verification
     * ---------------------------------------------------------
     */

    if (premiumCourse && user.role !== "ADMIN") {
      const successfulPayment = await prisma.payment.findFirst({
        where: {
          userId: user.id,
          courseId: course.id,
          status: "SUCCESS",
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          amount: true,
          status: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
          transactionId: true,
          createdAt: true,
        },
      });

      if (!successfulPayment) {
        console.warn("LESSON PROGRESS DENIED - PAYMENT NOT FOUND", {
          userId: user.id,
          courseId: course.id,
          lessonId: lesson.id,
        });

        return NextResponse.json(
          {
            success: false,
            error: "PAYMENT_REQUIRED",
            message:
              "Successful payment is required to access this premium course.",
          },
          {
            status: 403,
          }
        );
      }

      const expectedAmountInPaise = getPaymentAmountInPaise(
        course.price
      );

      const actualAmountInPaise = getPaymentAmountInPaise(
        successfulPayment.amount
      );

      const hasValidOrderId =
        typeof successfulPayment.razorpayOrderId === "string" &&
        successfulPayment.razorpayOrderId.trim().length > 0;

      const hasValidPaymentId =
        typeof successfulPayment.razorpayPaymentId === "string" &&
        successfulPayment.razorpayPaymentId.trim().length > 0;

      const hasValidTransactionId =
        typeof successfulPayment.transactionId === "string" &&
        successfulPayment.transactionId.trim().length > 0;

      const amountMatches =
        actualAmountInPaise === expectedAmountInPaise;

      if (
        !hasValidOrderId ||
        !hasValidPaymentId ||
        !hasValidTransactionId ||
        !amountMatches
      ) {
        console.error("LESSON PROGRESS DENIED - INVALID PAYMENT", {
          userId: user.id,
          courseId: course.id,
          lessonId: lesson.id,
          paymentId: successfulPayment.id,
          hasValidOrderId,
          hasValidPaymentId,
          hasValidTransactionId,
          expectedAmountInPaise,
          actualAmountInPaise,
          amountMatches,
        });

        return NextResponse.json(
          {
            success: false,
            error: "INVALID_PAYMENT",
            message:
              "Your payment could not be verified. Please contact support.",
          },
          {
            status: 403,
          }
        );
      }

      console.log("PREMIUM LESSON PROGRESS ACCESS VERIFIED", {
        userId: user.id,
        courseId: course.id,
        lessonId: lesson.id,
        paymentId: successfulPayment.id,
      });
    }

    /*
     * ---------------------------------------------------------
     * 9. Validate total lessons
     * ---------------------------------------------------------
     */

    const totalLessons = course.lessons.length;

    if (totalLessons === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "NO_LESSONS_FOUND",
          message: "This course does not contain any lessons.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * 10. Save lesson progress
     * ---------------------------------------------------------
     */

    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lesson.id,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
      create: {
        userId: user.id,
        lessonId: lesson.id,
        completed: true,
        completedAt: new Date(),
      },
      select: {
        id: true,
        userId: true,
        lessonId: true,
        completed: true,
        completedAt: true,
      },
    });

    /*
     * ---------------------------------------------------------
     * 11. Count completed lessons
     * ---------------------------------------------------------
     */

    const completedLessons = await prisma.lessonProgress.count({
      where: {
        userId: user.id,
        completed: true,
        lesson: {
          courseId: course.id,
        },
      },
    });

    const safeCompletedLessons = Math.min(
      completedLessons,
      totalLessons
    );

    const progressPercentage = Math.min(
      100,
      Math.round(
        (safeCompletedLessons / totalLessons) * 100
      )
    );

    const courseCompleted =
      safeCompletedLessons >= totalLessons;

    /*
     * ---------------------------------------------------------
     * 12. Update enrollment progress
     * ---------------------------------------------------------
     */

    let updatedEnrollment = enrollment;

    if (enrollment) {
      updatedEnrollment = await prisma.enrollment.update({
        where: {
          id: enrollment.id,
        },
        data: {
          progress: progressPercentage,
          completed: courseCompleted,
        },
        select: {
          id: true,
          userId: true,
          courseId: true,
          progress: true,
          completed: true,
        },
      });
    }

    /*
     * ---------------------------------------------------------
     * 13. Create demo or premium certificate
     * ---------------------------------------------------------
     *
     * Demo course:
     * - Creates a DEMO-style certificate number.
     * - Does not require payment.
     *
     * Premium course:
     * - Payment verification was already completed above.
     * - Creates a premium certificate number.
     *
     * Existing certificate is reused to prevent duplicates.
     * ---------------------------------------------------------
     */

    let certificate = null;

    if (courseCompleted && (freeDemoCourse || premiumCourse)) {
      const existingCertificate =
        await prisma.certificate.findFirst({
          where: {
            userId: user.id,
            courseId: course.id,
          },
          select: {
            id: true,
            certificateNo: true,
            issuedAt: true,
            courseId: true,
            userId: true,
          },
        });

      if (existingCertificate) {
        certificate = existingCertificate;
      } else {
        const certificateNumber = createCertificateNumber(
          freeDemoCourse
        );

        certificate = await prisma.certificate.create({
          data: {
            userId: user.id,
            courseId: course.id,
            certificateNo: certificateNumber,
            issuedAt: new Date(),
          },
          select: {
            id: true,
            certificateNo: true,
            issuedAt: true,
            courseId: true,
            userId: true,
          },
        });
      }
    }

    /*
     * ---------------------------------------------------------
     * 14. Return successful response
     * ---------------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,
        message: courseCompleted
          ? freeDemoCourse
            ? "Congratulations! You completed this free demo course and earned a demo certificate."
            : "Congratulations! You completed this premium course and earned a premium certificate."
          : "Lesson progress saved successfully.",
        data: {
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          courseId: course.id,
          courseTitle: course.title,
          isFreeDemo: freeDemoCourse,
          isPremium: premiumCourse,
          lessonCompleted: lessonProgress.completed,
          completedLessons: safeCompletedLessons,
          totalLessons,
          progress: progressPercentage,
          courseCompleted,
          enrollment: updatedEnrollment,
          certificate,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("LESSON PROGRESS API ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message:
          "Something went wrong while saving lesson progress. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}