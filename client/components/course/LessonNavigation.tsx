"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function LessonNavigation() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Previous */}
        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">

          <ArrowLeft size={18} />

          Previous Lesson

        </button>

        {/* Complete */}
        <button className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">

          <CheckCircle2 size={18} />

          Mark as Complete

        </button>

        {/* Next */}
        <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">

          Next Lesson

          <ArrowRight size={18} />

        </button>

      </div>

    </section>
  );
}