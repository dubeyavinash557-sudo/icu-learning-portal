import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Crown,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export type CourseLandingData = {
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  longDescription: string;
  instructor: string;
  level: string;
  duration: string;
  lessons: number;
  students: string;
  rating: number;
  price: string;
  originalPrice?: string;
  isPremium: boolean;
  accent: "blue" | "cyan" | "emerald" | "violet" | "amber";

  modules: {
    title: string;
    description: string;
    lessons: number;
  }[];

  learningOutcomes: string[];
  practicalSkills: string[];
  includes: string[];
};

const accentStyles = {
  blue: {
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    icon: "bg-blue-600 text-white shadow-blue-600/20",
    soft: "bg-blue-50 text-blue-700",
    line: "from-blue-600 via-indigo-500 to-cyan-400",
    button: "bg-blue-700 shadow-blue-700/20 hover:bg-blue-800",
    text: "text-blue-700",
  },

  cyan: {
    badge: "border-cyan-200 bg-cyan-50 text-cyan-700",
    icon: "bg-cyan-600 text-white shadow-cyan-600/20",
    soft: "bg-cyan-50 text-cyan-700",
    line: "from-cyan-500 via-blue-600 to-indigo-600",
    button: "bg-cyan-600 shadow-cyan-600/20 hover:bg-cyan-700",
    text: "text-cyan-700",
  },

  emerald: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: "bg-emerald-600 text-white shadow-emerald-600/20",
    soft: "bg-emerald-50 text-emerald-700",
    line: "from-emerald-500 via-cyan-500 to-blue-600",
    button:
      "bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-700",
    text: "text-emerald-700",
  },

  violet: {
    badge: "border-violet-200 bg-violet-50 text-violet-700",
    icon: "bg-violet-600 text-white shadow-violet-600/20",
    soft: "bg-violet-50 text-violet-700",
    line: "from-violet-600 via-blue-600 to-cyan-500",
    button: "bg-violet-700 shadow-violet-700/20 hover:bg-violet-800",
    text: "text-violet-700",
  },

  amber: {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    icon: "bg-amber-500 text-white shadow-amber-500/20",
    soft: "bg-amber-50 text-amber-700",
    line: "from-amber-500 via-orange-500 to-blue-600",
    button: "bg-amber-600 shadow-amber-600/20 hover:bg-amber-700",
    text: "text-amber-700",
  },
};

