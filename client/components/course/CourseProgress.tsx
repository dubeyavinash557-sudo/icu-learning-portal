"use client";

import { Trophy, CheckCircle2 } from "lucide-react";

export default function CourseProgress() {
  const progress = 43;

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Course Progress
          </h2>

          <p className="mt-2 text-slate-500">
            Track your learning journey.
          </p>

        </div>

        <div className="rounded-2xl bg-blue-100 p-4">
          <Trophy
            size={34}
            className="text-blue-600"
          />
        </div>

      </div>

      <div className="mt-8">

        <div className="mb-3 flex justify-between">

          <span className="font-medium text-slate-600">
            Overall Progress
          </span>

          <span className="font-bold text-blue-600">
            {progress}%
          </span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />

        </div>

      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">

        <div className="rounded-2xl bg-slate-50 p-4 text-center">

          <h3 className="text-3xl font-bold text-slate-900">
            52
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Lessons Completed
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-center">

          <h3 className="text-3xl font-bold text-slate-900">
            68
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Lessons Remaining
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-center">

          <CheckCircle2
            className="mx-auto text-green-600"
            size={34}
          />

          <p className="mt-2 text-sm font-semibold text-green-700">
            Certificate Locked
          </p>

        </div>

      </div>

    </section>
  );
}