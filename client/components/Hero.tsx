import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  PlayCircle,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-blue-50 blur-3xl" />

        <div className="absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-cyan-50 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* =========================================================
          MAIN CONTAINER
      ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div className="max-w-2xl">
            {/* Platform Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.13em] text-blue-700">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              Professional Critical Care Learning
            </div>

            {/* Heading */}

            <h1 className="mt-6 text-[2.8rem] font-black leading-[1.04] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-[4.25rem]">
              Build Stronger
              <span className="block bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ICU & Critical
              </span>
              <span className="block">Care Skills.</span>
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Learn ICU nursing, mechanical ventilation, ECG, ABG,
              emergency care and critical-care concepts through structured
              courses, practical lessons, revision resources and assessments.
            </p>

            {/* CTA */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25"
              >
                Explore Courses

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

            {/* Trust line */}

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-slate-500">
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Structured learning
              </div>

              <div className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Practical ICU resources
              </div>

              <div className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Assessments & certificates
              </div>
            </div>

            {/* =================================================
                LEARNING ECOSYSTEM
            ================================================= */}

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              <LearningFeature
                icon={<BookOpenCheck size={18} />}
                title="Courses"
                description="Structured"
              />

              <LearningFeature
                icon={<PlayCircle size={18} />}
                title="Video"
                description="Practical"
              />

              <LearningFeature
                icon={<Activity size={18} />}
                title="Assessments"
                description="Knowledge"
              />

              <LearningFeature
                icon={<Award size={18} />}
                title="Certificates"
                description="Achievement"
              />
            </div>
          </div>

          {/* =====================================================
              RIGHT VISUAL
          ===================================================== */}

          <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
            {/* Main visual frame */}

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-2 shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
              <div className="relative aspect-[4/4.35] overflow-hidden rounded-[1.55rem]">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85"
                  alt="Healthcare professional learning in a clinical environment"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Image overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
                        ICU Learning Portal
                      </p>

                      <h2 className="mt-2 max-w-sm text-2xl font-black leading-tight text-white sm:text-3xl">
                        Learn critical care with a structured pathway.
                      </h2>
                    </div>

                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm sm:flex">
                      <Stethoscope size={21} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical top bar */}

              <div className="absolute left-7 right-7 top-7 rounded-2xl border border-white/10 bg-slate-950/70 p-3.5 shadow-xl backdrop-blur-md sm:left-8 sm:right-8 sm:top-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Activity size={19} />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Learning Track
                      </p>

                      <p className="mt-0.5 text-sm font-black text-white">
                        Critical Care Essentials
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-300">
                    Professional
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                FLOATING CARD - TOP RIGHT
            ================================================= */}

            <div className="absolute -right-3 top-20 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block lg:-right-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Learning Standard
                  </p>

                  <p className="mt-0.5 text-sm font-black text-slate-900">
                    Structured & Practical
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                FLOATING CARD - BOTTOM LEFT
            ================================================= */}

            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:-left-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Users size={20} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Built for
                  </p>

                  <p className="mt-0.5 text-sm font-black text-slate-900">
                    Healthcare Learners
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                SMALL VISUAL LABEL
            ================================================= */}

            <div className="absolute -bottom-8 right-4 hidden items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2.5 text-xs font-bold text-blue-700 shadow-lg sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Learn at your own pace
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM PLATFORM STRIP
        ===================================================== */}

        <div className="mt-16 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <PlatformValue
              icon={<BookOpenCheck size={19} />}
              title="Structured Courses"
              description="Follow clear learning paths from fundamentals to advanced topics."
            />

            <PlatformValue
              icon={<Activity size={19} />}
              title="Clinical Learning"
              description="Build practical understanding of important ICU concepts."
            />

            <PlatformValue
              icon={<Award size={19} />}
              title="Learning Achievement"
              description="Complete eligible programs and earn course certificates."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   LEARNING FEATURE
============================================================= */

function LearningFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-3.5 shadow-sm backdrop-blur-sm transition duration-300 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-black text-slate-900">{title}</p>

          <p className="mt-0.5 text-[10px] font-medium text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   PLATFORM VALUE
============================================================= */

function PlatformValue({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 sm:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-950">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}