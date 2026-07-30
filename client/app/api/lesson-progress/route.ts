import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { lessonId } = await req.json();

    if (!lessonId) {
      return NextResponse.json(
        { message: "Lesson ID is required" },
        { status: 400 }
      );
    }

    // Find User
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Find Lesson
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        course: {
          include: {
            lessons: true,
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { message: "Lesson not found" },
        { status: 404 }
      );
    }

    // Find Enrollment
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: lesson.courseId,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { message: "Course not enrolled" },
        { status: 403 }
      );
    }

    // Already Completed?
    const existing = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lesson.id,
        },
      },
    });

    if (!existing) {
      await prisma.lessonProgress.create({
        data: {
          userId: user.id,
          lessonId: lesson.id,
          completed: true,
          completedAt: new Date(),
        },
      });
    }

    // Count completed lessons
    const completedLessons = await prisma.lessonProgress.count({
      where: {
        userId: user.id,
        completed: true,
        lesson: {
          courseId: lesson.courseId,
        },
      },
    });

    const totalLessons = lesson.course.lessons.length;

    const progress = Math.round(
      (completedLessons / totalLessons) * 100
    );

    await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: lesson.courseId,
        },
      },
      data: {
        progress,
        completed: completedLessons === totalLessons,
      },
    });

    return NextResponse.json({
      success: true,
      progress,
      completedLessons,
      totalLessons,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}