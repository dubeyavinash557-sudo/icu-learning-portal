import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  Search,
  Crown,
  Eye,
  UserPlus,
} from "lucide-react";

export default async function AdminStudentsPage() {
  const students = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalStudents = students.length;

  const premiumStudents = students.filter(
    (student) => student.isPremium
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Student Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all registered ICU Learning Portal students.
          </p>

        </div>

        <button className="flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">

          <UserPlus size={20} />

          Add Student

        </button>

      </div>

      {/* Statistics */}

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl bg-white p-7 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Total Students
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {totalStudents}
              </h2>

            </div>

            <div className="rounded-2xl bg-blue-600 p-5 text-white">

              <Users size={32} />

            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-7 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Premium Students
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {premiumStudents}
              </h2>

            </div>

            <div className="rounded-2xl bg-amber-500 p-5 text-white">

              <Crown size={32} />

            </div>

          </div>

        </div>

      </div>

              {/* Search */}

      <div className="mt-10 rounded-3xl bg-white p-6 shadow-lg">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-3 rounded-xl border px-4 py-3">

            <Search
              size={20}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search students..."
              className="w-72 outline-none"
            />

          </div>

          <p className="text-slate-500">

            Showing {students.length} students

          </p>

        </div>

      </div>

      {/* Students Table */}

      <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-lg">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Qualification
              </th>

              <th className="px-6 py-4 text-left">
                Hospital
              </th>

              <th className="px-6 py-4 text-left">
                Premium
              </th>

              <th className="px-6 py-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

                        {students.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No students found.
                </td>
              </tr>
            )}
                        {students.map((student) => (

              <tr
                key={student.id}
                className="border-t hover:bg-slate-50 transition"
              >

                {/* Student */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

                      {student.fullName.charAt(0).toUpperCase()}

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        {student.fullName}

                      </h3>

                      <p className="text-sm text-slate-500">

                        {student.email}

                      </p>

                    </div>

                  </div>

              </td>
      

               {/* Qualification */}

                <td className="px-6 py-5">

                  {student.qualification}

                </td>

                {/* Hospital */}

                <td className="px-6 py-5">

                  {student.hospital}

                </td>

                {/* Premium */}

                <td className="px-6 py-5">

                  {student.isPremium ? (

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                      Premium

                    </span>

                  ) : (

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">

                      Free

                    </span>

                  )}

                </td>

                {/* Action */}

                <td className="px-6 py-5">

                  <Link
                    href={`/admin/students/${student.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >

                    <Eye size={16} />

                    View

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

            {/* Summary */}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">

        <div className="rounded-3xl bg-white p-7 shadow-lg">

          <h3 className="text-lg font-semibold text-slate-600">
            Total Students
          </h3>

          <p className="mt-4 text-4xl font-bold text-slate-900">
            {totalStudents}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Registered users in the portal
          </p>

        </div>

        <div className="rounded-3xl bg-white p-7 shadow-lg">

          <h3 className="text-lg font-semibold text-slate-600">
            Premium Students
          </h3>

          <p className="mt-4 text-4xl font-bold text-emerald-600">
            {premiumStudents}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Active premium members
          </p>

        </div>

        <div className="rounded-3xl bg-white p-7 shadow-lg">

          <h3 className="text-lg font-semibold text-slate-600">
            Free Students
          </h3>

          <p className="mt-4 text-4xl font-bold text-blue-600">
            {totalStudents - premiumStudents}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Students using free access
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
              Student Management Module
            </p>

          </div>

          <div className="flex flex-wrap gap-8 text-sm text-slate-400">

            <span>
              Students: {totalStudents}
            </span>

            <span>
              Premium: {premiumStudents}
            </span>

          </div>

        </div>

      </footer>
          </main>
  );
}