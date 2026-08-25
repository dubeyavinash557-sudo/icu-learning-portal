import CourseLandingPage from "../_components/CourseLandingPage";

export default function VentilatorPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Mechanical Ventilation Master Course",
        shortTitle: "Mechanical Ventilation",
        category: "Critical Care • Mechanical Ventilation",

        description:
          "Master mechanical ventilation from fundamentals to advanced ICU concepts through a structured professional learning pathway covering ventilator modes, settings, alarms, airway care, monitoring and weaning.",

        longDescription:
          "A premium ICU learning program designed for nurses, healthcare learners and critical-care professionals who want a structured understanding of mechanical ventilation, ventilator assessment and patient-focused respiratory care.",

        instructor: "ICU Learning Portal Faculty",

        level: "Beginner to Advanced",
        duration: "16+ Hours",
        lessons: 80,
        students: "2,400+",
        rating: 4.9,

        price: "₹3,499",
        originalPrice: "₹4,999",

        isPremium: true,
        accent: "emerald",

        modules: [
          {
            title: "Mechanical Ventilation Fundamentals",
            description:
              "Understand the purpose of mechanical ventilation, indications for ventilatory support, ventilator components, respiratory mechanics and the core principles of positive-pressure ventilation.",
            lessons: 15,
          },

          {
            title: "Ventilator Modes",
            description:
              "Learn commonly used volume-controlled, pressure-controlled and spontaneous ventilation modes with practical comparisons, indications and important mode-related concepts.",
            lessons: 20,
          },

          {
            title: "Ventilator Settings",
            description:
              "Build a strong understanding of tidal volume, respiratory rate, FiO₂, PEEP, inspiratory time, I:E ratio and other essential ventilator parameters used during ICU care.",
            lessons: 18,
          },

          {
            title: "Ventilator Alarms & Troubleshooting",
            description:
              "Develop a systematic patient-first approach to high-pressure, low-pressure, apnea and other common ventilator alarms while understanding basic troubleshooting principles.",
            lessons: 12,
          },

          {
            title: "Airway Care, Monitoring & Weaning",
            description:
              "Study airway-care principles, ET-tube monitoring, suctioning, humidification, patient–ventilator assessment and foundational concepts of ventilator weaning and readiness assessment.",
            lessons: 15,
          },
        ],

        learningOutcomes: [
          "Understand the principles and clinical purpose of mechanical ventilation.",
          "Identify common indications for invasive and supportive ventilation.",
          "Understand commonly used volume-controlled ventilation concepts.",
          "Understand commonly used pressure-controlled ventilation concepts.",
          "Recognise important spontaneous and supported ventilation concepts.",
          "Interpret essential ventilator settings and displayed parameters.",
          "Understand FiO₂, PEEP, tidal volume and respiratory-rate concepts.",
          "Understand inspiratory time and I:E ratio fundamentals.",
          "Develop a structured approach to ventilator alarm assessment.",
          "Recognise important patient–ventilator interaction concepts.",
          "Understand airway and ET-tube care principles.",
          "Understand suctioning and humidification principles.",
          "Build foundational knowledge of ventilator weaning and readiness assessment.",
          "Improve ICU ventilator documentation and communication awareness.",
        ],

        practicalSkills: [
          "Mechanical ventilator setup concepts",
          "Ventilator mode identification",
          "Ventilator parameter interpretation",
          "Tidal-volume understanding",
          "Respiratory-rate assessment",
          "FiO₂ interpretation",
          "PEEP understanding",
          "Inspiratory-time and I:E concepts",
          "Alarm assessment and troubleshooting",
          "Patient–ventilator assessment",
          "Airway and ET-tube care principles",
          "Suctioning principles",
          "Humidification and filter care",
          "Ventilator monitoring principles",
          "Weaning readiness concepts",
          "ICU ventilator documentation principles",
        ],

        includes: [
          "80 structured premium lessons",
          "Complete mechanical ventilation curriculum",
          "Ventilator fundamentals and ICU concepts",
          "Ventilator mode learning and revision",
          "Ventilator settings and parameter interpretation",
          "Alarm management and troubleshooting concepts",
          "Airway-care learning resources",
          "Patient–ventilator assessment concepts",
          "Clinical case-based learning",
          "Practice assessments and quizzes",
          "Lesson-by-lesson learning structure",
          "Learning progress tracking",
          "Course completion pathway",
          "Certificate eligibility after completion",
          "Premium LMS learning access",
        ],
      }}
    />
  );
}