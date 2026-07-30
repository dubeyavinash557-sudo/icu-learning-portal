"use client";

import { BookOpen, PlayCircle, TrendingUp } from "lucide-react";

type Props = {
  courseTitle: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
};

export default function ContinueLearning({
  courseTitle,
  progress,
  completedLessons,
  totalLessons,
}: Props) {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            <TrendingUp size={18} />
            Continue Learning
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            {courseTitle}
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-blue-100">
            Continue your learning journey and complete the remaining lessons.
          </p>

          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm">
              <span>Course Progress</span>
              <span>{progress}%</span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-sm text-blue-100">
              <span>
                {completedLessons} / {totalLessons} Lessons Completed
              </span>

              <span>
                {totalLessons - completedLessons} Lessons Remaining
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full rounded-3xl bg-white p-6 text-gray-900 shadow-2xl lg:w-96">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <BookOpen className="text-blue-600" size={32} />
          </div>

          <h3 className="text-2xl font-bold">
            Resume Course
          </h3>

          <p className="mt-2 text-gray-500">
            Pick up where you left off and continue your learning.
          </p>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
            <PlayCircle size={20} />
            Continue Learning
          </button>
        </div>

      </div>
    </section>
  );
}