import CourseLandingPage from "@/app/courses/_components/CourseLandingPage";

export const dynamic = "force-dynamic";

export default function MechanicalVentilationPremiumPage() {
  return (
    <CourseLandingPage
      course={{
        title:
          "Mechanical Ventilation & Respiratory Care Masterclass",

        shortTitle:
          "Mechanical Ventilation Masterclass",

        category:
          "Mechanical Ventilation • Respiratory Care",

        description:
          "Build strong practical understanding of mechanical ventilation, ventilator modes, settings, alarms, waveforms, oxygenation, troubleshooting and weaning through a structured ICU-focused learning pathway.",

        longDescription:
          "A professional learning pathway for nurses, ICU professionals and healthcare learners who want a structured understanding of mechanical ventilation and respiratory care. The curriculum progresses from core terminology to ventilator modes, monitoring, alarms, troubleshooting, weaning and case-based learning.",

        instructor: "Avinash Dubey",

        level: "Intermediate to Advanced",

        duration: "14 Hours",

        lessons: 20,

        students: "9,800+",

        rating: 4.9,

        price: "₹2,999",

        originalPrice: "₹4,999",

        isPremium: true,

        accent: "cyan",

        modules: [
          {
            title: "Module 01 — Ventilation Foundations",
            description:
              "Build the foundation required to understand mechanical ventilation, respiratory support and essential ventilator terminology.",
            lessons: 4,
          },

          {
            title: "Module 02 — Ventilator Modes",
            description:
              "Understand commonly used volume-controlled, pressure-controlled and assisted ventilation modes.",
            lessons: 4,
          },

          {
            title: "Module 03 — Ventilator Settings",
            description:
              "Study important ventilator parameters including tidal volume, respiratory rate, FiO₂, PEEP and pressure support.",
            lessons: 4,
          },

          {
            title: "Module 04 — Monitoring & Alarms",
            description:
              "Learn systematic interpretation of ventilator waveforms, patient response and common ventilator alarms.",
            lessons: 4,
          },

          {
            title: "Module 05 — Troubleshooting & Weaning",
            description:
              "Develop a structured approach to common ventilation problems, readiness assessment and ventilator liberation.",
            lessons: 4,
          },
        ],

        learningOutcomes: [
          "Understand the fundamental principles of mechanical ventilation.",

          "Explain important ventilator terminology including tidal volume, respiratory rate, minute ventilation and airway pressure.",

          "Understand the principles of volume-controlled and pressure-controlled ventilation.",

          "Differentiate common assisted and spontaneous breathing modes.",

          "Understand the clinical purpose of PEEP, FiO₂ and pressure support.",

          "Recognize the relationship between oxygenation and ventilation.",

          "Develop a structured approach to interpreting ventilator waveforms.",

          "Understand common high-pressure and low-pressure ventilator alarms.",

          "Apply a systematic approach to ventilator troubleshooting.",

          "Understand general principles of spontaneous breathing trials and ventilator weaning.",

          "Apply ventilation concepts to structured ICU case scenarios.",

          "Improve confidence in communicating ventilator-related observations during ICU handover.",
        ],

        practicalSkills: [
          "Identify major components and commonly used controls of a mechanical ventilator.",

          "Understand basic ventilator setup concepts and safety checks.",

          "Recognize commonly used ventilation modes.",

          "Understand how changes in ventilator parameters can affect patient support.",

          "Interpret basic pressure, flow and volume waveform patterns.",

          "Recognize common ventilator alarm categories.",

          "Use a structured approach when assessing a ventilator alarm.",

          "Differentiate patient-related and equipment-related causes of ventilation problems.",

          "Understand basic oxygenation and ventilation monitoring.",

          "Review ventilator settings during clinical assessment.",

          "Understand general readiness considerations for weaning.",

          "Apply concepts through ICU-based clinical case discussions.",
        ],

        includes: [
          "20 structured LMS lessons",

          "Mechanical ventilation fundamentals",

          "Ventilator terminology and parameters",

          "Volume-controlled ventilation",

          "Pressure-controlled ventilation",

          "SIMV and assisted ventilation modes",

          "CPAP and pressure support concepts",

          "PEEP and FiO₂ management",

          "Ventilator waveform interpretation",

          "Ventilator alarm recognition",

          "Systematic troubleshooting framework",

          "Weaning and spontaneous breathing concepts",

          "ICU-focused case study learning",

          "Quiz and assessment pathway",

          "Progress tracking through the LMS",

          "Professional course completion pathway",

          "Hindi + English learning environment",
        ],
      }}
    />
  );
}