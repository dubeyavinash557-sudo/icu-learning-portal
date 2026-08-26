import CourseLandingPage from "../_components/CourseLandingPage";

export default function AirwayManagementPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Airway Management & Intubation Master Course",
        shortTitle: "Airway Management & Intubation",
        category: "Critical Care • Airway",
        description:
          "Learn structured airway assessment, oxygenation, airway equipment, intubation assistance, tube care and post-intubation monitoring.",
        longDescription:
          "A premium airway-management program focused on safe, systematic ICU airway knowledge for nurses, technicians and critical-care learners.",
        instructor: "ICU Learning Portal Faculty",
        level: "Intermediate",
        duration: "10+ Hours",
        lessons: 46,
        students: "2,800+",
        rating: 4.9,
        price: "₹1,599",
        originalPrice: "₹2,199",
        isPremium: true,
        accent: "blue",

        modules: [
          {
            title: "Airway Assessment Fundamentals",
            description:
              "Recognise airway risk, assess breathing and understand the priorities of initial airway management.",
            lessons: 6,
          },
          {
            title: "Airway Equipment & Preparation",
            description:
              "Identify essential airway equipment and organise a safe preparation sequence.",
            lessons: 6,
          },
          {
            title: "Oxygen Therapy & Preoxygenation",
            description:
              "Understand oxygen-delivery devices, preoxygenation concepts and respiratory monitoring.",
            lessons: 5,
          },
          {
            title: "Endotracheal Intubation Assistance",
            description:
              "Learn the nursing and technician role before, during and immediately after intubation.",
            lessons: 8,
          },
          {
            title: "ET Tube & Cuff Care",
            description:
              "Tube-position checks, fixation, cuff-care concepts, oral care and airway safety.",
            lessons: 6,
          },
          {
            title: "Ventilator Connection & Initial Monitoring",
            description:
              "Understand post-intubation connection, respiratory observations, alarms and documentation.",
            lessons: 5,
          },
          {
            title: "Difficult Airway & Emergency Scenarios",
            description:
              "Structured recognition of airway problems and escalation priorities in emergency situations.",
            lessons: 5,
          },
          {
            title: "Airway Case-Based Revision",
            description:
              "Practice airway assessment, intubation-support and post-intubation clinical scenarios.",
            lessons: 5,
          },
        ],

        learningOutcomes: [
          "Perform a structured airway and breathing assessment.",
          "Identify essential airway equipment and preparation requirements.",
          "Understand preoxygenation and oxygen-delivery concepts.",
          "Describe safe nursing and technician support during intubation.",
          "Understand endotracheal tube care and post-intubation monitoring.",
          "Recognise airway emergencies and appropriate escalation priorities.",
        ],

        practicalSkills: [
          "Airway assessment",
          "Airway equipment preparation",
          "Oxygen-delivery setup",
          "Intubation assistance",
          "ET tube fixation and care",
          "Cuff-pressure monitoring concepts",
          "Post-intubation assessment",
          "Airway emergency case practice",
        ],

        includes: [
          "Structured premium video lessons",
          "Airway management study notes",
          "Intubation checklists",
          "Case-based assessments",
          "Premium PDF study resources",
          "Learning progress tracking",
          "Course completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}
