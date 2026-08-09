import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditQuizPage({
  params,
}: PageProps) {
  const { id } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      course: true,
    },
  });

  if (!quiz) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold">
            Quiz not found.
          </h1>

          <Link
            href="/admin/quizzes"
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Quizzes
          </Link>
        </div>
      </main>
    );
  }

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
            href={`/admin/quizzes/${quiz.id}`}
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Quiz
          </Link>

          <h1 className="text-4xl font-bold">
            Edit Quiz
          </h1>

          <p className="mt-2 text-slate-500">
            Update quiz information.
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
          <ClipboardList size={32} />
        </div>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <form
          action={`/admin/quizzes/${quiz.id}/edit`}
          method="POST"
          className="space-y-8"
        >

          <div>

            <label className="mb-2 block font-semibold">
              Quiz Title
            </label>

            <input
              type="text"
              name="title"
              defaultValue={quiz.title}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Course
            </label>

            <select
              name="courseId"
              defaultValue={quiz.courseId}
              required
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

          <div className="flex gap-4 border-t border-slate-200 pt-8">

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Update Quiz
            </button>

            <Link
              href={`/admin/quizzes/${quiz.id}`}
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