import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Droplets,
  HeartPulse,
  Wind,
} from "lucide-react";

const topics = [
  {
    title: "Mechanical Ventilator",
    subtitle: "Master Ventilator Management",
    description:
      "Understand ventilator modes, settings, alarms, oxygenation, weaning and practical ICU management.",
    icon: Wind,
    badge: "VENTILATOR",
    href: "/courses/mechanical-ventilator-master-course",
    points: [
      "Ventilator Modes",
      "PEEP & FiO₂",
      "Alarm Management",
    ],
    iconBox: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    title: "ECG Mastery",
    subtitle: "Interpret ECG With Confidence",
    description:
      "Learn ECG fundamentals, rhythm recognition, heart blocks and important emergency ECG patterns.",
    icon: HeartPulse,
    badge: "CARDIOLOGY",
    href: "/courses/ecg-interpretation-master-course",
    points: [
      "ECG Basics",
      "Arrhythmias",
      "STEMI Recognition",
    ],
    iconBox: "bg-rose-50 text-rose-700 border-rose-100",
  },
  {
    title: "ABG Analysis",
    subtitle: "Master Arterial Blood Gas",
    description:
      "Build a systematic approach to ABG interpretation with acid-base concepts and ICU case practice.",
    icon: Droplets,
    badge: "CRITICAL CARE",
    href: "/courses/abg-analysis-master-course",
    points: [
      "pH & PaCO₂",
      "HCO₃⁻ Analysis",
      "ICU Case Studies",
    ],
    iconBox: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
];

export default function CriticalCareVisuals() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-24">
      {/* Soft clinical background accents */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-blue-700">
            <Activity size={16} strokeWidth={2.2} />
            Critical Care Skills
          </div>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            Master the Skills That Matter in the ICU
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Develop practical knowledge in mechanical ventilation, ECG
            interpretation and ABG analysis through structured professional
            learning.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <article
                key={topic.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                {/* Card accent */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-50 opacity-80 transition-transform duration-500 group-hover:scale-125" />

                {/* Icon */}
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border ${topic.iconBox} transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600`}
                >
                  <Icon
                    size={30}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </div>

                {/* Badge */}
                <div className="mt-7 w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-extrabold tracking-wider text-slate-600">
                  {topic.badge}
                </div>

                {/* Title */}
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950">
                  {topic.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-2 font-semibold text-blue-700">
                  {topic.subtitle}
                </p>

                {/* Description */}
                <p className="mt-4 min-h-[96px] text-sm leading-7 text-slate-600">
                  {topic.description}
                </p>

                {/* Topics */}
                <div className="mt-5 space-y-3">
                  {topic.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 text-sm font-medium text-slate-700"
                    >
                      <CheckCircle2
                        size={17}
                        strokeWidth={2}
                        className="shrink-0 text-emerald-600"
                      />

                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={topic.href}
                  className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-700/15 transition-all duration-200 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Explore Course

                  <ArrowRight
                    size={18}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </article>
            );
          })}
        </div>

        {/* Professional Trust Strip */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm md:flex-row">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={21} strokeWidth={2} />
          </div>

          <p className="text-sm font-semibold text-slate-600">
            Structured learning
            <span className="mx-2 text-slate-300">•</span>
            Practical ICU knowledge
            <span className="mx-2 text-slate-300">•</span>
            Professional course pathway
          </p>
        </div>
      </div>
    </section>
  );
}