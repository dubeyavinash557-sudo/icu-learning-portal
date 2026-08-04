import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  BookOpen,
  GraduationCap,
  IndianRupee,
  Crown,
  Search,
  Plus,
} from "lucide-react";

export default async function CoursesPage() {
  const totalCourses = await prisma.course.count();

  const premiumCourses = await prisma.course.count({
    where: {
      isPremium: true,
    },
  });

  const totalEnrollments = await prisma.enrollment.count();

  const payments = await prisma.payment.findMany({
    select: {
      amount: true,
    },
  });

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const courses = await prisma.course.findMany({
    include: {
      lessons: true,
      enrollments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Course Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all ICU Learning Portal courses.
          </p>

        </div>

        <Link
          href="/admin/courses/create"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Course
        </Link>

      </div>

      {/* Stats */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <BookOpen className="mb-4 text-blue-600" size={34} />
          <p className="text-sm text-slate-500">
            Total Courses
          </p>
          <h2 className="mt-2 text-4xl font-bold">
            {totalCourses}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <GraduationCap className="mb-4 text-emerald-600" size={34} />
          <p className="text-sm text-slate-500">
            Total Enrollments
          </p>
          <h2 className="mt-2 text-4xl font-bold">
            {totalEnrollments}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <Crown className="mb-4 text-amber-500" size={34} />
          <p className="text-sm text-slate-500">
            Premium Courses
          </p>
          <h2 className="mt-2 text-4xl font-bold">
            {premiumCourses}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <IndianRupee className="mb-4 text-violet-600" size={34} />
          <p className="text-sm text-slate-500">
            Revenue
          </p>
          <h2 className="mt-2 text-4xl font-bold">
            ₹{totalRevenue}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="mt-10 rounded-3xl bg-white p-6 shadow-lg">

        <div className="flex items-center gap-3 rounded-xl border px-4 py-3">

          <Search size={20} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search course..."
            className="w-full outline-none"
          />

        </div>

      </div>

              {/* Courses Table */}

      <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-lg">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold">
            All Courses
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-4 text-left font-semibold">
                  Course
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Price
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Lessons
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Students
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Type
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {courses.map((course) => (

                <tr
                  key={course.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="px-6 py-5">

                    <h3 className="font-semibold">
                      {course.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {course.slug}
                    </p>

                  </td>

                  <td className="px-6 py-5">

                    ₹{course.price}

                  </td>

                  <td className="px-6 py-5">

                    {course.lessons.length}

                  </td>

                  <td className="px-6 py-5">

                    {course.enrollments.length}

                  </td>

                  <td className="px-6 py-5">

                    {course.isPremium ? (

                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">

                        Premium

                      </span>

                    ) : (

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">

                        Free

                      </span>

                    )}

                  </td>

                  <td className="px-6 py-5 text-right">

                                        <div className="flex justify-end gap-2">

                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Edit
                      </Link>

                      <button
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

            {/* Summary */}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">

        <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-lg">

          <h2 className="text-2xl font-bold">
            Total Courses
          </h2>

          <p className="mt-4 text-5xl font-bold">
            {totalCourses}
          </p>

          <p className="mt-3 text-blue-100">
            Active learning programs
          </p>

        </div>

        <div className="rounded-3xl bg-emerald-600 p-8 text-white shadow-lg">

          <h2 className="text-2xl font-bold">
            Premium Courses
          </h2>

          <p className="mt-4 text-5xl font-bold">
            {premiumCourses}
          </p>

          <p className="mt-3 text-emerald-100">
            Paid learning content
          </p>

        </div>

        <div className="rounded-3xl bg-violet-600 p-8 text-white shadow-lg">

          <h2 className="text-2xl font-bold">
            Total Revenue
          </h2>

          <p className="mt-4 text-5xl font-bold">
            ₹{totalRevenue}
          </p>

          <p className="mt-3 text-violet-100">
            Overall course income
          </p>

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
              Course Management Module
            </p>

          </div>

          <div className="flex flex-wrap gap-8 text-sm text-slate-400">

            <span>Total Courses: {totalCourses}</span>

            <span>Premium: {premiumCourses}</span>

            <span>Enrollments: {totalEnrollments}</span>

            <span>Revenue: ₹{totalRevenue}</span>

          </div>

        </div>

      </footer>

          </main>
  );
}