import {
  Award,
  BookOpenCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
  Video,
} from "lucide-react";

const platformFeatures = [
  {
    icon: GraduationCap,
    value: "Structured",
    label: "Learning Pathways",
    description: "Beginner to advanced critical-care learning",
  },
  {
    icon: BookOpenCheck,
    value: "Professional",
    label: "ICU Courses",
    description: "Focused nursing and critical-care education",
  },
  {
    icon: Video,
    value: "Practical",
    label: "Video Lessons",
    description: "Learn concepts through structured lessons",
  },
  {
    icon: FileText,
    value: "Study",
    label: "Notes & Resources",
    description: "Revision material for focused learning",
  },
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Structured Learning",
    description: "Organized course pathways",
  },
  {
    icon: Award,
    title: "Course Completion",
    description: "Assessment-based learning",
  },
  {
    icon: BookOpenCheck,
    title: "Clinical Focus",
    description: "ICU and critical-care concepts",
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200/80 bg-slate-50 py-16 sm:py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700 shadow-sm">
            <ShieldCheck size={15} />
            Professional Learning Platform
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Everything You Need to Learn
            <span className="block text-blue-700">
              Critical Care With Confidence
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Build your ICU knowledge through structured courses, practical
            lessons, study resources and assessment-focused learning.
          </p>
        </div>

        {/* Feature Statistics */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl"
              >
                {/* Card glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition duration-300 group-hover:bg-blue-700 group-hover:text-white">
                    <Icon size={23} strokeWidth={2.2} />
                  </div>

                  <div className="flex h-7 items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </div>
                </div>

                <div className="relative mt-6">
                  <p className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    {feature.value}
                  </p>

                  <h3 className="mt-1.5 text-base font-extrabold text-blue-700">
                    {feature.label}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Trust Strip */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            {trustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div
                  key={point.title}
                  className="flex items-center gap-4 px-6 py-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      {point.title}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}