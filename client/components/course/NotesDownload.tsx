"use client";

import { Download, FileText } from "lucide-react";

export default function NotesDownload() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-4">
            <FileText
              size={32}
              className="text-blue-600"
            />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Lesson Notes
            </h2>

            <p className="mt-1 text-slate-500">
              Download PDF notes for offline study.
            </p>

          </div>

        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">

          <Download size={20} />

          Download PDF

        </button>

      </div>

    </section>
  );
}