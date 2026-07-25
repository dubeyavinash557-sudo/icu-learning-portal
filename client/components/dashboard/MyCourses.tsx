"use client";

import { courses } from "@/data/dashboard";
import { BookOpen, ChevronRight } from "lucide-react";

export default function MyCourses() {
  return (
    <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <BookOpen size={24} />
          My Courses
        </h2>

        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
          View All
          <ChevronRight size={18} />
        </button>

      </div>

      <div className="space-y-6">

        {courses.map((course) => (

          <div
            key={course.id}
            className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-lg"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-semibold">
                  {course.title}
                </h3>

                <p className="mt-1 text-slate-500">
                  {course.completed} / {course.lessons} Lessons Completed
                </p>

              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
                {course.progress}%
              </span>

            </div>
                        <div className="mt-4 h-3 rounded-full bg-slate-200">

              <div
                className="h-3 rounded-full bg-blue-600"
                style={{
                  width: `${course.progress}%`,
                }}
              />

            </div>

            <div className="mt-5 flex items-center justify-between">

              <span className="text-sm text-slate-500">
                {course.progress}% Completed
              </span>

              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                Continue
              </button>

            </div>

          </div>

        ))}
              </div>

    </div>
  );
}