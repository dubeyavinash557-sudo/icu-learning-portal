"use client";

import { BookOpen, PlayCircle, TrendingUp } from "lucide-react";

export default function ContinueLearning() {
  const progress = 43;

  return (
    <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        {/* Left */}
        <div className="flex-1">

          <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
            <TrendingUp size={18} />
            Continue Learning
          </span>

          <h2 className="text-3xl font-bold mt-5">
            ICU Nursing Master Course
          </h2>

          <p className="mt-3 text-blue-100 leading-7 max-w-2xl">
            Continue your ICU Nursing journey. Complete the remaining
            lessons and improve your critical care skills with practical
            hospital-based training.
          </p>

          <div className="mt-8">

            <div className="flex justify-between text-sm mb-2">
              <span>Course Progress</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">

              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />

            </div>

            <div className="flex justify-between text-sm mt-3 text-blue-100">
              <span>52 / 120 Lessons Completed</span>
              <span>68 Lessons Remaining</span>
            </div>

          </div>

        </div>

        {/* Right Card */}

        <div className="bg-white text-gray-900 rounded-3xl p-6 shadow-2xl w-full lg:w-96">

          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">

            <BookOpen className="text-blue-600" size={32} />

          </div>

          <h3 className="text-2xl font-bold">
            Resume Course
          </h3>

          <p className="text-gray-500 mt-2">
            Pick up where you left off and continue your learning.
          </p>

          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition">

            <PlayCircle size={20} />

            Continue Learning

          </button>

        </div>

      </div>

    </section>
  );
}