import prisma from "@/lib/prisma";
import { updateCourse } from "@/app/actions/course-actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCoursePage({
  params,
}: PageProps) {
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <Link
            href="/admin/courses"
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>

          <h1 className="text-4xl font-bold">
            Edit Course
          </h1>

          <p className="mt-2 text-slate-500">
            Update course information.
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">

          <BookOpen size={32} />

        </div>

      </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">

        <form
  action={updateCourse}
  className="space-y-8"
>

    <div className="grid gap-8 md:grid-cols-2">

      {/* Course Title */}

      <div>

        <label className="mb-2 block font-semibold">
          Course Title
        </label>

        <input
          type="text"
          name="title"
          defaultValue={course.title}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

      </div>

      {/* Slug */}

      <div>

        <label className="mb-2 block font-semibold">
          Course Slug
        </label>

        <input
          type="text"
          name="slug"
          defaultValue={course.slug}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

      </div>

      {/* Price */}

      <div>

        <label className="mb-2 block font-semibold">
          Course Price
        </label>

        <input
          type="number"
          name="price"
          defaultValue={course.price}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

      </div>

      {/* Premium */}

      <div>

        <label className="mb-2 block font-semibold">
          Course Type
        </label>

        <select
          name="isPremium"
          defaultValue={course.isPremium ? "true" : "false"}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        >
          <option value="true">
            Premium
          </option>

          <option value="false">
            Free
          </option>

        </select>

                </div>

    </div>

    {/* Description */}

<div className="md:col-span-2">

  <label className="mb-2 block font-semibold">
    Course Description
  </label>

  <textarea
    name="description"
    rows={5}
    defaultValue={course.description}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
  />

</div>

{/* Image URL */}

<div>

  <label className="mb-2 block font-semibold">
    Course Image URL
  </label>

  <input
    type="text"
    name="image"
    defaultValue={course.image}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
  />

</div>

{/* Instructor */}

<div>

  <label className="mb-2 block font-semibold">
    Instructor
  </label>

  <input
    type="text"
    name="instructor"
    defaultValue={course.instructor}
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
    defaultValue={course.duration}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
  />

</div>

{/* Language */}

<div>

  <label className="mb-2 block font-semibold">
    Language
  </label>

  <input
    type="text"
    name="language"
    defaultValue={course.language}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
  />

</div>

{/* Level */}

<div>

  <label className="mb-2 block font-semibold">
    Level
  </label>

  <select
    name="level"
    defaultValue={course.level}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
  >
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Advanced">Advanced</option>
  </select>

</div>

{/* Hidden Course ID */}

<input
  type="hidden"
  name="id"
  value={course.id}
/>

{/* Action Buttons */}

<div className="flex flex-wrap gap-4 border-t border-slate-200 pt-8">

  <button
    type="submit"
    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
  >
    Save Changes
  </button>

  <Link
    href="/admin/courses"
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