import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";

import BuyNowButton from "@/components/course/BuyNowButton";
import FreeEnrollButton from "@/components/course/FreeEnrollButton";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Crown,
  FileText,
  Globe,
  GraduationCap,
  Lock,
  PlayCircle,
  ShieldCheck,
  Star,
  Stethoscope,
  Users,
  Award,
  HeartPulse,
  BadgeCheck,
  Video,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CourseDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  /*
   * =====================================================
   * COURSE DATA
   * =====================================================
   */

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      lessons: {
        orderBy: {
          lessonOrder: "asc",
        },
      },
      enrollments: true,
    },
  });

  if (!course) {
    notFound();
  }

  /*
   * =====================================================
   * AUTHENTICATION
   * =====================================================
   */

  const session = await auth();

  let enrolled = false;
  let enrollmentProgress = 0;

  let customerName = "";
  let customerEmail = "";

  let nextLessonId: string | null = null;

  const completedLessonIds = new Set<string>();

  /*
   * =====================================================
   * CURRENT USER
   * =====================================================
   */

  if (session?.user?.email) {
    customerName = session.user.name || "";
    customerEmail = session.user.email;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    if (user) {
      if (!customerName) {
        customerName = user.fullName;
      }

      /*
       * -------------------------------------------------
       * ENROLLMENT
       * -------------------------------------------------
       */

      const enrollment =
        await prisma.enrollment.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: course.id,
            },
          },
        });

      if (enrollment) {
        enrolled = true;

        enrollmentProgress = Math.min(
          Math.max(enrollment.progress, 0),
          100
        );

        /*
         * ------------------------------------------------
         * COMPLETED LESSONS
         * ------------------------------------------------
         */

        const completedLessons =
          await prisma.lessonProgress.findMany({
            where: {
              userId: user.id,
              completed: true,
              lesson: {
                courseId: course.id,
              },
            },
            select: {
              lessonId: true,
            },
          });

        completedLessons.forEach((item) => {
          completedLessonIds.add(item.lessonId);
        });

        /*
         * ------------------------------------------------
         * NEXT LESSON
         * ------------------------------------------------
         */

        const nextLesson = course.lessons.find(
          (lesson) =>
            !completedLessonIds.has(lesson.id)
        );

        nextLessonId =
          nextLesson?.id ??
          course.lessons[
            course.lessons.length - 1
          ]?.id ??
          null;
      }
    }
  }

  /*
   * =====================================================
   * COURSE CALCULATIONS
   * =====================================================
   */

  const totalLessons = course.lessons.length;

  const completedLessonCount =
    completedLessonIds.size;

  const calculatedProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessonCount / totalLessons) *
            100
        )
      : 0;

  const progress = enrolled
    ? Math.min(
        Math.max(
          Math.max(
            enrollmentProgress,
            calculatedProgress
          ),
          0
        ),
        100
      )
    : 0;

  const remainingLessons = Math.max(
    totalLessons - completedLessonCount,
    0
  );

  const studentCount =
    course.enrollments.length;

  const isCompleted =
    enrolled &&
    totalLessons > 0 &&
    completedLessonCount >= totalLessons;

  const isFreeCourse =
    !course.isPremium &&
    course.price <= 0;

  const hasPrice =
    Number.isFinite(course.price) &&
    course.price > 0;

  /*
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* =================================================
          TOP BACK NAVIGATION
      ================================================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">

          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-700"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to Courses
          </Link>

        </div>
      </div>

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute inset-0">

          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover opacity-50"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />

        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          <div className="grid items-center gap-12 lg:grid-cols-3">

            {/* ===========================================
                HERO CONTENT
            =========================================== */}

            <div className="lg:col-span-2">

              <div className="flex flex-wrap items-center gap-3">

                {course.isPremium ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-amber-950 shadow-lg">
                    <Crown size={15} />
                    Premium Course
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-emerald-950 shadow-lg">
                    <BadgeCheck size={15} />
                    Free Course
                  </span>
                )}

                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
                  {course.level}
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
                  {course.language}
                </span>

              </div>

              <div className="mt-7 flex items-start gap-4">

                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30 sm:flex">
                  <Stethoscope size={28} />
                </div>

                <div>

                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                    ICU Learning Portal
                  </p>

                  <h1 className="mt-3 max-w-5xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                    {course.title}
                  </h1>

                </div>

              </div>

              <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                {course.description}
              </p>

              {/* Hero meta */}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-slate-300">

                <div className="flex items-center gap-2">
                  <GraduationCap
                    size={18}
                    className="text-cyan-300"
                  />

                  <span>
                    By{" "}
                    <strong className="text-white">
                      {course.instructor}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />

                  <span>
                    <strong className="text-white">
                      {course.rating.toFixed(1)}
                    </strong>{" "}
                    rating
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users
                    size={18}
                    className="text-cyan-300"
                  />

                  <span>
                    {studentCount} learners
                  </span>
                </div>

              </div>

            </div>

            {/* ===========================================
                HERO ACCESS SUMMARY
            =========================================== */}

            <div className="lg:col-span-1">

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">

                <div className="relative h-48 overflow-hidden">

                  <img
                    src={course.image}
                    alt={`${course.title} preview`}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                  <div className="absolute bottom-4 left-5 flex items-center gap-2 text-sm font-bold text-white">
                    <HeartPulse
                      size={18}
                      className="text-cyan-300"
                    />

                    Professional ICU Education
                  </div>

                </div>

                <div className="p-6">

                  <div className="flex items-end justify-between gap-4">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Course Price
                      </p>

                      <p className="mt-1 text-3xl font-black text-slate-900">
                        {hasPrice
                          ? `₹${course.price.toLocaleString(
                              "en-IN"
                            )}`
                          : "FREE"}
                      </p>

                    </div>

                    <div className="rounded-xl bg-blue-50 px-3 py-2 text-center">

                      <p className="text-xs font-bold text-blue-600">
                        {totalLessons}
                      </p>

                      <p className="text-[10px] font-semibold uppercase text-slate-500">
                        Lessons
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 space-y-3">

                    <MiniFeature
                      icon={<Video size={16} />}
                      text="Structured video lessons"
                    />

                    <MiniFeature
                      icon={<FileText size={16} />}
                      text="Study notes & resources"
                    />

                    <MiniFeature
                      icon={<ShieldCheck size={16} />}
                      text="Progress tracking"
                    />

                    <MiniFeature
                      icon={<Award size={16} />}
                      text="Completion certificate"
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="relative -mt-8 px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-5">

            <CourseStat
              icon={<Clock3 size={20} />}
              label="Duration"
              value={formatDuration(
                course.duration
              )}
              className="border-b border-slate-200 sm:border-r lg:border-b-0"
            />

            <CourseStat
              icon={<BookOpen size={20} />}
              label="Lessons"
              value={`${totalLessons} Lessons`}
              className="border-b border-slate-200 lg:border-b-0 lg:border-r"
            />

            <CourseStat
              icon={<Users size={20} />}
              label="Learners"
              value={`${studentCount} Students`}
              className="border-b border-slate-200 sm:border-r lg:border-b-0"
            />

            <CourseStat
              icon={
                <Star
                  size={20}
                  className="fill-amber-500"
                />
              }
              label="Rating"
              value={`${course.rating.toFixed(1)} / 5`}
              className="border-b border-slate-200 lg:border-b-0 lg:border-r"
            />

            <CourseStat
              icon={<Globe size={20} />}
              label="Language"
              value={course.language}
              className=""
            />

          </div>

        </div>

      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* ============================================
              LEFT CONTENT
          ============================================ */}

          <div className="space-y-8 lg:col-span-2">

            {/* ==========================================
                COURSE OVERVIEW
            ========================================== */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeading
                eyebrow="Course Overview"
                title="What You Will Learn"
                icon={<GraduationCap size={24} />}
              />

              <div className="mt-7 rounded-2xl bg-slate-50 p-6">

                <p className="whitespace-pre-line text-base leading-8 text-slate-600">
                  {course.description}
                </p>

              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <OutcomeItem text="Structured ICU learning pathway" />

                <OutcomeItem text="Practical clinical concepts" />

                <OutcomeItem text="Lesson-wise progress tracking" />

                <OutcomeItem text="Course completion certificate" />

              </div>

            </section>

            {/* ==========================================
                INSTRUCTOR
            ========================================== */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeading
                eyebrow="Course Instructor"
                title="Learn From Your Instructor"
                icon={<Stethoscope size={24} />}
              />

              <div className="mt-7 flex flex-col gap-5 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 p-6 sm:flex-row sm:items-center">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 text-2xl font-black text-white shadow-lg">
                  {course.instructor
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {course.instructor}
                  </h3>

                  <p className="mt-1 font-medium text-cyan-700">
                    ICU Learning Portal Instructor
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Learn through a structured curriculum
                    designed for healthcare professionals,
                    ICU nursing students and clinical
                    learners.
                  </p>

                </div>

              </div>

            </section>

            {/* ==========================================
                CURRICULUM HEADER
            ========================================== */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <SectionHeading
                  eyebrow="Course Curriculum"
                  title="Lessons & Learning Modules"
                  icon={<BookOpen size={24} />}
                />

                <div className="w-fit rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  {totalLessons} Lessons
                </div>

              </div>

              {totalLessons === 0 ? (
                <EmptyLessons />
              ) : (
                <div className="mt-8 space-y-4">

                  {course.lessons.map(
                    (lesson, index) => {
                      const completed =
                        completedLessonIds.has(
                          lesson.id
                        );

                      return (
                        <LessonCard
                          key={lesson.id}
                          index={index}
                          lesson={lesson}
                          completed={completed}
                          enrolled={enrolled}
                          courseId={course.id}
                        />
                      );
                    }
                  )}

                </div>
              )}

            </section>

          </div>

          {/* ============================================
              RIGHT SIDEBAR
          ============================================ */}

          <aside className="space-y-6">

            {/* ==========================================
                ACCESS CARD
            ========================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:sticky lg:top-6">

              <div className="bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 p-6 text-white sm:p-7">

                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-100">
                  <HeartPulse size={17} />
                  Course Access
                </div>

                <h2 className="mt-3 text-2xl font-black">
                  {enrolled
                    ? "You Have Full Access"
                    : "Start Learning Today"}
                </h2>

                <div className="mt-5">

                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
                    Course Investment
                  </p>

                  <p className="mt-1 text-4xl font-black">
                    {hasPrice
                      ? `₹${course.price.toLocaleString(
                          "en-IN"
                        )}`
                      : "FREE"}
                  </p>

                </div>

              </div>

              <div className="p-6 sm:p-7">

                {enrolled ? (
                  <EnrolledState
                    courseId={course.id}
                    progress={progress}
                    completedLessonCount={
                      completedLessonCount
                    }
                    totalLessons={totalLessons}
                    remainingLessons={
                      remainingLessons
                    }
                    nextLessonId={nextLessonId}
                    isCompleted={isCompleted}
                  />
                ) : (
                  <PurchaseState
                    course={course}
                    isFreeCourse={isFreeCourse}
                    hasPrice={hasPrice}
                    session={session}
                    customerName={customerName}
                    customerEmail={customerEmail}
                  />
                )}

              </div>

            </section>

            {/* ==========================================
                COURSE DETAILS
            ========================================== */}

            <InfoCard
              title="Course Details"
              content={`This ${course.level.toLowerCase()} level course is taught in ${course.language} by ${course.instructor}. It contains ${totalLessons} structured lessons and is designed for professional ICU learning.`}
            />

            {/* ==========================================
                CERTIFICATE CARD
            ========================================== */}

            <section className="overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-lg sm:p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20">
                  <Award size={24} />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Achievement
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Course Certificate
                  </h2>

                </div>

              </div>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                Complete all course lessons to become
                eligible for your ICU Learning Portal
                course completion certificate.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <CheckCircle2 size={17} />
                Certificate after completion
              </div>

            </section>

          </aside>

        </div>

        {/* =================================================
            LEARNING PROGRESS
        ================================================= */}

        {enrolled && (
          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="p-6 sm:p-8">

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>

                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600">
                    Your Learning Journey
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    {course.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Keep learning and complete the
                    curriculum to earn your certificate.
                  </p>

                </div>

                <div className="rounded-2xl bg-blue-50 px-7 py-5 text-center">

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Overall Progress
                  </p>

                  <p className="mt-1 text-4xl font-black text-blue-700">
                    {progress}%
                  </p>

                </div>

              </div>

              <div className="mt-7">

                <div className="h-4 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">

                <ProgressMetric
                  value={`${completedLessonCount}`}
                  label="Lessons Completed"
                />

                <ProgressMetric
                  value={`${remainingLessons}`}
                  label="Lessons Remaining"
                />

                <ProgressMetric
                  value={`${progress}%`}
                  label="Course Progress"
                />

              </div>

            </div>

          </section>
        )}

      </div>

    </main>
  );
}

/*
 * ==========================================================
 * SECTION COMPONENTS
 * ==========================================================
 */

function SectionHeading({
  eyebrow,
  title,
  icon,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <div>

        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-2xl font-black text-slate-900">
          {title}
        </h2>

      </div>

    </div>
  );
}

/*
 * ==========================================================
 * COURSE STAT
 * ==========================================================
 */

function CourseStat({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div
      className={`p-5 sm:p-6 ${className}`}
    >
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>

        <div>

          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 font-black text-slate-900">
            {value}
          </p>

        </div>

      </div>
    </div>
  );
}

/*
 * ==========================================================
 * MINI FEATURE
 * ==========================================================
 */

function MiniFeature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        {icon}
      </div>

      <span className="text-sm font-medium text-slate-600">
        {text}
      </span>

    </div>
  );
}

/*
 * ==========================================================
 * LEARNING OUTCOME
 * ==========================================================
 */

function OutcomeItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2 size={17} />
      </div>

      <span className="text-sm font-semibold text-slate-700">
        {text}
      </span>

    </div>
  );
}

