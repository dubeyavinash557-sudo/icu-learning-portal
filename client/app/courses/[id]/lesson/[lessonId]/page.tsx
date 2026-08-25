import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

import CompleteLessonButton from "@/components/course/CompleteLessonButton";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  HeartPulse,
  PlayCircle,
  ShieldCheck,
  Stethoscope,
  Trophy,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: Props) {
  const { id, lessonId } = await params;

  // ==========================================================
  // 1. AUTHENTICATION
  // ==========================================================

  const session = await auth();

  if (!session?.user?.email) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(
        `/courses/${id}/lesson/${lessonId}`
      )}`
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
      email: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // ==========================================================
  // 3. COURSE + LESSONS
  // ==========================================================

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
    },
  });

  if (!course) {
    notFound();
  }

  // ==========================================================
  // 4. CURRENT LESSON
  // ==========================================================

  const lesson = course.lessons.find(
    (item) => item.id === lessonId
  );

  if (!lesson) {
    notFound();
  }

  // ==========================================================
  // 5. DETERMINE FREE / PAID COURSE
  //
  // A course is genuinely free ONLY when:
  //
  // price === 0
  // AND
  // isPremium === false
  //
  // Everything else requires successful payment.
  // ==========================================================

  const isFreeCourse =
    course.price === 0 &&
    course.isPremium === false;

  // ==========================================================
  // 6. ENROLLMENT
  //
  // Enrollment is required for ALL courses.
  // ==========================================================

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
        userId: true,
        courseId: true,
        progress: true,
        completed: true,
        enrolledAt: true,
      },
    });

  if (!enrollment) {
    console.warn(
      "LESSON ACCESS DENIED - NO ENROLLMENT:",
      {
        userId: user.id,
        courseId: course.id,
        lessonId: lesson.id,
      }
    );

    redirect(`/courses/${course.id}`);
  }

  // ==========================================================
  // 7. PAID COURSE PAYMENT SECURITY
  //
  // Enrollment alone is NEVER enough for a paid course.
  //
  // Paid course access requires:
  //
  // 1. Payment belongs to current user
  // 2. Payment belongs to current course
  // 3. Payment status = SUCCESS
  // 4. Payment amount = current course price
  // 5. Razorpay payment ID exists
  // 6. Razorpay order ID exists
  // ==========================================================

  if (!isFreeCourse) {
    const successfulPayment =
      await prisma.payment.findFirst({
        where: {
          userId: user.id,
          courseId: course.id,
          status: "SUCCESS",
          razorpayPaymentId: {
            not: null,
          },
          razorpayOrderId: {
            not: null,
          },
        },
        select: {
          id: true,
          amount: true,
          status: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
          transactionId: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    // --------------------------------------------------------
    // NO SUCCESSFUL PAYMENT
    // --------------------------------------------------------

    if (!successfulPayment) {
      console.error(
        "LESSON PAGE PAYMENT ACCESS DENIED:",
        {
          userId: user.id,
          courseId: course.id,
          lessonId: lesson.id,
          reason:
            "No verified successful Razorpay payment found.",
        }
      );

      redirect(`/courses/${course.id}`);
    }

    // --------------------------------------------------------
    // VERIFY PAYMENT STATUS
    // --------------------------------------------------------

    if (
      successfulPayment.status.toUpperCase() !==
      "SUCCESS"
    ) {
      console.error(
        "LESSON PAGE INVALID PAYMENT STATUS:",
        {
          userId: user.id,
          courseId: course.id,
          paymentId:
            successfulPayment.id,
          status:
            successfulPayment.status,
        }
      );

      redirect(`/courses/${course.id}`);
    }

    // --------------------------------------------------------
    // VERIFY COURSE PRICE
    //
    // Payment amount is stored in INR.
    // Razorpay amount is in paise.
    // --------------------------------------------------------

    const paymentAmountInPaise =
      Math.round(
        successfulPayment.amount * 100
      );

    const courseAmountInPaise =
      Math.round(course.price * 100);

    if (
      !Number.isFinite(
        successfulPayment.amount
      ) ||
      !Number.isSafeInteger(
        paymentAmountInPaise
      ) ||
      !Number.isFinite(course.price) ||
      !Number.isSafeInteger(
        courseAmountInPaise
      ) ||
      paymentAmountInPaise !==
        courseAmountInPaise
    ) {
      console.error(
        "LESSON PAGE PAYMENT AMOUNT MISMATCH:",
        {
          userId: user.id,
          courseId: course.id,
          paymentId:
            successfulPayment.id,
          paymentAmount:
            successfulPayment.amount,
          coursePrice:
            course.price,
        }
      );

      redirect(`/courses/${course.id}`);
    }

    // --------------------------------------------------------
    // VERIFY RAZORPAY IDENTIFIERS
    // --------------------------------------------------------

    if (
      !successfulPayment.razorpayOrderId ||
      !successfulPayment.razorpayPaymentId
    ) {
      console.error(
        "LESSON PAGE RAZORPAY IDENTIFIERS MISSING:",
        {
          userId: user.id,
          courseId: course.id,
          paymentId:
            successfulPayment.id,
        }
      );

      redirect(`/courses/${course.id}`);
    }

    // --------------------------------------------------------
    // VERIFY TRANSACTION ID
    //
    // Our successful verification/webhook flow stores
    // Razorpay payment ID as transactionId.
    // --------------------------------------------------------

    if (
      !successfulPayment.transactionId
    ) {
      console.error(
        "LESSON PAGE TRANSACTION ID MISSING:",
        {
          userId: user.id,
          courseId: course.id,
          paymentId:
            successfulPayment.id,
          razorpayPaymentId:
            successfulPayment.razorpayPaymentId,
        }
      );

      redirect(`/courses/${course.id}`);
    }

    // --------------------------------------------------------
    // FINAL PAYMENT ACCESS LOG
    // --------------------------------------------------------

    console.log(
      "LESSON PAGE PAYMENT VERIFIED:",
      {
        userId: user.id,
        courseId: course.id,
        lessonId: lesson.id,
        paymentId:
          successfulPayment.id,
        razorpayOrderId:
          successfulPayment.razorpayOrderId,
        razorpayPaymentId:
          successfulPayment.razorpayPaymentId,
        amount:
          successfulPayment.amount,
      }
    );
  }

  // ==========================================================
  // 8. ALL LESSON PROGRESS
  // ==========================================================

  const lessonProgress =
    await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        lesson: {
          courseId: course.id,
        },
      },
      select: {
        lessonId: true,
        completed: true,
        completedAt: true,
      },
    });

  const completedLessonIds =
    new Set<string>();

  lessonProgress.forEach((item) => {
    if (item.completed) {
      completedLessonIds.add(
        item.lessonId
      );
    }
  });

  // ==========================================================
  // 9. CURRENT LESSON COMPLETION
  // ==========================================================

  const currentLessonProgress =
    lessonProgress.find(
      (item) =>
        item.lessonId === lesson.id
    );

  const isCompleted =
    currentLessonProgress?.completed ??
    false;

  // ==========================================================
  // 10. COURSE PROGRESS
  // ==========================================================

  const totalLessons =
    course.lessons.length;

  const completedLessons =
    completedLessonIds.size;

  const calculatedProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessons /
            totalLessons) *
            100
        )
      : 0;

  const enrollmentProgress =
    Math.min(
      Math.max(
        enrollment.progress,
        0
      ),
      100
    );

  const courseProgress =
    Math.min(
      Math.max(
        Math.max(
          enrollmentProgress,
          calculatedProgress
        ),
        0
      ),
      100
    );

  const remainingLessons =
    Math.max(
      totalLessons -
        completedLessons,
      0
    );

  // ==========================================================
  // 11. CURRENT LESSON INDEX
  // ==========================================================

  const currentIndex =
    course.lessons.findIndex(
      (item) =>
        item.id === lesson.id
    );

  const previousLesson =
    currentIndex > 0
      ? course.lessons[
          currentIndex - 1
        ]
      : null;

  const nextLesson =
    currentIndex <
    totalLessons - 1
      ? course.lessons[
          currentIndex + 1
        ]
      : null;

  // ==========================================================
  // 12. COURSE COMPLETION
  // ==========================================================

  const courseCompleted =
    totalLessons > 0 &&
    completedLessons >=
      totalLessons;

  // ==========================================================
  // 13. LESSON POSITION
  // ==========================================================

  const lessonNumber =
    currentIndex >= 0
      ? currentIndex + 1
      : lesson.lessonOrder;

  // ==========================================================
  // 14. RENDER
  // ==========================================================

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* ====================================================
          TOP HEADER
      ==================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          <Link
            href={`/courses/${course.id}`}
            className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-blue-700"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />

            <span className="hidden sm:inline">
              Back to Course
            </span>

            <span className="sm:hidden">
              Course
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center md:flex">

            <div className="max-w-xl truncate text-center">

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-600">
                ICU Learning Portal
              </p>

              <p className="mt-0.5 truncate text-sm font-bold text-slate-800">
                {course.title}
              </p>

            </div>

          </div>

          <div className="flex shrink-0 items-center gap-2">

            <div className="hidden items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 sm:flex">
              <BookOpen size={16} />

              Lesson {lessonNumber} /{" "}
              {totalLessons}
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
              <CheckCircle2 size={16} />

              <span>
                {courseProgress}%
              </span>
            </div>

          </div>

        </div>

      </header>

      {/* ====================================================
          PAGE CONTENT
      ==================================================== */}

      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ==================================================
            MOBILE COURSE TITLE
        ================================================== */}

        <div className="mb-6 md:hidden">

          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
            ICU Learning Portal
          </p>

          <h1 className="mt-1 text-xl font-black text-slate-900">
            {course.title}
          </h1>

        </div>

        {/* ==================================================
            MAIN LEARNING GRID
        ================================================== */}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

          {/* =================================================
              MAIN LESSON COLUMN
          ================================================= */}

          <div className="min-w-0 space-y-6">

            {/* ===============================================
                LESSON HERO
            =============================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="relative overflow-hidden bg-slate-950 px-6 py-8 sm:px-8 lg:px-10">

                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

                <div className="relative">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-cyan-300 ring-1 ring-cyan-400/20">
                      <GraduationCap size={14} />
                      Learning Module
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200 ring-1 ring-white/10">
                      Lesson {lessonNumber}
                    </span>

                    {isCompleted && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-black text-emerald-300 ring-1 ring-emerald-400/20">
                        <CheckCircle2 size={14} />
                        Completed
                      </span>
                    )}

                  </div>

                  <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                    {lesson.title}
                  </h1>

                  <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
                    {lesson.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">

                    <div className="inline-flex items-center gap-2">
                      <Clock3
                        size={17}
                        className="text-cyan-300"
                      />

                      <span>
                        {lesson.duration} minutes
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                      <BookOpen
                        size={17}
                        className="text-cyan-300"
                      />

                      <span>
                        {completedLessons} of{" "}
                        {totalLessons} completed
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                      <ShieldCheck
                        size={17}
                        className="text-emerald-300"
                      />

                      <span>
                        {isFreeCourse
                          ? "Free Course Access"
                          : "Paid Course Access"}
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* =============================================
                  VIDEO PLAYER
              ============================================= */}

              <div className="p-4 sm:p-6 lg:p-8">

                <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-slate-200">

                  {lesson.videoUrl ? (
                    <video
                      controls
                      preload="metadata"
                      playsInline
                      className="h-full w-full bg-black object-contain"
                      src={lesson.videoUrl}
                    >
                      Your browser does not support HTML
                      video.
                    </video>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 text-center text-white">

                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">

                        <PlayCircle size={42} />

                      </div>

                      <h2 className="mt-6 text-2xl font-black">
                        Video Coming Soon
                      </h2>

                      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                        The video for this lesson has not
                        been uploaded yet. You can still
                        review the lesson information and
                        available notes.
                      </p>

                    </div>
                  )}

                </div>

              </div>

            </section>

            {/* ===============================================
                LESSON INFORMATION
            =============================================== */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Stethoscope size={24} />
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                    Lesson Overview
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    {lesson.title}
                  </h2>

                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5 sm:p-6">

                <p className="whitespace-pre-line text-base leading-8 text-slate-600">
                  {lesson.description}
                </p>

              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">

                <LearningInfo
                  icon={<Clock3 size={18} />}
                  label="Duration"
                  value={`${lesson.duration} Minutes`}
                />

                <LearningInfo
                  icon={<BookOpen size={18} />}
                  label="Lesson"
                  value={`${lessonNumber} of ${totalLessons}`}
                />

                <LearningInfo
                  icon={<CheckCircle2 size={18} />}
                  label="Status"
                  value={
                    isCompleted
                      ? "Completed"
                      : "In Progress"
                  }
                />

              </div>

            </section>

            {/* ===============================================
                LESSON RESOURCES
            =============================================== */}

            {lesson.notesUrl && (
              <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50 shadow-sm">

                <div className="p-6 sm:p-8">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-start gap-4">

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                        <FileText size={27} />
                      </div>

                      <div>

                        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-600">
                          Study Resource
                        </p>

                        <h2 className="mt-1 text-xl font-black text-emerald-950">
                          Lesson Notes
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-emerald-800/80">
                          Download the lesson notes and
                          revise this topic offline.
                        </p>

                      </div>

                    </div>

                    <a
                      href={lesson.notesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      <Download size={18} />
                      Download Notes
                    </a>

                  </div>

                </div>

              </section>
            )}

            {/* ===============================================
                COMPLETION + NAVIGATION
            =============================================== */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col gap-5">

                <div>

                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                    Lesson Completion
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    Continue Your Learning Journey
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Complete this lesson to update your
                    course progress and unlock the next
                    step in your learning journey.
                  </p>

                </div>

                <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  {/* Previous Lesson */}

                  <div className="order-2 sm:order-1">

                    {previousLesson ? (
                      <Link
                        href={`/courses/${course.id}/lesson/${previousLesson.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:w-auto"
                      >
                        <ArrowLeft size={17} />
                        Previous
                      </Link>
                    ) : (
                      <span className="hidden sm:block" />
                    )}

                  </div>

                  {/* Complete Lesson */}

                  <div className="order-1 sm:order-2">

                    <CompleteLessonButton
                      lessonId={lesson.id}
                      isCompleted={isCompleted}
                      nextLessonUrl={
                        nextLesson
                          ? `/courses/${course.id}/lesson/${nextLesson.id}`
                          : null
                      }
                    />

                  </div>

                  {/* Next Lesson */}

                  <div className="order-3">

                    {nextLesson ? (
                      <Link
                        href={`/courses/${course.id}/lesson/${nextLesson.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/15 transition hover:bg-blue-800 sm:w-auto"
                      >
                        Next
                        <ArrowRight size={17} />
                      </Link>
                    ) : (
                      <Link
                        href={`/courses/${course.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-700 sm:w-auto"
                      >
                        Course Complete
                        <Award size={17} />
                      </Link>
                    )}

                  </div>

                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="min-w-0 space-y-6">

            {/* ===============================================
                COURSE PROGRESS CARD
            =============================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 p-6 text-white">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Trophy size={22} />
                  </div>

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-100">
                      Your Progress
                    </p>

                    <h2 className="text-xl font-black">
                      Learning Journey
                    </h2>

                  </div>

                </div>

                <div className="mt-6 flex items-end justify-between gap-4">

                  <div>

                    <p className="text-4xl font-black">
                      {courseProgress}%
                    </p>

                    <p className="mt-1 text-sm text-blue-100">
                      Course progress
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-lg font-black">
                      {completedLessons}
                    </p>

                    <p className="text-xs text-blue-100">
                      completed
                    </p>

                  </div>

                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">

                  <div
                    className="h-full rounded-full bg-white transition-all duration-700"
                    style={{
                      width: `${courseProgress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="grid grid-cols-2 gap-px bg-slate-200">

                <ProgressBox
                  value={String(
                    completedLessons
                  )}
                  label="Completed"
                />

                <ProgressBox
                  value={String(
                    remainingLessons
                  )}
                  label="Remaining"
                />

              </div>

            </section>

            {/* ===============================================
                COURSE CURRICULUM
            =============================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6">

                <div className="flex items-center justify-between gap-3">

                  <div>

                    <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                      Curriculum
                    </p>

                    <h2 className="mt-1 text-xl font-black text-slate-900">
                      Course Lessons
                    </h2>

                  </div>

                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
                    {totalLessons}
                  </div>

                </div>

              </div>

              <div className="max-h-[600px] overflow-y-auto p-3">

                {course.lessons.map(
                  (
                    courseLesson,
                    index
                  ) => {
                    const completed =
                      completedLessonIds.has(
                        courseLesson.id
                      );

                    const current =
                      courseLesson.id ===
                      lesson.id;

                    return (
                      <LessonSidebarItem
                        key={
                          courseLesson.id
                        }
                        courseId={
                          course.id
                        }
                        lessonId={
                          courseLesson.id
                        }
                        index={index}
                        title={
                          courseLesson.title
                        }
                        duration={
                          courseLesson.duration
                        }
                        completed={
                          completed
                        }
                        current={
                          current
                        }
                      />
                    );
                  }
                )}

              </div>

            </section>

          </aside>

        </div>

        {/* ==================================================
            BOTTOM COURSE INFORMATION
        ================================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="grid gap-6 lg:grid-cols-3">

            <LearningSummary
              icon={<HeartPulse size={23} />}
              title="Professional Learning"
              description="Study structured ICU content designed for focused clinical learning."
            />

            <LearningSummary
              icon={<ShieldCheck size={23} />}
              title="Progress Tracking"
              description="Your completed lessons are automatically recorded in your course progress."
            />

            <LearningSummary
              icon={<Award size={23} />}
              title="Certificate"
              description="Complete the full curriculum to become eligible for your course certificate."
            />

          </div>

        </section>

      </div>

    </main>
  );
}

// ==========================================================
// LEARNING INFO
// ==========================================================

function LearningInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-black text-slate-800">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

// ==========================================================
// PROGRESS BOX
// ==========================================================

function ProgressBox({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white p-4">

      <p className="text-2xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

    </div>
  );
}

// ==========================================================
// LESSON SIDEBAR ITEM
// ==========================================================

function LessonSidebarItem({
  courseId,
  lessonId,
  index,
  title,
  duration,
  completed,
  current,
}: {
  courseId: string;
  lessonId: string;
  index: number;
  title: string;
  duration: number;
  completed: boolean;
  current: boolean;
}) {
  return (
    <Link
      href={`/courses/${courseId}/lesson/${lessonId}`}
      className={`group mb-2 block rounded-2xl border p-4 transition ${
        current
          ? "border-blue-200 bg-blue-50 shadow-sm"
          : completed
            ? "border-emerald-100 bg-emerald-50/50 hover:border-emerald-200 hover:bg-emerald-50"
            : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50"
      }`}
    >

      <div className="flex items-start gap-3">

        {/* Lesson status */}

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
            current
              ? "bg-blue-700 text-white"
              : completed
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-600"
          }`}
        >

          {completed ? (
            <CheckCircle2 size={18} />
          ) : (
            String(index + 1).padStart(
              2,
              "0"
            )
          )}

        </div>

        {/* Lesson information */}

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">

            <h3
              className={`line-clamp-2 text-sm font-bold leading-5 ${
                current
                  ? "text-blue-800"
                  : completed
                    ? "text-emerald-800"
                    : "text-slate-800"
              }`}
            >
              {title}
            </h3>

            {current && (
              <span className="shrink-0 rounded-full bg-blue-600 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white">
                Now
              </span>
            )}

          </div>

          <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-400">

            <Clock3 size={13} />

            {duration} min

            {completed && (
              <>
                <span>•</span>

                <span className="text-emerald-600">
                  Completed
                </span>
              </>
            )}

          </div>

        </div>

      </div>

    </Link>
  );
}

// ==========================================================
// LEARNING SUMMARY
// ==========================================================

function LearningSummary({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
        {icon}
      </div>

      <div>

        <h3 className="font-black text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}