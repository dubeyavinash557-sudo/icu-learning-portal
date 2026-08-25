import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  HeartPulse,
  PlayCircle,
  ShieldCheck,
  Siren,
  Stethoscope,
  Users,
  Video,
  Zap,
} from "lucide-react";

import { auth } from "@/auth";
import BuyNowButton from "@/components/course/BuyNowButton";
import { getCourseBySlug } from "@/lib/course";

const COURSE_SLUG = "emergency-care";

const curriculum = [
  {
    number: "01",
    title: "Emergency Care Fundamentals",
    description:
      "Understand emergency department workflow, rapid assessment, patient prioritisation, safety and the initial approach to critically ill patients.",
    topics: [
      "Emergency care principles",
      "Primary and secondary assessment",
      "ABCDE approach",
      "Triage and prioritisation",
      "Patient safety",
    ],
  },
  {
    number: "02",
    title: "Airway & Breathing Emergencies",
    description:
      "Build a structured approach to airway and respiratory emergencies commonly encountered in critical care settings.",
    topics: [
      "Airway assessment",
      "Oxygen therapy principles",
      "Respiratory distress",
      "Airway obstruction",
      "Basic airway support",
    ],
  },
  {
    number: "03",
    title: "Cardiac Emergencies",
    description:
      "Study recognition and initial management principles for major cardiovascular emergencies and deteriorating patients.",
    topics: [
      "Chest pain assessment",
      "Acute coronary syndromes",
      "Bradycardia",
      "Tachycardia",
      "Cardiac arrest recognition",
    ],
  },
  {
    number: "04",
    title: "Shock & Hemodynamic Emergencies",
    description:
      "Learn the core concepts behind shock recognition, clinical assessment and structured emergency response.",
    topics: [
      "Types of shock",
      "Shock recognition",
      "Hemodynamic assessment",
      "Fluid management principles",
      "Monitoring priorities",
    ],
  },
  {
    number: "05",
    title: "Neurological Emergencies",
    description:
      "Develop a systematic approach to patients presenting with altered consciousness, seizures and acute neurological deterioration.",
    topics: [
      "Level of consciousness",
      "GCS assessment",
      "Seizure emergencies",
      "Stroke recognition",
      "Neurological monitoring",
    ],
  },
  {
    number: "06",
    title: "Sepsis & Critical Deterioration",
    description:
      "Understand early recognition of sepsis and clinical deterioration with emphasis on timely assessment and escalation.",
    topics: [
      "Sepsis recognition",
      "Systemic response",
      "Clinical deterioration",
      "Monitoring priorities",
      "Escalation of care",
    ],
  },
  {
    number: "07",
    title: "Emergency Drugs & Equipment",
    description:
      "Review emergency medication concepts, essential equipment and safe preparation practices within a clinical framework.",
    topics: [
      "Emergency medication principles",
      "Crash cart organisation",
      "Emergency equipment",
      "Medication safety",
      "Documentation",
    ],
  },
  {
    number: "08",
    title: "Code Blue & Resuscitation",
    description:
      "Study the structured response to cardiac arrest and the healthcare professional's role during resuscitation events.",
    topics: [
      "Code Blue workflow",
      "CPR principles",
      "Defibrillation awareness",
      "Team roles",
      "Post-resuscitation care",
    ],
  },
  {
    number: "09",
    title: "Emergency Case-Based Practice",
    description:
      "Apply concepts through realistic clinical scenarios designed for revision, decision-making and practical understanding.",
    topics: [
      "Emergency case scenarios",
      "Rapid assessment practice",
      "Clinical prioritisation",
      "Monitoring interpretation",
      "Case discussion",
    ],
  },
];

const learningOutcomes = [
  "Perform a structured initial assessment of an emergency patient.",
  "Recognise common life-threatening clinical presentations.",
  "Understand airway, breathing and circulation priorities.",
  "Identify important signs of shock and clinical deterioration.",
  "Understand the nursing role during emergency and resuscitation events.",
  "Review emergency equipment, documentation and patient-safety principles.",
  "Apply emergency-care concepts to case-based clinical situations.",
  "Prepare systematically for ICU and emergency-care assessments.",
];

