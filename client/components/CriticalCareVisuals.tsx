import Link from "next/link";
import {
  Activity,
  ArrowRight,
  HeartPulse,
  Wind,
  Droplets,
  CheckCircle2,
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
    iconBox: "bg-blue-100 text-blue-700",
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
    iconBox: "bg-red-100 text-red-600",
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
    iconBox: "bg-emerald-100 text-emerald-700",
  },
];

export default function CriticalCareVisuals() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20">
      {/* Background decoration */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
            <Activity size={16} />
            Critical Care Skills
          </div>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Master the Skills That Matter in the ICU
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Develop practical knowledge in mechanical ventilation, ECG
            interpretation and ABG analysis through structured professional
            learning.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <article
                key={topic.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.09]"
              >
                {/* Top glow */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-blue-500/20" />

                {/* Icon */}
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${topic.iconBox}`}
                >
                  <Icon size={30} strokeWidth={2.2} />
                </div>

                {/* Badge */}
                <div className="mt-7 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold tracking-wider text-slate-400">
                  {topic.badge}
                </div>

                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  {topic.title}
                </h3>

                <p className="mt-2 font-semibold text-blue-300">
                  {topic.subtitle}
                </p>

                <p className="mt-4 min-h-[96px] text-sm leading-7 text-slate-400">
                  {topic.description}
                </p>

                {/* Topics */}
                <div className="mt-5 space-y-3">
                  {topic.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <CheckCircle2
                        size={17}
                        className="shrink-0 text-emerald-400"
                      />
                      {point}
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Link
                  href={topic.href}
                  className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 transition hover:bg-blue-50"
                >
                  Explore Course
                  <ArrowRight size={18} />
                </Link>
              </article>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-center">
          <p className="text-sm font-medium text-slate-400">
            Structured learning • Practical ICU knowledge • Professional
            course pathway
          </p>
        </div>
      </div>
    </section>
  );
}