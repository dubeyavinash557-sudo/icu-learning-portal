import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  ClipboardCheck,
  Clock3,
  Crown,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// ============================================================
// TYPES
// ============================================================

type QuizAttemptData = {
  id: string;
  percentage: number;
  score: number;
  total: number;
  passed: boolean;
  createdAt: Date;
};

type QuizCardData = {
  id: string;
  title: string;
  description: string | null;
  questionCount: number;
  courseId: string;
  courseTitle: string;
  coursePrice: number;
  courseIsPremium: boolean;
  isFreeCourse: boolean;
  isEnrolled: boolean;
  hasSuccessfulPayment: boolean;
  isAccessible: boolean;
  attempt: QuizAttemptData | null;
};

type CourseWithoutQuizData = {
  id: string;
  title: string;
  description: string;
  price: number;
  isPremium: boolean;
  isEnrolled: boolean;
};

// ============================================================
// HELPERS
// ============================================================

function calculateAverage(
  attempts: QuizAttemptData[]
) {
  if (attempts.length === 0) {
    return 0;
  }

  return Math.round(
    attempts.reduce(
      (total, attempt) =>
        total + attempt.percentage,
      0
    ) / attempts.length
  );
}

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function getAttemptLabel(
  attempt: QuizAttemptData | null
) {
  if (!attempt) {
    return "Not attempted";
  }

  if (attempt.passed) {
    return "Passed";
  }

  return "Needs practice";
}

function getAttemptColor(
  attempt: QuizAttemptData | null
) {
  if (!attempt) {
    return "border-slate-700 bg-slate-900/70 text-slate-400";
  }

  if (attempt.passed) {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
  }

  return "border-rose-500/20 bg-rose-500/10 text-rose-300";
}

// ============================================================
// PAGE
// ============================================================

