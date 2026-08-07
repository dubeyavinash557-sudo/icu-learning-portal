import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
} from "lucide-react";

export default async function CreateQuizPage() {
    const courses = await prisma.course.findMany({
  orderBy: {
    title: "asc",
  },
});

  return (
    <main className="min-h-screen bg-slate-100 p-8">

  <div className="mb-8 flex items-center justify-between">

    <div>

      <Link
        href="/admin/quizzes"
        className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Quizzes
      </Link>

      <h1 className="text-4xl font-bold">
        Create Quiz
      </h1>

      <p className="mt-2 text-slate-500">
        Create a new quiz for your course.
      </p>

    </div>

    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">

      <ClipboardList size={32} />

    </div>

  </div>

  <div className="rounded-3xl bg-white p-8 shadow-lg">

    <form className="space-y-8">

  <div className="grid gap-8 md:grid-cols-2">

    <div>

      <label className="mb-2 block font-semibold">
        Quiz Title
      </label>

      <input
        type="text"
        name="title"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
      />

    </div>

    <div>

      <label className="mb-2 block font-semibold">
        Course
      </label>

      <select
        name="courseId"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
      >
        {courses.map((course) => (
          <option
            key={course.id}
            value={course.id}
          >
            {course.title}
          </option>
        ))}
      </select>

    </div>

  </div>

  <div className="grid gap-8 md:grid-cols-2">

  <div>

    <label className="mb-2 block font-semibold">
      Passing Marks
    </label>

    <input
      type="number"
      name="passingMarks"
      defaultValue={50}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
    />

  </div>

  <div>

    <label className="mb-2 block font-semibold">
      Time Limit (Minutes)
    </label>

    <input
      type="number"
      name="timeLimit"
      defaultValue={30}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
    />

  </div>

</div>

<div className="flex gap-4 border-t border-slate-200 pt-8">

  <button
    type="submit"
    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
  >
    Create Quiz
  </button>

  <Link
    href="/admin/quizzes"
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