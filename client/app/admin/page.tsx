
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardList,
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

import { signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { getSignedInAdmin } from "@/lib/admin-auth";

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
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: Users,
  },
  {
    label: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    label: "Quizzes",
    href: "/admin/quizzes",
    icon: ClipboardList,
  },
];

export default async function AdminPage() {
  const admin = await getSignedInAdmin();

  if (!admin) {
    redirect("/login?callbackUrl=/admin");
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

  const totalRevenue = successfulPayments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const stats = [
    {
      label: "Total Students",
      value: formatNumber(totalStudents),
      helper: `${formatNumber(verifiedStudents)} verified`,
      icon: Users,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Premium Students",
      value: formatNumber(premiumStudents),
      helper: "Premium memberships",
      icon: GraduationCap,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Total Courses",
      value: formatNumber(totalCourses),
      helper: `${formatNumber(totalLessons)} lessons`,
      icon: BookOpen,
      color: "bg-violet-50 text-violet-700",
    },
    {
      label: "Certificates",
      value: formatNumber(totalCertificates),
      helper: "Issued certificates",
      icon: Award,
      color: "bg-orange-50 text-orange-700",
    },
  ];

  const financialStats = [
    {
      label: "Successful Payments",
      value: formatNumber(successfulPayments.length),
      icon: CreditCard,
    },
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: Wallet,
    },
    {
      label: "Enrollments",
      value: formatNumber(totalEnrollments),
      icon: Activity,
    },
    {
      label: "Quizzes",
      value: formatNumber(totalQuizzes),
      icon: ClipboardList,
    },
  ];

  async function handleLogout() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <Link
            href="/admin"
            className="flex items-center gap-3 border-b border-slate-100 px-6 py-6"
          >
            <div className="rounded-2xl bg-blue-600 p-3 text-white">
              <ShieldCheck size={25} />
            </div>
            <div>
              <p className="font-extrabold">ICU Admin</p>
              <p className="text-xs text-slate-500">
                Learning Portal
              </p>
            </div>
          </Link>

          <nav className="flex-1 space-y-2 p-4">
            <p className="px-3 py-2 text-xs font-bold uppercase text-slate-400">
              Main Menu
            </p>

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    item.href === "/admin"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </Link>
              );
            })}

            <div className="border-t border-slate-100 pt-4">
              <Link
                href="/courses"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
              >
                <Video size={19} />
                Public Courses
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
              >
                <Activity size={19} />
                Student Dashboard
              </Link>
            </div>
          </nav>

          <div className="p-4">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} />
                <span className="font-bold">
                  {admin.isOwner ? "Owner Account" : "Admin Account"}
                </span>
              </div>

              <p className="mt-2 break-all text-xs text-slate-300">
                {admin.email}
              </p>
            </div>

            <form action={handleLogout} className="mt-3">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 p-3 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  ICU Learning Portal
                </p>
                <h1 className="mt-1 text-2xl font-extrabold">
                  Admin Dashboard
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Welcome back, {admin.fullName}
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                {admin.isOwner ? "Owner Access" : "Admin Access"}
              </span>
            </div>

            {/* Mobile Navigation */}
            <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold"
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-8">
            {/* Welcome Banner */}
            <section className="rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 p-7 text-white shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest">
                <ShieldCheck size={18} />
                LMS ADMINISTRATION
              </div>

              <h2 className="mt-5 text-2xl font-extrabold sm:text-4xl">
                Manage your learning platform.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
                Manage courses, lessons, students, quizzes,
                payments and certificates from one dashboard.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/admin/courses/create"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700"
                >
                  <Plus size={18} />
                  Create Course
                </Link>

                <Link
                  href="/admin/quizzes/create"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-sm font-bold"
                >
                  <ClipboardList size={18} />
                  Create Quiz
                </Link>

                <Link
                  href="/admin/students"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-sm font-bold"
                >
                  Manage Students
                  <ArrowRight size={18} />
                </Link>
              </div>
            </section>

            {/* Overview */}
            <section>
              <h2 className="mb-4 text-lg font-extrabold">
                Platform Overview
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <article
                      key={stat.label}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className={`inline-flex rounded-xl p-3 ${stat.color}`}>
                        <Icon size={23} />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-500">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-3xl font-extrabold">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {stat.helper}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Financial Metrics */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {financialStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <article
                    key={stat.label}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <Icon size={22} className="text-blue-600" />
                    <p className="mt-3 text-sm text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-extrabold">
                      {stat.value}
                    </p>
                  </article>
                );
              })}
            </section>

            {/* Students and Courses */}
            <section className="grid gap-6 xl:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b p-5">
                  <h2 className="font-extrabold">Recent Students</h2>
                  <Link
                    href="/admin/students"
                    className="text-sm font-bold text-blue-700"
                  >
                    View All
                  </Link>
                </div>

                <div className="divide-y">
                  {recentStudents.length === 0 ? (
                    <p className="p-6 text-sm text-slate-500">
                      No students found.
                    </p>
                  ) : (
                    recentStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0">
                          <p className="truncate font-bold">
                            {student.fullName}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {student.email}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(student.createdAt)}
                          </p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          student.isPremium
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {student.isPremium ? "Premium" : "Free"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b p-5">
                  <h2 className="font-extrabold">Recent Courses</h2>
                  <Link
                    href="/admin/courses"
                    className="text-sm font-bold text-blue-700"
                  >
                    View All
                  </Link>
                </div>

                <div className="divide-y">
                  {recentCourses.length === 0 ? (
                    <p className="p-6 text-sm text-slate-500">
                      No courses found.
                    </p>
                  ) : (
                    recentCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0">
                          <p className="truncate font-bold">
                            {course.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {course._count.lessons} lessons ·{" "}
                            {course._count.quizzes} quizzes
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {course._count.enrollments} enrollments
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-bold">
                            {formatCurrency(course.price)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {course.isPremium ? "Premium" : "Standard"}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>
            </section>

            {/* Payments and Certificates */}
            <section className="grid gap-6 xl:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b p-5">
                  <h2 className="font-extrabold">
                    Recent Successful Payments
                  </h2>
                </div>
                <div className="divide-y">
                  {recentPayments.length === 0 ? (
                    <p className="p-6 text-sm text-slate-500">
                      No payments found.
                    </p>
                  ) : (
                    recentPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0">
                          <p className="truncate font-bold">
                            {payment.user.fullName}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {payment.course?.title ?? "Course not specified"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {formatDate(payment.createdAt)}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-bold text-emerald-700">
                            {formatCurrency(payment.amount)}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                            <CheckCircle2 size={13} />
                            Success
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b p-5">
                  <h2 className="font-extrabold">
                    Recent Certificates
                  </h2>
                </div>
                <div className="divide-y">
                  {recentCertificates.length === 0 ? (
                    <p className="p-6 text-sm text-slate-500">
                      No certificates found.
                    </p>
                  ) : (
                    recentCertificates.map((certificate) => (
                      <div key={certificate.id} className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0">
                          <p className="truncate font-bold">
                            {certificate.course.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {certificate.user.fullName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {certificate.certificateNo}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-slate-500">
                          {formatDate(certificate.issuedAt)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </article>
            </section>

            {/* Quick Access */}
            <section>
              <h2 className="mb-4 text-lg font-extrabold">
                Quick Access
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  {
                    label: "Course Management",
                    href: "/admin/courses",
                    description: "Create courses and manage lessons.",
                    icon: BookOpen,
                  },
                  {
                    label: "Student Management",
                    href: "/admin/students",
                    description: "Manage students and memberships.",
                    icon: Users,
                  },
                  {
                    label: "Quiz Management",
                    href: "/admin/quizzes",
                    description: "Manage assessments and quizzes.",
                    icon: ClipboardList,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
                    >
                      <Icon size={26} className="text-blue-600" />
                      <h3 className="mt-4 font-extrabold">
                        {item.label}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {item.description}
                      </p>
                      <ArrowRight className="mt-4 text-blue-600" size={18} />
                    </Link>
                  );
                })}
              </div>
            </section>

            <footer className="border-t border-slate-200 py-6 text-xs text-slate-500">
              © {new Date().getFullYear()} ICU Learning Portal.
              Admin Workspace.
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
