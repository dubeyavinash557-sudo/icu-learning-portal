"use client";

import { PlayCircle, Clock, Eye } from "lucide-react";

export default function VideoPlayer() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <div className="aspect-video overflow-hidden rounded-2xl bg-slate-900 flex items-center justify-center">

        <div className="text-center text-white">

          <PlayCircle
            size={80}
            className="mx-auto text-cyan-400"
          />

          <h2 className="mt-5 text-3xl font-bold">
            ICU Nursing Master Course
          </h2>

          <p className="mt-2 text-slate-300">
            Lesson 1 • ICU Introduction
          </p>

        </div>

      </div>

      <div className="mt-6">

        <h2 className="text-2xl font-bold text-slate-900">
          ICU Introduction
        </h2>

        <p className="mt-3 text-slate-600 leading-7">
          Learn the fundamentals of ICU nursing, patient safety,
          monitoring systems, infection control, and critical care
          workflow before moving to advanced topics.
        </p>

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">

          <div className="flex items-center gap-2">
            <Clock size={18} />
            18 Minutes
          </div>

          <div className="flex items-center gap-2">
            <Eye size={18} />
            2,340 Students
          </div>

        </div>

      </div>

    </section>
  );
}