import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Plus,
  ClipboardList,
  Trash2,
} from "lucide-react";

export default async function QuizPage() {
  const quizzes = await prisma.quiz.findMany({
    include: {
      course: true,
      _count: {
        select: {
          questions: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Quiz Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage quizzes for every course.
          </p>

        </div>

        <Link
          href="/admin/quizzes/create"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Quiz
        </Link>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="mb-6 flex items-center gap-3">

          <ClipboardList className="text-blue-600" />

          <h2 className="text-2xl font-bold">
            All Quizzes
          </h2>

          <div className="mt-8 overflow-x-auto">

  <table className="min-w-full">

    <thead>

      <tr className="border-b">

        <th className="px-4 py-3 text-left">
          Quiz
        </th>

        <th className="px-4 py-3 text-left">
          Course
        </th>

        <th className="px-4 py-3 text-left">
          Questions
        </th>

        <th className="px-4 py-3 text-left">
          Actions
        </th>

      </tr>

    </thead>

    <tbody>

      {quizzes.map((quiz) => (

        <tr
          key={quiz.id}
          className="border-b hover:bg-slate-50"
        >

          <td className="px-4 py-3 font-medium">
            {quiz.title}
          </td>

          <td className="px-4 py-3">
            {quiz.course.title}
          </td>

          <td className="px-4 py-3">
            {quiz._count.questions}
          </td>

          <td className="px-4 py-3">

            <div className="flex gap-4">

              <Link
                href={`/admin/quizzes/${quiz.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>

              <Link
                href={`/admin/quizzes/${quiz.id}/edit`}
                className="text-green-600 hover:underline"
              >
                Edit
              </Link>

              <button
  className="inline-flex items-center gap-2 text-red-600 hover:underline"
>
  <Trash2 size={16} />
  Delete
</button>

            </div>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

  {quizzes.length === 0 && (
  <div className="py-10 text-center text-slate-500">
    No quizzes available.
  </div>
)}

</div>

        </div>

      </div>

    </main>
  );
}