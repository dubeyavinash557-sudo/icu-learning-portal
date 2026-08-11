import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Check login session
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find logged-in user
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

    // Read request body
    const body = await req.json();

    const { quizId, answers } = body;

    // Validate quizId
    if (!quizId) {
      return NextResponse.json(
        { error: "Quiz ID is required" },
        { status: 400 }
      );
    }

    // Get quiz with questions
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

    // Calculate score
    let score = 0;

    for (const question of quiz.questions) {
      const selectedAnswer = answers?.[question.id];

      // correctAnswer contains A / B / C / D
      // Convert it to the actual option text.
      const correctOption =
        question.correctAnswer === "A"
          ? question.optionA
          : question.correctAnswer === "B"
            ? question.optionB
            : question.correctAnswer === "C"
              ? question.optionC
              : question.optionD;

      // Compare selected option text with correct option text
      if (selectedAnswer === correctOption) {
        score += question.marks;
      }
    }

    // Calculate total marks
    const total = quiz.questions.reduce(
      (sum, question) => sum + question.marks,
      0
    );

    // Calculate percentage
    const percentage =
      total === 0
        ? 0
        : Math.round((score / total) * 100);

    // Passing percentage = 70%
    const passed = percentage >= 70;

    // Save / update quiz attempt
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

    // Create certificate when student passes
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

    // Return result
    return NextResponse.json({
      success: true,
      score,
      total,
      percentage,
      passed,
    });
  } catch (error) {
    console.error("Quiz submit error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}