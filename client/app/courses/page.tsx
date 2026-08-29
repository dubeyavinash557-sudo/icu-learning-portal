import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Crown,
  FileText,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";

type CourseCatalogItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  level: string;
  duration: string;
  lessons: string;
  language: string;
  accent: string;
};

const COURSES: CourseCatalogItem[] = [
  {
    slug: "abg",
    title: "ABG Analysis & Acid-Base Disorders Masterclass",
    category: "Critical Care • ABG",
    description:
      "Structured ABG learning covering normal values, acid-base disorders, compensation, mixed disorders and ICU case interpretation.",
    level: "Beginner to Advanced",
    duration: "9+ Hours",
    lessons: "11 Lessons",
    language: "Hindi + English",
    accent: "from-cyan-600 via-blue-600 to-indigo-700",
  },

  {
    slug: "airway-management",
    title: "Airway Management & Intubation Master Course",
    category: "Critical Care • Airway",
    description:
      "Professional airway-learning pathway covering airway assessment, oxygenation, intubation support, airway devices and ICU airway safety.",
    level: "Intermediate to Advanced",
    duration: "10+ Hours",
    lessons: "Structured Lessons",
    language: "Hindi + English",
    accent: "from-blue-600 via-indigo-600 to-cyan-600",
  },

  {
    slug: "critical-care-monitoring",
    title: "Critical Care Monitoring Master Course",
    category: "Critical Care • Monitoring",
    description:
      "Learn systematic ICU monitoring including vital signs, ECG, SpO₂, neurological assessment, fluid balance and hemodynamic concepts.",
    level: "Intermediate to Advanced",
    duration: "10+ Hours",
    lessons: "Structured Lessons",
    language: "Hindi + English",
    accent: "from-indigo-600 via-blue-600 to-cyan-600",
  },

  {
    slug: "critical-care-nursing",
    title: "Critical Care Nursing Master Course",
    category: "Critical Care • Advanced Nursing",
    description:
      "A professional critical-care nursing pathway covering ICU assessment, monitoring, airway and ventilator care, emergencies and advanced bedside practice.",
    level: "Intermediate to Advanced",
    duration: "18+ Hours",
    lessons: "90 Lessons",
    language: "Hindi + English",
    accent: "from-blue-600 via-cyan-600 to-indigo-700",
  },

  {
    slug: "ecg",
    title: "ECG & Cardiac Rhythm Interpretation Masterclass",
    category: "Critical Care • ECG",
    description:
      "Structured ECG training covering ECG fundamentals, rhythm analysis, conduction abnormalities and important critical-care ECG patterns.",
    level: "Beginner to Advanced",
    duration: "10+ Hours",
    lessons: "Structured Lessons",
    language: "Hindi + English",
    accent: "from-rose-600 via-red-600 to-blue-700",
  },

  {
    slug: "emergency-care",
    title: "ICU Emergency & Critical Care Management",
    category: "Critical Care • Emergency",
    description:
      "Professional emergency-care program covering deterioration, resuscitation, airway emergencies, shock, sepsis and cardiac emergencies.",
    level: "Intermediate to Advanced",
    duration: "11+ Hours",
    lessons: "Structured Lessons",
    language: "Hindi + English",
    accent: "from-red-600 via-orange-600 to-blue-700",
  },

  {
    slug: "icu-emergency-drugs",
    title: "ICU Emergency Drugs Master Course",
    category: "Critical Care • Emergency Pharmacology",
    description:
      "Systematic learning of ICU emergency drugs, medication safety, emergency pharmacology, monitoring principles and case-based practice.",
    level: "Intermediate to Advanced",
    duration: "12+ Hours",
    lessons: "60 Lessons",
    language: "Hindi + English",
    accent: "from-amber-500 via-orange-600 to-blue-700",
  },

  {
    slug: "icu-nursing",
    title: "ICU Nursing Master Course",
    category: "Critical Care • ICU Nursing",
    description:
      "Comprehensive ICU nursing education covering patient assessment, monitoring, ventilator care, emergency management and bedside responsibilities.",
    level: "Beginner to Advanced",
    duration: "Structured Program",
    lessons: "Structured Lessons",
    language: "Hindi + English",
    accent: "from-blue-600 via-cyan-600 to-indigo-700",
  },

  {
    slug: "icu-nursing-interview-viva",
    title: "ICU Nursing Interview & Viva Master Course",
    category: "Career • ICU Nursing Interview",
    description:
      "Prepare for ICU nursing interviews, viva questions and practical discussions across ventilators, emergency care, drugs, monitoring and procedures.",
    level: "All Levels",
    duration: "10+ Hours",
    lessons: "50 Lessons",
    language: "Hindi + English",
    accent: "from-blue-600 via-indigo-600 to-cyan-600",
  },

  {
    slug: "icu-technician-master",
    title: "ICU Technician Master Course",
    category: "Critical Care • ICU Technician",
    description:
      "Professional ICU technician learning covering equipment, patient monitoring, emergency support, airway assistance and critical-care workflows.",
    level: "Beginner to Intermediate",
    duration: "12+ Hours",
    lessons: "56 Lessons",
    language: "Hindi + English",
    accent: "from-violet-600 via-blue-600 to-cyan-600",
  },

  {
    slug: "infection-control",
    title: "Infection Control & Patient Safety Master Course",
    category: "Critical Care • Infection Prevention",
    description:
      "Learn infection prevention, isolation precautions, hand hygiene, PPE, device-associated infection prevention and ICU patient safety.",
    level: "Beginner to Intermediate",
    duration: "8+ Hours",
    lessons: "40 Lessons",
    language: "Hindi + English",
    accent: "from-emerald-600 via-cyan-600 to-blue-700",
  },

  {
    slug: "mechanical-ventilation",
    title: "Mechanical Ventilation Master Course",
    category: "Critical Care • Ventilator",
    description:
      "Comprehensive mechanical ventilation learning covering ventilator fundamentals, modes, settings, alarms, airway management and ICU nursing responsibilities.",
    level: "Intermediate to Advanced",
    duration: "15+ Hours",
    lessons: "80 Lessons",
    language: "Hindi + English",
    accent: "from-cyan-500 via-blue-600 to-indigo-700",
  },

  {
    slug: "medical-coding",
    title: "Medical Coding Master Course",
    category: "Healthcare • Medical Coding",
    description:
      "Professional medical coding pathway covering ICD-10-CM, CPT, HCPCS, medical terminology and real-world coding practice.",
    level: "Intermediate to Advanced",
    duration: "Structured Program",
    lessons: "Structured Lessons",
    language: "Hindi + English",
    accent: "from-indigo-600 via-violet-600 to-blue-700",
  },

  {
    slug: "ventilator",
    title: "Ventilator Master Course",
    category: "Critical Care • Mechanical Ventilation",
    description:
      "Focused ventilator training covering modes, settings, PEEP, FiO₂, alarms, weaning and essential ICU ventilator-care principles.",
    level: "Intermediate",
    duration: "Structured Program",
    lessons: "Structured Lessons",
    language: "Hindi + English",
    accent: "from-cyan-600 via-blue-600 to-indigo-700",
  },
];

