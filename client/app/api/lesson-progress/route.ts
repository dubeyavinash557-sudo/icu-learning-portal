import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // --------------------------------------------------
    // 1. Authentication
    // --------------------------------------------------

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

    // --------------------------------------------------
    // 2. Read Request Body
    // --------------------------------------------------

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
      !("lessonId" in body) ||
      typeof body.lessonId !== "string" ||
      !body.lessonId.trim()
    ) {
      return NextResponse.json(
        {
          message: "Lesson ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const lessonId = body.lessonId.trim();

    // --------------------------------------------------
    // 3. Find Authenticated User
    // --------------------------------------------------

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

    // --------------------------------------------------
    // 4. Find Lesson + Course
    // --------------------------------------------------

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        course: {
          include: {
            lessons: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(
        {
          message: "Lesson not found.",
        },
        {
          status: 404,
        }
      );
    }

    const course = lesson.course;

    // --------------------------------------------------
    // 5. Verify Enrollment
    //
    // Enrollment alone is NOT enough for paid courses.
    // --------------------------------------------------

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
          userId: true,
          courseId: true,
          progress: true,
          completed: true,
          enrolledAt: true,
        },
      });

    if (!enrollment) {
      return NextResponse.json(
        {
          message:
            "You are not enrolled in this course.",
        },
        {
          status: 403,
        }
      );
    }

    // --------------------------------------------------
    // 6. PAYMENT ACCESS CONTROL
    //
    // FREE COURSE:
    //
    // price === 0
    // AND
    // isPremium === false
    //
    // -> Payment is NOT required.
    //
    // PAID / PREMIUM COURSE:
    //
    // -> Successful payment is REQUIRED.
    // --------------------------------------------------

    const isFreeCourse =
      course.price === 0 &&
      course.isPremium === false;

    if (!isFreeCourse) {
      /*
       * Paid/premium courses can only be accessed
       * after a successful payment belonging to
       * this authenticated user and this exact course.
       */
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
            razorpayOrderId: true,
            razorpayPaymentId: true,
            transactionId: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

      if (!successfulPayment) {
        console.error(
          "LESSON PROGRESS PAYMENT ACCESS DENIED:",
          {
            userId: user.id,
            courseId: course.id,
            lessonId: lesson.id,
            reason:
              "No successful payment found.",
          }
        );

        return NextResponse.json(
          {
            message:
              "Payment is required before accessing this course.",
          },
          {
            status: 403,
          }
        );
      }

      // ------------------------------------------------
      // 7. Verify Successful Payment Amount
      // ------------------------------------------------
      //
      // The payment amount must match the current
      // course price.
      //
      // Razorpay uses paise, therefore compare using
      // integer paise values to avoid Float issues.
      // ------------------------------------------------

      const paymentAmountInPaise =
        Math.round(
          successfulPayment.amount * 100
        );

      const courseAmountInPaise =
        Math.round(course.price * 100);

      if (
        !Number.isSafeInteger(
          paymentAmountInPaise
        ) ||
        !Number.isSafeInteger(
          courseAmountInPaise
        ) ||
        paymentAmountInPaise !==
          courseAmountInPaise
      ) {
        console.error(
          "LESSON PROGRESS PAYMENT AMOUNT MISMATCH:",
          {
            userId: user.id,
            courseId: course.id,
            paymentId:
              successfulPayment.id,
            paymentAmount:
              successfulPayment.amount,
            coursePrice:
              course.price,
          }
        );

        return NextResponse.json(
          {
            message:
              "Payment amount does not match the course price.",
          },
          {
            status: 403,
          }
        );
      }

      // ------------------------------------------------
      // 8. Verify Payment Has Razorpay Transaction Data
      // ------------------------------------------------
      //
      // SUCCESS payments created by our payment flow
      // should have Razorpay transaction identifiers.
      // ------------------------------------------------

      if (
        !successfulPayment.razorpayPaymentId &&
        !successfulPayment.transactionId
      ) {
        console.error(
          "LESSON PROGRESS PAYMENT TRANSACTION MISSING:",
          {
            userId: user.id,
            courseId: course.id,
            paymentId:
              successfulPayment.id,
          }
        );

        return NextResponse.json(
          {
            message:
              "Payment verification is incomplete.",
          },
          {
            status: 403,
          }
        );
      }

      console.log(
        "LESSON PROGRESS PAYMENT VERIFIED:",
        {
          userId: user.id,
          courseId: course.id,
          lessonId: lesson.id,
          paymentId:
            successfulPayment.id,
          razorpayPaymentId:
            successfulPayment.razorpayPaymentId,
        }
      );
    }

    // --------------------------------------------------
    // 9. Course Lesson Count
    // --------------------------------------------------

    const totalLessons =
      course.lessons.length;

    if (totalLessons === 0) {
      return NextResponse.json(
        {
          message:
            "This course does not contain any lessons.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 10. Mark Lesson as Completed
    //
    // UPSERT prevents duplicate progress records.
    // --------------------------------------------------

    await prisma.lessonProgress.upsert({
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
    });

    // --------------------------------------------------
    // 11. Count Completed Lessons
    // --------------------------------------------------

    const completedLessons =
      await prisma.lessonProgress.count({
        where: {
          userId: user.id,
          completed: true,
          lesson: {
            courseId: course.id,
          },
        },
      });

    // --------------------------------------------------
    // 12. Calculate Course Progress
    // --------------------------------------------------

    const progress = Math.min(
      100,
      Math.round(
        (completedLessons / totalLessons) *
          100
      )
    );

    const courseCompleted =
      completedLessons >= totalLessons;

    console.log(
      "LESSON PROGRESS:",
      {
        userId: user.id,
        courseId: course.id,
        lessonId: lesson.id,
        completedLessons,
        totalLessons,
        progress,
        courseCompleted,
      }
    );

    // --------------------------------------------------
    // 13. Update Enrollment
    // --------------------------------------------------

    await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },

      data: {
        progress,
        completed: courseCompleted,
      },
    });

    // --------------------------------------------------
    // 14. Create Certificate When Course Completes
    // --------------------------------------------------

    if (courseCompleted) {
      const existingCertificate =
        await prisma.certificate.findFirst({
          where: {
            userId: user.id,
            courseId: course.id,
          },
          select: {
            id: true,
            certificateNo: true,
          },
        });

      if (!existingCertificate) {
        const certificateNo =
          `ICU-${Date.now()}-${user.id.slice(
            -6
          )}`;

        await prisma.certificate.create({
          data: {
            userId: user.id,
            courseId: course.id,
            certificateNo,
          },
        });

        console.log(
          "CERTIFICATE CREATED:",
          {
            userId: user.id,
            courseId: course.id,
            certificateNo,
          }
        );
      } else {
        console.log(
          "CERTIFICATE ALREADY EXISTS:",
          {
            userId: user.id,
            courseId: course.id,
            certificateNo:
              existingCertificate.certificateNo,
          }
        );
      }
    }

    // --------------------------------------------------
    // 15. Success Response
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      message: courseCompleted
        ? "Lesson completed. Course completed successfully."
        : "Lesson completed successfully.",
      progress,
      completedLessons,
      totalLessons,
      courseCompleted,
    });
  } catch (error) {
    console.error(
      "LESSON PROGRESS ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to update lesson progress.",
      },
      {
        status: 500,
      }
    );
  }
}