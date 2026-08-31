import CourseLandingPage, {
  type CourseLandingData,
} from "@/app/courses/_components/CourseLandingPage";

export const dynamic = "force-dynamic";

/* ================================================================
   SEPSIS & SHOCK MASTERCLASS
   Premium ICU LMS Landing Page

   Route:
   /courses/premium/sepsis-shock

   Purpose:
   - Premium marketing / course landing page
   - 20 structured chapters
   - ICU-focused sepsis and shock curriculum
   - Uses existing shared CourseLandingPage component
   - Keeps premium course presentation consistent
================================================================ */

const course: CourseLandingData = {
  /* ==============================================================
     BASIC COURSE INFORMATION
  ============================================================== */

  title: "Sepsis & Shock Management Masterclass",

  shortTitle: "Sepsis & Shock Masterclass",

  category: "Sepsis • Shock • Critical Care",

  description:
    "A professional ICU learning program covering sepsis recognition, shock physiology, perfusion assessment, hemodynamic monitoring, organ dysfunction, supportive care concepts and case-based critical-care reasoning.",

  longDescription:
    "Build a structured understanding of sepsis and shock through a comprehensive 20-chapter ICU learning pathway. The program progresses from sepsis fundamentals and early recognition to shock classification, perfusion assessment, hemodynamic concepts, organ dysfunction, monitoring, supportive-care principles, documentation and clinical case analysis.",

  instructor: "ICU Learning Portal Faculty",

  level: "Intermediate to Advanced",

  duration: "15+ Hours",

  lessons: 50,

  students: "7,500+",

  rating: 4.9,

  price: "₹2,499",

  originalPrice: "₹4,499",

  isPremium: true,

  accent: "violet",

  /* ==============================================================
     20-CHAPTER CURRICULUM
  ============================================================== */

  modules: [
    {
      title: "Chapter 01 — Introduction to Sepsis",
      description:
        "Understand the basic concept of sepsis, why it is a critical-care emergency and why early recognition is important.",
      lessons: 3,
    },

    {
      title: "Chapter 02 — Infection & Systemic Response",
      description:
        "Review the relationship between infection, systemic inflammatory response and progressive physiological deterioration.",
      lessons: 2,
    },

    {
      title: "Chapter 03 — Sepsis Recognition",
      description:
        "Develop a structured approach to recognising concerning clinical features in patients with suspected infection and deterioration.",
      lessons: 3,
    },

    {
      title: "Chapter 04 — Sepsis Assessment in ICU",
      description:
        "Learn a systematic ICU assessment framework covering airway, breathing, circulation, neurological status and overall patient condition.",
      lessons: 3,
    },

    {
      title: "Chapter 05 — Understanding Shock",
      description:
        "Understand shock as inadequate tissue perfusion and review the major physiological consequences of circulatory failure.",
      lessons: 2,
    },

    {
      title: "Chapter 06 — Types of Shock",
      description:
        "Differentiate distributive, hypovolemic, cardiogenic and obstructive shock using clinical and physiological concepts.",
      lessons: 3,
    },

    {
      title: "Chapter 07 — Septic Shock",
      description:
        "Understand the major features of septic shock and the relationship between infection, vasodilation, perfusion abnormalities and organ dysfunction.",
      lessons: 3,
    },

    {
      title: "Chapter 08 — Perfusion Assessment",
      description:
        "Review clinical indicators of tissue perfusion including blood pressure, mental status, urine output, skin findings and laboratory trends.",
      lessons: 2,
    },

    {
      title: "Chapter 09 — Hemodynamic Monitoring",
      description:
        "Understand important hemodynamic concepts and how monitoring information supports assessment of critically ill patients.",
      lessons: 3,
    },

    {
      title: "Chapter 10 — Fluid Assessment Concepts",
      description:
        "Study the principles of assessing fluid status and understanding the clinical context of fluid responsiveness and fluid balance.",
      lessons: 2,
    },

    {
      title: "Chapter 11 — Vasopressor & Hemodynamic Concepts",
      description:
        "Understand the role of vasopressor therapy in circulatory support and the monitoring considerations associated with hemodynamic treatment.",
      lessons: 3,
    },

    {
      title: "Chapter 12 — Lactate & Tissue Perfusion",
      description:
        "Understand lactate as a clinical marker used in the assessment of critically ill patients and follow-up of perfusion abnormalities.",
      lessons: 2,
    },

    {
      title: "Chapter 13 — Organ Dysfunction",
      description:
        "Recognize how sepsis and shock can affect major organ systems including the kidneys, lungs, brain, heart and liver.",
      lessons: 3,
    },

    {
      title: "Chapter 14 — Acute Kidney Injury in Sepsis",
      description:
        "Review the relationship between sepsis, impaired renal perfusion, urine output and acute kidney injury monitoring.",
      lessons: 2,
    },

    {
      title: "Chapter 15 — Respiratory Dysfunction",
      description:
        "Understand respiratory deterioration in critically ill patients and review oxygenation and respiratory-support monitoring concepts.",
      lessons: 2,
    },

    {
      title: "Chapter 16 — Sepsis Monitoring & Documentation",
      description:
        "Develop professional habits for monitoring vital signs, trends, interventions, response to treatment and clinical documentation.",
      lessons: 2,
    },

    {
      title: "Chapter 17 — Infection Source & Clinical Priorities",
      description:
        "Understand the importance of identifying a possible infection source and coordinating timely clinical evaluation and management.",
      lessons: 3,
    },

    {
      title: "Chapter 18 — ICU Sepsis Case Studies",
      description:
        "Apply sepsis and shock concepts to structured ICU case scenarios involving deterioration, perfusion abnormalities and organ dysfunction.",
      lessons: 3,
    },

    {
      title: "Chapter 19 — Rapid Sepsis & Shock Revision",
      description:
        "Consolidate the major concepts using structured revision, clinical reasoning questions and rapid assessment frameworks.",
      lessons: 2,
    },

    {
      title: "Chapter 20 — Final Sepsis & Shock Assessment",
      description:
        "Complete a comprehensive review and prepare for the final professional assessment using ICU-oriented clinical scenarios.",
      lessons: 2,
    },
  ],

  /* ==============================================================
     LEARNING OUTCOMES
  ============================================================== */

  learningOutcomes: [
    "Understand the fundamental concept of sepsis and its importance in critical care.",

    "Understand the relationship between infection and systemic physiological deterioration.",

    "Recognize important clinical features that may indicate sepsis.",

    "Apply a structured initial assessment approach to critically ill patients.",

    "Understand shock as a state of inadequate tissue perfusion.",

    "Differentiate the major clinical categories of shock.",

    "Understand the key physiological features of septic shock.",

    "Assess important clinical indicators of tissue perfusion.",

    "Understand basic hemodynamic monitoring concepts.",

    "Review fluid-status and fluid-balance assessment principles.",

    "Understand the clinical role of vasopressor therapy in circulatory support.",

    "Understand the clinical significance of lactate trends.",

    "Recognize common patterns of organ dysfunction associated with severe illness.",

    "Understand renal monitoring considerations in sepsis and shock.",

    "Recognize respiratory deterioration and oxygenation concerns.",

    "Develop professional ICU monitoring and documentation habits.",

    "Understand the importance of identifying a possible infection source.",

    "Apply sepsis and shock knowledge to ICU-oriented clinical cases.",

    "Develop a systematic rapid-revision framework for sepsis and shock.",

    "Prepare for a professional sepsis and shock critical-care assessment.",
  ],

  /* ==============================================================
     PRACTICAL SKILLS
  ============================================================== */

  practicalSkills: [
    "Sepsis recognition framework",

    "Initial ICU patient assessment",

    "Airway and breathing assessment concepts",

    "Circulation assessment",

    "Vital-sign trend interpretation",

    "Shock recognition",

    "Differentiation of major shock categories",

    "Septic shock recognition",

    "Peripheral perfusion assessment",

    "Mental-status assessment",

    "Urine-output monitoring",

    "Fluid-balance monitoring",

    "Hemodynamic monitoring concepts",

    "Blood-pressure trend assessment",

    "Lactate trend interpretation",

    "Organ-function monitoring",

    "Renal monitoring in critical illness",

    "Respiratory deterioration monitoring",

    "Clinical documentation",

    "Sepsis case-based clinical reasoning",
  ],

  /* ==============================================================
     COURSE INCLUDES
  ============================================================== */

  includes: [
    "50 structured premium lessons",

    "20 professional ICU chapters",

    "Sepsis recognition learning pathway",

    "Sepsis assessment framework",

    "Infection and systemic response concepts",

    "Shock physiology fundamentals",

    "Major types of shock",

    "Septic shock concepts",

    "Perfusion assessment",

    "Hemodynamic monitoring concepts",

    "Fluid assessment principles",

    "Fluid-balance monitoring",

    "Vasopressor and hemodynamic concepts",

    "Lactate and tissue-perfusion concepts",

    "Organ dysfunction monitoring",

    "Acute kidney injury in sepsis",

    "Respiratory dysfunction concepts",

    "Sepsis monitoring and documentation",

    "Infection-source assessment concepts",

    "ICU case-based learning",

    "Rapid sepsis and shock revision",

    "Final professional assessment pathway",

    "Progress tracking through the LMS",

    "Premium learning access",

    "Course completion certificate pathway",

    "Hindi + English learning environment",
  ],
};

/* ================================================================
   PAGE
================================================================ */

export default function SepsisShockPremiumPage() {
  return <CourseLandingPage course={course} />;
}