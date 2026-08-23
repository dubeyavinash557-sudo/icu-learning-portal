import { NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized.",
    },
    {
      status: 401,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return unauthorizedResponse();
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isPremium: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User account was not found.",
        },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        progress: true,
        completed: true,
        enrolledAt: true,
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            image: true,
            instructor: true,
            duration: true,
            language: true,
            level: true,
          },
        },
      },
      orderBy: {
        enrolledAt: "desc",
      },
    });

    const courseIds = enrollments.map(
      (enrollment) => enrollment.course.id
    );

    const certificatesCount = await prisma.certificate.count({
      where: {
        userId: user.id,
      },
    });

    if (courseIds.length === 0) {
      return NextResponse.json(
        {
          success: true,
          user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isPremium: user.isPremium,
            joinedAt: user.createdAt,
          },
          stats: {
            enrolledCourses: 0,
            completedCourses: 0,
            totalLessons: 0,
            completedLessons: 0,
            overallProgress: 0,
            certificates: certificatesCount,
          },
          courses: [],
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const [lessons, lessonProgress] = await Promise.all([
      prisma.lesson.findMany({
        where: {
          courseId: {
            in: courseIds,
          },
        },
        select: {
          id: true,
          courseId: true,
        },
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
          lesson: {
            select: {
              courseId: true,
            },
          },
        },
      }),
    ]);

    const totalLessonsByCourse = new Map<string, number>();
    const completedLessonsByCourse = new Map<string, number>();

    for (const lesson of lessons) {
      totalLessonsByCourse.set(
        lesson.courseId,
        (totalLessonsByCourse.get(lesson.courseId) ?? 0) + 1
      );
    }

    for (const progress of lessonProgress) {
      const courseId = progress.lesson.courseId;

      completedLessonsByCourse.set(
        courseId,
        (completedLessonsByCourse.get(courseId) ?? 0) + 1
      );
    }

    const courses = enrollments.map((enrollment) => {
      const courseId = enrollment.course.id;
      const totalLessons =
        totalLessonsByCourse.get(courseId) ?? 0;
      const completedLessons =
        completedLessonsByCourse.get(courseId) ?? 0;

      const calculatedProgress =
        totalLessons === 0
          ? 0
          : Math.round(
              (completedLessons / totalLessons) * 100
            );

      return {
        enrollmentId: enrollment.id,
        enrolledAt: enrollment.enrolledAt,
        completed: enrollment.completed,
        progress: Math.max(
          enrollment.progress,
          calculatedProgress
        ),
        completedLessons,
        totalLessons,
        course: enrollment.course,
      };
    });

    const totalLessons = lessons.length;
    const completedLessons = lessonProgress.length;

    const overallProgress =
      totalLessons === 0
        ? 0
        : Math.round(
            (completedLessons / totalLessons) * 100
          );

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          isPremium: user.isPremium,
          joinedAt: user.createdAt,
        },
        stats: {
          enrolledCourses: enrollments.length,
          completedCourses: enrollments.filter(
            (enrollment) => enrollment.completed
          ).length,
          totalLessons,
          completedLessons,
          overallProgress,
          certificates: certificatesCount,
        },
        courses,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("DASHBOARD API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load dashboard data.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}