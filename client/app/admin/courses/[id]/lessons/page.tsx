
import prisma from "@/lib/prisma";
import { deleteLesson } from "@/app/actions/course-actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Trash2,
  Pencil,
  Eye,
  Clock,
  Video,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LessonsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      lessons: {
        orderBy: {
          lessonOrder: "asc",
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href={`/admin/courses/${course.id}`}
            className="mb-5 inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Course
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Lesson Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage lessons for: {course.title}
          </p>
        </div>

        <Link
          href={`/admin/courses/${course.id}/lessons/create`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          <Plus size={19} />
          Add New Lesson
        </Link>
      </div>

      {/* Statistics */}

      <div className="mb-8 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <BookOpen size={24} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Lessons
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                {course.lessons.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Video size={24} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Course
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                {course.title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              All Lessons
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View, edit and manage course lessons.
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {course.lessons.length} Lessons
          </span>
        </div>

        {course.lessons.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <BookOpen size={32} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No Lessons Available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              This course does not have any lessons yet.
              Start by adding your first lesson.
            </p>

            <Link
              href={`/admin/courses/${course.id}/lessons/create`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Create First Lesson
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Order
                  </th>

                  <th className="min-w-64 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Lesson
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Duration
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Video
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {course.lessons.map((lesson) => (
                  <tr
                    key={lesson.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-6 py-5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
                        {lesson.lessonOrder}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-900">
                        {lesson.title}
                      </p>

                      <p className="mt-1 max-w-md truncate text-sm text-slate-500">
                        {lesson.description}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Clock size={16} />
                        {lesson.duration} min
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      {lesson.videoUrl ? (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Available
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Not Added
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
                          title="View Lesson"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                        >
                          <Eye size={16} />
                          View
                        </Link>

                        <Link
                          href={`/admin/courses/${course.id}/lessons/${lesson.id}/edit`}
                          title="Edit Lesson"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                        >
                          <Pencil size={16} />
                          Edit
                        </Link>

                        <form
                          action={deleteLesson.bind(
                            null,
                            lesson.id,
                            course.id
                          )}
                        >
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                            title="Delete Lesson"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">
          Course:{" "}
          <span className="font-semibold text-slate-800">
            {course.title}
          </span>
          {" | "}
          Total Lessons:{" "}
          <span className="font-semibold text-slate-800">
            {course.lessons.length}
          </span>
        </p>
      </div>
    </main>
  );
}
