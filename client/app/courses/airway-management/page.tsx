import CourseLandingPage from "../_components/CourseLandingPage";

export default function AirwayManagementPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Airway Management & Intubation Master Course",
        shortTitle: "Airway Management & Intubation",

        category: "Critical Care • Airway",

        description:
          "Develop structured knowledge of airway assessment, oxygenation, airway equipment, intubation assistance, endotracheal tube care and post-intubation monitoring for professional ICU practice.",

        longDescription:
          "A premium, structured airway-management learning pathway for nurses, ICU technicians and critical-care learners. The course progresses from airway assessment and equipment preparation to oxygenation, intubation assistance, endotracheal tube care, post-intubation monitoring and emergency airway scenarios. Learning is organised around practical bedside concepts, structured revision and case-based application.",

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
              "Build a systematic approach to airway and breathing assessment, identify potential airway risks and understand the priorities of initial airway management.",
            lessons: 6,
          },
          {
            title: "Airway Equipment & Preparation",
            description:
              "Identify essential airway equipment, understand equipment readiness and follow a structured preparation sequence before airway intervention.",
            lessons: 6,
          },
          {
            title: "Oxygen Therapy & Preoxygenation",
            description:
              "Understand common oxygen-delivery concepts, preoxygenation principles, respiratory observations and the importance of monitoring oxygenation.",
            lessons: 5,
          },
          {
            title: "Endotracheal Intubation Assistance",
            description:
              "Understand the nursing and technician responsibilities before, during and immediately after endotracheal intubation within a multidisciplinary ICU team.",
            lessons: 8,
          },
          {
            title: "ET Tube & Cuff Care",
            description:
              "Learn structured endotracheal tube observation, fixation, position checks, cuff-care concepts, oral care and airway-safety practices.",
            lessons: 6,
          },
          {
            title: "Ventilator Connection & Initial Monitoring",
            description:
              "Understand post-intubation ventilator connection, respiratory assessment, monitoring observations, alarm awareness and clinical documentation.",
            lessons: 5,
          },
          {
            title: "Difficult Airway & Emergency Scenarios",
            description:
              "Develop structured recognition of airway problems and understand immediate escalation priorities during challenging or deteriorating airway situations.",
            lessons: 5,
          },
          {
            title: "Airway Case-Based Revision",
            description:
              "Reinforce airway assessment, equipment preparation, intubation support and post-intubation monitoring through structured ICU case scenarios.",
            lessons: 5,
          },
        ],

        learningOutcomes: [
          "Perform a structured airway and breathing assessment.",
          "Recognise important airway-risk indicators and escalation priorities.",
          "Identify essential airway equipment and understand preparation requirements.",
          "Understand oxygen-delivery and preoxygenation concepts.",
          "Describe the nursing and technician role during endotracheal intubation support.",
          "Understand essential endotracheal tube observation, fixation and care principles.",
          "Understand cuff-care and post-intubation airway-safety concepts.",
          "Understand initial ventilator connection and respiratory monitoring after intubation.",
          "Recognise common airway problems and understand appropriate escalation priorities.",
          "Apply airway-management knowledge to structured ICU case scenarios.",
        ],

        practicalSkills: [
          "Structured airway assessment",
          "Breathing assessment",
          "Airway equipment identification",
          "Airway equipment preparation",
          "Oxygen-delivery setup awareness",
          "Preoxygenation principles",
          "Intubation assistance",
          "ET tube position and fixation checks",
          "ET tube and oral-care principles",
          "Cuff-pressure monitoring concepts",
          "Post-intubation assessment",
          "Ventilator connection awareness",
          "Airway alarm awareness",
          "Airway emergency escalation",
          "Case-based airway practice",
        ],

        includes: [
          "46 structured premium lessons",
          "Airway management learning modules",
          "Intubation-support learning resources",
          "Airway assessment revision notes",
          "Airway equipment checklists",
          "ET tube and cuff-care resources",
          "Oxygenation and preoxygenation revision",
          "Post-intubation monitoring guidance",
          "Case-based assessments",
          "Premium PDF study resources",
          "Learning progress tracking",
          "Structured course completion pathway",
          "Certificate eligibility after course completion",
          "Premium learner access through the LMS",
        ],
      }}
    />
  );
}