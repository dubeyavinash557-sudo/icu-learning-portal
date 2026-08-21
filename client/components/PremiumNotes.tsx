import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const resources = [
  {
    number: "01",
    category: "ICU Nursing",
    title: "ICU Nursing Complete Notes",
    description:
      "A structured critical-care reference covering patient assessment, monitoring, emergency care, ICU procedures and essential nursing concepts.",
    type: "Premium PDF",
    pages: "120+ Pages",
    topics: "35+ Topics",
    href: "/notes/icu-nursing",
    icon: "🏥",
    featured: true,
  },
  {
    number: "02",
    category: "Mechanical Ventilation",
    title: "Mechanical Ventilator Notes",
    description:
      "Learn ventilator modes, settings, alarms, oxygenation, ventilation, weaning and practical mechanical-ventilation concepts.",
    type: "Premium PDF",
    pages: "150+ Pages",
    topics: "40+ Topics",
    href: "/notes/ventilator",
    icon: "🫁",
    featured: false,
  },
  {
    number: "03",
    category: "Cardiac Care",
    title: "ECG Interpretation Notes",
    description:
      "A practical ECG resource covering rhythm recognition, arrhythmias, heart blocks and important emergency ECG patterns.",
    type: "Premium PDF",
    pages: "90+ Pages",
    topics: "28+ Topics",
    href: "/notes/ecg",
    icon: "❤️",
    featured: false,
  },
  {
    number: "04",
    category: "Critical Care",
    title: "ABG Analysis Notes",
    description:
      "Master systematic ABG interpretation with pH, PaCO₂, HCO₃⁻, compensation, acid-base disorders and clinical cases.",
    type: "Premium PDF",
    pages: "80+ Pages",
    topics: "24+ Topics",
    href: "/notes/abg",
    icon: "🩸",
    featured: false,
  },
  {
    number: "05",
    category: "Emergency ICU",
    title: "ICU Emergency Drugs Notes",
    description:
      "A revision-focused reference for commonly encountered emergency medications, indications, precautions and critical-care concepts.",
    type: "Premium PDF",
    pages: "100+ Pages",
    topics: "30+ Topics",
    href: "/notes/emergency-drugs",
    icon: "💊",
    featured: false,
  },
  {
    number: "06",
    category: "Clinical Procedures",
    title: "ICU Practical Procedures",
    description:
      "Structured learning material covering essential ICU procedures, equipment, preparation, monitoring and nursing responsibilities.",
    type: "Premium PDF",
    pages: "110+ Pages",
    topics: "32+ Topics",
    href: "/notes/icu-procedures",
    icon: "🩺",
    featured: false,
  },
  {
    number: "07",
    category: "Interview Preparation",
    title: "ICU Interview & Viva Guide",
    description:
      "High-yield ICU interview questions, viva preparation, practical scenarios and important concepts for healthcare professionals.",
    type: "Premium PDF",
    pages: "95+ Pages",
    topics: "300+ Questions",
    href: "/notes/icu-interview",
    icon: "🎓",
    featured: false,
  },
  {
    number: "08",
    category: "Exam Preparation",
    title: "ICU MCQ & Question Bank",
    description:
      "Practice-focused question bank covering ICU nursing, ventilation, ECG, ABG, emergency care and critical-care concepts.",
    type: "Premium PDF",
    pages: "130+ Pages",
    topics: "500+ MCQs",
    href: "/notes/icu-mcq",
    icon: "📝",
    featured: false,
  },
];

