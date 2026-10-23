
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
    questionId: string;
  }>;
}

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      response: NextResponse.json(
        { error: "Please log in to continue." },
        { status: 401 }
      ),
    };
  }

  const email = session.user.email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return {
      response: NextResponse.json(
        { error: "Administrator access is required." },
        { status: 403 }
      ),
    };
  }

  return { user };
}

function validateQuestion(formData: FormData) {
  const question = readText(formData, "question");
  const optionA = readText(formData, "optionA");
  const optionB = readText(formData, "optionB");
  const optionC = readText(formData, "optionC");
  const optionD = readText(formData, "optionD");
  const correctAnswer = readText(formData, "correctAnswer");
  const explanation = readText(formData, "explanation");
  const rawMarks = readText(formData, "marks");
  const marks = Number(rawMarks);

  if (
    !question ||
    !optionA ||
    !optionB ||
    !optionC ||
    !optionD ||
    !correctAnswer ||
    !rawMarks
  ) {
    return {
      error: "All required fields must be filled.",
    };
  }

  if (
    question.length > 10000 ||
    optionA.length > 2000 ||
    optionB.length > 2000 ||
    optionC.length > 2000 ||
    optionD.length > 2000 ||
    explanation.length > 10000
  ) {
    return {
      error: "One or more fields exceed the allowed length.",
    };
  }

  if (!["A", "B", "C", "D"].includes(correctAnswer)) {
    return {
      error: "Correct answer must be A, B, C, or D.",
    };
  }

  if (!Number.isSafeInteger(marks) || marks < 1) {
    return {
      error: "Marks must be a positive whole number.",
    };
  }

  return {
    data: {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      explanation: explanation || null,
      marks,
    },
  };
}

export async function POST(
  request: Request,
  { params }: RouteContext
) {
  const authorization = await requireAdmin();

  if ("response" in authorization) {
    return authorization.response;
  }

  try {
    const { id, questionId } = await params;

    if (!id || !questionId) {
      return NextResponse.json(
        { error: "Quiz ID and question ID are required." },
        { status: 400 }
      );
    }

    const existingQuestion = await prisma.quizQuestion.findUnique({
      where: { id: questionId },
      select: { id: true, quizId: true },
    });

    if (!existingQuestion || existingQuestion.quizId !== id) {
      return NextResponse.json(
        { error: "Question not found for this quiz." },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const validation = validateQuestion(formData);

    if ("error" in validation) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    await prisma.quizQuestion.update({
      where: { id: questionId },
      data: validation.data,
    });

    return NextResponse.redirect(
      new URL(`/admin/quizzes/${id}`, request.url),
      303
    );
  } catch {
    console.error("Update quiz question failed.");

    return NextResponse.json(
      { error: "Failed to update question. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  const authorization = await requireAdmin();

  if ("response" in authorization) {
    return authorization.response;
  }

  try {
    const { id, questionId } = await params;

    if (!id || !questionId) {
      return NextResponse.json(
        { error: "Quiz ID and question ID are required." },
        { status: 400 }
      );
    }

    const question = await prisma.quizQuestion.findUnique({
      where: { id: questionId },
      select: { id: true, quizId: true },
    });

    if (!question || question.quizId !== id) {
      return NextResponse.json(
        { error: "Question not found for this quiz." },
        { status: 404 }
      );
    }

    await prisma.quizQuestion.delete({
      where: { id: questionId },
    });

    return NextResponse.json({ success: true });
  } catch {
    console.error("Delete quiz question failed.");

    return NextResponse.json(
      { error: "Failed to delete question. Please try again." },
      { status: 500 }
    );
  }
}
