import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function QuizDashboardPage() {
  // ==========================================================
  // 1. AUTHENTICATION
  // ==========================================================

  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // ==========================================================
  // 2. FIND CURRENT USER
  // ==========================================================

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      fullName: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // ==========================================================
  // 3. GET QUIZZES
  // ==========================================================
  //
  // We only fetch the data required by the dashboard.
  // Question content itself is NOT loaded here.
  //
  // This keeps the dashboard lighter and faster.
  // ==========================================================

  const quizzes = await prisma.quiz.findMany({
    include: {
      course: {
        select: {
          id: true,
          title: true,
        },
      },

      _count: {
        select: {
          questions: true,
        },
      },

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

  // ==========================================================
  // 4. STATISTICS
  // ==========================================================

  const totalQuizzes = quizzes.length;

  const attemptedQuizzes = quizzes.filter(
    (quiz) => quiz.quizAttempts.length > 0
  );

  const completedQuizzes = attemptedQuizzes.length;

  const passedQuizzes = attemptedQuizzes.filter(
    (quiz) => quiz.quizAttempts[0]?.passed === true
  ).length;

  const failedQuizzes = attemptedQuizzes.filter(
    (quiz) => quiz.quizAttempts[0]?.passed === false
  ).length;

  const averageScore =
    attemptedQuizzes.length === 0
      ? 0
      : Math.round(
          attemptedQuizzes.reduce(
            (sum, quiz) =>
              sum +
              Number(
                quiz.quizAttempts[0]?.percentage ?? 0
              ),
            0
          ) / attemptedQuizzes.length
        );

  const certificates = await prisma.certificate.count({
    where: {
      userId: user.id,
    },
  });

  const completionRate =
    totalQuizzes === 0
      ? 0
      : Math.round(
          (completedQuizzes / totalQuizzes) * 100
        );

  // ==========================================================
  // 5. DISPLAY NAME
  // ==========================================================

  const studentName =
    user.fullName?.trim() || "Student";

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* ======================================================
          TOP HEADER
      ======================================================= */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020617]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 transition group-hover:scale-105">
              <GraduationCap size={21} />
            </div>

            <div>
              <p className="text-sm font-black tracking-tight text-white">
                ICU Learning
              </p>

              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Professional LMS
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-extrabold text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10 hover:text-cyan-300"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">
              Dashboard
            </span>
          </Link>
        </div>
      </header>

      {/* ======================================================
          PAGE CONTENT
      ======================================================= */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* ====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-gradient-to-br from-blue-700 via-blue-800 to-cyan-700 p-6 shadow-2xl shadow-blue-950/30 sm:p-8 lg:p-10">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-300/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Sparkles size={13} />
              Professional Assessment Center
            </div>

            <div className="mt-6 max-w-3xl">
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                ICU Quiz Dashboard
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                Welcome back,{" "}
                <span className="font-black text-white">
                  {studentName}
                </span>
                . Test your ICU nursing knowledge,
                strengthen weak areas, and track your
                assessment performance.
              </p>
            </div>

            {/* Hero metrics */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <HeroMetric
                icon={<ClipboardCheck size={18} />}
                label="Available Quizzes"
                value={String(totalQuizzes)}
              />

              <HeroMetric
                icon={<Target size={18} />}
                label="Average Score"
                value={`${averageScore}%`}
              />

              <HeroMetric
                icon={<CheckCircle2 size={18} />}
                label="Completion"
                value={`${completionRate}%`}
              />
            </div>
          </div>
        </section>

        {/* ====================================================
            STATISTICS
        ===================================================== */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<BookOpen size={21} />}
            iconClass="bg-blue-500/10 text-blue-400 ring-blue-400/10"
            value={totalQuizzes}
            label="Total Quizzes"
            description="Assessments available"
          />

          <StatCard
            icon={<CheckCircle2 size={21} />}
            iconClass="bg-emerald-500/10 text-emerald-400 ring-emerald-400/10"
            value={completedQuizzes}
            label="Completed"
            description="Quizzes attempted"
          />

          <StatCard
            icon={<Trophy size={21} />}
            iconClass="bg-amber-500/10 text-amber-400 ring-amber-400/10"
            value={`${averageScore}%`}
            label="Average Score"
            description="Your assessment average"
          />

          <StatCard
            icon={<Award size={21} />}
            iconClass="bg-violet-500/10 text-violet-400 ring-violet-400/10"
            value={certificates}
            label="Certificates"
            description="Professional achievements"
          />
        </section>

        {/* ====================================================
            PERFORMANCE SUMMARY
        ===================================================== */}

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#0f172a] p-5 shadow-xl shadow-black/10 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                Assessment Performance
              </p>

              <h2 className="mt-2 text-xl font-black text-white">
                Your quiz progress
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Keep practicing to improve your ICU
                knowledge and clinical confidence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <MiniPerformance
                value={passedQuizzes}
                label="Passed"
                valueClass="text-emerald-400"
              />

              <MiniPerformance
                value={failedQuizzes}
                label="Needs Practice"
                valueClass="text-red-400"
              />

              <MiniPerformance
                value={certificates}
                label="Certificates"
                valueClass="text-amber-400"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400">
                Quiz completion
              </span>

              <span className="font-black text-cyan-400">
                {completionRate}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all"
                style={{
                  width: `${completionRate}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* ====================================================
            QUIZ SECTION HEADER
        ===================================================== */}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
              Assessment Library
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Available Quizzes
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Select an assessment and test your clinical
              knowledge.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-extrabold text-slate-300 transition hover:border-cyan-400/20 hover:bg-white/10 hover:text-cyan-300 sm:self-auto"
          >
            Explore Courses
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* ====================================================
            QUIZ LIST
        ===================================================== */}

        {quizzes.length > 0 ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {quizzes.map((quiz) => {
              const attempt = quiz.quizAttempts[0];

              const attempted = Boolean(attempt);

              return (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  attempt={attempt}
                  attempted={attempted}
                />
              );
            })}
          </div>
        ) : (
          <EmptyQuizState />
        )}

        {/* ====================================================
            FOOTER
        ===================================================== */}

        <footer className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              ICU Learning Portal · Professional LMS
            </p>

            <p>
              Learn · Practice · Assess · Achieve
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ============================================================
   HERO METRIC
============================================================ */

function HeroMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-100">
          {icon}
        </div>

        <div>
          <p className="text-lg font-black text-white">
            {value}
          </p>

          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  iconClass,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;
  iconClass: string;
  value: number | string;
  label: string;
  description: string;
}) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-[#0f172a] p-5 shadow-xl shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-[#111c31]">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${iconClass}`}
        >
          {icon}
        </div>

        <p className="text-3xl font-black tracking-tight text-white">
          {value}
        </p>
      </div>

      <h3 className="mt-5 text-sm font-black text-white">
        {label}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </article>
  );
}

/* ============================================================
   MINI PERFORMANCE
============================================================ */

function MiniPerformance({
  value,
  label,
  valueClass,
}: {
  value: number;
  label: string;
  valueClass: string;
}) {
  return (
    <div className="min-w-[105px] rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-center">
      <p
        className={`text-xl font-black ${valueClass}`}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}

/* ============================================================
   QUIZ CARD
============================================================ */

function QuizCard({
  quiz,
  attempt,
  attempted,
}: {
  quiz: {
    id: string;
    title: string;
    course: {
      id: string;
      title: string;
    };
    _count: {
      questions: number;
    };
  };
  attempt:
    | {
        id: string;
        percentage: number;
        passed: boolean;
        score: number;
        total: number;
      }
    | undefined;
  attempted: boolean;
}) {
  const passed = attempt?.passed === true;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a] shadow-2xl shadow-black/10 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/20">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />

      <div className="p-5 sm:p-6">
        {/* Card header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-400/10">
              <BookOpen size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-400">
                ICU Assessment
              </p>

              <h3 className="mt-1 line-clamp-2 text-lg font-black leading-6 text-white">
                {quiz.title}
              </h3>
            </div>
          </div>

          {attempted ? (
            passed ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black text-emerald-400">
                <CheckCircle2 size={12} />
                Passed
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-400/20 bg-red-400/10 px-2.5 py-1 text-[10px] font-black text-red-400">
                <XCircle size={12} />
                Practice
              </span>
            )
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-[10px] font-black text-blue-300">
              <Sparkles size={12} />
              New
            </span>
          )}
        </div>

        {/* Course */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
            Course
          </p>

          <Link
            href={`/courses/${quiz.course.id}`}
            className="mt-1 block truncate text-sm font-bold text-slate-300 transition hover:text-cyan-400"
          >
            {quiz.course.title}
          </Link>
        </div>

        {/* Quiz metadata */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <InfoItem
            icon={<ClipboardCheck size={15} />}
            label="Questions"
            value={String(quiz._count.questions)}
          />

          <InfoItem
            icon={<Target size={15} />}
            label="Assessment"
            value="Clinical"
          />
        </div>

        {/* Attempt result */}
        {attempted && attempt ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Latest Result
                </p>

                <p
                  className={`mt-1 text-sm font-black ${
                    passed
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {passed
                    ? "Completed • Passed"
                    : "Completed • Needs Practice"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-black text-white">
                  {attempt.percentage}%
                </p>

                <p className="text-[10px] font-bold text-slate-500">
                  {attempt.score}/{attempt.total}
                </p>
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${
                  passed
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-400"
                    : "bg-gradient-to-r from-red-500 to-amber-400"
                }`}
                style={{
                  width: `${Math.min(
                    Math.max(Number(attempt.percentage), 0),
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-blue-400/10 bg-blue-500/5 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-blue-400">
                <Target size={17} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-200">
                  Ready for your assessment?
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Complete the quiz to measure your
                  current ICU knowledge.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {attempted && attempt ? (
            <>
              <Link
                href={`/quiz/${quiz.id}/result`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:from-blue-500 hover:to-cyan-400"
              >
                View Result
                <ArrowRight size={16} />
              </Link>

              <Link
                href={`/quiz/${quiz.id}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                Retake Quiz
              </Link>
            </>
          ) : (
            <Link
              href={`/quiz/${quiz.id}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:from-blue-500 hover:to-cyan-400"
            >
              Start Quiz
              <ArrowRight size={17} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
      <div className="flex items-center gap-2 text-cyan-400">
        {icon}

        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-1 text-sm font-black text-slate-200">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyQuizState() {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a] p-8 text-center shadow-2xl sm:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-400/10">
        <BookOpen size={28} />
      </div>

      <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
        Assessment Library
      </p>

      <h2 className="mt-2 text-2xl font-black text-white">
        No quizzes available yet
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
        New ICU assessments will appear here as soon
        as they are published by the learning team.
      </p>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/courses"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-black text-white transition hover:from-blue-500 hover:to-cyan-400"
        >
          Explore Courses
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
}