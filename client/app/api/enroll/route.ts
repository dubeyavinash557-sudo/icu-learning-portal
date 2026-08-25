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
          success: false,
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
          success: false,
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
      typeof body.courseId !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Course ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const courseId = body.courseId.trim();

    if (!courseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Course ID is required.",
        },
        {
          status: 400,
        }
      );
    }

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
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    // --------------------------------------------------
    // 4. Find Course
    // --------------------------------------------------

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
          success: false,
          message: "Course not found.",
        },
        {
          status: 404,
        }
      );
    }

    // --------------------------------------------------
    // 5. SECURITY CHECK
    //
    // Free enrollment is allowed ONLY when:
    //
    //   isPremium === false
    //   AND
    //   price === 0
    //
    // Paid courses must go through Razorpay.
    // --------------------------------------------------

    const isFreeCourse =
      course.isPremium === false &&
      Number.isFinite(course.price) &&
      course.price === 0;

    if (!isFreeCourse) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This course requires payment before enrollment.",
        },
        {
          status: 403,
        }
      );
    }

    // --------------------------------------------------
    // 6. Check Existing Enrollment
    // --------------------------------------------------

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

    // --------------------------------------------------
    // 7. Already Enrolled
    //
    // IMPORTANT:
    // Do not create another enrollment.
    //
    // Because the Prisma schema contains:
    //
    // @@unique([userId, courseId])
    //
    // duplicate enrollment is prevented at
    // database level as well.
    // --------------------------------------------------

    if (existingEnrollment) {
      return NextResponse.json(
        {
          success: true,
          alreadyEnrolled: true,
          message:
            "You are already enrolled in this course.",
          enrollmentId: existingEnrollment.id,
          progress: existingEnrollment.progress,
          completed: existingEnrollment.completed,
        },
        {
          status: 200,
        }
      );
    }

    // --------------------------------------------------
    // 8. Create Enrollment
    // --------------------------------------------------

    const enrollment =
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId: course.id,
          progress: 0,
          completed: false,
        },
        select: {
          id: true,
          progress: true,
          completed: true,
          enrolledAt: true,
        },
      });

    // --------------------------------------------------
    // 9. Success Response
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        alreadyEnrolled: false,
        message:
          "Free course enrollment successful.",
        enrollmentId: enrollment.id,
        progress: enrollment.progress,
        completed: enrollment.completed,
        enrolledAt: enrollment.enrolledAt,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    // --------------------------------------------------
    // 10. Handle Duplicate Enrollment Race
    //
    // Two browser requests can theoretically arrive
    // at exactly the same time.
    //
    // The database unique constraint protects us.
    // If Prisma reports P2002, return the existing
    // enrollment instead of exposing an internal error.
    // --------------------------------------------------

    if (isUniqueConstraintError(error)) {
      try {
        const session = await auth();

        if (session?.user?.email) {
          const user = await prisma.user.findUnique({
            where: {
              email: session.user.email,
            },
            select: {
              id: true,
            },
          });

          if (user) {
            let body: unknown;

            try {
              body = await req.clone().json();
            } catch {
              body = null;
            }

            const courseId =
              typeof body === "object" &&
              body !== null &&
              "courseId" in body &&
              typeof body.courseId === "string"
                ? body.courseId.trim()
                : "";

            if (courseId) {
              const enrollment =
                await prisma.enrollment.findUnique({
                  where: {
                    userId_courseId: {
                      userId: user.id,
                      courseId,
                    },
                  },
                  select: {
                    id: true,
                    progress: true,
                    completed: true,
                  },
                });

              if (enrollment) {
                return NextResponse.json(
                  {
                    success: true,
                    alreadyEnrolled: true,
                    message:
                      "You are already enrolled in this course.",
                    enrollmentId: enrollment.id,
                    progress: enrollment.progress,
                    completed: enrollment.completed,
                  },
                  {
                    status: 200,
                  }
                );
              }
            }
          }
        }
      } catch (raceError) {
        console.error(
          "FREE ENROLLMENT RACE RECOVERY ERROR:",
          raceError
        );
      }
    }

    console.error(
      "FREE COURSE ENROLLMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to enroll in this course. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}

// --------------------------------------------------
// Prisma unique constraint helper
// --------------------------------------------------

function isUniqueConstraintError(
  error: unknown
): boolean {
  if (
    typeof error !== "object" ||
    error === null
  ) {
    return false;
  }

  if (
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code === "P2002";
  }

  return false;
}