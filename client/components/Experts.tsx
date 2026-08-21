import Link from "next/link";
import {
  ArrowRight,
  Activity,
  BrainCircuit,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Wind,
} from "lucide-react";

const experts = [
  {
    title: "ICU Nursing",
    role: "Critical Care Nursing",
    description:
      "Build strong ICU nursing foundations through patient assessment, monitoring, emergency care and practical critical-care concepts.",
    icon: Stethoscope,
    iconClass: "bg-blue-50 text-blue-700 ring-blue-100",
    badge: "CORE PROGRAM",
    href: "/courses/icu-nursing",
    topics: ["Patient Assessment", "ICU Monitoring", "Emergency Care"],
  },
  {
    title: "Mechanical Ventilation",
    role: "Ventilator Education",
    description:
      "Understand ventilator modes, settings, alarms, oxygenation, weaning and essential mechanical ventilation principles.",
    icon: Wind,
    iconClass: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    badge: "VENTILATOR",
    href: "/courses/ventilator",
    topics: ["Ventilator Modes", "Settings & Alarms", "Weaning"],
  },
  {
    title: "ECG Interpretation",
    role: "Cardiac Care Education",
    description:
      "Develop a systematic approach to ECG interpretation, rhythm recognition, heart blocks and important emergency patterns.",
    icon: HeartPulse,
    iconClass: "bg-rose-50 text-rose-700 ring-rose-100",
    badge: "CARDIAC CARE",
    href: "/courses/ecg",
    topics: ["ECG Fundamentals", "Rhythm Recognition", "Emergency ECG"],
  },
  {
    title: "ABG & Critical Care",
    role: "Clinical Analysis",
    description:
      "Learn a structured approach to ABG interpretation, acid-base balance and practical ICU case-based analysis.",
    icon: Activity,
    iconClass: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    badge: "CRITICAL CARE",
    href: "/courses/abg",
    topics: ["pH & PaCO₂", "HCO₃⁻ Analysis", "ICU Cases"],
  },
];

export default function Experts() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
            <ShieldCheck size={15} />
            Expert-Led Learning
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Learn Critical Care
            <span className="block text-blue-700">
              With Clinical Expertise
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Explore focused learning tracks covering ICU nursing, mechanical
            ventilation, ECG interpretation and ABG analysis.
          </p>
        </div>

        {/* Expertise cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert) => {
            const Icon = expert.icon;

            return (
              <article
                key={expert.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
              >
                {/* Top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-80" />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Icon + badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition duration-300 group-hover:scale-105 ${expert.iconClass}`}
                    >
                      <Icon size={27} strokeWidth={2} />
                    </div>

                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[9px] font-black tracking-[0.12em] text-slate-500">
                      {expert.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mt-7">
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-blue-600">
                      {expert.role}
                    </p>

                    <h3 className="mt-2 text-xl font-black leading-tight text-slate-950">
                      {expert.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {expert.description}
                  </p>

                  {/* Topics */}
                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                    {expert.topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-2.5 text-sm font-medium text-slate-600"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <ShieldCheck size={13} />
                        </span>

                        {topic}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={expert.href}
                    className="group/link mt-7 inline-flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:border-blue-200 hover:bg-blue-700 hover:text-white"
                  >
                    <span>Explore Learning</span>

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Professional learning banner */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-7 text-white shadow-xl sm:p-9">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20">
                <BrainCircuit size={24} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                  Professional Learning
                </p>

                <h3 className="mt-1 text-xl font-black sm:text-2xl">
                  Build knowledge across the complete ICU learning pathway.
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Start with fundamentals, develop practical skills and
                  progress toward advanced critical-care concepts through
                  structured courses.
                </p>
              </div>
            </div>

            <Link
              href="/courses"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
            >
              View All Courses

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}