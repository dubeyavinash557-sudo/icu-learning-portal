import CourseLandingPage from "../../_components/CourseLandingPage";

export default function CriticalCareMonitoringPremiumPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Critical Care Monitoring Mastery",
        shortTitle: "Critical Care Monitoring Mastery",
        category: "Premium ICU • Monitoring & Assessment",

        description:
          "Master professional ICU monitoring with structured lessons covering vital signs, ECG, SpO₂, hemodynamic monitoring, neurological assessment, alarms and clinical decision-making fundamentals.",

        longDescription:
          "A structured premium learning pathway for nurses, ICU professionals and healthcare learners who want stronger bedside monitoring knowledge. The course combines monitoring fundamentals, systematic patient assessment, trend interpretation, alarm awareness and case-based practice in a professional LMS format.",

        instructor: "ICU Learning Portal Faculty",

        level: "Intermediate",

        duration: "12+ Hours",

        lessons: 50,

        students: "2,500+",

        rating: 4.9,

        price: "₹1,499",

        originalPrice: "₹2,499",

        isPremium: true,

        accent: "cyan",

        modules: [
          {
            title: "Module 01 — ICU Monitoring Fundamentals",
            description:
              "Understand the purpose of ICU monitoring, bedside observation, monitoring priorities and systematic patient assessment.",
            lessons: 6,
          },

          {
            title: "Module 02 — Vital Signs & Clinical Assessment",
            description:
              "Learn structured assessment of temperature, pulse, blood pressure, respiratory rate, pain and clinical changes.",
            lessons: 6,
          },

          {
            title: "Module 03 — ECG & Cardiac Monitoring",
            description:
              "Build foundational knowledge of ECG monitoring, cardiac rhythms, rhythm observation and monitoring alarms.",
            lessons: 6,
          },

          {
            title: "Module 04 — SpO₂ & Respiratory Monitoring",
            description:
              "Understand oxygen saturation monitoring, respiratory assessment, oxygen therapy observation and respiratory deterioration.",
            lessons: 6,
          },

          {
            title: "Module 05 — Hemodynamic Monitoring",
            description:
              "Learn the fundamentals of blood pressure trends, arterial-line monitoring, CVP concepts and hemodynamic observation.",
            lessons: 6,
          },

          {
            title: "Module 06 — Neurological Monitoring",
            description:
              "Study level of consciousness, pupil assessment, neurological observations and structured documentation.",
            lessons: 6,
          },

          {
            title: "Module 07 — ICU Monitoring Alarms",
            description:
              "Understand common monitoring alarms, verification steps, false alarms, patient assessment and safe escalation.",
            lessons: 5,
          },

          {
            title: "Module 08 — Fluid Balance & Urine Output",
            description:
              "Learn intake-output monitoring, urine output assessment, fluid balance documentation and important trends.",
            lessons: 5,
          },

          {
            title: "Module 09 — Case-Based Monitoring Practice",
            description:
              "Apply monitoring knowledge to practical ICU scenarios and identify important clinical trends.",
            lessons: 5,
          },

          {
            title: "Module 10 — Final Assessment & Clinical Review",
            description:
              "Consolidate your monitoring knowledge with revision, clinical review and assessment preparation.",
            lessons: 5,
          },
        ],

        learningOutcomes: [
          "Understand the objectives and limitations of common ICU monitoring systems.",
          "Perform a structured bedside monitoring assessment.",
          "Understand important vital-sign trends and clinical changes.",
          "Build foundational ECG and cardiac rhythm monitoring knowledge.",
          "Understand SpO₂ and respiratory monitoring principles.",
          "Understand arterial-line and CVP monitoring concepts.",
          "Perform structured neurological observations.",
          "Recognise common ICU monitoring alarms and verification steps.",
          "Understand fluid balance and urine-output monitoring.",
          "Apply monitoring concepts to case-based ICU scenarios.",
        ],

        practicalSkills: [
          "Systematic ICU bedside assessment",
          "Vital-sign monitoring",
          "Blood pressure trend assessment",
          "ECG and cardiac rhythm observation",
          "SpO₂ monitoring",
          "Respiratory assessment",
          "Arterial-line monitoring concepts",
          "CVP monitoring concepts",
          "Neurological assessment",
          "Pupil assessment",
          "Fluid balance monitoring",
          "Urine-output monitoring",
          "ICU alarm verification",
          "Clinical trend documentation",
          "Case-based monitoring assessment",
        ],

        includes: [
          "50 structured premium lessons",
          "Professional ICU monitoring curriculum",
          "Structured study modules",
          "Critical care monitoring notes",
          "Monitoring checklists",
          "Clinical assessment resources",
          "Case-based learning",
          "Practice assessments",
          "Progress tracking",
          "Premium study resources",
          "Course completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}