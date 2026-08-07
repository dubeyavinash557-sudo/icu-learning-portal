import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  Plus,
} from "lucide-react";
import DeleteQuestionButton from "@/components/admin/DeleteQuestionButton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      course: true,
      questions: {
        orderBy: {
          id: "asc",
        },
      },
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
            href="/admin/quizzes"
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Quizzes
          </Link>

          <h1 className="text-4xl font-bold">
            {quiz.title}
          </h1>

          <p className="mt-2 text-slate-500">
            Course: {quiz.course.title}
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
          <ClipboardList size={32} />
        </div>

      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Course
          </p>

          <p className="mt-2 text-xl font-bold">
            {quiz.course.title}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Questions
          </p>

          <p className="mt-2 text-3xl font-bold">
            {quiz.questions.length}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Total Marks
          </p>

          <p className="mt-2 text-3xl font-bold">
            {quiz.questions.reduce(
              (total, question) =>
                total + question.marks,
              0
            )}
          </p>
        </div>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <ClipboardList className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Quiz Questions
            </h2>

          </div>

          <Link
            href={`/admin/quizzes/${quiz.id}/questions/create`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Question
          </Link>

        </div>

        {quiz.questions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center">

            <ClipboardList
              size={40}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-4 text-xl font-semibold">
              No questions yet
            </h3>

            <p className="mt-2 text-slate-500">
              Add the first question to this quiz.
            </p>

            <Link
              href={`/admin/quizzes/${quiz.id}/questions/create`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Question
            </Link>

          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead>

                <tr className="border-b">

                  <th className="px-4 py-3 text-left">
                    #
                  </th>

                  <th className="px-4 py-3 text-left">
                    Question
                  </th>

                  <th className="px-4 py-3 text-left">
                    Correct Answer
                  </th>

                  <th className="px-4 py-3 text-left">
                    Marks
                  </th>

                  <th className="px-4 py-3 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {quiz.questions.map(
                  (question, index) => (

                    <tr
                      key={question.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="px-4 py-4">
                        {index + 1}
                      </td>

                      <td className="max-w-md px-4 py-4 font-medium">
                        {question.question}
                      </td>

                      <td className="px-4 py-4">
                        {question.correctAnswer}
                      </td>

                      <td className="px-4 py-4">
                        {question.marks}
                      </td>

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-4">

  <Link
    href={`/admin/quizzes/${quiz.id}/questions/${question.id}/edit`}
    className="text-green-600 hover:underline"
  >
    Edit
  </Link>

  <DeleteQuestionButton
    quizId={quiz.id}
    questionId={question.id}
  />

</div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </main>
  );
}