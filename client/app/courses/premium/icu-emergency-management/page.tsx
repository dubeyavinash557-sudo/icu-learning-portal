import CourseLandingPage, {
  type CourseLandingData,
} from "@/app/courses/_components/CourseLandingPage";

export const dynamic = "force-dynamic";

/* ================================================================
   ICU EMERGENCY MANAGEMENT MASTERCLASS
   Premium Professional LMS Landing Page

   Route:
   /courses/premium/icu-emergency-management

   Purpose:
   - Premium ICU emergency-care program
   - Structured 20-chapter curriculum
   - Professional LMS presentation
   - Uses existing shared CourseLandingPage
   - Separate from free/demo courses
================================================================ */

const course: CourseLandingData = {
  /* ==============================================================
     BASIC COURSE INFORMATION
  ============================================================== */

  title: "ICU Emergency Management Masterclass",

  shortTitle: "ICU Emergency Management",

  category: "ICU Emergency Care • Critical Care • Emergency Response",

  description:
    "A professional ICU emergency-management learning program designed for nurses, critical-care professionals, paramedical learners and healthcare students who want to develop structured knowledge for recognising and responding to common critical-care emergencies.",

  longDescription:
    "Build a systematic approach to ICU emergency management through a structured 20-chapter pathway covering emergency assessment, ABC approach, airway emergencies, respiratory emergencies, shock, sepsis, cardiac emergencies, arrhythmias, cardiac arrest, emergency response, neurological emergencies, electrolyte emergencies, anaphylaxis, rapid response, emergency documentation and case-based practice.",

  instructor: "Avinash Dubey",

  level: "Beginner to Advanced",

  duration: "20 Chapters",

  lessons: 20,

  students: "9,500+",

  rating: 4.9,

  price: "₹2,499",

  originalPrice: "₹4,999",

  isPremium: true,

  accent: "amber",

  /* ==============================================================
     20-CHAPTER CURRICULUM
  ============================================================== */

  modules: [
    {
      title: "Chapter 01 — ICU Emergency Fundamentals",
      description:
        "Understand the principles of emergency management in critical care, emergency recognition, prioritisation and the role of the ICU healthcare team.",
      lessons: 1,
    },

    {
      title: "Chapter 02 — Rapid Emergency Assessment",
      description:
        "Learn a structured approach to rapidly assessing a deteriorating patient and identifying immediate life-threatening problems.",
      lessons: 1,
    },

    {
      title: "Chapter 03 — ABC Approach in Critical Care",
      description:
        "Develop a systematic Airway, Breathing and Circulation assessment framework for critically ill and deteriorating patients.",
      lessons: 1,
    },

    {
      title: "Chapter 04 — Airway Emergencies",
      description:
        "Study recognition and initial management principles for airway obstruction, airway compromise and other common airway emergencies.",
      lessons: 1,
    },

    {
      title: "Chapter 05 — Acute Respiratory Emergencies",
      description:
        "Understand common respiratory emergencies, oxygenation problems, respiratory distress and escalation of respiratory support.",
      lessons: 1,
    },

    {
      title: "Chapter 06 — Mechanical Ventilation Emergencies",
      description:
        "Learn how to recognise common patient-related and equipment-related ventilator emergencies and follow a structured troubleshooting approach.",
      lessons: 1,
    },

    {
      title: "Chapter 07 — Shock Recognition & Initial Response",
      description:
        "Understand the major concepts of shock, recognition of clinical deterioration, monitoring priorities and initial supportive management principles.",
      lessons: 1,
    },

    {
      title: "Chapter 08 — Sepsis & Septic Shock",
      description:
        "Study early recognition of sepsis, clinical deterioration, monitoring priorities and multidisciplinary management principles.",
      lessons: 1,
    },

    {
      title: "Chapter 09 — Cardiac Emergencies",
      description:
        "Understand common acute cardiac presentations in critical care and develop a structured approach to monitoring and escalation.",
      lessons: 1,
    },

    {
      title: "Chapter 10 — Tachyarrhythmia Emergencies",
      description:
        "Learn recognition of important fast cardiac rhythms and understand the principles of assessment, monitoring and emergency response.",
      lessons: 1,
    },

    {
      title: "Chapter 11 — Bradyarrhythmia & Heart Block Emergencies",
      description:
        "Understand clinically important slow rhythms and conduction abnormalities and their significance in critically ill patients.",
      lessons: 1,
    },

    {
      title: "Chapter 12 — Cardiac Arrest & Resuscitation",
      description:
        "Study cardiac-arrest recognition, emergency response, resuscitation workflow, team communication and post-resuscitation priorities.",
      lessons: 1,
    },

    {
      title: "Chapter 13 — Neurological Emergencies",
      description:
        "Understand assessment and emergency-care principles for acute neurological deterioration, altered consciousness and seizures.",
      lessons: 1,
    },

    {
      title: "Chapter 14 — Electrolyte & Metabolic Emergencies",
      description:
        "Study important electrolyte and metabolic abnormalities that may cause rapid clinical deterioration in ICU patients.",
      lessons: 1,
    },

    {
      title: "Chapter 15 — Acute Kidney & Fluid Emergencies",
      description:
        "Understand important fluid-balance problems, acute kidney-related deterioration and monitoring priorities in critical care.",
      lessons: 1,
    },

    {
      title: "Chapter 16 — Anaphylaxis & Acute Allergic Emergencies",
      description:
        "Learn recognition of severe allergic reactions and anaphylaxis and understand emergency assessment and escalation principles.",
      lessons: 1,
    },

    {
      title: "Chapter 17 — Rapid Response & Clinical Escalation",
      description:
        "Develop an organised approach to escalating care, communicating deterioration and coordinating emergency response within the ICU team.",
      lessons: 1,
    },

    {
      title: "Chapter 18 — Emergency Drugs & Safety Principles",
      description:
        "Understand the role of emergency medications, medication-safety principles, preparation, checking and safe administration within clinical protocols.",
      lessons: 1,
    },

    {
      title: "Chapter 19 — ICU Emergency Documentation & Handover",
      description:
        "Learn professional documentation, emergency communication, structured handover and important safety information following acute events.",
      lessons: 1,
    },

    {
      title: "Chapter 20 — Emergency Case Studies & Final Assessment",
      description:
        "Integrate emergency-assessment principles through structured ICU case scenarios and prepare for the final professional assessment.",
      lessons: 1,
    },
  ],

  /* ==============================================================
     LEARNING OUTCOMES
  ============================================================== */

  learningOutcomes: [
    "Understand the fundamentals of emergency management in the ICU.",

    "Recognize clinical deterioration and identify immediate priorities.",

    "Use a structured ABC approach during acute patient deterioration.",

    "Understand common airway emergencies and emergency response principles.",

    "Recognize important respiratory emergencies in critically ill patients.",

    "Understand common mechanical ventilation emergencies and troubleshooting principles.",

    "Recognize major clinical patterns associated with shock.",

    "Understand sepsis and septic shock recognition and monitoring principles.",

    "Recognize common acute cardiac emergencies in critical care.",

    "Understand important tachyarrhythmia patterns and emergency assessment.",

    "Recognize clinically significant bradyarrhythmias and heart blocks.",

    "Understand cardiac-arrest response and resuscitation workflow.",

    "Recognize important neurological emergencies and acute deterioration.",

    "Understand major electrolyte and metabolic emergencies.",

    "Recognize important fluid and acute kidney-related emergencies.",

    "Understand recognition and initial response principles for anaphylaxis.",

    "Develop structured clinical escalation and emergency communication skills.",

    "Understand emergency medication safety principles.",

    "Improve emergency documentation and professional handover.",

    "Apply emergency-management concepts to ICU-based clinical cases.",
  ],

  /* ==============================================================
     PRACTICAL SKILLS
  ============================================================== */

  practicalSkills: [
    "Rapid ICU emergency assessment",

    "ABC assessment",

    "Recognition of clinical deterioration",

    "Airway emergency recognition",

    "Respiratory emergency assessment",

    "Oxygenation monitoring",

    "Ventilator emergency recognition",

    "Ventilator troubleshooting principles",

    "Shock recognition",

    "Sepsis recognition",

    "Septic shock monitoring principles",

    "Cardiac emergency assessment",

    "Tachyarrhythmia recognition",

    "Bradyarrhythmia recognition",

    "Heart block recognition",

    "Cardiac arrest response workflow",

    "Resuscitation team communication",

    "Neurological emergency assessment",

    "Seizure emergency recognition",

    "Electrolyte emergency recognition",

    "Fluid-balance assessment",

    "Anaphylaxis recognition",

    "Emergency escalation",

    "Structured emergency handover",

    "Emergency documentation",

    "Case-based emergency decision making",
  ],

  /* ==============================================================
     COURSE INCLUDES
  ============================================================== */

  includes: [
    "20 structured ICU emergency-management chapters",

    "Beginner-to-advanced emergency learning pathway",

    "Professional emergency assessment framework",

    "Rapid patient assessment",

    "ABC emergency approach",

    "Airway emergency concepts",

    "Respiratory emergency concepts",

    "Mechanical ventilation emergency concepts",

    "Shock recognition and response principles",

    "Sepsis and septic shock concepts",

    "Cardiac emergency concepts",

    "Tachyarrhythmia learning",

    "Bradyarrhythmia and heart-block learning",

    "Cardiac arrest and resuscitation pathway",

    "Neurological emergency concepts",

    "Electrolyte and metabolic emergency concepts",

    "Fluid and acute kidney emergency concepts",

    "Anaphylaxis emergency concepts",

    "Rapid response and escalation principles",

    "Emergency medication safety concepts",

    "Emergency documentation and handover",

    "ICU emergency case studies",

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

export default function ICUEmergencyManagementPremiumPage() {
  return <CourseLandingPage course={course} />;
}