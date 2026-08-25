import CourseLandingPage from "../_components/CourseLandingPage";

export default function VentilatorPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Mechanical Ventilation Master Course",
        shortTitle: "Mechanical Ventilation",
        category: "Critical Care • Ventilator",
        description:
          "Learn mechanical ventilation from fundamentals to advanced concepts including modes, settings, alarms, airway care, monitoring and weaning.",
        longDescription:
          "A structured ventilator learning pathway designed to build conceptual understanding and practical ICU nursing knowledge.",
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
              "Understand indications, ventilator components and the basic principles of positive-pressure ventilation.",
            lessons: 15,
          },
          {
            title: "Ventilator Modes",
            description:
              "Study common volume-controlled, pressure-controlled and spontaneous ventilation modes.",
            lessons: 20,
          },
          {
            title: "Ventilator Settings",
            description:
              "Understand tidal volume, respiratory rate, FiO₂, PEEP, I:E ratio and other key parameters.",
            lessons: 18,
          },
          {
            title: "Alarms & Troubleshooting",
            description:
              "Develop a structured approach to common ventilator alarms and clinical assessment.",
            lessons: 12,
          },
          {
            title: "Airway Care & Weaning",
            description:
              "Learn airway-care principles, monitoring, suctioning and concepts related to ventilator weaning.",
            lessons: 15,
          },
        ],

        learningOutcomes: [
          "Understand the principles of mechanical ventilation.",
          "Identify common indications for ventilatory support.",
          "Understand commonly used ventilator modes.",
          "Explain important ventilator settings.",
          "Understand FiO₂, PEEP and tidal-volume concepts.",
          "Develop a systematic ventilator-alarm assessment approach.",
          "Understand airway and ET-tube care principles.",
          "Understand basic ventilator weaning concepts.",
        ],

        practicalSkills: [
          "Ventilator setup concepts",
          "Mode identification",
          "Ventilator-setting interpretation",
          "Alarm assessment",
          "Airway monitoring",
          "ET-tube care principles",
          "Suctioning principles",
          "Humidification and filter care",
          "Patient–ventilator assessment",
          "Weaning readiness concepts",
        ],

        includes: [
          "80 structured lessons",
          "Mechanical ventilation modules",
          "Ventilator mode revision",
          "Setting and alarm learning",
          "Airway-care resources",
          "Clinical case-based learning",
          "Practice assessments",
          "Progress tracking",
          "Completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}