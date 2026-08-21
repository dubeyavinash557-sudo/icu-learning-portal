import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
  Target,
} from "lucide-react";

const steps = [
  {
    number: "01",
    level: "Foundation",
    title: "Build Your ICU Foundation",
    description:
      "Start with essential ICU nursing and critical-care concepts that create a strong clinical foundation.",
    icon: BookOpenCheck,
    accent: "blue",
    features: [
      "ICU Fundamentals",
      "Patient Assessment",
      "Vital Signs & Monitoring",
    ],
  },
  {
    number: "02",
    level: "Clinical Skills",
    title: "Develop Practical Skills",
    description:
      "Move into important clinical topics including mechanical ventilation, ECG interpretation, ABG analysis and emergency care.",
    icon: Stethoscope,
    accent: "cyan",
    features: [
      "Mechanical Ventilation",
      "ECG Interpretation",
      "ABG Analysis",
    ],
  },
  {
    number: "03",
    level: "Advanced",
    title: "Strengthen Critical Care Knowledge",
    description:
      "Apply your knowledge through advanced concepts, clinical scenarios, emergency management and structured assessments.",
    icon: Target,
    accent: "indigo",
    features: [
      "Critical Care Cases",
      "Emergency Management",
      "Clinical Assessment",
    ],
  },
  {
    number: "04",
    level: "Achievement",
    title: "Complete & Get Certified",
    description:
      "Complete the required lessons and assessments, then receive your course completion certificate.",
    icon: Award,
    accent: "emerald",
    features: [
      "Final Assessment",
      "Course Completion",
      "Digital Certificate",
    ],
  },
];

const accentStyles = {
  blue: {
    icon: "bg-blue-50 text-blue-700 ring-blue-100",
    number: "bg-blue-700",
    label: "text-blue-700",
    line: "bg-blue-200",
  },
  cyan: {
    icon: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    number: "bg-cyan-600",
    label: "text-cyan-700",
    line: "bg-cyan-200",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    number: "bg-indigo-700",
    label: "text-indigo-700",
    line: "bg-indigo-200",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    number: "bg-emerald-600",
    label: "text-emerald-700",
    line: "bg-emerald-200",
  },
} as const;

export default function LearningPathway() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-100/30 blur-3xl" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700 shadow-sm">
            <GraduationCap size={15} />
            Learning Pathway
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            A Structured Path to
            <span className="block text-blue-700">
              Critical Care Expertise
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Follow a clear learning journey from ICU fundamentals to advanced
            critical-care concepts, assessments and course completion.
          </p>
        </div>

        {/* Desktop pathway */}
        <div className="relative mt-14 hidden lg:block">
          {/* Connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[30px] h-px bg-gradient-to-r from-blue-200 via-cyan-300 to-emerald-200" />

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              const style = accentStyles[step.accent as keyof typeof accentStyles];

              return (
                <article
                  key={step.number}
                  className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
                >
                  {/* Timeline node */}
                  <div className="relative z-10 mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-full border-4 border-slate-50 bg-white shadow-md">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white ${style.number}`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition duration-300 group-hover:scale-105 ${style.icon}`}
                  >
                    <Icon size={26} strokeWidth={2} />
                  </div>

                  {/* Level */}
                  <div className="mt-6 text-center">
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.16em] ${style.label}`}
                    >
                      {step.level}
                    </span>

                    <h3 className="mt-2 text-xl font-black leading-tight text-slate-950">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-center text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                    {step.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2.5 text-sm font-medium text-slate-600"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-emerald-600"
                        />

                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Step indicator */}
                  <div className="mt-6 flex items-center justify-center gap-1 text-xs font-bold text-slate-400">
                    <span>Step {step.number}</span>
                    <ChevronRight size={14} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet pathway */}
        <div className="relative mt-12 lg:hidden">
          {/* Vertical line */}
          <div className="absolute bottom-8 left-[28px] top-8 w-px bg-gradient-to-b from-blue-200 via-cyan-200 to-emerald-200" />

          <div className="space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;
              const style = accentStyles[step.accent as keyof typeof accentStyles];

              return (
                <article
                  key={step.number}
                  className="relative ml-0 rounded-3xl border border-slate-200 bg-white p-5 pl-20 shadow-sm"
                >
                  {/* Timeline node */}
                  <div className="absolute left-2 top-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-50 bg-white shadow-md">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black text-white ${style.number}`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${style.icon}`}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Content */}
                  <div className="mt-5">
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.14em] ${style.label}`}
                    >
                      {step.level}
                    </span>

                    <h3 className="mt-1.5 text-xl font-black leading-tight text-slate-950">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                    {step.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 text-sm font-medium text-slate-600"
                      >
                        <CheckCircle2
                          size={16}
                          className="shrink-0 text-emerald-600"
                        />

                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Progress / outcome strip */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
          <div className="grid md:grid-cols-3">
            <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-5 md:border-b-0 md:border-r">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <BookOpenCheck size={21} />
              </div>

              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Learn Systematically
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Follow organized course modules
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-5 md:border-b-0 md:border-r">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <ShieldCheck size={21} />
              </div>

              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Assess Your Knowledge
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Reinforce learning through assessments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Award size={21} />
              </div>

              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Complete Your Course
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Earn your course completion certificate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-7 text-white shadow-2xl sm:p-9">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                <GraduationCap size={15} />
                Start Your Learning Journey
              </div>

              <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                Choose your starting point and begin learning today.
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Explore ICU nursing, mechanical ventilation, ECG, ABG and
                other critical-care learning resources.
              </p>
            </div>

            <Link
              href="/courses"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
            >
              Explore Courses

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}