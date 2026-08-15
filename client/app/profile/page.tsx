import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Crown,
  GraduationCap,
  Hospital,
  Mail,
  Medal,
  Phone,
  ShieldCheck,
  Trophy,
  User,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      enrollments: {
        include: {
          course: true,
        },
        orderBy: {
          enrolledAt: "desc",
        },
      },

      lessonProgress: {
        include: {
          lesson: {
            include: {
              course: true,
            },
          },
        },
      },

      certificates: {
        include: {
          course: true,
        },
        orderBy: {
          issuedAt: "desc",
        },
      },

      quizAttempts: {
        include: {
          quiz: {
            include: {
              course: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  /*
   * ---------------------------------------------------------
   * Learning Statistics
   * ---------------------------------------------------------
   */

  const totalCourses = user.enrollments.length;

  const completedCourses = user.enrollments.filter(
    (enrollment) => enrollment.completed
  ).length;

  const completedLessons = user.lessonProgress.filter(
    (progress) => progress.completed
  ).length;

  const totalLessons = await prisma.lesson.count();

  const overallProgress =
    totalLessons === 0
      ? 0
      : Math.min(
          100,
          Math.round((completedLessons / totalLessons) * 100)
        );

  const quizAttempts = user.quizAttempts.length;

  const averageQuizScore =
    quizAttempts === 0
      ? 0
      : Math.round(
          user.quizAttempts.reduce(
            (sum, attempt) => sum + attempt.percentage,
            0
          ) / quizAttempts
        );

  const certificatesEarned = user.certificates.length;

  /*
   * ---------------------------------------------------------
   * Account Information
   * ---------------------------------------------------------
   */

  const membership = user.isPremium ? "Premium" : "Free";

  const accountStatus = user.isVerified
    ? "Verified Account"
    : "Account Verification Pending";

  const joinedDate = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(user.createdAt);

  /*
   * ---------------------------------------------------------
   * Recent Courses
   * ---------------------------------------------------------
   */

  const recentCourses = user.enrollments.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2"
            >
              <span className="text-2xl">🏥</span>

              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  ICU Learning
                </h1>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Professional Nursing Education
                </p>
              </div>
            </Link>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Dashboard
            <ChevronRight size={16} />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Student Account
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                My Profile
              </h1>

              <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
                Manage your personal information and track your ICU Learning
                journey.
              </p>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                user.isPremium
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300"
                  : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <Crown size={17} />

              {membership} Member
            </div>
          </div>
        </section>

        {/* Profile Hero */}
        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 px-6 py-8 text-white sm:px-8">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative flex flex-col items-center gap-6 md:flex-row">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-blue-700 shadow-2xl ring-4 ring-white/20">
                  <User size={50} />
                </div>

                <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-green-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                </span>
              </div>

              {/* Student Identity */}
              <div className="text-center md:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row md:items-start">
                  <h2 className="text-3xl font-bold">
                    {user.fullName}
                  </h2>

                  {user.isVerified && (
                    <BadgeCheck
                      size={24}
                      className="text-white"
                      aria-label="Verified account"
                    />
                  )}
                </div>

                <p className="mt-2 flex items-center justify-center gap-2 text-sm text-blue-100 md:justify-start">
                  <Mail size={16} />
                  <span className="break-all">{user.email}</span>
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                    <GraduationCap size={17} />
                    {user.qualification}
                  </span>

                  {user.isPremium && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-yellow-950 shadow-lg">
                      <Crown size={17} />
                      Premium Student
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-800 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            <SummaryItem
              icon={<BookOpen size={20} />}
              label="Enrolled Courses"
              value={String(totalCourses)}
            />

            <SummaryItem
              icon={<CheckCircle2 size={20} />}
              label="Completed Courses"
              value={String(completedCourses)}
            />

            <SummaryItem
              icon={<Award size={20} />}
              label="Certificates"
              value={String(certificatesEarned)}
            />

            <SummaryItem
              icon={<Trophy size={20} />}
              label="Quiz Average"
              value={`${averageQuizScore}%`}
            />
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Personal Information */}
          <section className="xl:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <User size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Personal Information
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Your registered student information
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 sm:p-8">
                <ProfileField
                  icon={<User size={18} />}
                  label="Full Name"
                  value={user.fullName}
                />

                <ProfileField
                  icon={<Mail size={18} />}
                  label="Email Address"
                  value={user.email}
                />

                <ProfileField
                  icon={<Phone size={18} />}
                  label="Mobile Number"
                  value={user.mobile}
                />

                <ProfileField
                  icon={<GraduationCap size={18} />}
                  label="Qualification"
                  value={user.qualification}
                />

                <ProfileField
                  icon={<Hospital size={18} />}
                  label="Hospital / Organization"
                  value={user.hospital}
                />

                <ProfileField
                  icon={<ShieldCheck size={18} />}
                  label="Account Status"
                  value={accountStatus}
                />
              </div>
            </div>
          </section>

          {/* Membership Card */}
          <section>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-900 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cyan-200">
                      Membership
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {membership}
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-yellow-950">
                    <Crown size={24} />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm text-slate-300">
                    Account created
                  </p>

                  <p className="mt-1 flex items-center gap-2 font-semibold">
                    <CalendarDays size={17} />
                    {joinedDate}
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <MembershipRow
                  label="Account"
                  value={user.isVerified ? "Verified" : "Pending"}
                  positive={user.isVerified}
                />

                <MembershipRow
                  label="Student Role"
                  value={user.role}
                  positive
                />

                <MembershipRow
                  label="Courses"
                  value={String(totalCourses)}
                  positive
                />

                <MembershipRow
                  label="Certificates"
                  value={String(certificatesEarned)}
                  positive
                />
              </div>
            </div>
          </section>
        </div>

        {/* Learning Overview */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                <Trophy size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Learning Overview
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Your current learning performance
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
            <LearningStat
              icon={<BookOpen size={21} />}
              label="Courses Enrolled"
              value={String(totalCourses)}
              description="Active learning programs"
            />

            <LearningStat
              icon={<CheckCircle2 size={21} />}
              label="Lessons Completed"
              value={String(completedLessons)}
              description="Completed lessons"
            />

            <LearningStat
              icon={<Medal size={21} />}
              label="Quiz Average"
              value={`${averageQuizScore}%`}
              description={`${quizAttempts} quiz attempt${
                quizAttempts === 1 ? "" : "s"
              }`}
            />

            <LearningStat
              icon={<Award size={21} />}
              label="Certificates"
              value={String(certificatesEarned)}
              description="Certificates earned"
            />
          </div>

          {/* Overall Progress */}
          <div className="border-t border-slate-200 p-6 dark:border-slate-800 sm:p-8">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Overall Learning Progress
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Based on completed lessons across the portal
                </p>
              </div>

              <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {overallProgress}%
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 transition-all duration-700"
                style={{
                  width: `${overallProgress}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* Recent Courses */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:px-8 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                My Recent Courses
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your latest enrolled learning programs
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 transition hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
            >
              View All Courses
              <ChevronRight size={17} />
            </Link>
          </div>

          <div className="p-6 sm:p-8">
            {recentCourses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/50">
                <BookOpen
                  size={36}
                  className="mx-auto text-slate-400"
                />

                <h3 className="mt-3 font-bold text-slate-800 dark:text-white">
                  No courses enrolled yet
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Start learning by exploring our nursing courses.
                </p>

                <Link
                  href="/courses"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
                >
                  Explore Courses
                  <ChevronRight size={17} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {recentCourses.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="group rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-lg dark:border-slate-700 dark:hover:border-cyan-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
                          <BookOpen size={22} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="line-clamp-2 font-bold text-slate-900 dark:text-white">
                            {enrollment.course.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {enrollment.course.level} •{" "}
                            {enrollment.course.language}
                          </p>
                        </div>
                      </div>

                      {enrollment.completed ? (
                        <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                          Completed
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                          Learning
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-500 dark:text-slate-400">
                          Course Progress
                        </span>

                        <span className="text-slate-800 dark:text-white">
                          {Math.min(
                            100,
                            Math.max(0, enrollment.progress)
                          )}
                          %
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, enrollment.progress)
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Certificates */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                <Award size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  My Certificates
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Certificates earned from completed courses
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {user.certificates.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/50">
                <Award
                  size={36}
                  className="mx-auto text-slate-400"
                />

                <h3 className="mt-3 font-bold text-slate-800 dark:text-white">
                  No certificates yet
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Complete your courses to earn professional certificates.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {user.certificates.slice(0, 4).map((certificate) => (
                  <div
                    key={certificate.id}
                    className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 dark:border-amber-500/20 dark:from-amber-500/5 dark:to-slate-900"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                        <Medal size={24} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {certificate.course.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Certificate No: {certificate.certificateNo}
                        </p>

                        <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <CalendarDays size={14} />
                          Issued{" "}
                          {new Intl.DateTimeFormat("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }).format(certificate.issuedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/courses"
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                <BookOpen size={21} />
              </div>

              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  Explore Courses
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Continue your nursing education
                </p>
              </div>
            </div>

            <ChevronRight
              size={20}
              className="text-slate-400 transition group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/dashboard/quiz"
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                <Trophy size={21} />
              </div>

              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  Take a Quiz
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Test your ICU knowledge
                </p>
              </div>
            </div>

            <ChevronRight
              size={20}
              className="text-slate-400 transition group-hover:translate-x-1"
            />
          </Link>
        </section>
      </main>
    </div>
  );
}

/*
 * ---------------------------------------------------------
 * Reusable UI Components
 * ---------------------------------------------------------
 */

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 p-5 sm:p-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
        <span className="text-cyan-600 dark:text-cyan-400">
          {icon}
        </span>

        {label}
      </div>

      <p className="mt-2 break-words text-sm font-bold text-slate-900 dark:text-white">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function MembershipRow({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span
        className={`inline-flex items-center gap-1.5 text-sm font-bold ${
          positive
            ? "text-green-600 dark:text-green-400"
            : "text-amber-600 dark:text-amber-400"
        }`}
      >
        {positive && <CheckCircle2 size={15} />}

        {value}
      </span>
    </div>
  );
}

function LearningStat({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm dark:bg-slate-900 dark:text-cyan-400">
          {icon}
        </div>

        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>

      <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
        {label}
      </h3>

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}