import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

type SubmittedAnswers = Record<string, unknown>;

function getCorrectOption(question: {
  correctAnswer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}) {
  const answer = question.correctAnswer.trim();

  switch (answer.toUpperCase()) {
    case "A":
      return question.optionA;
    case "B":
      return question.optionB;
    case "C":
      return question.optionC;
    case "D":
      return question.optionD;
    default:
      return answer;
  }
}

export async function POST(req: Request) {
  try {
    // --------------------------------------------------
    // 1. Authenticate user
    // --------------------------------------------------
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

    // --------------------------------------------------
    // 2. Find logged-in user
    // --------------------------------------------------
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
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

    // --------------------------------------------------
    // 3. Parse request body
    // --------------------------------------------------
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON request body.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          error: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const requestBody = body as {
      quizId?: unknown;
      answers?: unknown;
    };

    const quizId = requestBody.quizId;
    const answers = requestBody.answers;

    // --------------------------------------------------
    // 4. Validate quizId
    // --------------------------------------------------
    if (typeof quizId !== "string" || quizId.trim().length === 0) {
      return NextResponse.json(
        {
          error: "Quiz ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 5. Validate answers object
    // --------------------------------------------------
    if (
      !answers ||
      typeof answers !== "object" ||
      Array.isArray(answers)
    ) {
      return NextResponse.json(
        {
          error: "Answers are required.",
        },
        {
          status: 400,
        }
      );
    }

    const submittedAnswers = answers as SubmittedAnswers;

    // --------------------------------------------------
    // 6. Get quiz from database
    // --------------------------------------------------
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        questions: {
          orderBy: {
            id: "asc",
          },
        },
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

    // --------------------------------------------------
    // 7. Prevent empty quiz submission
    // --------------------------------------------------
    if (quiz.questions.length === 0) {
      return NextResponse.json(
        {
          error: "This quiz does not contain any questions.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 8. Build valid question ID set
    // --------------------------------------------------
    const validQuestionIds = new Set(
      quiz.questions.map((question) => question.id)
    );

    const submittedQuestionIds = Object.keys(submittedAnswers);

    // --------------------------------------------------
    // 9. Reject unexpected question IDs
    // --------------------------------------------------
    const hasInvalidQuestionId = submittedQuestionIds.some(
      (questionId) => !validQuestionIds.has(questionId)
    );

    if (hasInvalidQuestionId) {
      return NextResponse.json(
        {
          error: "Invalid question data submitted.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 10. Require every question to be answered
    // --------------------------------------------------
    for (const question of quiz.questions) {
      const rawAnswer = submittedAnswers[question.id];

      if (
        typeof rawAnswer !== "string" ||
        rawAnswer.trim().length === 0
      ) {
        return NextResponse.json(
          {
            error: `Please answer all questions before submitting the quiz.`,
          },
          {
            status: 400,
          }
        );
      }
    }

    // --------------------------------------------------
    // 11. Calculate score ONLY on server
    // --------------------------------------------------
    let score = 0;

    const answerRecords: {
      questionId: string;
      selectedAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      marks: number;
    }[] = [];

    for (const question of quiz.questions) {
      const selectedAnswer = String(
        submittedAnswers[question.id]
      ).trim();

      const validOptions = [
        question.optionA,
        question.optionB,
        question.optionC,
        question.optionD,
      ];

      // ------------------------------------------------
      // Reject answers that are not one of the options
      // ------------------------------------------------
      const validSelectedAnswer = validOptions.some(
        (option) =>
          option.trim() === selectedAnswer
      );

      if (!validSelectedAnswer) {
        return NextResponse.json(
          {
            error: "Invalid answer submitted.",
          },
          {
            status: 400,
          }
        );
      }

      const correctOption = getCorrectOption(question);

      const isCorrect =
        selectedAnswer.trim() === correctOption.trim();

      const earnedMarks = isCorrect
        ? Math.max(0, question.marks)
        : 0;

      if (isCorrect) {
        score += earnedMarks;
      }

      answerRecords.push({
        questionId: question.id,
        selectedAnswer,
        correctAnswer: correctOption,
        isCorrect,
        marks: earnedMarks,
      });
    }

    // --------------------------------------------------
    // 12. Calculate total marks
    // --------------------------------------------------
    const total = quiz.questions.reduce(
      (sum, question) =>
        sum + Math.max(0, question.marks),
      0
    );

    // --------------------------------------------------
    // 13. Calculate percentage
    // --------------------------------------------------
    const percentage =
      total === 0
        ? 0
        : Math.round((score / total) * 100);

    // --------------------------------------------------
    // 14. Passing percentage
    // --------------------------------------------------
    const passed = percentage >= 70;

    // --------------------------------------------------
    // 15. Save attempt + answers + certificate
    //     inside one transaction
    // --------------------------------------------------
    const result = await prisma.$transaction(
      async (tx) => {
        // ----------------------------------------------
        // Create/update latest attempt
        // ----------------------------------------------
        const quizAttempt =
          await tx.quizAttempt.upsert({
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

        // ----------------------------------------------
        // Remove previous answer records
        // ----------------------------------------------
        await tx.quizAttemptAnswer.deleteMany({
          where: {
            attemptId: quizAttempt.id,
          },
        });

        // ----------------------------------------------
        // Save latest answer records
        // ----------------------------------------------
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

        // ----------------------------------------------
        // Create certificate when passed
        // ----------------------------------------------
        if (passed) {
          const existingCertificate =
            await tx.certificate.findFirst({
              where: {
                userId: user.id,
                courseId: quiz.courseId,
              },
              select: {
                id: true,
              },
            });

          if (!existingCertificate) {
            await tx.certificate.create({
              data: {
                userId: user.id,
                courseId: quiz.courseId,
                certificateNo: `ICU-${Date.now()}-${user.id.slice(
                  -6
                )}`,
              },
            });
          }
        }

        return quizAttempt;
      }
    );

    // --------------------------------------------------
    // 16. Return safe result
    // --------------------------------------------------
    return NextResponse.json(
      {
        success: true,
        attemptId: result.id,
        score,
        total,
        percentage,
        passed,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("QUIZ_SUBMIT_ERROR:", error);

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