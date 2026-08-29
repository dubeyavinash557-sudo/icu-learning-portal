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

type AccentStyle = {
  badge: string;
  icon: string;
  soft: string;
  line: string;
  button: string;
  text: string;
  ring: string;
  glow: string;
};

const accentStyles: Record<
  CourseLandingData["accent"],
  AccentStyle
> = {
  blue: {
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    icon: "bg-blue-600 text-white shadow-blue-600/20",
    soft: "bg-blue-50 text-blue-700",
    line: "from-blue-600 via-indigo-500 to-cyan-400",
    button:
      "bg-blue-700 shadow-blue-700/20 hover:bg-blue-800",
    text: "text-blue-700",
    ring: "ring-blue-100",
    glow: "bg-blue-500/10",
  },

  cyan: {
    badge: "border-cyan-200 bg-cyan-50 text-cyan-700",
    icon: "bg-cyan-600 text-white shadow-cyan-600/20",
    soft: "bg-cyan-50 text-cyan-700",
    line: "from-cyan-500 via-blue-600 to-indigo-600",
    button:
      "bg-cyan-600 shadow-cyan-600/20 hover:bg-cyan-700",
    text: "text-cyan-700",
    ring: "ring-cyan-100",
    glow: "bg-cyan-500/10",
  },

  emerald: {
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon:
      "bg-emerald-600 text-white shadow-emerald-600/20",
    soft: "bg-emerald-50 text-emerald-700",
    line:
      "from-emerald-500 via-cyan-500 to-blue-600",
    button:
      "bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-700",
    text: "text-emerald-700",
    ring: "ring-emerald-100",
    glow: "bg-emerald-500/10",
  },

  violet: {
    badge:
      "border-violet-200 bg-violet-50 text-violet-700",
    icon:
      "bg-violet-700 text-white shadow-violet-700/20",
    soft: "bg-violet-50 text-violet-700",
    line:
      "from-violet-600 via-blue-600 to-cyan-500",
    button:
      "bg-violet-700 shadow-violet-700/20 hover:bg-violet-800",
    text: "text-violet-700",
    ring: "ring-violet-100",
    glow: "bg-violet-500/10",
  },

  amber: {
    badge:
      "border-amber-200 bg-amber-50 text-amber-700",
    icon:
      "bg-amber-500 text-white shadow-amber-500/20",
    soft: "bg-amber-50 text-amber-700",
    line:
      "from-amber-500 via-orange-500 to-blue-600",
    button:
      "bg-amber-600 shadow-amber-600/20 hover:bg-amber-700",
    text: "text-amber-700",
    ring: "ring-amber-100",
    glow: "bg-amber-500/10",
  },
};

function safeRating(rating: number) {
  if (!Number.isFinite(rating)) {
    return 0;
  }

  return Math.min(5, Math.max(0, rating));
}

function safeLessons(lessons: number) {
  if (!Number.isFinite(lessons) || lessons < 0) {
    return 0;
  }

  return Math.round(lessons);
}

function getDisplayPrice(price?: string) {
  const value = price?.trim();

  return value || "Premium Access";
}

function getOriginalPriceLabel(price?: string) {
  const value = price?.trim();

  return value || "";
}

