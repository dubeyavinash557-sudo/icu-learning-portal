import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

type SubmittedAnswers = Record<string, unknown>;

type CourseAccessData = {
  id: string;
  title: string;
  price: number;
  isPremium: boolean;
};

function isFreeDemoCourse(course: CourseAccessData) {
  return (
    course.price === 0 &&
    course.isPremium === false
  );
}

function isPremiumCourse(course: CourseAccessData) {
  return (
    course.price > 0 &&
    course.isPremium === true
  );
}

function getPaymentAmountInPaise(amount: number) {
  return Math.round(Number(amount) * 100);
}

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

function errorResponse(
  message: string,
  status = 400
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    {
      status,
    }
  );
}

export async function POST(req: Request) {
  try {
    // --------------------------------------------------
    // 1. Authenticate user
    // --------------------------------------------------

    const session = await auth();

    const email = session?.user?.email
      ?.trim()
      .toLowerCase();

    if (!email) {
      return errorResponse(
        "Unauthorized.",
        401
      );
    }

    // --------------------------------------------------
    // 2. Find logged-in user
    // --------------------------------------------------

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return errorResponse(
        "User not found.",
        404
      );
    }

    // --------------------------------------------------
    // 3. Parse request body
    // --------------------------------------------------

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return errorResponse(
        "Invalid JSON request body."
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return errorResponse(
        "Invalid request body."
      );
    }

    const requestBody = body as {
      quizId?: unknown;
      answers?: unknown;
    };

    const quizId = requestBody.quizId;
    const answers = requestBody.answers;

    // --------------------------------------------------
    // 4. Validate quiz ID
    // --------------------------------------------------

    if (
      typeof quizId !== "string" ||
      quizId.trim().length === 0
    ) {
      return errorResponse(
        "Quiz ID is required."
      );
    }

    const normalizedQuizId = quizId.trim();

    // --------------------------------------------------
    // 5. Validate submitted answers
    // --------------------------------------------------

    if (
      !answers ||
      typeof answers !== "object" ||
      Array.isArray(answers)
    ) {
      return errorResponse(
        "Answers are required."
      );
    }

    const submittedAnswers =
      answers as SubmittedAnswers;

          // --------------------------------------------------
    // 6. Load quiz and course
    // --------------------------------------------------

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: normalizedQuizId,
      },
      select: {
        id: true,
        courseId: true,
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            isPremium: true,
          },
        },
        questions: {
          orderBy: {
            id: "asc",
          },
          select: {
            id: true,
            question: true,
            optionA: true,
            optionB: true,
            optionC: true,
            optionD: true,
            correctAnswer: true,
            marks: true,
          },
        },
      },
    });

    if (!quiz || !quiz.course) {
      return errorResponse(
        "Quiz not found.",
        404
      );
    }

    if (quiz.questions.length === 0) {
      return errorResponse(
        "This quiz does not contain any questions."
      );
    }

    const course = quiz.course;

    const freeDemoCourse =
      isFreeDemoCourse(course);

    const premiumCourse =
      isPremiumCourse(course);

    // --------------------------------------------------
    // 7. Reject invalid course configuration
    // --------------------------------------------------

    if (
      !freeDemoCourse &&
      !premiumCourse
    ) {
      console.error(
        "INVALID QUIZ COURSE CONFIGURATION",
        {
          userId: user.id,
          quizId: quiz.id,
          courseId: course.id,
          courseTitle: course.title,
          price: course.price,
          isPremium: course.isPremium,
        }
      );

      return errorResponse(
        "This course is not correctly configured.",
        403
      );
    }

    // --------------------------------------------------
    // 8. Find enrollment
    // --------------------------------------------------

    const enrollment =
      await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
        select: {
          id: true,
          progress: true,
          completed: true,
        },
      });

    // --------------------------------------------------
    // 9. Enrollment is required for every quiz
    // --------------------------------------------------

    if (!enrollment) {
      return errorResponse(
        "You must enroll in this course before attempting the quiz.",
        403
      );
    }

        // --------------------------------------------------
    // 10. Premium payment verification
    // --------------------------------------------------

    if (
      premiumCourse &&
      user.role !== "ADMIN"
    ) {
      const successfulPayment =
        await prisma.payment.findFirst({
          where: {
            userId: user.id,
            courseId: course.id,
            status: "SUCCESS",
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            amount: true,
            transactionId: true,
            razorpayOrderId: true,
            razorpayPaymentId: true,
          },
        });

      if (!successfulPayment) {
        return errorResponse(
          "Successful payment is required before attempting this premium quiz.",
          403
        );
      }

      const expectedAmountInPaise =
        getPaymentAmountInPaise(
          course.price
        );

      const actualAmountInPaise =
        getPaymentAmountInPaise(
          successfulPayment.amount
        );

      const hasValidOrderId =
        typeof successfulPayment.razorpayOrderId ===
          "string" &&
        successfulPayment.razorpayOrderId.trim()
          .length > 0;

      const hasValidPaymentId =
        typeof successfulPayment.razorpayPaymentId ===
          "string" &&
        successfulPayment.razorpayPaymentId.trim()
          .length > 0;

      const hasValidTransactionId =
        typeof successfulPayment.transactionId ===
          "string" &&
        successfulPayment.transactionId.trim()
          .length > 0;

      const amountMatches =
        expectedAmountInPaise ===
        actualAmountInPaise;

      if (
        !hasValidOrderId ||
        !hasValidPaymentId ||
        !hasValidTransactionId ||
        !amountMatches
      ) {
        console.error(
          "QUIZ SUBMIT PAYMENT VALIDATION FAILED",
          {
            userId: user.id,
            quizId: quiz.id,
            courseId: course.id,
            paymentId: successfulPayment.id,
            expectedAmountInPaise,
            actualAmountInPaise,
            hasValidOrderId,
            hasValidPaymentId,
            hasValidTransactionId,
          }
        );

        return errorResponse(
          "Your payment could not be verified. Please contact support.",
          403
        );
      }
    }

    // --------------------------------------------------
    // 11. Validate question IDs
    // --------------------------------------------------

    const validQuestionIds = new Set(
      quiz.questions.map(
        (question) => question.id
      )
    );

    const submittedQuestionIds =
      Object.keys(submittedAnswers);

    const hasInvalidQuestionId =
      submittedQuestionIds.some(
        (questionId) =>
          !validQuestionIds.has(questionId)
      );

    if (hasInvalidQuestionId) {
      return errorResponse(
        "Invalid question data submitted."
      );
    }

        // --------------------------------------------------
    // 12. Require every question
    // --------------------------------------------------

    for (const question of quiz.questions) {
      const rawAnswer =
        submittedAnswers[question.id];

      if (
        typeof rawAnswer !== "string" ||
        rawAnswer.trim().length === 0
      ) {
        return errorResponse(
          "Please answer all questions before submitting the quiz."
        );
      }
    }

    // --------------------------------------------------
    // 13. Calculate score server-side
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

      const validSelectedAnswer =
        validOptions.some(
          (option) =>
            option.trim() === selectedAnswer
        );

      if (!validSelectedAnswer) {
        return errorResponse(
          "Invalid answer submitted."
        );
      }

      const correctOption =
        getCorrectOption(question);

      const isCorrect =
        selectedAnswer.trim() ===
        correctOption.trim();

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
    // 14. Calculate result
    // --------------------------------------------------

    const total = quiz.questions.reduce(
      (sum, question) =>
        sum + Math.max(0, question.marks),
      0
    );

    const percentage =
      total === 0
        ? 0
        : Math.round(
            (score / total) * 100
          );

    const passed =
      percentage >= 70;

    // --------------------------------------------------
    // 15. Save attempt and answers
    // --------------------------------------------------

    const result =
      await prisma.$transaction(
        async (tx) => {
          const quizAttempt =
            await tx.quizAttempt.create({
              data: {
                userId: user.id,
                quizId: quiz.id,
                score,
                total,
                percentage,
                passed,
              },
            });

          await tx.quizAttemptAnswer.createMany({
            data: answerRecords.map(
              (answer) => ({
                attemptId: quizAttempt.id,
                questionId: answer.questionId,
                selectedAnswer:
                  answer.selectedAnswer,
                correctAnswer:
                  answer.correctAnswer,
                isCorrect:
                  answer.isCorrect,
                marks: answer.marks,
              })
            ),
          });

                    // ------------------------------------------------
          // 16. Certificate policy
          //
          // Free Demo:
          // - No certificate
          //
          // Premium:
          // - Certificate after passing
          //
          // Admin:
          // - Allowed for testing
          // ------------------------------------------------

          if (
            passed &&
            premiumCourse
          ) {
            const existingCertificate =
              await tx.certificate.findFirst({
                where: {
                  userId: user.id,
                  courseId: course.id,
                },
                select: {
                  id: true,
                },
              });

            if (!existingCertificate) {
              const certificateNumber =
                `ICU-${Date.now()}-${user.id
                  .slice(-6)
                  .toUpperCase()}`;

              await tx.certificate.create({
                data: {
                  userId: user.id,
                  courseId: course.id,
                  certificateNo:
                    certificateNumber,
                  issuedAt: new Date(),
                },
              });
            }
          }

          return quizAttempt;
        }
      );

    // --------------------------------------------------
    // 17. Return safe response
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        attemptId: result.id,
        score,
        total,
        percentage,
        passed,
        isFreeDemo: freeDemoCourse,
        isPremium: premiumCourse,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "QUIZ_SUBMIT_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}