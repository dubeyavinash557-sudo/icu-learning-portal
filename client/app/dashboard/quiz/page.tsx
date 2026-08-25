import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Trophy,
  BookOpen,
  CheckCircle,
  Award,
  ArrowRight,
} from "lucide-react";

export default async function QuizDashboardPage() {
  // --------------------------------------------------
  // 1. Authentication
  // --------------------------------------------------
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // --------------------------------------------------
  // 2. Find user
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
  // 3. Get quizzes
  // --------------------------------------------------
  const quizzes = await prisma.quiz.findMany({
    include: {
      course: true,
      questions: true,
      quizAttempts: {
        where: {
          userId: user.id,
        },
        select: {
          id: true,
          percentage: true,
          passed: true,
          score: true,
          total: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // --------------------------------------------------
  // 4. Statistics
  // --------------------------------------------------
  const totalQuizzes = quizzes.length;

  const completedQuizzes = quizzes.filter(
    (quiz) => quiz.quizAttempts.length > 0
  ).length;

  const attemptedQuizzes = quizzes.filter(
    (quiz) => quiz.quizAttempts.length > 0
  );

  const averageScore =
    attemptedQuizzes.length === 0
      ? 0
      : Math.round(
          attemptedQuizzes.reduce(
            (sum, quiz) =>
              sum +
              (quiz.quizAttempts[0]?.percentage ??
                0),
            0
          ) / attemptedQuizzes.length
        );

  const certificates =
    await prisma.certificate.count({
      where: {
        userId: user.id,
      },
    });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Quiz Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Test your ICU nursing knowledge and track
            your progress.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Quizzes */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
            <BookOpen
              className="mb-3 text-blue-600"
              size={28}
            />

            <h2 className="text-3xl font-bold text-slate-900">
              {totalQuizzes}
            </h2>

            <p className="mt-1 text-gray-500">
              Total Quizzes
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
            <CheckCircle
              className="mb-3 text-green-600"
              size={28}
            />

            <h2 className="text-3xl font-bold text-slate-900">
              {completedQuizzes}
            </h2>

            <p className="mt-1 text-gray-500">
              Completed
            </p>
          </div>

          {/* Average Score */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
            <Trophy
              className="mb-3 text-yellow-500"
              size={28}
            />

            <h2 className="text-3xl font-bold text-slate-900">
              {averageScore}%
            </h2>

            <p className="mt-1 text-gray-500">
              Average Score
            </p>
          </div>

          {/* Certificates */}
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
            <Award
              className="mb-3 text-purple-600"
              size={28}
            />

            <h2 className="text-3xl font-bold text-slate-900">
              {certificates}
            </h2>

            <p className="mt-1 text-gray-500">
              Certificates
            </p>
          </div>
        </div>

        {/* Quiz List */}
        {quizzes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {quizzes.map((quiz) => {
              const attempt =
                quiz.quizAttempts[0];

              const attempted =
                Boolean(attempt);

              return (
                <div
                  key={quiz.id}
                  className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  {/* Quiz title */}
                  <h2 className="text-xl font-bold text-slate-900">
                    {quiz.title}
                  </h2>

                  {/* Course */}
                  <p className="mt-2 text-gray-500">
                    Course: {quiz.course.title}
                  </p>

                  {/* Questions */}
                  <p className="mt-3 text-sm text-slate-600">
                    Questions:{" "}
                    <span className="font-semibold">
                      {quiz.questions.length}
                    </span>
                  </p>

                  {/* Attempt status */}
                  <div className="mt-5">
                    {attempted ? (
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p
                              className={`font-semibold ${
                                attempt.passed
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {attempt.passed
                                ? "Completed • Passed"
                                : "Completed • Failed"}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Score:{" "}
                              {attempt.score}/
                              {attempt.total} (
                              {attempt.percentage}%)
                            </p>
                          </div>

                          <Link
                            href={`/quiz/${quiz.id}/result`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                          >
                            View Result
                            <ArrowRight
                              size={18}
                            />
                          </Link>
                        </div>

                        <Link
                          href={`/quiz/${quiz.id}`}
                          className="mt-3 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Retake Quiz →
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={`/quiz/${quiz.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                      >
                        Start Quiz
                        <ArrowRight
                          size={18}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <BookOpen
              className="mx-auto text-slate-300"
              size={50}
            />

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No quizzes available
            </h2>

            <p className="mt-2 text-slate-500">
              New quizzes will appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}