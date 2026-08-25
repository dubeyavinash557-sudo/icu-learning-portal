import CourseLandingPage from "../_components/CourseLandingPage";

export default function ICUNursingPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ICU Nursing Master Course",
        shortTitle: "ICU Nursing Master Course",
        category: "Critical Care • Nursing • Professional Program",

        description:
          "A structured professional ICU nursing program covering critical-care fundamentals, patient assessment, monitoring, airway and ventilator care, emergency management, clinical documentation and advanced ICU practice.",

        longDescription:
          "A premium, structured learning pathway for nurses and healthcare learners who want to build stronger ICU knowledge through organised lessons, practical learning resources, assessments, progress tracking and a completion pathway.",

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
            title: "Module 01 — ICU Fundamentals",
            description:
              "Understand ICU structure, critical-care environment, ICU equipment, patient safety, infection prevention, professional responsibilities and essential nursing workflow.",

            lessons: 20,
          },

          {
            title: "Module 02 — Patient Assessment & Monitoring",
            description:
              "Learn systematic ICU patient assessment, vital signs, neurological observation, hemodynamic parameters, monitoring principles, clinical deterioration and documentation.",

            lessons: 25,
          },

          {
            title: "Module 03 — Airway Management & Mechanical Ventilation",
            description:
              "Develop structured knowledge of airway care, endotracheal tube care, suctioning, ventilator fundamentals, common ventilator concepts, alarms, monitoring and nursing responsibilities.",

            lessons: 25,
          },

          {
            title: "Module 04 — Emergency & Critical Care Management",
            description:
              "Study emergency response, CPR concepts, shock recognition, code situations, emergency medicines, crash-cart principles and priorities in critically ill patients.",

            lessons: 25,
          },

          {
            title: "Module 05 — Advanced ICU Nursing Practice",
            description:
              "Build advanced ICU nursing understanding through complex patient care, clinical communication, documentation, handover, multidisciplinary coordination and professional preparation.",

            lessons: 25,
          },
        ],

        learningOutcomes: [
          "Understand ICU environment, workflow, equipment and patient-safety principles.",
          "Perform structured critical-care patient assessment and clinical observation.",
          "Understand essential ICU monitoring parameters and recognise abnormal findings.",
          "Develop safe airway-care and mechanical-ventilation knowledge.",
          "Understand suctioning, ET-tube care and ventilator-related nursing responsibilities.",
          "Recognise common emergency situations, shock patterns and clinical deterioration.",
          "Understand emergency medication safety and critical-care priorities.",
          "Improve ICU documentation, handover and professional clinical communication.",
          "Develop stronger confidence in practical ICU nursing discussions and viva preparation.",
          "Build a structured foundation for continued critical-care professional learning.",
        ],

        practicalSkills: [
          "ICU patient assessment",
          "Vital-sign and bedside monitoring",
          "Neurological observation",
          "Airway and ET-tube care",
          "Suctioning principles",
          "Mechanical ventilation fundamentals",
          "Ventilator monitoring and alarm awareness",
          "Central-line care principles",
          "Arterial-line monitoring principles",
          "Emergency response principles",
          "Crash-cart and emergency preparedness",
          "Medication safety principles",
          "Infection-control practices",
          "Clinical documentation",
          "ICU handover and communication",
          "Critical-care team coordination",
        ],

        includes: [
          "120 structured premium lessons",
          "5 professional ICU learning modules",
          "Structured video-based learning pathway",
          "ICU nursing study and revision resources",
          "Airway and ventilator learning resources",
          "Emergency and critical-care learning",
          "Clinical case-oriented learning",
          "Practice assessments and quizzes",
          "Lesson and course progress tracking",
          "Structured learning milestones",
          "Professional course completion pathway",
          "Certificate eligibility after successful completion",
        ],
      }}
    />
  );
}