/*
 * ==========================================================
 * EMPTY LESSONS
 * ==========================================================
 */

function EmptyLessons() {
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
        <BookOpen size={30} />
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-700">
        Lessons Coming Soon
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Lessons for this course have not been
        added yet. Please check back soon.
      </p>

    </div>
  );
}

/*
 * ==========================================================
 * LESSON CARD
 * ==========================================================
 */

function LessonCard({
  index,
  lesson,
  completed,
  enrolled,
  courseId,
}: {
  index: number;
  lesson: {
    id: string;
    title: string;
    description: string;
    duration: number;
    videoUrl: string;
    notesUrl: string | null;
  };
  completed: boolean;
  enrolled: boolean;
  courseId: string;
}) {
  return (
    <div
      className={`group rounded-2xl border p-5 transition-all duration-200 ${
        completed
          ? "border-emerald-200 bg-emerald-50/60"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
      }`}
    >

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex min-w-0 items-start gap-4">

          {/* Lesson number */}

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
              completed
                ? "bg-emerald-600 text-white"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {completed ? (
              <CheckCircle2 size={21} />
            ) : (
              String(index + 1).padStart(
                2,
                "0"
              )
            )}
          </div>

          {/* Lesson information */}

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-black text-slate-900">
                {lesson.title}
              </h3>

              {completed && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700">
                  Completed
                </span>
              )}

            </div>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
              {lesson.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-bold">

              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <Clock3 size={14} />
                {lesson.duration} min
              </span>

              {lesson.videoUrl && (
                <span className="inline-flex items-center gap-1.5 text-blue-600">
                  <PlayCircle size={14} />
                  Video Lesson
                </span>
              )}

              {lesson.notesUrl && (
                <span className="inline-flex items-center gap-1.5 text-emerald-600">
                  <FileText size={14} />
                  Notes
                </span>
              )}

            </div>

          </div>

        </div>

        {/* Lesson action */}

        <div className="shrink-0">

          {enrolled ? (
            <Link
              href={`/courses/${courseId}/lesson/${lesson.id}`}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition sm:w-auto ${
                completed
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-blue-700 text-white hover:bg-blue-800"
              }`}
            >
              {completed ? (
                <>
                  <CheckCircle2 size={17} />
                  Review
                </>
              ) : (
                <>
                  <PlayCircle size={17} />
                  Watch Lesson
                </>
              )}

              <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-500 sm:w-auto">
              <Lock size={16} />
              Locked
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

/*
 * ==========================================================
 * ENROLLED STATE
 * ==========================================================
 */

function EnrolledState({
  courseId,
  progress,
  completedLessonCount,
  totalLessons,
  remainingLessons,
  nextLessonId,
  isCompleted,
}: {
  courseId: string;
  progress: number;
  completedLessonCount: number;
  totalLessons: number;
  remainingLessons: number;
  nextLessonId: string | null;
  isCompleted: boolean;
}) {
  return (
    <div>

      {/* Progress summary */}

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
              Your Progress
            </p>

            <p className="mt-1 text-4xl font-black text-emerald-800">
              {progress}%
            </p>

          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
            <CheckCircle2 size={24} />
          </div>

        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-emerald-100">

          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="mt-3 text-sm font-medium text-emerald-700">
          {completedLessonCount} of{" "}
          {totalLessons} lessons completed
        </p>

      </div>

      {/* Continue button */}

      {isCompleted ? (
        <div className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-center text-white shadow-lg">

          <Award
            size={28}
            className="mx-auto"
          />

          <p className="mt-2 font-black">
            Course Completed
          </p>

          <p className="mt-1 text-sm text-emerald-50">
            Congratulations! You completed
            this course.
          </p>

          <Link
            href="/dashboard/certificates"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
          >
            View Certificate
            <ArrowRight size={16} />
          </Link>

        </div>
      ) : nextLessonId ? (
        <Link
          href={`/courses/${courseId}/lesson/${nextLessonId}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:from-cyan-700 hover:to-blue-800"
        >
          <PlayCircle size={20} />
          Continue Learning
          <ArrowRight size={18} />
        </Link>
      ) : (
        <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-center text-sm font-bold text-slate-600">
          {remainingLessons} lessons remaining
        </div>
      )}

    </div>
  );
}

