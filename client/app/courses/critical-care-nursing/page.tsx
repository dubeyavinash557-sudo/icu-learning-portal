import CourseLandingPage from "../_components/CourseLandingPage";

export default function CriticalCareNursingPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Critical Care Nursing Master Course",
        shortTitle: "Critical Care Nursing",
        category: "Critical Care • Advanced Nursing",

        description:
          "A professional critical-care nursing learning pathway covering ICU assessment, hemodynamic monitoring, airway and ventilator care, emergency management, documentation and advanced bedside nursing practice.",

        longDescription:
          "Designed for nursing professionals and serious ICU learners who want a structured pathway from critical-care fundamentals to advanced ICU nursing practice.",

        instructor: "ICU Learning Portal Faculty",

        level: "Intermediate to Advanced",
        duration: "18+ Hours",
        lessons: 90,
        students: "2,400+",
        rating: 4.9,

        price: "₹3,499",
        originalPrice: "₹4,999",

        isPremium: true,
        accent: "blue",

        modules: [
          {
            title: "Critical Care Nursing Foundations",
            description:
              "Understand ICU organization, critical-care workflow, patient safety, infection prevention and the professional role of the ICU nurse.",
            lessons: 15,
          },
          {
            title: "Patient Assessment & Clinical Monitoring",
            description:
              "Develop a systematic approach to patient assessment, vital signs, neurological assessment, fluid balance and bedside monitoring.",
            lessons: 15,
          },
          {
            title: "Hemodynamic & Advanced Monitoring",
            description:
              "Learn the principles of invasive and non-invasive monitoring, perfusion assessment, hemodynamic parameters and clinical deterioration recognition.",
            lessons: 15,
          },
          {
            title: "Airway, Ventilator & Respiratory Care",
            description:
              "Build practical knowledge of airway management, ET-tube care, suctioning, oxygen therapy, ventilator concepts and respiratory nursing responsibilities.",
            lessons: 15,
          },
          {
            title: "Emergency & Critical Care Management",
            description:
              "Study emergency response, shock management, code situations, emergency medications and nursing priorities during patient deterioration.",
            lessons: 15,
          },
          {
            title: "Advanced ICU Nursing Practice",
            description:
              "Strengthen documentation, medication safety, multidisciplinary communication, patient-family support and professional ICU practice.",
            lessons: 15,
          },
        ],

        learningOutcomes: [
          "Understand the organization, workflow and responsibilities of a critical-care nursing unit.",
          "Perform systematic ICU patient assessment and recognize important clinical changes.",
          "Understand essential hemodynamic and bedside monitoring parameters.",
          "Develop safe airway, oxygenation and ventilator-care knowledge.",
          "Recognize common patterns of shock, instability and clinical deterioration.",
          "Understand emergency nursing priorities during critical patient situations.",
          "Apply safe medication-administration and high-alert medication principles.",
          "Improve ICU documentation, communication and structured handover.",
          "Understand infection-prevention practices relevant to critical-care nursing.",
          "Prepare for ICU nursing interviews, viva discussions and professional assessments.",
        ],

        practicalSkills: [
          "ICU patient assessment",
          "Vital-sign and bedside monitoring",
          "Neurological assessment",
          "Fluid balance monitoring",
          "Airway and ET-tube care",
          "Suctioning principles",
          "Oxygen therapy principles",
          "Ventilator-care principles",
          "Hemodynamic monitoring concepts",
          "Central-line care principles",
          "Arterial-line monitoring",
          "Emergency response",
          "Medication safety",
          "ICU documentation",
          "Clinical handover and communication",
        ],

        includes: [
          "90 structured premium lessons",
          "Critical-care nursing curriculum",
          "Advanced ICU learning modules",
          "Airway and ventilator learning",
          "Monitoring and hemodynamic concepts",
          "Emergency and shock-management learning",
          "Practical ICU nursing resources",
          "Assessment and quiz preparation",
          "Lesson progress tracking",
          "Structured completion pathway",
          "Certificate eligibility after course completion",
          "Premium learner access through the LMS",
        ],
      }}
    />
  );
}