import CourseLandingPage from "../_components/CourseLandingPage";

export default function MechanicalVentilationPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Mechanical Ventilation Master Course",
        shortTitle: "Mechanical Ventilation",
        category: "Critical Care • Mechanical Ventilation",

        description:
          "A professional mechanical ventilation learning pathway covering ventilator fundamentals, modes, settings, monitoring, alarms, troubleshooting, airway care and essential ICU nursing responsibilities.",

        longDescription:
          "Designed for nurses, ICU professionals and serious critical-care learners who want a structured understanding of invasive mechanical ventilation. The course progresses from ventilation fundamentals to commonly used modes, ventilator settings, patient monitoring, alarm recognition, troubleshooting and airway-care responsibilities. It combines conceptual learning with practical ICU scenarios to support clinical understanding, revision and professional assessment preparation.",

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
              "Build a strong foundation in respiratory failure, indications for mechanical ventilation, ventilation objectives, basic terminology and the role of ventilatory support in critical care.",
            lessons: 15,
          },
          {
            title: "Ventilator Modes",
            description:
              "Understand commonly used volume-controlled, pressure-controlled and support-based ventilation modes, including their fundamental operating principles and clinical applications.",
            lessons: 20,
          },
          {
            title: "Ventilator Settings & Monitoring",
            description:
              "Learn the clinical purpose of FiO₂, PEEP, tidal volume, respiratory rate, pressure limits and essential patient-ventilator monitoring parameters.",
            lessons: 18,
          },
          {
            title: "Ventilator Alarms & Troubleshooting",
            description:
              "Develop a structured approach to high-pressure, low-pressure, apnea and oxygen-related alarms, including patient assessment, equipment verification and appropriate escalation.",
            lessons: 12,
          },
          {
            title: "Airway Care & ICU Nursing Practice",
            description:
              "Cover ET-tube care, suctioning principles, cuff management, airway safety, patient monitoring and essential nursing responsibilities during mechanical ventilation.",
            lessons: 15,
          },
        ],

        learningOutcomes: [
          "Understand the fundamental principles and objectives of mechanical ventilation.",
          "Identify common clinical situations in which invasive ventilatory support may be required.",
          "Understand commonly used ventilator modes and their basic clinical purpose.",
          "Explain major ventilator settings including FiO₂, PEEP, tidal volume and respiratory rate.",
          "Understand essential patient and ventilator monitoring parameters.",
          "Understand the basic relationship between oxygenation and ventilation.",
          "Recognise common ventilator alarm patterns and possible contributing causes.",
          "Apply a structured approach to basic ventilator alarm assessment and troubleshooting.",
          "Understand essential ET-tube, airway and suctioning-care principles.",
          "Recognise important nursing observations and safety responsibilities during mechanical ventilation.",
          "Interpret basic ventilator information in structured ICU case scenarios.",
          "Build a stronger foundation for ventilator-related interviews, viva and professional assessments.",
        ],

        practicalSkills: [
          "Ventilator equipment identification",
          "Ventilator circuit awareness",
          "Basic ventilator setup principles",
          "Mode identification",
          "Ventilator setting interpretation",
          "FiO₂ monitoring",
          "PEEP monitoring",
          "Tidal-volume monitoring",
          "Respiratory-rate monitoring",
          "Peak-pressure concepts",
          "Plateau-pressure concepts",
          "Patient-ventilator monitoring",
          "Ventilator alarm assessment",
          "Basic alarm troubleshooting principles",
          "ET-tube care principles",
          "Suctioning principles",
          "Cuff-pressure awareness",
          "Airway safety and escalation",
        ],

        includes: [
          "80 structured premium lessons",
          "Complete mechanical ventilation curriculum",
          "Ventilator mode learning and revision",
          "Ventilator settings and monitoring lessons",
          "Alarm recognition and troubleshooting education",
          "Airway and ET-tube care resources",
          "ICU nursing responsibilities during ventilation",
          "Clinical case-based learning",
          "Ventilator revision notes",
          "Practical learning resources",
          "Practice assessments and quizzes",
          "Interview and viva preparation",
          "Learning progress tracking",
          "Structured course completion pathway",
          "Certificate eligibility after course completion",
          "Premium learner access through the LMS",
        ],
      }}
    />
  );
}