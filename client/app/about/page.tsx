import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HeartPulse,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About ICU Learning Portal | Instructor & Mission",
  description:
    "Meet the founder of ICU Learning Portal and learn about the platform's focus on structured ICU nursing and critical-care education.",
};

const credentials = [
  {
    icon: GraduationCap,
    title: "B.Sc. Biology",
    text: "Academic foundation in biological sciences.",
  },
  {
    icon: Stethoscope,
    title: "GNM Nursing",
    text: "Professional nursing qualification supporting the portal's nursing education focus.",
  },
  {
    icon: Clock3,
    title: "4 Years ICU Experience",
    text: "Practical ICU experience used to shape clinically relevant learning topics.",
  },
  {
    icon: Award,
    title: "BLS + ACLS",
    text: "Resuscitation-focused certifications listed in the instructor profile.",
  },
  {
    icon: BookOpen,
    title: "CPC Training Completed",
    text: "Additional professional training supporting healthcare education and terminology.",
  },
];

const learningPrinciples = [
  "Structured ICU and critical-care curriculum",
  "Hindi + English explanations where useful",
  "Lesson-by-lesson progress tracking",
  "Quizzes and revision-oriented assessment",
  "Course resources and protected premium content",
  "Completion and certificate pathway for eligible courses",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-8 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-cyan-200">
                  <HeartPulse size={15} />
                  About ICU Learning Portal
                </div>

                <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Practical ICU learning for students and healthcare
                  professionals.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  ICU Learning Portal is built as a focused online learning
                  platform for ICU nursing, critical-care concepts, practical
                  revision, assessments and course completion pathways.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                  >
                    Explore Courses
                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    Contact Support
                    <MessageCircle size={17} />
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] bg-white p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-700 to-cyan-500 text-2xl font-black text-white shadow-lg">
                      AD
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                        Founder & Educator
                      </p>

                      <h2 className="mt-1 text-2xl font-black text-slate-950">
                        Avinash Dubey
                      </h2>

                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        ICU Nursing & Critical-Care Education
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    <ProfileLine
                      icon={<GraduationCap size={18} />}
                      title="Qualifications"
                      text="B.Sc. Biology + GNM Nursing"
                    />

                    <ProfileLine
                      icon={<Clock3 size={18} />}
                      title="Clinical experience"
                      text="4 years of ICU experience"
                    />

                    <ProfileLine
                      icon={<Award size={18} />}
                      title="Certifications"
                      text="BLS, ACLS + CPC training completed"
                    />

                    <ProfileLine
                      icon={<ShieldCheck size={18} />}
                      title="Learning focus"
                      text="Structured ICU education, revision and assessment"
                    />
                  </div>

                  <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">
                    The profile above is an educational introduction. Course
                    content is designed for learning and revision and does not
                    replace supervised clinical training or institutional
                    protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-slate-950 p-7 text-white shadow-xl sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <HeartPulse size={24} />
              </div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                Why this portal exists
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Make ICU learning easier to follow, revise and practise.
              </h2>

              <p className="mt-5 text-sm leading-7 text-blue-100 sm:text-base">
                ICU topics can become difficult when learners have to search
                across disconnected notes, videos and question banks. The
                portal brings structured lessons, course resources,
                assessments and progress into one learning workflow.
              </p>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Founder story
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Built around practical critical-care learning.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                ICU Learning Portal was created to give nursing students and
                healthcare learners a more organised way to study important
                ICU topics such as patient monitoring, mechanical ventilation,
                ECG, ABG analysis, emergency care, infection control and
                bedside skills.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The platform is intentionally structured as an LMS rather than
                a simple collection of articles. Learners can discover a
                course, review the curriculum, study lessons, complete
                assessments, track progress and work toward eligible course
                certificates.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {learningPrinciples.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-emerald-600"
                      size={18}
                    />

                    <span className="text-sm font-semibold leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Credentials & background
              </p>

              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                Who is behind the learning platform?
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The platform founder profile is presented openly so learners
                can understand the educational background behind the portal
                before choosing a course.
              </p>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {credentials.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-5 text-sm font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7 sm:p-10">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                  Ready to learn?
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                  Start with a free demo or explore the premium catalogue.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Review the curriculum and course details before making a
                  purchase.
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Browse Courses
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ProfileLine({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <div>
        <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
          {title}
        </p>

        <p className="mt-1 text-sm font-bold text-slate-800">
          {text}
        </p>
      </div>
    </div>
  );
}