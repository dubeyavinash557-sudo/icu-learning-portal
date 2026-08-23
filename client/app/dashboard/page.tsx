import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  CirclePlay,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Trophy,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function percent(
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
        (lesson) => completedLessonIds.has(lesson.id)
      ).length;

      const totalLessons = lessons.length;

      const progress = percent(
        completedLessons,
        totalLessons
      );

      const nextLesson =
        lessons.find(
          (lesson) => !completedLessonIds.has(lesson.id)
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
    (total, course) => total + course.totalLessons,
    0
  );

  const completedLessons = enrolledCourses.reduce(
    (total, course) => total + course.completedLessons,
    0
  );

  const overallProgress = percent(
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

  const currentCourse =
    [...enrolledCourses]
      .filter((course) => !course.completed)
      .sort((first, second) => {
        if (second.progress !== first.progress) {
          return second.progress - first.progress;
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

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
              ICU Learning Portal
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Welcome back, {user.fullName}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Track your enrolled courses, continue your
              learning, and complete your critical-care
              training.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-cyan-600 hover:text-cyan-700"
            >
              <BookOpen size={18} />
              Browse Courses
            </Link>

            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              My Profile
              <ArrowRight size={17} />
            </Link>
          </div>
        </header>

        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-900 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-100">
                <ShieldCheck size={15} />
                Secure learning access
              </div>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                Your learning progress
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                {totalCourses === 0
                  ? "Choose a course to begin your professional ICU learning journey."
                  : `${completedLessons} of ${totalLessons} enrolled lessons completed.`}
              </p>
            </div>

            <div className="min-w-[220px] rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-100">
                Overall completion
              </p>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-black">
                  {overallProgress}%
                </span>

                <span className="mb-1 text-sm text-blue-100">
                  complete
                </span>
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-white"
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Enrolled Courses"
            value={String(totalCourses)}
            description="Courses available to you"
            icon={<BookOpen size={22} />}
          />

          <MetricCard
            title="Completed Courses"
            value={String(completedCourses)}
            description="Courses completed in full"
            icon={<CheckCircle2 size={22} />}
          />

          <MetricCard
            title="Lessons Completed"
            value={String(completedLessons)}
            description="Completed enrolled lessons"
            icon={<Clock3 size={22} />}
          />

          <MetricCard
            title="Quiz Average"
            value={`${quizAverage}%`}
            description={
              quizAttempts === 0
                ? "No quiz attempts yet"
                : `${passedQuizzes} quiz${
                    passedQuizzes === 1 ? "" : "zes"
                  } passed`
            }
            icon={<ClipboardCheck size={22} />}
          />
        </section>

        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
                Continue learning
              </p>

              <h2 className="mt-2 text-2xl font-black">
                {currentCourse
                  ? currentCourse.course.title
                  : "Start your first course"}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {currentCourse
                  ? currentCourse.nextLesson
                    ? `Next lesson: ${currentCourse.nextLesson.title}`
                    : "You have completed every lesson in this course."
                  : "Explore the course catalogue and enroll in a program that matches your learning goals."}
              </p>
            </div>

            <Link
              href={
                currentCourse?.nextLesson
                  ? `/courses/${currentCourse.course.id}/lesson/${currentCourse.nextLesson.id}`
                  : currentCourse
                  ? `/courses/${currentCourse.course.id}`
                  : "/courses"
              }
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              <CirclePlay size={19} />
              {currentCourse
                ? "Continue Course"
                : "Explore Courses"}
              <ArrowRight size={17} />
            </Link>
          </div>

          {currentCourse && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between gap-4 text-sm font-semibold">
                <span>Course progress</span>

                <span>
                  {currentCourse.completedLessons}/
                  {currentCourse.totalLessons} lessons ·{" "}
                  {currentCourse.progress}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700"
                  style={{
                    width: `${currentCourse.progress}%`,
                  }}
                />
              </div>
            </div>
          )}
        </section>

        <section className="mb-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
                My learning
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Enrolled Courses
              </h2>
            </div>

            {totalCourses > 0 && (
              <Link
                href="/courses"
                className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900"
              >
                View course catalogue
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {totalCourses === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-12">
              <GraduationCap
                size={42}
                className="mx-auto text-cyan-700"
              />

              <h3 className="mt-4 text-xl font-black">
                No enrolled courses yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                Choose a structured ICU course to start
                learning and track your progress here.
              </p>

              <Link
                href="/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Explore Courses
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {enrolledCourses.map((item) => (
                <article
                  key={item.enrollmentId}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                      <BookOpen size={24} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-black">
                        {item.course.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-600">
                        {item.course.instructor} ·{" "}
                        {item.course.language} ·{" "}
                        {item.course.level}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-600">
                    {item.course.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between text-sm font-bold">
                    <span className="text-slate-700">
                      {item.completedLessons}/
                      {item.totalLessons} lessons
                    </span>

                    <span className="text-cyan-700">
                      {item.progress}%
                    </span>
                  </div>

                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700"
                      style={{
                        width: `${item.progress}%`,
                      }}
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                        item.completed
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <Clock3 size={14} />
                      )}

                      {item.completed
                        ? "Course completed"
                        : "In progress"}
                    </span>

                    <Link
                      href={
                        item.nextLesson
                          ? `/courses/${item.course.id}/lesson/${item.nextLesson.id}`
                          : `/courses/${item.course.id}`
                      }
                      className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900"
                    >
                      {item.completed
                        ? "Review course"
                        : "Continue"}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                <ClipboardCheck size={22} />
              </div>

              <div>
                <h2 className="text-lg font-black">
                  Quiz Performance
                </h2>

                <p className="text-sm text-slate-600">
                  Real quiz results from your account
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-end gap-8">
              <div>
                <p className="text-3xl font-black">
                  {quizAverage}%
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Average score
                </p>
              </div>

              <div>
                <p className="text-3xl font-black">
                  {passedQuizzes}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Quizzes passed
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/quiz"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              View quizzes
              <ArrowRight size={16} />
            </Link>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                <Trophy size={22} />
              </div>

              <div>
                <h2 className="text-lg font-black">
                  Latest Certificate
                </h2>

                <p className="text-sm text-slate-600">
                  Certificates earned after course completion
                </p>
              </div>
            </div>

            {latestCertificate ? (
              <>
                <h3 className="mt-6 text-lg font-bold">
                  {latestCertificate.course.title}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Certificate No:{" "}
                  {latestCertificate.certificateNo}
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  Issued on{" "}
                  {formatDate(
                    latestCertificate.issuedAt
                  )}
                </p>

                <Link
                  href={`/api/certificates/latest/${latestCertificate.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
                >
                  <Award size={17} />
                  Download certificate
                </Link>
              </>
            ) : (
              <>
                <p className="mt-6 text-sm leading-6 text-slate-600">
                  Complete all lessons in an eligible course
                  to receive your certificate.
                </p>

                <Link
                  href="/dashboard/certificates"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
                >
                  Certificate information
                  <ArrowRight size={16} />
                </Link>
              </>
            )}
          </article>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-xl bg-cyan-50 p-3 text-cyan-700">
          {icon}
        </div>

        <p className="text-3xl font-black">{value}</p>
      </div>

      <h2 className="mt-5 text-sm font-bold">{title}</h2>

      <p className="mt-1 text-xs text-slate-600">
        {description}
      </p>
    </article>
  );
}