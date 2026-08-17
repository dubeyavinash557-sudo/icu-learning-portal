import {
  Download,
  FileText,
  ShieldCheck,
} from "lucide-react";

type Props = {
  lessonTitle: string;
  notesUrl?: string | null;
};

export default function NotesDownload({
  lessonTitle,
  notesUrl,
}: Props) {
  if (!notesUrl) {
    return (
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

        <div className="p-6 sm:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FileText size={25} />
            </div>

            <div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Learning Resource
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-800">
                Lesson Notes
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Notes for this lesson have not been
                uploaded yet.
              </p>

            </div>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl">

      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 p-6 sm:p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <FileText size={28} />
            </div>

            <div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                Learning Resource
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900">
                Lesson Notes
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Download the study notes for{" "}
                <strong>
                  {lessonTitle}
                </strong>{" "}
                and revise the lesson offline.
              </p>

            </div>

          </div>

          <a
            href={notesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Download size={19} />

            Download Notes
          </a>

        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-700">

          <ShieldCheck size={15} />

          Official course learning resource
        </div>

      </div>

    </section>
  );
}