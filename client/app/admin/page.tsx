import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  CreditCard,
  Award,
  FileText,
  Settings,
  Bell,
  Search,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Activity,
  Wallet,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const admin = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!admin) {
    redirect("/login");
  }

  // ==========================
  // Dashboard Statistics
  // ==========================

  const [
    totalStudents,
    premiumStudents,
    totalCourses,
    totalCertificates,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        isPremium: true,
      },
    }),
    prisma.course.count(),
    prisma.certificate.count(),
  ]);

  const stats = [
    {
      title: "Total Students",
      value: totalStudents.toLocaleString(),
      color: "bg-blue-500",
      icon: Users,
    },
    {
      title: "Premium Students",
      value: premiumStudents.toLocaleString(),
      color: "bg-emerald-500",
      icon: GraduationCap,
    },
    {
      title: "Courses",
      value: totalCourses.toLocaleString(),
      color: "bg-violet-500",
      icon: BookOpen,
    },
    {
      title: "Certificates",
      value: totalCertificates.toLocaleString(),
      color: "bg-orange-500",
      icon: Award,
    },
  ];

  const menu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    {
      title: "Students",
      icon: Users,
    },
    {
      title: "Courses",
      icon: BookOpen,
    },
    {
      title: "Certificates",
      icon: Award,
    },
    {
      title: "Payments",
      icon: Wallet,
    },
    {
      title: "Reports",
      icon: FileText,
    },
    {
      title: "Activity",
      icon: Activity,
    },
    {
      title: "Settings",
      icon: Settings,
    },
  ];

// ==========================
// Recent Data
// ==========================

const recentStudents = await prisma.user.findMany({
  orderBy: {
    createdAt: "desc",
  },
  take: 4,
});

const recentCertificates = await prisma.certificate.findMany({
  include: {
    user: true,
    course: true,
  },
  orderBy: {
    issuedAt: "desc",
  },
  take: 4,
});

const recentPayments = await prisma.payment.findMany({
  include: {
    user: true,
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 4,
});

  return (

    <main className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}

      <aside className="flex w-72 flex-col bg-slate-900 text-white shadow-2xl">

        {/* Logo */}

        <div className="border-b border-slate-800 p-8">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600 p-4">

              <ShieldCheck size={30} />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                ICU Admin
              </h2>

              <p className="text-sm text-slate-400">
                Learning Portal
              </p>

            </div>

          </div>

        </div>

        {/* Admin Profile */}

<div className="mx-5 mt-6 rounded-2xl bg-slate-800 p-5">
  <div className="flex items-center gap-4">

    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
      {admin.fullName?.charAt(0).toUpperCase()}
    </div>

    <div>

      <h3 className="font-bold">
        {admin.fullName}
      </h3>

      <p className="text-sm text-slate-400">
        {admin.role}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {admin.email}
      </p>

    </div>

  </div>
</div>

        {/* Menu */}

        <nav className="mt-8 flex-1 px-5">

          <p className="mb-4 text-xs uppercase tracking-widest text-slate-500">

            MAIN MENU

          </p>

          <div className="space-y-2">

            {menu.map((item) => {

              const Icon = item.icon;

              return (

                <button
                  key={item.title}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-4 transition ${
                    item.active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "hover:bg-slate-800"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <Icon size={20} />

                    <span>{item.title}</span>

                  </div>

                  <ChevronRight size={18} />

                </button>

              );

            })}

          </div>

        </nav>

        {/* Logout */}

        <div className="border-t border-slate-800 p-5">

          <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-4 font-semibold transition hover:bg-red-700">

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>

      {/* Main Content */}

      <section className="flex-1 p-8">

              {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
  Welcome back, {admin.fullName} 👋
</p>

        </div>

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow">

            <Search size={20} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search students, courses..."
              className="w-64 outline-none"
            />

          </div>

          {/* Notification */}

          <button className="rounded-xl bg-white p-3 shadow transition hover:bg-slate-100">

            <Bell size={22} />

          </button>

          {/* Profile */}

          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-2 shadow">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

              {admin.fullName?.charAt(0).toUpperCase()}

            </div>

            <div>

              <h4 className="font-semibold">
  {admin.fullName}
</h4>

<p className="text-sm text-slate-500">
  {admin.role}
</p>

            </div>

          </div>

        </div>

      </div>

      {/* Welcome Banner */}

      <div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-xl">

        <h2 className="text-3xl font-bold">
          ICU Learning Portal Admin Panel
        </h2>

        <p className="mt-3 max-w-3xl text-blue-100">

          Manage {totalStudents} students,
{totalCourses} courses,
{totalCertificates} certificates
and {premiumStudents} premium members
from one professional dashboard.

        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <button className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-slate-100">

            + Add Course

          </button>

          <button className="rounded-xl border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10">

            View Reports

          </button>

          <button className="rounded-xl border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10">

            Manage Students

          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
  const Icon = item.icon;

  return (
    <div
      key={item.title}
      className="rounded-3xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            {item.title}
          </p>

          <h3 className="mt-4 text-4xl font-bold text-slate-900">
            {item.value}
          </h3>

          <p className="mt-3 text-sm text-emerald-600">
            +12% this month
          </p>

        </div>

        <div
          className={`rounded-2xl p-5 text-white shadow-lg ${item.color}`}
        >
          <Icon size={32} />
        </div>

      </div>
    </div>
  );
})}

