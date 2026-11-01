
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock3,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Plus,
  ShieldCheck,
  Users,
  Video,
  Wallet,
} from "lucide-react";

import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";

const OWNER_EMAIL = "dubeyavinash557@gmail.com";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

const navigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Overview",
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: Users,
    description: "Student management",
  },
  {
    label: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
    description: "Course management",
  },
  {
    label: "Quizzes",
    href: "/admin/quizzes",
    icon: ClipboardList,
    description: "Assessments",
  },
];

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/admin");
  }

  const email = session.user.email.trim().toLowerCase();

  // Only the designated owner account can use this dashboard.
  if (email !== OWNER_EMAIL) {
    redirect("/dashboard");
  }

  const admin = await prisma.user.findUnique({
    where: { email: OWNER_EMAIL },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
    },
  });

  // The owner account must also have ADMIN role in the database.
  if (!admin || admin.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [
    totalStudents,
    premiumStudents,
    verifiedStudents,
    totalCourses,
    totalLessons,
    totalQuizzes,
    totalCertificates,
    totalEnrollments,
    successfulPayments,
    recentStudents,
    recentPayments,
    recentCourses,
    recentCertificates,
  ] = await Promise.all([
    prisma.user.count({
      where: { role: "STUDENT" },
    }),

    prisma.user.count({
      where: {
        role: "STUDENT",
        isPremium: true,
      },
    }),

    prisma.user.count({
      where: {
        role: "STUDENT",
        isVerified: true,
      },
    }),

    prisma.course.count(),

    prisma.lesson.count(),

    prisma.quiz.count(),

    prisma.certificate.count(),

    prisma.enrollment.count(),

    prisma.payment.findMany({
      where: { status: "SUCCESS" },
      select: {
        id: true,
        amount: true,
      },
    }),

    prisma.user.findMany({
      where: { role: "STUDENT" },
      select: {
        id: true,
        fullName: true,
        email: true,
        isPremium: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.payment.findMany({
      where: { status: "SUCCESS" },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        user: {
          select: { fullName: true },
        },
        course: {
          select: { title: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.course.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        isPremium: true,
        _count: {
          select: {
            lessons: true,
            enrollments: true,
            quizzes: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.certificate.findMany({
      select: {
        id: true,
        certificateNo: true,
        issuedAt: true,
        user: {
          select: { fullName: true },
        },
        course: {
          select: { title: true },
        },
      },
      orderBy: { issuedAt: "desc" },
      take: 5,
    }),
  ]);

  const successfulPaymentCount = successfulPayments.length;
  const totalRevenue = successfulPayments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  async function handleLogout() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  const stats = [
    {
      label: "Total Students",
      value: formatNumber(totalStudents),
      helper: `${formatNumber(verifiedStudents)} verified`,
      icon: Users,
      color: "blue",
    },
    {
      label: "Premium Students",
      value: formatNumber(premiumStudents),
      helper: "Current database count",
      icon: GraduationCap,
      color: "emerald",
    },
    {
      label: "Courses",
      value: formatNumber(totalCourses),
      helper: `${formatNumber(totalLessons)} lessons`,
      icon: BookOpen,
      color: "violet",
    },
    {
      label: "Certificates",
      value: formatNumber(totalCertificates),
      helper: "Issued certificates",
      icon: Award,
      color: "orange",
    },
  ] as const;

  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    violet: "bg-violet-50 text-violet-700 ring-violet-100",
    orange: "bg-orange-50 text-orange-700 ring-orange-100",
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <Link
            href="/admin"
            className="flex items-center gap-3 border-b border-slate-100 px-6 py-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <ShieldCheck size={25} />
            </div>

            <div>
              <p className="font-extrabold tracking-tight">ICU Admin</p>
              <p className="text-xs text-slate-500">Learning Portal</p>
            </div>
          </Link>

          <div className="px-4 py-6">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Main Menu
            </p>

            <nav className="space-y-1.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = item.href === "/admin";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <Icon size={19} />
                    <span>{item.label}</span>
                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-white" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <p className="mb-3 mt-9 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Learning Platform
            </p>

            <div className="space-y-1.5">
              <Link
                href="/courses"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                <Video size={19} />
                Public Course Catalog
                <ArrowUpRight className="ml-auto" size={15} />
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                <Activity size={19} />
                Student Dashboard
                <ArrowUpRight className="ml-auto" size={15} />
              </Link>
            </div>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-emerald-400" size={18} />
                <span className="text-sm font-bold">Owner Account</span>
              </div>
              <p className="mt-2 break-all text-xs leading-5 text-slate-300">
                {admin.email}
              </p>
            </div>

            <form action={handleLogout} className="mt-3">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut size={17} />
                Sign out
              </button>
            </form>
          </div>
        </aside>

        {/* Main Dashboard */}
        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-7 lg:px-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  ICU Learning Portal
                </p>
                <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Admin Dashboard
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Welcome back, {admin.fullName}.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 sm:inline-flex sm:items-center sm:gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Owner access
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white">
                  {admin.fullName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Mobile navigation */}
            <nav className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-3 lg:hidden">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
                      item.href === "/admin"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-7 lg:p-10">
            {/* Welcome banner */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 p-6 text-white shadow-xl shadow-indigo-900/10 sm:p-9">
              <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
              <div className="pointer-events-none absolute -bottom-28 right-36 h-64 w-64 rounded-full bg-white/5" />

              <div className="relative max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">
                  <ShieldCheck size={15} />
                  LMS ADMINISTRATION
                </span>

                <h2 className="mt-5 text-2xl font-extrabold leading-tight sm:text-4xl">
                  Manage your learning platform.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                  Manage courses, lessons, student accounts and quizzes from
                  one central dashboard. The figures below come from your
                  database.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/admin/courses/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                  >
                    <Plus size={18} />
                    Create Course
                  </Link>

                  <Link
                    href="/admin/quizzes/create"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                  >
                    <ClipboardList size={18} />
                    Create Quiz
                  </Link>

                  <Link
                    href="/admin/students"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Manage Students
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </section>

            {/* Main statistics */}
            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold">Platform Overview</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Current totals from the database
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400">
                  Live query
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <article
                      key={stat.label}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-500">
                            {stat.label}
                          </p>
                          <p className="mt-3 text-3xl font-extrabold tracking-tight">
                            {stat.value}
                          </p>
                          <p className="mt-2 text-xs text-slate-500">
                            {stat.helper}
                          </p>
                        </div>

                        <div
                          className={`rounded-2xl p-3 ring-1 ${colorStyles[stat.color]}`}
                        >
                          <Icon size={23} />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Financial and learning metrics */}
            <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                    <Wallet size={21} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Successful Payments</p>
                    <p className="text-2xl font-extrabold">
                      {formatNumber(successfulPaymentCount)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Transactions marked SUCCESS in the payment table.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                    <CreditCard size={21} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Successful Payment Total</p>
                    <p className="text-xl font-extrabold sm:text-2xl">
                      {formatCurrency(totalRevenue)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Sum of successful payment records, not a bank settlement
                  report.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-50 p-3 text-violet-700">
                    <Activity size={21} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Enrollments</p>
                    <p className="text-2xl font-extrabold">
                      {formatNumber(totalEnrollments)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Course enrollment records currently stored.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-50 p-3 text-orange-700">
                    <ClipboardList size={21} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Quizzes</p>
                    <p className="text-2xl font-extrabold">
                      {formatNumber(totalQuizzes)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Quizzes available in the administration database.
                </p>
              </article>
            </section>

            {/* Recent students and courses */}
            <section className="grid gap-6 2xl:grid-cols-2">
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
                  <div>
                    <h2 className="font-extrabold">Recently Registered Students</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Latest student accounts
                    </p>
                  </div>

                  <Link
                    href="/admin/students"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900"
                  >
                    View all <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {recentStudents.length === 0 ? (
                    <p className="p-8 text-center text-sm text-slate-500">
                      No student accounts found.
                    </p>
                  ) : (
                    recentStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between gap-3 p-4 transition hover:bg-slate-50 sm:px-6"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-extrabold text-blue-700">
                            {student.fullName.charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">
                              {student.fullName}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {student.email}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              Registered {formatDate(student.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${
                              student.isPremium
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {student.isPremium ? "Premium" : "Free"}
                          </span>
                          <p className="mt-1 text-xs text-slate-400">
                            Student
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
                  <div>
                    <h2 className="font-extrabold">Recently Added Courses</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Courses stored in your LMS
                    </p>
                  </div>

                  <Link
                    href="/admin/courses"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900"
                  >
                    View all <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {recentCourses.length === 0 ? (
                    <p className="p-8 text-center text-sm text-slate-500">
                      No courses found.
                    </p>
                  ) : (
                    recentCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between gap-4 p-4 transition hover:bg-slate-50 sm:px-6"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="rounded-xl bg-violet-50 p-3 text-violet-700">
                            <BookOpen size={21} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">
                              {course.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {formatNumber(course._count.lessons)} lessons
                              {" · "}
                              {formatNumber(course._count.quizzes)} quizzes
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {formatNumber(course._count.enrollments)} enrollments
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="font-bold">
                            {formatCurrency(course.price)}
                          </p>
                          <span
                            className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-bold ${
                              course.isPremium
                                ? "bg-violet-50 text-violet-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {course.isPremium ? "Premium" : "Standard"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>
            </section>

            {/* Recent transactions and certificates */}
            <section className="grid gap-6 2xl:grid-cols-2">
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                      <CreditCard size={21} />
                    </div>
                    <div>
                      <h2 className="font-extrabold">Recent Successful Payments</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Latest successful transactions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {recentPayments.length === 0 ? (
                    <p className="p-8 text-center text-sm text-slate-500">
                      No successful payments found.
                    </p>
                  ) : (
                    recentPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between gap-3 p-4 sm:px-6"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">
                            {payment.user.fullName}
                          </p>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {payment.course?.title ?? "Course not specified"}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(payment.createdAt)}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="font-extrabold text-emerald-700">
                            {formatCurrency(payment.amount)}
                          </p>
                          <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 size={13} />
                            Success
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-orange-50 p-3 text-orange-700">
                      <Award size={21} />
                    </div>
                    <div>
                      <h2 className="font-extrabold">Recently Issued Certificates</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Latest certificate records
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {recentCertificates.length === 0 ? (
                    <p className="p-8 text-center text-sm text-slate-500">
                      No certificates have been issued yet.
                    </p>
                  ) : (
                    recentCertificates.map((certificate) => (
                      <div
                        key={certificate.id}
                        className="flex items-center justify-between gap-3 p-4 sm:px-6"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="rounded-xl bg-orange-50 p-3 text-orange-700">
                            <Award size={20} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">
                              {certificate.course.title}
                            </p>
                            <p className="mt-1 truncate text-xs text-slate-500">
                              {certificate.user.fullName}
                            </p>
                            <p className="mt-1 break-all text-xs text-slate-400">
                              {certificate.certificateNo}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                            Issued
                          </span>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(certificate.issuedAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>
            </section>

            {/* Quick access */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-extrabold">Quick Access</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Open the management pages available in your project.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <Link
                  href="/admin/courses"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <BookOpen className="text-blue-600" size={25} />
                    <ArrowRight
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                      size={19}
                    />
                  </div>
                  <h3 className="mt-4 font-extrabold">Course Management</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Create courses and manage lessons.
                  </p>
                </Link>

                <Link
                  href="/admin/students"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <Users className="text-emerald-600" size={25} />
                    <ArrowRight
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                      size={19}
                    />
                  </div>
                  <h3 className="mt-4 font-extrabold">Student Management</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Review student accounts and membership.
                  </p>
                </Link>

                <Link
                  href="/admin/quizzes"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <ClipboardList className="text-violet-600" size={25} />
                    <ArrowRight
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                      size={19}
                    />
                  </div>
                  <h3 className="mt-4 font-extrabold">Quiz Management</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage assessments for your courses.
                  </p>
                </Link>
              </div>
            </section>

            {/* Footer */}
            <footer className="flex flex-col justify-between gap-3 border-t border-slate-200 py-6 text-xs text-slate-500 sm:flex-row sm:items-center">
              <p>
                © {new Date().getFullYear()} ICU Learning Portal. Admin workspace.
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-emerald-600" />
                Restricted owner dashboard
              </p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
