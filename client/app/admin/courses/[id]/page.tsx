import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  IndianRupee,
  Clock,
  Star,
  Users,
  Globe,
  Crown,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      lessons: true,
      enrollments: true,
      certificates: true,
      quizzes: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <Link
            href="/admin/courses"
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>

          <h1 className="text-4xl font-bold">
            Course Details
          </h1>

          <p className="mt-2 text-slate-500">
            Complete course information.
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">

          <BookOpen size={32} />

        </div>

      </div>

              {/* Course Information */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Card */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <img
            src={course.image}
            alt={course.title}
            className="h-52 w-full rounded-2xl object-cover"
          />

          <h2 className="mt-6 text-3xl font-bold">
            {course.title}
          </h2>

          <p className="mt-4 text-slate-600">
            {course.description}
          </p>

          <div className="mt-6">

            {course.isPremium ? (

              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-5 py-2 font-semibold text-amber-700">

                <Crown size={18} />

                Premium Course

              </span>

            ) : (

              <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">

                Free Course

              </span>

            )}

          </div>

        </div>

        {/* Details */}

        <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-8 text-2xl font-bold">

            Course Information

          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="flex items-center gap-4">

              <IndianRupee className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Price
                </p>

                <h3 className="font-semibold">
                  ₹{course.price}
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Clock className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Duration
                </p>

                <h3 className="font-semibold">
                  {course.duration} Hours
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Star className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Level
                </p>

                <h3 className="font-semibold">
                  {course.level}
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Globe className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Language
                </p>

                <h3 className="font-semibold">
                  {course.language}
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4 md:col-span-2">

              <Users className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Instructor
                </p>

                <h3 className="font-semibold">
                  {course.instructor}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

            {/* Statistics */}

      <div className="mt-10 grid gap-8 xl:grid-cols-2">

        {/* Lessons */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            Lessons
          </h2>

          {course.lessons.length === 0 ? (

            <p className="text-slate-500">
              No lessons available.
            </p>

          ) : (

            course.lessons.map((lesson, index) => (

              <div
                key={lesson.id}
                className="mb-4 rounded-2xl border p-5 hover:bg-slate-50"
              >

                <h3 className="font-semibold">
                  {index + 1}. {lesson.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {lesson.description}
                </p>

              </div>

            ))

          )}

        </div>

        {/* Summary */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            Course Summary
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between border-b pb-4">

              <span className="text-slate-500">
                Lessons
              </span>

              <span className="text-xl font-bold">
                {course.lessons.length}
              </span>

            </div>

            <div className="flex items-center justify-between border-b pb-4">

              <span className="text-slate-500">
                Students
              </span>

              <span className="text-xl font-bold">
                {course.enrollments.length}
              </span>

            </div>

            <div className="flex items-center justify-between border-b pb-4">

              <span className="text-slate-500">
                Certificates
              </span>

              <span className="text-xl font-bold">
                {course.certificates.length}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-500">
                Quizzes
              </span>

              <span className="text-xl font-bold">
                {course.quizzes.length}
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

          <Link
            href={`/admin/courses/${course.id}/edit`}
            className="rounded-2xl bg-blue-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            Edit Course
          </Link>

          <button
            className={`rounded-2xl px-6 py-4 font-semibold text-white transition ${
              course.isPremium
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {course.isPremium
              ? "Remove Premium"
              : "Make Premium"}
          </button>

          <button className="rounded-2xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700">
            Delete Course
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
              Course Details Module
            </p>

          </div>

          <div className="flex flex-wrap gap-8 text-sm text-slate-400">

            <span>
              Lessons: {course.lessons.length}
            </span>

            <span>
              Students: {course.enrollments.length}
            </span>

            <span>
              Certificates: {course.certificates.length}
            </span>

          </div>

        </div>

      </footer>

    </main>
  );
}