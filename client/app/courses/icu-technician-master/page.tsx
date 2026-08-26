import CourseLandingPage from "../_components/CourseLandingPage";

export default function ICUTechnicianMasterPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ICU Technician Master Course",
        shortTitle: "ICU Technician Master",
        category: "Critical Care • ICU Technician",
        description:
          "Develop professional ICU technician knowledge covering equipment, patient monitoring, emergency support, airway assistance and critical-care workflows.",
        longDescription:
          "A premium practical pathway for learners preparing for ICU technician responsibilities, bedside support and critical-care technical workflows.",
        instructor: "ICU Learning Portal Faculty",
        level: "Beginner to Intermediate",
        duration: "12+ Hours",
        lessons: 56,
        students: "3,200+",
        rating: 4.9,
        price: "₹1,799",
        originalPrice: "₹2,499",
        isPremium: true,
        accent: "violet",

        modules: [
          {
            title: "ICU Environment & Technician Role",
            description:
              "Understand ICU layout, workflow, responsibilities, communication and professional conduct.",
            lessons: 7,
          },
          {
            title: "ICU Equipment & Bedside Setup",
            description:
              "Learn the purpose and safe handling principles of common ICU bedside equipment.",
            lessons: 7,
          },
          {
            title: "Patient Monitoring Support",
            description:
              "Support vital-sign, ECG, SpO₂ and bedside monitoring workflows.",
            lessons: 7,
          },
          {
            title: "Airway & Ventilator Support",
            description:
              "Understand equipment preparation, ventilator-area support and airway-care assistance.",
            lessons: 8,
          },
          {
            title: "Emergency & Code Blue Support",
            description:
              "Prepare equipment and support the multidisciplinary team during emergency situations.",
            lessons: 7,
          },
          {
            title: "Lines, Tubes & Drainage Systems",
            description:
              "Recognise common ICU lines, tubes, drains and safe observation requirements.",
            lessons: 7,
          },
          {
            title: "Infection Control & Patient Safety",
            description:
              "Apply hand hygiene, PPE, environmental safety and equipment-cleaning principles.",
            lessons: 6,
          },
          {
            title: "ICU Technician Practical & Viva",
            description:
              "Practice equipment identification, scenario questions, viva preparation and workflow revision.",
            lessons: 7,
          },
        ],

        learningOutcomes: [
          "Understand the role and workflow of an ICU technician.",
          "Identify common ICU equipment and their basic functions.",
          "Support bedside monitoring and critical-care procedures safely.",
          "Understand airway, ventilator and emergency-support workflows.",
          "Recognise common ICU lines, tubes and drainage systems.",
          "Prepare for ICU technician practical assessments and viva questions.",
        ],

        practicalSkills: [
          "ICU equipment identification",
          "Bedside equipment preparation",
          "Monitoring setup support",
          "Airway and ventilator support",
          "Emergency trolley preparation",
          "Lines and drain observation",
          "Infection-control practices",
          "ICU technician viva preparation",
        ],

        includes: [
          "Structured premium video lessons",
          "ICU technician study notes",
          "Equipment identification resources",
          "Practical checklists",
          "Premium assessments and quizzes",
          "Learning progress tracking",
          "Completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}
