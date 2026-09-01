import prisma from "@/lib/prisma";
import { getCourseByIdOrSlug } from "@/lib/course";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";

import BuyNowButton from "@/components/course/BuyNowButton";
import FreeEnrollButton from "@/components/course/FreeEnrollButton";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Crown,
  FileText,
  Globe2,
  GraduationCap,
  HeartPulse,
  Lock,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Target,
  Users,
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

  // ==========================================================
  // 1. COURSE + LESSONS
  // ==========================================================

  const course = await getCourseByIdOrSlug(id);

  if (!course) {
    notFound();
  }

  // ==========================================================
  // 2. AUTHENTICATION
  // ==========================================================

  const session = await auth();

  let enrolled = false;

  let enrollmentProgress = 0;

  let customerName = "";
  let customerEmail = "";

  let nextLessonId: string | null = null;

  const completedLessonIds = new Set<string>();

  // ==========================================================
  // 3. COURSE TYPE
  // ==========================================================

  const isFreeCourse =
    !course.isPremium &&
    Number.isFinite(course.price) &&
    course.price <= 0;

  const hasPrice =
    Number.isFinite(course.price) &&
    course.price > 0;

  // ==========================================================
  // 4. CURRENT USER
  // ==========================================================

  let userId: string | null = null;

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
      userId = user.id;

      if (!customerName) {
        customerName = user.fullName;
      }

      // ========================================================
      // 5. ENROLLMENT
      // ========================================================

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
            progress: true,
            completed: true,
            enrolledAt: true,
          },
        });

      if (enrollment) {
        enrolled = true;

        enrollmentProgress = Math.min(
          Math.max(enrollment.progress, 0),
          100
        );

        // ======================================================
        // 6. LESSON PROGRESS
        // ======================================================

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

  // ==========================================================
  // 7. PAYMENT ACCESS CONTROL
  //
  // IMPORTANT:
  //
  // Paid/Premium Course:
  // Enrollment alone is NOT enough.
  //
  // Required:
  //   Enrollment
  //   +
  //   SUCCESS Payment
  //
  // Free Course:
  //   Enrollment is sufficient.
  // ==========================================================

  let hasSuccessfulPayment = false;

  let successfulPaymentId: string | null = null;

  if (
    userId &&
    !isFreeCourse
  ) {
    const successfulPayment =
      await prisma.payment.findFirst({
        where: {
          userId,
          courseId: course.id,
          status: "SUCCESS",
        },
        select: {
          id: true,
          amount: true,
          status: true,
          transactionId: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (successfulPayment) {
      // ======================================================
      // 8. PAYMENT AMOUNT VERIFICATION
      // ======================================================

      const paymentAmountInPaise =
        Math.round(
          successfulPayment.amount * 100
        );

      const courseAmountInPaise =
        Math.round(course.price * 100);

      const amountMatches =
        Number.isSafeInteger(
          paymentAmountInPaise
        ) &&
        Number.isSafeInteger(
          courseAmountInPaise
        ) &&
        paymentAmountInPaise ===
          courseAmountInPaise;

      // ======================================================
      // 9. TRANSACTION VERIFICATION
      // ======================================================

      const transactionExists =
        Boolean(
          successfulPayment.razorpayPaymentId ||
            successfulPayment.transactionId
        );

      if (
        amountMatches &&
        transactionExists
      ) {
        hasSuccessfulPayment = true;

        successfulPaymentId =
          successfulPayment.id;

        console.log(
          "COURSE PAGE PAYMENT VERIFIED:",
          {
            userId,
            courseId: course.id,
            paymentId:
              successfulPayment.id,
            amount:
              successfulPayment.amount,
            razorpayPaymentId:
              successfulPayment.razorpayPaymentId,
            transactionId:
              successfulPayment.transactionId,
          }
        );
      } else {
        console.error(
          "COURSE PAGE PAYMENT VERIFICATION FAILED:",
          {
            userId,
            courseId: course.id,
            paymentId:
              successfulPayment.id,
            paymentAmount:
              successfulPayment.amount,
            coursePrice:
              course.price,
            amountMatches,
            transactionExists,
          }
        );
      }
    }
  }

    // ==========================================================
  // 10. FINAL ACCESS DECISION
  //
  // FREE:
  // enrollment required
  //
  // PAID:
  // enrollment + successful payment required
  // ==========================================================

  const hasCourseAccess =
    isFreeCourse
      ? enrolled
      : enrolled && hasSuccessfulPayment;

  // ==========================================================
  // 11. PAYMENT DEBUG LOG
  // ==========================================================

  if (userId && !isFreeCourse) {
    console.log(
      "COURSE ACCESS CHECK:",
      {
        userId,
        courseId: course.id,
        enrolled,
        hasSuccessfulPayment,
        hasCourseAccess,
        successfulPaymentId,
        coursePrice: course.price,
      }
    );
  }

  // ==========================================================
  // 12. COURSE PROGRESS
  // ==========================================================

  const totalLessons =
    course.lessons.length;

  const completedLessonCount =
    completedLessonIds.size;

  const calculatedProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessonCount /
            totalLessons) *
            100
        )
      : 0;

  const progress =
    enrolled
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

  const remainingLessons =
    Math.max(
      totalLessons -
        completedLessonCount,
      0
    );

  // ==========================================================
  // 13. STUDENT COUNT
  // ==========================================================

  const studentCount =
    course.enrollments.length;

  // ==========================================================
  // 14. COURSE COMPLETION
  // ==========================================================

  const isCompleted =
    hasCourseAccess &&
    totalLessons > 0 &&
    completedLessonCount >=
      totalLessons;

  // ==========================================================
  // 15. PRICE
  // ==========================================================

  const formattedPrice =
    hasPrice
      ? `₹${course.price.toLocaleString(
          "en-IN"
        )}`
      : "FREE";

  // ==========================================================
  // 16. RENDER
  // ==========================================================

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-blue-700"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to Courses
          </Link>

          <div className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 sm:flex">
            <HeartPulse
              size={16}
              className="text-cyan-600"
            />

            ICU Learning Portal
          </div>
        </div>
      </div>

      {/* =====================================================
          PREMIUM HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          {course.image ? (
            <img
              src={course.image}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-25"
            />
          ) : null}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(8,145,178,0.25),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(37,99,235,0.25),transparent_35%)]" />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/75" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                {course.isPremium ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-amber-950 shadow-lg">
                    <Crown size={15} />
                    Premium Course
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-950 shadow-lg">
                    <BadgeCheck size={15} />
                    Free Course
                  </span>
                )}

                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
                  {course.level}
                </span>

                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
                  {course.language}
                </span>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/30 sm:flex">
                  <Stethoscope size={28} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                    Professional Critical Care Education
                  </p>

                  <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {course.title}
                  </h1>
                </div>
              </div>

              <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <GraduationCap
                    size={18}
                    className="text-cyan-300"
                  />

                  <span>
                    Instructor{" "}
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

                  <strong className="text-white">
                    {course.rating.toFixed(1)}
                  </strong>

                  <span>course rating</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users
                    size={18}
                    className="text-cyan-300"
                  />

                  <span>
                    {studentCount.toLocaleString(
                      "en-IN"
                    )}{" "}
                    learners
                  </span>
                </div>
              </div>

              <div className="mt-9 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                <HeroMetric
                  icon={<Video size={17} />}
                  value={`${totalLessons}`}
                  label="Lessons"
                />

                <HeroMetric
                  icon={<Clock3 size={17} />}
                  value={formatDuration(
                    course.duration
                  )}
                  label="Duration"
                />

                <HeroMetric
                  icon={<FileText size={17} />}
                  value="Notes"
                  label="Resources"
                />

                <HeroMetric
                  icon={<Award size={17} />}
                  value="Yes"
                  label="Certificate"
                />
              </div>
            </div>

            {/* =================================================
                HERO PURCHASE CARD
            ================================================= */}

            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-black/30">
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800">
                      <GraduationCap
                        size={70}
                        className="text-white/80"
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                      <HeartPulse
                        size={14}
                        className="text-cyan-300"
                      />
                      ICU Learning
                    </span>

                    {course.isPremium && (
                      <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black text-amber-950">
                        PREMIUM
                      </span>
                    )}
                  </div>
                </div>

                                <div className="p-6 sm:p-7">
                  {hasCourseAccess ? (
                    <div>
                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
                              Your Course Progress
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
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-emerald-700">
                          {completedLessonCount} of{" "}
                          {totalLessons} lessons completed
                        </p>
                      </div>

                      {isCompleted ? (
                        <Link
                          href="/dashboard/certificates"
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 font-black text-white shadow-lg transition hover:from-emerald-700 hover:to-teal-700"
                        >
                          <Award size={20} />
                          View Your Certificate
                          <ArrowRight size={18} />
                        </Link>
                      ) : nextLessonId ? (
                        <Link
                          href={`/courses/${course.id}/lesson/${nextLessonId}`}
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:from-cyan-700 hover:to-blue-800"
                        >
                          <PlayCircle size={20} />
                          Continue Learning
                          <ArrowRight size={18} />
                        </Link>
                      ) : null}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                            Course Investment
                          </p>

                          <p className="mt-1 text-4xl font-black text-slate-950">
                            {formattedPrice}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-blue-50 px-4 py-3 text-center">
                          <p className="text-xl font-black text-blue-700">
                            {totalLessons}
                          </p>

                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Lessons
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <AccessFeature text="Full course access" />
                        <AccessFeature text="Structured video lessons" />
                        <AccessFeature text="Study notes & resources" />
                        <AccessFeature text="Learning progress tracking" />
                        <AccessFeature text="Completion certificate" />
                      </div>

                      {/* =================================================
                          IMPORTANT:
                          If enrollment exists but payment does not,
                          PurchaseState is shown.
                      ================================================= */}

                      <div className="mt-6">
                        <PurchaseState
                          course={course}
                          isFreeCourse={isFreeCourse}
                          hasPrice={hasPrice}
                          session={session}
                          customerName={customerName}
                          customerEmail={customerEmail}
                          enrolled={enrolled}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COURSE STATISTICS
      ===================================================== */}

      <section className="relative -mt-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-5">
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
                  className="fill-amber-500 text-amber-500"
                />
              }
              label="Rating"
              value={`${course.rating.toFixed(1)} / 5`}
              className="border-b border-slate-200 lg:border-b-0 lg:border-r"
            />

            <CourseStat
              icon={<Globe2 size={20} />}
              label="Language"
              value={course.language}
              className=""
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            {/* COURSE OVERVIEW */}

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading
                eyebrow="Course Overview"
                title="Master Critical Care Step by Step"
                icon={<GraduationCap size={23} />}
              />

              <div className="mt-7 rounded-2xl bg-slate-50 p-6">
                <p className="whitespace-pre-line text-base leading-8 text-slate-600">
                  {course.description}
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <OutcomeItem
                  icon={<Target size={17} />}
                  title="Clinical Foundation"
                  text="Build strong fundamentals for ICU practice."
                />

                <OutcomeItem
                  icon={<Stethoscope size={17} />}
                  title="Practical Knowledge"
                  text="Understand concepts used in real clinical settings."
                />

                <OutcomeItem
                  icon={<PlayCircle size={17} />}
                  title="Structured Lessons"
                  text="Learn through organized lesson-by-lesson content."
                />

                <OutcomeItem
                  icon={<Award size={17} />}
                  title="Completion Certificate"
                  text="Earn your certificate after completing the course."
                />
              </div>
            </section>

            {/* WHAT YOU WILL LEARN */}

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading
                eyebrow="Learning Outcomes"
                title="What You Will Learn"
                icon={<Target size={23} />}
              />

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "ICU assessment and monitoring",
                  "Critical care nursing principles",
                  "Mechanical ventilation concepts",
                  "ECG and rhythm interpretation",
                  "ABG analysis and acid-base concepts",
                  "Emergency and critical care management",
                  "Clinical decision-making fundamentals",
                  "Professional ICU workflow",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50/50"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check
                        size={15}
                        strokeWidth={3}
                      />
                    </div>

                    <span className="text-sm font-bold leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* INSTRUCTOR */}

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading
                eyebrow="Course Instructor"
                title="Learn From Your Instructor"
                icon={<Stethoscope size={23} />}
              />

              <div className="mt-7 overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 text-3xl font-black text-white shadow-xl ring-8 ring-white">
                    {course.instructor
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-black text-slate-900">
                        {course.instructor}
                      </h3>

                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-black uppercase text-blue-700">
                        <BadgeCheck size={12} />
                        Instructor
                      </span>
                    </div>

                    <p className="mt-1 font-bold text-cyan-700">
                      ICU Learning Portal
                    </p>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Learn through a structured curriculum
                      created for healthcare professionals,
                      ICU nursing students and clinical
                      learners who want stronger critical
                      care knowledge.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CURRICULUM */}

                        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  eyebrow="Course Curriculum"
                  title="Your Learning Path"
                  icon={<BookOpen size={23} />}
                />

                <div className="w-fit rounded-2xl bg-blue-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Curriculum
                  </p>

                  <p className="mt-0.5 text-lg font-black text-blue-700">
                    {totalLessons} Lessons
                  </p>
                </div>
              </div>

              {totalLessons === 0 ? (
                <EmptyLessons />
              ) : (
                <div className="relative mt-8">
                  <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-slate-200 sm:block" />

                  <div className="space-y-4">
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
                            hasAccess={
                              hasCourseAccess
                            }
                            courseId={course.id}
                          />
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* PREMIUM EXPERIENCE */}

            <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl sm:p-9">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-300">
                  <Sparkles size={15} />
                  Premium Learning Experience
                </div>

                <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                  More than a course.
                  <span className="block text-cyan-400">
                    Build your ICU confidence.
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                  Study structured lessons, revise with notes,
                  track your progress and work toward your
                  course completion certificate from one
                  professional learning platform.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <DarkBenefit text="Structured video lessons" />
                  <DarkBenefit text="Downloadable study resources" />
                  <DarkBenefit text="Lesson progress tracking" />
                  <DarkBenefit text="Course completion certificate" />
                </div>
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {/* ACCESS CARD */}

            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
              <div className="bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 p-6 text-white sm:p-7">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
                  <HeartPulse size={16} />
                  Course Access
                </div>

                <h2 className="mt-3 text-2xl font-black">
                  {hasCourseAccess
                    ? "Your Learning Dashboard"
                    : "Start Learning Today"}
                </h2>

                {!hasCourseAccess && (
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                      Course Price
                    </p>

                    <p className="mt-1 text-4xl font-black">
                      {formattedPrice}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-7">
                {hasCourseAccess ? (
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
                    enrolled={enrolled}
                  />
                )}
              </div>
            </section>

            {/* COURSE INFORMATION */}

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                    Course Information
                  </p>

                  <h3 className="mt-1 text-lg font-black text-slate-900">
                    What You Get
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <InfoRow
                  icon={<BookOpen size={16} />}
                  label="Lessons"
                  value={`${totalLessons}`}
                />

                <InfoRow
                  icon={<Clock3 size={16} />}
                  label="Duration"
                  value={formatDuration(
                    course.duration
                  )}
                />

                <InfoRow
                  icon={<Globe2 size={16} />}
                  label="Language"
                  value={course.language}
                />

                <InfoRow
                  icon={<GraduationCap size={16} />}
                  label="Level"
                  value={course.level}
                />

                <InfoRow
                  icon={<Award size={16} />}
                  label="Certificate"
                  value="Included"
                />
              </div>
            </section>

            {/* CERTIFICATE */}

            <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white shadow-xl sm:p-7">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20">
                <Award size={25} />
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-amber-400">
                Achievement
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Earn Your Certificate
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Complete all lessons in this course to
                become eligible for your ICU Learning
                Portal completion certificate.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-400">
                <CheckCircle2 size={17} />
                Certificate after completion
              </div>
            </section>
          </aside>
        </div>

        {/* =================================================
            FULL WIDTH LEARNING PROGRESS
        ================================================= */}

        {hasCourseAccess && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600">
                    Your Learning Journey
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                    {course.title}
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Continue your lessons, complete the
                    curriculum and unlock your course
                    completion certificate.
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 px-7 py-5 text-center">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Overall Progress
                  </p>

                  <p className="mt-1 text-4xl font-black text-blue-700">
                    {progress}%
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>
                    {completedLessonCount} lessons completed
                  </span>

                  <span>
                    {remainingLessons} remaining
                  </span>
                </div>

                <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
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

// ==========================================================
// HERO METRIC
// ==========================================================

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
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur">
      <div className="flex items-center gap-2 text-cyan-300">
        {icon}

        <span className="text-sm font-black text-white">
          {value}
        </span>
      </div>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}

// ==========================================================
// SECTION HEADING
// ==========================================================

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

        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
          {title}
        </h2>
      </div>
    </div>
  );
}

// ==========================================================
// COURSE STAT
// ==========================================================

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
    <div className={`p-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
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

// ==========================================================
// OUTCOME ITEM
// ==========================================================

function OutcomeItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          {icon}
        </div>

        <div>
          <h3 className="font-black text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================================
// ACCESS FEATURE
// ==========================================================

function AccessFeature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <Check
          size={14}
          strokeWidth={3}
        />
      </div>

      <span className="text-sm font-bold text-slate-700">
        {text}
      </span>
    </div>
  );
}

// ==========================================================
// DARK BENEFIT
// ==========================================================

function DarkBenefit({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <CheckCircle2
        size={18}
        className="shrink-0 text-emerald-400"
      />

      <span className="text-sm font-bold text-slate-300">
        {text}
      </span>
    </div>
  );
}

// ==========================================================
// INFO ROW
// ==========================================================

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <div className="flex items-center gap-2.5 text-slate-500">
        <span className="text-blue-600">
          {icon}
        </span>

        <span className="text-sm font-semibold">
          {label}
        </span>
      </div>

      <span className="max-w-[160px] truncate text-right text-sm font-black text-slate-800">
        {value}
      </span>
    </div>
  );
}

// ==========================================================
// EMPTY LESSONS
// ==========================================================

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
        Lessons for this course have not been added
        yet. Please check back soon.
      </p>
    </div>
  );
}

// ==========================================================
// LESSON CARD
// ==========================================================

function LessonCard({
  index,
  lesson,
  completed,
  hasAccess,
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
  hasAccess: boolean;
  courseId: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border p-5 transition-all duration-200 ${
        completed
          ? "border-emerald-200 bg-emerald-50/60"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
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

        <div className="shrink-0">
          {hasAccess ? (
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

// ==========================================================
// ENROLLED STATE
// ==========================================================

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
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm font-semibold text-emerald-700">
          {completedLessonCount} of{" "}
          {totalLessons} lessons completed
        </p>
      </div>

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
            Congratulations! You completed this course.
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

// ==========================================================
// PURCHASE STATE
// ==========================================================

function PurchaseState({
  course,
  isFreeCourse,
  hasPrice,
  session,
  customerName,
  customerEmail,
  enrolled,
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
  enrolled: boolean;
}) {
  return (
    <div>
      {/* ====================================================
          PAYMENT STATUS
      ==================================================== */}

      {enrolled &&
        !isFreeCourse && (
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Lock size={17} />
              </div>

              <div>
                <p className="text-sm font-black text-amber-900">
                  Payment Required
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-800">
                  Your course enrollment exists, but payment
                  has not been verified yet. Complete the payment
                  below to unlock all lessons.
                </p>
              </div>
            </div>
          </div>
        )}

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
            This course is not currently available for
            enrollment.
          </p>
        </div>
      )}
    </div>
  );
}

// ==========================================================
// PROGRESS METRIC
// ==========================================================

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

      <p className="mt-1 text-xs font-black uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}

// ==========================================================
// DURATION FORMATTER
// ==========================================================

function formatDuration(minutes: number) {
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
    return `${minutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${remainingMinutes}m`;
}