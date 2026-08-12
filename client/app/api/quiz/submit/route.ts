import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Check login session
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // 2. Find logged-in user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // 3. Read request body
    const body = await req.json();

    const quizId = body.quizId;
    const answers = body.answers;

    // 4. Validate quizId
    if (!quizId) {
      return NextResponse.json(
        {
          error: "Quiz ID is required",
        },
        {
          status: 400,
        }
      );
    }

    // 5. Validate answers
    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        {
          error: "Answers are required",
        },
        {
          status: 400,
        }
      );
    }

    // 6. Get quiz with questions
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
        {
          error: "Quiz not found",
        },
        {
          status: 404,
        }
      );
    }

    // 7. Calculate score
    let score = 0;

    const answerRecords: {
      questionId: string;
      selectedAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      marks: number;
    }[] = [];

    for (const question of quiz.questions) {
      const selectedAnswer = String(answers[question.id] ?? "");

      let correctOption = "";

      switch (question.correctAnswer.trim().toUpperCase()) {
        case "A":
          correctOption = question.optionA;
          break;

        case "B":
          correctOption = question.optionB;
          break;

        case "C":
          correctOption = question.optionC;
          break;

        case "D":
          correctOption = question.optionD;
          break;

        default:
          correctOption = question.correctAnswer;
          break;
      }

      const isCorrect =
        selectedAnswer.trim() === correctOption.trim();

      if (isCorrect) {
        score += question.marks;
      }

      console.log("QUIZ ANSWER CHECK:", {
        questionId: question.id,
        question: question.question,
        selectedAnswer,
        correctAnswerLetter: question.correctAnswer,
        correctOption,
        isCorrect,
        marks: isCorrect ? question.marks : 0,
      });

      answerRecords.push({
        questionId: question.id,
        selectedAnswer,
        correctAnswer: correctOption,
        isCorrect,
        marks: isCorrect ? question.marks : 0,
      });
    }

    // 8. Calculate total marks
    const total = quiz.questions.reduce(
      (sum, question) => sum + question.marks,
      0
    );

    // 9. Calculate percentage
    const percentage =
      total === 0
        ? 0
        : Math.round((score / total) * 100);

    // 10. Passing percentage
    const passed = percentage >= 70;

    console.log("QUIZ FINAL RESULT:", {
      quizId,
      userId: user.id,
      score,
      total,
      percentage,
      passed,
    });

    // 11. Save quiz attempt and answers
    const attempt = await prisma.$transaction(
      async (tx) => {
        // Create or update quiz attempt
        const quizAttempt = await tx.quizAttempt.upsert({
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

        // Delete previous answers
        await tx.quizAttemptAnswer.deleteMany({
          where: {
            attemptId: quizAttempt.id,
          },
        });

        // Save latest answers
        if (answerRecords.length > 0) {
          await tx.quizAttemptAnswer.createMany({
            data: answerRecords.map((answer) => ({
              attemptId: quizAttempt.id,
              questionId: answer.questionId,
              selectedAnswer: answer.selectedAnswer,
              correctAnswer: answer.correctAnswer,
              isCorrect: answer.isCorrect,
              marks: answer.marks,
            })),
          });
        }

        return quizAttempt;
      }
    );

    // 12. Create certificate if passed
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

    // 13. Return result
    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
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