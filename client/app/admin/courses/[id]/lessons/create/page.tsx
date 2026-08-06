import Link from "next/link";
import { createLesson } from "@/app/actions/course-actions";
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

  {/* Lesson Title */}

  <div>

    <label className="mb-2 block font-semibold">
      Lesson Title
    </label>

    <input
      type="text"
      name="title"
      placeholder="Introduction to ICU"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
    />

  </div>

  {/* Lesson Order */}

  <div>

    <label className="mb-2 block font-semibold">
      Lesson Order
    </label>

    <input
      type="number"
      name="lessonOrder"
      placeholder="1"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
    />

  </div>

</div>

{/* Description */}

<div>

  <label className="mb-2 block font-semibold">
    Lesson Description
  </label>

  <textarea
    name="description"
    rows={5}
    placeholder="Lesson Description..."
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
  />

</div>

<div className="grid gap-8 md:grid-cols-2">

  {/* Video URL */}

  <div>

    <label className="mb-2 block font-semibold">
      Video URL
    </label>

    <input
      type="text"
      name="videoUrl"
      placeholder="https://youtube.com/..."
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
    />

  </div>

  {/* Notes URL */}

  <div>

    <label className="mb-2 block font-semibold">
      Notes PDF URL
    </label>

    <input
      type="text"
      name="notesUrl"
      placeholder="/notes/lesson1.pdf"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
    />

  </div>

  {/* Duration */}

  <div>

    <label className="mb-2 block font-semibold">
      Duration (Minutes)
    </label>

    <input
      type="number"
      name="duration"
      placeholder="30"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
    />

  </div>

</div>

<div className="flex gap-4 border-t border-slate-200 pt-8">

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

<input
  type="hidden"
  name="courseId"
  value={id}
/>

        </form>

      </div>

    </main>
  );
}