export default function CourseLandingPage({
  course,
}: {
  course: CourseLandingData;
}) {
  const accent = accentStyles[course.accent];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute -right-40 top-20 h-[32rem] w-[32rem] rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="absolute bottom-[-12rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <ChevronRight size={14} />

            <Link
              href="/courses"
              className="transition hover:text-white"
            >
              Courses
            </Link>

            <ChevronRight size={14} />

            <span className="text-slate-200">
              {course.shortTitle}
            </span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            {/* LEFT */}

            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.14em] ${accent.badge}`}
              >
                <GraduationCap size={15} />

                {course.category}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {course.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {course.description}
              </p>

              {/* Rating */}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < Math.round(course.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-600"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-sm font-bold text-white">
                    {course.rating.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Users size={16} />
                  {course.students} learners
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-400"
                  />
                  Professional learning
                </div>
              </div>

              {/* CTA */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 ${accent.button}`}
                >
                  Start Learning

                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="#curriculum"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
                >
                  <BookOpen size={18} />

                  View Curriculum
                </Link>
              </div>
            </div>

            {/* RIGHT COURSE SUMMARY */}

            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl backdrop-blur-xl">
                <div
                  className={`h-1.5 bg-gradient-to-r ${accent.line}`}
                />

                <div className="p-6 sm:p-7">
                  {/* Course identity */}

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg ${accent.icon}`}
                    >
                      <GraduationCap size={27} />
                    </div>

                    {course.isPremium ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                        <Crown size={13} />
                        Premium
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                        <CheckCircle2 size={13} />
                        Free
                      </span>
                    )}
                  </div>

                  <h2 className="mt-6 text-xl font-black text-white">
                    {course.shortTitle}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {course.longDescription}
                  </p>

                  {/* Stats */}

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <SummaryStat
                      icon={<BookOpen size={17} />}
                      label="Lessons"
                      value={String(course.lessons)}
                    />

                    <SummaryStat
                      icon={<Clock3 size={17} />}
                      label="Duration"
                      value={course.duration}
                    />

                    <SummaryStat
                      icon={<GraduationCap size={17} />}
                      label="Level"
                      value={course.level}
                    />

                    <SummaryStat
                      icon={<Users size={17} />}
                      label="Learners"
                      value={course.students}
                    />
                  </div>

                  {/* Price */}

                  <div className="mt-6 border-t border-white/10 pt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                      Course Access
                    </p>

                    <div className="mt-2 flex items-end justify-between gap-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">
                          {course.price}
                        </span>

                        {course.originalPrice && (
                          <span className="text-sm font-bold text-slate-500 line-through">
                            {course.originalPrice}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-semibold text-slate-500">
                        Secure access
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/register"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    Enroll &amp; Start

                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COURSE NAVIGATION
      ====================================================== */}

      <section className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-5 py-3 text-sm font-bold sm:px-6 lg:px-8">
          <a
            href="#overview"
            className="whitespace-nowrap text-slate-600 transition hover:text-blue-700"
          >
            Overview
          </a>

          <a
            href="#curriculum"
            className="whitespace-nowrap text-slate-600 transition hover:text-blue-700"
          >
            Curriculum
          </a>

          <a
            href="#outcomes"
            className="whitespace-nowrap text-slate-600 transition hover:text-blue-700"
          >
            Outcomes
          </a>

          <a
            href="#skills"
            className="whitespace-nowrap text-slate-600 transition hover:text-blue-700"
          >
            Practical Skills
          </a>

          <a
            href="#included"
            className="whitespace-nowrap text-slate-600 transition hover:text-blue-700"
          >
            What&apos;s Included
          </a>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section
        id="overview"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          {/* MAIN */}

          <div className="space-y-8">
            {/* Overview */}

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading
                icon={<BookOpen size={21} />}
                title="Course Overview"
                description="A structured learning pathway designed for systematic understanding and practical application."
              />

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {course.learningOutcomes.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <span className="text-sm font-semibold leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}

            <section
              id="curriculum"
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                icon={<BookOpen size={21} />}
                title="Course Curriculum"
                description={`${course.modules.length} structured modules • ${course.lessons} lessons`}
              />

              <div className="mt-7 space-y-3">
                {course.modules.map((module, index) => (
                  <div
                    key={module.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-700">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="font-black text-slate-900">
                            {module.title}
                          </h3>

                          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">
                            <PlayCircle size={12} />
                            {module.lessons} lessons
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-700"
                  />

                  <div>
                    <p className="font-black text-blue-900">
                      Structured learning pathway
                    </p>

                    <p className="mt-1 text-sm leading-6 text-blue-800/80">
                      Lessons will be connected with progress tracking,
                      assessments and completion milestones as the LMS
                      learning system is implemented.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Outcomes */}

            <section
              id="outcomes"
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                icon={<Award size={21} />}
                title="What You Will Learn"
                description="Core competencies covered throughout the course."
              />

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {course.learningOutcomes.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <CheckCircle2 size={13} strokeWidth={3} />
                    </span>

                    <span className="text-sm leading-6 text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Practical Skills */}

            <section
              id="skills"
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                icon={<ShieldCheck size={21} />}
                title="Practical Skills"
                description="Practice-oriented areas included in the learning pathway."
              />

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {course.practicalSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <span className="text-sm font-semibold leading-6 text-slate-700">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}

          <aside className="space-y-6">
            {/* Instructor */}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                Course Instructor
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                  <GraduationCap size={25} />
                </div>

                <div>
                  <h3 className="font-black text-slate-950">
                    {course.instructor}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Critical Care Education
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-600">
                <ShieldCheck
                  size={16}
                  className="text-emerald-600"
                />

                Structured professional curriculum
              </div>
            </div>

            {/* Included */}

            <div
              id="included"
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                This Course Includes
              </p>

              <div className="mt-5 space-y-3">
                {course.includes.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <span className="text-sm leading-6 text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate */}

            <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg">
                <Award size={23} />
              </div>

              <h3 className="mt-5 font-black text-slate-950">
                Course Completion Certificate
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Eligible learners can work toward course completion
                and certificate issuance after the LMS completion
                requirements are satisfied.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-blue-700">
                <ShieldCheck size={15} />
                Verification-ready pathway
              </div>
            </div>

            {/* Final CTA */}

            <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-cyan-300">
                Ready to Learn?
              </p>

              <h3 className="mt-3 text-xl font-black">
                Start your {course.shortTitle} learning journey.
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Create your learner account and continue to the
                enrollment process.
              </p>

              <Link
                href="/register"
                className={`mt-5 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-black text-white transition ${accent.button}`}
              >
                Create Account

                <ArrowRight size={17} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          BOTTOM TRUST
      ====================================================== */}

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <TrustItem
              icon={<BookOpen size={20} />}
              title="Structured Curriculum"
              description="Organised modules and lessons for systematic learning."
            />

            <TrustItem
              icon={<PlayCircle size={20} />}
              title="Learning Resources"
              description="Designed to support video, notes and assessment-based learning."
            />

            <TrustItem
              icon={<Award size={20} />}
              title="Completion Pathway"
              description="Learning progress can connect with assessment and certification."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   SUMMARY STAT
============================================================ */

function SummaryStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
      <div className="flex items-center gap-2 text-cyan-300">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-1.5 truncate text-sm font-black text-white">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h2>

        <p className="mt-1.5 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   TRUST ITEM
============================================================ */

function TrustItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm ring-1 ring-slate-200">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}