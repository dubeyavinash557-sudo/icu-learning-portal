import CourseLandingPage from "../_components/CourseLandingPage";

export default function ICUEmergencyDrugsPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ICU Emergency Drugs Master Course",
        shortTitle: "ICU Emergency Drugs",
        category: "Critical Care • Emergency Pharmacology",

        description:
          "A structured professional course covering essential ICU emergency drugs, clinical indications, pharmacological principles, preparation concepts, administration principles, monitoring, adverse effects and emergency-care decision making.",

        longDescription:
          "Designed for nurses, ICU professionals and healthcare learners who want a systematic understanding of commonly used emergency medications in critical-care settings. This premium LMS pathway focuses on medication knowledge, emergency priorities, patient monitoring, medication safety and practical ICU application. It is designed as an educational resource and does not replace institutional protocols, prescribing guidance or supervised clinical training.",

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
              "Build a strong foundation in emergency pharmacology, medication safety, drug identification, preparation concepts, routes of administration and ICU medication workflow.",
            lessons: 10,
          },
          {
            title: "Cardiac Emergency Medications",
            description:
              "Study commonly encountered medication groups used in cardiac arrest, arrhythmias, bradycardia, tachycardia and acute cardiovascular emergencies, with emphasis on indications and monitoring.",
            lessons: 12,
          },
          {
            title: "Vasopressors & Hemodynamic Support",
            description:
              "Understand the principles of vasopressor and inotropic therapy used in hypotension, shock and hemodynamic instability, including monitoring and safety considerations.",
            lessons: 10,
          },
          {
            title: "Respiratory & Critical-Care Medications",
            description:
              "Explore medication groups associated with respiratory emergencies, airway management and critical-care support while focusing on clinical purpose, precautions and patient observation.",
            lessons: 8,
          },
          {
            title: "Sedation, Analgesia & Emergency Agents",
            description:
              "Learn the core principles of commonly used sedative, analgesic and emergency medication groups with emphasis on patient assessment, monitoring and medication safety.",
            lessons: 10,
          },
          {
            title: "Emergency Drug Case Practice",
            description:
              "Apply emergency medication knowledge to structured ICU scenarios, prioritization exercises, monitoring questions and clinical decision-making practice.",
            lessons: 10,
          },
        ],

        learningOutcomes: [
          "Understand the role of emergency medications in critical-care practice.",
          "Identify commonly used ICU emergency drug categories and their clinical purposes.",
          "Understand key indications, contraindications and important precautions.",
          "Develop safer medication preparation and administration knowledge.",
          "Understand essential patient-monitoring requirements during emergency medication use.",
          "Recognise important adverse effects and medication-related risks.",
          "Understand foundational principles of vasopressors and hemodynamic support.",
          "Understand emergency pharmacology concepts relevant to cardiac emergencies.",
          "Apply medication knowledge to structured ICU emergency cases.",
          "Recognise the importance of institutional protocols and supervised clinical practice.",
          "Strengthen emergency-drug documentation and communication knowledge.",
          "Improve ICU emergency-drug viva and interview preparation.",
        ],

        practicalSkills: [
          "Emergency medication identification",
          "Drug class recognition",
          "Medication preparation principles",
          "Medication dilution concepts",
          "Route-of-administration principles",
          "IV medication safety principles",
          "Emergency medication monitoring",
          "Vasopressor safety awareness",
          "Cardiac emergency medication awareness",
          "Adverse-effect recognition",
          "High-alert medication safety",
          "Medication compatibility awareness",
          "Emergency drug documentation",
          "ICU medication handover",
          "Case-based emergency medication review",
        ],

        includes: [
          "60 structured premium lessons",
          "Six emergency-pharmacology learning modules",
          "Professional ICU pharmacology resources",
          "Emergency medication revision notes",
          "Drug-class focused learning",
          "Medication-safety learning resources",
          "Case-based emergency scenarios",
          "Practice assessments and quizzes",
          "Viva and interview preparation",
          "Emergency-drug revision pathway",
          "Learning progress tracking",
          "Premium study resources",
          "Structured course completion pathway",
          "Certificate eligibility after course completion",
          "Premium learner access through the LMS",
        ],
      }}
    />
  );
}