import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Target,
  Users,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/Footer";

const courses = [
  {
    title: "ICU Nursing Mastery Program",
    description:
      "ICU nursing fundamentals, patient monitoring, bedside responsibilities, documentation, and critical-care workflow.",
  },
  {
    title: "Mechanical Ventilation & Respiratory Care",
    description:
      "Ventilator modes, settings, alarms, respiratory assessment, and practical ICU learning.",
  },
  {
    title: "ECG & Cardiac Rhythm Interpretation",
    description:
      "ECG basics, rhythm recognition, cardiac monitoring, and common critical-care patterns.",
  },
  {
    title: "ABG Analysis & Acid-Base Disorders",
    description:
      "ABG interpretation, respiratory and metabolic disorders, compensation, and clinical case practice.",
  },
  {
    title: "ICU Emergency Drugs",
    description:
      "Critical-care pharmacology, emergency medication awareness, precautions, and nursing responsibilities.",
  },
  {
    title: "Critical Care Procedures & Bedside Skills",
    description:
      "Practical ICU procedures, infection prevention, patient safety, and bedside clinical skills.",
  },
];

const learningBenefits = [
  "Structured ICU nursing lessons",
  "Hindi and English learning support",
  "Practical bedside-focused explanations",
  "Topic-wise quizzes and revision",
  "Interview and clinical viva preparation",
  "Course resources and learning materials",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.22),_transparent_42%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.16),_transparent_38%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                <HeartPulse className="h-4 w-4" />
                ICU Learning Portal
              </div>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Learn Critical Care with
                <span className="block text-cyan-300">
                  Practical ICU Guidance
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                ICU Learning Portal is a professional learning platform
                created to help nursing students, ICU nurses, and healthcare
                learners improve their critical-care knowledge through
                structured courses, practical explanations, quizzes, and
                revision resources.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Explore Courses
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
                <div className="rounded-2xl bg-white p-6">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                      <Stethoscope className="h-9 w-9" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
                        Founder Profile
                      </p>
                      <h2 className="text-2xl font-black text-slate-950">
                        Avinash Dubey
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-cyan-700" />
                      <div>
                        <p className="font-bold text-slate-900">
                          B.Sc. Nursing
                        </p>
                        <p className="text-sm text-slate-600">
                          Professional nursing education background
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock3 className="mt-1 h-5 w-5 shrink-0 text-cyan-700" />
                      <div>
                        <p className="font-bold text-slate-900">
                          5 Years of ICU Nursing Experience
                        </p>
                        <p className="text-sm text-slate-600">
                          Critical-care nursing and bedside learning
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <BookOpen className="mt-1 h-5 w-5 shrink-0 text-cyan-700" />
                      <div>
                        <p className="font-bold text-slate-900">
                          Founder & ICU Nursing Educator
                        </p>
                        <p className="text-sm text-slate-600">
                          Focused on structured ICU education
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Introduction */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-3xl bg-gradient-to-br from-cyan-700 to-slate-900 p-8 text-white shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                <Award className="h-9 w-9" />
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Make ICU learning simple, structured, and practical.
              </h2>

              <p className="mt-5 leading-7 text-cyan-50">
                The goal of ICU Learning Portal is to provide easy-to-follow
                educational content that connects nursing theory with
                critical-care practice.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">
                About the Founder
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Meet Avinash Dubey
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Avinash Dubey is the founder of ICU Learning Portal and an ICU
                nursing educator with a B.Sc. Nursing degree and 5 years of ICU
                nursing experience. The platform was created to support
                learners who want to build strong foundations in intensive
                care nursing and critical-care concepts.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                The learning approach focuses on clear explanations,
                practical examples, topic-wise revision, clinical terminology,
                quizzes, and interview-oriented preparation. Courses are
                designed for students and nursing professionals who want to
                revise important ICU topics in a structured way.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <GraduationCap className="h-7 w-7 text-cyan-700" />
                  <p className="mt-3 font-bold text-slate-900">
                    B.Sc. Nursing
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Nursing education foundation
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Clock3 className="h-7 w-7 text-cyan-700" />
                  <p className="mt-3 font-bold text-slate-900">
                    5 Years ICU Experience
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Critical-care nursing exposure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Trust the Platform */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">
                Why Choose ICU Learning Portal
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Built for focused ICU learning
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Our courses are organized to help learners study important
                concepts step by step instead of searching for disconnected
                information.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {learningBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="font-semibold text-slate-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Created */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">
                Course Collection
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Courses created for ICU learners
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Explore the major learning programs available on ICU Learning
                Portal.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 font-bold text-cyan-700 hover:text-cyan-900"
            >
              View All Courses
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <article
                key={course.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 font-black text-cyan-700">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {course.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {course.description}
                </p>

                <Link
                  href="/courses"
                  className="mt-5 inline-flex items-center gap-2 font-bold text-cyan-700"
                >
                  Explore Program
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Trust and Safety */}
        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                <ShieldCheck className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-3xl font-black">
                Education with responsibility
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                ICU Learning Portal provides educational content for learning,
                revision, and professional development. Course material does
                not replace hospital protocols, clinical supervision, or
                instructions from qualified healthcare professionals.
              </p>
            </div>

            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <Target className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-3xl font-black">
                Our learner-first approach
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                We aim to make difficult ICU topics easier to understand using
                organized lessons, clinical terminology, practical examples,
                quizzes, and continuous revision.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-cyan-50 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Users className="mx-auto h-12 w-12 text-cyan-700" />

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Ready to improve your ICU knowledge?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Start learning with structured ICU courses designed for nursing
              students and critical-care professionals.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-6 py-3 font-bold text-white transition hover:bg-cyan-800"
              >
                Browse Courses
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-700 px-6 py-3 font-bold text-cyan-800 transition hover:bg-cyan-100"
              >
                Contact Founder
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}