</div>

{/* Quick Actions */}

<div className="mt-10 grid gap-6 lg:grid-cols-4">

  <button className="rounded-2xl bg-blue-600 p-6 text-left text-white shadow-lg transition hover:bg-blue-700">

    <Users size={34} />

    <h3 className="mt-5 text-xl font-bold">
      Students
    </h3>

    <p className="mt-2 text-blue-100">
      Manage all registered students.
    </p>

  </button>

  <button className="rounded-2xl bg-emerald-600 p-6 text-left text-white shadow-lg transition hover:bg-emerald-700">

    <BookOpen size={34} />

    <h3 className="mt-5 text-xl font-bold">
      Courses
    </h3>

    <p className="mt-2 text-emerald-100">
      Create and manage premium courses.
    </p>

  </button>

  <button className="rounded-2xl bg-violet-600 p-6 text-left text-white shadow-lg transition hover:bg-violet-700">

    <Award size={34} />

    <h3 className="mt-5 text-xl font-bold">
      Certificates
    </h3>

    <p className="mt-2 text-violet-100">
      Issue and verify certificates.
    </p>

  </button>

  <button className="rounded-2xl bg-orange-600 p-6 text-left text-white shadow-lg transition hover:bg-orange-700">

    <CreditCard size={34} />

    <h3 className="mt-5 text-xl font-bold">
      Payments
    </h3>

    <p className="mt-2 text-orange-100">
      View revenue and subscriptions.
    </p>

  </button>

</div>

        {/* Recent Section */}

<div className="mt-10 grid gap-8 xl:grid-cols-3">

  {/* Recent Students */}

<div className="rounded-3xl bg-white p-7 shadow-lg">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold">
      Recent Students
    </h2>

    <button className="text-blue-600 font-semibold">
      View All
    </button>

  </div>

  {recentStudents.map((student) => (

    <div
      key={student.id}
      className="mb-4 flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

          {student.fullName.charAt(0).toUpperCase()}

        </div>

        <div>

          <h4 className="font-semibold">
            {student.fullName}
          </h4>

          <p className="text-sm text-slate-500">
            {student.email}
          </p>

        </div>

      </div>

      <Users
        size={18}
        className="text-slate-400"
      />

    </div>

  ))}

</div>

    {[
      {
        name: "Rahul Sharma",
        course: "ICU Nursing",
      },
      {
        name: "Priya Singh",
        course: "Ventilator",
      },
      {
        name: "Amit Kumar",
        course: "ECG",
      },
      {
        name: "Sneha Gupta",
        course: "ABG",
      },
    ].map((student) => (

      <div
        key={student.name}
        className="mb-4 flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
      >

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

            {student.name.charAt(0)}

          </div>

          <div>

            <h4 className="font-semibold">
              {student.name}
            </h4>

            <p className="text-sm text-slate-500">
              {student.course}
            </p>

          </div>

        </div>

        <Users
          size={18}
          className="text-slate-400"
        />

      </div>

    ))}

  </div>

  {/* Recent Payments */}

<div className="rounded-3xl bg-white p-7 shadow-lg">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold">
      Recent Payments
    </h2>

    <button className="text-blue-600 font-semibold">
      View All
    </button>

  </div>

  {recentPayments.length === 0 ? (

    <p className="text-slate-500">
      No payments found.
    </p>

  ) : (

    recentPayments.map((payment) => (

      <div
        key={payment.id}
        className="mb-4 flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
      >

        <div>

          <h4 className="font-semibold">
            {payment.user.fullName}
          </h4>

          <p className="text-sm text-slate-500">
            Payment Received
          </p>

        </div>

        <span className="font-bold text-emerald-600">

          ₹{payment.amount}

        </span>

      </div>

    ))

  )}