/*
 * ==========================================================
 * PURCHASE STATE
 * ==========================================================
 */

function PurchaseState({
  course,
  isFreeCourse,
  hasPrice,
  session,
  customerName,
  customerEmail,
}: {
  course: {
    id: string;
    title: string;
    price: number;
    isPremium: boolean;
  };
  isFreeCourse: boolean;
  hasPrice: boolean;
  session: {
    user?: {
      email?: string | null;
    };
  } | null;
  customerName: string;
  customerEmail: string;
}) {
  return (
    <div>

      <div className="mb-6 space-y-3">

        <AccessFeature text="Full course access" />

        <AccessFeature text="Structured video lessons" />

        <AccessFeature text="Lesson notes and resources" />

        <AccessFeature text="Learning progress tracking" />

        <AccessFeature text="Course completion certificate" />

      </div>

      {isFreeCourse ? (
        <FreeEnrollButton
          courseId={course.id}
        />
      ) : course.isPremium &&
        hasPrice ? (
        <BuyNowButton
          courseId={course.id}
          courseTitle={course.title}
          price={course.price}
          isLoggedIn={Boolean(
            session?.user?.email
          )}
          customerName={customerName}
          customerEmail={customerEmail}
        />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">

          <p className="font-bold text-slate-800">
            Enrollment Unavailable
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            This course is not currently available
            for enrollment.
          </p>

        </div>
      )}

    </div>
  );
}

