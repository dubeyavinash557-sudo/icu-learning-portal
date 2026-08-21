import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartPulse,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Video,
  Wind,
  Zap,
} from "lucide-react";

const modules = [
  {
    number: "01",
    category: "MECHANICAL VENTILATION",
    title: "Ventilator Modes & Settings",
    description:
      "Build a strong foundation in ventilator modes, settings, alarms, oxygenation and practical ICU management.",
    duration: "32 min",
    curriculum: "12 lessons",
    href: "/courses/ventilator",
    icon: Wind,
    iconClass: "bg-blue-50 text-blue-700",
    accent: "from-blue-600 to-cyan-500",
    topics: ["Ventilator Modes", "PEEP & FiO₂", "Alarm Management"],
  },
  {
    number: "02",
    category: "CARDIAC CARE",
    title: "ECG Interpretation",
    description:
      "Develop confidence in ECG fundamentals, rhythm recognition, heart blocks and critical-care ECG patterns.",
    duration: "28 min",
    curriculum: "10 lessons",
    href: "/courses/ecg",
    icon: HeartPulse,
    iconClass: "bg-rose-50 text-rose-600",
    accent: "from-rose-600 to-orange-500",
    topics: ["ECG Basics", "Arrhythmias", "STEMI Recognition"],
  },
  {
    number: "03",
    category: "CRITICAL CARE",
    title: "ABG Analysis",
    description:
      "Learn a systematic approach to pH, PaCO₂, HCO₃⁻ and acid-base interpretation using ICU-focused examples.",
    duration: "25 min",
    curriculum: "9 lessons",
    href: "/courses/abg",
    icon: Activity,
    iconClass: "bg-emerald-50 text-emerald-700",
    accent: "from-emerald-600 to-teal-500",
    topics: ["pH & PaCO₂", "HCO₃⁻ Analysis", "ICU Case Studies"],
  },
  {
    number: "04",
    category: "ICU NURSING",
    title: "Critical Care Essentials",
    description:
      "Strengthen essential ICU nursing knowledge covering assessment, monitoring, emergency care and patient safety.",
    duration: "30 min",
    curriculum: "15 lessons",
    href: "/courses/icu-nursing",
    icon: Stethoscope,
    iconClass: "bg-violet-50 text-violet-700",
    accent: "from-violet-600 to-blue-600",
    topics: ["Patient Assessment", "ICU Monitoring", "Emergency Care"],
  },
];

