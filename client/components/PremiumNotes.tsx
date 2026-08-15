import Link from "next/link";
import {
  BookOpen,
  Download,
  FileText,
  LockKeyhole,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const resources = [
  {
    title: "ICU Nursing Complete Notes",
    description:
      "Comprehensive ICU nursing notes covering patient assessment, monitoring, emergency care and critical care fundamentals.",
    type: "PDF Notes",
    pages: "120+ Pages",
    href: "/notes/icu-nursing",
    premium: true,
  },
  {
    title: "Mechanical Ventilator Notes",
    description:
      "Structured notes covering ventilator modes, settings, alarms, oxygenation, weaning and practical ICU concepts.",
    type: "PDF Notes",
    pages: "150+ Pages",
    href: "/notes/ventilator",
    premium: true,
  },
  {
    title: "ECG Interpretation Notes",
    description:
      "Learn ECG basics, rhythm interpretation, arrhythmias, heart blocks and important emergency patterns.",
    type: "PDF Notes",
    pages: "90+ Pages",
    href: "/notes/ecg",
    premium: true,
  },
  {
    title: "ABG Analysis Notes",
    description:
      "A systematic ABG learning resource covering pH, PaCO₂, HCO₃⁻, acid-base disorders and ICU cases.",
    type: "PDF Notes",
    pages: "80+ Pages",
    href: "/notes/abg",
    premium: true,
  },
];

export default function PremiumNotes() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">
      {/* Background decoration */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-purple-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              <BookOpen size={16} />
              Premium Learning Resources
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Premium Notes & PDF Resources
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Download structured study resources designed to help healthcare
              learners revise important ICU and critical care concepts faster.
            </p>
          </div>

          <Link
            href="/notes"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-700 shadow-sm transition hover:border-blue-400 hover:text-blue-700 hover:shadow-md"
          >
            View All Notes
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Resource cards */}
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
            >
              {/* Premium badge */}
              {resource.premium && (
                <div className="absolute right-4 top-4 rounded-full bg-blue-700 px-3 py-1 text-[11px] font-extrabold text-white">
                  PREMIUM
                </div>
              )}

              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <FileText size={30} />
              </div>

              <h3 className="mt-6 min-h-[56px] text-xl font-extrabold leading-7 text-slate-900">
                {resource.title}
              </h3>

              <p className="mt-4 min-h-[112px] text-sm leading-6 text-slate-600">
                {resource.description}
              </p>

              {/* Resource info */}
              <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-xs">
                <span className="font-semibold text-slate-500">
                  {resource.type}
                </span>

                <span className="font-bold text-slate-700">
                  {resource.pages}
                </span>
              </div>

              {/* Features */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2
                    size={16}
                    className="text-green-600"
                  />
                  Structured Notes
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2
                    size={16}
                    className="text-green-600"
                  />
                  Exam Revision Friendly
                </div>
              </div>

              {/* Button */}
              <Link
                href={resource.href}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800"
              >
                <Download size={18} />
                View Resource
              </Link>
            </article>
          ))}
        </div>

        {/* Premium CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-slate-950 p-8 shadow-2xl md:p-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-blue-300">
                <LockKeyhole size={18} />

                <span className="text-sm font-bold">
                  Premium Student Resources
                </span>
              </div>

              <h3 className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
                Get organized notes for your critical care learning journey.
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Access course resources, revision material and downloadable
                learning content from one professional platform.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-900 transition hover:bg-blue-50"
            >
              Start Learning
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}