import { NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(
  body: Record<string, unknown>,
  status = 200
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
    },
  });
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return json(
        {
          success: false,
          message: "Unauthorized.",
        },
        401
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return json(
        {
          success: false,
          message: "User not found.",
        },
        404
      );
    }

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        enrolledAt: true,
        progress: true,
        completed: true,
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            image: true,
            description: true,
            instructor: true,
            rating: true,
            duration: true,
            language: true,
            level: true,
            price: true,
            isPremium: true,
          },
        },
      },
      orderBy: {
        enrolledAt: "desc",
      },
    });

    if (enrollments.length === 0) {
      return json({
        success: true,
        courses: [],
      });
    }

    const courseIds = enrollments.map(
      (enrollment) => enrollment.course.id
    );

    const [lessons, completedProgress, certificates] =
      await Promise.all([
        prisma.lesson.findMany({
          where: {
            courseId: {
              in: courseIds,
            },
          },
          select: {
            id: true,
            courseId: true,
            title: true,
            duration: true,
            lessonOrder: true,
          },
          orderBy: [
            {
              courseId: "asc",
            },
            {
              lessonOrder: "asc",
            },
          ],
        }),

        prisma.lessonProgress.findMany({
          where: {
            userId: user.id,
            completed: true,
            lesson: {
              courseId: {
                in: courseIds,
              },
            },
          },
          select: {
            lessonId: true,
          },
        }),

        prisma.certificate.findMany({
          where: {
            userId: user.id,
            courseId: {
              in: courseIds,
            },
          },
          select: {
            id: true,
            courseId: true,
            certificateNo: true,
            issuedAt: true,
          },
          orderBy: {
            issuedAt: "desc",
          },
        }),
      ]);

    const lessonsByCourse = new Map<
      string,
      typeof lessons
    >();

    for (const lesson of lessons) {
      const courseLessons =
        lessonsByCourse.get(lesson.courseId) ?? [];

      courseLessons.push(lesson);

      lessonsByCourse.set(
        lesson.courseId,
        courseLessons
      );
    }

    const completedLessonIds = new Set(
      completedProgress.map(
        (progress) => progress.lessonId
      )
    );

    const certificateByCourse = new Map<
      string,
      (typeof certificates)[number]
    >();

    for (const certificate of certificates) {
      if (!certificateByCourse.has(certificate.courseId)) {
        certificateByCourse.set(
          certificate.courseId,
          certificate
        );
      }
    }

    const courses = enrollments.map((enrollment) => {
      const course = enrollment.course;

      const courseLessons =
        lessonsByCourse.get(course.id) ?? [];

      const totalLessons = courseLessons.length;

      const completedLessons = courseLessons.filter(
        (lesson) =>
          completedLessonIds.has(lesson.id)
      ).length;

      const calculatedProgress =
        totalLessons > 0
          ? Math.round(
              (completedLessons / totalLessons) * 100
            )
          : 0;

      const progress = Math.min(
        100,
        Math.max(0, calculatedProgress)
      );

      const completed =
        totalLessons > 0 &&
        completedLessons === totalLessons;

      const nextLesson =
        courseLessons.find(
          (lesson) =>
            !completedLessonIds.has(lesson.id)
        ) ?? null;

      const certificate =
        certificateByCourse.get(course.id) ?? null;

      return {
        id: enrollment.id,
        enrolledAt: enrollment.enrolledAt,

        progress,
        completed,
        totalLessons,
        completedLessons,
        remainingLessons: Math.max(
          totalLessons - completedLessons,
          0
        ),

        nextLesson: nextLesson
          ? {
              id: nextLesson.id,
              title: nextLesson.title,
              lessonOrder: nextLesson.lessonOrder,
            }
          : null,

        certificate: certificate
          ? {
              id: certificate.id,
              certificateNo:
                certificate.certificateNo,
              issuedAt: certificate.issuedAt,
            }
          : null,

        course: {
          id: course.id,
          title: course.title,
          slug: course.slug,
          image: course.image,
          description: course.description,
          instructor: course.instructor,
          rating: course.rating,
          duration: course.duration,
          language: course.language,
          level: course.level,
          price: course.price,
          isPremium: course.isPremium,

          lessons: courseLessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            lessonOrder: lesson.lessonOrder,
            duration: lesson.duration,
          })),
        },
      };
    });

    return json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("MY COURSES API ERROR:", error);

    return json(
      {
        success: false,
        message: "Unable to load your courses.",
      },
      500
    );
  }
}