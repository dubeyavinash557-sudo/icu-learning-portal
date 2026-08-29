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
          "Designed for nursing professionals and serious ICU learners who want a structured pathway from critical-care fundamentals to advanced ICU nursing practice. This premium LMS pathway combines structured lessons, clinical concepts, practical nursing skills, monitoring knowledge, emergency-care principles and assessment-focused revision.",

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
              "Build a strong foundation in ICU nursing, including ICU organization, critical-care workflow, patient safety, infection prevention, professional responsibilities and structured bedside practice.",
            lessons: 15,
          },
          {
            title: "Patient Assessment & Clinical Monitoring",
            description:
              "Develop a systematic approach to ICU patient assessment, vital signs, neurological assessment, fluid balance, respiratory observation and continuous bedside monitoring.",
            lessons: 15,
          },
          {
            title: "Hemodynamic & Advanced Monitoring",
            description:
              "Understand the principles of invasive and non-invasive monitoring, perfusion assessment, hemodynamic parameters, monitoring trends and recognition of clinical deterioration.",
            lessons: 15,
          },
          {
            title: "Airway, Ventilator & Respiratory Care",
            description:
              "Develop practical knowledge of airway management, ET-tube care, suctioning principles, oxygen therapy, ventilator concepts and essential respiratory nursing responsibilities.",
            lessons: 15,
          },
          {
            title: "Emergency & Critical Care Management",
            description:
              "Study emergency response principles, shock recognition, code situations, emergency medications and nursing priorities during acute patient deterioration.",
            lessons: 15,
          },
          {
            title: "Advanced ICU Nursing Practice",
            description:
              "Strengthen professional ICU practice through documentation, medication safety, multidisciplinary communication, structured handover, patient-family support and advanced bedside responsibilities.",
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
          "Improve ICU documentation, communication and structured clinical handover.",
          "Understand infection-prevention practices relevant to critical-care nursing.",
          "Apply structured clinical reasoning to common ICU patient scenarios.",
          "Strengthen practical bedside nursing knowledge for critical-care environments.",
          "Prepare for ICU nursing interviews, viva discussions and professional assessments.",
        ],

        practicalSkills: [
          "ICU patient assessment",
          "Systematic bedside assessment",
          "Vital-sign monitoring",
          "Neurological assessment",
          "Fluid balance monitoring",
          "Respiratory assessment",
          "Airway and ET-tube care",
          "Suctioning principles",
          "Oxygen therapy principles",
          "Ventilator-care principles",
          "Hemodynamic monitoring concepts",
          "Central-line care principles",
          "Arterial-line monitoring",
          "Emergency response principles",
          "Medication safety",
          "High-alert medication awareness",
          "ICU documentation",
          "Structured clinical handover",
          "Multidisciplinary communication",
          "Patient and family communication",
        ],

        includes: [
          "90 structured premium lessons",
          "Complete critical-care nursing curriculum",
          "Six structured advanced ICU learning modules",
          "Airway and respiratory-care learning",
          "Ventilator-care concepts",
          "Monitoring and hemodynamic concepts",
          "Neurological and bedside assessment learning",
          "Emergency and shock-management learning",
          "Practical ICU nursing resources",
          "Clinical documentation and handover guidance",
          "Medication-safety learning",
          "Assessment and quiz preparation",
          "Case-based clinical revision",
          "Lesson progress tracking",
          "Structured course completion pathway",
          "Certificate eligibility after course completion",
          "Premium learner access through the LMS",
        ],
      }}
    />
  );
}