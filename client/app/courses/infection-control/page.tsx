import CourseLandingPage from "../_components/CourseLandingPage";

export default function InfectionControlPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Infection Control & Patient Safety Master Course",
        shortTitle: "Infection Control & Patient Safety",
        category: "Critical Care • Infection Prevention",

        description:
          "Master essential infection-prevention and patient-safety principles for critical-care environments, including hand hygiene, PPE, isolation precautions, device-associated infection prevention, equipment safety and clinical documentation.",

        longDescription:
          "A structured premium learning pathway designed for nurses, ICU professionals, technicians and healthcare learners who want to build practical infection-control and patient-safety knowledge. The course combines foundational concepts, bedside safety workflows, prevention strategies, checklists and case-based practice to support safer critical-care delivery.",

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
              "Build a strong foundation in infection transmission, the chain of infection, standard precautions and the importance of infection prevention in critical-care environments.",
            lessons: 5,
          },
          {
            title: "Hand Hygiene & PPE",
            description:
              "Understand essential hand-hygiene principles, appropriate PPE selection, donning and doffing concepts and safe bedside infection-prevention practices.",
            lessons: 6,
          },
          {
            title: "Isolation Precautions",
            description:
              "Learn the principles of contact, droplet and airborne precautions and understand how isolation workflows support safer ICU patient care.",
            lessons: 5,
          },
          {
            title: "Device-Associated Infection Prevention",
            description:
              "Study prevention principles related to common invasive devices, critical-care procedures, device care and routine safety checks.",
            lessons: 6,
          },
          {
            title: "Environmental & Equipment Safety",
            description:
              "Understand cleaning, disinfection, equipment handling, environmental hygiene and safe management of shared ICU equipment.",
            lessons: 5,
          },
          {
            title: "Medication & Patient Safety",
            description:
              "Develop awareness of patient identification, communication, medication safety, error prevention and structured safety checks.",
            lessons: 5,
          },
          {
            title: "Sepsis Awareness & Escalation",
            description:
              "Recognise infection-related clinical deterioration and understand the importance of timely assessment, communication and escalation.",
            lessons: 4,
          },
          {
            title: "Audit, Documentation & Case Practice",
            description:
              "Apply infection-control principles through checklists, documentation exercises, audit concepts and structured ICU case scenarios.",
            lessons: 4,
          },
        ],

        learningOutcomes: [
          "Understand the fundamentals of infection prevention in critical-care environments.",
          "Explain the chain of infection and major routes of transmission.",
          "Apply essential hand-hygiene and PPE principles in clinical workflows.",
          "Understand the purpose and practical use of major isolation precautions.",
          "Recognise key principles for preventing device-associated infections.",
          "Understand safe cleaning, disinfection and equipment-handling practices.",
          "Apply important patient-identification and medication-safety principles.",
          "Recognise infection-related deterioration and understand escalation principles.",
          "Use structured checklists and documentation to support safer ICU practice.",
          "Apply infection-control and patient-safety concepts to case-based scenarios.",
        ],

        practicalSkills: [
          "Hand-hygiene practice awareness",
          "PPE selection and safe-use principles",
          "Donning and doffing workflow awareness",
          "Isolation-room workflow",
          "Standard-precaution implementation",
          "Equipment cleaning and disinfection principles",
          "Device-care safety checks",
          "Patient identification and safety verification",
          "Medication-safety awareness",
          "Infection-control documentation",
          "Safety checklist application",
          "Infection-control audit practice",
        ],

        includes: [
          "40 structured premium video lessons",
          "Complete infection-control curriculum",
          "Critical-care patient-safety modules",
          "Hand-hygiene and PPE learning resources",
          "Isolation precaution revision material",
          "Device-associated infection prevention resources",
          "Environmental and equipment safety guidance",
          "Patient-safety checklists",
          "Case-based learning and assessments",
          "Premium PDF study resources",
          "Progress tracking through the LMS",
          "Structured course completion pathway",
          "Certificate eligibility after course completion",
        ],
      }}
    />
  );
}