export default function CourseLandingPage({
  course,
}: {
  course: CourseLandingData;
}) {
  const accent =
    accentStyles[course.accent] ?? accentStyles.blue;

  const rating = safeRating(course.rating);
  const lessons = safeLessons(course.lessons);
  const displayPrice = getDisplayPrice(course.price);
  const originalPrice = getOriginalPriceLabel(
    course.originalPrice
  );

  const moduleCount = course.modules.length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          PREMIUM COURSE HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        <div
          className={`pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl ${accent.glow}`}
        />

        <div className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-cyan-500/[0.08] blur-3xl" />

        <div className="pointer-events-none absolute bottom-[-14rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-indigo-600/[0.08] blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400"
          >
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight
              size={14}
              aria-hidden="true"
            />

            <Link
              href="/courses"
              className="transition hover:text-white"
            >
              Courses
            </Link>

            <ChevronRight
              size={14}
              aria-hidden="true"
            />

            <span
              className="max-w-[280px] truncate text-slate-200"
              aria-current="page"
            >
              {course.shortTitle}
            </span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(340px,0.82fr)] lg:items-center">
            {/* =================================================
                HERO CONTENT
            ================================================== */}

            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.14em] ${accent.badge}`}
              >
                <GraduationCap
                  size={15}
                  aria-hidden="true"
                />

                {course.category}
              </div>

              {course.isPremium && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-300">
                  <Crown
                    size={14}
                    aria-hidden="true"
                  />

                  Premium Professional Course
                </div>
              )}

              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {course.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {course.description}
              </p>

              {/* Course Meta */}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-0.5"
                    aria-label={`Course rating ${rating.toFixed(
                      1
                    )} out of 5`}
                  >
                    {Array.from({ length: 5 }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          size={16}
                          aria-hidden="true"
                          className={
                            index + 1 <= Math.round(rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-600"
                          }
                        />
                      )
                    )}
                  </div>

                  <span className="text-sm font-bold text-white">
                    {rating.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Users
                    size={16}
                    aria-hidden="true"
                  />

                  {course.students} learners
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock3
                    size={16}
                    aria-hidden="true"
                  />

                  {course.duration}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-400"
                    aria-hidden="true"
                  />

                  Structured LMS pathway
                </div>
              </div>

              {/* Hero CTA */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-sm font-black text-white shadow-xl transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-slate-950 ${accent.button}`}
                >
                  {course.isPremium
                    ? "Enroll in Premium Course"
                    : "Start Learning"}

                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                  />
                </Link>

                <a
                  href="#curriculum"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <BookOpen
                    size={18}
                    aria-hidden="true"
                  />

                  View Curriculum
                </a>
              </div>

              {/* Trust Badges */}

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <TrustBadge
                  icon={<ShieldCheck size={16} />}
                  text="Secure Enrollment"
                />

                <TrustBadge
                  icon={<PlayCircle size={16} />}
                  text="Structured Lessons"
                />

                <TrustBadge
                  icon={<Award size={16} />}
                  text="Certificate Path"
                />
              </div>
            </div>

            {/* =================================================
                PREMIUM PURCHASE CARD
            ================================================== */}

            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl">
                <div
                  className={`h-1.5 bg-gradient-to-r ${accent.line}`}
                />

                <div className="bg-slate-950 p-6 text-white sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg ${accent.icon}`}
                    >
                      <GraduationCap
                        size={27}
                        aria-hidden="true"
                      />
                    </div>

                    {course.isPremium && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                        <Crown
                          size={13}
                          aria-hidden="true"
                        />

                        Premium
                      </span>
                    )}
                  </div>

                  <h2 className="mt-6 text-xl font-black">
                    {course.shortTitle}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {course.longDescription}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <SummaryStat
                      icon={<BookOpen size={17} />}
                      label="Lessons"
                      value={String(lessons)}
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

                                    {course.isPremium && (
                    <div className="mt-6 rounded-2xl border border-amber-300/15 bg-amber-300/[0.06] p-4">
                      <div className="flex items-start gap-3">
                        <Crown
                          size={19}
                          className="mt-0.5 shrink-0 text-amber-300"
                          aria-hidden="true"
                        />

                        <div>
                          <p className="text-sm font-black text-white">
                            Premium Course Access
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Access the complete structured
                            learning pathway after
                            enrollment.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 border-t border-white/10 pt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                      {course.isPremium
                        ? "Premium Course Fee"
                        : "Course Access"}
                    </p>

                    <div className="mt-2 flex items-end justify-between gap-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">
                          {displayPrice}
                        </span>

                        {originalPrice && (
                          <span className="text-sm font-bold text-slate-500 line-through">
                            {originalPrice}
                          </span>
                        )}
                      </div>

                      {originalPrice && (
                        <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black text-emerald-300">
                          LIMITED OFFER
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href="/register"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    {course.isPremium
                      ? "Get Premium Access"
                      : "Create Learning Account"}

                    <ArrowRight
                      size={17}
                      aria-hidden="true"
                    />
                  </Link>

                  <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] font-semibold text-slate-500">
                    <span>Secure enrollment</span>
                    <span aria-hidden="true">•</span>
                    <span>Structured learning</span>
                    <span aria-hidden="true">•</span>
                    <span>Certificate pathway</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero bottom stats */}

          <div className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
            <HeroMetric
              icon={<BookOpen size={18} />}
              label="Structured Modules"
              value={String(moduleCount)}
            />

            <HeroMetric
              icon={<PlayCircle size={18} />}
              label="Total Lessons"
              value={String(lessons)}
            />

            <HeroMetric
              icon={<Award size={18} />}
              label="Learning Path"
              value="Professional"
            />

            <HeroMetric
              icon={<ShieldCheck size={18} />}
              label="Access"
              value={course.isPremium ? "Premium" : "Standard"}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          COURSE NAVIGATION
      ====================================================== */}

      <section className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl overflow-x-auto px-5 sm:px-6 lg:px-8">
          <nav
            aria-label="Course sections"
            className="flex min-w-max items-center gap-7 py-3 text-sm font-bold"
          >
            <CourseNavLink href="#overview">
              Overview
            </CourseNavLink>

            <CourseNavLink href="#curriculum">
              Curriculum
            </CourseNavLink>

            <CourseNavLink href="#outcomes">
              Outcomes
            </CourseNavLink>

            <CourseNavLink href="#skills">
              Practical Skills
            </CourseNavLink>

            <CourseNavLink href="#included">
              What's Included
            </CourseNavLink>
          </nav>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section
        id="overview"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <div className="space-y-8">
            {/* =================================================
                COURSE OVERVIEW
            ================================================== */}

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading
                icon={<BookOpen size={21} />}
                title="Course Overview"
                description="A structured premium learning pathway designed for systematic understanding, revision and practical application."
                accent={accent}
              />

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {course.learningOutcomes.map(
                  (item) => (
                    <OutcomeCard
                      key={item}
                      text={item}
                    />
                  )
                )}
              </div>
            </section>

            {/* =================================================
                CURRICULUM
            ================================================== */}

            <section
              id="curriculum"
              className="scroll-mt-20 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                icon={<BookOpen size={21} />}
                title="Course Curriculum"
                description={`${moduleCount} structured modules • ${lessons} premium lessons`}
                accent={accent}
              />

              <div className="mt-7 space-y-3">
                {course.modules.map(
                  (module, index) => (
                    <CurriculumModule
                      key={`${module.title}-${index}`}
                      module={module}
                      index={index}
                      accent={accent}
                    />
                  )
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles
                    size={19}
                    className="mt-0.5 shrink-0 text-amber-700"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-black text-amber-900">
                      Premium structured pathway
                    </p>

                    <p className="mt-1 text-sm leading-6 text-amber-800/80">
                      The curriculum is designed around
                      progressive lessons, assessments,
                      learning progress and course
                      completion milestones.
                    </p>
                  </div>
                </div>
              </div>
            </section>

                        {/* =================================================
                LEARNING OUTCOMES
            ================================================== */}

            <section
              id="outcomes"
              className="scroll-mt-20 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                icon={<Award size={21} />}
                title="What You Will Learn"
                description="Core competencies covered throughout the professional learning pathway."
                accent={accent}
              />

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {course.learningOutcomes.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-emerald-100 hover:bg-emerald-50/40"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2
                          size={14}
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                      </span>

                      <span className="text-sm leading-6 text-slate-600">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* =================================================
                PRACTICAL SKILLS
            ================================================== */}

            <section
              id="skills"
              className="scroll-mt-20 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                icon={<ShieldCheck size={21} />}
                title="Practical Skills"
                description="Practice-oriented areas included in this professional course pathway."
                accent={accent}
              />

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {course.practicalSkills.map(
                  (skill) => (
                    <div
                      key={skill}
                      className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-100 hover:bg-white hover:shadow-sm"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <CheckCircle2
                          size={15}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </span>

                      <span className="text-sm font-semibold leading-6 text-slate-700">
                        {skill}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          {/* ===================================================
              SIDEBAR
          ==================================================== */}

          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            {/* =================================================
                COURSE SNAPSHOT
            ================================================== */}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                Course Snapshot
              </p>

              <div className="mt-5 space-y-3">
                <SnapshotRow
                  icon={<BookOpen size={17} />}
                  label="Lessons"
                  value={String(lessons)}
                />

                <SnapshotRow
                  icon={<Clock3 size={17} />}
                  label="Duration"
                  value={course.duration}
                />

                <SnapshotRow
                  icon={<GraduationCap size={17} />}
                  label="Level"
                  value={course.level}
                />

                <SnapshotRow
                  icon={<Users size={17} />}
                  label="Learners"
                  value={course.students}
                />

                <SnapshotRow
                  icon={<Star size={17} />}
                  label="Rating"
                  value={rating.toFixed(1)}
                />
              </div>
            </div>

            {/* =================================================
                INSTRUCTOR
            ================================================== */}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                Course Instructor
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                  <GraduationCap
                    size={25}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-black text-slate-950">
                    {course.instructor}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Critical Care Education
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-600">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />

                <span>
                  Structured professional curriculum
                </span>
              </div>
            </div>

            {/* =================================================
                INCLUDED
            ================================================== */}

            <div
              id="included"
              className="scroll-mt-20 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                Course Includes
              </p>

              <div className="mt-5 space-y-3">
                {course.includes.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />

                      <span className="text-sm leading-6 text-slate-600">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

                        {/* =================================================
                CERTIFICATE
            ================================================== */}

            <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg">
                <Award
                  size={23}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-5 font-black text-slate-950">
                Course Completion Certificate
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Eligible learners can work toward course
                completion and certificate issuance after
                the required LMS completion milestones are
                satisfied.
              </p>

              <div className="mt-5 flex items-start gap-2 text-xs font-bold text-blue-700">
                <ShieldCheck
                  size={15}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />

                <span>
                  Verification-ready learning pathway
                </span>
              </div>
            </div>

            {/* =================================================
                PREMIUM CTA
            ================================================== */}

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${accent.glow}`}
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300 ring-1 ring-amber-300/20">
                  <Crown
                    size={21}
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.15em] text-amber-300">
                  {course.isPremium
                    ? "Premium Access"
                    : "Learning Access"}
                </p>

                <h3 className="mt-3 text-xl font-black">
                  Start your {course.shortTitle} learning
                  journey.
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {course.isPremium
                    ? "Enroll in the premium program and continue through the structured course curriculum."
                    : "Create your learning account and continue through the structured course curriculum."}
                </p>

                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-400">
                      {course.isPremium
                        ? "Premium Fee"
                        : "Course Access"}
                    </span>

                    <span className="text-lg font-black text-white">
                      {displayPrice}
                    </span>
                  </div>

                  {originalPrice && (
                    <div className="mt-2 flex items-center justify-end gap-2">
                      <span className="text-xs text-slate-500 line-through">
                        {originalPrice}
                      </span>

                      <span className="text-[10px] font-black uppercase tracking-wide text-emerald-300">
                        Offer
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href="/register"
                  className={`mt-5 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-slate-950 ${accent.button}`}
                >
                  {course.isPremium
                    ? "Enroll Now"
                    : "Start Learning"}

                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          PROFESSIONAL TRUST SECTION
      ====================================================== */}

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="mb-7 text-center">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
              Built for Structured Learning
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              A Professional LMS Learning Experience
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Study through organized content, practical
              learning resources, assessments and completion
              milestones.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <TrustCard
              icon={<BookOpen size={20} />}
              title="Structured Curriculum"
              description="Organised modules and lessons for systematic professional learning."
            />

            <TrustCard
              icon={<PlayCircle size={20} />}
              title="Premium Learning Resources"
              description="Video lessons, study resources and assessments inside the LMS."
            />

            <TrustCard
              icon={<Award size={20} />}
              title="Completion Pathway"
              description="Learning progress can connect with assessment and certificate milestones."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 p-7 shadow-2xl sm:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-300">
                  <Crown
                    size={16}
                    aria-hidden="true"
                  />

                  Premium Professional Learning
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Build Your Critical Care Knowledge Step by
                  Step
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-300">
                  Join the learning pathway and progress
                  through structured lessons, practical
                  resources, assessments and completion
                  milestones.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <FinalTrustItem text="Structured curriculum" />
                  <FinalTrustItem text="Practical learning" />
                  <FinalTrustItem text="Assessment pathway" />
                  <FinalTrustItem text="Certificate eligibility" />
                </div>
              </div>

              <Link
                href="/register"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                {course.isPremium
                  ? "Get Premium Access"
                  : "Start Learning"}

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   HERO METRIC
============================================================ */

function HeroMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 border-white/10 px-5 py-4 sm:border-r last:border-r-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-cyan-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-black text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   COURSE NAV LINK
============================================================ */

function CourseNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="whitespace-nowrap text-slate-600 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {children}
    </a>
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

        <span className="truncate text-[10px] font-bold uppercase tracking-wide text-slate-500">
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
   SNAPSHOT ROW
============================================================ */

function SnapshotRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm ring-1 ring-slate-200">
          {icon}
        </span>

        <span className="truncate text-sm font-semibold text-slate-600">
          {label}
        </span>
      </div>

      <span className="shrink-0 text-sm font-black text-slate-950">
        {value}
      </span>
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
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: AccentStyle;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.soft} ring-1 ${accent.ring}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
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
   OUTCOME CARD
============================================================ */

function OutcomeCard({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-emerald-100 hover:bg-emerald-50/40">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2
          size={14}
          strokeWidth={3}
          aria-hidden="true"
        />
      </span>

      <span className="text-sm font-semibold leading-6 text-slate-700">
        {text}
      </span>
    </div>
  );
}

/* ============================================================
   CURRICULUM MODULE
============================================================ */

function CurriculumModule({
  module,
  index,
  accent,
}: {
  module: CourseLandingData["modules"][number];
  index: number;
  accent: AccentStyle;
}) {
  const moduleLessons =
    Number.isFinite(module.lessons) &&
    module.lessons >= 0
      ? Math.round(module.lessons)
      : 0;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${accent.soft}`}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-black leading-6 text-slate-900">
              {module.title}
            </h3>

            <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">
              <PlayCircle
                size={12}
                aria-hidden="true"
              />

              {moduleLessons} lessons
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {module.description}
          </p>
        </div>
      </div>
    </article>
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
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-xs font-bold text-slate-300">
      <span className="text-emerald-400">
        {icon}
      </span>

      <span>{text}</span>
    </div>
  );
}

/* ============================================================
   TRUST CARD
============================================================ */

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm ring-1 ring-slate-200 transition group-hover:bg-blue-50">
        {icon}
      </div>

      <div className="min-w-0">
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

/* ============================================================
   FINAL TRUST ITEM
============================================================ */

function FinalTrustItem({
  text,
}: {
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-300">
      <CheckCircle2
        size={14}
        className="text-emerald-400"
        aria-hidden="true"
      />

      {text}
    </span>
  );
}