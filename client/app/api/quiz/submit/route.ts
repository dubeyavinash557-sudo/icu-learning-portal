import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const {
      quizId,
      answers,
    } = body;

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    let score = 0;

    for (const question of quiz.questions) {
      if (
        answers[question.id] ===
        question.correctAnswer
      ) {
        score += question.marks;
      }
    }

    const total = quiz.questions.reduce(
      (sum, q) => sum + q.marks,
      0
    );

    const percentage = Math.round(
      (score / total) * 100
    );

    const passed = percentage >= 70;

    await prisma.quizAttempt.upsert({
      where: {
        userId_quizId: {
          userId: user.id,
          quizId,
        },
      },
      update: {
        score,
        total,
        percentage,
        passed,
      },
      create: {
        userId: user.id,
        quizId,
        score,
        total,
        percentage,
        passed,
      },
    });

    if (passed) {
  const existingCertificate =
    await prisma.certificate.findFirst({
      where: {
        userId: user.id,
        courseId: quiz.courseId,
      },
    });

  if (!existingCertificate) {
    await prisma.certificate.create({
      data: {
        userId: user.id,
        courseId: quiz.courseId,
        certificateNo: `ICU-${Date.now()}`,
      },
    });
  }
}

    return NextResponse.json({
      success: true,
      score,
      total,
      percentage,
      passed,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}