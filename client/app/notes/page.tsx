import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Crown,
  Download,
  FileText,
  GraduationCap,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Video,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type LessonItem = {
  id: string;
  title: string;
  description: string;
  duration: number;
  lessonOrder: number;
  notesUrl: string | null;
  videoUrl: string | null;
};

type CourseItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  isPremium: boolean;
  level: string;
  language: string;
  instructor: string;
  lessons: LessonItem[];
};

function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "Self-paced";
  }

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  if (remaining === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${remaining}m`;
}

function formatPrice(price: number) {
  if (!Number.isFinite(price) || price <= 0) {
    return "Free";
  }

  return `₹${price.toLocaleString("en-IN")}`;
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "IL"
  );
}

export default async function NotesPage() {
  // ==========================================================
  // 1. AUTHENTICATION
  // ==========================================================

  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/notes");
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
      role: true,
      isPremium: true,

      enrollments: {
        orderBy: {
          enrolledAt: "desc",
        },

        select: {
          id: true,
          courseId: true,
          enrolledAt: true,

          course: {
            select: {
              id: true,
              title: true,
              description: true,
              price: true,
              isPremium: true,
              level: true,
              language: true,
              instructor: true,

              lessons: {
                orderBy: {
                  lessonOrder: "asc",
                },

                select: {
                  id: true,
                  title: true,
                  description: true,
                  duration: true,
                  lessonOrder: true,
                  notesUrl: true,
                  videoUrl: true,
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
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  // ==========================================================
  // 3. SUCCESSFUL PAYMENTS
  //
  // Dashboard/UI access is not enough for protected notes.
  // The actual notes API also verifies access server-side.
  // Here we only calculate the UI state.
  // ==========================================================

  const successfulPayments =
    await prisma.payment.findMany({
      where: {
        userId: user.id,
        status: "SUCCESS",
      },

      select: {
        courseId: true,
        amount: true,
        transactionId: true,
        razorpayPaymentId: true,
        razorpayOrderId: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  // ==========================================================
  // 4. BUILD VERIFIED PAYMENT COURSE SET
  // ==========================================================

  const paidCourseIds = new Set<string>();

  for (const payment of successfulPayments) {
    if (!payment.courseId) {
      continue;
    }

    const hasIdentifier =
      Boolean(
        payment.razorpayPaymentId?.trim()
      ) ||
      Boolean(
        payment.transactionId?.trim()
      );

    if (hasIdentifier) {
      paidCourseIds.add(payment.courseId);
    }
  }

  // ==========================================================
  // 5. ENROLLED COURSES
  // ==========================================================

  const enrolledCourses: CourseItem[] =
    user.enrollments.map(
      (enrollment) =>
        enrollment.course
    );

  const completedLessonIds = new Set(
    user.lessonProgress.map(
      (progress) =>
        progress.lessonId
    )
  );

  // ==========================================================
  // 6. COURSE RESOURCE COUNTS
  // ==========================================================

  let totalLessons = 0;
  let totalNotes = 0;
  let totalVideos = 0;

  for (const course of enrolledCourses) {
    totalLessons += course.lessons.length;

    for (const lesson of course.lessons) {
      if (lesson.notesUrl) {
        totalNotes += 1;
      }

      if (lesson.videoUrl) {
        totalVideos += 1;
      }
    }
  }

  const completedLessons =
    user.lessonProgress.length;

  const notesCoverage =
    totalLessons > 0
      ? Math.round(
          (totalNotes / totalLessons) *
            100
        )
      : 0;

  // ==========================================================
  // 7. DISPLAY DATA
  // ==========================================================

  const firstName =
    user.fullName
      .trim()
      .split(/\s+/)[0] ||
    "Learner";

  const initials = getInitials(
    user.fullName
  );

  const isAdmin =
    user.role === "ADMIN";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-700 text-white shadow-lg">
              <GraduationCap
                size={21}
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-black text-slate-950">
                ICU Learning Portal
              </p>

              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-600">
                Student Notes Center
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-black text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">
                Dashboard
              </span>
            </Link>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-xs font-black text-white transition hover:bg-blue-800"
            >
              <BookOpen size={15} />
              <span className="hidden sm:inline">
                Courses
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ======================================================
          PAGE
      ====================================================== */}

      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* ====================================================
            HERO
        ==================================================== */}

        <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 text-white shadow-2xl">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:p-10">
            {/* LEFT */}

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200">
                  <FileText
                    size={13}
                  />
                  Student Notes Center
                </span>

                {user.isPremium && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-200">
                    <Crown size={13} />
                    Premium Member
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-lg font-black text-white ring-1 ring-white/10">
                  {initials}
                </div>

                <div>
                  <p className="text-sm font-bold text-cyan-100">
                    Welcome back,{" "}
                    {firstName}
                  </p>

                  <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                    Your Learning Notes
                  </h1>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Access lesson notes connected to
                your enrolled ICU learning programs.
                Premium resources remain protected
                behind verified course access.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#my-notes"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
                >
                  <FileText
                    size={17}
                  />
                  Open My Notes
                </Link>

                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >
                  Explore Courses
                  <ArrowRight
                    size={17}
                  />
                </Link>
              </div>
            </div>

            {/* RIGHT STATS */}

            <div className="grid grid-cols-2 gap-3">
              <ResourceStat
                icon={
                  <BookOpen
                    size={19}
                  />
                }
                value={String(
                  enrolledCourses.length
                )}
                label="Enrolled Courses"
              />

              <ResourceStat
                icon={
                  <FileText
                    size={19}
                  />
                }
                value={String(
                  totalNotes
                )}
                label="Available Notes"
              />

              <ResourceStat
                icon={
                  <Video
                    size={19}
                  />
                }
                value={String(
                  totalVideos
                )}
                label="Video Lessons"
              />

              <ResourceStat
                icon={
                  <CheckCircle2
                    size={19}
                  />
                }
                value={`${notesCoverage}%`}
                label="Notes Coverage"
              />
            </div>
          </div>
        </section>

        {/* ====================================================
            RESOURCE TRUST BAR
        ==================================================== */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TrustCard
            icon={
              <ShieldCheck
                size={20}
              />
            }
            title="Protected Access"
            text="Notes are delivered through the authenticated LMS."
          />

          <TrustCard
            icon={
              <LockKeyhole
                size={20}
              />
            }
            title="Premium Security"
            text="Paid resources require verified course access."
          />

          <TrustCard
            icon={
              <Stethoscope
                size={20}
              />
            }
            title="ICU Focused"
            text="Resources are organized around your learning programs."
          />

          <TrustCard
            icon={
              <Sparkles
                size={20}
              />
            }
            title="Study Faster"
            text="Open notes directly from the lesson you are studying."
          />
        </section>

        {/* ====================================================
            NOTES SECTION
        ==================================================== */}

        <section
          id="my-notes"
          className="mt-10"
        >
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
                My Learning Resources
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Course Notes
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Select a course and open the lesson
                notes you are authorized to access.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-600 shadow-sm">
              <Search
                size={15}
              />
              {totalNotes} resources
            </div>
          </div>

          {enrolledCourses.length === 0 ? (
            <EmptyNotes />
          ) : (
            <div className="mt-7 space-y-6">
              {enrolledCourses.map(
                (course) => {
                  const isFreeCourse =
                    course.price === 0 &&
                    course.isPremium ===
                      false;

                  const hasPayment =
                    paidCourseIds.has(
                      course.id
                    );

                  const courseCompletedCount =
                    course.lessons.filter(
                      (lesson) =>
                        completedLessonIds.has(
                          lesson.id
                        )
                    ).length;

                  const courseProgress =
                    course.lessons.length >
                    0
                      ? Math.round(
                          (courseCompletedCount /
                            course.lessons
                              .length) *
                            100
                        )
                      : 0;

                  const accessible =
                    isAdmin ||
                    isFreeCourse ||
                    hasPayment;

                  const notesLessons =
                    course.lessons.filter(
                      (lesson) =>
                        Boolean(
                          lesson.notesUrl
                        )
                    );

                  return (
                    <article
                      key={course.id}
                      className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
                    >
                      {/* COURSE HEADER */}

                      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 to-blue-950 p-5 text-white sm:p-7">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-cyan-300">
                                {course.level}
                              </span>

                              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-300">
                                {course.language}
                              </span>

                              {isFreeCourse ? (
                                <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                                  Free Demo
                                </span>
                              ) : (
                                <span className="rounded-full bg-amber-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                                  Premium
                                </span>
                              )}
                            </div>

                            <h3 className="mt-4 text-xl font-black sm:text-2xl">
                              {course.title}
                            </h3>

                            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                              {course.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-slate-400">
                              <span>
                                Instructor:{" "}
                                <span className="text-slate-200">
                                  {
                                    course.instructor
                                  }
                                </span>
                              </span>

                              <span>
                                {course.lessons.length}{" "}
                                lessons
                              </span>

                              <span>
                                {notesLessons.length}{" "}
                                notes
                              </span>

                              <span>
                                {formatPrice(
                                  course.price
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="text-slate-300">
                                Course Progress
                              </span>

                              <span className="text-cyan-300">
                                {courseProgress}%
                              </span>
                            </div>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all"
                                style={{
                                  width: `${courseProgress}%`,
                                }}
                              />
                            </div>

                            <p className="mt-3 text-xs text-slate-400">
                              {courseCompletedCount} of{" "}
                              {
                                course.lessons
                                  .length
                              }{" "}
                              lessons completed
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* ACCESS MESSAGE */}

                      {!accessible && (
                        <div className="border-b border-amber-200 bg-amber-50 px-5 py-4 sm:px-7">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                                <LockKeyhole
                                  size={19}
                                />
                              </div>

                              <div>
                                <p className="text-sm font-black text-amber-950">
                                  Premium notes are locked
                                </p>

                                <p className="mt-1 text-xs leading-5 text-amber-800">
                                  Complete the course purchase to
                                  unlock protected study resources.
                                </p>
                              </div>
                            </div>

                            <Link
                              href={`/courses/${course.id}`}
                              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-amber-700"
                            >
                              View Course
                              <ArrowRight
                                size={15}
                              />
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* LESSON NOTES */}

                      <div className="p-5 sm:p-7">
                        {notesLessons.length ===
                        0 ? (
                          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center">
                            <FileText
                              size={30}
                              className="mx-auto text-slate-400"
                            />

                            <h4 className="mt-3 text-base font-black text-slate-800">
                              Notes not available yet
                            </h4>

                            <p className="mt-1 text-sm text-slate-500">
                              This course currently has no
                              lesson notes configured.
                            </p>
                          </div>
                        ) : (
                          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {notesLessons.map(
                              (lesson) => {
                                const completed =
                                  completedLessonIds.has(
                                    lesson.id
                                  );

                                const noteLocked =
                                  !accessible;

                                return (
                                  <div
                                    key={
                                      lesson.id
                                    }
                                    className={`group rounded-2xl border p-4 transition ${
                                      noteLocked
                                        ? "border-slate-200 bg-slate-50"
                                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
                                    }`}
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex min-w-0 items-start gap-3">
                                        <div
                                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                            noteLocked
                                              ? "bg-slate-200 text-slate-500"
                                              : "bg-cyan-50 text-cyan-700"
                                          }`}
                                        >
                                          {noteLocked ? (
                                            <LockKeyhole
                                              size={
                                                18
                                              }
                                            />
                                          ) : (
                                            <FileText
                                              size={
                                                18
                                              }
                                            />
                                          )}
                                        </div>

                                        <div className="min-w-0">
                                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                            Lesson{" "}
                                            {
                                              lesson.lessonOrder
                                            }
                                          </p>

                                          <h4 className="mt-1 line-clamp-2 text-sm font-black leading-5 text-slate-900">
                                            {
                                              lesson.title
                                            }
                                          </h4>
                                        </div>
                                      </div>

                                      {completed && (
                                        <CheckCircle2
                                          size={
                                            18
                                          }
                                          className="shrink-0 text-emerald-500"
                                        />
                                      )}
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-500">
                                      <span className="rounded-lg bg-slate-100 px-2 py-1">
                                        {formatDuration(
                                          lesson.duration
                                        )}
                                      </span>

                                      {lesson.videoUrl && (
                                        <span className="rounded-lg bg-blue-50 px-2 py-1 text-blue-700">
                                          Video
                                        </span>
                                      )}
                                    </div>

                                    <div className="mt-4">
                                      {noteLocked ? (
                                        <Link
                                          href={`/courses/${course.id}`}
                                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-black text-slate-600 transition hover:border-amber-300 hover:text-amber-700"
                                        >
                                          <LockKeyhole
                                            size={
                                              14
                                            }
                                          />
                                          Unlock Notes
                                        </Link>
                                      ) : (
                                        <a
                                          href={`/api/lesson-notes?lessonId=${encodeURIComponent(
                                            lesson.id
                                          )}`}
                                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-cyan-700"
                                        >
                                          <Download
                                            size={
                                              14
                                            }
                                          />
                                          Open Notes
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* ====================================================
            STUDY TIP
        ==================================================== */}

        <section className="mt-8 rounded-[26px] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Sparkles size={23} />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                Smart Study Workflow
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Study the lesson, review its notes,
                complete the lesson, and then move to
                the next lesson or assessment. Your
                progress is recorded in your LMS account.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
                <span className="rounded-xl bg-white px-3 py-2 text-slate-700 shadow-sm">
                  1. Learn
                </span>

                <span className="rounded-xl bg-white px-3 py-2 text-slate-700 shadow-sm">
                  2. Review Notes
                </span>

                <span className="rounded-xl bg-white px-3 py-2 text-slate-700 shadow-sm">
                  3. Complete Lesson
                </span>

                <span className="rounded-xl bg-white px-3 py-2 text-slate-700 shadow-sm">
                  4. Take Quiz
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// ============================================================
// RESOURCE STAT
// ============================================================

function ResourceStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
        {icon}
      </div>

      <p className="mt-4 text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>
    </div>
  );
}

// ============================================================
// TRUST CARD
// ============================================================

function TrustCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}

// ============================================================
// EMPTY NOTES
// ============================================================

function EmptyNotes() {
  return (
    <div className="mt-7 overflow-hidden rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm sm:p-14">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-600">
        <BookOpen size={36} />
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-950">
        No Enrolled Courses Yet
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Enroll in a free demo course or purchase a
        premium course to access your lesson notes
        from this learning center.
      </p>

      <Link
        href="/courses"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-800"
      >
        Browse Courses
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}