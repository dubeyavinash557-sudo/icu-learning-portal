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
          message: "Unauthorized",
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
    // 3. Find User
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

    // --------------------------------------------------
    // 5. Verify Enrollment
    // --------------------------------------------------

    const enrollment =
      await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: lesson.courseId,
          },
        },
      });

    if (!enrollment) {
      return NextResponse.json(
        {
          message: "Course not enrolled.",
        },
        {
          status: 403,
        }
      );
    }

    // --------------------------------------------------
    // 6. Course Lesson Count
    // --------------------------------------------------

    const totalLessons =
      lesson.course.lessons.length;

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
    // 7. Mark Lesson as Completed
    //
    // IMPORTANT:
    // Use UPSERT instead of CREATE-only.
    //
    // If progress record does not exist:
    //   -> create it
    //
    // If progress record already exists:
    //   -> update it to completed=true
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
    // 8. Count Completed Lessons
    // --------------------------------------------------

    const completedLessons =
      await prisma.lessonProgress.count({
        where: {
          userId: user.id,
          completed: true,
          lesson: {
            courseId: lesson.courseId,
          },
        },
      });

    // --------------------------------------------------
    // 9. Calculate Course Progress
    // --------------------------------------------------

    const progress = Math.min(
      100,
      Math.round(
        (completedLessons / totalLessons) * 100
      )
    );

    const courseCompleted =
      completedLessons >= totalLessons;

    console.log(
      "LESSON PROGRESS:",
      {
        userId: user.id,
        courseId: lesson.courseId,
        lessonId: lesson.id,
        completedLessons,
        totalLessons,
        progress,
        courseCompleted,
      }
    );

    // --------------------------------------------------
    // 10. Update Enrollment
    // --------------------------------------------------

    await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: lesson.courseId,
        },
      },

      data: {
        progress,
        completed: courseCompleted,
      },
    });

    // --------------------------------------------------
    // 11. Create Certificate When Course Completes
    // --------------------------------------------------

    if (courseCompleted) {
      const existingCertificate =
        await prisma.certificate.findFirst({
          where: {
            userId: user.id,
            courseId: lesson.courseId,
          },
          select: {
            id: true,
            certificateNo: true,
          },
        });

      if (!existingCertificate) {
        await prisma.certificate.create({
          data: {
            userId: user.id,
            courseId: lesson.courseId,
            certificateNo: `ICU-${Date.now()}-${user.id.slice(
              -6
            )}`,
          },
        });

        console.log(
          "CERTIFICATE CREATED:",
          {
            userId: user.id,
            courseId: lesson.courseId,
          }
        );
      } else {
        console.log(
          "CERTIFICATE ALREADY EXISTS:",
          {
            certificateNo:
              existingCertificate.certificateNo,
          }
        );
      }
    }

    // --------------------------------------------------
    // 12. Success Response
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