import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Crown,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentProfilePage({
  params,
}: PageProps) {
  const { id } = await params;

  const student = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      enrollments: {
        include: {
          course: true,
        },
      },
      certificates: {
        include: {
          course: true,
        },
      },
      payments: true,
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
            href="/admin/students"
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Students
          </Link>

          <h1 className="text-4xl font-bold">
            Student Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Complete student information.
          </p>

        </div>

      </div>

              {/* Profile */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Card */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex flex-col items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">

              {student.fullName.charAt(0).toUpperCase()}

            </div>

            <h2 className="mt-6 text-3xl font-bold">

              {student.fullName}

            </h2>

            <p className="mt-2 text-slate-500">

              {student.email}

            </p>

            <div className="mt-6">

              {student.isPremium ? (

                <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-5 py-2 font-semibold text-amber-700">

                  <Crown size={18} />

                  Premium Member

                </span>

              ) : (

                <span className="rounded-full bg-slate-100 px-5 py-2 font-semibold text-slate-600">

                  Free Member

                </span>

              )}

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-8 text-2xl font-bold">

            Personal Information

          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="flex items-center gap-4">

              <User className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <h3 className="font-semibold">

                  {student.fullName}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Mail className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Email
                </p>

                <h3 className="font-semibold">

                  {student.email}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Phone className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Mobile
                </p>

                <h3 className="font-semibold">

                  {student.mobile}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <GraduationCap className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Qualification
                </p>

                <h3 className="font-semibold">

                  {student.qualification}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4 md:col-span-2">

              <Building2 className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Hospital
                </p>

                <h3 className="font-semibold">

                  {student.hospital}

                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

            {/* Courses & Certificates */}

      <div className="mt-10 grid gap-8 xl:grid-cols-2">

        {/* Enrolled Courses */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            Enrolled Courses
          </h2>

          {student.enrollments.length === 0 ? (

            <p className="text-slate-500">
              No enrolled courses.
            </p>

          ) : (

            student.enrollments.map((enrollment) => (

              <div
                key={enrollment.id}
                className="mb-4 rounded-2xl border p-5 hover:bg-slate-50"
              >

                <h3 className="font-semibold text-lg">
                  {enrollment.course.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {enrollment.course.description}
                </p>

              </div>

            ))

          )}

        </div>

        {/* Certificates */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            Certificates
          </h2>

          {student.certificates.length === 0 ? (

            <p className="text-slate-500">
              No certificates available.
            </p>

          ) : (

            student.certificates.map((certificate) => (

              <div
                key={certificate.id}
                className="mb-4 rounded-2xl border p-5 hover:bg-slate-50"
              >

                <h3 className="font-semibold">
                  {certificate.course.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Certificate No: {certificate.certificateNo}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Issued:
                  {" "}
                  {new Date(
                    certificate.issuedAt
                  ).toLocaleDateString("en-IN")}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

            {/* Payments & Summary */}

      <div className="mt-10 grid gap-8 xl:grid-cols-2">

        {/* Payment History */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            Payment History
          </h2>

          {student.payments.length === 0 ? (

            <p className="text-slate-500">
              No payment history available.
            </p>

          ) : (

            student.payments.map((payment) => (

              <div
                key={payment.id}
                className="mb-4 flex items-center justify-between rounded-2xl border p-5 hover:bg-slate-50"
              >

                <div>

                  <h3 className="font-semibold">
                    ₹{payment.amount}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(payment.createdAt).toLocaleDateString("en-IN")}
                  </p>

                </div>

                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  Paid
                </span>

              </div>

            ))

          )}

        </div>

        {/* Student Summary */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            Student Summary
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between border-b pb-4">

              <span className="text-slate-500">
                Enrolled Courses
              </span>

              <span className="text-xl font-bold">
                {student.enrollments.length}
              </span>

            </div>

            <div className="flex items-center justify-between border-b pb-4">

              <span className="text-slate-500">
                Certificates
              </span>

              <span className="text-xl font-bold">
                {student.certificates.length}
              </span>

            </div>

            <div className="flex items-center justify-between border-b pb-4">

              <span className="text-slate-500">
                Payments
              </span>

              <span className="text-xl font-bold">
                {student.payments.length}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-500">
                Membership
              </span>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  student.isPremium
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {student.isPremium ? "Premium" : "Free"}
              </span>

            </div>

          </div>

        </div>

      </div>

            {/* Admin Actions */}

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

        <h2 className="mb-8 text-2xl font-bold">
          Admin Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <button className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700">

            Edit Student

          </button>

          <button
            className={`rounded-2xl px-6 py-4 font-semibold text-white transition ${
              student.isPremium
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >

            {student.isPremium
              ? "Remove Premium"
              : "Make Premium"}

          </button>

          <button className="rounded-2xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700">

            Delete Student

          </button>

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
              Student Profile Module
            </p>

          </div>

          <div className="flex flex-wrap gap-8 text-sm text-slate-400">

            <span>
              Courses: {student.enrollments.length}
            </span>

            <span>
              Certificates: {student.certificates.length}
            </span>

            <span>
              Payments: {student.payments.length}
            </span>

          </div>

        </div>

      </footer>
          </main>
  );
}

      