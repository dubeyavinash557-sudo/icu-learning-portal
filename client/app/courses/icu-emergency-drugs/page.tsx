import CourseLandingPage from "../_components/CourseLandingPage";

export default function ICUEmergencyDrugsPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ICU Emergency Drugs Master Course",
        shortTitle: "ICU Emergency Drugs",
        category: "Critical Care • Emergency Pharmacology",

        description:
          "A structured professional course covering essential ICU emergency drugs, indications, pharmacological principles, preparation, administration, monitoring, adverse effects and emergency-care decision making.",

        longDescription:
          "Designed for nurses, ICU professionals and healthcare learners who want a systematic understanding of commonly used emergency medications in critical-care settings. The course focuses on safe medication knowledge, emergency priorities, monitoring principles and practical ICU application.",

        instructor: "ICU Learning Portal Faculty",

        level: "Intermediate to Advanced",
        duration: "12+ Hours",
        lessons: 60,

        students: "1,500+",
        rating: 4.9,

        price: "₹2,499",
        originalPrice: "₹3,999",

        isPremium: true,
        accent: "amber",

        modules: [
          {
            title: "Emergency Drug Fundamentals",
            description:
              "Understand emergency pharmacology, medication safety, drug preparation principles, routes of administration and ICU medication workflow.",
            lessons: 10,
          },
          {
            title: "Cardiac Emergency Medications",
            description:
              "Study commonly used medications in cardiac arrest, arrhythmias, bradycardia, tachycardia and acute cardiovascular emergencies.",
            lessons: 12,
          },
          {
            title: "Vasopressors & Hemodynamic Support",
            description:
              "Learn the clinical principles behind vasopressor and inotropic medications used for hypotension, shock and hemodynamic instability.",
            lessons: 10,
          },
          {
            title: "Respiratory & Critical-Care Medications",
            description:
              "Understand medication groups commonly used in respiratory emergencies, airway management and critical-care support.",
            lessons: 8,
          },
          {
            title: "Sedation, Analgesia & Emergency Agents",
            description:
              "Learn the principles of commonly used sedative, analgesic and emergency medications with emphasis on monitoring and patient safety.",
            lessons: 10,
          },
          {
            title: "Emergency Drug Case Practice",
            description:
              "Apply medication knowledge to structured ICU emergency scenarios and clinical decision-making exercises.",
            lessons: 10,
          },
        ],

        learningOutcomes: [
          "Understand the role of emergency medications in critical-care practice.",
          "Identify commonly used ICU emergency drug categories and their clinical purposes.",
          "Understand indications, contraindications and important precautions.",
          "Develop safer medication preparation and administration knowledge.",
          "Understand essential monitoring requirements during emergency drug use.",
          "Recognise important adverse effects and medication-related risks.",
          "Understand basic principles of vasopressors and hemodynamic support.",
          "Understand emergency pharmacology concepts used during cardiac emergencies.",
          "Apply medication knowledge to structured ICU emergency cases.",
          "Improve ICU emergency drug viva and interview preparation.",
        ],

        practicalSkills: [
          "Emergency medication identification",
          "Drug preparation principles",
          "Medication dilution concepts",
          "Route of administration principles",
          "IV medication safety",
          "Emergency medication monitoring",
          "Vasopressor safety principles",
          "Cardiac emergency medication awareness",
          "Medication adverse-effect recognition",
          "High-alert medication safety",
          "Emergency drug documentation",
          "ICU medication handover",
        ],

        includes: [
          "60 structured premium lessons",
          "Emergency drug learning modules",
          "Professional ICU pharmacology resources",
          "Emergency medication revision notes",
          "Case-based learning",
          "Practice assessments and quizzes",
          "Viva and interview preparation",
          "Learning progress tracking",
          "Premium study resources",
          "Course completion certificate pathway",
        ],
      }}
    />
  );
}