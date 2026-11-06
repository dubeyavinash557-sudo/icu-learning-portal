
import Link from "next/link";
import { createLesson } from "@/app/actions/course-actions";
import PrivateVideoUpload from "@/components/admin/PrivateVideoUpload";
import {
  ArrowLeft,
  BookOpen,
  Save,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CreateLessonPage({
  params,
}: PageProps) {
  const { id } = await params;

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

          <h1 className="text-4xl font-bold">
            Create Lesson
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new lesson to this course.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
          <BookOpen size={32} />
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <form
          action={createLesson}
          className="space-y-8"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-semibold"
              >
                Lesson Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                required
                placeholder="Introduction to ICU"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="lessonOrder"
                className="mb-2 block font-semibold"
              >
                Lesson Order
              </label>

              <input
                id="lessonOrder"
                type="number"
                name="lessonOrder"
                min="1"
                required
                placeholder="1"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block font-semibold"
            >
              Lesson Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={5}
              required
              placeholder="Lesson Description..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <PrivateVideoUpload courseId={id} />

          <div>
            <label
              htmlFor="notesUrl"
              className="mb-2 block font-semibold"
            >
              Notes PDF URL
            </label>

            <input
              id="notesUrl"
              type="text"
              name="notesUrl"
              placeholder="/notes/lesson1.pdf"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="duration"
              className="mb-2 block font-semibold"
            >
              Duration (Minutes)
            </label>

            <input
              id="duration"
              type="number"
              name="duration"
              min="0"
              required
              placeholder="30"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <input
            type="hidden"
            name="courseId"
            value={id}
          />

          <div className="flex flex-wrap gap-4 border-t border-slate-200 pt-8">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <Save size={18} />
              Create Lesson
            </button>

            <Link
              href={`/admin/courses/${id}/lessons`}
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
