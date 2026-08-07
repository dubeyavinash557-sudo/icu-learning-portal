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

export default async function CreateQuestionPage({
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
            Add Question
          </h1>

          <p className="mt-2 text-slate-500">
            {quiz.title} — {quiz.course.title}
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
          <ClipboardList size={32} />
        </div>

      </div>

      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">

        <form
          action={`/api/admin/quizzes/${quiz.id}/questions`}
          method="POST"
          className="space-y-8"
        >

          <div>

            <label className="mb-2 block font-semibold">
              Question
            </label>

            <textarea
              name="question"
              rows={4}
              required
              placeholder="Enter quiz question..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-semibold">
                Option A
              </label>

              <input
                type="text"
                name="optionA"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Option B
              </label>

              <input
                type="text"
                name="optionB"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Option C
              </label>

              <input
                type="text"
                name="optionC"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Option D
              </label>

              <input
                type="text"
                name="optionD"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-semibold">
                Correct Answer
              </label>

              <select
                name="correctAnswer"
                required
                defaultValue="A"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Marks
              </label>

              <input
                type="number"
                name="marks"
                min={1}
                defaultValue={1}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Explanation
            </label>

            <textarea
              name="explanation"
              rows={4}
              placeholder="Optional explanation for the correct answer..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <div className="flex gap-4 border-t border-slate-200 pt-8">

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Create Question
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