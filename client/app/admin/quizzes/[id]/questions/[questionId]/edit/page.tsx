import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
    questionId: string;
  }>;
}

export default async function EditQuestionPage({
  params,
}: PageProps) {
  const { id, questionId } = await params;

  const question = await prisma.quizQuestion.findUnique({
    where: {
      id: questionId,
    },
    include: {
      quiz: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!question || question.quizId !== id) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold">
            Question not found.
          </h1>

          <Link
            href={`/admin/quizzes/${id}`}
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Quiz
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
            href={`/admin/quizzes/${id}`}
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Quiz
          </Link>

          <h1 className="text-4xl font-bold">
            Edit Question
          </h1>

          <p className="mt-2 text-slate-500">
            {question.quiz.title} —{" "}
            {question.quiz.course.title}
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
          <ClipboardList size={32} />
        </div>

      </div>

      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">

        <form
          action={`/api/admin/quizzes/${id}/questions/${questionId}`}
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
              defaultValue={question.question}
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
                defaultValue={question.optionA}
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
                defaultValue={question.optionB}
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
                defaultValue={question.optionC}
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
                defaultValue={question.optionD}
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
                defaultValue={question.correctAnswer}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="A">
                  Option A
                </option>

                <option value="B">
                  Option B
                </option>

                <option value="C">
                  Option C
                </option>

                <option value="D">
                  Option D
                </option>
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
                required
                defaultValue={question.marks}
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
              defaultValue={
                question.explanation || ""
              }
              placeholder="Optional explanation..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <div className="flex gap-4 border-t border-slate-200 pt-8">

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Update Question
            </button>

            <Link
              href={`/admin/quizzes/${id}`}
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