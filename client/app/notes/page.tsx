import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Download,
  FileText,
  HeartPulse,
  LockKeyhole,
  Search,
  ShieldCheck,
  Stethoscope,
  Wind,
} from "lucide-react";

const notes = [
  {
    title: "ICU Nursing Notes",
    description:
      "Essential ICU nursing concepts, patient monitoring, emergency care, practical procedures and critical care fundamentals.",
    category: "Critical Care Nursing",
    icon: Stethoscope,
    iconClass:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    badgeClass:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
    pdf: "/pdfs/icu-nursing-notes.pdf",
    course: "/courses/icu-nursing",
    topics: [
      "ICU Basics",
      "Patient Monitoring",
      "Emergency Care",
      "Practical ICU Skills",
    ],
  },
  {
    title: "Ventilator Notes",
    description:
      "Mechanical ventilation notes covering ventilator modes, settings, alarms, monitoring and nursing care.",
    category: "Mechanical Ventilation",
    icon: Wind,
    iconClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    badgeClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    pdf: "/pdfs/ventilator-notes.pdf",
    course: "/courses/ventilator",
    topics: [
      "Ventilator Modes",
      "Ventilator Settings",
      "Alarm Management",
      "Weaning & Nursing Care",
    ],
  },
  {
    title: "ECG Notes",
    description:
      "Study ECG fundamentals, waveform interpretation, cardiac rhythms and important emergency ECG patterns.",
    category: "ECG Interpretation",
    icon: HeartPulse,
    iconClass:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
    badgeClass:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300",
    pdf: "/pdfs/ecg-notes.pdf",
    course: "/courses/ecg",
    topics: [
      "ECG Basics",
      "Waveform Analysis",
      "Cardiac Rhythms",
      "Emergency ECG",
    ],
  },
  {
    title: "ABG Notes",
    description:
      "Learn arterial blood gas analysis, acid-base disorders, oxygenation and step-by-step clinical interpretation.",
    category: "ABG Analysis",
    icon: Brain,
    iconClass:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
    badgeClass:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300",
    pdf: "/pdfs/abg-notes.pdf",
    course: "/courses/abg",
    topics: [
      "Normal ABG Values",
      "Acid-Base Disorders",
      "ABG Interpretation",
      "Clinical Case Practice",
    ],
  },
];

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-lg">
              <BookOpen size={22} />
            </div>

            <div>
              <h1 className="font-bold text-slate-900 dark:text-white">
                ICU Learning
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nursing Notes Library
              </p>
            </div>
          </Link>

          <Link
            href="/courses"
            className="hidden items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-700 sm:inline-flex"
          >
            Explore Courses
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-7 text-white shadow-xl sm:p-10 lg:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur-sm">
              <FileText size={17} />
              Nursing Study Resources
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              ICU Nursing Notes Library
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              Access practical study notes for ICU Nursing, Mechanical
              Ventilation, ECG and ABG. Use these resources to revise important
              concepts and strengthen your critical care knowledge.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#notes-library"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                <Search size={18} />
                Browse Notes
              </a>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                View Courses
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="my-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Benefit
            icon={<FileText size={21} />}
            title="Study Notes"
            text="Focused nursing study material"
          />

          <Benefit
            icon={<Stethoscope size={21} />}
            title="ICU Focused"
            text="Critical care learning resources"
          />

          <Benefit
            icon={<CheckCircle2 size={21} />}
            title="Revision Ready"
            text="Useful for quick revision"
          />

          <Benefit
            icon={<ShieldCheck size={21} />}
            title="Learning Support"
            text="Designed for nursing students"
          />
        </section>

        {/* Notes Heading */}
        <section
          id="notes-library"
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Study Library
            </p>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Popular Nursing Notes
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Choose a subject and start studying.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">
            <CheckCircle2 size={16} />
            Free Study Resources
          </div>
        </section>

        {/* Notes Cards */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {notes.map((note) => {
            const Icon = note.icon;

            return (
              <article
                key={note.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Card Top */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${note.iconClass}`}
                    >
                      <Icon size={28} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${note.badgeClass}`}
                    >
                      Free Notes
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {note.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {note.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {note.description}
                  </p>

                  {/* Topics */}
                  <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {note.topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        <CheckCircle2
                          size={15}
                          className="shrink-0 text-cyan-600 dark:text-cyan-400"
                        />

                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 gap-3 border-t border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/50 sm:grid-cols-2">
                  <a
                    href={note.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700"
                  >
                    <Download size={17} />
                    Open PDF
                  </a>

                  <Link
                    href={note.course}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    View Course
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        {/* Premium CTA */}
        <section className="mt-10 overflow-hidden rounded-3xl border border-yellow-200 bg-gradient-to-r from-yellow-50 via-white to-orange-50 p-7 shadow-lg dark:border-yellow-500/20 dark:from-yellow-500/5 dark:via-slate-900 dark:to-orange-500/5 sm:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                <Award size={28} />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300">
                  <LockKeyhole size={13} />
                  Premium Learning
                </div>

                <h2 className="mt-3 text-2xl font-bold">
                  Want complete ICU training?
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Go beyond notes with structured courses, practical lessons,
                  quizzes, progress tracking and professional certificates.
                </p>
              </div>
            </div>

            <Link
              href="/courses"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Explore Premium Courses
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-10 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
              <BookOpen size={26} />
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              Build Your Critical Care Knowledge
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Study consistently, complete your courses, take quizzes and earn
              certificates through ICU Learning Portal.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Benefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold">{title}</h3>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}