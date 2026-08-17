import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Crown,
  GraduationCap,
  Languages,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";

import { getCourses } from "@/lib/course";

export default async function CoursesPage() {
  const courses = await getCourses();

  const totalCourses = courses.length;

  const totalLessons = courses.reduce(
    (total, course) => total + course.lessons.length,
    0
  );

  const premiumCourses = courses.filter(
    (course) => course.isPremium
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        {/* Decorative background */}

        <div className="absolute inset-0">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Hero Content */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 backdrop-blur">
                <GraduationCap size={17} />

                Professional ICU Education
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build Stronger ICU
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Clinical Knowledge
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Learn ICU nursing, mechanical ventilation, ECG,
                ABG analysis and medical coding through structured
                courses designed for healthcare professionals.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#course-list"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
                >
                  Explore Courses
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  <PlayCircle size={18} />
                  My Learning
                </Link>
              </div>

              {/* Trust Points */}

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-400"
                  />
                  Structured Learning
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-400"
                  />
                  Progress Tracking
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-400"
                  />
                  Course Certificate
                </div>
              </div>
            </div>

            {/* Hero Stats Card */}

            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <BookOpen size={24} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-400">
                      ICU Learning Portal
                    </p>

                    <h2 className="text-xl font-bold text-white">
                      Learning Library
                    </h2>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <HeroStat
                    value={String(totalCourses)}
                    label="Courses"
                  />

                  <HeroStat
                    value={String(totalLessons)}
                    label="Lessons"
                  />

                  <HeroStat
                    value={String(premiumCourses)}
                    label="Premium"
                  />

                  <HeroStat
                    value="24/7"
                    label="Self-Paced"
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-emerald-400">
                      <CheckCircle2 size={19} />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Learn at your own pace
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Access structured lessons and track your
                        learning progress from your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COURSE LIST SECTION
      ===================================================== */}

      <section
        id="course-list"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      >
        {/* Section Header */}

        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              <BookOpen size={16} />

              Our Learning Programs
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Explore Our Courses
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Choose a course that matches your professional
              learning goals and start building your ICU
              knowledge step by step.
            </p>
          </div>

          {courses.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Available Programs
              </p>

              <p className="mt-1 text-2xl font-extrabold text-blue-700">
                {totalCourses}
              </p>
            </div>
          )}
        </div>

        {/* Course Content */}

        {courses.length === 0 ? (
          <EmptyCourses />
        ) : (
          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        )}
      </section>

            {/* =====================================================
          LEARNING BENEFITS
      ===================================================== */}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            <BenefitCard
              icon={<GraduationCap size={23} />}
              title="Structured Learning"
              description="Follow organized lessons designed to make complex ICU topics easier to understand."
            />

            <BenefitCard
              icon={<PlayCircle size={23} />}
              title="Learn With Lessons"
              description="Study individual lessons and continue learning from where you stopped."
            />

            <BenefitCard
              icon={<CheckCircle2 size={23} />}
              title="Track Your Progress"
              description="Complete lessons, monitor your progress and work toward course completion."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ==========================================================
   COURSE CARD
========================================================== */

function CourseCard({
  course,
}: {
  course: Awaited<ReturnType<typeof getCourses>>[number];
}) {
  const price =
    typeof course.price === "number"
      ? course.price
      : Number(course.price);

  const formattedPrice =
    Number.isFinite(price) && price > 0
      ? `₹${price.toLocaleString("en-IN")}`
      : "Free";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-2xl">
      {/* Course Image */}

      <div className="relative h-56 overflow-hidden bg-slate-200">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800">
            <GraduationCap
              size={64}
              className="text-white/80"
            />
          </div>
        )}

        {/* Image Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Premium / Free Badge */}

        <div className="absolute left-4 top-4">
          {course.isPremium ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1.5 text-xs font-extrabold text-amber-950 shadow-lg">
              <Crown size={14} />
              Premium
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-3.5 py-1.5 text-xs font-extrabold text-emerald-950 shadow-lg">
              <CheckCircle2 size={14} />
              Free
            </span>
          )}
        </div>

        {/* Level */}

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800 shadow backdrop-blur">
            {course.level}
          </span>
        </div>

        {/* Rating */}

        <div className="absolute bottom-4 right-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            <Star
              size={13}
              className="fill-amber-400 text-amber-400"
            />

            {Number(course.rating).toFixed(1)}
          </span>
        </div>
      </div>

      {/* Card Body */}

      <div className="flex flex-1 flex-col p-6">
        {/* Course Title */}

        <h3 className="line-clamp-2 min-h-[3.5rem] text-xl font-extrabold leading-7 text-slate-900 transition group-hover:text-blue-700">
          {course.title}
        </h3>

        {/* Description */}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {course.description}
        </p>

        {/* Course Meta */}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <CourseMeta
            icon={<BookOpen size={15} />}
            value={`${course.lessons.length} Lessons`}
          />

          <CourseMeta
            icon={<Clock3 size={15} />}
            value={formatDuration(course.duration)}
          />

          <CourseMeta
            icon={<Languages size={15} />}
            value={course.language}
          />

          <CourseMeta
            icon={<Users size={15} />}
            value={`${course.students} Students`}
          />
        </div>

        {/* Divider */}

        <div className="my-5 border-t border-slate-100" />

        {/* Price + CTA */}

        <div className="mt-auto">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Course Price
              </p>

              <p className="mt-1 text-2xl font-extrabold text-blue-700">
                {formattedPrice}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium text-slate-400">
                Instructor
              </p>

              <p className="mt-1 max-w-[130px] truncate text-sm font-bold text-slate-700">
                {course.instructor}
              </p>
            </div>
          </div>

          {/* CTA */}

          <Link
            href={`/courses/${course.id}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-700/15 transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Course

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================
   COURSE META
========================================================== */

function CourseMeta({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
      <span className="shrink-0 text-blue-600">
        {icon}
      </span>

      <span className="truncate text-xs font-semibold text-slate-600">
        {value}
      </span>
    </div>
  );
}

/* ==========================================================
   HERO STAT
========================================================== */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-2xl font-extrabold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* ==========================================================
   BENEFIT CARD
========================================================== */

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-200 hover:bg-blue-50/40">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
          {icon}
        </div>

        <div>
          <h3 className="font-extrabold text-slate-900">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   EMPTY COURSES STATE
========================================================== */

function EmptyCourses() {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white shadow-sm">
      <div className="mx-auto max-w-xl px-6 py-16 text-center sm:px-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
          <BookOpen size={38} />
        </div>

        <h2 className="mt-6 text-2xl font-extrabold text-slate-900">
          Courses Coming Soon
        </h2>

        <p className="mt-3 text-base leading-7 text-slate-600">
          No courses are currently available in the
          learning library. Please check again after
          courses have been added.
        </p>

        <div className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-600">
          <GraduationCap size={17} />
          ICU Learning Portal
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   DURATION FORMATTER
   Database duration is treated as minutes.
========================================================== */

function formatDuration(minutes: number) {
  if (
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return "Self-paced";
  }

  const hours = Math.floor(minutes / 60);

  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${remainingMinutes}m`;
}