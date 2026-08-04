import { updateStudent } from "@/app/actions/student-actions";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Save,
  User,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditStudentPage({
  params,
}: PageProps) {
  const { id } = await params;

  const student = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!student) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <Link
            href={`/admin/students/${student.id}`}
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Profile
          </Link>

          <h1 className="text-4xl font-bold">
            Edit Student
          </h1>

          <p className="mt-2 text-slate-500">
            Update student information.
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">

          <User size={32} />

        </div>

      </div>

              {/* Edit Form */}

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <form
  action={updateStudent}
  className="space-y-8"
>

          <div className="grid gap-8 md:grid-cols-2">

                      {/* Full Name */}

          <div>

            <label className="mb-2 block font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              defaultValue={student.fullName}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              defaultValue={student.email}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

          </div>

          {/* Mobile */}

          <div>

            <label className="mb-2 block font-semibold">
              Mobile
            </label>

            <input
              type="text"
              name="mobile"
              defaultValue={student.mobile ?? ""}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

          </div>

          {/* Qualification */}

          <div>

            <label className="mb-2 block font-semibold">
              Qualification
            </label>

            <input
              type="text"
              name="qualification"
              defaultValue={student.qualification ?? ""}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

          </div>

          {/* Hospital */}

          <div className="md:col-span-2">

            <label className="mb-2 block font-semibold">
              Hospital
            </label>

            <input
              type="text"
              name="hospital"
              defaultValue={student.hospital ?? ""}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

          </div>

          </div>

                      {/* Hidden Student ID */}

          <input
            type="hidden"
            name="id"
            value={student.id}
          />

          {/* Action Buttons */}

          <div className="flex flex-wrap gap-4 border-t border-slate-200 pt-8">

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={18} />
              Save Changes
            </button>

            <Link
              href={`/admin/students/${student.id}`}
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-100"
            >
              Cancel
            </Link>

          </div>

        </form>

      </div>
          </main>
  );
}