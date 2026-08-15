import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Stethoscope,
} from "lucide-react";

const steps = [
  {
    number: "01",
    level: "Beginner",
    title: "Build Your Foundation",
    description:
      "Start with ICU fundamentals, patient assessment, vital signs, monitoring and essential critical care concepts.",
    icon: BookOpen,
    features: [
      "ICU Fundamentals",
      "Patient Assessment",
      "Vital Signs",
    ],
  },
  {
    number: "02",
    level: "Intermediate",
    title: "Develop Clinical Skills",
    description:
      "Strengthen your practical knowledge with ventilator management, ECG interpretation, ABG analysis and emergency care.",
    icon: Stethoscope,
    features: [
      "Ventilator Management",
      "ECG Interpretation",
      "ABG Analysis",
    ],
  },
  {
    number: "03",
    level: "Advanced",
    title: "Master Critical Care",
    description:
      "Apply advanced concepts through ICU cases, emergency scenarios, clinical decision-making and structured assessments.",
    icon: GraduationCap,
    features: [
      "Critical Care Cases",
      "Emergency Management",
      "Advanced Assessment",
    ],
  },
  {
    number: "04",
    level: "Certified",
    title: "Earn Your Achievement",
    description:
      "Complete your learning pathway, pass the required assessments and earn your course completion certificate.",
    icon: Award,
    features: [
      "Final Assessment",
      "Course Completion",
      "Digital Certificate",
    ],
  },
];

export default function LearningPathway() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            🎯 Learning Pathway
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Your Journey to Critical Care Expertise
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Follow a structured learning pathway designed to take you from
            essential ICU knowledge to advanced critical care skills.
          </p>
        </div>

        {/* Pathway */}
        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-12 hidden h-[calc(100%-6rem)] w-px -translate-x-1/2 bg-gradient-to-b from-blue-200 via-blue-300 to-yellow-200 lg:block" />

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isRight = index % 2 !== 0;

              return (
                <div
                  key={step.number}
                  className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-20"
                >
                  {/* Desktop connector node */}
                  <div className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-blue-700 text-xs font-extrabold text-white shadow-xl lg:flex">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div
                    className={`${
                      isRight ? "lg:col-start-2" : "lg:col-start-1"
                    }`}
                  >
                    <article className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl md:p-8">
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                          <Icon size={27} />
                        </div>

                        <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-600">
                          {step.level}
                        </span>
                      </div>

                      <p className="mt-6 text-sm font-extrabold text-blue-700">
                        STEP {step.number}
                      </p>

                      <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-4 leading-7 text-slate-600">
                        {step.description}
                      </p>

                      <div className="mt-6 space-y-3">
                        {step.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-3 text-sm font-medium text-slate-600"
                          >
                            <CheckCircle2
                              size={17}
                              className="shrink-0 text-green-600"
                            />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-white shadow-2xl md:p-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-200">
                Start Your Journey
              </p>

              <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">
                Ready to build your ICU critical care expertise?
              </h3>

              <p className="mt-3 leading-7 text-blue-100">
                Choose a course and start learning with structured lessons,
                practical resources and assessments.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              Explore Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}