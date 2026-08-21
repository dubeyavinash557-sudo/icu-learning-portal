import {
  Award,
  BookOpenCheck,
  FileText,
  MonitorPlay,
  ShieldCheck,
  Smartphone,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    icon: UsersRound,
    title: "ICU Expert Trainers",
    description:
      "Learn from experienced critical care professionals with structured, clinically focused teaching.",
  },
  {
    icon: MonitorPlay,
    title: "HD Video Classes",
    description:
      "Follow clear, structured video lessons designed to make complex ICU concepts easier to understand.",
  },
  {
    icon: FileText,
    title: "Professional PDF Notes",
    description:
      "Access organized ICU study notes and revision resources to support learning beyond video lessons.",
  },
  {
    icon: BookOpenCheck,
    title: "Practice MCQs & Assessments",
    description:
      "Test your understanding with structured quizzes, assessments and knowledge-based practice.",
  },
  {
    icon: Award,
    title: "Course Certificates",
    description:
      "Complete eligible learning programs and receive professional course completion certificates.",
  },
  {
    icon: Smartphone,
    title: "Learn Anywhere",
    description:
      "Access your learning experience across desktop, tablet and mobile devices at your convenience.",
  },
];

export default function About() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-8 lg:py-24">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            <ShieldCheck size={17} />

            Professional Critical Care Education
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Why Choose{" "}
            <span className="text-blue-700">
              ICU Learning Portal?
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            India&apos;s professional critical care learning platform
            designed to help healthcare learners build structured
            knowledge, practical confidence and continuous clinical
            learning habits.
          </p>

        </div>

        {/* =====================================================
            BENEFITS GRID
        ===================================================== */}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {benefits.map((benefit) => {

            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                {/* Top accent */}

                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-0 transition duration-300 group-hover:opacity-100" />

                {/* Icon */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition duration-300 group-hover:bg-blue-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-700/20">
                  <Icon size={26} strokeWidth={2} />
                </div>

                {/* Title */}

                <h3 className="mt-6 text-xl font-black tracking-tight text-slate-950 transition group-hover:text-blue-700">
                  {benefit.title}
                </h3>

                {/* Description */}

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {benefit.description}
                </p>

                {/* Bottom indicator */}

                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  ICU Learning Portal
                </div>
              </article>
            );
          })}

        </div>

        {/* =====================================================
            TRUST STRIP
        ===================================================== */}

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <ShieldCheck size={24} />
              </div>

              <div>

                <h3 className="font-black text-slate-950">
                  Built for structured ICU learning
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Courses, lessons, notes, assessments, progress
                  tracking and certificates are designed to work
                  together as one learning experience.
                </p>

              </div>

            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">
              <Award
                size={18}
                className="text-blue-600"
              />

              Professional Learning
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}