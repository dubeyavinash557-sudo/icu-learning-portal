import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
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

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
        lessonProgress: true,
        certificates: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const totalCourses = user.enrollments.length;

    const completedLessons = user.lessonProgress.filter(
      (lesson) => lesson.completed
    ).length;

    const totalLessons = await prisma.lesson.count();

    const progress =
      totalLessons === 0
        ? 0
        : Math.round((completedLessons / totalLessons) * 100);

    return NextResponse.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        isPremium: user.isPremium,
      },

      stats: {
        totalCourses,
        completedLessons,
        totalLessons,
        progress,
        certificates: user.certificates.length,
      },

      enrollments: user.enrollments,
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