export default async function QuizDashboardPage() {
  // ==========================================================
  // 1. AUTHENTICATION
  // ==========================================================

  const session = await auth();

  if (!session?.user?.email) {
    redirect(
      "/login?callbackUrl=/dashboard/quiz"
    );
  }

  // ==========================================================
  // 2. CURRENT USER
  // ==========================================================

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      fullName: true,
      role: true,

      enrollments: {
        select: {
          courseId: true,
        },
      },

      quizAttempts: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          quizId: true,
          score: true,
          total: true,
          percentage: true,
          passed: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  // ==========================================================
  // 3. LOAD ALL COURSES
  //
  // IMPORTANT:
  // We load COURSES first rather than only quizzes.
  //
  // This means the dashboard can accurately represent all
  // learning programs even if a course does not yet have a quiz.
  // ==========================================================

  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      isPremium: true,

      quizzes: {
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          title: true,
          description: true,

          _count: {
            select: {
              questions: true,
            },
          },
        },
      },
    },
  });

  // ==========================================================
  // 4. USER ENROLLMENTS
  // ==========================================================

  const enrolledCourseIds = new Set(
    user.enrollments.map(
      (enrollment) =>
        enrollment.courseId
    )
  );

  // ==========================================================
  // 5. PAYMENT ACCESS
  //
  // We check successful payments for the current user.
  // The quiz detail page still performs the final server-side
  // authorization check before questions are released.
  // ==========================================================

  const successfulPayments =
    await prisma.payment.findMany({
      where: {
        userId: user.id,
        status: "SUCCESS",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        courseId: true,
        amount: true,
        razorpayOrderId: true,
        razorpayPaymentId: true,
        transactionId: true,
      },
    });

  // ==========================================================
  // 6. BUILD VERIFIED PAYMENT COURSE SET
  //
  // Payment is considered usable when:
  //
  // - SUCCESS
  // - Razorpay payment/order or transaction information exists
  //
  // Exact amount verification is additionally performed on the
  // quiz detail page.
  // ==========================================================

  const paidCourseIds = new Set<string>();

  for (const payment of successfulPayments) {
    if (!payment.courseId) {
      continue;
    }

    if (
      payment.razorpayPaymentId ||
      payment.razorpayOrderId ||
      payment.transactionId
    ) {
      paidCourseIds.add(
        payment.courseId
      );
    }
  }

  // ==========================================================
  // 7. BUILD QUIZ CARDS
  // ==========================================================

  const quizCards: QuizCardData[] = [];

  const coursesWithoutQuiz: CourseWithoutQuizData[] =
    [];

  for (const course of courses) {
    const isEnrolled =
      enrolledCourseIds.has(course.id);

    const isFreeCourse =
      course.price === 0 &&
      course.isPremium === false;

    const hasSuccessfulPayment =
      paidCourseIds.has(course.id);

    // --------------------------------------------------------
    // Courses without assessment
    // --------------------------------------------------------

    if (course.quizzes.length === 0) {
      coursesWithoutQuiz.push({
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        isPremium: course.isPremium,
        isEnrolled,
      });

      continue;
    }

    // --------------------------------------------------------
    // Every quiz belonging to the course
    // --------------------------------------------------------

    for (const quiz of course.quizzes) {
      const isAdmin =
        user.role === "ADMIN";

      const isAccessible =
        isAdmin ||
        (isEnrolled &&
          (isFreeCourse ||
            hasSuccessfulPayment));

      const attempt =
        user.quizAttempts.find(
          (item) =>
            item.quizId === quiz.id
        ) ?? null;

      quizCards.push({
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        questionCount:
          quiz._count.questions,
        courseId: course.id,
        courseTitle: course.title,
        coursePrice: course.price,
        courseIsPremium:
          course.isPremium,
        isFreeCourse,
        isEnrolled,
        hasSuccessfulPayment,
        isAccessible,
        attempt,
      });
    }
  }

  // ==========================================================
  // 8. QUIZ PERFORMANCE
  // ==========================================================

  const totalQuizzes =
    quizCards.length;

  const attemptedQuizzes =
    quizCards.filter(
      (quiz) => quiz.attempt !== null
    ).length;

  const completedQuizzes =
    quizCards.filter(
      (quiz) =>
        quiz.attempt?.passed === true
    ).length;

  const failedQuizzes =
    quizCards.filter(
      (quiz) =>
        quiz.attempt &&
        !quiz.attempt.passed
    ).length;

  const averageScore =
    calculateAverage(
      user.quizAttempts
    );

  const totalQuestions =
    quizCards.reduce(
      (total, quiz) =>
        total + quiz.questionCount,
      0
    );

  const premiumQuizCount =
    quizCards.filter(
      (quiz) =>
        !quiz.isFreeCourse
    ).length;

  const availableCourseCount =
    courses.length;

  const coursesWithQuiz =
    quizCards.reduce(
      (set, quiz) => {
        set.add(quiz.courseId);
        return set;
      },
      new Set<string>()
    ).size;

  const courseCoveragePercent =
    availableCourseCount === 0
      ? 0
      : Math.round(
          (coursesWithQuiz /
            availableCourseCount) *
            100
        );

  // ==========================================================
  // 9. RECENT / FEATURED QUIZZES
  // ==========================================================

  const featuredQuiz =
    quizCards.find(
      (quiz) =>
        quiz.title
          .toLowerCase()
          .includes("interview")
    ) ??
    quizCards.find(
      (quiz) =>
        quiz.title
          .toLowerCase()
          .includes("ventilation")
    ) ??
    quizCards[0] ??
    null;

  // ==========================================================
  // 10. DISPLAY USER NAME
  // ==========================================================

  const displayName =
    user.fullName?.trim() ||
    "Learner";

  const isAdmin =
    user.role === "ADMIN";

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* ======================================================
          TOP NAVIGATION
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand */}

          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
              <GraduationCap
                size={21}
                strokeWidth={2.5}
              />
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-black tracking-tight">
                ICU Learning Portal
              </p>

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                Professional LMS
              </p>
            </div>
          </Link>

          {/* Right navigation */}

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400/30 hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              Dashboard
            </Link>

            <Link
              href="/courses"
              className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400/30 hover:bg-white/10 hover:text-white md:inline-flex"
            >
              Courses
            </Link>

            {isAdmin && (
              <Link
                href="/admin/quizzes"
                className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-black text-white transition hover:bg-violet-500"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* ====================================================
            HERO
        ==================================================== */}

        <section className="relative overflow-hidden rounded-[28px] border border-blue-400/20 bg-gradient-to-br from-blue-700 via-indigo-700 to-cyan-600 p-6 shadow-2xl shadow-blue-950/30 sm:p-8 lg:p-10">
          {/* Decorative glow */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-indigo-950/40 blur-3xl" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">
                <ClipboardCheck
                  size={12}
                />
                Professional Assessment Center
              </span>

              {isAdmin && (
                <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-200">
                  Admin Mode
                </span>
              )}
            </div>

            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-sm font-bold text-blue-100">
                  Welcome back,{" "}
                  {displayName}
                </p>

                <h1 className="mt-2 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Quiz Dashboard
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                  Assess your ICU knowledge,
                  track your performance and
                  complete professional
                  learning assessments across
                  your critical-care programs.
                </p>
              </div>

              <div className="hidden rounded-3xl border border-white/15 bg-black/10 p-5 lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Trophy
                      size={23}
                      className="text-amber-300"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-100">
                      Average Score
                    </p>

                    <p className="mt-1 text-3xl font-black">
                      {averageScore}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero metrics */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <HeroMetric
                icon={
                  <ClipboardCheck
                    size={18}
                  />
                }
                value={String(
                  totalQuizzes
                )}
                label="Assessments"
              />

              <HeroMetric
                icon={
                  <CheckCircle2
                    size={18}
                  />
                }
                value={`${completedQuizzes}`}
                label="Passed"
              />

              <HeroMetric
                icon={
                  <BarChart3
                    size={18}
                  />
                }
                value={`${averageScore}%`}
                label="Average Score"
              />

              <HeroMetric
                icon={
                  <BookOpen
                    size={18}
                  />
                }
                value={`${availableCourseCount}`}
                label="Learning Programs"
              />
            </div>
          </div>
        </section>

        {/* ====================================================
            PERFORMANCE SUMMARY
        ==================================================== */}

        <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <PerformanceCard
            icon={
              <ClipboardCheck
                size={18}
              />
            }
            value={String(
              attemptedQuizzes
            )}
            label="Quiz Attempts"
            description="Assessments attempted"
          />

          <PerformanceCard
            icon={
              <CheckCircle2
                size={18}
              />
            }
            value={String(
              completedQuizzes
            )}
            label="Completed"
            description="Passed assessments"
          />

          <PerformanceCard
            icon={
              <Trophy size={18} />
            }
            value={`${averageScore}%`}
            label="Average Score"
            description="Overall performance"
          />

          <PerformanceCard
            icon={
              <Award size={18} />
            }
            value={String(
              premiumQuizCount
            )}
            label="Premium Assessments"
            description="Professional evaluations"
          />
        </section>

        {/* ====================================================
            PROGRESS CARD
        ==================================================== */}

        <section className="mt-5 rounded-3xl border border-white/10 bg-[#0c1224] p-5 shadow-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-400">
                Assessment Progress
              </p>

              <h2 className="mt-2 text-xl font-black sm:text-2xl">
                Your quiz progress
              </h2>

              <p className="mt-1 text-xs leading-6 text-slate-400">
                Keep completing assessments
                to build a stronger ICU
                knowledge profile.
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl font-black text-white">
                {totalQuizzes === 0
                  ? 0
                  : Math.round(
                      (completedQuizzes /
                        totalQuizzes) *
                        100
                    )}
                %
              </p>

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Completion
              </p>
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all"
              style={{
                width: `${
                  totalQuizzes === 0
                    ? 0
                    : Math.min(
                        100,
                        Math.round(
                          (completedQuizzes /
                            totalQuizzes) *
                            100
                        )
                      )
                }%`,
              }}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <MiniProgress
              value={String(
                attemptedQuizzes
              )}
              label="Attempted"
            />

            <MiniProgress
              value={String(
                failedQuizzes
              )}
              label="Needs Practice"
            />

            <MiniProgress
              value={String(
                coursesWithoutQuiz.length
              )}
              label="Coming Soon"
            />
          </div>
        </section>

        {/* ====================================================
            FEATURED ASSESSMENT
        ==================================================== */}

        {featuredQuiz && (
          <section className="mt-6 overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#0b1429] via-[#0d1933] to-[#071a27] shadow-2xl">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300 ring-1 ring-cyan-400/20">
                      <Sparkles
                        size={12}
                      />
                      Featured Assessment
                    </span>

                    {!featuredQuiz.isFreeCourse && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-300 ring-1 ring-amber-400/20">
                        <Crown
                          size={12}
                        />
                        Premium
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
                    {featuredQuiz.title}
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-cyan-300">
                    {featuredQuiz.courseTitle}
                  </p>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                    {featuredQuiz.description ||
                      "Professional assessment designed to evaluate your understanding of critical-care concepts."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <FeatureBadge
                      icon={
                        <ClipboardCheck
                          size={13}
                        />
                      }
                      text={`${featuredQuiz.questionCount} Questions`}
                    />

                    <FeatureBadge
                      icon={
                        <Clock3
                          size={13}
                        />
                      }
                      text="Self-paced"
                    />

                    <FeatureBadge
                      icon={
                        <ShieldCheck
                          size={13}
                        />
                      }
                      text="Certificate Eligible"
                    />
                  </div>
                </div>

                <div className="shrink-0">
                  {featuredQuiz.isAccessible ? (
                    <Link
                      href={`/quiz/${featuredQuiz.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-cyan-950/30 transition hover:from-blue-500 hover:to-cyan-400 sm:w-auto"
                    >
                      <CirclePlay
                        size={18}
                      />
                      {featuredQuiz.attempt
                        ? "Retake Assessment"
                        : "Start Assessment"}
                      <ArrowRight
                        size={17}
                      />
                    </Link>
                  ) : (
                    <Link
                      href={`/courses/${featuredQuiz.courseId}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-amber-950/30 transition hover:from-amber-400 hover:to-orange-400 sm:w-auto"
                    >
                      <Crown
                        size={18}
                      />
                      Unlock Assessment
                      <ArrowRight
                        size={17}
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ====================================================
            AVAILABLE QUIZZES
        ==================================================== */}

        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-400">
                Assessment Library
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Available Quizzes
              </h2>

              <p className="mt-1 text-xs leading-6 text-slate-400">
                Professional assessments
                connected to your ICU learning
                programs.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-slate-300">
                {totalQuizzes} Assessments
              </span>

              <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-slate-300">
                {totalQuestions} Questions
              </span>
            </div>
          </div>

          {quizCards.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {quizCards.map(
                (quiz, index) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    index={index}
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* ====================================================
            COURSES WITHOUT QUIZ
        ==================================================== */}

        {coursesWithoutQuiz.length > 0 && (
          <section className="mt-8">
            <div className="mb-5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-400">
                Assessment Roadmap
              </p>

              <h2 className="mt-2 text-2xl font-black">
                More Assessments Coming Soon
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-6 text-slate-400">
                These learning programs are
                already available in the LMS.
                Their dedicated assessments
                can be added without changing
                the existing course structure.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {coursesWithoutQuiz.map(
                (course) => (
                  <ComingSoonCourse
                    key={course.id}
                    course={course}
                  />
                )
              )}
            </div>
          </section>
        )}

        {/* ====================================================
            PREMIUM CTA
        ==================================================== */}

        <section className="relative mt-10 overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-[#171426] via-[#11172b] to-[#071d2a] p-6 shadow-2xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-300">
                <Crown size={13} />
                Premium Learning
              </div>

              <h2 className="mt-4 max-w-3xl text-2xl font-black leading-tight sm:text-3xl">
                Build your ICU knowledge with
                structured assessments.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                Premium programs combine
                structured lessons, protected
                study resources, professional
                assessments and certificate
                eligibility.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <PremiumPoint text="Protected Assessments" />

                <PremiumPoint text="Professional LMS" />

                <PremiumPoint text="Certificate Eligibility" />

                <PremiumPoint text="Structured Learning" />
              </div>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 px-7 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-amber-950/30 transition hover:from-amber-300 hover:to-orange-400"
            >
              <Sparkles size={18} />
              Explore Premium Programs
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <footer className="mt-10 border-t border-white/10 py-6">
          <div className="flex flex-col gap-3 text-[10px] font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              ICU Learning Portal • Professional
              LMS
            </p>

            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="transition hover:text-slate-300"
              >
                Dashboard
              </Link>

              <Link
                href="/courses"
                className="transition hover:text-slate-300"
              >
                Courses
              </Link>

              <Link
                href="/profile"
                className="transition hover:text-slate-300"
              >
                Profile
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

// ============================================================
// HERO METRIC
// ============================================================

function HeroMetric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-100">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-lg font-black">
            {value}
          </p>

          <p className="truncate text-[9px] font-black uppercase tracking-wider text-blue-100">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PERFORMANCE CARD
// ============================================================

function PerformanceCard({
  icon,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1224] p-4 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-cyan-400">
          {icon}
        </div>

        <p className="text-2xl font-black">
          {value}
        </p>
      </div>

      <p className="mt-4 text-xs font-black text-white">
        {label}
      </p>

      <p className="mt-1 text-[10px] text-slate-500">
        {description}
      </p>
    </div>
  );
}

// ============================================================
// MINI PROGRESS
// ============================================================

function MiniProgress({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#080e1d] p-4">
      <p className="text-lg font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[9px] font-black uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}

// ============================================================
// FEATURE BADGE
// ============================================================

function FeatureBadge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold text-slate-300">
      {icon}
      {text}
    </span>
  );
}

// ============================================================
// QUIZ CARD
// ============================================================

function QuizCard({
  quiz,
  index,
}: {
  quiz: QuizCardData;
  index: number;
}) {
  const attempt = quiz.attempt;

  const attemptStatus =
    getAttemptLabel(attempt);

  const attemptColor =
    getAttemptColor(attempt);

  const isCompleted =
    attempt?.passed === true;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c1224] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-cyan-950/20">
      {/* Top accent */}

      <div
        className={`h-1 w-full ${
          isCompleted
            ? "bg-gradient-to-r from-emerald-500 to-cyan-400"
            : quiz.isAccessible
              ? "bg-gradient-to-r from-blue-600 to-cyan-400"
              : "bg-gradient-to-r from-amber-500 to-orange-500"
        }`}
      />

      <div className="p-5 sm:p-6">
        {/* Card header */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-400">
              <ClipboardCheck
                size={18}
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[8px] font-black uppercase tracking-[0.18em] text-cyan-400">
                  Assessment {index + 1}
                </span>

                {!quiz.isFreeCourse && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/10">
                    <Crown size={9} />
                    Premium
                  </span>
                )}
              </div>

              <h3 className="mt-1 line-clamp-2 text-sm font-black leading-5 text-white">
                {quiz.title}
              </h3>
            </div>
          </div>

          {attempt && (
            <span
              className={`shrink-0 rounded-full border px-2 py-1 text-[8px] font-black uppercase tracking-wider ${attemptColor}`}
            >
              {attemptStatus}
            </span>
          )}
        </div>

        {/* Course */}

        <div className="mt-5 rounded-2xl border border-white/5 bg-[#080e1d] p-3">
          <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-500">
            Course
          </p>

          <p className="mt-1 line-clamp-2 text-xs font-bold text-slate-200">
            {quiz.courseTitle}
          </p>
        </div>

        {/* Description */}

        <p className="mt-4 line-clamp-2 text-[11px] leading-5 text-slate-500">
          {quiz.description ||
            "Professional ICU assessment designed to test your course knowledge and clinical understanding."}
        </p>

        {/* Stats */}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <SmallStat
            icon={
              <ClipboardCheck
                size={12}
              />
            }
            label="Questions"
            value={String(
              quiz.questionCount
            )}
          />

          <SmallStat
            icon={
              <ShieldCheck size={12} />
            }
            label="Assessment"
            value="Clinical"
          />
        </div>

        {/* Attempt result */}

        {attempt ? (
          <div className="mt-4 rounded-2xl border border-white/5 bg-[#080e1d] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[8px] font-black uppercase tracking-wider text-slate-500">
                  Latest Result
                </p>

                <p
                  className={`mt-1 text-sm font-black ${
                    attempt.passed
                      ? "text-emerald-400"
                      : "text-rose-400"
                  }`}
                >
                  {attempt.passed
                    ? "Completed • Passed"
                    : "Completed • Practice Again"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-black text-white">
                  {Math.round(
                    attempt.percentage
                  )}
                  %
                </p>

                <p className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
                  Score
                </p>
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${
                  attempt.passed
                    ? "bg-emerald-400"
                    : "bg-rose-400"
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      0,
                      Math.round(
                        attempt.percentage
                      )
                    )
                  )}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-white/5 bg-[#101a31] p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                <CirclePlay
                  size={13}
                />
              </div>

              <div>
                <p className="text-[9px] font-black text-slate-200">
                  Ready for your assessment?
                </p>

                <p className="text-[8px] text-slate-500">
                  Complete the quiz to measure
                  your knowledge.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action */}

        <div className="mt-5">
          {quiz.isAccessible ? (
            <Link
              href={`/quiz/${quiz.id}`}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[11px] font-black text-white transition ${
                isCompleted
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400"
              }`}
            >
              {isCompleted ? (
                <>
                  <Award size={14} />
                  View Result
                </>
              ) : (
                <>
                  <CirclePlay
                    size={14}
                  />
                  {attempt
                    ? "Retake Quiz"
                    : "Start Quiz"}
                  <ArrowRight
                    size={14}
                  />
                </>
              )}
            </Link>
          ) : (
            <Link
              href={`/courses/${quiz.courseId}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-[11px] font-black text-white transition hover:from-amber-400 hover:to-orange-400"
            >
              <LockKeyhole
                size={14}
              />
              Unlock Premium Access
              <ArrowRight
                size={14}
              />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

// ============================================================
// SMALL STAT
// ============================================================

function SmallStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#080e1d] p-3">
      <div className="flex items-center gap-2">
        <span className="text-cyan-400">
          {icon}
        </span>

        <span className="text-[8px] font-black uppercase tracking-wider text-slate-600">
          {label}
        </span>
      </div>

      <p className="mt-1 text-[10px] font-black text-slate-300">
        {value}
      </p>
    </div>
  );
}

// ============================================================
// COMING SOON COURSE
// ============================================================

function ComingSoonCourse({
  course,
}: {
  course: CourseWithoutQuizData;
}) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group rounded-2xl border border-white/10 bg-[#0c1224] p-4 transition hover:border-violet-400/20 hover:bg-[#10172b]"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <BookOpen size={17} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-xs font-black text-slate-200">
              {course.title}
            </h3>

            <span className="shrink-0 rounded-full bg-violet-400/10 px-2 py-1 text-[7px] font-black uppercase tracking-wider text-violet-300">
              Soon
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-[9px] leading-5 text-slate-500">
            Dedicated professional assessment
            is being prepared for this learning
            program.
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[8px] font-bold text-slate-600">
              {course.isPremium
                ? "Premium Program"
                : "Learning Program"}
            </span>

            <span className="inline-flex items-center gap-1 text-[9px] font-black text-violet-400 transition group-hover:text-violet-300">
              View Course
              <ChevronRight
                size={12}
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-[#0c1224] p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
        <ClipboardCheck
          size={25}
        />
      </div>

      <h3 className="mt-5 text-xl font-black">
        Assessments are being prepared
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Your learning programs are
        available, but dedicated quizzes have
        not been added yet.
      </p>

      <Link
        href="/courses"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-black text-white transition hover:bg-blue-500"
      >
        Explore Courses
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

// ============================================================
// PREMIUM POINT
// ============================================================

function PremiumPoint({
  text,
}: {
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[9px] font-bold text-slate-300">
      <CheckCircle2
        size={12}
        className="text-emerald-400"
      />
      {text}
    </span>
  );
}