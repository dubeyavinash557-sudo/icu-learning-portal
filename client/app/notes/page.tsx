import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Crown,
  FileLock2,
  GraduationCap,
  Languages,
  LockKeyhole,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";

import { getCourses } from "@/lib/course";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const courses = await getCourses();

  const premiumCourses = courses.filter((course) => course.isPremium);

  const totalLessons = premiumCourses.reduce(
    (total, course) => total + course.lessons.length,
    0,
  );

  const totalLearners = premiumCourses.reduce(
    (total, course) => total + Number(course.students || 0),
    0,
  );

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* =========================================================
          HEADER
      ========================================================== */}

      <header className="border-b border-white/10 bg-[#020617]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <GraduationCap size={21} />
            </div>

            <div>
              <p className="text-sm font-black text-white">
                ICU Learning
              </p>

              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Nursing Notes Library
              </p>
            </div>
          </Link>

          <Link
            href="/courses"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-black text-slate-200 transition hover:bg-white/10 sm:inline-flex"
          >
            View Courses
            <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-blue-600/10 blur-3xl" />

          <div className="absolute bottom-[-14rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black text-cyan-300">
                <LockKeyhole size={14} />
                Premium Study Library
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                ICU Nursing Notes
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Premium Learning Library
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Access structured ICU learning resources, nursing notes,
                mechanical ventilation material, ECG and ABG study content
                through premium course access.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:bg-cyan-400"
                >
                  Explore Premium Courses
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
                >
                  <PlayCircle size={17} />
                  My Learning
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-slate-400">
                <TrustItem label="Premium Access" />
                <TrustItem label="Structured Notes" />
                <TrustItem label="Course Resources" />
                <TrustItem label="Protected Downloads" />
              </div>
            </div>

            {/* RIGHT */}

            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                      <FileLock2 size={27} />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">
                        Protected Resources
                      </p>

                      <h2 className="mt-1 text-xl font-black text-white">
                        Premium Only
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <HeroStat
                    value={String(premiumCourses.length)}
                    label="Premium Courses"
                    icon={<Crown size={18} />}
                  />

                  <HeroStat
                    value={String(totalLessons)}
                    label="Lessons"
                    icon={<Video size={18} />}
                  />

                  <HeroStat
                    value={String(totalLearners)}
                    label="Learners"
                    icon={<Users size={18} />}
                  />

                  <HeroStat
                    value="100%"
                    label="Protected"
                    icon={<ShieldCheck size={18} />}
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-amber-400/10 bg-amber-400/5 p-5">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                      <Crown size={19} />
                    </div>

                    <div>
                      <p className="font-black text-white">
                        Premium course access
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Study notes and protected learning resources are
                        available after premium course access.
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
          LIBRARY INTRO
      ========================================================== */}

      <section className="border-y border-white/10 bg-[#071022]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-400">
                <Sparkles size={15} />
                Premium Study Library
              </div>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Premium Notes & Learning Resources
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Free PDF download buttons have been removed from the public
                library. Premium resources are accessed through authenticated
                course access.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-400/10 bg-amber-400/5 px-5 py-4">
              <div className="flex items-center gap-3">
                <Crown
                  size={20}
                  className="text-amber-300"
                />

                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    Premium
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    Protected Course Resources
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COURSE GRID
      ========================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-400">
            Premium Resources
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Choose Your Study Program
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
            Notes are connected to premium courses. Purchase or activate the
            relevant course to unlock protected study resources.
          </p>
        </div>

        {premiumCourses.length === 0 ? (
          <EmptyLibrary />
        ) : (
          <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {premiumCourses.map((course) => (
              <PremiumCourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          SECURITY BANNER
      ========================================================== */}

      <section className="border-y border-white/10 bg-[#071022]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-indigo-950/40 p-7 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-black text-emerald-300">
                  <ShieldCheck size={14} />
                  Protected Learning
                </div>

                <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                  Your Premium Resources Stay Inside the LMS
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Study resources should be delivered only after the server
                  verifies the learner's premium access. Direct public PDF
                  URLs should not be used for paid content.
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
              >
                Browse Courses
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER CTA
      ========================================================== */}

      <section className="bg-[#020617]">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
            <BookOpen size={22} />
          </div>

          <h2 className="mt-5 text-2xl font-black text-white sm:text-3xl">
            Build Your Critical Care Knowledge
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Study ICU nursing, mechanical ventilation, ECG, ABG and other
            critical-care topics through structured premium programs.
          </p>

          <Link
            href="/courses"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-400"
          >
            View Premium Courses
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   PREMIUM COURSE CARD
================================================================ */

function PremiumCourseCard({
  course,
}: {
  course: Awaited<ReturnType<typeof getCourses>>[number];
}) {
  const students = Number(course.students || 0);
  const rating = Number(course.rating || 0);
  const lessons = course.lessons.length;

  const price =
    Number(course.price) > 0
      ? `₹${Number(course.price).toLocaleString("en-IN")}`
      : "Premium";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1428] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-cyan-950/30">
      {/* IMAGE */}

      <div className="relative h-52 overflow-hidden bg-slate-900">
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
              size={65}
              className="text-white/80"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-400/95 px-3 py-2 text-[10px] font-black text-amber-950 shadow-lg">
            <Crown size={13} />
            PREMIUM
          </span>
        </div>

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-[10px] font-black text-slate-200 backdrop-blur">
            {course.level}
          </span>
        </div>

        <div className="absolute bottom-4 right-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
            <Star
              size={13}
              className="fill-amber-400 text-amber-400"
            />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* BODY */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[10px] font-black uppercase tracking-[0.14em] text-cyan-400">
            ICU Learning Portal
          </span>

          <span className="shrink-0 text-[10px] font-bold text-slate-500">
            {course.language}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-xl font-black leading-7 text-white">
          {course.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {course.description}
        </p>

        {/* META */}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <DarkMeta
            icon={<BookOpen size={14} />}
            value={`${lessons} Lessons`}
          />

          <DarkMeta
            icon={<Clock3 size={14} />}
            value={formatDuration(course.duration)}
          />

          <DarkMeta
            icon={<Languages size={14} />}
            value={course.language}
          />

          <DarkMeta
            icon={<Users size={14} />}
            value={`${students.toLocaleString("en-IN")} Learners`}
          />
        </div>

        {/* PROTECTED RESOURCE */}

        <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <LockKeyhole size={17} />
            </div>

            <div>
              <p className="text-sm font-black text-white">
                Premium Notes Protected
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Study PDFs are available only to authorized premium learners.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-white/5 pt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-600">
                Course Access
              </p>

              <p className="mt-1 text-2xl font-black text-cyan-400">
                {price}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-600">
                Access
              </p>

              <p className="mt-1 text-xs font-black text-amber-300">
                PREMIUM
              </p>
            </div>
          </div>

          <Link
            href={`/courses/${course.id}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-400"
          >
            Unlock Premium Notes
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
   DARK META
================================================================ */

function DarkMeta({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-950/70 px-3 py-2.5">
      <span className="shrink-0 text-cyan-400">
        {icon}
      </span>

      <span className="truncate text-[10px] font-bold text-slate-500">
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
        size={14}
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl font-black text-white">
          {value}
        </p>

        <span className="text-cyan-300">
          {icon}
        </span>
      </div>

      <p className="mt-1 text-[10px] font-bold text-slate-500">
        {label}
      </p>
    </div>
  );
}

/* ================================================================
   EMPTY LIBRARY
================================================================ */

function EmptyLibrary() {
  return (
    <div className="mt-9 rounded-[2rem] border border-white/10 bg-[#0b1428] p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
        <BookOpen size={30} />
      </div>

      <h2 className="mt-5 text-xl font-black text-white">
        Premium Library Coming Soon
      </h2>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Premium study resources will appear here when published courses are
        available.
      </p>
    </div>
  );
}

/* ================================================================
   DURATION
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