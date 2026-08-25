import CourseLandingPage from "../_components/CourseLandingPage";

export default function ICUNursingPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ICU Nursing Master Course",
        shortTitle: "ICU Nursing",
        category: "Critical Care • Nursing",
        description:
          "A comprehensive ICU nursing learning pathway covering critical-care fundamentals, patient monitoring, ventilator care, emergency management and practical ICU skills.",
        longDescription:
          "Designed as a structured professional learning pathway for healthcare learners developing ICU nursing knowledge and clinical confidence.",
        instructor: "ICU Learning Portal Faculty",
        level: "Beginner to Advanced",
        duration: "25+ Hours",
        lessons: 120,
        students: "3,500+",
        rating: 4.9,
        price: "₹4,999",
        originalPrice: "₹6,999",
        isPremium: true,
        accent: "blue",

        modules: [
          {
            title: "ICU Fundamentals",
            description:
              "ICU setup, types of critical-care units, patient safety and infection-control principles.",
            lessons: 20,
          },
          {
            title: "Patient Assessment & Monitoring",
            description:
              "Vital signs, neurological assessment, hemodynamic monitoring and clinical observation.",
            lessons: 25,
          },
          {
            title: "Mechanical Ventilation & Airway Care",
            description:
              "Ventilator fundamentals, airway management, suctioning and nursing responsibilities.",
            lessons: 25,
          },
          {
            title: "Emergency & Critical Care",
            description:
              "Emergency response, shock, CPR concepts, emergency medications and critical-care priorities.",
            lessons: 25,
          },
          {
            title: "Advanced ICU Nursing Practice",
            description:
              "Complex patient care, documentation, clinical coordination and professional preparation.",
            lessons: 25,
          },
        ],

        learningOutcomes: [
          "Understand ICU environment, equipment and workflow.",
          "Perform structured critical-care patient assessment.",
          "Understand essential ICU monitoring parameters.",
          "Develop safe ventilator and airway-care knowledge.",
          "Understand emergency and critical-care priorities.",
          "Recognise common shock and deterioration patterns.",
          "Improve ICU documentation and clinical communication.",
          "Prepare for ICU nursing interviews and viva discussions.",
        ],

        practicalSkills: [
          "Patient monitoring",
          "Airway and ET-tube care",
          "Suctioning principles",
          "Central-line care principles",
          "Arterial-line monitoring",
          "Emergency response",
          "Medication safety principles",
          "Clinical documentation",
          "Infection-control practices",
          "ICU handover and communication",
        ],

        includes: [
          "120 structured lessons",
          "ICU nursing learning modules",
          "Practical clinical resources",
          "Ventilator learning",
          "Emergency-care learning",
          "ICU notes and revision resources",
          "Assessments and quizzes",
          "Learning progress tracking",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}