import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const title =
      (formData.get("title") as string)?.trim();

    const courseId =
      formData.get("courseId") as string;

    if (!id || !title || !courseId) {
      return NextResponse.json(
        {
          error:
            "Quiz title and course are required.",
        },
        {
          status: 400,
        }
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: {
        id,
      },
    });

    if (!quiz) {
      return NextResponse.json(
        {
          error: "Quiz not found.",
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
    });

    if (!course) {
      return NextResponse.json(
        {
          error: "Course not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.quiz.update({
      where: {
        id,
      },
      data: {
        title,
        courseId,
      },
    });

    return NextResponse.redirect(
      new URL(
        `/admin/quizzes/${id}`,
        request.url
      )
    );
  } catch (error) {
    console.error(
      "Update quiz error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update quiz.",
      },
      {
        status: 500,
      }
    );
  }
}