/*
 * ==========================================================
 * ACCESS FEATURE
 * ==========================================================
 */

function AccessFeature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2 size={15} />
      </div>

      <span className="text-sm font-semibold text-slate-700">
        {text}
      </span>

    </div>
  );
}

/*
 * ==========================================================
 * PROGRESS METRIC
 * ==========================================================
 */

function ProgressMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">

      <p className="text-2xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

    </div>
  );
}

/*
 * ==========================================================
 * INFO CARD
 * ==========================================================
 */

function InfoCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <ShieldCheck size={20} />
        </div>

        <h3 className="text-xl font-black text-slate-900">
          {title}
        </h3>

      </div>

      <p className="mt-5 leading-7 text-slate-600">
        {content}
      </p>

    </section>
  );
}

/*
 * ==========================================================
 * DURATION FORMATTER
 *
 * Database duration is stored in minutes.
 * ==========================================================
 */

function formatDuration(
  minutes: number
) {
  if (
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return "Self-paced";
  }

  const hours = Math.floor(
    minutes / 60
  );

  const remainingMinutes =
    minutes % 60;

  if (hours === 0) {
    return `${minutes} Minutes`;
  }

  if (remainingMinutes === 0) {
    return `${hours} Hours`;
  }

  return `${hours}h ${remainingMinutes}m`;
}