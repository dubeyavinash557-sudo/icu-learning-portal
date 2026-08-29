import CourseLandingPage from "../_components/CourseLandingPage";

export default function ICUTechnicianMasterPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ICU Technician Master Course",
        shortTitle: "ICU Technician Master",
        category: "Critical Care • ICU Technician",

        description:
          "A professional ICU technician learning pathway covering critical-care equipment, bedside monitoring, airway and ventilator support, emergency response, infection control and essential ICU workflows.",

        longDescription:
          "Designed for aspiring and working ICU technicians who want a structured understanding of critical-care environments, bedside equipment, monitoring support, emergency preparation and safe technical workflows. The course combines foundational concepts, practical workflow knowledge, equipment awareness and scenario-based learning to build confidence for ICU technician responsibilities, practical assessments and viva preparation.",

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
              "Build a strong foundation in ICU organization, critical-care workflow, technician responsibilities, professional communication, teamwork and patient-safety awareness.",
            lessons: 7,
          },
          {
            title: "ICU Equipment & Bedside Setup",
            description:
              "Understand common ICU equipment, bedside preparation, equipment identification, basic operating principles and safe support workflows.",
            lessons: 7,
          },
          {
            title: "Patient Monitoring Support",
            description:
              "Learn how ICU technicians support vital-sign, ECG, SpO₂ and bedside monitoring workflows while maintaining equipment readiness and observation standards.",
            lessons: 7,
          },
          {
            title: "Airway & Ventilator Support",
            description:
              "Understand airway equipment preparation, ventilator-area support, oxygen-delivery systems and the technician's role in assisting critical-care teams.",
            lessons: 8,
          },
          {
            title: "Emergency & Code Blue Support",
            description:
              "Develop structured knowledge of emergency preparation, crash-cart readiness, equipment support and multidisciplinary assistance during critical events.",
            lessons: 7,
          },
          {
            title: "Lines, Tubes & Drainage Systems",
            description:
              "Recognise common ICU lines, tubes, catheters and drainage systems and understand safe observation, positioning and escalation principles.",
            lessons: 7,
          },
          {
            title: "Infection Control & Patient Safety",
            description:
              "Apply essential infection-prevention concepts including hand hygiene, PPE, environmental safety, equipment cleaning and safe bedside practices.",
            lessons: 6,
          },
          {
            title: "ICU Technician Practical & Viva",
            description:
              "Revise equipment identification, ICU workflow scenarios, practical responsibilities, troubleshooting awareness and commonly tested viva concepts.",
            lessons: 7,
          },
        ],

        learningOutcomes: [
          "Understand the ICU environment, workflow and professional role of an ICU technician.",
          "Identify commonly used ICU equipment and understand their basic functions.",
          "Understand safe bedside equipment preparation and monitoring-support workflows.",
          "Develop foundational knowledge of airway, oxygen and ventilator-support equipment.",
          "Understand the technician's role during emergency and Code Blue situations.",
          "Recognise common ICU lines, tubes, catheters and drainage systems.",
          "Apply essential infection-control and patient-safety principles.",
          "Understand equipment readiness, observation and escalation responsibilities.",
          "Develop practical knowledge for ICU technician workplace responsibilities.",
          "Prepare effectively for ICU technician practical examinations, interviews and viva.",
        ],

        practicalSkills: [
          "ICU equipment identification",
          "Bedside equipment preparation",
          "Patient-monitoring setup support",
          "ECG and SpO₂ monitoring support",
          "Vital-sign monitoring assistance",
          "Airway equipment preparation",
          "Oxygen-delivery equipment support",
          "Ventilator-area preparation and support",
          "Emergency trolley and crash-cart readiness",
          "Code Blue equipment support",
          "Lines, tubes and drain observation",
          "Basic equipment safety checks",
          "Infection-control practices",
          "Equipment cleaning principles",
          "ICU documentation and communication",
          "ICU technician practical and viva preparation",
        ],

        includes: [
          "56 structured premium lessons",
          "Complete ICU technician curriculum",
          "ICU equipment identification resources",
          "Bedside setup and workflow learning",
          "Monitoring-support learning modules",
          "Airway and ventilator-support concepts",
          "Emergency and Code Blue preparation",
          "Lines, tubes and drainage-system revision",
          "Infection-control and patient-safety resources",
          "Practical ICU technician checklists",
          "Case-based learning and assessments",
          "Viva and interview preparation",
          "Learning progress tracking",
          "Structured course completion pathway",
          "Certificate eligibility after course completion",
          "Premium learner access through the LMS",
        ],
      }}
    />
  );
}