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

    await prisma.quizQuestion.create({
      data: {
        quizId: id,
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
      "Create question error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create question.",
      },
      {
        status: 500,
      }
    );
  }
}