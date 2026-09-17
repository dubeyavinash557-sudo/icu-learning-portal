import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import {
  Trophy,
  CheckCircle,
  XCircle,
  ArrowLeft,
  RotateCcw,
  Award,
  BarChart3,
  CalendarDays,
  Target,
  TrendingUp,
  History,
  CircleAlert,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    quizId: string;
  }>;
  searchParams: Promise<{
    attemptId?: string;
  }>;
}

export default async function QuizResultPage({
  params,
  searchParams,
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
  const { attemptId } = await searchParams;

  if (!attemptId?.trim()) {
    notFound();
  }

  // --------------------------------------------------
  // 4. Get latest attempt
  // --------------------------------------------------
  const attempt = await prisma.quizAttempt.findFirst({
    where: {
      id: attemptId,
      userId: user.id,
      quizId,
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
  // 6. Get all attempts for this quiz
  // --------------------------------------------------
  const allAttempts = await prisma.quizAttempt.findMany({
    where: {
      userId: user.id,
      quizId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      score: true,
      total: true,
      percentage: true,
      passed: true,
      createdAt: true,
    },
  });

  // --------------------------------------------------
  // 7. Attempt statistics
  // --------------------------------------------------
  const totalAttempts = allAttempts.length;

  const currentAttemptIndex = allAttempts.findIndex(
    (item) => item.id === attempt.id
  );

  const currentAttemptNumber =
    currentAttemptIndex >= 0
      ? totalAttempts - currentAttemptIndex
      : totalAttempts;

  const bestPercentage =
    allAttempts.length > 0
      ? Math.max(
          ...allAttempts.map(
            (item) => item.percentage
          )
        )
      : attempt.percentage;

  const bestAttempt =
    allAttempts.find(
      (item) => item.percentage === bestPercentage
    ) ?? allAttempts[0];

  const passedAttempts = allAttempts.filter(
    (item) => item.passed
  ).length;

  const passRate =
    totalAttempts > 0
      ? Math.round(
          (passedAttempts / totalAttempts) * 100
        )
      : 0;

  // --------------------------------------------------
  // 8. Current attempt statistics
  // --------------------------------------------------
  const totalQuestions =
    attempt.quiz.questions.length;

  const correctAnswers =
    attempt.answers.filter(
      (answer) => answer.isCorrect === true
    ).length;

  const answeredQuestions =
    attempt.answers.filter(
      (answer) =>
        Boolean(
          answer.selectedAnswer &&
            answer.selectedAnswer.trim()
        )
    ).length;

  const unansweredQuestions = Math.max(
    totalQuestions - answeredQuestions,
    0
  );

  const wrongAnswers = Math.max(
    answeredQuestions - correctAnswers,
    0
  );

  // --------------------------------------------------
  // 9. Display helpers
  // --------------------------------------------------
  const formattedDate =
    attempt.createdAt.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  const formattedTime =
    attempt.createdAt.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  const bestScoreText = bestAttempt
    ? `${bestAttempt.score}/${bestAttempt.total}`
    : `${attempt.score}/${attempt.total}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ==================================================
            TOP HEADER
        ================================================== */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 text-white shadow-2xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-200 backdrop-blur">
                <Trophy size={15} />
                Quiz Result
              </div>

              <h1 className="text-2xl font-bold sm:text-4xl">
                {attempt.quiz.title}
              </h1>

              <p className="mt-2 text-sm text-blue-200 sm:text-base">
                {attempt.quiz.course.title}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  {formattedDate}
                </span>

                <span className="hidden text-slate-600 sm:inline">
                  •
                </span>

                <span>{formattedTime}</span>

                <span className="hidden text-slate-600 sm:inline">
                  •
                </span>

                <span>
                  Attempt #{currentAttemptNumber}
                </span>
              </div>
            </div>

            <div
              className={`flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 ${
                attempt.passed
                  ? "border-green-400 bg-green-500/15"
                  : "border-red-400 bg-red-500/15"
              }`}
            >
              <span className="text-3xl font-black">
                {Math.round(attempt.percentage)}%
              </span>

              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                Score
              </span>
            </div>
          </div>
        </section>

        {/* ==================================================
            RESULT STATUS
        ================================================== */}
        <section className="mb-8">
          {attempt.passed ? (
            <div className="rounded-3xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-100">
                  <Award
                    size={34}
                    className="text-green-600"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-green-800">
                      Congratulations! 🎉
                    </h2>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                      <CheckCircle size={14} />
                      Passed
                    </span>
                  </div>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-green-700 sm:text-base">
                    Excellent work. You successfully passed
                    this quiz and your result has been
                    recorded in your learning profile.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100">
                  <TrendingUp
                    size={34}
                    className="text-orange-600"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-orange-900">
                      Keep Learning 💪
                    </h2>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                      <XCircle size={14} />
                      Failed
                    </span>
                  </div>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-orange-800 sm:text-base">
                    You scored{" "}
                    <strong>
                      {Math.round(attempt.percentage)}%
                    </strong>
                    . A minimum score of{" "}
                    <strong>70%</strong> is required to
                    pass this quiz. Review the answers below
                    and try again.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ==================================================
            PERFORMANCE OVERVIEW
        ================================================== */}
        <section className="mb-8">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Performance Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your performance in this quiz
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Score */}
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Latest Score
                  </p>

                  <p className="mt-2 text-3xl font-black text-blue-600">
                    {attempt.score}/{attempt.total}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3">
                  <Target
                    size={22}
                    className="text-blue-600"
                  />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Attempt #{currentAttemptNumber}
              </p>
            </div>

            {/* Best Score */}
            <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Best Score
                  </p>

                  <p className="mt-2 text-3xl font-black text-purple-600">
                    {Math.round(bestPercentage)}%
                  </p>
                </div>

                <div className="rounded-xl bg-purple-50 p-3">
                  <Trophy
                    size={22}
                    className="text-purple-600"
                  />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {bestScoreText}
              </p>
            </div>

            {/* Attempts */}
            <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Attempts
                  </p>

                  <p className="mt-2 text-3xl font-black text-indigo-600">
                    {totalAttempts}
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3">
                  <History
                    size={22}
                    className="text-indigo-600"
                  />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Quiz attempts recorded
              </p>
            </div>

            {/* Pass Rate */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Pass Rate
                  </p>

                  <p className="mt-2 text-3xl font-black text-emerald-600">
                    {passRate}%
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-3">
                  <BarChart3
                    size={22}
                    className="text-emerald-600"
                  />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {passedAttempts} of {totalAttempts} passed
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            CURRENT ATTEMPT BREAKDOWN
        ================================================== */}
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Current Attempt
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Detailed breakdown of your latest submission
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Correct */}
            <div className="rounded-2xl bg-green-50 p-5">
              <div className="flex items-center gap-3">
                <CheckCircle
                  size={25}
                  className="text-green-600"
                />

                <div>
                  <p className="text-sm font-medium text-green-700">
                    Correct
                  </p>

                  <p className="text-2xl font-black text-green-700">
                    {correctAnswers}
                  </p>
                </div>
              </div>
            </div>

            {/* Wrong */}
            <div className="rounded-2xl bg-red-50 p-5">
              <div className="flex items-center gap-3">
                <XCircle
                  size={25}
                  className="text-red-600"
                />

                <div>
                  <p className="text-sm font-medium text-red-700">
                    Wrong
                  </p>

                  <p className="text-2xl font-black text-red-700">
                    {wrongAnswers}
                  </p>
                </div>
              </div>
            </div>

            {/* Unanswered */}
            <div className="rounded-2xl bg-amber-50 p-5">
              <div className="flex items-center gap-3">
                <CircleAlert
                  size={25}
                  className="text-amber-600"
                />

                <div>
                  <p className="text-sm font-medium text-amber-700">
                    Unanswered
                  </p>

                  <p className="text-2xl font-black text-amber-700">
                    {unansweredQuestions}
                  </p>
                </div>
              </div>
            </div>

            {/* Percentage */}
            <div className="rounded-2xl bg-blue-50 p-5">
              <div className="flex items-center gap-3">
                <BarChart3
                  size={25}
                  className="text-blue-600"
                />

                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Percentage
                  </p>

                  <p className="text-2xl font-black text-blue-700">
                    {Math.round(attempt.percentage)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            ATTEMPT HISTORY
        ================================================== */}
        {totalAttempts > 1 && (
          <section className="mb-8">
            <div className="mb-5">
              <div className="flex items-center gap-3">
                <History
                  size={24}
                  className="text-blue-600"
                />

                <h2 className="text-2xl font-bold text-slate-900">
                  Attempt History
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Your previous attempts for this quiz
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="hidden grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500 sm:grid">
                <div className="col-span-2">
                  Attempt
                </div>

                <div className="col-span-2">
                  Score
                </div>

                <div className="col-span-2">
                  Percentage
                </div>

                <div className="col-span-3">
                  Date
                </div>

                <div className="col-span-3 text-right">
                  Status
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {allAttempts.map(
                  (item, index) => {
                    const attemptNumber =
                      totalAttempts - index;

                    const itemDate =
                      item.createdAt.toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      );

                    const isLatest =
                      item.id === attempt.id;

                    return (
                      <div
                        key={item.id}
                        className={`grid gap-3 px-5 py-5 sm:grid-cols-12 sm:items-center sm:gap-4 ${
                          isLatest
                            ? "bg-blue-50/50"
                            : "bg-white"
                        }`}
                      >
                        {/* Attempt */}
                        <div className="sm:col-span-2">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
                              {attemptNumber}
                            </div>

                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                Attempt #{attemptNumber}
                              </p>

                              {isLatest && (
                                <span className="text-xs font-semibold text-blue-600">
                                  Latest
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="sm:col-span-2">
                          <p className="text-xs text-slate-400 sm:hidden">
                            Score
                          </p>

                          <p className="font-bold text-slate-900">
                            {item.score}/{item.total}
                          </p>
                        </div>

                        {/* Percentage */}
                        <div className="sm:col-span-2">
                          <p className="text-xs text-slate-400 sm:hidden">
                            Percentage
                          </p>

                          <p className="font-bold text-blue-600">
                            {Math.round(item.percentage)}%
                          </p>
                        </div>

                        {/* Date */}
                        <div className="sm:col-span-3">
                          <p className="text-xs text-slate-400 sm:hidden">
                            Date
                          </p>

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays
                              size={15}
                              className="text-slate-400"
                            />

                            {itemDate}
                          </div>
                        </div>

                        {/* Status */}
                        <div className="sm:col-span-3 sm:text-right">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                              item.passed
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.passed ? (
                              <CheckCircle size={13} />
                            ) : (
                              <XCircle size={13} />
                            )}

                            {item.passed
                              ? "Passed"
                              : "Failed"}
                          </span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================
            ANSWER REVIEW
        ================================================== */}
        <section className="mb-8">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Answer Review
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review your answers and learn from your
              mistakes
            </p>
          </div>

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

                const hasAnswer = Boolean(
                  answer?.selectedAnswer &&
                    answer.selectedAnswer.trim()
                );

                return (
                  <article
                    key={question.id}
                    className={`overflow-hidden rounded-3xl border bg-white shadow-sm ${
                      isCorrect
                        ? "border-green-200"
                        : "border-red-200"
                    }`}
                  >
                    {/* Question Header */}
                    <div
                      className={`border-b px-5 py-5 sm:px-7 ${
                        isCorrect
                          ? "bg-green-50/60"
                          : "bg-red-50/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 gap-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                              isCorrect
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {index + 1}
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Question {index + 1}
                            </p>

                            <h3 className="mt-2 text-base font-bold leading-7 text-slate-900 sm:text-lg">
                              {question.question}
                            </h3>
                          </div>
                        </div>

                        <div className="shrink-0">
                          {isCorrect ? (
                            <CheckCircle
                              size={28}
                              className="text-green-500"
                            />
                          ) : (
                            <XCircle
                              size={28}
                              className="text-red-500"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Answer Body */}
                    <div className="space-y-4 p-5 sm:p-7">

                      {/* Your Answer */}
                      <div
                        className={`rounded-2xl border p-4 ${
                          isCorrect
                            ? "border-green-100 bg-green-50"
                            : "border-red-100 bg-red-50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Your Answer
                          </p>

                          {isCorrect ? (
                            <span className="text-xs font-bold text-green-600">
                              Correct
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-red-600">
                              Incorrect
                            </span>
                          )}
                        </div>

                        <p
                          className={`mt-2 font-semibold ${
                            isCorrect
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {hasAnswer
                            ? answer?.selectedAnswer
                            : "Not Answered"}
                        </p>
                      </div>

                      {/* Correct Answer */}
                      {!isCorrect && (
                        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Correct Answer
                          </p>

                          <p className="mt-2 font-semibold text-green-700">
                            {answer?.correctAnswer ||
                              "Correct answer unavailable"}
                          </p>
                        </div>
                      )}

                      {/* Explanation */}
                      {question.explanation && (
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            Explanation
                          </p>

                          <p className="mt-2 text-sm leading-7 text-slate-700">
                            {question.explanation}
                          </p>
                        </div>
                      )}

                      {/* Marks */}
                      <div className="flex justify-end">
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-bold ${
                            isCorrect
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {isCorrect
                            ? `+${answer?.marks ?? 0} ${
                                (answer?.marks ?? 0) === 1
                                  ? "Mark"
                                  : "Marks"
                              }`
                            : "0 Marks"}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>

        {/* ==================================================
            ACTIONS
        ================================================== */}
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Ready for your next attempt?
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Continue practicing to improve your score.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <Link
                href={`/quiz/${quizId}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                <RotateCcw size={18} />
                Retake Quiz
              </Link>

              <Link
                href="/dashboard/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              >
                <ArrowLeft size={18} />
                Quiz Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* ==================================================
            FOOTER NOTE
        ================================================== */}
        <div className="pb-6 text-center">
          <p className="text-xs text-slate-400">
            Your quiz results are securely stored in your
            ICU Learning Portal learning profile.
          </p>
        </div>
      </div>
    </main>
  );
}