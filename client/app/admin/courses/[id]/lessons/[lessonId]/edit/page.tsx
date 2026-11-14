
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateLesson } from "@/app/actions/course-actions";
import PrivateVideoUpload from "@/components/admin/PrivateVideoUpload";

import {
  ArrowLeft,
  BookOpen,
  Save,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}

export default async function EditLessonPage({
  params,
}: PageProps) {
  const { id, lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
  });

  if (!lesson || lesson.courseId !== id) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href={`/admin/courses/${id}/lessons`}
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Lessons
          </Link>

          <h1 className="text-4xl font-bold text-slate-900">
            Edit Lesson
          </h1>

          <p className="mt-2 text-slate-500">
            Update lesson information and private video.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
          <BookOpen size={32} />
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <form
          action={updateLesson}
          className="space-y-8"
        >
          {/* Lesson Title and Order */}

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-semibold text-slate-800"
              >
                Lesson Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                required
                defaultValue={lesson.title}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="lessonOrder"
                className="mb-2 block font-semibold text-slate-800"
              >
                Lesson Order
              </label>

              <input
                id="lessonOrder"
                type="number"
                name="lessonOrder"
                min="1"
                required
                defaultValue={lesson.lessonOrder}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}

          <div>
            <label
              htmlFor="description"
              className="mb-2 block font-semibold text-slate-800"
            >
              Lesson Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={5}
              required
              defaultValue={lesson.description}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Private Video Upload */}

          <PrivateVideoUpload
            courseId={id}
            initialVideoUrl={lesson.videoUrl}
          />

          {/* Notes URL */}

          <div>
            <label
              htmlFor="notesUrl"
              className="mb-2 block font-semibold text-slate-800"
            >
              Notes URL
            </label>

            <input
              id="notesUrl"
              type="text"
              name="notesUrl"
              defaultValue={lesson.notesUrl ?? ""}
              placeholder="/notes/lesson1.pdf"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Duration */}

          <div>
            <label
              htmlFor="duration"
              className="mb-2 block font-semibold text-slate-800"
            >
              Duration (Minutes)
            </label>

            <input
              id="duration"
              type="number"
              name="duration"
              min="0"
              required
              defaultValue={lesson.duration}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Hidden IDs */}

          <input
            type="hidden"
            name="id"
            value={lesson.id}
          />

          <input
            type="hidden"
            name="courseId"
            value={lesson.courseId}
          />

          {/* Actions */}

          <div className="flex flex-wrap gap-4 border-t border-slate-200 pt-8">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={18} />
              Save Changes
            </button>

            <Link
              href={`/admin/courses/${id}/lessons`}
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
