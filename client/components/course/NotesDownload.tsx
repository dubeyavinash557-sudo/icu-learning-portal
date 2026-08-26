import {
  Download,
  FileText,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

type Props = {
  lessonId: string;
  lessonTitle: string;
  notesUrl?: string | null;
};

export default function NotesDownload({
  lessonId,
  lessonTitle,
  notesUrl,
}: Props) {
  const hasNotes = Boolean(notesUrl?.trim());

  if (!hasNotes) {
    return (
      <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
              <FileText size={21} />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Course Resource
              </p>

              <h2 className="mt-1 text-lg font-black text-slate-900">
                Study Notes
              </h2>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-7">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
                <FileText size={17} />
              </div>

              <div>
                <p className="text-sm font-black text-slate-700">
                  Notes unavailable
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Study notes for this lesson have not been published yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const protectedNotesUrl = `/api/lesson-notes?lessonId=${encodeURIComponent(
    lessonId
  )}`;

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-cyan-200 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-6 py-6 sm:px-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 shadow-sm">
              <FileText size={27} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">
                  Premium Course Resource
                </p>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-700">
                  <LockKeyhole size={11} />
                  Paid Access
                </span>
              </div>

              <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                Lesson Study Notes
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Access the official study material for{" "}
                <strong className="font-black text-slate-800">
                  {lessonTitle}
                </strong>{" "}
                after your course purchase has been verified.
              </p>
            </div>
          </div>

          <a
            href={protectedNotesUrl}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-cyan-600/20 transition hover:from-cyan-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            <Download size={18} />
            Download Study Notes
          </a>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <ResourceTrust
            icon={<ShieldCheck size={15} />}
            text="Protected access"
          />

          <ResourceTrust
            icon={<LockKeyhole size={15} />}
            text="Premium resource"
          />

          <ResourceTrust
            icon={<FileText size={15} />}
            text="Official course notes"
          />
        </div>
      </div>
    </section>
  );
}

function ResourceTrust({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-xs font-bold text-slate-600">
      <span className="text-emerald-600">{icon}</span>
      {text}
    </div>
  );
}