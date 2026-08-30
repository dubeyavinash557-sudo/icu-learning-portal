import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

import CourseLandingPage, {
  type CourseLandingData,
} from "@/app/courses/_components/CourseLandingPage";

import {
  getCourseImageConfig,
} from "@/app/courses/_components/course-images";

/* ================================================================
   ICU NURSING MASTERY — PREMIUM LANDING PAGE

   Route:
   /courses/premium/icu-nursing-mastery

   Purpose:
   - Premium marketing page
   - Database-backed course information
   - Professional LMS presentation
   - Uses centralized course image configuration
   - Keeps public marketing separate from lesson access
================================================================ */

export const dynamic = "force-dynamic";

const COURSE_SLUG = "icu-nursing-mastery-program";

/* ================================================================
   HELPERS
================================================================ */

function formatDuration(totalMinutes: number) {
  if (
    !Number.isFinite(totalMinutes) ||
    totalMinutes <= 0
  ) {
    return "Self-paced";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${minutes}m`;
}

function formatStudents(students: number) {
  if (!Number.isFinite(students) || students <= 0) {
    return "New learners";
  }

  if (students >= 1000000) {
    return `${(students / 1000000).toFixed(1)}M+`;
  }

  if (students >= 1000) {
    return `${(students / 1000).toFixed(1)}K+`;
  }

  return String(students);
}

function formatPrice(price: number) {
  if (!Number.isFinite(price) || price <= 0) {
    return "Premium Access";
  }

  return `₹${price.toLocaleString("en-IN")}`;
}

/* ================================================================
   CURRICULUM PRESENTATION

   The database remains the source of truth for actual lessons.

   These module names organize the existing ICU Nursing content
   into a professional LMS pathway.
================================================================ */

const MODULE_NAMES = [
  "ICU Foundations & Professional Practice",
  "Critical Care Patient Assessment",
  "Vital Signs & Clinical Monitoring",
  "Airway Management & Oxygen Therapy",
  "Mechanical Ventilation Fundamentals",
  "ABG & Acid–Base Interpretation",
  "ECG & Cardiac Monitoring",
  "ICU Emergency Management",
  "Sepsis, Shock & Critical Illness",
  "Infection Prevention & Patient Safety",
  "Documentation & Clinical Communication",
  "Practical ICU Nursing Workflow",
];

/* ================================================================
   LEARNING OUTCOMES
================================================================ */

const LEARNING_OUTCOMES = [
  "Understand the structure, workflow and professional responsibilities of an ICU nurse.",
  "Perform systematic assessment of critically ill patients.",
  "Interpret important ICU monitoring parameters and recognise deterioration.",
  "Understand airway management and oxygen therapy principles.",
  "Build foundational knowledge of mechanical ventilation and ventilator care.",
  "Use a structured approach to ABG interpretation.",
  "Develop essential ECG and cardiac monitoring knowledge.",
  "Apply prioritisation principles during common ICU emergencies.",
  "Understand recognition and management principles for sepsis and shock.",
  "Follow infection prevention and patient-safety practices in critical care.",
  "Improve professional documentation, handover and communication.",
  "Develop a structured bedside ICU nursing workflow.",
];

/* ================================================================
   PRACTICAL SKILLS
================================================================ */

const PRACTICAL_SKILLS = [
  "ICU patient assessment",
  "Primary and secondary assessment",
  "Vital-sign monitoring",
  "SpO₂ and respiratory monitoring",
  "Airway and oxygen therapy",
  "Ventilator-care fundamentals",
  "ABG interpretation approach",
  "ECG and cardiac monitoring",
  "Emergency prioritisation",
  "Sepsis and shock recognition",
  "Infection-control practices",
  "Clinical documentation",
  "Structured ICU handover",
  "Patient-safety practices",
  "Bedside nursing workflow",
];

/* ================================================================
   COURSE INCLUDES
================================================================ */

const COURSE_INCLUDES = [
  "Professional ICU Nursing curriculum",
  "Structured video-learning pathway",
  "Progressive ICU lessons",
  "Clinical concept explanations",
  "Practical bedside learning",
  "ICU assessment and monitoring topics",
  "Mechanical ventilation fundamentals",
  "ABG and ECG learning modules",
  "Emergency-care concepts",
  "Sepsis and shock learning",
  "Infection-control concepts",
  "Professional ICU documentation",
  "Course assessments",
  "Learning progress tracking",
  "Certificate pathway",
];

/* ================================================================
   PAGE
================================================================ */

export default async function ICUNursingMasteryPremiumPage() {
  const course = await prisma.course.findUnique({
    where: {
      slug: COURSE_SLUG,
    },
    include: {
      lessons: {
        orderBy: {
          lessonOrder: "asc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          lessonOrder: true,
        },
      },
      quizzes: {
        include: {
          questions: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  /*
   * This route is specifically for the premium
   * ICU Nursing Mastery course.
   *
   * If the database course is accidentally marked
   * free, we still show the landing page rather than
   * exposing lesson content here.
   */

  const imageConfig = getCourseImageConfig(
    course.slug
  );

  const totalLessonMinutes = course.lessons.reduce(
    (total, lesson) =>
      total +
      (Number.isFinite(lesson.duration)
        ? lesson.duration
        : 0),
    0
  );

  const lessonDuration =
    totalLessonMinutes > 0
      ? formatDuration(totalLessonMinutes)
      : formatDuration(course.duration);

  /*
   * Build curriculum modules from the lessons that
   * actually exist in Prisma.
   *
   * We intentionally do not fabricate database lessons.
   */

  const modules = course.lessons.map(
    (lesson, index) => ({
      title:
        MODULE_NAMES[index] ??
        `ICU Nursing Chapter ${index + 1}`,
      description:
        lesson.description ||
        `Professional ICU Nursing learning chapter covering ${lesson.title}.`,
      lessons: 1,
    })
  );

  /*
   * If the course has no lessons yet, keep the landing
   * page usable and clearly present the curriculum as
   * a structured pathway.
   */

  const safeModules =
    modules.length > 0
      ? modules
      : MODULE_NAMES.map((name) => ({
          title: name,
          description:
            "Structured ICU Nursing learning chapter.",
          lessons: 0,
        }));

  const quizQuestionCount =
    course.quizzes.reduce(
      (total, quiz) =>
        total + quiz.questions.length,
      0
    );

  const courseData: CourseLandingData = {
    title:
      course.title ||
      "ICU Nursing Mastery Program",

    shortTitle:
      "ICU Nursing Mastery",

    category:
      "Professional ICU Nursing",

    description:
      course.description ||
      "A comprehensive professional ICU Nursing learning pathway covering assessment, monitoring, airway management, ventilation, ABG, ECG, emergencies, infection prevention and practical bedside skills.",

    longDescription:
      "A structured premium ICU Nursing learning program designed for nurses and healthcare professionals who want systematic critical-care knowledge, practical understanding and professional assessment preparation.",

    instructor:
      course.instructor ||
      "Avinash Dubey",

    level:
      course.level ||
      "Beginner to Advanced",

    duration:
      lessonDuration,

    lessons:
      course.lessons.length,

    students:
      formatStudents(course.students),

    rating:
      Number.isFinite(course.rating)
        ? course.rating
        : 5,

    price:
      formatPrice(course.price),

    originalPrice:
      course.price > 0
        ? `₹${Math.round(
            course.price * 1.2
          ).toLocaleString("en-IN")}`
        : undefined,

    isPremium:
      true,

    accent:
      "blue",

    modules:
      safeModules,

    learningOutcomes:
      LEARNING_OUTCOMES,

    practicalSkills:
      PRACTICAL_SKILLS,

    includes:
      [
        ...COURSE_INCLUDES,
        ...(quizQuestionCount > 0
          ? [
              `${quizQuestionCount}+ assessment questions`,
            ]
          : []),
      ],
  };

  return (
    <>
      {/* ==========================================================
          SEO / VISUAL COURSE COVER METADATA
      =========================================================== */}

      <div className="sr-only">
        <h1>
          ICU Nursing Mastery Program
        </h1>

        <p>
          Professional ICU Nursing Mastery
          Program with structured lessons,
          practical critical-care learning,
          assessments and certificate pathway.
        </p>

        <p>
          {imageConfig.label}
        </p>
      </div>

      {/* ==========================================================
          PROFESSIONAL LMS LANDING PAGE
      =========================================================== */}

      <CourseLandingPage
        course={courseData}
      />
    </>
  );
}