const practicalSkills = [
  {
    icon: Activity,
    title: "Rapid Patient Assessment",
    description:
      "Use a structured clinical approach to identify immediate priorities.",
  },
  {
    icon: HeartPulse,
    title: "Cardiorespiratory Assessment",
    description:
      "Review essential observations and warning signs in deteriorating patients.",
  },
  {
    icon: Siren,
    title: "Emergency Response",
    description:
      "Understand escalation, emergency communication and Code Blue workflow.",
  },
  {
    icon: ShieldCheck,
    title: "Patient Safety",
    description:
      "Strengthen safe practice, monitoring and documentation principles.",
  },
];

export default async function EmergencyCarePage() {
  const course = await getCourseBySlug(COURSE_SLUG);
  const session = await auth();

  const lessonCount = course?.lessons.length ?? curriculum.length;

  const duration = course?.duration ?? 0;

  const students = Number(course?.students ?? 0);

  const rating = Number(course?.rating ?? 4.9);

  const price = Number(course?.price ?? 2299);

  /*
   * Product decision:
   * This landing page is intentionally PREMIUM only.
   * There is no Free Access presentation on this page.
   *
   * The actual payment/access decision remains enforced by:
   * - /courses/[id]/page.tsx
   * - /api/payments/create-order
   * - /api/payments/verify
   * - Razorpay webhook
   */
  const isPremium = true;

  const formattedPrice =
    Number.isFinite(price) && price > 0
      ? `₹${price.toLocaleString("en-IN")}`
      : "₹2,299";

  const formattedDuration = formatDuration(duration);

  const customerName = session?.user?.name ?? "";

  const customerEmail = session?.user?.email ?? "";

  const isLoggedIn = Boolean(session?.user?.email);

  const courseId = course?.id ?? null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-red-500/10 blur-3xl" />

          <div className="absolute right-[-12rem] top-10 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute bottom-[-14rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* LEFT */}

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-red-300">
                  <Siren size={15} />
                  Emergency Care
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-300">
                  <Zap size={14} />
                  Premium Program
                </span>
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {course?.title ||
                  "ICU Emergency & Critical Care Course"}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {course?.description ||
                  "Build structured knowledge of emergency assessment, airway and breathing emergencies, cardiac emergencies, shock, sepsis, neurological emergencies, resuscitation and critical-care response."}
              </p>

              {/* Rating */}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center gap-2 text-white">
                  <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2">
                    <span className="text-amber-300">★</span>

                    <span className="font-black">
                      {rating.toFixed(1)}
                    </span>
                  </span>

                  <span className="text-slate-400">
                    Professional learner rating
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Users
                    size={16}
                    className="text-cyan-300"
                  />

                  {students.toLocaleString("en-IN")}+ learners
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Clock3
                    size={16}
                    className="text-cyan-300"
                  />

                  {formattedDuration}
                </div>
              </div>

              {/* CTA */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#purchase"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-7 py-4 text-sm font-black text-white shadow-xl shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400"
                >
                  <Zap size={18} />

                  Buy Premium Course

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#curriculum"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
                >
                  <BookOpen size={18} />

                  View Curriculum
                </a>
              </div>

              {/* Trust */}

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Structured curriculum
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Clinical case learning
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Certificate pathway
                </span>

                <span className="flex items-center gap-2">
                  <ShieldCheck
                    size={15}
                    className="text-emerald-400"
                  />
                  Secure paid access
                </span>
              </div>
            </div>

            {/* RIGHT COURSE SUMMARY */}

            <div className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-2 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[1.6rem] bg-slate-900 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-300 ring-1 ring-red-400/20">
                      <Siren size={27} />
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                      <Zap size={12} />
                      Premium
                    </span>
                  </div>

                  <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                    Premium Course Access
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-4xl font-black text-white">
                        {formattedPrice}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Secure one-course access
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Level
                      </p>

                      <p className="mt-1 text-sm font-black text-white">
                        {course?.level ||
                          "Intermediate to Advanced"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <SummaryStat
                      icon={<BookOpen size={17} />}
                      value={String(lessonCount)}
                      label="Lessons"
                    />

                    <SummaryStat
                      icon={<Clock3 size={17} />}
                      value={formattedDuration}
                      label="Duration"
                    />

                    <SummaryStat
                      icon={<Users size={17} />}
                      value={`${students.toLocaleString("en-IN")}+`}
                      label="Learners"
                    />

                    <SummaryStat
                      icon={<Award size={17} />}
                      value="Yes"
                      label="Certificate"
                    />
                  </div>

                  <div className="mt-5 rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck
                        size={20}
                        className="mt-0.5 shrink-0 text-amber-300"
                      />

                      <div>
                        <p className="text-sm font-black text-white">
                          Premium learning access
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          Course lessons, study resources,
                          assessments and completion features are
                          available through the paid LMS access
                          system.
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#purchase"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                  >
                    Get Premium Access
                    <ArrowRight size={17} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COURSE INFORMATION BAR
      ========================================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 sm:grid-cols-4 sm:divide-y-0">
          <InfoItem
            icon={<GraduationCap size={20} />}
            label="Instructor"
            value={
              course?.instructor ||
              "ICU Learning Portal Faculty"
            }
          />

          <InfoItem
            icon={<BookOpen size={20} />}
            label="Lessons"
            value={`${lessonCount} structured lessons`}
          />

          <InfoItem
            icon={<Stethoscope size={20} />}
            label="Language"
            value={course?.language || "Hindi + English"}
          />

          <InfoItem
            icon={<Award size={20} />}
            label="Outcome"
            value="Completion Certificate"
          />
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* MAIN */}

          <div className="min-w-0">
            {/* COURSE OVERVIEW */}

            <section>
              <SectionHeading
                eyebrow="Course Overview"
                title="Build Emergency-Care Confidence Step by Step"
                description="A structured premium learning pathway covering the core emergency and critical-care concepts healthcare learners need for systematic revision and professional preparation."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {learningOutcomes
                  .slice(0, 6)
                  .map((outcome) => (
                    <OutcomeCard
                      key={outcome}
                      text={outcome}
                    />
                  ))}
              </div>
            </section>

            {/* PRACTICAL SKILLS */}

            <section className="mt-16">
              <SectionHeading
                eyebrow="Clinical Skills"
                title="Practical Emergency-Care Learning"
                description="Focus on the assessment, prioritisation and safety concepts that support emergency and critical-care practice."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {practicalSkills.map((skill) => {
                  const Icon = skill.icon;

                  return (
                    <article
                      key={skill.title}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                        <Icon size={22} />
                      </div>

                      <h3 className="mt-5 text-lg font-black text-slate-950">
                        {skill.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {skill.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* CURRICULUM */}

            <section
              id="curriculum"
              className="mt-16 scroll-mt-24"
            >
              <SectionHeading
                eyebrow="Course Curriculum"
                title="Complete Emergency Care Learning Path"
                description="Work through the curriculum progressively. The lesson architecture is prepared for video learning, notes, assessments, completion and progress tracking."
              />

              <div className="mt-8 space-y-4">
                {curriculum.map((module) => (
                  <article
                    key={module.number}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-cyan-300">
                          {module.number}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="text-lg font-black text-slate-950">
                              {module.title}
                            </h3>

                            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-700">
                              <Zap size={12} />
                              Premium Module
                            </span>
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {module.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-2 border-t border-slate-100 pt-5 sm:grid-cols-2">
                        {module.topics.map((topic) => (
                          <div
                            key={topic}
                            className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5"
                          >
                            <CheckCircle2
                              size={15}
                              className="shrink-0 text-emerald-500"
                            />

                            <span className="text-xs font-semibold text-slate-700">
                              {topic}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* LEARNING OUTCOMES */}

            <section className="mt-16">
              <SectionHeading
                eyebrow="Learning Outcomes"
                title="What You Will Learn"
                description="By completing the program, learners should have a structured understanding of the following emergency-care concepts."
              />

              <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  {learningOutcomes.map(
                    (outcome, index) => (
                      <div
                        key={outcome}
                        className={`flex gap-3 p-5 ${
                          index >= 2
                            ? "sm:border-t sm:border-slate-100"
                            : ""
                        }`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <CheckCircle2 size={14} />
                        </span>

                        <p className="text-sm leading-6 text-slate-600">
                          {outcome}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>

            {/* RESOURCES */}

            <section className="mt-16">
              <SectionHeading
                eyebrow="Learning Resources"
                title="Resources Included in Premium Access"
                description="The course architecture supports multiple learning formats so learners can revise concepts beyond the primary lessons."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <ResourceCard
                  icon={<Video size={22} />}
                  title="Video Lessons"
                  description="Structured lesson-based video learning available through course access."
                />

                <ResourceCard
                  icon={<FileText size={22} />}
                  title="Study Notes"
                  description="Revision-focused notes and protected course resources for enrolled learners."
                />

                <ResourceCard
                  icon={<CheckCircle2 size={22} />}
                  title="Assessments"
                  description="Knowledge checks and quiz-based practice within the premium learning pathway."
                />
              </div>
            </section>

            {/* PREMIUM VALUE SECTION */}

            <section className="mt-16">
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-7 text-white shadow-2xl sm:p-9">
                <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-amber-300">
                      <Zap size={14} />
                      Premium Learning
                    </div>

                    <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                      Learn from a structured,
                      professional course pathway.
                    </h2>

                    <p className="mt-4 text-base leading-7 text-slate-400">
                      Your paid course access is designed around
                      lessons, learning resources, assessments,
                      progress tracking and completion milestones.
                    </p>
                  </div>

                  <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Premium Access
                    </p>

                    <p className="mt-1 text-3xl font-black text-white">
                      {formattedPrice}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Secure one-course enrollment
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CERTIFICATE */}

            <section className="mt-16">
              <div className="overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-7 sm:p-9">
                <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
                    <Award size={30} />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                      Professional Achievement
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Earn Your Course Completion Certificate
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      Eligible learners who complete the required
                      course and assessment requirements can progress
                      toward a completion certificate with a unique
                      verification number.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* DISCLAIMER */}

            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-amber-700"
                />

                <div>
                  <h3 className="text-sm font-black text-amber-900">
                    Educational Use
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-amber-800">
                    This course is intended for education, revision
                    and professional learning. Clinical decisions
                    should be made according to the patient's
                    condition, local hospital protocols, qualified
                    supervision and applicable clinical guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              STICKY COURSE SIDEBAR
          ===================================================== */}

          <aside
            id="purchase"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
                    Premium Course Access
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black text-amber-950">
                    <Zap size={11} />
                    PREMIUM
                  </span>
                </div>

                <p className="mt-4 text-3xl font-black">
                  {formattedPrice}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Secure one-course learning access
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  <SidebarFeature
                    icon={<BookOpen size={17} />}
                    text={`${lessonCount} structured lessons`}
                  />

                  <SidebarFeature
                    icon={<Video size={17} />}
                    text="Premium video learning"
                  />

                  <SidebarFeature
                    icon={<FileText size={17} />}
                    text="Protected study notes & resources"
                  />

                  <SidebarFeature
                    icon={<CheckCircle2 size={17} />}
                    text="Assessments & quizzes"
                  />

                  <SidebarFeature
                    icon={<Activity size={17} />}
                    text="Learning progress tracking"
                  />

                  <SidebarFeature
                    icon={<Award size={17} />}
                    text="Completion certificate"
                  />

                  <SidebarFeature
                    icon={<ShieldCheck size={17} />}
                    text="Secure paid course access"
                  />
                </div>

                <div className="mt-7">
                  {courseId ? (
                    <BuyNowButton
                      courseId={courseId}
                      courseTitle={
                        course?.title ||
                        "ICU Emergency & Critical Care Course"
                      }
                      price={price}
                      isLoggedIn={isLoggedIn}
                      customerName={customerName}
                      customerEmail={customerEmail}
                    />
                  ) : (
                    <Link
                      href="/register"
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
                    >
                      Create Account
                      <ArrowRight size={17} />
                    </Link>
                  )}
                </div>

                <Link
                  href="/courses"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  <BookOpen size={17} />
                  Browse All Courses
                </Link>

                <div className="mt-5 flex items-start gap-2 rounded-xl bg-emerald-50 p-3">
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <p className="text-[11px] font-semibold leading-5 text-emerald-800">
                    Payment is processed securely through the LMS
                    payment system. Course content is unlocked only
                    after successful payment verification.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* =============================================================
   SECTION HEADING
============================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
        <Stethoscope size={14} />
        {eyebrow}
      </div>

      <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-base leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

/* =============================================================
   SUMMARY STAT
============================================================= */

function SummaryStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-cyan-300">{icon}</span>

        <span className="text-sm font-black text-white">
          {value}
        </span>
      </div>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}

/* =============================================================
   INFORMATION ITEM
============================================================= */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-5 sm:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-black text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =============================================================
   OUTCOME CARD
============================================================= */

function OutcomeCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 size={14} />
      </span>

      <p className="text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
}

/* =============================================================
   RESOURCE CARD
============================================================= */

function ResourceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </article>
  );
}

/* =============================================================
   SIDEBAR FEATURE
============================================================= */

function SidebarFeature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
        {icon}
      </span>

      <span className="text-sm font-semibold text-slate-700">
        {text}
      </span>
    </div>
  );
}

/* =============================================================
   DURATION FORMATTER
============================================================= */

function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "Self-paced";
  }

  const hours = Math.floor(minutes / 60);

  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${remainingMinutes}m`;
}