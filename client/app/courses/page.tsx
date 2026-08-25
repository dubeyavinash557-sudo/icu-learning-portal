import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Crown,
  FileText,
  GraduationCap,
  Languages,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";

import { getCourses } from "@/lib/course";

export default async function CoursesPage() {
  const allCourses = await getCourses();

  // Public course catalog intentionally exposes premium programs only.
  // Free/demo courses are not shown on the public LMS catalog.
  const courses = allCourses.filter((course) => course.isPremium);

  const totalCourses = courses.length;

  const totalLessons = courses.reduce(
    (total, course) => total + course.lessons.length,
    0
  );

  const totalStudents = courses.reduce(
    (total, course) => total + Number(course.students || 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-blue-600/10 blur-3xl" />

          <div className="absolute bottom-[-15rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                <GraduationCap size={16} />
                ICU Learning Portal
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium ICU & Critical Care
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Learning Programs
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Build professional critical-care knowledge through structured
                premium courses, video lessons, study resources, assessments,
                progress tracking and certificate pathways.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#course-list"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-7 py-4 text-sm font-black text-white shadow-xl shadow-cyan-500/20 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  Browse Premium Courses
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <PlayCircle size={18} />
                  My Learning
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
                <TrustItem label="Premium Courses" />
                <TrustItem label="Structured Lessons" />
                <TrustItem label="Progress Tracking" />
                <TrustItem label="Certificates" />
              </div>
            </div>

            {/* RIGHT */}

            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                      <Crown size={27} />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">
                        Premium Learning Library
                      </p>

                      <h2 className="mt-1 text-xl font-black text-white">
                        Professional Course Collection
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <HeroStat
                    value={String(totalCourses)}
                    label="Premium Courses"
                    icon={<BookOpen size={18} />}
                  />

                  <HeroStat
                    value={String(totalLessons)}
                    label="Lessons"
                    icon={<Video size={18} />}
                  />

                  <HeroStat
                    value="100%"
                    label="Premium Access"
                    icon={<Crown size={18} />}
                  />

                  <HeroStat
                    value={totalStudents.toLocaleString("en-IN")}
                    label="Learners"
                    icon={<Users size={18} />}
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                      <ShieldCheck size={19} />
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        Secure premium learning
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Premium courses, lessons, resources and assessments are
                        organized inside the ICU Learning Portal LMS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* =========================================================
          CATALOG HEADER
      ========================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-blue-700">
                <Sparkles size={16} />
                Premium Course Catalog
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                Professional Learning Programs
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Choose a premium program and access its structured curriculum,
                lessons and learning pathway.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <CatalogStat
                label="Premium Courses"
                value={totalCourses}
              />

              <CatalogStat
                label="Lessons"
                value={totalLessons}
              />

              <CatalogStat
                label="Learners"
                value={totalStudents}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COURSE CATALOG
      ========================================================== */}

      <section
        id="course-list"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Premium Programs
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Choose Your Critical Care Program
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-600">
              Explore premium ICU and healthcare learning programs designed for
              systematic study, practical understanding and long-term
              professional development.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <Crown
                size={17}
                className="text-amber-600"
              />

              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                  Premium Library
                </p>

                <p className="mt-1 text-lg font-black text-slate-900">
                  {totalCourses} Programs
                </p>
              </div>
            </div>
          </div>
        </div>

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

      {/* =========================================================
          LMS FEATURES
      ========================================================== */}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
              Premium Learning Experience
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Built Around Serious Learning
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Each premium program is organized as a structured LMS learning
              experience rather than a simple downloadable-content page.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Video size={23} />}
              title="Video Lessons"
              description="Follow structured lessons designed for focused learning, revision and clinical understanding."
            />

            <FeatureCard
              icon={<FileText size={23} />}
              title="Premium Resources"
              description="Access protected course resources and study material as part of your enrolled program."
            />

            <FeatureCard
              icon={<CheckCircle2 size={23} />}
              title="Assessments"
              description="Use quizzes and learning checks to evaluate understanding across the curriculum."
            />

            <FeatureCard
              icon={<Award size={23} />}
              title="Certificates"
              description="Eligible learners can progress toward course completion and certificate issuance."
            />
          </div>
        </div>
      </section>

            {/* =========================================================
          PREMIUM VALUE SECTION
      ========================================================== */}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            <ValueCard
              icon={<GraduationCap size={22} />}
              title="Professional Curriculum"
              description="Course structures are organized into clear learning modules so students can progress systematically."
            />

            <ValueCard
              icon={<ShieldCheck size={22} />}
              title="Protected Course Access"
              description="Premium learning content is intended for enrolled learners rather than public free access."
            />

            <ValueCard
              icon={<Award size={22} />}
              title="Learning Completion Path"
              description="Progress, assessment and completion can connect to the portal's certificate workflow."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 p-7 shadow-2xl sm:p-10 lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-300">
                  <Crown size={16} />
                  Premium ICU Education
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Invest in Structured Critical Care Learning
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-300">
                  Select a premium course, review the curriculum and continue
                  through the ICU Learning Portal with protected learning
                  access.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    Premium Access
                  </span>

                  <span className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    Structured Lessons
                  </span>

                  <span className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    Progress Tracking
                  </span>

                  <span className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    Certificate Pathway
                  </span>
                </div>
              </div>

              <Link
                href="#course-list"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Explore Premium Courses
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   COURSE CARD
================================================================ */

function CourseCard({
  course,
}: {
  course: Awaited<ReturnType<typeof getCourses>>[number];
}) {
  const price =
    typeof course.price === "number"
      ? course.price
      : Number(course.price);

  const students = Number(course.students || 0);
  const rating = Number(course.rating || 0);
  const lessons = course.lessons.length;

  const formattedPrice =
    Number.isFinite(price) && price > 0
      ? `₹${price.toLocaleString("en-IN")}`
      : "Premium Access";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl">
      {/* IMAGE */}

      <div className="relative h-56 overflow-hidden bg-slate-200">
        {course.image ? (
          <Image
            src={course.image}
            alt={`${course.title} premium course`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-700 via-blue-700 to-indigo-800">
            <GraduationCap
              size={70}
              className="text-white/80"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

        {/* PREMIUM */}

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-2 text-xs font-black text-amber-950 shadow-lg">
            <Crown size={13} />
            PREMIUM
          </span>
        </div>

        {/* LEVEL */}

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-lg backdrop-blur">
            {course.level}
          </span>
        </div>

        {/* RATING */}

        <div className="absolute bottom-4 right-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            <Star
              size={13}
              className="fill-amber-400 text-amber-400"
            />

            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* BODY */}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-xs font-black uppercase tracking-[0.12em] text-blue-700">
            {course.instructor}
          </span>

          <span className="shrink-0 text-xs font-bold text-slate-400">
            {course.language}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-xl font-black leading-7 text-slate-950 transition group-hover:text-blue-700">
          {course.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {course.description}
        </p>

        {/* META */}

        <div className="mt-6 grid grid-cols-2 gap-2">
          <CourseMeta
            icon={<BookOpen size={15} />}
            value={`${lessons} Lessons`}
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
            value={`${students.toLocaleString("en-IN")} Learners`}
          />
        </div>

        {/* COURSE VALUE */}

        <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Crown size={17} />
            </div>

            <div>
              <p className="text-sm font-black text-slate-800">
                Premium learning access
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                Protected lessons, course resources, assessments and progress
                tracking are available through enrollment.
              </p>
            </div>
          </div>
        </div>

        <div className="my-5 border-t border-slate-100" />

        {/* PRICE */}

        <div className="mt-auto">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                Premium Course Fee
              </p>

              <p className="mt-1 text-2xl font-black text-blue-700">
                {formattedPrice}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                Learners
              </p>

              <p className="mt-1 text-sm font-black text-slate-700">
                {students.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <Link
            href={`/courses/${course.id}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Course & Pricing

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ================================================================
   COURSE META
================================================================ */

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

      <span className="truncate text-xs font-bold text-slate-600">
        {value}
      </span>
    </div>
  );
}

/* ================================================================
   TRUST ITEM
================================================================ */

function TrustItem({
  label,
}: {
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        size={16}
        className="text-emerald-400"
      />

      {label}
    </div>
  );
}

/* ================================================================
   HERO STAT
================================================================ */

function HeroStat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl font-black text-white">
          {value}
        </p>

        <span className="text-cyan-300">
          {icon}
        </span>
      </div>

      <p className="mt-1 text-xs font-bold text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* ================================================================
   CATALOG STAT
================================================================ */

function CatalogStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="min-w-[96px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-slate-900">
        {value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}

/* ================================================================
   FEATURE CARD
================================================================ */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}

/* ================================================================
   VALUE CARD
================================================================ */

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}

/* ================================================================
   EMPTY COURSES
================================================================ */

function EmptyCourses() {
  return (
    <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-xl px-6 py-20 text-center sm:px-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-600">
          <Crown size={38} />
        </div>

        <h2 className="mt-6 text-2xl font-black text-slate-900">
          Premium Courses Are Being Prepared
        </h2>

        <p className="mt-3 text-base leading-7 text-slate-600">
          No premium course is currently published in the catalog. Once a
          premium program is published, it will appear here with its curriculum
          and enrollment options.
        </p>

        <div className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600">
          <GraduationCap size={17} />
          ICU Learning Portal
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   DURATION FORMATTER
================================================================ */

function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes) || minutes <= 0) {
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