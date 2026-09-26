import Image from "next/image";
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
  Stethoscope,
  Target,
  Trophy,
  Video,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import CourseCard, {
  type Course as CourseCardData,
} from "@/components/CourseCard";

import { getCourses } from "@/lib/course";

export const dynamic = "force-dynamic";

export default async function Home() {
  const dbCourses = await getCourses();

  const mapCourse = (
    course: (typeof dbCourses)[number]
  ): CourseCardData => ({
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
  });

  const demoCourses = dbCourses
    .filter((course) => !course.isPremium)
    .map(mapCourse);

  const premiumCourses = dbCourses
    .filter((course) => course.isPremium)
    .map(mapCourse);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white text-slate-900">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-slate-50">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-cyan-200/40 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
              {/* LEFT */}

              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700 shadow-sm">
                  <Stethoscope size={15} />
                  Professional ICU Learning Platform
                </div>

                <h1 className="mt-7 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-[4.7rem]">
                  Learn.
                  <br />
                  Practice.
                  <span className="block bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Master Critical Care.
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  Build practical ICU nursing and critical-care knowledge
                  through structured courses, lessons, video learning,
                  assessments and certificate pathways.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/courses"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                  >
                    Explore Courses
                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="#free-demo-courses"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
                  >
                    <PlayCircle size={18} />
                    Start Free Demo
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <HeroFeature
                    icon={<BookOpen size={18} />}
                    title="Courses"
                    text="Structured"
                  />

                  <HeroFeature
                    icon={<Video size={18} />}
                    title="Lessons"
                    text="Practical"
                  />

                  <HeroFeature
                    icon={<Target size={18} />}
                    title="Quizzes"
                    text="Assessment"
                  />

                  <HeroFeature
                    icon={<Award size={18} />}
                    title="Certificate"
                    text="Completion"
                  />
                </div>
              </div>

              {/* RIGHT */}

              <div className="relative mx-auto w-full max-w-[620px]">
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-2 shadow-[0_35px_100px_rgba(15,23,42,0.2)]">
                  <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="/images/icu-lms-hero.png"
                      alt="ICU Learning Portal professional online learning platform"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

                    <div className="absolute left-5 right-5 top-5 grid gap-2 sm:grid-cols-3">
                      <VisualBadge
                        icon={<PlayCircle size={16} />}
                        text="Video Lessons"
                      />

                      <VisualBadge
                        icon={<Target size={16} />}
                        text="Assessments"
                      />

                      <VisualBadge
                        icon={<Award size={16} />}
                        text="Certificates"
                      />
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
                        ICU Learning Portal
                      </p>

                      <h2 className="mt-2 max-w-lg text-2xl font-black leading-tight text-white sm:text-3xl">
                        One place to learn, practice and track your ICU
                        learning journey.
                      </h2>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
                          ICU Nursing
                        </span>

                        <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
                          Ventilation
                        </span>

                        <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
                          ECG
                        </span>

                        <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
                          ABG
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:block lg:-left-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={21} />
                    </div>

                    <div>
                      <p className="text-xs font-black text-slate-950">
                        Structured Learning
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Course → Lesson → Quiz
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 top-20 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:block lg:-right-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <ShieldCheck size={21} />
                    </div>

                    <div>
                      <p className="text-xs font-black text-slate-950">
                        Student Dashboard
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Track your progress
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            PLATFORM VALUE STRIP
        ====================================================== */}

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-5 sm:px-6 md:grid-cols-4 md:divide-x md:divide-y-0 lg:px-8">
            <ValueItem
              icon={<BookOpen size={20} />}
              title="Structured Curriculum"
              text="Organized ICU learning paths"
            />

            <ValueItem
              icon={<PlayCircle size={20} />}
              title="Lesson-Based Learning"
              text="Study at your own pace"
            />

            <ValueItem
              icon={<Target size={20} />}
              title="Practice & Quizzes"
              text="Check your understanding"
            />

            <ValueItem
              icon={<Award size={20} />}
              title="Certificate Pathway"
              text="For eligible courses"
            />
          </div>
        </section>

        {/* =====================================================
            FREE DEMO
        ====================================================== */}

        {demoCourses.length > 0 && (
          <section
            id="free-demo-courses"
            className="bg-emerald-50/60 py-16 sm:py-20"
          >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="START FREE"
                title="Experience the Learning Platform"
                highlight="Before You Go Premium"
                description="Start with selected free courses, explore lessons and experience the ICU Learning Portal learning flow before choosing a premium program."
              />

              <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {demoCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-6 py-3.5 text-sm font-black text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  View All Courses
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            PREMIUM CATALOGUE
        ====================================================== */}

        <section
          id="premium-courses"
          className="relative overflow-hidden bg-slate-50 py-20 sm:py-24"
        >
          <div
            aria-hidden="true"
            className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="PREMIUM LEARNING"
                title="Go Deeper Into"
                highlight="Critical Care"
                description="Professional ICU and critical-care programs designed around structured lessons, focused topics and measurable learning progress."
                align="left"
              />

              <div className="shrink-0">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Complete Catalogue
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {premiumCourses.length > 0 ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {premiumCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <BookOpen className="mx-auto text-blue-700" size={32} />

                <h3 className="mt-4 text-xl font-black">
                  Premium courses are being prepared.
                </h3>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  The professional course catalogue will appear here once
                  course data is available.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            WHY THIS LMS
        ====================================================== */}

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                  <Sparkles size={14} />
                  Built for ICU Learners
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Everything you need for a structured learning journey.
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                  The portal is designed around a simple idea: learning
                  should be organized, measurable and easy to continue.
                </p>

                <Link
                  href="/about"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-800"
                >
                  Learn more about ICU Learning Portal
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <BenefitCard
                  icon={<BookOpen size={21} />}
                  title="Structured Courses"
                  text="Course content is organized into lessons so you can progress systematically."
                />

                <BenefitCard
                  icon={<Video size={21} />}
                  title="Practical Learning"
                  text="Use lesson-based learning and available video resources to reinforce concepts."
                />

                <BenefitCard
                  icon={<Target size={21} />}
                  title="Assessment"
                  text="Use quizzes and assessments to check your understanding."
                />

                <BenefitCard
                  icon={<TrendingIcon />}
                  title="Progress Tracking"
                  text="Your dashboard helps you see enrolled courses and learning progress."
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            LEARNING JOURNEY — BIG VERSION
        ====================================================== */}

        <section className="bg-slate-950 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                Your Learning Journey
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                From first lesson to
                <span className="text-cyan-300">
                  {" "}
                  course completion.
                </span>
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-300">
                A clear learning flow helps you know what to do next.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <JourneyCard
                number="01"
                icon={<BookOpen size={24} />}
                title="Choose"
                text="Select a free demo or premium course that matches your learning goal."
              />

              <JourneyCard
                number="02"
                icon={<PlayCircle size={24} />}
                title="Learn"
                text="Move through structured lessons and available learning resources."
              />

              <JourneyCard
                number="03"
                icon={<Target size={24} />}
                title="Practice"
                text="Use quizzes and assessments to reinforce your knowledge."
              />

              <JourneyCard
                number="04"
                icon={<Award size={24} />}
                title="Complete"
                text="Track your progress and follow eligible certificate requirements."
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            CERTIFICATE SHOWCASE
        ====================================================== */}

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                  <Award size={15} />
                  Certificate Pathway
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Complete your learning journey with a certificate pathway.
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600">
                  Eligible courses can provide a completion certificate
                  after the learner satisfies the required course
                  completion conditions.
                </p>

                <div className="mt-7 space-y-4">
                  <Checklist text="Complete required course lessons" />
                  <Checklist text="Meet the applicable assessment requirements" />
                  <Checklist text="Track completion from your student account" />
                </div>

                <Link
                  href="/certificate-sample"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
                >
                  View Certificate Sample
                  <ArrowRight size={17} />
                </Link>
              </div>

              {/* Certificate preview */}

              <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl sm:p-6">
                <div className="relative overflow-hidden border-[8px] border-slate-950 bg-gradient-to-br from-white via-slate-50 to-blue-50 px-5 py-8 sm:border-[12px] sm:px-10 sm:py-12">
                  <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-blue-100/70 blur-3xl" />
                  <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-cyan-100/70 blur-3xl" />

                  <div className="relative text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-blue-700 text-blue-700 sm:h-16 sm:w-16">
                      <Award size={28} />
                    </div>

                    <p className="mt-5 text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">
                      ICU Learning Portal
                    </p>

                    <h3 className="mt-3 text-2xl font-black text-slate-950 sm:text-4xl">
                      Certificate of Completion
                    </h3>

                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                      Design Preview — Not an Issued Certificate
                    </p>

                    <div className="mx-auto mt-8 max-w-xl border-y border-slate-200 py-7">
                      <p className="text-xs text-slate-500">
                        This certifies that
                      </p>

                      <p className="mt-2 text-2xl font-black text-slate-950">
                        Student Name
                      </p>

                      <p className="mt-3 text-sm text-slate-600">
                        has successfully completed the required learning
                        pathway for
                      </p>

                      <p className="mt-3 text-lg font-black text-blue-700">
                        ICU Nursing & Critical Care Program
                      </p>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      <CertificateMeta
                        title="Certificate No."
                        value="ICULP-XXXX-XXXX"
                      />

                      <CertificateMeta
                        title="Issued"
                        value="Completion Date"
                      />

                      <CertificateMeta
                        title="Verification"
                        value="LMS Record"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INSTRUCTOR / PLATFORM FOUNDER
        ====================================================== */}

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-10">
              <div className="flex flex-col items-center gap-7 text-center sm:flex-row sm:text-left">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-700 to-cyan-500 text-2xl font-black text-white shadow-xl">
                  AD
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                    Platform & Instructor Profile
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    ICU Learning Portal
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                    The platform is focused on structured ICU nursing and
                    critical-care education, practical learning resources
                    and an organized digital learning experience.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <ProfileBadge text="ICU-focused learning" />
                    <ProfileBadge text="Structured curriculum" />
                    <ProfileBadge text="Student LMS" />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                <strong>Important:</strong> Replace the initials above with
                your real professional photograph when you are ready. Do
                not use a stock or AI-generated person as an instructor
                identity.
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TESTIMONIAL PLACEHOLDER — NO FAKE REVIEWS
        ====================================================== */}

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Student Feedback
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Real learner experiences will appear here.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
              We will publish verified student feedback instead of
              fabricated testimonials. This keeps the portal trustworthy
              as the learner community grows.
            </p>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              <FeedbackPlaceholder />
              <FeedbackPlaceholder />
              <FeedbackPlaceholder />
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="bg-slate-950 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 px-7 py-10 shadow-2xl sm:px-12 sm:py-14">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                    Start Your Learning Journey
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Start free. Learn seriously. Build your ICU knowledge.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Explore the free demo courses or browse the complete
                    professional catalogue.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    Browse Courses
                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
                  >
                    Create Student Account
                    <ArrowRight size={17} />
                  </Link>
                </div>
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
   HERO FEATURE
