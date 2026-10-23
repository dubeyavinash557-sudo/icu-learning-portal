
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

function readText(
  formData: FormData,
  fieldName: string
): string {
  const value = formData.get(fieldName);

  return typeof value === "string"
    ? value.trim()
    : "";
}

async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      error: NextResponse.json(
        { error: "Please log in to continue." },
        { status: 401 }
      ),
    };
  }

  const email = session.user.email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      role: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    return {
      error: NextResponse.json(
        { error: "Administrator access is required." },
        { status: 403 }
      ),
    };
  }

  return { user };
}

export async function POST(
  request: Request,
  { params }: RouteContext
) {
  const authorization = await requireAdmin();

  if ("error" in authorization) {
    return authorization.error;
  }

  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Quiz ID is required." },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const question = readText(formData, "question");
    const optionA = readText(formData, "optionA");
    const optionB = readText(formData, "optionB");
    const optionC = readText(formData, "optionC");
    const optionD = readText(formData, "optionD");
    const correctAnswer = readText(
      formData,
      "correctAnswer"
    );
    const explanation = readText(
      formData,
      "explanation"
    );

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
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    if (
      question.length > 10000 ||
      optionA.length > 2000 ||
      optionB.length > 2000 ||
      optionC.length > 2000 ||
      optionD.length > 2000 ||
      explanation.length > 10000
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed the allowed length." },
        { status: 400 }
      );
    }

    if (!["A", "B", "C", "D"].includes(correctAnswer)) {
      return NextResponse.json(
        { error: "Correct answer must be A, B, C, or D." },
        { status: 400 }
      );
    }

    if (!Number.isSafeInteger(marks) || marks < 1) {
      return NextResponse.json(
        { error: "Marks must be a positive whole number." },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found." },
        { status: 404 }
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
        explanation: explanation || null,
        marks,
      },
    });

    return NextResponse.redirect(
      new URL(`/admin/quizzes/${id}`, request.url),
      303
    );
  } catch (error) {
    console.error("Create quiz question failed.");

    return NextResponse.json(
      { error: "Failed to create question. Please try again." },
      { status: 500 }
    );
  }
}
