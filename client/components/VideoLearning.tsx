import Link from "next/link";
import {
  Play,
  Clock3,
  LockKeyhole,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const lessons = [
  {
    icon: "🫁",
    title: "Mechanical Ventilator",
    subtitle: "Ventilator Modes & Settings",
    duration: "32 min",
    href: "/courses/ventilator",
    premium: true,
  },
  {
    icon: "❤️",
    title: "ECG Interpretation",
    subtitle: "ECG Rhythm Recognition",
    duration: "28 min",
    href: "/courses/ecg",
    premium: true,
  },
  {
    icon: "🩸",
    title: "ABG Analysis",
    subtitle: "Acid-Base Interpretation",
    duration: "25 min",
    href: "/courses/abg",
    premium: true,
  },
  {
    icon: "🏥",
    title: "ICU Nursing",
    subtitle: "Critical Care Essentials",
    duration: "30 min",
    href: "/courses/icu-nursing",
    premium: true,
  },
];

export default function VideoLearning() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20">
      {/* Background decoration */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
              <Sparkles size={16} />
              Premium Video Learning
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Learn Critical Care
              <span className="block text-blue-400">
                Through Practical Lessons
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Build practical ICU knowledge with structured video lessons
              covering ventilation, ECG, ABG analysis and critical care
              nursing.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-700 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-blue-400 hover:bg-blue-500/10"
          >
            Explore All Lessons
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Featured Video */}
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl lg:col-span-3">
            {/* Video preview */}
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-blue-500 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-cyan-400 blur-3xl" />
              </div>

              <div className="relative text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-600/40 transition hover:scale-105">
                  <Play size={38} fill="currentColor" />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-blue-300">
                  Featured Lesson
                </p>

                <h3 className="mt-2 text-3xl font-extrabold text-white">
                  Mechanical Ventilator Basics
                </h3>

                <p className="mt-3 text-slate-400">
                  Start your critical care learning journey
                </p>
              </div>

              {/* Premium badge */}
              <div className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
                ⭐ PREMIUM
              </div>
            </div>

            {/* Video information */}
            <div className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-400">
                    Mechanical Ventilation
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-white">
                    Understand Ventilator Modes & Settings
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock3 size={17} />
                  32 Minutes
                </div>
              </div>

              <Link
                href="/courses/ventilator"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
              >
                Start Lesson
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Lesson list */}
          <div className="space-y-4 lg:col-span-2">
            {lessons.map((lesson) => (
              <Link
                key={lesson.title}
                href={lesson.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-800"
              >
                {/* Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
                  {lesson.icon}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-bold text-white">
                      {lesson.title}
                    </h3>

                    {lesson.premium && (
                      <LockKeyhole
                        size={14}
                        className="shrink-0 text-yellow-400"
                      />
                    )}
                  </div>

                  <p className="mt-1 truncate text-sm text-slate-400">
                    {lesson.subtitle}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 size={13} />
                    {lesson.duration}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowRight size={17} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
                🎓 Premium Learning Experience
              </p>

              <h3 className="mt-2 text-2xl font-extrabold text-white">
                Learn at your own pace and build real ICU confidence.
              </h3>

              <p className="mt-2 text-slate-400">
                Structured lessons, notes, quizzes and certificates.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
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