export default function CoursesPage() {
  const totalCourses = COURSES.length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-blue-600/10 blur-3xl" />

          <div className="absolute bottom-[-15rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                <GraduationCap size={16} />
                ICU Learning Portal
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-300">
                <Crown size={14} />
                Premium Professional Learning
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium ICU & Critical Care
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Learning Programs
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Explore the professional ICU Learning Portal catalogue.
                Select a course, review its complete landing page and curriculum,
                then continue into enrollment and premium LMS access.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#course-list"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-7 py-4 text-sm font-black text-white shadow-xl shadow-cyan-500/20 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  Browse All Courses
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10"
                >
                  <PlayCircle size={18} />
                  My Learning
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
                <TrustItem label="14 Professional Courses" />
                <TrustItem label="Structured Curriculum" />
                <TrustItem label="Premium LMS Access" />
                <TrustItem label="Progress & Certificates" />
              </div>
            </div>

            {/* RIGHT */}

            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                      <Crown size={27} />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">
                        Premium Course Library
                      </p>

                      <h2 className="mt-1 text-xl font-black text-white">
                        Professional ICU Collection
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <HeroStat
                    value="14"
                    label="Professional Courses"
                    icon={<BookOpen size={18} />}
                  />

                  <HeroStat
                    value="100%"
                    label="Premium Programs"
                    icon={<Crown size={18} />}
                  />

                  <HeroStat
                    value="LMS"
                    label="Structured Learning"
                    icon={<Video size={18} />}
                  />

                  <HeroStat
                    value="24/7"
                    label="Self-Paced Access"
                    icon={<Clock3 size={18} />}
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                      <ShieldCheck size={19} />
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        Protected premium learning
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Public visitors can explore course information.
                        Actual lessons and protected resources remain part of
                        the premium LMS access flow.
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
          CATALOG HEADER
      ========================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-blue-700">
                <Sparkles size={16} />
                Premium Course Catalogue
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                Professional Learning Programs
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                These cards connect directly to the corresponding course
                landing-page files. No demo catalogue data is used here.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <CatalogStat
                label="Courses"
                value={totalCourses}
              />

              <CatalogStat
                label="Access"
                value="Premium"
              />

              <CatalogStat
                label="Platform"
                value="LMS"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COURSE CATALOG
      ========================================================== */}

      <section
        id="course-list"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
            14 Premium Programs
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Choose Your Critical Care Program
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Select any program below to open its dedicated professional landing
            page, review the curriculum and continue toward premium enrollment.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {COURSES.map((course, index) => (
            <CourseCard
              key={course.slug}
              course={course}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* =========================================================
          LMS FEATURES
      ========================================================== */}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
              Premium Learning Experience
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Built Around Serious Learning
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              The catalogue is only the entry point. Each course is intended
              to continue into a structured LMS workflow with enrollment,
              payment, lessons, progress, quizzes and certification.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Video size={23} />}
              title="Structured Lessons"
              description="Course-specific lessons organized inside the professional LMS."
            />

            <FeatureCard
              icon={<FileText size={23} />}
              title="Premium Resources"
              description="Protected study resources available through authorized course access."
            />

            <FeatureCard
              icon={<CheckCircle2 size={23} />}
              title="Assessments"
              description="Quizzes and learning checks connected to the course pathway."
            />

            <FeatureCard
              icon={<Award size={23} />}
              title="Certificates"
              description="Completion milestones can connect with the portal certificate workflow."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          ACCESS MODEL
      ========================================================== */}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            <ValueCard
              icon={<GraduationCap size={22} />}
              title="1. Explore"
              description="Visitors can browse the public catalogue and open any professional course landing page."
            />

            <ValueCard
              icon={<ShieldCheck size={22} />}
              title="2. Premium Access"
              description="Course lessons and protected learning resources remain behind the authenticated premium LMS flow."
            />

            <ValueCard
              icon={<Award size={22} />}
              title="3. Complete"
              description="Enrollment, payment, learning progress, quiz completion and certificate milestones form the learning journey."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 p-7 shadow-2xl sm:p-10 lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-300">
                  <Crown size={16} />
                  Premium ICU Education
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Build Your ICU Knowledge Step by Step
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-300">
                  Choose a course, review its dedicated landing page and
                  continue through the professional ICU Learning Portal LMS.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    14 Courses
                  </span>

                  <span className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    Premium LMS
                  </span>

                  <span className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    Progress Tracking
                  </span>

                  <span className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    Certificate Pathway
                  </span>
                </div>
              </div>

              <a
                href="#course-list"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl transition hover:bg-cyan-50"
              >
                Explore Courses
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   COURSE CARD
================================================================ */

