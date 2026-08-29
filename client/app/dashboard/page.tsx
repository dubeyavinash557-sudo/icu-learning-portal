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
  Crown,
  Target,
  TrendingUp,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

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
      Math.round(
        (completedLessons / totalLessons) * 100
      )
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

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/*
 * ============================================================
 * DASHBOARD PAGE
 * ============================================================
 */

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/dashboard");
  }

  /*
   * ----------------------------------------------------------
   * USER + LEARNING DATA
   * ----------------------------------------------------------
   */

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },

    select: {
      id: true,
      fullName: true,
      email: true,
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

  /*
   * ----------------------------------------------------------
   * COMPLETED LESSON INDEX
   * ----------------------------------------------------------
   */

  const completedLessonIds = new Set(
    user.lessonProgress.map(
      (progress) => progress.lessonId
    )
  );

  /*
   * ----------------------------------------------------------
   * ENROLLED COURSE PROGRESS
   * ----------------------------------------------------------
   */

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

  /*
   * ----------------------------------------------------------
   * COURSE STATISTICS
   * ----------------------------------------------------------
   */

  const totalCourses = enrolledCourses.length;

  const completedCourses =
    enrolledCourses.filter(
      (course) => course.completed
    ).length;

  const activeCourses =
    enrolledCourses.filter(
      (course) =>
        !course.completed &&
        course.progress > 0
    ).length;

  const totalLessons =
    enrolledCourses.reduce(
      (total, course) =>
        total + course.totalLessons,
      0
    );

  const completedLessons =
    enrolledCourses.reduce(
      (total, course) =>
        total + course.completedLessons,
      0
    );

  const remainingLessons = Math.max(
    0,
    totalLessons - completedLessons
  );

  const overallProgress =
    calculatePercent(
      completedLessons,
      totalLessons
    );

  const completionRate =
    totalCourses === 0
      ? 0
      : Math.round(
          (completedCourses /
            totalCourses) *
            100
        );

  /*
   * ----------------------------------------------------------
   * QUIZ STATISTICS
   * ----------------------------------------------------------
   */

  const quizAttempts =
    user.quizAttempts.length;

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

  const passedQuizzes =
    user.quizAttempts.filter(
      (attempt) => attempt.passed
    ).length;

  const failedQuizzes = Math.max(
    0,
    quizAttempts - passedQuizzes
  );

  /*
   * ----------------------------------------------------------
   * CERTIFICATE
   * ----------------------------------------------------------
   */

  const latestCertificate =
    user.certificates[0] ?? null;

  /*
   * ----------------------------------------------------------
   * CURRENT COURSE
   *
   * Prefer the course with the highest active progress.
   * If no active course exists, fall back to the newest
   * enrollment.
   * ----------------------------------------------------------
   */

  const currentCourse =
    [...enrolledCourses]
      .filter(
        (course) => !course.completed
      )
      .sort((first, second) => {
        if (
          second.progress !==
          first.progress
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

  /*
   * ----------------------------------------------------------
   * RECENT COURSES
   * ----------------------------------------------------------
   */

  const recentCourses =
    enrolledCourses.slice(0, 4);

  /*
   * ----------------------------------------------------------
   * DISPLAY DATA
   * ----------------------------------------------------------
   */

  const initials = getInitials(
    user.fullName
  );

  const firstName =
    user.fullName.trim().split(/\s+/)[0] ||
    "Student";

  const activeCoursePercent =
    currentCourse?.progress ?? 0;

  const activeCourseHref =
    currentCourse?.nextLesson
      ? `/courses/${currentCourse.course.id}/lesson/${currentCourse.nextLesson.id}`
      : currentCourse
      ? `/courses/${currentCourse.course.id}`
      : "/courses";

  const activeCourseAction =
    currentCourse?.nextLesson
      ? "Continue Learning"
      : currentCourse
      ? "Review Course"
      : "Explore Courses";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1540px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">

        {/* =====================================================
            TOP HEADER
        ====================================================== */}

        <header className="mb-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">
                  <ShieldCheck size={13} />
                  Student LMS
                </span>

                {user.isPremium ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-700">
                    <Crown size={13} />
                    Premium Member
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-600">
                    Free Member
                  </span>
                )}

              </div>

              <div className="mt-4 flex items-center gap-4">

                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-700 text-lg font-black text-white shadow-lg sm:flex">
                  {initials || "SL"}
                </div>

                <div>
                  <h1 className="break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                    Welcome back, {firstName}
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                    Continue your ICU learning journey,
                    track your progress, practice
                    assessments, and work toward your
                    professional certificates.
                  </p>
                </div>

              </div>
            </div>

            <div className="flex flex-wrap gap-3">

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-md"
              >
                <BookOpen size={17} />
                Browse Courses
              </Link>

              <Link
                href="/profile"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-800"
              >
                <UserRound size={17} />
                My Profile
              </Link>

            </div>
          </div>
        </header>

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative mb-7 overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 text-white shadow-2xl shadow-blue-950/15">

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="absolute right-1/3 top-1/2 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:p-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-cyan-100 backdrop-blur">
                <GraduationCap size={15} />
                Professional ICU Learning
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Build your clinical knowledge
                <span className="text-cyan-300">
                  {" "}
                  step by step.
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                {totalCourses === 0
                  ? "Start with a structured ICU course and build your professional critical-care knowledge."
                  : `${completedLessons} of ${totalLessons} enrolled lessons are complete. Keep learning to reach your next milestone.`}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <Link
                  href={activeCourseHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-cyan-50"
                >
                  <CirclePlay size={19} />

                  {activeCourseAction}

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/dashboard/quiz"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  <ClipboardCheck size={17} />
                  Practice Quiz
                </Link>

              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-blue-100">

                <span className="inline-flex items-center gap-2">
                  <ShieldCheck
                    size={15}
                    className="text-cyan-300"
                  />
                  Secure learning account
                </span>

                <span className="inline-flex items-center gap-2">
                  <Target
                    size={15}
                    className="text-cyan-300"
                  />
                  Progress tracking
                </span>

                <span className="inline-flex items-center gap-2">
                  <Award
                    size={15}
                    className="text-cyan-300"
                  />
                  Certificate pathway
                </span>

              </div>

            </div>

            {/* HERO PROGRESS */}

            <div className="rounded-[26px] border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-cyan-100">
                    Overall Progress
                  </p>

                  <p className="mt-2 text-5xl font-black tracking-tight">
                    {overallProgress}%
                  </p>

                  <p className="mt-1 text-xs font-semibold text-blue-100">
                    {getProgressLabel(
                      overallProgress
                    )}
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                  <TrendingUp
                    size={27}
                    className="text-cyan-200"
                  />
                </div>

              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-white transition-all duration-500"
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <HeroStat
                  value={String(
                    completedLessons
                  )}
                  label="Completed"
                />

                <HeroStat
                  value={String(
                    remainingLessons
                  )}
                  label="Remaining"
                />

              </div>

            </div>
          </div>
        </section>

                {/* =====================================================
            PREMIUM MEMBERSHIP BANNER
        ====================================================== */}

        {!user.isPremium && (
          <section className="mb-7 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-orange-50 shadow-sm">

            <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Sparkles size={22} />
                </div>

                <div>
                  <p className="text-sm font-black text-slate-950">
                    Unlock your premium learning
                    experience
                  </p>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                    Access premium ICU learning resources,
                    protected study materials, structured
                    courses and advanced learning content
                    when your account is upgraded.
                  </p>
                </div>

              </div>

              <Link
                href="/courses"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-800"
              >
                Explore Premium Learning
                <ArrowRight size={17} />
              </Link>

            </div>
          </section>
        )}

        {/* =====================================================
            KEY METRICS
        ====================================================== */}

        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            title="Enrolled Courses"
            value={String(totalCourses)}
            description={
              totalCourses === 0
                ? "No courses in your learning path yet"
                : "Courses currently in your learning library"
            }
            icon={<BookOpen size={22} />}
            iconClass="bg-cyan-50 text-cyan-700"
            href="/courses"
          />

          <MetricCard
            title="Completed Courses"
            value={String(completedCourses)}
            description={
              totalCourses === 0
                ? "Start a course to begin"
                : `${completionRate}% of enrolled courses completed`
            }
            icon={<CheckCircle2 size={22} />}
            iconClass="bg-emerald-50 text-emerald-700"
            href="/courses"
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
            href="/courses"
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
            href="/dashboard/quiz"
          />

        </section>

        {/* =====================================================
            MAIN DASHBOARD GRID
        ====================================================== */}

        <section className="grid gap-7 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,0.75fr)]">

          {/* ===================================================
              LEFT CONTENT
          ==================================================== */}

          <div className="space-y-7">

            {/* -------------------------------------------------
                CONTINUE LEARNING
            -------------------------------------------------- */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 p-6 sm:p-7">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
                      <CirclePlay size={14} />
                      Continue Learning
                    </div>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
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
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
                      <Target size={13} />
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
                        label="Course Progress"
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

                      <div className="mb-2 flex items-center justify-between gap-4 text-sm font-black">

                        <span className="text-slate-700">
                          Course progress
                        </span>

                        <span className="text-cyan-700">
                          {currentCourse.progress}%
                        </span>

                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 transition-all duration-500"
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
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-700/15 transition hover:-translate-y-0.5 hover:bg-blue-800"
                      >
                        <CirclePlay size={18} />

                        {currentCourse.nextLesson
                          ? "Start Next Lesson"
                          : "Review Course"}

                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>

                      <Link
                        href={`/courses/${currentCourse.course.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-black text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
                      >
                        Course Overview
                        <ChevronRight size={17} />
                      </Link>

                    </div>

                    {currentCourse.nextLesson && (
                      <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4">

                        <div className="flex items-start gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm">
                            <BookOpen size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-700">
                              Up next
                            </p>

                            <p className="mt-1 break-words text-sm font-black text-slate-900">
                              {currentCourse.nextLesson.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Lesson{" "}
                              {currentCourse.nextLesson.lessonOrder}
                              {" · "}
                              {currentCourse.nextLesson.duration}{" "}
                              minutes
                            </p>
                          </div>

                        </div>

                      </div>
                    )}

                  </>
                ) : (
                  <EmptyState
                    icon={<GraduationCap size={28} />}
                    title="Start your first course"
                    description="Explore the ICU course catalogue and choose a structured learning program to begin tracking your progress."
                    href="/courses"
                    action="Explore Courses"
                  />
                )}

              </div>
            </section>

            {/* -------------------------------------------------
                MY COURSES
            -------------------------------------------------- */}

            <section>

              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
                    <BookOpen size={14} />
                    My Learning
                  </div>

                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    Your Courses
                  </h2>

                  <p className="mt-1 text-sm text-slate-600">
                    {totalCourses === 0
                      ? "Your enrolled courses will appear here."
                      : `${totalCourses} course${
                          totalCourses === 1
                            ? ""
                            : "s"
                        } in your learning library.`}
                  </p>
                </div>

                {totalCourses > 0 && (
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-1.5 text-sm font-black text-blue-700 transition hover:text-blue-900"
                  >
                    Browse catalogue
                    <ArrowRight size={16} />
                  </Link>
                )}

              </div>

              {totalCourses === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-12">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <BookOpen size={30} />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    No enrolled courses yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                    Start learning by exploring the
                    available ICU courses and choose
                    the program that matches your goals.
                  </p>

                  <Link
                    href="/courses"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
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

              {totalCourses >
                recentCourses.length && (
                <div className="mt-5 text-center">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700"
                  >
                    View all learning options
                    <ArrowRight size={17} />
                  </Link>
                </div>
              )}

            </section>

            {/* -------------------------------------------------
                LEARNING MILESTONES
            -------------------------------------------------- */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                    <Target size={14} />
                    Learning Milestones
                  </div>

                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    Your learning pathway
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Keep progressing through courses,
                    lessons, assessments and certificates.
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                  {overallProgress}% overall
                </div>

              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">

                <MilestoneCard
                  icon={<BookOpen size={20} />}
                  title="Course Path"
                  value={String(totalCourses)}
                  description="Enrolled courses"
                  completed={totalCourses > 0}
                />

                <MilestoneCard
                  icon={<CheckCircle2 size={20} />}
                  title="Lesson Progress"
                  value={`${completedLessons}/${totalLessons}`}
                  description="Lessons completed"
                  completed={
                    totalLessons > 0 &&
                    completedLessons > 0
                  }
                />

                <MilestoneCard
                  icon={<Award size={20} />}
                  title="Certification"
                  value={
                    latestCertificate
                      ? "Earned"
                      : "In progress"
                  }
                  description="Latest certificate"
                  completed={
                    Boolean(latestCertificate)
                  }
                />

              </div>

            </section>

          </div>

                    {/* ===================================================
              RIGHT SIDEBAR
          ==================================================== */}

          <aside className="space-y-7">

            {/* -------------------------------------------------
                QUICK ACCESS
            -------------------------------------------------- */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
                    <Sparkles size={14} />
                    Quick Access
                  </div>

                  <h2 className="mt-2 text-xl font-black text-slate-950">
                    Learning shortcuts
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Jump directly to the most useful
                    areas of your LMS.
                  </p>
                </div>

                <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700">
                  <ArrowRight size={20} />
                </div>

              </div>

              <div className="mt-5 space-y-3">

                <QuickAction
                  href="/courses"
                  icon={<BookOpen size={19} />}
                  title="Browse Courses"
                  description="Explore the course catalogue"
                />

                <QuickAction
                  href="/dashboard/quiz"
                  icon={<ClipboardCheck size={19} />}
                  title="Take a Quiz"
                  description="Test your ICU knowledge"
                />

                <QuickAction
                  href="/profile"
                  icon={<UserRound size={19} />}
                  title="My Profile"
                  description="Manage your account"
                />

                <QuickAction
                  href="/dashboard/certificates"
                  icon={<Award size={19} />}
                  title="My Certificates"
                  description="View earned certificates"
                />

              </div>

            </section>

            {/* -------------------------------------------------
                ACTIVE COURSE
            -------------------------------------------------- */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700" />

              <div className="p-6">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                      Current Focus
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-950">
                      {currentCourse
                        ? "Continue this course"
                        : "Choose your next course"}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                    <CirclePlay size={21} />
                  </div>

                </div>

                {currentCourse ? (
                  <>

                    <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">

                      <div className="flex items-start gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                          <GraduationCap size={20} />
                        </div>

                        <div className="min-w-0">

                          <p className="break-words text-sm font-black text-slate-900">
                            {currentCourse.course.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {currentCourse.course.instructor}
                          </p>

                        </div>

                      </div>

                      <div className="mt-5">

                        <div className="mb-2 flex items-center justify-between text-xs font-black">
                          <span className="text-slate-600">
                            Progress
                          </span>

                          <span className="text-blue-700">
                            {activeCoursePercent}%
                          </span>
                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">

                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700"
                            style={{
                              width: `${activeCoursePercent}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>

                    <Link
                      href={activeCourseHref}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                    >
                      {activeCourseAction}
                      <ArrowRight size={17} />
                    </Link>

                  </>
                ) : (
                  <EmptyState
                    icon={<BookOpen size={25} />}
                    title="No active course"
                    description="Browse the course catalogue and start your learning pathway."
                    href="/courses"
                    action="Browse Courses"
                  />
                )}

              </div>
            </section>

            {/* -------------------------------------------------
                LEARNING ANALYTICS
            -------------------------------------------------- */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
                    <TrendingUp size={14} />
                    Analytics
                  </div>

                  <h2 className="mt-2 text-xl font-black text-slate-950">
                    Learning overview
                  </h2>
                </div>

                <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700">
                  <GraduationCap size={21} />
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
                  value={String(activeCourses)}
                  progress={
                    totalCourses === 0
                      ? 0
                      : calculatePercent(
                          activeCourses,
                          totalCourses
                        )
                  }
                />

                <AnalyticsRow
                  label="Lesson completion"
                  value={`${completedLessons}/${totalLessons}`}
                  progress={overallProgress}
                />

              </div>

            </section>

            {/* -------------------------------------------------
                QUIZ PERFORMANCE
            -------------------------------------------------- */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-violet-700">
                    <ClipboardCheck size={14} />
                    Assessment
                  </div>

                  <h2 className="mt-2 text-xl font-black text-slate-950">
                    Quiz Performance
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Your real quiz performance from
                    this account.
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                  <Trophy size={21} />
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
                  label="Needs Practice"
                />

              </div>

              <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm">
                    <Target size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-black text-violet-900">
                      Assessment goal
                    </p>

                    <p className="mt-1 text-xs leading-5 text-violet-700">
                      Keep practicing to improve your
                      quiz average and strengthen your
                      clinical knowledge.
                    </p>
                  </div>

                </div>

              </div>

              <Link
                href="/dashboard/quiz"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-3 text-sm font-black text-white transition hover:bg-violet-800"
              >
                Open Quiz Dashboard
                <ArrowRight size={17} />
              </Link>

            </section>

                        {/* -------------------------------------------------
                CERTIFICATE
            -------------------------------------------------- */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                    <Award size={14} />
                    Achievement
                  </div>

                  <h2 className="mt-2 text-xl font-black text-slate-950">
                    Latest Certificate
                  </h2>
                </div>

                <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                  <Trophy size={21} />
                </div>

              </div>

              {latestCertificate ? (
                <>

                  <div className="mt-6 rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
                        <Award size={21} />
                      </div>

                      <div className="min-w-0">

                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-700">
                          Course Completed
                        </p>

                        <h3 className="mt-2 break-words text-sm font-black text-slate-950">
                          {latestCertificate.course.title}
                        </h3>

                      </div>

                    </div>

                    <div className="mt-5 space-y-2">

                      <p className="text-xs text-slate-600">
                        Certificate No:{" "}
                        <span className="font-black text-slate-900">
                          {
                            latestCertificate.certificateNo
                          }
                        </span>
                      </p>

                      <p className="text-xs text-slate-600">
                        Issued on{" "}
                        <span className="font-bold text-slate-900">
                          {formatDate(
                            latestCertificate.issuedAt
                          )}
                        </span>
                      </p>

                    </div>

                  </div>

                  <Link
                    href={`/api/certificates/latest/${latestCertificate.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                  >
                    <Award size={17} />
                    Download Certificate
                  </Link>

                </>
              ) : (
                <>

                  <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                      <LockKeyhole size={23} />
                    </div>

                    <p className="mt-4 text-sm font-black text-slate-800">
                      Your certificate is waiting
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Complete an eligible course to
                      unlock your certificate.
                    </p>

                  </div>

                  <Link
                    href="/dashboard/certificates"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:text-amber-700"
                  >
                    Certificate Information
                    <ArrowRight size={17} />
                  </Link>

                </>
              )}

            </section>

            {/* -------------------------------------------------
                ACCOUNT STATUS
            -------------------------------------------------- */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div
                className={
                  user.isPremium
                    ? "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 p-6 text-white"
                    : "bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800 p-6 text-white"
                }
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em]">
                      {user.isPremium ? (
                        <>
                          <Crown size={13} />
                          Premium Account
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={13} />
                          Student Account
                        </>
                      )}
                    </div>

                    <h2 className="mt-4 text-xl font-black">
                      {user.isPremium
                        ? "Premium learning is active"
                        : "Build your learning pathway"}
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-white/80">
                      {user.isPremium
                        ? "Your account is enabled for premium learning access."
                        : "Continue learning and explore available premium programs."}
                    </p>

                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                    {user.isPremium ? (
                      <Crown size={22} />
                    ) : (
                      <GraduationCap size={22} />
                    )}
                  </div>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <AccountStat
                    label="Courses"
                    value={String(totalCourses)}
                  />

                  <AccountStat
                    label="Certificates"
                    value={
                      latestCertificate
                        ? "1+"
                        : "0"
                    }
                  />

                </div>

              </div>

              {!user.isPremium && (
                <div className="p-5">

                  <Link
                    href="/courses"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                  >
                    Explore Premium Courses
                    <ArrowRight size={17} />
                  </Link>

                </div>
              )}

            </section>

          </aside>
        </section>

        {/* =====================================================
            FOOTER STATUS
        ====================================================== */}

        <footer className="mt-8 border-t border-slate-200 pt-6">

          <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2">
              <ShieldCheck
                size={14}
                className="text-cyan-600"
              />

              <p>
                ICU Learning Portal · Professional
                Learning Dashboard
              </p>
            </div>

            <div className="flex items-center gap-2">

              <span
                className={
                  user.isPremium
                    ? "inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 font-bold text-amber-700"
                    : "inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 font-bold text-slate-600"
                }
              >
                {user.isPremium ? (
                  <>
                    <Crown size={12} />
                    Premium learning account
                  </>
                ) : (
                  <>
                    <UserRound size={12} />
                    Free learning account
                  </>
                )}
              </span>

            </div>

          </div>

        </footer>

      </div>
    </main>
  );
}

/*
 * ============================================================
 * HERO STAT
 * ============================================================
 */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">

      <p className="text-lg font-black text-white">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-100">
        {label}
      </p>

    </div>
  );
}

/*
 * ============================================================
 * METRIC CARD
 * ============================================================
 */

function MetricCard({
  title,
  value,
  description,
  icon,
  iconClass,
  href,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  iconClass: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg"
    >
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

      <div className="mt-5 flex items-center justify-between gap-3">

        <h2 className="text-sm font-black text-slate-900">
          {title}
        </h2>

        <ArrowRight
          size={15}
          className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-cyan-600"
        />

      </div>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

    </Link>
  );
}

/*
 * ============================================================
 * COURSE CARD
 * ============================================================
 */

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
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg">

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
                className={
                  item.completed
                    ? "shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700"
                    : "shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-blue-700"
                }
              >
                {item.completed
                  ? "Completed"
                  : "In Progress"}
              </span>

            </div>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {item.course.instructor}
              {" · "}
              {item.course.language}
              {" · "}
              {item.course.level}
            </p>

          </div>

        </div>

        <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-600">
          {item.course.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">

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

          <div className="mb-2 flex items-center justify-between gap-4 text-xs font-black">

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
              className={
                item.completed
                  ? "h-full rounded-full bg-emerald-500 transition-all"
                  : "h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 transition-all"
              }
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
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Next lesson
                </p>

                <p className="mt-1 truncate text-xs font-black text-slate-700">
                  {item.nextLesson.title}
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  Lesson{" "}
                  {item.nextLesson.lessonOrder}
                  {" · "}
                  {item.nextLesson.duration} min
                </p>
              </>
            ) : (
              <p className="text-xs font-black text-emerald-700">
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
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition group-hover:bg-blue-700"
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

/*
 * ============================================================
 * QUICK ACTION
 * ============================================================
 */

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
      className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 transition hover:border-cyan-200 hover:bg-cyan-50/60"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition group-hover:text-cyan-700">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm font-black text-slate-900">
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

/*
 * ============================================================
 * MINI STAT
 * ============================================================
 */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 truncate text-lg font-black text-slate-900">
        {value}
      </p>

    </div>
  );
}

/*
 * ============================================================
 * ANALYTICS ROW
 * ============================================================
 */

function AnalyticsRow({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) {
  const safeProgress = Math.min(
    100,
    Math.max(0, progress)
  );

  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-3 text-xs font-black">

        <span className="text-slate-600">
          {label}
        </span>

        <span className="text-slate-900">
          {value}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 transition-all"
          style={{
            width: `${safeProgress}%`,
          }}
        />

      </div>

    </div>
  );
}

/*
 * ============================================================
 * PERFORMANCE STAT
 * ============================================================
 */

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

      <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>

    </div>
  );
}

/*
 * ============================================================
 * MILESTONE CARD
 * ============================================================
 */

function MilestoneCard({
  icon,
  title,
  value,
  description,
  completed,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  completed: boolean;
}) {
  return (
    <div
      className={
        completed
          ? "rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5"
          : "rounded-2xl border border-slate-100 bg-slate-50 p-5"
      }
    >

      <div className="flex items-start justify-between gap-4">

        <div
          className={
            completed
              ? "flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm"
              : "flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm"
          }
        >
          {icon}
        </div>

        {completed && (
          <CheckCircle2
            size={17}
            className="text-emerald-600"
          />
        )}

      </div>

      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

    </div>
  );
}

/*
 * ============================================================
 * ACCOUNT STAT
 * ============================================================
 */

function AccountStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/10 p-3">

      <p className="text-base font-black">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/60">
        {label}
      </p>

    </div>
  );
}

/*
 * ============================================================
 * EMPTY STATE
 * ============================================================
 */

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

      <h3 className="mt-4 text-lg font-black text-slate-950">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
        {description}
      </p>

      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
      >
        {action}
        <ArrowRight size={17} />
      </Link>

    </div>
  );
}