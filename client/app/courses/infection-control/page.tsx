import CourseLandingPage from "../_components/CourseLandingPage";

export default function InfectionControlPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Infection Control & Patient Safety Master Course",
        shortTitle: "Infection Control & Patient Safety",
        category: "Critical Care • Infection Prevention",
        description:
          "Learn systematic infection-prevention, isolation, hand hygiene, PPE, device-associated infection prevention and ICU patient-safety principles.",
        longDescription:
          "A premium patient-safety program focused on practical infection-control workflows and safer ICU care.",
        instructor: "ICU Learning Portal Faculty",
        level: "Beginner to Intermediate",
        duration: "8+ Hours",
        lessons: 40,
        students: "1,900+",
        rating: 4.8,
        price: "₹999",
        originalPrice: "₹1,499",
        isPremium: true,
        accent: "emerald",

        modules: [
          {
            title: "Infection Prevention Fundamentals",
            description:
              "Understand infection chains, standard precautions and the role of infection prevention in ICU care.",
            lessons: 5,
          },
          {
            title: "Hand Hygiene & PPE",
            description:
              "Learn hand-hygiene moments, PPE selection, donning and doffing concepts and safe practice.",
            lessons: 6,
          },
          {
            title: "Isolation Precautions",
            description:
              "Understand contact, droplet and airborne precautions and practical ICU implementation.",
            lessons: 5,
          },
          {
            title: "Device-Associated Infection Prevention",
            description:
              "Review prevention principles for common invasive devices and critical-care procedures.",
            lessons: 6,
          },
          {
            title: "Environmental & Equipment Safety",
            description:
              "Cleaning, disinfection, equipment handling and environmental safety concepts.",
            lessons: 5,
          },
          {
            title: "Medication & Patient Safety",
            description:
              "Patient identification, communication, medication safety and error-prevention principles.",
            lessons: 5,
          },
          {
            title: "Sepsis Awareness & Escalation",
            description:
              "Recognise infection-related deterioration and understand timely escalation principles.",
            lessons: 4,
          },
          {
            title: "Audit, Documentation & Case Practice",
            description:
              "Use checklists, documentation and case scenarios to reinforce safer ICU workflows.",
            lessons: 4,
          },
        ],

        learningOutcomes: [
          "Understand standard infection-prevention principles in critical care.",
          "Apply hand-hygiene and PPE concepts correctly.",
          "Differentiate major isolation-precaution approaches.",
          "Understand device-associated infection-prevention principles.",
          "Recognise key patient-safety and medication-safety practices.",
          "Use checklists and case scenarios for infection-control revision.",
        ],

        practicalSkills: [
          "Hand-hygiene technique awareness",
          "PPE selection and use",
          "Isolation-room workflow",
          "Equipment disinfection principles",
          "Device-care safety checks",
          "Patient identification",
          "Safety documentation",
          "Infection-control audit practice",
        ],

        includes: [
          "Structured premium video lessons",
          "Infection-control study notes",
          "Patient-safety checklists",
          "Case-based assessments",
          "Premium PDF study resources",
          "Progress tracking",
          "Course completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}
