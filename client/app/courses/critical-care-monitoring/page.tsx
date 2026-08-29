import CourseLandingPage from "../_components/CourseLandingPage";

export default function CriticalCareMonitoringPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Critical Care Monitoring Master Course",
        shortTitle: "Critical Care Monitoring",
        category: "Critical Care • Monitoring",
        description:
          "Build strong ICU monitoring knowledge covering vital signs, ECG, SpO₂, invasive monitoring, neurological assessment and clinical observation.",
        longDescription:
          "A premium monitoring pathway designed to help ICU learners understand bedside assessment, monitoring trends, alarms and structured clinical documentation.",
        instructor: "ICU Learning Portal Faculty",
        level: "Intermediate",
        duration: "9+ Hours",
        lessons: 44,
        students: "2,100+",
        rating: 4.9,
        price: "₹1,299",
        originalPrice: "₹1,799",
        isPremium: true,
        accent: "cyan",

        modules: [
          {
            title: "ICU Monitoring Fundamentals",
            description:
              "Monitoring goals, patient assessment, equipment basics and systematic bedside observation.",
            lessons: 6,
          },
          {
            title: "Vital Signs & Hemodynamic Trends",
            description:
              "Interpret temperature, pulse, blood pressure, respiratory rate and changing clinical trends.",
            lessons: 6,
          },
          {
            title: "ECG & Cardiac Monitoring",
            description:
              "Cardiac rhythm monitoring, basic ECG concepts, alarm awareness and rhythm-focused observation.",
            lessons: 6,
          },
          {
            title: "Oxygenation & Respiratory Monitoring",
            description:
              "SpO₂, respiratory assessment, oxygen therapy monitoring and ventilation-related observations.",
            lessons: 6,
          },
          {
            title: "Invasive Hemodynamic Monitoring",
            description:
              "Foundational concepts for arterial pressure monitoring, central venous pressure and waveform observation.",
            lessons: 6,
          },
          {
            title: "Neurological Monitoring",
            description:
              "Level of consciousness, pupil assessment, neurological observations and trend documentation.",
            lessons: 5,
          },
          {
            title: "ICU Alarms & Troubleshooting",
            description:
              "Understand common monitoring alarms, verification steps and safe escalation principles.",
            lessons: 5,
          },
          {
            title: "Case-Based Monitoring Practice",
            description:
              "Apply monitoring concepts to structured ICU scenarios and trend-based questions.",
            lessons: 4,
          },
        ],

        learningOutcomes: [
          "Understand the purpose and limitations of common ICU monitoring systems.",
          "Perform structured bedside observation and vital-sign assessment.",
          "Recognise important ECG and oxygenation monitoring concepts.",
          "Understand basic invasive pressure and hemodynamic monitoring.",
          "Identify clinically significant monitoring trends and alarms.",
          "Apply monitoring knowledge to case-based ICU scenarios.",
        ],

        practicalSkills: [
          "Vital-sign assessment",
          "ECG and rhythm observation",
          "SpO₂ monitoring",
          "Arterial-line monitoring concepts",
          "CVP monitoring concepts",
          "Neurological assessment",
          "Alarm verification and escalation",
          "Trend documentation and case review",
        ],

        includes: [
          "Structured premium video lessons",
          "Critical care monitoring notes",
          "Monitoring checklists",
          "Case-based assessments",
          "Premium study resources",
          "Progress tracking",
          "Completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}