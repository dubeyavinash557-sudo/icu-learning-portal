import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateLesson } from "@/app/actions/course-actions";
import {
  ArrowLeft,
  BookOpen,
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

  if (!lesson) {
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

          <h1 className="text-4xl font-bold">
            Edit Lesson
          </h1>

          <p className="mt-2 text-slate-500">
            Update lesson information.
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

            <div className="grid gap-8 md:grid-cols-2">

  {/* Lesson Title */}

  <div>

    <label className="mb-2 block font-semibold">
      Lesson Title
    </label>

    <input
      type="text"
      name="title"
      defaultValue={lesson.title}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
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
      defaultValue={lesson.lessonOrder}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
    />

  </div>

</div>

{/* Description */}

<div>

  <label className="mb-2 block font-semibold">
    Description
  </label>

  <textarea
    name="description"
    rows={5}
    defaultValue={lesson.description}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
  />

</div>

{/* Video URL */}

<div>

  <label className="mb-2 block font-semibold">
    Video URL
  </label>

  <input
    type="text"
    name="videoUrl"
    defaultValue={lesson.videoUrl}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
  />

</div>

{/* Notes URL */}

<div>

  <label className="mb-2 block font-semibold">
    Notes URL
  </label>

  <input
    type="text"
    name="notesUrl"
    defaultValue={lesson.notesUrl ?? ""}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
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
    defaultValue={lesson.duration}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
  />

</div>

{/* Hidden Lesson ID */}

<input
  type="hidden"
  name="id"
  value={lesson.id}
/>

<input
  type="hidden"
  name="courseId"
  value={id}
/>

{/* Action Buttons */}

<div className="flex flex-wrap gap-4 border-t border-slate-200 pt-8">

  <button
    type="submit"
    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
  >
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