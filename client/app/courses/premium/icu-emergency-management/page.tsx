import CourseLandingPage, {
  type CourseLandingData,
} from "@/app/courses/_components/CourseLandingPage";

export const dynamic = "force-dynamic";

/* ================================================================
   ICU EMERGENCY & CRITICAL CARE MANAGEMENT MASTERCLASS

   Route:
   /courses/premium/icu-emergency-management

   Purpose:
   - Premium professional LMS landing page
   - 20 structured chapters
   - ICU emergency focused curriculum
   - Uses shared CourseLandingPage component
   - Separate from practical/study resource courses
================================================================ */

const course: CourseLandingData = {
  /* ==============================================================
     BASIC COURSE INFORMATION
  ============================================================== */

  title: "ICU Emergency & Critical Care Management Masterclass",

  shortTitle: "ICU Emergency Management Masterclass",

  category:
    "ICU Emergency • Critical Care • Emergency Management",

  description:
    "A professional ICU emergency learning program designed to help nurses, critical care professionals, paramedical students and healthcare learners develop a structured approach to recognising and managing common critical-care emergencies.",

  longDescription:
    "Build a strong foundation in ICU emergency assessment, rapid patient evaluation, airway and breathing emergencies, circulation and shock, cardiac emergencies, sepsis, neurological emergencies, electrolyte disturbances, emergency procedures, monitoring, escalation and structured clinical case learning. The program follows a progressive 20-chapter pathway from emergency fundamentals to advanced ICU-oriented clinical reasoning.",

  instructor: "Avinash Dubey",

  level: "Beginner to Advanced",

  duration: "20 Chapters",

  lessons: 20,

  students: "10,000+",

  rating: 4.9,

  price: "₹2,499",

  originalPrice: "₹4,999",

  isPremium: true,

  accent: "blue",

  /* ==============================================================
     20-CHAPTER CURRICULUM
  ============================================================== */

  modules: [
    {
      title: "Chapter 01 — ICU Emergency Fundamentals",
      description:
        "Understand the principles of emergency care in the ICU, early recognition of deterioration and the importance of rapid, structured assessment.",
      lessons: 1,
    },

    {
      title: "Chapter 02 — Initial Patient Assessment",
      description:
        "Learn a systematic approach to assessing a critically ill patient, identifying immediate threats and prioritising urgent interventions.",
      lessons: 1,
    },

    {
      title: "Chapter 03 — ABCDE Assessment",
      description:
        "Develop a structured Airway, Breathing, Circulation, Disability and Exposure assessment approach for critically ill patients.",
      lessons: 1,
    },

    {
      title: "Chapter 04 — Airway Emergencies",
      description:
        "Study common airway emergencies, warning signs, basic airway support principles and escalation during acute deterioration.",
      lessons: 1,
    },

    {
      title: "Chapter 05 — Respiratory Emergencies",
      description:
        "Understand common acute respiratory problems, oxygenation failure, respiratory distress and the principles of emergency respiratory support.",
      lessons: 1,
    },

    {
      title: "Chapter 06 — Mechanical Ventilation in Emergencies",
      description:
        "Review important emergency ventilation concepts and understand how ventilatory support is used during severe respiratory compromise.",
      lessons: 1,
    },

    {
      title: "Chapter 07 — Shock & Circulatory Emergencies",
      description:
        "Understand the major concepts of shock, recognition of circulatory compromise, monitoring and structured emergency response.",
      lessons: 1,
    },

    {
      title: "Chapter 08 — Sepsis & Septic Shock",
      description:
        "Learn the fundamentals of recognising suspected sepsis, assessing deterioration and understanding the importance of timely escalation and treatment.",
      lessons: 1,
    },

    {
      title: "Chapter 09 — Cardiac Arrest & CPR",
      description:
        "Understand cardiac arrest recognition, high-quality CPR principles, emergency response sequence and team-based resuscitation concepts.",
      lessons: 1,
    },

    {
      title: "Chapter 10 — ECG & Acute Cardiac Emergencies",
      description:
        "Develop a structured approach to recognising important ECG abnormalities and understanding common acute cardiac emergencies in critical care.",
      lessons: 1,
    },

    {
      title: "Chapter 11 — Acute Coronary Syndromes",
      description:
        "Understand the basic clinical concepts of acute coronary syndromes, warning signs, monitoring priorities and emergency escalation.",
      lessons: 1,
    },

    {
      title: "Chapter 12 — Arrhythmias & Hemodynamic Instability",
      description:
        "Learn to recognise clinically important rhythm abnormalities and understand the relationship between arrhythmia, perfusion and patient instability.",
      lessons: 1,
    },

    {
      title: "Chapter 13 — Neurological Emergencies",
      description:
        "Study important neurological emergencies including altered consciousness, seizures and acute neurological deterioration.",
      lessons: 1,
    },

    {
      title: "Chapter 14 — Acute Kidney & Electrolyte Emergencies",
      description:
        "Understand common electrolyte abnormalities, acute kidney-related emergencies and their significance in critically ill patients.",
      lessons: 1,
    },

    {
      title: "Chapter 15 — Acid–Base & ABG Emergencies",
      description:
        "Apply structured ABG and acid–base concepts to critically ill patients presenting with acute respiratory or metabolic deterioration.",
      lessons: 1,
    },

    {
      title: "Chapter 16 — Emergency Drugs & Medication Safety",
      description:
        "Review the principles of emergency medication preparation, safe administration, monitoring and communication during critical situations.",
      lessons: 1,
    },

    {
      title: "Chapter 17 — ICU Monitoring & Early Warning Signs",
      description:
        "Learn how vital signs, monitoring trends and changes in clinical condition can help identify deterioration and support timely escalation.",
      lessons: 1,
    },

    {
      title: "Chapter 18 — Common ICU Emergency Scenarios",
      description:
        "Work through structured ICU emergency scenarios covering respiratory, cardiac, neurological and circulatory deterioration.",
      lessons: 1,
    },

    {
      title: "Chapter 19 — Emergency Communication & Team Response",
      description:
        "Understand effective ICU emergency communication, escalation, handover and coordinated multidisciplinary response.",
      lessons: 1,
    },

    {
      title: "Chapter 20 — Final ICU Emergency Mastery Assessment",
      description:
        "Review the complete emergency-management pathway and prepare for the final assessment through comprehensive ICU-oriented clinical scenarios.",
      lessons: 1,
    },
  ],

  /* ==============================================================
     LEARNING OUTCOMES
  ============================================================== */

  learningOutcomes: [
    "Understand the fundamentals of emergency management in the ICU.",

    "Recognize important signs of acute clinical deterioration.",

    "Apply a structured initial assessment approach to critically ill patients.",

    "Understand the ABCDE assessment framework.",

    "Recognize common airway emergencies and understand basic emergency airway support principles.",

    "Recognize common respiratory emergencies and understand oxygenation and ventilation concepts.",

    "Understand important emergency mechanical ventilation concepts.",

    "Recognize major clinical features associated with shock and circulatory compromise.",

    "Understand the fundamentals of sepsis and septic shock recognition.",

    "Understand cardiac arrest recognition and high-quality CPR principles.",

    "Recognize important ECG and acute cardiac emergency patterns.",

    "Understand the basic concepts of acute coronary syndromes.",

    "Recognize clinically important arrhythmias and their relationship with hemodynamic instability.",

    "Recognize important neurological emergencies and acute neurological deterioration.",

    "Understand common electrolyte and acute kidney-related emergencies.",

    "Apply basic ABG and acid–base concepts to acute critical-care situations.",

    "Understand principles of emergency medication safety and monitoring.",

    "Recognize important monitoring trends and early warning signs.",

    "Apply structured reasoning to common ICU emergency scenarios.",

    "Develop confidence in emergency communication, escalation and team response.",
  ],

  /* ==============================================================
     PRACTICAL SKILLS
  ============================================================== */

  practicalSkills: [
    "Perform a structured initial assessment of a critically ill patient",

    "Apply the ABCDE assessment framework",

    "Recognize signs of airway compromise",

    "Recognize respiratory distress and deterioration",

    "Assess basic oxygenation and ventilation status",

    "Understand emergency respiratory support concepts",

    "Recognize signs of circulatory compromise",

    "Identify common shock patterns conceptually",

    "Recognize important sepsis warning signs",

    "Understand basic cardiac arrest response principles",

    "Review high-quality CPR concepts",

    "Recognize important ECG abnormalities",

    "Identify common acute cardiac emergency presentations",

    "Recognize clinically important arrhythmias",

    "Assess basic neurological deterioration",

    "Recognize common seizure and altered-consciousness scenarios",

    "Identify important electrolyte abnormalities",

    "Relate ABG findings to acute clinical deterioration",

    "Apply safe principles of emergency medication administration",

    "Use structured communication and escalation during ICU emergencies",
  ],

  /* ==============================================================
     COURSE INCLUDES
  ============================================================== */

  includes: [
    "20 structured ICU emergency learning chapters",

    "Beginner-to-advanced emergency management pathway",

    "Initial critical patient assessment",

    "ABCDE emergency assessment",

    "Airway emergency concepts",

    "Respiratory emergency concepts",

    "Emergency mechanical ventilation concepts",

    "Shock and circulatory emergency concepts",

    "Sepsis and septic shock learning",

    "Cardiac arrest and CPR concepts",

    "ECG and acute cardiac emergencies",

    "Acute coronary syndrome concepts",

    "Arrhythmia and hemodynamic instability",

    "Neurological emergency concepts",

    "Acute kidney and electrolyte emergencies",

    "ABG and acid–base emergency concepts",

    "Emergency medication safety principles",

    "ICU monitoring and early warning signs",

    "Common ICU emergency case scenarios",

    "Emergency communication and escalation",

    "Structured LMS learning pathway",

    "Quiz and assessment pathway",

    "Progress tracking through the LMS",

    "Premium course access",

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