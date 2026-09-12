import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Crown,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/Footer";
import CourseCard, {
  type Course as CourseCardData,
} from "../components/CourseCard";

import { getCourses } from "@/lib/course";

/* ============================================================
   HOME PAGE
   ------------------------------------------------------------
   Professional ICU Learning Portal
   Main goal:
   - Keep homepage clean
   - Show the 12 main Premium LMS courses
   - Use Prisma as the source of truth
   - Keep demo / marketing content minimal
============================================================ */

export default async function Home() {
  const dbCourses = await getCourses();

  /*
   * Prisma is the source of truth for the main course catalogue.
   *
   * Only premium courses are displayed in the main homepage
   * catalogue. The database currently contains the 12 main
   * professional ICU / critical-care programs.
   */
  const demoCourses: CourseCardData[] = dbCourses
    .filter((course) => !course.isPremium)
    .map((course) => ({
      id: course.id,
      title: course.title,
      slug: course.slug,
      price: course.price,
      image: course.image,
      instructor: course.instructor,
      rating: course.rating,
      students: course.students,
      duration: course.duration,
      language: course.language,
      level: course.level,
      isPremium: course.isPremium,
    }));

  const premiumCourses: CourseCardData[] = dbCourses
    .filter((course) => course.isPremium)
    .map((course) => ({
      id: course.id,
      title: course.title,
      slug: course.slug,
      price: course.price,
      image: course.image,
      instructor: course.instructor,
      rating: course.rating,
      students: course.students,
      duration: course.duration,
      language: course.language,
      level: course.level,
      isPremium: course.isPremium,
    }));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        {/* ======================================================
            PROFESSIONAL LMS HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-white">
          {/* Soft healthcare background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blue-100/70 blur-3xl" />

            <div className="absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-cyan-100/70 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
              {/* LEFT: LMS positioning */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.13em] text-blue-700">
                  <Stethoscope size={15} />

                  Professional ICU Learning Platform
                </div>

                <h1 className="mt-6 text-[2.75rem] font-black leading-[1.04] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-[4.25rem]">
                  Learn. Practice.

                  <span className="block bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Master Critical Care.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                  Build practical ICU and critical-care skills with
                  structured courses, video lessons, study resources,
                  assessments and certificate pathways—all in one
                  professional LMS.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/courses"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
                  >
                    Browse Courses

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/register"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
                  >
                    Start Learning

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold text-slate-500">
                  <div className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500"
                    />

                    Structured curriculum
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500"
                    />

                    Video & study resources
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500"
                    />

                    Quizzes & certificates
                  </div>
                </div>

                {/* Learning benefits */}
                <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <HeroBenefit
                    icon={<BookOpen size={18} />}
                    title="Courses"
                    text="Structured"
                  />

                  <HeroBenefit
                    icon={<PlayCircle size={18} />}
                    title="Video"
                    text="Practical"
                  />

                  <HeroBenefit
                    icon={<Sparkles size={18} />}
                    title="Quizzes"
                    text="Assessment"
                  />

                  <HeroBenefit
                    icon={<Award size={18} />}
                    title="Certificates"
                    text="Achievement"
                  />
                </div>
              </div>

              {/* RIGHT: professional LMS visual */}
              <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-2 shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
                  <div className="relative aspect-[4/4.45] overflow-hidden rounded-[1.55rem]">
                    <Image
                      src="/images/icu-lms-hero.png"
                      alt="Healthcare professional using ICU Learning Portal online learning platform"
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />

                    {/* LMS feature cards */}
                    <div className="absolute left-4 right-4 top-4 grid gap-2 sm:left-6 sm:right-6 sm:top-6 sm:grid-cols-3">
                      <HeroVisualCard
                        icon={<PlayCircle size={17} />}
                        label="Video Lessons"
                      />

                      <HeroVisualCard
                        icon={<CheckCircle2 size={17} />}
                        label="Quizzes"
                      />

                      <HeroVisualCard
                        icon={<Award size={17} />}
                        label="Certificates"
                      />
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
                            ICU Learning Portal
                          </p>

                          <h2 className="mt-2 max-w-md text-2xl font-black leading-tight text-white sm:text-3xl">
                            Learn today. Build stronger critical-care
                            skills.
                          </h2>
                        </div>

                        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm sm:flex">
                          <Stethoscope size={21} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LMS status bar */}
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-slate-950/75 p-3 shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                          <Stethoscope size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            Learning Track
                          </p>

                          <p className="truncate text-sm font-black text-white">
                            ICU & Critical Care Essentials
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-300">
                        Professional
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating trust card */}
                <div className="absolute -right-3 top-24 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block lg:-right-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <ShieldCheck size={21} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        LMS Experience
                      </p>

                      <p className="mt-0.5 text-sm font-black text-slate-900">
                        Learn at your pace
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating learner card */}
                <div className="absolute -bottom-5 left-3 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block lg:-left-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                      <BookOpen size={21} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Learning Journey
                      </p>

                      <p className="mt-0.5 text-sm font-black text-slate-900">
                        Study • Practice • Complete
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            SIMPLE TRUST STRIP
        ====================================================== */}

        <section className="border-b border-slate-200 bg-white">
          <div
            className="
              mx-auto
              grid
              max-w-7xl
              divide-y
              divide-slate-200
              px-5
              sm:px-6
              md:grid-cols-3
              md:divide-x
              md:divide-y-0
              lg:px-8
            "
          >
            <TrustItem
              icon={<BookOpen size={19} />}
              title="Structured Courses"
              description="Professional ICU learning pathways"
            />

            <TrustItem
              icon={<PlayCircle size={19} />}
              title="Video Learning"
              description="Learn through organized lessons"
            />

            <TrustItem
              icon={<Award size={19} />}
              title="Certificate Pathway"
              description="Complete eligible courses and assessments"
            />
          </div>
        </section>

                {/* ======================================================
            FREE DEMO COURSE CATALOGUE
        ====================================================== */}

        {demoCourses.length > 0 && (
          <section
            id="free-demo-courses"
            className="border-y border-emerald-100 bg-emerald-50/50 py-14 sm:py-16"
          >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700">
                    <PlayCircle size={14} />
                    Start Learning Free
                  </div>

                  <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                    Free ICU Demo Courses
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                    Explore selected ICU lessons, practice basic concepts and experience the learning platform before joining a premium program.
                  </p>
                </div>

                <Link
                  href="/courses"
                  className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-black text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
                >
                  View All Courses
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {demoCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            PREMIUM COURSE CATALOGUE
        ====================================================== */}

        <section
          id="premium-courses"
          className="
            relative
            overflow-hidden
            bg-slate-50
            py-16
            sm:py-20
            lg:py-24
          "
        >
          {/* Background decoration */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-32
              top-32
              h-72
              w-72
              rounded-full
              bg-blue-200/30
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-32
              bottom-32
              h-80
              w-80
              rounded-full
              bg-cyan-200/30
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Section header */}

            <div
              className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              <div className="max-w-3xl">
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-blue-200
                    bg-blue-50
                    px-3.5
                    py-2
                    text-[11px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-blue-700
                  "
                >
                  <Crown size={14} />

                  Premium Learning
                </div>

                <h2
                  className="
                    mt-5
                    text-3xl
                    font-black
                    tracking-tight
                    text-slate-950
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  Master Critical Care

                  <span
                    className="
                      block
                      bg-gradient-to-r
                      from-blue-700
                      via-blue-600
                      to-cyan-500
                      bg-clip-text
                      text-transparent
                    "
                  >
                    With Professional Courses
                  </span>
                </h2>

                <p
                  className="
                    mt-5
                    max-w-2xl
                    text-base
                    leading-7
                    text-slate-600
                    sm:text-lg
                    sm:leading-8
                  "
                >
                  Choose a professional learning program and build
                  your knowledge through structured ICU and critical
                  care education.
                </p>
              </div>

              {/* Course count */}

              <div
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  font-black
                  text-slate-700
                  shadow-sm
                "
              >
                <Sparkles
                  size={17}
                  className="text-blue-600"
                />

                {premiumCourses.length} Professional Programs
              </div>
            </div>

            {/* ==================================================
                COURSE GRID
            ================================================== */}

            {premiumCourses.length > 0 ? (
              <div
                className="
                  mt-10
                  grid
                  grid-cols-1
                  gap-6
                  sm:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {premiumCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))}
              </div>
            ) : (
              <EmptyPremiumCourses />
            )}

            {/* ==================================================
                VIEW ALL COURSES
            ================================================== */}

            <div className="mt-10 flex justify-center">
              <Link
                href="/courses"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-black
                  text-slate-800
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:border-blue-400
                  hover:text-blue-700
                  hover:shadow-lg
                "
              >
                View Complete Course Catalogue

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================
            HOW THE LMS WORKS
        ====================================================== */}

        <section className="border-t border-slate-200 bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-blue-700
                "
              >
                Professional LMS
              </p>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-black
                  tracking-tight
                  text-slate-950
                  sm:text-3xl
                "
              >
                Learn. Practice. Complete.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                A simple learning flow designed for serious ICU and
                critical-care learners.
              </p>
            </div>

            <div
              className="
                mx-auto
                mt-9
                grid
                max-w-5xl
                gap-4
                sm:grid-cols-3
              "
            >
              <LmsStep
                number="01"
                icon={<BookOpen size={20} />}
                title="Choose a Course"
                description="Select the professional program that matches your learning goal."
              />

              <LmsStep
                number="02"
                icon={<PlayCircle size={20} />}
                title="Learn & Practice"
                description="Study structured lessons, video content and learning resources."
              />

              <LmsStep
                number="03"
                icon={<Award size={20} />}
                title="Assess & Complete"
                description="Use quizzes and complete eligible learning requirements."
              />
            </div>
          </div>
        </section>

                {/* ======================================================
            PREMIUM CTA
        ====================================================== */}

        <section className="bg-slate-950 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                bg-gradient-to-r
                from-blue-950
                via-slate-900
                to-cyan-950
                px-6
                py-9
                shadow-2xl
                sm:px-10
                sm:py-11
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-64
                  w-64
                  rounded-full
                  bg-cyan-500/10
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  flex
                  flex-col
                  gap-6
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >
                <div className="max-w-2xl">
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-cyan-400/20
                      bg-cyan-400/10
                      px-3
                      py-1.5
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-cyan-300
                    "
                  >
                    <ShieldCheck size={13} />

                    Professional Learning
                  </div>

                  <h2
                    className="
                      mt-4
                      text-2xl
                      font-black
                      tracking-tight
                      text-white
                      sm:text-3xl
                    "
                  >
                    Build your ICU knowledge step by step.
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-xl
                      text-sm
                      leading-6
                      text-slate-300
                    "
                  >
                    Create your student account and start exploring
                    the professional ICU Learning Portal.
                  </p>
                </div>

                <Link
                  href="/register"
                  className="
                    group
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-white
                    px-6
                    py-3.5
                    text-sm
                    font-black
                    text-slate-950
                    shadow-xl
                    transition
                    hover:-translate-y-0.5
                  "
                >
                  Start Learning

                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ============================================================
   HERO BENEFIT
