import CourseLandingPage from "../_components/CourseLandingPage";

export default function ECGPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ECG Interpretation Master Course",
        shortTitle: "ECG Interpretation",
        category: "Critical Care • Cardiac",
        description:
          "Build a systematic approach to ECG interpretation, rhythm recognition and emergency cardiac assessment for critical-care learning.",
        longDescription:
          "Learn ECG fundamentals, cardiac rhythms, intervals, waveform interpretation and clinically important emergency patterns.",
        instructor: "ICU Learning Portal Faculty",
        level: "Intermediate",
        duration: "10+ Hours",
        lessons: 45,
        students: "1,500+",
        rating: 4.9,
        price: "₹2,499",
        originalPrice: "₹3,499",
        isPremium: true,
        accent: "blue",

        modules: [
          {
            title: "ECG Fundamentals",
            description:
              "Understand ECG equipment, paper, calibration, leads and recording principles.",
            lessons: 8,
          },
          {
            title: "Waveforms & Intervals",
            description:
              "Study P wave, PR interval, QRS complex, ST segment and T wave.",
            lessons: 10,
          },
          {
            title: "Rhythm Interpretation",
            description:
              "Develop a structured method for identifying common cardiac rhythms.",
            lessons: 15,
          },
          {
            title: "Emergency ECG Recognition",
            description:
              "Review clinically important emergency patterns and critical rhythm recognition.",
            lessons: 12,
          },
        ],

        learningOutcomes: [
          "Understand ECG recording fundamentals.",
          "Identify normal ECG waves and intervals.",
          "Calculate heart rate using common methods.",
          "Analyse rhythm regularity and cardiac rate.",
          "Recognise common arrhythmias.",
          "Understand clinically important ST-segment changes.",
          "Build a systematic ECG interpretation approach.",
          "Practise ECG interpretation through clinical examples.",
        ],

        practicalSkills: [
          "12-lead ECG recording principles",
          "Electrode placement",
          "Heart-rate calculation",
          "Rhythm analysis",
          "Waveform identification",
          "Interval assessment",
          "Arrhythmia recognition",
          "Emergency ECG pattern recognition",
        ],

        includes: [
          "Structured ECG video lessons",
          "ECG interpretation notes",
          "Rhythm practice",
          "Clinical examples",
          "Knowledge assessments",
          "Progress tracking",
          "Completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}