function CourseCard({
  course,
  index,
}: {
  course: CourseCatalogItem;
  index: number;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl">
      {/* COURSE VISUAL */}

      <div
        className={`relative h-52 overflow-hidden bg-gradient-to-br ${course.accent}`}
      >
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/30" />
          <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-white/20" />
        </div>

        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-amber-950 shadow-lg">
              <Crown size={13} />
              Premium
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-2 text-xs font-black text-white backdrop-blur">
              <Star
                size={13}
                className="fill-amber-400 text-amber-400"
              />
              4.9
            </span>
          </div>

          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
              <GraduationCap size={25} />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.12em] text-white/80">
              Program {String(index + 1).padStart(2, "0")}
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              {course.category}
            </p>
          </div>
        </div>
      </div>

      {/* BODY */}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-blue-700">
            <ShieldCheck size={12} />
            Professional LMS
          </span>

          <span className="text-xs font-bold text-slate-400">
            {course.language}
          </span>
        </div>

        <h3 className="mt-4 min-h-[4rem] text-xl font-black leading-7 text-slate-950 transition group-hover:text-blue-700">
          {course.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {course.description}
        </p>

        {/* META */}

        <div className="mt-6 grid grid-cols-2 gap-2">
          <CourseMeta
            icon={<BookOpen size={15} />}
            value={course.lessons}
          />

          <CourseMeta
            icon={<Clock3 size={15} />}
            value={course.duration}
          />

          <CourseMeta
            icon={<GraduationCap size={15} />}
            value={course.level}
          />

          <CourseMeta
            icon={<Users size={15} />}
            value="Premium"
          />
        </div>

        {/* PREMIUM VALUE */}

        <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Crown size={17} />
            </div>

            <div>
              <p className="text-sm font-black text-slate-800">
                Premium learning access
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                Review the full curriculum and course details before
                continuing to premium enrollment.
              </p>
            </div>
          </div>
        </div>

        <div className="my-5 border-t border-slate-100" />

        {/* CTA */}

        <div className="mt-auto">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                Course Access
              </p>

              <p className="mt-1 text-lg font-black text-blue-700">
                Premium Program
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-3 py-2 text-right">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Details
              </p>

              <p className="mt-1 text-xs font-black text-slate-700">
                Full Curriculum
              </p>
            </div>
          </div>

          {/* IMPORTANT:
              This points to the REAL course landing-page file,
              NOT the generic database course route.
          */}

          <Link
            href={`/courses/${course.slug}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Course Details
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
   COURSE META
================================================================ */

function CourseMeta({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
      <span className="shrink-0 text-blue-600">
        {icon}
      </span>

      <span className="truncate text-xs font-bold text-slate-600">
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
        size={16}
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl font-black text-white">
          {value}
        </p>

        <span className="text-cyan-300">
          {icon}
        </span>
      </div>

      <p className="mt-1 text-xs font-bold text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* ================================================================
   CATALOG STAT
================================================================ */

function CatalogStat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="min-w-[96px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   FEATURE CARD
================================================================ */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}

/* ================================================================
   VALUE CARD
================================================================ */

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}