============================================================ */

function HeroBenefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-black text-slate-900">
            {title}
          </p>

          <p className="mt-0.5 text-[10px] font-semibold text-slate-500">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HERO VISUAL CARD
============================================================ */

function HeroVisualCard({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/65 px-3 py-2.5 text-white shadow-lg backdrop-blur-md">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-cyan-300">
        {icon}
      </div>

      <span className="text-[11px] font-black">
        {label}
      </span>
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
    <div
      className="
        flex
        items-center
        gap-4
        px-2
        py-5
        sm:px-5
        md:py-6
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-700
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-black text-slate-900">
          {title}
        </p>

        <p className="mt-0.5 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   LMS STEP
============================================================ */

function LmsStep({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-5
        transition
        hover:border-blue-200
        hover:bg-white
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-blue-600
            text-white
          "
        >
          {icon}
        </div>

        <span
          className="
            text-xs
            font-black
            tracking-[0.12em]
            text-slate-400
          "
        >
          {number}
        </span>
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </article>
  );
}

/* ============================================================
   EMPTY COURSE STATE
============================================================ */

function EmptyPremiumCourses() {
  return (
    <div
      className="
        mt-10
        rounded-3xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-16
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-blue-50
          text-blue-700
        "
      >
        <BookOpen size={25} />
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950">
        Premium courses are being prepared.
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Please check the course catalogue again after the professional
        course data has been added to the database.
      </p>

      <Link
        href="/courses"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-3
          text-sm
          font-black
          text-white
          transition
          hover:bg-blue-700
        "
      >
        Open Courses

        <ArrowRight size={17} />
      </Link>
    </div>
  );
}

/*
  NOTE:
  PART 4 begins after the complete helper section above.
  The homepage file currently ends at the EmptyPremiumCourses
  helper shown in PART 3.

  No additional application code is required after that helper.
*/

/*
  This section is intentionally empty because app/page.tsx
  contains 967 lines in the formatted source version, while
  the logical implementation ends with EmptyPremiumCourses.

  Use the downloadable file for the exact complete source:
  /tmp/ICU-Learning-Portal-home-page.tsx
*/

/*
  END OF app/page.tsx

  IMPORTANT:
  Do not append this comment block to the downloaded file.
  The downloadable app/page.tsx is the authoritative complete file.
*/