import Link from "next/link";
import { createCourse } from "@/app/actions/course-actions";
import {
  ArrowLeft,
  BookOpen,
  Save,
} from "lucide-react";

export default function CreateCoursePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

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
            Create Course
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new course to the ICU Learning Portal.
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">

          <BookOpen size={32} />

        </div>

      </div>

      {/* Form */}

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <form
  action={createCourse}
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
                placeholder="ICU Nursing Master Course"
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
                placeholder="icu-nursing"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            {/* Price */}

            <div>

              <label className="mb-2 block font-semibold">
                Course Price (₹)
              </label>

              <input
                type="number"
                name="price"
                placeholder="999"
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

          <div>

            <label className="mb-2 block font-semibold">
              Course Description
            </label>

            <textarea
              name="description"
              rows={6}
              placeholder="Write complete course description..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

          </div>

          {/* Thumbnail */}

          <div>

            <label className="mb-2 block font-semibold">
              Thumbnail URL
            </label>

            <input
              type="text"
              name="thumbnail"
              placeholder="https://example.com/course.jpg"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

          </div>

          {/* Duration */}

          <div>

            <label className="mb-2 block font-semibold">
              Course Duration
            </label>

            <input
              type="text"
              name="duration"
              placeholder="10 Hours"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

          </div>

          {/* Level */}

          <div>

            <label className="mb-2 block font-semibold">
              Difficulty Level
            </label>

            <select
              name="level"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

          </div>

                    {/* Action Buttons */}

          <div className="flex flex-wrap gap-4 border-t border-slate-200 pt-8">

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={18} />
              Create Course
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

            {/* Footer */}

      <footer className="mt-12 rounded-3xl bg-slate-900 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              ICU Learning Portal
            </h2>

            <p className="mt-2 text-slate-400">
              Course Creation Module
            </p>

          </div>

          <div className="flex flex-wrap gap-8 text-sm text-slate-400">

            <span>Create New Course</span>

            <span>Premium / Free</span>

            <span>Admin Panel</span>

          </div>

        </div>

      </footer>

          </main>
  );
}