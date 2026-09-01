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

import {
  getCourseImageConfig,
  hasCourseImage,
} from "./_components/course-images";

export const dynamic = "force-dynamic";

/* ================================================================
   ICU LEARNING PORTAL
   PROFESSIONAL PREMIUM COURSE CATALOG

   File:
   app/courses/page.tsx

   Design goals:
   - Professional LMS presentation
   - 12 premium programs
   - Course-specific professional imagery
   - Curriculum preview
   - Pricing
   - Ratings
   - Learner statistics
   - Premium access messaging
   - Responsive desktop/tablet/mobile layout
================================================================ */

export default async function CoursesPage() {
  const allCourses = await getCourses();

  /*
   * IMPORTANT:
   * Public /courses is the PREMIUM PROGRAM catalog.
   *
   * Demo/free learning will be presented separately later.
   */
  const courses = allCourses.filter(
    (course) => course.isPremium
  );

  const totalCourses = courses.length;

  const totalLessons = courses.reduce(
    (total, course) =>
      total + course.lessons.length,
    0
  );

  const totalStudents = courses.reduce(
    (total, course) =>
      total + Number(course.students || 0),
    0
  );

  const averageRating =
    courses.length > 0
      ? courses.reduce(
          (total, course) =>
            total + Number(course.rating || 0),
          0
        ) / courses.length
      : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================================
          PREMIUM HERO
      ========================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        {/* Decorative background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-blue-600/10 blur-3xl" />

          <div className="absolute bottom-[-18rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* =====================================================
                HERO LEFT
            ====================================================== */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-cyan-300">
                <GraduationCap size={16} />

                Professional ICU Education
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <HeroBadge
                  icon={<Crown size={13} />}
                  text="Premium Programs"
                />

                <HeroBadge
                  icon={<Award size={13} />}
                  text="Certificate Pathway"
                />

                <HeroBadge
                  icon={<Sparkles size={13} />}
                  text="Expert Designed"
                />
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium ICU & Critical Care
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Learning Programs
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Build professional critical-care knowledge
                through structured programs, clinical lessons,
                assessments, learning resources, progress
                tracking and certificate pathways.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#course-list"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  Explore All Programs

                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10"
                >
                  <PlayCircle size={18} />

                  My Learning
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <TrustItem
                  icon={<Clock3 size={16} />}
                  label="Self Paced"
                />

                <TrustItem
                  icon={<Video size={16} />}
                  label="Video Lessons"
                />

                <TrustItem
                  icon={<FileText size={16} />}
                  label="Study Resources"
                />

                <TrustItem
                  icon={<ShieldCheck size={16} />}
                  label="Secure Access"
                />
              </div>
            </div>

            {/* =====================================================
                HERO RIGHT
            ====================================================== */}

            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                      <Crown size={27} />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">
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
                    label="Programs"
                    icon={<BookOpen size={18} />}
                  />

                  <HeroStat
                    value={String(totalLessons)}
                    label="Lessons"
                    icon={<Video size={18} />}
                  />

                  <HeroStat
                    value={
                      averageRating > 0
                        ? averageRating.toFixed(1)
                        : "—"
                    }
                    label="Average Rating"
                    icon={<Star size={18} />}
                  />

                  <HeroStat
                    value={totalStudents.toLocaleString(
                      "en-IN"
                    )}
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
                        Structured LMS Learning
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Study through organized courses,
                        lessons, assessments, progress tracking
                        and certificate pathways.
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
          COURSE CATALOG HEADER
      ========================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                <Sparkles size={14} />

                Our Programs
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Choose Your Critical Care Program
              </h2>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Each program is designed to build your
                knowledge step by step with structured
                learning, practical understanding and
                professional assessments.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <CatalogStat
                value={totalCourses}
                label="Programs"
              />

              <CatalogStat
                value={totalLessons}
                label="Lessons"
              />

              <CatalogStat
                value={totalStudents}
                label="Learners"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COURSE LIST
      ========================================================== */}

      <section
        id="course-list"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        {/* Section intro */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
              Premium Course Library
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Professional Learning Programs
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Explore the complete premium ICU learning
              collection.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black text-amber-800 sm:self-auto">
            <Crown size={14} />

            Premium LMS Library
          </div>
        </div>

        {courses.length === 0 ? (
          <EmptyCourses />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course, index) => (
              <ProfessionalCourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          LMS EXPERIENCE
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
              The ICU Learning Portal is structured as an
              LMS learning environment rather than a simple
              course listing.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Video size={23} />}
              title="Video Lessons"
              description="Structured lessons for focused study, revision and clinical understanding."
            />

            <FeatureCard
              icon={<FileText size={23} />}
              title="Premium Resources"
              description="Protected study resources organized around the enrolled learning program."
            />

            <FeatureCard
              icon={<CheckCircle2 size={23} />}
              title="Assessments"
              description="Course assessments and quizzes help learners check their understanding."
            />

            <FeatureCard
              icon={<Award size={23} />}
              title="Certificates"
              description="Eligible learners can progress toward completion and certificate issuance."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUE STRIP
      ========================================================== */}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-5 lg:grid-cols-3">
            <ValueCard
              icon={<GraduationCap size={22} />}
              title="Professional Curriculum"
              description="Learn through organized course structures and progressive lessons."
            />

            <ValueCard
              icon={<ShieldCheck size={22} />}
              title="Protected Learning"
              description="Premium lessons and learning resources are designed for authorized learners."
            />

            <ValueCard
              icon={<Award size={22} />}
              title="Completion Pathway"
              description="Course progress, assessments and completion connect with the portal's learning workflow."
            />
          </div>
        </div>
      </section>

            {/* =========================================================
          FINAL PREMIUM CTA
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
                  Build Your ICU Knowledge Step by Step
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-300">
                  Choose the program that matches your
                  professional learning goal and continue
                  your journey through the ICU Learning Portal.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-300">
                  <CTAFeature text="Premium Programs" />

                  <CTAFeature text="Structured Lessons" />

                  <CTAFeature text="Assessments" />

                  <CTAFeature text="Certificate Pathway" />
                </div>
              </div>

              <Link
                href="#course-list"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl transition hover:bg-cyan-50"
              >
                Explore Programs

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
   PROFESSIONAL COURSE CARD
================================================================ */

function ProfessionalCourseCard({
  course,
  index,
}: {
  course: Awaited<
    ReturnType<typeof getCourses>
  >[number];
  index: number;
}) {
  const visual = getCourseImageConfig(
    course.slug
  );

  /*
   * If the centralized mapping contains a custom visual,
   * use it.
   *
   * Otherwise preserve the database image as fallback.
   */
  const image =
    hasCourseImage(course.slug)
      ? visual.image
      : course.image || visual.image;

  const price =
    typeof course.price === "number"
      ? course.price
      : Number(course.price);

  const students = Number(
    course.students || 0
  );

  const rating = Number(
    course.rating || 0
  );

  const lessons = course.lessons.length;

  const previewLessons =
    course.lessons.slice(0, 3);

  const formattedPrice =
    Number.isFinite(price) && price > 0
      ? `₹${price.toLocaleString("en-IN")}`
      : "Premium Access";

  const courseNumber =
    String(index + 1).padStart(2, "0");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-2xl">
      {/* =========================================================
          IMAGE / COVER
      ========================================================== */}

      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={`${course.title} professional ICU course`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading={index < 6 ? "eager" : "lazy"}
        />

        {/* Gradient overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Course number */}

        <div className="absolute right-4 top-4">
          <span className="rounded-full border border-white/20 bg-slate-950/70 px-3 py-1.5 text-[10px] font-black tracking-[0.14em] text-white backdrop-blur">
            {courseNumber}
          </span>
        </div>

        {/* Premium badge */}

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-2 text-[10px] font-black uppercase tracking-wide text-amber-950 shadow-lg">
            <Crown size={13} />

            Premium
          </span>
        </div>

        {/* Course visual label */}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">
                {visual.shortLabel}
              </p>

              <p className="mt-1 text-xs font-bold text-white/80">
                {course.level} Program
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
              <Star
                size={13}
                className="fill-amber-400 text-amber-400"
              />

              {rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          CARD BODY
      ========================================================== */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Instructor / language */}

        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[10px] font-black uppercase tracking-[0.13em] text-blue-700">
            {course.instructor}
          </span>

          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
            {course.language}
          </span>
        </div>

        {/* Title */}

        <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-xl font-black leading-7 text-slate-950 transition group-hover:text-blue-700">
          {course.title}
        </h3>

        {/* Description */}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {course.description}
        </p>

        {/* =======================================================
            COURSE META
        ======================================================== */}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <CourseMeta
            icon={<BookOpen size={15} />}
            value={`${lessons} Lessons`}
          />

          <CourseMeta
            icon={<Clock3 size={15} />}
            value={formatDuration(
              course.duration
            )}
          />

          <CourseMeta
            icon={<Languages size={15} />}
            value={course.language}
          />

          <CourseMeta
            icon={<Users size={15} />}
            value={`${students.toLocaleString(
              "en-IN"
            )} Learners`}
          />
        </div>

        {/* =======================================================
            CURRICULUM PREVIEW
        ======================================================== */}

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                Curriculum Preview
              </p>

              <p className="mt-1 text-sm font-black text-slate-800">
                What you will study
              </p>
            </div>

            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-blue-700 shadow-sm">
              {lessons} Modules
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {previewLessons.length > 0 ? (
              previewLessons.map(
                (lesson, lessonIndex) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-2"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[9px] font-black text-blue-700">
                      {lessonIndex + 1}
                    </span>

                    <span className="line-clamp-1 text-xs font-semibold text-slate-600">
                      {lesson.title}
                    </span>
                  </div>
                )
              )
            ) : (
              <p className="text-xs text-slate-500">
                Curriculum will be published soon.
              </p>
            )}
          </div>

          {lessons > 3 && (
            <p className="mt-3 text-[10px] font-bold text-blue-600">
              + {lessons - 3} more lessons
            </p>
          )}
        </div>

                {/* =======================================================
            PREMIUM VALUE
        ======================================================== */}

        <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50/80 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Crown size={17} />
            </div>

            <div>
              <p className="text-sm font-black text-slate-800">
                Premium Learning Program
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                Structured lessons, assessments,
                learning resources and progress tracking
                are part of the premium LMS experience.
              </p>
            </div>
          </div>
        </div>

        {/* =======================================================
            PRICE + CTA
        ======================================================== */}

        <div className="mt-auto">
          <div className="my-5 border-t border-slate-100" />

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                Program Fee
              </p>

              <p className="mt-1 text-2xl font-black text-blue-700">
                {formattedPrice}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                Rating
              </p>

              <div className="mt-1 flex items-center justify-end gap-1">
                <Star
                  size={14}
                  className="fill-amber-400 text-amber-400"
                />

                <span className="text-sm font-black text-slate-700">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <Link
            href={`/courses/${course.id}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-800 hover:to-cyan-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Program

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
   HERO BADGE
================================================================ */

function HeroBadge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-300">
      {icon}

      {text}
    </span>
  );
}

/* ================================================================
   TRUST ITEM
================================================================ */

function TrustItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.035] px-3 py-2.5 text-xs font-bold text-slate-300">
      <span className="text-cyan-300">
        {icon}
      </span>

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

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}

/* ================================================================
   CATALOG STAT
================================================================ */

function CatalogStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="min-w-[90px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-slate-950">
        {value.toLocaleString("en-IN")}
      </p>
    </div>
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
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
      <span className="shrink-0 text-blue-600">
        {icon}
      </span>

      <span className="truncate text-[11px] font-bold text-slate-600">
        {value}
      </span>
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
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg">
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
   CTA FEATURE
================================================================ */

function CTAFeature({
  text,
}: {
  text: string;
}) {
  return (
    <span className="flex items-center gap-2">
      <CheckCircle2
        size={16}
        className="text-emerald-400"
      />

      {text}
    </span>
  );
}

/* ================================================================
   EMPTY STATE
================================================================ */

function EmptyCourses() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-xl px-6 py-20 text-center sm:px-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-600">
          <Crown size={38} />
        </div>

        <h2 className="mt-6 text-2xl font-black text-slate-900">
          Premium Programs Are Being Prepared
        </h2>

        <p className="mt-3 text-base leading-7 text-slate-600">
          No premium program is currently published
          in the catalog.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
        >
          Back to Portal

          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

/* ================================================================
   DURATION FORMATTER
================================================================ */

function formatDuration(
  minutes: number
) {
  if (
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return "Self-paced";
  }

  const hours = Math.floor(
    minutes / 60
  );

  const remainingMinutes =
    minutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

/*
==================================================================
END OF FILE

app/courses/page.tsx

IMPORTANT IMPLEMENTATION NOTES
==================================================================

1. PREMIUM CATALOG
   ---------------------------------------------------------------
   Only courses with:

       course.isPremium === true

   are displayed here.

   Demo/free content is intentionally kept outside this catalog.

2. COURSE IMAGES
   ---------------------------------------------------------------
   Images are resolved through:

       ./_components/course-images

   The centralized mapping provides professional course-specific
   visuals.

3. DATABASE FALLBACK
   ---------------------------------------------------------------
   If a course slug is not yet present in the centralized image
   mapping, the existing database image is used.

   This prevents an existing course image from disappearing while
   the visual library is being expanded.

4. COURSE ROUTING
   ---------------------------------------------------------------
   Every CTA continues to use:

       /courses/${course.id}

   Therefore the existing course detail route remains unchanged.

5. CURRICULUM PREVIEW
   ---------------------------------------------------------------
   The first three existing lessons are shown inside each card.

   If the course contains more than three lessons, the card shows
   the remaining lesson count.

6. PRICE
   ---------------------------------------------------------------
   The actual database course price is displayed.

   No fake discount or fake original price is introduced.

7. PREMIUM ACCESS
   ---------------------------------------------------------------
   This page presents the programs as premium LMS programs.

   Actual lesson/payment authorization continues to be handled by
   the existing server-side course access logic.

8. RESPONSIVE DESIGN
   ---------------------------------------------------------------
   Mobile:
       1 column

   Tablet:
       2 columns

   Desktop:
       3 columns

9. NO CLIENT COMPONENT REQUIRED
   ---------------------------------------------------------------
   The catalog itself remains a server component.

   This keeps course data and premium presentation server-rendered.

10. NEXT DEVELOPMENT STAGE
    --------------------------------------------------------------
    After this page is verified, the next important LMS work should
    be the actual course learning experience:

        /courses/[id]

    and then:

        /courses/[id]/lesson/[lessonId]

    because the current database seed still creates lesson
    videoUrl and notesUrl as empty strings. The seed explicitly
    indicates that videos and notes are to be added later.

==================================================================
*/
