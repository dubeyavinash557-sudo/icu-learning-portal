import CourseLandingPage from "../_components/CourseLandingPage";

export default function ICUNursingInterviewVivaPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ICU Nursing Interview & Viva Master Course",
        shortTitle: "ICU Nursing Interview & Viva",
        category: "Career • ICU Nursing Interview",
        description:
          "Prepare for ICU nursing interviews, viva questions and practical discussions with structured revision across critical-care topics.",
        longDescription:
          "A premium interview-preparation program covering ICU fundamentals, ventilator questions, emergency care, drugs, monitoring, procedures and scenario-based viva practice.",
        instructor: "ICU Learning Portal Faculty",
        level: "All Levels",
        duration: "10+ Hours",
        lessons: 50,
        students: "4,500+",
        rating: 4.9,
        price: "₹1,299",
        originalPrice: "₹1,799",
        isPremium: true,
        accent: "blue",

        modules: [
          {
            title: "ICU Nursing Interview Fundamentals",
            description:
              "Build a strong interview strategy, professional introduction and core ICU revision framework.",
            lessons: 6,
          },
          {
            title: "ICU Assessment & Monitoring Viva",
            description:
              "Practice common questions on assessment, vital signs, ECG, SpO₂ and critical-care monitoring.",
            lessons: 7,
          },
          {
            title: "Ventilator & Airway Interview",
            description:
              "Revise ventilator basics, modes, alarms, airway care and intubation-support questions.",
            lessons: 7,
          },
          {
            title: "Emergency Drugs & Code Blue",
            description:
              "Prepare for questions on emergency drugs, crash-cart knowledge and resuscitation workflows.",
            lessons: 6,
          },
          {
            title: "ABG, ECG & Critical Care Cases",
            description:
              "Practice structured case-based questions involving ABG, ECG and common ICU scenarios.",
            lessons: 7,
          },
          {
            title: "ICU Procedures & Patient Safety",
            description:
              "Revise common ICU procedures, infection control, documentation and safety questions.",
            lessons: 6,
          },
          {
            title: "Scenario-Based Nursing Viva",
            description:
              "Work through prioritisation, deterioration, communication and clinical-scenario questions.",
            lessons: 6,
          },
          {
            title: "Final Mock Interview & Revision",
            description:
              "Complete structured mock interviews, rapid revision and high-yield viva practice.",
            lessons: 5,
          },
        ],

        learningOutcomes: [
          "Answer common ICU nursing interview questions with a structured approach.",
          "Revise ventilator, airway, ABG, ECG and monitoring concepts.",
          "Prepare for emergency-drug and Code Blue viva questions.",
          "Discuss ICU procedures and patient-safety responsibilities clearly.",
          "Handle scenario-based prioritisation and clinical questions.",
          "Build confidence through mock interview and rapid-revision practice.",
        ],

        practicalSkills: [
          "Professional interview introduction",
          "ICU clinical question answering",
          "Ventilator viva practice",
          "Emergency-drug viva practice",
          "ABG and ECG case discussion",
          "Patient-safety scenario handling",
          "Clinical prioritisation",
          "Mock interview practice",
        ],

        includes: [
          "Structured premium interview lessons",
          "ICU nursing interview notes",
          "Viva question bank",
          "Scenario-based quizzes",
          "Premium PDF study resources",
          "Progress tracking",
          "Mock interview pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}