export default function PremiumNotes() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-100/60 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-7 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm">
              <Sparkles size={15} />
              Premium Study Library
            </div>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Professional ICU
              <span className="block bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700 bg-clip-text text-transparent">
                Notes & PDF Resources
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Build your personal critical-care library with structured notes,
              practical references, interview preparation material and
              high-yield question banks.
            </p>

            {/* Trust row */}
            <div className="mt-7 flex flex-wrap gap-3">
              <TrustBadge
                icon={<ShieldCheck size={15} />}
                text="Structured Content"
              />

              <TrustBadge
                icon={<Download size={15} />}
                text="Downloadable PDFs"
              />

              <TrustBadge
                icon={<CheckCircle2 size={15} />}
                text="Revision Friendly"
              />
            </div>
          </div>

          <Link
            href="/notes"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-slate-800 shadow-sm transition hover:border-blue-400 hover:text-blue-700 hover:shadow-lg"
          >
            Explore Notes Library
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Library Stats */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <LibraryStat
            value="8+"
            label="Premium Resources"
          />

          <LibraryStat
            value="900+"
            label="Learning Pages"
          />

          <LibraryStat
            value="500+"
            label="Practice MCQs"
          />

          <LibraryStat
            value="100%"
            label="Revision Focused"
          />
        </div>

        {/* Featured Resource */}
        <article className="mb-10 overflow-hidden rounded-[2rem] border border-blue-200 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-6 shadow-2xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-950">
                  <Star size={12} fill="currentColor" />
                  Featured Resource
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-cyan-200">
                  Premium PDF
                </span>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl ring-1 ring-white/10 sm:flex">
                  🏥
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                    Complete Critical Care Reference
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                    ICU Nursing Complete Notes
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                    A comprehensive learning resource designed to organize
                    essential ICU nursing knowledge into one professional
                    revision library.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <ResourceMeta text="120+ Pages" />

                <ResourceMeta text="35+ Topics" />

                <ResourceMeta text="Premium Access" />

                <ResourceMeta text="Revision Ready" />
              </div>
            </div>

            <Link
              href="/notes/icu-nursing"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 shadow-xl transition hover:bg-cyan-300"
            >
              <Download size={18} />
              View Premium Notes
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </article>

        {/* Resource Grid */}
        <div className="mb-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {resources.slice(1).map((resource) => (
            <ResourceCard
              key={resource.title}
              resource={resource}
            />
          ))}
        </div>

        {/* Premium CTA */}
        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-2xl">
          <div className="relative p-7 sm:p-9 lg:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-cyan-300">
                  <LockKeyhole size={18} />

                  <span className="text-xs font-black uppercase tracking-[0.16em]">
                    Premium Student Library
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                  One Premium Membership.
                  <span className="block text-cyan-300">
                    Complete ICU Learning Resources.
                  </span>
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Get access to professional video lessons, structured PDF
                  notes, quizzes, question banks and certificate-based learning
                  from one complete platform.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  <Benefit text="Premium PDF Notes" />
                  <Benefit text="Video Lessons" />
                  <Benefit text="MCQ Question Banks" />
                  <Benefit text="Course Certificates" />
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/10 transition hover:bg-cyan-300"
                >
                  Start Premium Learning
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <p className="mt-3 text-center text-xs text-slate-500">
                  Create your student account to continue
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-7 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <BookOpen
            size={16}
            className="text-blue-600"
          />

          <p className="text-xs font-medium text-slate-500">
            Designed for structured ICU learning, revision and professional
            exam preparation.
          </p>
        </div>
      </div>
    </section>
  );
}

/*
 * ==========================================================
 * RESOURCE CARD
 * ==========================================================
 */

function ResourceCard({
  resource,
}: {
  resource: (typeof resources)[number];
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-2xl">
      {/* Top */}
      <div className="relative border-b border-slate-100 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-2xl shadow-sm ring-1 ring-slate-100">
            {resource.icon}
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-blue-700">
            <LockKeyhole size={11} />
            Premium
          </span>
        </div>

        <p className="mt-5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
          {resource.category}
        </p>

        <h3 className="mt-1 min-h-[56px] text-lg font-black leading-7 text-slate-950">
          {resource.title}
        </h3>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-4 text-sm leading-6 text-slate-600">
          {resource.description}
        </p>

        {/* Metadata */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <SmallMeta
            label="Format"
            value={resource.type}
          />

          <SmallMeta
            label="Content"
            value={resource.pages}
          />

          <SmallMeta
            label="Coverage"
            value={resource.topics}
          />

          <SmallMeta
            label="Access"
            value="Premium"
          />
        </div>

        {/* Benefits */}
        <div className="mt-5 space-y-2">
          <Benefit
            text="Structured learning content"
            dark={false}
          />

          <Benefit
            text="Quick revision friendly"
            dark={false}
          />
        </div>

        {/* Action */}
        <Link
          href={resource.href}
          className="group/button mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
        >
          <Download size={17} />

          View Resource

          <ArrowRight
            size={16}
            className="transition-transform group-hover/button:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

/*
 * ==========================================================
 * TRUST BADGE
 * ==========================================================
 */

function TrustBadge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm">
      <span className="text-blue-600">{icon}</span>
      {text}
    </div>
  );
}

/*
 * ==========================================================
 * LIBRARY STAT
 * ==========================================================
 */

function LibraryStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-2xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}

/*
 * ==========================================================
 * RESOURCE META
 * ==========================================================
 */

function ResourceMeta({
  text,
}: {
  text: string;
}) {
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200">
      {text}
    </span>
  );
}

/*
 * ==========================================================
 * SMALL META
 * ==========================================================
 */

function SmallMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-2.5">
      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-bold text-slate-700">
        {value}
      </p>
    </div>
  );
}

/*
 * ==========================================================
 * BENEFIT
 * ==========================================================
 */

function Benefit({
  text,
  dark = true,
}: {
  text: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-semibold ${
        dark ? "text-slate-300" : "text-slate-600"
      }`}
    >
      <CheckCircle2
        size={14}
        className="shrink-0 text-emerald-500"
      />

      <span>{text}</span>
    </div>
  );
}