============================================================ */

function HeroFeature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-black text-slate-950">
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
   VISUAL BADGE
============================================================ */

function VisualBadge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2.5 text-white backdrop-blur-md">
      <div className="text-cyan-300">{icon}</div>
      <span className="text-[10px] font-black sm:text-[11px]">
        {text}
      </span>
    </div>
  );
}

/* ============================================================
   VALUE ITEM
============================================================ */

function ValueItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 px-2 py-6 sm:px-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <div>
        <p className="text-sm font-black text-slate-950">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-blue-700">
        <Sparkles size={13} />
        {eyebrow}
      </div>

      <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}

        {highlight && (
          <span className="block bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   BENEFIT CARD
============================================================ */

function BenefitCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-slate-600">
        {text}
      </p>
    </article>
  );
}

/* ============================================================
   JOURNEY CARD
============================================================ */

function JourneyCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:bg-white/[0.09]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
          {icon}
        </div>

        <span className="text-sm font-black tracking-[0.15em] text-slate-500">
          {number}
        </span>
      </div>

      <h3 className="mt-7 text-xl font-black text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">
        {text}
      </p>

      <div className="mt-6 h-px bg-white/10" />

      <div className="mt-5 flex items-center gap-2 text-xs font-black text-cyan-300">
        <CheckCircle2 size={14} />
        Learning step
      </div>
    </article>
  );
}

/* ============================================================
   CHECKLIST
============================================================ */

function Checklist({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2
        size={19}
        className="mt-0.5 shrink-0 text-emerald-500"
      />

      <span className="text-sm font-bold text-slate-700">
        {text}
      </span>
    </div>
  );
}

/* ============================================================
   CERTIFICATE META
============================================================ */

function CertificateMeta({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-left">
      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-xs font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   PROFILE BADGE
============================================================ */

function ProfileBadge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black text-slate-600">
      {text}
    </span>
  );
}

/* ============================================================
   FEEDBACK PLACEHOLDER
============================================================ */

function FeedbackPlaceholder() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <GraduationCap size={20} />
      </div>

      <p className="mt-4 text-sm font-black text-slate-500">
        Verified student feedback
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        This space will be populated with genuine learner feedback.
      </p>
    </div>
  );
}

/* ============================================================
   TRENDING / PROGRESS ICON
============================================================ */

function TrendingIcon() {
  return <Trophy size={21} />;
}