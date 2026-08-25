import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import {
  Trophy,
  CheckCircle,
  XCircle,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    quizId: string;
  }>;
}

export default async function QuizResultPage({
  params,
}: PageProps) {
  // --------------------------------------------------
  // 1. Authentication
  // --------------------------------------------------
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
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
    redirect("/login");
  }

  // --------------------------------------------------
  // 3. Quiz ID
  // --------------------------------------------------
  const { quizId } = await params;

  // --------------------------------------------------
  // 4. Get latest attempt for this user + quiz
  // --------------------------------------------------
  const attempt =
    await prisma.quizAttempt.findUnique({
      where: {
        userId_quizId: {
          userId: user.id,
          quizId,
        },
      },
      include: {
        quiz: {
          include: {
            course: true,
            questions: {
              orderBy: {
                id: "asc",
              },
            },
          },
        },
        answers: true,
      },
    });

  // --------------------------------------------------
  // 5. Attempt not found
  // --------------------------------------------------
  if (!attempt) {
    notFound();
  }

  // --------------------------------------------------
  // 6. Calculate result statistics from questions
  // --------------------------------------------------
  const correctAnswers =
    attempt.quiz.questions.filter(
      (question) => {
        const answer =
          attempt.answers.find(
            (item) =>
              item.questionId ===
              question.id
          );

        return answer?.isCorrect === true;
      }
    ).length;

  const wrongAnswers =
    attempt.quiz.questions.length -
    correctAnswers;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Trophy
            className="mx-auto text-yellow-500"
            size={70}
          />

          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            Quiz Result
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            {attempt.quiz.title}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {attempt.quiz.course.title}
          </p>
        </div>

        {/* Score Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xl sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Score */}
            <div className="rounded-2xl bg-blue-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-500">
                Score
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-600 sm:text-4xl">
                {attempt.score}/{attempt.total}
              </h2>
            </div>

            {/* Percentage */}
            <div className="rounded-2xl bg-purple-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-500">
                Percentage
              </p>

              <h2 className="mt-2 text-3xl font-bold text-purple-600 sm:text-4xl">
                {attempt.percentage}%
              </h2>
            </div>

            {/* Correct */}
            <div className="rounded-2xl bg-green-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-500">
                Correct
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600 sm:text-4xl">
                {correctAnswers}
              </h2>
            </div>

            {/* Wrong */}
            <div className="rounded-2xl bg-red-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-500">
                Wrong
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600 sm:text-4xl">
                {wrongAnswers}
              </h2>
            </div>
          </div>

          {/* Status */}
          <div className="mt-8 text-center">
            {attempt.passed ? (
              <div className="inline-flex items-center gap-3 rounded-full bg-green-100 px-7 py-4 font-bold text-green-700">
                <CheckCircle size={26} />
                PASS
              </div>
            ) : (
              <div className="inline-flex items-center gap-3 rounded-full bg-red-100 px-7 py-4 font-bold text-red-700">
                <XCircle size={26} />
                FAIL
              </div>
            )}
          </div>

          {/* Message */}
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-center">
            {attempt.passed ? (
              <>
                <h2 className="text-2xl font-bold text-green-700">
                  Congratulations! 🎉
                </h2>

                <p className="mt-2 text-slate-600">
                  You passed this quiz successfully.
                  Your certificate eligibility has
                  been recorded.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-800">
                  Keep Learning 💪
                </h2>

                <p className="mt-2 text-slate-600">
                  You scored {attempt.percentage}%.
                  You need at least 70% to pass this
                  quiz.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Answer Review */}
        <div className="mt-8">
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Answer Review
          </h2>

          <div className="space-y-5">
            {attempt.quiz.questions.map(
              (question, index) => {
                const answer =
                  attempt.answers.find(
                    (item) =>
                      item.questionId ===
                      question.id
                  );

                const isCorrect =
                  answer?.isCorrect === true;

                return (
                  <div
                    key={question.id}
                    className={`rounded-3xl border bg-white p-5 shadow-sm sm:p-6 ${
                      isCorrect
                        ? "border-green-200"
                        : "border-red-200"
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-400">
                          Question {index + 1}
                        </p>

                        <h3 className="mt-2 text-lg font-bold leading-7 text-slate-900">
                          {question.question}
                        </h3>
                      </div>

                      {isCorrect ? (
                        <CheckCircle
                          className="shrink-0 text-green-500"
                          size={28}
                        />
                      ) : (
                        <XCircle
                          className="shrink-0 text-red-500"
                          size={28}
                        />
                      )}
                    </div>

                    {/* Your Answer */}
                    <div
                      className={`mt-5 rounded-2xl p-4 ${
                        isCorrect
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      <p className="text-sm font-semibold text-slate-500">
                        Your Answer
                      </p>

                      <p
                        className={`mt-1 font-semibold ${
                          isCorrect
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {answer?.selectedAnswer ||
                          "Not Answered"}
                      </p>
                    </div>

                    {/* Correct Answer */}
                    {!isCorrect && (
                      <div className="mt-4 rounded-2xl bg-green-50 p-4">
                        <p className="text-sm font-semibold text-slate-500">
                          Correct Answer
                        </p>

                        <p className="mt-1 font-semibold text-green-700">
                          {answer?.correctAnswer ||
                            "Correct answer unavailable"}
                        </p>
                      </div>
                    )}

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="mt-4 rounded-2xl bg-blue-50 p-4">
                        <p className="text-sm font-semibold text-blue-600">
                          Explanation
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-700">
                          {question.explanation}
                        </p>
                      </div>
                    )}

                    {/* Marks */}
                    <div className="mt-4 flex justify-end">
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-bold ${
                          isCorrect
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isCorrect
                          ? `+${answer?.marks ?? 0} Mark${
                              (answer?.marks ?? 0) ===
                              1
                                ? ""
                                : "s"
                            }`
                          : "0 Marks"}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          {/* Retake */}
          <Link
            href={`/quiz/${quizId}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <RotateCcw size={18} />
            Retake Quiz
          </Link>

          {/* Dashboard */}
          <Link
            href="/dashboard/quiz"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-300"
          >
            <ArrowLeft size={18} />
            Quiz Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}