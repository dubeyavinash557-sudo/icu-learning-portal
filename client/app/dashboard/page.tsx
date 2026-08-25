import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function calculatePercent(
  completedLessons: number,
  totalLessons: number
) {
  if (totalLessons <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round((completedLessons / totalLessons) * 100)
    )
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getProgressLabel(progress: number) {
  if (progress === 0) {
    return "Not started";
  }

  if (progress < 25) {
    return "Getting started";
  }

  if (progress < 50) {
    return "Making progress";
  }

  if (progress < 75) {
    return "Good progress";
  }

  if (progress < 100) {
    return "Almost complete";
  }

  return "Completed";
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      fullName: true,
      isPremium: true,

      enrollments: {
        orderBy: {
          enrolledAt: "desc",
        },
        select: {
          id: true,
          enrolledAt: true,
          course: {
            select: {
              id: true,
              title: true,
              description: true,
              instructor: true,
              duration: true,
              language: true,
              level: true,

              lessons: {
                orderBy: {
                  lessonOrder: "asc",
                },
                select: {
                  id: true,
                  title: true,
                  lessonOrder: true,
                  duration: true,
                },
              },
            },
          },
        },
      },

      lessonProgress: {
        where: {
          completed: true,
        },
        select: {
          lessonId: true,
          lesson: {
            select: {
              courseId: true,
            },
          },
        },
      },

      certificates: {
        orderBy: {
          issuedAt: "desc",
        },
        take: 1,
        select: {
          id: true,
          certificateNo: true,
          issuedAt: true,
          course: {
            select: {
              title: true,
            },
          },
        },
      },

      quizAttempts: {
        select: {
          percentage: true,
          passed: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const completedLessonIds = new Set(
    user.lessonProgress.map(
      (progress) => progress.lessonId
    )
  );

  const enrolledCourses = user.enrollments.map(
    (enrollment) => {
      const lessons = enrollment.course.lessons;

      const completedLessons = lessons.filter(
        (lesson) =>
          completedLessonIds.has(lesson.id)
      ).length;

      const totalLessons = lessons.length;

      const progress = calculatePercent(
        completedLessons,
        totalLessons
      );

      const nextLesson =
        lessons.find(
          (lesson) =>
            !completedLessonIds.has(lesson.id)
        ) ?? null;

      return {
        enrollmentId: enrollment.id,
        enrolledAt: enrollment.enrolledAt,
        course: enrollment.course,
        totalLessons,
        completedLessons,
        progress,
        completed:
          totalLessons > 0 &&
          completedLessons === totalLessons,
        nextLesson,
      };
    }
  );

  const totalCourses = enrolledCourses.length;

  const completedCourses = enrolledCourses.filter(
    (course) => course.completed
  ).length;

  const totalLessons = enrolledCourses.reduce(
    (total, course) =>
      total + course.totalLessons,
    0
  );

  const completedLessons = enrolledCourses.reduce(
    (total, course) =>
      total + course.completedLessons,
    0
  );

  const remainingLessons = Math.max(
    0,
    totalLessons - completedLessons
  );

  const overallProgress = calculatePercent(
    completedLessons,
    totalLessons
  );

  const quizAttempts = user.quizAttempts.length;

  const quizAverage =
    quizAttempts === 0
      ? 0
      : Math.round(
          user.quizAttempts.reduce(
            (total, attempt) =>
              total + attempt.percentage,
            0
          ) / quizAttempts
        );

  const passedQuizzes = user.quizAttempts.filter(
    (attempt) => attempt.passed
  ).length;

  const failedQuizzes = Math.max(
    0,
    quizAttempts - passedQuizzes
  );

  const currentCourse =
    [...enrolledCourses]
      .filter((course) => !course.completed)
      .sort((first, second) => {
        if (
          second.progress !== first.progress
        ) {
          return (
            second.progress -
            first.progress
          );
        }

        return (
          second.enrolledAt.getTime() -
          first.enrolledAt.getTime()
        );
      })[0] ??
    enrolledCourses[0] ??
    null;

  const latestCertificate =
    user.certificates[0] ?? null;

  const recentCourses = enrolledCourses.slice(
    0,
    4
  );

  const progressCourses = enrolledCourses.filter(
    (course) => course.progress > 0
  ).length;

  const completionRate =
    totalCourses === 0
      ? 0
      : Math.round(
          (completedCourses / totalCourses) *
            100
        );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        {/* =========================================================
            TOP HEADER
        ========================================================== */}

        <header className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-cyan-700">
                <ShieldCheck size={14} />
                Student LMS
              </span>

              {user.isPremium ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-700">
                  <Sparkles size={14} />
                  Premium Member
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-600">
                  Free Member
                </span>
              )}
            </div>

            <h1 className="mt-3 break-words text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              Welcome back, {user.fullName}
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Continue your ICU learning journey,
              monitor your progress, practice quizzes,
              and work toward your course certificates.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-cyan-500 hover:text-cyan-700"
            >
              <BookOpen size={18} />
              Browse Courses
            </Link>

            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
            >
              <UserRound size={17} />
              My Profile
            </Link>
          </div>
        </header>

        {/* =========================================================
            PREMIUM / LEARNING HERO
        ========================================================== */}

        <section className="mb-7 overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 text-white shadow-xl">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative grid gap-8 xl:grid-cols-[1fr_330px] xl:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100 backdrop-blur">
                  <GraduationCap size={15} />
                  Professional ICU Learning
                </div>

                <h2 className="mt-5 max-w-3xl text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                  Build your ICU knowledge
                  step by step.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                  {totalCourses === 0
                    ? "Start with a structured course and build your professional critical-care knowledge."
                    : `${completedLessons} of ${totalLessons} enrolled lessons are complete. Keep learning to reach your next milestone.`}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={
                      currentCourse?.nextLesson
                        ? `/courses/${currentCourse.course.id}/lesson/${currentCourse.nextLesson.id}`
                        : currentCourse
                        ? `/courses/${currentCourse.course.id}`
                        : "/courses"
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:bg-cyan-50"
                  >
                    <CirclePlay size={19} />

                    {currentCourse
                      ? "Continue Learning"
                      : "Start Learning"}

                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                  >
                    Explore Courses
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-100">
                      Overall Progress
                    </p>

                    <p className="mt-2 text-4xl font-black">
                      {overallProgress}%
                    </p>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <GraduationCap
                      size={30}
                      className="text-cyan-200"
                    />
                  </div>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-white transition-all"
                    style={{
                      width: `${overallProgress}%`,
                    }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-xs font-semibold text-blue-100">
                  <span>
                    {completedLessons} completed
                  </span>

                  <span>
                    {remainingLessons} remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PREMIUM MEMBERSHIP NOTICE
        ========================================================== */}

        {!user.isPremium && (
          <section className="mb-7 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-orange-50">
            <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Sparkles size={23} />
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    You are currently on the Free plan
                  </p>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                    Explore the available learning
                    catalogue and upgrade when you are
                    ready for premium learning access.
                  </p>
                </div>
              </div>

              <Link
                href="/courses"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
              >
                Explore Premium Learning
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>
        )}

        {/* =========================================================
            METRICS
        ========================================================== */}

        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Enrolled Courses"
            value={String(totalCourses)}
            description="Courses currently in your learning path"
            icon={<BookOpen size={22} />}
            iconClass="bg-cyan-50 text-cyan-700"
          />

          <MetricCard
            title="Completed Courses"
            value={String(completedCourses)}
            description={
              totalCourses === 0
                ? "No course completed yet"
                : `${completionRate}% of enrolled courses completed`
            }
            icon={<CheckCircle2 size={22} />}
            iconClass="bg-emerald-50 text-emerald-700"
          />

          <MetricCard
            title="Lessons Completed"
            value={String(completedLessons)}
            description={
              totalLessons === 0
                ? "No enrolled lessons yet"
                : `${remainingLessons} lessons remaining`
            }
            icon={<Clock3 size={22} />}
            iconClass="bg-blue-50 text-blue-700"
          />

          <MetricCard
            title="Quiz Average"
            value={`${quizAverage}%`}
            description={
              quizAttempts === 0
                ? "No quiz attempts yet"
                : `${passedQuizzes} of ${quizAttempts} attempts passed`
            }
            icon={<ClipboardCheck size={22} />}
            iconClass="bg-violet-50 text-violet-700"
          />
        </section>

        {/* =========================================================
            MAIN DASHBOARD GRID
        ========================================================== */}

        <section className="grid gap-7 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]">
          {/* -------------------------------------------------------
              CONTINUE LEARNING
          -------------------------------------------------------- */}

          <div className="space-y-7">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
                      Continue Learning
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight">
                      {currentCourse
                        ? currentCourse.course.title
                        : "Your next learning step"}
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      {currentCourse
                        ? currentCourse.nextLesson
                          ? `Next lesson: ${currentCourse.nextLesson.title}`
                          : "You have completed every lesson in this course."
                        : "Choose a course from the catalogue to begin your learning journey."}
                    </p>
                  </div>

                  {currentCourse && (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                      {getProgressLabel(
                        currentCourse.progress
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-7">
                {currentCourse ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <MiniStat
                        label="Progress"
                        value={`${currentCourse.progress}%`}
                      />

                      <MiniStat
                        label="Lessons"
                        value={`${currentCourse.completedLessons}/${currentCourse.totalLessons}`}
                      />

                      <MiniStat
                        label="Level"
                        value={
                          currentCourse.course.level
                        }
                      />
                    </div>

                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between gap-4 text-sm font-bold">
                        <span className="text-slate-700">
                          Course progress
                        </span>

                        <span className="text-cyan-700">
                          {currentCourse.progress}%
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 transition-all"
                          style={{
                            width: `${currentCourse.progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={
                          currentCourse.nextLesson
                            ? `/courses/${currentCourse.course.id}/lesson/${currentCourse.nextLesson.id}`
                            : `/courses/${currentCourse.course.id}`
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-700/15 transition hover:bg-blue-800"
                      >
                        <CirclePlay size={18} />

                        {currentCourse.nextLesson
                          ? "Start Next Lesson"
                          : "Review Course"}

                        <ArrowRight size={17} />
                      </Link>

                      <Link
                        href={`/courses/${currentCourse.course.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
                      >
                        Course Overview
                        <ChevronRight size={17} />
                      </Link>
                    </div>
                  </>
                ) : (
                  <EmptyState
                    icon={
                      <GraduationCap
                        size={28}
                      />
                    }
                    title="Start your first course"
                    description="Explore the ICU course catalogue and choose a structured program to begin tracking your learning progress."
                    href="/courses"
                    action="Explore Courses"
                  />
                )}
              </div>
            </section>

            {/* -----------------------------------------------------
                MY COURSES
            ------------------------------------------------------ */}

            <section>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
                    My Learning
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight">
                    Your Courses
                  </h2>

                  <p className="mt-1 text-sm text-slate-600">
                    {totalCourses === 0
                      ? "Your enrolled courses will appear here."
                      : `${totalCourses} course${totalCourses === 1 ? "" : "s"} in your learning library.`}
                  </p>
                </div>

                {totalCourses > 0 && (
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-1 text-sm font-extrabold text-blue-700 transition hover:text-blue-900"
                  >
                    View course catalogue
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>

              {totalCourses === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-12">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <BookOpen size={30} />
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    No enrolled courses yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                    Start learning by exploring the
                    available ICU courses.
                  </p>

                  <Link
                    href="/courses"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-800"
                  >
                    Explore Courses
                    <ArrowRight size={17} />
                  </Link>
                </div>
              ) : (
                <div className="grid gap-5 lg:grid-cols-2">
                  {recentCourses.map((item) => (
                    <CourseCard
                      key={item.enrollmentId}
                      item={item}
                    />
                  ))}
                </div>
              )}

              {totalCourses > recentCourses.length && (
                <div className="mt-5 text-center">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700"
                  >
                    View all learning options
                    <ArrowRight size={17} />
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* -------------------------------------------------------
              RIGHT SIDEBAR
          -------------------------------------------------------- */}

          <aside className="space-y-7">
            {/* Quick Actions */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
                  Quick Access
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Learning shortcuts
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                <QuickAction
                  href="/courses"
                  icon={
                    <BookOpen size={19} />
                  }
                  title="Browse Courses"
                  description="Explore the course catalogue"
                />

                <QuickAction
                  href="/dashboard/quiz"
                  icon={
                    <ClipboardCheck
                      size={19}
                    />
                  }
                  title="Take a Quiz"
                  description="Test your ICU knowledge"
                />

                <QuickAction
                  href="/profile"
                  icon={
                    <UserRound size={19} />
                  }
                  title="My Profile"
                  description="Manage your account"
                />

                <QuickAction
                  href="/dashboard/certificates"
                  icon={
                    <Award size={19} />
                  }
                  title="My Certificates"
                  description="View your certificate information"
                />
              </div>
            </section>

            {/* Learning Analytics */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
                    Analytics
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Learning overview
                  </h2>
                </div>

                <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                  <GraduationCap
                    size={21}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <AnalyticsRow
                  label="Overall progress"
                  value={`${overallProgress}%`}
                  progress={overallProgress}
                />

                <AnalyticsRow
                  label="Course completion"
                  value={`${completionRate}%`}
                  progress={completionRate}
                />

                <AnalyticsRow
                  label="Active courses"
                  value={String(progressCourses)}
                  progress={
                    totalCourses === 0
                      ? 0
                      : calculatePercent(
                          progressCourses,
                          totalCourses
                        )
                  }
                />
              </div>
            </section>

            {/* Quiz Performance */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet-700">
                    Assessment
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Quiz Performance
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Your real quiz performance
                    from this account.
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                  <ClipboardCheck
                    size={21}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <PerformanceStat
                  value={`${quizAverage}%`}
                  label="Average"
                />

                <PerformanceStat
                  value={String(passedQuizzes)}
                  label="Passed"
                />

                <PerformanceStat
                  value={String(quizAttempts)}
                  label="Attempts"
                />

                <PerformanceStat
                  value={String(failedQuizzes)}
                  label="Needs practice"
                />
              </div>

              <Link
                href="/dashboard/quiz"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-violet-800"
              >
                Open Quiz Dashboard
                <ArrowRight size={17} />
              </Link>
            </section>

            {/* Certificate */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-700">
                    Achievement
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Latest Certificate
                  </h2>
                </div>

                <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                  <Trophy size={21} />
                </div>
              </div>

              {latestCertificate ? (
                <>
                  <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Course Completed
                    </p>

                    <h3 className="mt-2 text-base font-black text-slate-900">
                      {latestCertificate.course.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600">
                      Certificate No:{" "}
                      <span className="font-bold text-slate-800">
                        {
                          latestCertificate.certificateNo
                        }
                      </span>
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Issued on{" "}
                      {formatDate(
                        latestCertificate.issuedAt
                      )}
                    </p>
                  </div>

                  <Link
                    href={`/api/certificates/latest/${latestCertificate.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
                  >
                    <Award size={17} />
                    Download Certificate
                  </Link>
                </>
              ) : (
                <>
                  <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
                    <LockKeyhole
                      size={25}
                      className="mx-auto text-slate-400"
                    />

                    <p className="mt-3 text-sm font-bold text-slate-800">
                      Your certificate is waiting
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Complete an eligible course to
                      unlock your certificate.
                    </p>
                  </div>

                  <Link
                    href="/dashboard/certificates"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-amber-300 hover:text-amber-700"
                  >
                    Certificate Information
                    <ArrowRight size={17} />
                  </Link>
                </>
              )}
            </section>
          </aside>
        </section>

        {/* =========================================================
            FOOTER STATUS
        ========================================================== */}

        <footer className="mt-8 border-t border-slate-200 pt-6">
          <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              ICU Learning Portal · Professional Learning
              Dashboard
            </p>

            <p>
              {user.isPremium
                ? "Premium learning account"
                : "Free learning account"}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ===============================================================
   METRIC CARD
================================================================ */

function MetricCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  iconClass: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`rounded-xl p-3 ${iconClass}`}
        >
          {icon}
        </div>

        <p className="text-3xl font-black tracking-tight text-slate-950">
          {value}
        </p>
      </div>

      <h2 className="mt-5 text-sm font-extrabold text-slate-900">
        {title}
      </h2>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </article>
  );
}

/* ===============================================================
   COURSE CARD
================================================================ */

function CourseCard({
  item,
}: {
  item: {
    enrollmentId: string;
    enrolledAt: Date;
    course: {
      id: string;
      title: string;
      description: string;
      instructor: string;
      duration: number;
      language: string;
      level: string;
      lessons: {
        id: string;
        title: string;
        lessonOrder: number;
        duration: number;
      }[];
    };
    totalLessons: number;
    completedLessons: number;
    progress: number;
    completed: boolean;
    nextLesson: {
      id: string;
      title: string;
      lessonOrder: number;
      duration: number;
    } | null;
  };
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-700">
            <BookOpen size={23} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="break-words text-base font-black leading-6 text-slate-900">
                {item.course.title}
              </h3>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                  item.completed
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {item.completed
                  ? "Completed"
                  : "In Progress"}
              </span>
            </div>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {item.course.instructor} ·{" "}
              {item.course.language} ·{" "}
              {item.course.level}
            </p>
          </div>
        </div>

        <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-600">
          {item.course.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="rounded-lg bg-slate-50 px-2.5 py-1.5">
            {item.totalLessons} lessons
          </span>

          <span className="rounded-lg bg-slate-50 px-2.5 py-1.5">
            {item.course.duration} hours
          </span>

          <span className="rounded-lg bg-slate-50 px-2.5 py-1.5">
            {item.course.level}
          </span>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-4 text-xs font-bold">
            <span className="text-slate-600">
              {item.completedLessons} of{" "}
              {item.totalLessons} lessons
            </span>

            <span className="text-cyan-700">
              {item.progress}%
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all ${
                item.completed
                  ? "bg-emerald-500"
                  : "bg-gradient-to-r from-cyan-500 to-blue-700"
              }`}
              style={{
                width: `${item.progress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            {item.nextLesson ? (
              <>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Next lesson
                </p>

                <p className="mt-1 truncate text-xs font-bold text-slate-700">
                  {item.nextLesson.title}
                </p>
              </>
            ) : (
              <p className="text-xs font-bold text-emerald-700">
                All lessons completed
              </p>
            )}
          </div>

          <Link
            href={
              item.nextLesson
                ? `/courses/${item.course.id}/lesson/${item.nextLesson.id}`
                : `/courses/${item.course.id}`
            }
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-extrabold text-white transition group-hover:bg-blue-700"
          >
            {item.completed
              ? "Review Course"
              : "Continue"}

            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ===============================================================
   QUICK ACTION
================================================================ */

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 transition hover:border-cyan-200 hover:bg-cyan-50/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition group-hover:text-cyan-700">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold text-slate-900">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-slate-500">
          {description}
        </p>
      </div>

      <ChevronRight
        size={17}
        className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700"
      />
    </Link>
  );
}

/* ===============================================================
   MINI STAT
================================================================ */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 truncate text-lg font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* ===============================================================
   ANALYTICS ROW
================================================================ */

function AnalyticsRow({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold">
        <span className="text-slate-600">
          {label}
        </span>

        <span className="text-slate-900">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700"
          style={{
            width: `${Math.min(
              100,
              Math.max(0, progress)
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ===============================================================
   PERFORMANCE STAT
================================================================ */

function PerformanceStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
      <p className="text-xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* ===============================================================
   EMPTY STATE
================================================================ */

function EmptyState({
  icon,
  title,
  description,
  href,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-7 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-cyan-700 shadow-sm">
        {icon}
      </div>

      <h3 className="mt-4 text-lg font-black">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
        {description}
      </p>

      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-800"
      >
        {action}
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}