import CourseLandingPage, {
  type CourseLandingData,
} from "@/app/courses/_components/CourseLandingPage";

export const dynamic = "force-dynamic";

/* ================================================================
   ABG ANALYSIS MASTERCLASS
   Premium LMS Landing Page

   Route:
   /courses/premium/abg-analysis

   Purpose:
   - Premium marketing / course landing page
   - 20 structured chapters
   - Professional ICU-focused presentation
   - Uses existing shared CourseLandingPage component
   - Keeps premium course presentation separate from free/demo courses
================================================================ */

const course: CourseLandingData = {
  /* ==============================================================
     BASIC COURSE INFORMATION
  ============================================================== */

  title: "ABG Analysis & Acid–Base Masterclass",

  shortTitle: "ABG Analysis Masterclass",

  category: "ABG Analysis • Acid–Base • Critical Care",

  description:
    "A professional ABG learning program designed for ICU nurses, critical care professionals, paramedical students and healthcare learners who want to develop a structured approach to arterial blood gas interpretation.",

  longDescription:
    "Master arterial blood gas interpretation through a structured 20-chapter learning pathway covering pH, PaCO₂, HCO₃⁻, PaO₂, oxygenation, respiratory and metabolic disorders, compensation, anion gap, mixed acid–base disorders and ICU-based clinical case interpretation. The program is designed to help learners move from ABG fundamentals to practical clinical reasoning.",

  instructor: "Avinash Dubey",

  level: "Beginner to Advanced",

  duration: "20 Chapters",

  lessons: 20,

  students: "10,000+",

  rating: 4.9,

  price: "₹2,499",

  originalPrice: "₹4,999",

  isPremium: true,

  accent: "cyan",

  /* ==============================================================
     20-CHAPTER CURRICULUM
  ============================================================== */

  modules: [
    {
      title: "Chapter 01 — ABG Fundamentals",
      description:
        "Understand what an arterial blood gas test measures, why ABG analysis is important in critical care and how the major ABG values relate to patient physiology.",
      lessons: 1,
    },

    {
      title: "Chapter 02 — Understanding pH",
      description:
        "Learn the clinical meaning of pH, normal reference range and how pH indicates the overall acid–base state of the patient.",
      lessons: 1,
    },

    {
      title: "Chapter 03 — PaCO₂ & Respiratory Component",
      description:
        "Understand PaCO₂ as the respiratory component of acid–base balance and learn how ventilation affects carbon dioxide levels.",
      lessons: 1,
    },

    {
      title: "Chapter 04 — HCO₃⁻ & Metabolic Component",
      description:
        "Learn the role of bicarbonate in acid–base regulation and understand how metabolic disturbances influence HCO₃⁻ levels.",
      lessons: 1,
    },

    {
      title: "Chapter 05 — PaO₂ & Oxygenation",
      description:
        "Understand PaO₂, arterial oxygenation and the relationship between oxygen levels, respiratory support and critical illness.",
      lessons: 1,
    },

    {
      title: "Chapter 06 — Step-by-Step ABG Interpretation",
      description:
        "Develop a systematic step-by-step framework for interpreting an ABG without missing important clinical information.",
      lessons: 1,
    },

    {
      title: "Chapter 07 — Respiratory Acidosis",
      description:
        "Understand respiratory acidosis, common causes, expected ABG patterns and important clinical considerations in critically ill patients.",
      lessons: 1,
    },

    {
      title: "Chapter 08 — Respiratory Alkalosis",
      description:
        "Learn the ABG pattern of respiratory alkalosis, common clinical causes and the role of ventilation in carbon dioxide changes.",
      lessons: 1,
    },

    {
      title: "Chapter 09 — Metabolic Acidosis",
      description:
        "Understand metabolic acidosis, its common causes and the characteristic changes in pH and bicarbonate.",
      lessons: 1,
    },

    {
      title: "Chapter 10 — Metabolic Alkalosis",
      description:
        "Learn how metabolic alkalosis develops, how it appears on ABG and which clinical situations commonly produce it.",
      lessons: 1,
    },

    {
      title: "Chapter 11 — Compensation",
      description:
        "Understand respiratory and metabolic compensation and learn how to assess whether the body's compensatory response is appropriate.",
      lessons: 1,
    },

    {
      title: "Chapter 12 — Anion Gap",
      description:
        "Learn the purpose of the anion gap, its calculation and how it helps classify important metabolic acid–base disorders.",
      lessons: 1,
    },

    {
      title: "Chapter 13 — High Anion Gap Metabolic Acidosis",
      description:
        "Study the clinical concept of high anion gap metabolic acidosis and develop a structured approach to recognising important causes.",
      lessons: 1,
    },

    {
      title: "Chapter 14 — Normal Anion Gap Acidosis",
      description:
        "Understand normal anion gap metabolic acidosis and differentiate it from other metabolic acid–base abnormalities.",
      lessons: 1,
    },

    {
      title: "Chapter 15 — Mixed Acid–Base Disorders",
      description:
        "Learn how more than one acid–base disorder can occur simultaneously and how to recognise unexpected ABG patterns.",
      lessons: 1,
    },

    {
      title: "Chapter 16 — ABG in Mechanical Ventilation",
      description:
        "Understand how ventilator support can influence PaCO₂, oxygenation and overall ABG interpretation in mechanically ventilated patients.",
      lessons: 1,
    },

    {
      title: "Chapter 17 — ABG in ICU Emergencies",
      description:
        "Apply ABG concepts to high-acuity situations and understand how ABG findings can support rapid clinical assessment.",
      lessons: 1,
    },

    {
      title: "Chapter 18 — Clinical ABG Case Studies",
      description:
        "Practice structured interpretation using realistic ICU-oriented case scenarios and progressively more complex ABG patterns.",
      lessons: 1,
    },

    {
      title: "Chapter 19 — ABG Practice & Rapid Interpretation",
      description:
        "Strengthen interpretation speed and confidence through repeated practice using a consistent clinical reasoning framework.",
      lessons: 1,
    },

    {
      title: "Chapter 20 — Final ABG Mastery Assessment",
      description:
        "Review the complete ABG interpretation pathway and prepare for the final assessment using comprehensive clinical practice scenarios.",
      lessons: 1,
    },
  ],

  /* ==============================================================
     LEARNING OUTCOMES
  ============================================================== */

  learningOutcomes: [
    "Understand the purpose and clinical importance of arterial blood gas analysis.",

    "Identify the major ABG parameters including pH, PaCO₂, HCO₃⁻ and PaO₂.",

    "Understand the relationship between ventilation and PaCO₂.",

    "Understand the metabolic role of bicarbonate in acid–base balance.",

    "Interpret the basic oxygenation information provided by an ABG.",

    "Use a structured step-by-step approach to ABG interpretation.",

    "Recognize respiratory acidosis and respiratory alkalosis patterns.",

    "Recognize metabolic acidosis and metabolic alkalosis patterns.",

    "Understand the principles of respiratory and metabolic compensation.",

    "Calculate and understand the clinical purpose of the anion gap.",

    "Recognize high anion gap metabolic acidosis patterns.",

    "Recognize normal anion gap metabolic acidosis patterns.",

    "Identify possible mixed acid–base disorders.",

    "Understand how mechanical ventilation can influence ABG values.",

    "Apply ABG interpretation principles to ICU-oriented clinical cases.",

    "Develop greater confidence and consistency in rapid ABG interpretation.",
  ],

  /* ==============================================================
     PRACTICAL SKILLS
  ============================================================== */

  practicalSkills: [
    "Identify the major components of an ABG report",

    "Assess pH systematically",

    "Interpret PaCO₂",

    "Interpret HCO₃⁻",

    "Assess PaO₂ and oxygenation",

    "Differentiate respiratory and metabolic abnormalities",

    "Recognize respiratory acidosis",

    "Recognize respiratory alkalosis",

    "Recognize metabolic acidosis",

    "Recognize metabolic alkalosis",

    "Assess expected compensation conceptually",

    "Calculate anion gap",

    "Recognize high anion gap metabolic acidosis",

    "Recognize normal anion gap metabolic acidosis",

    "Identify possible mixed disorders",

    "Relate ABG findings to mechanical ventilation",

    "Interpret ABG findings in ICU scenarios",

    "Apply a consistent ABG interpretation sequence",

    "Practice rapid ABG interpretation",

    "Solve case-based ABG problems",
  ],

  /* ==============================================================
     COURSE INCLUDES
  ============================================================== */

  includes: [
    "20 structured ABG learning chapters",

    "Beginner-to-advanced ABG learning pathway",

    "Professional ABG interpretation framework",

    "pH interpretation",

    "PaCO₂ and respiratory component",

    "HCO₃⁻ and metabolic component",

    "PaO₂ and oxygenation concepts",

    "Respiratory acidosis",

    "Respiratory alkalosis",

    "Metabolic acidosis",

    "Metabolic alkalosis",

    "Compensation concepts",

    "Anion gap interpretation",

    "High anion gap metabolic acidosis",

    "Normal anion gap metabolic acidosis",

    "Mixed acid–base disorder concepts",

    "ABG and mechanical ventilation relationship",

    "ICU emergency ABG concepts",

    "Case-based ABG practice",

    "Final assessment pathway",

    "Progress tracking through the LMS",

    "Premium learning access",

    "Course completion certificate pathway",

    "Hindi + English learning environment",
  ],
};

/* ================================================================
   PAGE
================================================================ */

export default function ABGAnalysisPremiumPage() {
  return <CourseLandingPage course={course} />;
}