export default function VideoLearning() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">
            <Video size={15} />
            Professional Video Academy
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Learn ICU Skills
            <span className="block bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Through Structured Video Learning
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Learn critical-care concepts through structured video lessons,
            practical explanations and professionally organized ICU
            learning pathways.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <TrustBadge
              icon={<Video size={15} />}
              text="HD Video Lessons"
            />

            <TrustBadge
              icon={<CheckCircle2 size={15} />}
              text="Structured Curriculum"
            />

            <TrustBadge
              icon={<ShieldCheck size={15} />}
              text="Professional Learning"
            />

            <TrustBadge
              icon={<LockKeyhole size={15} />}
              text="Premium Content"
            />
          </div>
        </div>

        {/* Featured learning experience */}
        <div className="mt-14 grid gap-8 xl:grid-cols-[1.35fr_0.9fr]">
          {/* Featured Lesson */}
          <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            {/* Video preview */}
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              {/* Medical interface background */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(37,99,235,0.28),transparent_35%),radial-gradient(circle_at_75%_70%,rgba(6,182,212,0.20),transparent_35%)]" />

                <div className="absolute inset-0 opacity-20">
                  <div className="absolute left-[10%] right-[10%] top-[22%] h-px bg-cyan-400" />
                  <div className="absolute left-[10%] right-[10%] top-[48%] h-px bg-blue-400" />
                  <div className="absolute left-[10%] right-[10%] top-[74%] h-px bg-cyan-400" />
                </div>

                {/* Clinical monitor */}
                <div className="absolute left-1/2 top-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                        <Wind size={22} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                          Featured Module
                        </p>

                        <p className="mt-1 text-sm font-bold text-white">
                          Mechanical Ventilation
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
                      Premium
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <MonitorMetric label="Mode" value="AC / VC" />
                    <MonitorMetric label="PEEP" value="5 cmH₂O" />
                    <MonitorMetric label="FiO₂" value="40%" />
                  </div>

                  <div className="mt-5 h-16 overflow-hidden rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03]">
                    <svg
                      viewBox="0 0 600 100"
                      className="h-full w-full"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 58 C25 58 30 58 45 58 C60 58 64 30 78 30 C91 30 94 72 110 72 C125 72 130 58 145 58 C160 58 166 58 180 58 C195 58 200 26 215 26 C230 26 233 70 250 70 C265 70 270 58 285 58 C300 58 305 58 320 58 C335 58 340 31 355 31 C370 31 375 71 390 71 C405 71 410 58 425 58 C440 58 445 58 460 58 C475 58 480 28 495 28 C510 28 515 70 530 70 C545 70 550 58 565 58 C580 58 590 58 600 58"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-cyan-400"
                      />
                    </svg>
                  </div>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    href="/courses/ventilator"
                    aria-label="Start Mechanical Ventilator course"
                    className="group flex h-20 w-20 items-center justify-center rounded-full bg-white text-blue-700 shadow-[0_12px_50px_rgba(0,0,0,0.35)] transition duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white sm:h-24 sm:w-24"
                  >
                    <Play
                      size={34}
                      fill="currentColor"
                      className="ml-1 transition-transform group-hover:scale-110"
                    />
                  </Link>
                </div>

                {/* Featured label */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-cyan-300">
                      Featured Lesson
                    </p>

                    <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                      Mechanical Ventilator Basics
                    </h3>
                  </div>

                  <span className="hidden rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-bold text-slate-300 backdrop-blur-sm sm:block">
                    32 min
                  </span>
                </div>
              </div>
            </div>

            {/* Featured information */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-blue-700">
                    <Wind size={15} />
                    Mechanical Ventilation
                  </div>

                  <h3 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                    Understand Ventilator Modes, Settings & Alarms
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Start with the fundamentals of mechanical ventilation
                    and progressively build practical ICU knowledge through
                    structured lessons.
                  </p>
                </div>

                <Link
                  href="/courses/ventilator"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
                >
                  Start Learning
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <FeatureStat
                  icon={<Clock3 size={16} />}
                  label="Duration"
                  value="32 min"
                />

                <FeatureStat
                  icon={<Video size={16} />}
                  label="Format"
                  value="HD Video"
                />

                <FeatureStat
                  icon={<Activity size={16} />}
                  label="Learning"
                  value="Practical"
                />

                <FeatureStat
                  icon={<LockKeyhole size={16} />}
                  label="Access"
                  value="Premium"
                />
              </div>
            </div>
          </article>

          {/* Learning Library */}
          <div className="flex min-w-0 flex-col">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
                  Learning Library
                </p>

                <h3 className="mt-1 text-2xl font-black text-slate-950">
                  Popular ICU Modules
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Explore structured learning tracks
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
                4 learning tracks
              </span>
            </div>

            <div className="space-y-3">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <Link
                    key={module.title}
                    href={module.href}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                  >
                    <div
                      className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${module.accent}`}
                    />

                    <div className="flex items-start gap-4 pl-1">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${module.iconClass}`}
                      >
                        <Icon size={23} strokeWidth={2} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-extrabold text-slate-400">
                                {module.number}
                              </span>

                              <p className="truncate text-[9px] font-extrabold uppercase tracking-[0.13em] text-blue-700">
                                {module.category}
                              </p>
                            </div>

                            <h4 className="mt-1 text-sm font-extrabold text-slate-950 sm:text-base">
                              {module.title}
                            </h4>
                          </div>

                          <ArrowRight
                            size={17}
                            className="mt-1 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-700"
                          />
                        </div>

                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                          {module.description}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <ModuleMeta icon={<Clock3 size={12} />}>
                            {module.duration}
                          </ModuleMeta>

                          <ModuleMeta icon={<Video size={12} />}>
                            {module.curriculum}
                          </ModuleMeta>

                          <ModuleMeta
                            icon={<LockKeyhole size={11} />}
                            premium
                          >
                            Premium
                          </ModuleMeta>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Curriculum highlights */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <LearningHighlight
            icon={<Wind size={20} />}
            title="Clinical Demonstration"
            description="Learn important ICU concepts through practical, structured explanations."
          />

          <LearningHighlight
            icon={<Zap size={20} />}
            title="High-Yield Learning"
            description="Focus on essential concepts that support clinical understanding and revision."
          />

          <LearningHighlight
            icon={<ShieldCheck size={20} />}
            title="Professional Pathway"
            description="Progress from foundational knowledge toward advanced critical-care learning."
          />
        </div>

        {/* Premium CTA */}
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-700 via-blue-700 to-cyan-600 p-6 shadow-xl shadow-blue-900/10 sm:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl text-white">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-100">
                <Sparkles size={15} />
                Complete ICU Learning Experience
              </div>

              <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                Videos + Notes + Quizzes + Certificates
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-50">
                Build a structured learning routine with professional
                courses, study resources, assessments, progress tracking
                and completion certificates.
              </p>
            </div>

            <Link
              href="/courses"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              Explore Courses
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

/* ============================================================
   TRUST BADGE
============================================================ */

function TrustBadge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm">
      <span className="text-blue-700">{icon}</span>
      {text}
    </div>
  );
}

/* ============================================================
   FEATURE STAT
============================================================ */

function FeatureStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-blue-700">
        {icon}

        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-1.5 text-sm font-extrabold text-slate-950">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   MODULE META
============================================================ */

function ModuleMeta({
  icon,
  children,
  premium = false,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  premium?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${
        premium
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : "border-slate-200 bg-slate-50 text-slate-500"
      }`}
    >
      {icon}
      {children}
    </span>
  );
}

/* ============================================================
   LEARNING HIGHLIGHT
============================================================ */

function LearningHighlight({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <h4 className="mt-4 text-base font-extrabold text-slate-950">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

/* ============================================================
   MONITOR METRIC
============================================================ */

function MonitorMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2.5">
      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xs font-extrabold text-white">{value}</p>
    </div>
  );
}