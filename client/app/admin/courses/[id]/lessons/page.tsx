import prisma from "@/lib/prisma";
import { deleteLesson } from "@/app/actions/course-actions";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Trash2,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LessonsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      lessons: {
        orderBy: {
          lessonOrder: "asc",
        },
      },
    },
  });

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <Link
            href={`/admin/courses/${course.id}`}
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Course
          </Link>

          <h1 className="text-4xl font-bold">
            Lesson Management
          </h1>

          <p className="mt-2 text-slate-500">
            {course.title}
          </p>

        </div>

        <Link
          href={`/admin/courses/${course.id}/lessons/create`}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Lesson
        </Link>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="mb-6 flex items-center gap-3">

          <BookOpen className="text-blue-600" />

          <h2 className="text-2xl font-bold">
            Lessons
          </h2>

          <div className="mt-8 overflow-x-auto">

  <table className="min-w-full">

    <thead>

      <tr className="border-b">

        <th className="px-4 py-3 text-left">
          Order
        </th>

        <th className="px-4 py-3 text-left">
          Title
        </th>

        <th className="px-4 py-3 text-left">
          Duration
        </th>

        <th className="px-4 py-3 text-left">
          Actions
        </th>

      </tr>

    </thead>

    <tbody>

      {course.lessons.map((lesson) => (

        <tr
          key={lesson.id}
          className="border-b hover:bg-slate-50"
        >

          <td className="px-4 py-3">
            {lesson.lessonOrder}
          </td>

          <td className="px-4 py-3 font-medium">
            {lesson.title}
          </td>

          <td className="px-4 py-3">
            {lesson.duration} min
          </td>

          <td className="px-4 py-3">

             <div className="flex gap-4">

  <Link
    href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
    className="text-blue-600 hover:underline"
  >
    View
  </Link>

  <Link
    href={`/admin/courses/${course.id}/lessons/${lesson.id}/edit`}
    className="text-green-600 hover:underline"
  >
    Edit
  </Link>

  <form
  action={async () => {
    "use server";

    await deleteLesson(
      lesson.id,
      course.id
    );
  }}
  onSubmit={(e) => {
    if (
      !confirm(
        "Are you sure you want to delete this lesson?"
      )
    ) {
      e.preventDefault();
    }
  }}
>
  <button
    type="submit"
    className="flex items-center gap-1 text-red-600 hover:underline"
  >
    <Trash2 size={16} />
    Delete
  </button>
</form>

</div>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

        </div>

      </div>

    </main>
  );
}