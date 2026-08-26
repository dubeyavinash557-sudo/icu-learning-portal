import CourseLandingPage from "../_components/CourseLandingPage";

export default function MechanicalVentilationPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Mechanical Ventilation Master Course",
        shortTitle: "Mechanical Ventilation",
        category: "Critical Care • Ventilator",
        description:
          "A comprehensive professional learning pathway covering mechanical ventilation fundamentals, ventilator modes, settings, alarms, airway management and ICU nursing responsibilities.",
        longDescription:
          "Build structured knowledge of invasive mechanical ventilation and develop a systematic approach to ventilator monitoring, troubleshooting and critical-care patient management.",
        instructor: "ICU Learning Portal Faculty",
        level: "Intermediate to Advanced",
        duration: "15+ Hours",
        lessons: 80,
        students: "2,100+",
        rating: 4.9,
        price: "₹2,999",
        originalPrice: "₹4,499",
        isPremium: true,
        accent: "cyan",

        modules: [
          {
            title: "Mechanical Ventilation Fundamentals",
            description:
              "Understand the purpose of mechanical ventilation, indications, respiratory support concepts and basic ventilator terminology.",
            lessons: 15,
          },
          {
            title: "Ventilator Modes",
            description:
              "Study commonly used ventilation modes including volume-controlled, pressure-controlled and support-based ventilation concepts.",
            lessons: 20,
          },
          {
            title: "Ventilator Settings & Monitoring",
            description:
              "Learn the clinical purpose of FiO₂, PEEP, tidal volume, respiratory rate, pressure limits and essential monitoring parameters.",
            lessons: 18,
          },
          {
            title: "Ventilator Alarms & Troubleshooting",
            description:
              "Develop a structured approach to common high-pressure, low-pressure, apnea and oxygen-related ventilator alarms.",
            lessons: 12,
          },
          {
            title: "Airway Care & ICU Nursing Practice",
            description:
              "Cover ET-tube care, suctioning principles, cuff management, airway safety, patient monitoring and ventilator-associated nursing responsibilities.",
            lessons: 15,
          },
        ],

        learningOutcomes: [
          "Understand the principles and objectives of mechanical ventilation.",
          "Identify common indications for invasive ventilatory support.",
          "Understand commonly used ventilator modes and their clinical purpose.",
          "Explain major ventilator settings and monitoring parameters.",
          "Understand the relationship between oxygenation and ventilation.",
          "Recognise common ventilator alarm patterns and their possible causes.",
          "Develop a systematic approach to basic ventilator troubleshooting.",
          "Understand essential ET-tube and airway-care responsibilities.",
          "Recognise important nursing observations during mechanical ventilation.",
          "Understand core principles for safe ICU ventilator management.",
        ],

        practicalSkills: [
          "Ventilator circuit and equipment awareness",
          "Basic ventilator setup principles",
          "Mode identification",
          "Ventilator setting interpretation",
          "FiO₂ and PEEP monitoring",
          "Tidal volume and respiratory-rate monitoring",
          "Peak and plateau pressure concepts",
          "Ventilator alarm assessment",
          "ET-tube care principles",
          "Closed and open suctioning principles",
          "Cuff-pressure awareness",
          "Patient-ventilator monitoring",
        ],

        includes: [
          "80 structured video lessons",
          "Mechanical ventilation learning modules",
          "Ventilator mode revision resources",
          "Ventilator settings and monitoring lessons",
          "Alarm and troubleshooting education",
          "Airway-care learning resources",
          "Clinical case-based learning",
          "Practice assessments and quizzes",
          "Learning progress tracking",
          "Course completion certificate pathway",
          "Premium learning access",
        ],
      }}
    />
  );
}