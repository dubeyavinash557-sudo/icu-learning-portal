import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
    questionId: string;
  }>;
}

export async function POST(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id, questionId } = await params;

    const formData = await request.formData();

    const question =
      formData.get("question") as string;

    const optionA =
      formData.get("optionA") as string;

    const optionB =
      formData.get("optionB") as string;

    const optionC =
      formData.get("optionC") as string;

    const optionD =
      formData.get("optionD") as string;

    const correctAnswer =
      formData.get("correctAnswer") as string;

    const explanation =
      (formData.get("explanation") as string) ||
      null;

    const marks = Number(
      formData.get("marks")
    );

    if (
      !id ||
      !questionId ||
      !question ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctAnswer
    ) {
      return NextResponse.json(
        {
          error:
            "All required fields must be filled.",
        },
        {
          status: 400,
        }
      );
    }

    const existingQuestion =
      await prisma.quizQuestion.findUnique({
        where: {
          id: questionId,
        },
      });

    if (!existingQuestion) {
      return NextResponse.json(
        {
          error: "Question not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (existingQuestion.quizId !== id) {
      return NextResponse.json(
        {
          error:
            "Question does not belong to this quiz.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.quizQuestion.update({
      where: {
        id: questionId,
      },
      data: {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        explanation,
        marks: marks || 1,
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
      "Update question error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update question.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id, questionId } = await params;

    if (!id || !questionId) {
      return NextResponse.json(
        {
          error: "Quiz ID and Question ID are required.",
        },
        {
          status: 400,
        }
      );
    }

    const question =
      await prisma.quizQuestion.findUnique({
        where: {
          id: questionId,
        },
      });

    if (!question) {
      return NextResponse.json(
        {
          error: "Question not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (question.quizId !== id) {
      return NextResponse.json(
        {
          error:
            "Question does not belong to this quiz.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.quizQuestion.delete({
      where: {
        id: questionId,
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
      "Delete question error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to delete question.",
      },
      {
        status: 500,
      }
    );
  }
}