</div>

  {/* Recent Certificates */}

<div className="rounded-3xl bg-white p-7 shadow-lg">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold">
      Certificates
    </h2>

    <button className="text-blue-600 font-semibold">
      View All
    </button>

  </div>

  {recentCertificates.length === 0 ? (

    <p className="text-slate-500">
      No certificates generated.
    </p>

  ) : (

    recentCertificates.map((certificate) => (

      <div
        key={certificate.id}
        className="mb-4 flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
      >

        <div className="flex items-center gap-3">

          <Award
            className="text-yellow-500"
            size={24}
          />

          <div>

            <h4 className="font-semibold">
              {certificate.course.title}
            </h4>

            <p className="text-sm text-slate-500">
              {certificate.user.fullName}
            </p>

          </div>

        </div>

        <span className="rounded-lg bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">
          Issued
        </span>

      </div>

    ))

  )}

</div>

        {/* Analytics */}

<div className="mt-10 grid gap-8 xl:grid-cols-2">

  {/* Revenue */}

  <div className="rounded-3xl bg-white p-8 shadow-lg">

    <div className="mb-8 flex items-center justify-between">

      <h2 className="text-2xl font-bold">
        Revenue Analytics
      </h2>

      <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
        +18%
      </span>

    </div>

    <div className="space-y-5">

      {[
        { month: "January", value: 65 },
        { month: "February", value: 82 },
        { month: "March", value: 92 },
        { month: "April", value: 75 },
        { month: "May", value: 96 },
      ].map((item) => (

        <div key={item.month}>

          <div className="mb-2 flex justify-between">

            <span>{item.month}</span>

            <span>{item.value}%</span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: `${item.value}%`,
              }}
            />

          </div>

        </div>

      ))}

    </div>

  </div>

  {/* Course Performance */}

  <div className="rounded-3xl bg-white p-8 shadow-lg">

    <h2 className="mb-8 text-2xl font-bold">
      Course Performance
    </h2>

    {[
      {
        course: "ICU Nursing",
        students: 325,
      },
      {
        course: "Ventilator",
        students: 241,
      },
      {
        course: "ECG",
        students: 198,
      },
      {
        course: "ABG",
        students: 151,
      },
      {
        course: "Medical Coding",
        students: 132,
      },
    ].map((item) => (

      <div
        key={item.course}
        className="mb-5 flex items-center justify-between border-b pb-4"
      >

        <div>

          <h3 className="font-semibold">
            {item.course}
          </h3>

          <p className="text-sm text-slate-500">
            {item.students} Students
          </p>

        </div>

        <BookOpen
          size={20}
          className="text-blue-600"
        />

      </div>

    ))}

  </div>

</div>

{/* System Status */}

<div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

  <h2 className="mb-8 text-2xl font-bold">
    System Status
  </h2>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    {[
      {
        title: "Server",
        status: "Online",
        color: "bg-green-500",
      },
      {
        title: "Database",
        status: "Healthy",
        color: "bg-blue-500",
      },
      {
        title: "Payments",
        status: "Connected",
        color: "bg-emerald-500",
      },
      {
        title: "Certificates",
        status: "Running",
        color: "bg-violet-500",
      },
    ].map((item) => (

      <div
        key={item.title}
        className="rounded-2xl border p-6"
      >

        <div
          className={`mb-5 h-4 w-4 rounded-full ${item.color}`}
        />

        <h3 className="font-bold">
          {item.title}
        </h3>

        <p className="mt-2 text-slate-500">
          {item.status}
        </p>

      </div>

    ))}

  </div>

</div>

              {/* Footer */}

      <footer className="mt-12 rounded-3xl bg-slate-900 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              ICU Learning Portal
            </h2>

            <p className="mt-2 text-slate-400">
              Premium Admin Dashboard • Version 1.0
            </p>

          </div>

          <div className="flex flex-wrap gap-8 text-sm text-slate-400">

            <span>
  Total Students: {totalStudents}
</span>

<span>
  Courses: {totalCourses}
</span>

<span>
  Certificates: {totalCertificates}
</span>

<span>
  Premium Students: {premiumStudents}
</span>

          </div>

        </div>

      </footer>

    </section>

  </main>
  );
}