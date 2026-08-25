import CourseLandingPage from "../_components/CourseLandingPage";

export default function ECGPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ECG Interpretation Master Course",
        shortTitle: "ECG Interpretation",
        category: "Critical Care • Cardiac",

        description:
          "A structured premium ECG learning program covering 12-lead ECG fundamentals, waveform analysis, intervals, rhythm interpretation and clinically important emergency ECG patterns.",

        longDescription:
          "Designed as a professional critical-care learning pathway for healthcare learners who want to develop a systematic approach to ECG interpretation, cardiac rhythm recognition and emergency cardiac assessment.",

        instructor: "ICU Learning Portal Faculty",

        level: "Intermediate",

        duration: "10+ Hours",

        lessons: 45,

        students: "1,500+",

        rating: 4.9,

        price: "₹2,499",

        originalPrice: "₹3,499",

        // All courses are premium.
        isPremium: true,

        accent: "blue",

        modules: [
          {
            title: "ECG Fundamentals & 12-Lead Basics",
            description:
              "Learn ECG equipment, ECG paper, calibration, standard leads, electrode placement and the principles of accurate 12-lead ECG recording.",
            lessons: 8,
          },

          {
            title: "Waveforms, Intervals & ECG Measurements",
            description:
              "Understand P waves, PR interval, QRS complex, QT interval, ST segment and T waves with a structured measurement approach.",
            lessons: 10,
          },

          {
            title: "Cardiac Rhythm Interpretation",
            description:
              "Develop a systematic method for assessing rate, rhythm, P waves, conduction and QRS morphology while recognising common cardiac rhythms.",
            lessons: 15,
          },

          {
            title: "Emergency ECG Recognition",
            description:
              "Study important emergency ECG patterns and recognition principles for clinically significant rhythm and ST-segment abnormalities.",
            lessons: 12,
          },
        ],

        learningOutcomes: [
          "Understand professional ECG recording fundamentals.",
          "Apply correct 12-lead ECG electrode-placement principles.",
          "Identify normal ECG waves, intervals and segment characteristics.",
          "Calculate heart rate using standard ECG methods.",
          "Assess rhythm regularity and cardiac rate systematically.",
          "Recognise common cardiac arrhythmias and conduction abnormalities.",
          "Understand clinically important ST-segment and T-wave changes.",
          "Develop a structured step-by-step ECG interpretation workflow.",
          "Differentiate important normal and abnormal ECG patterns.",
          "Apply ECG interpretation principles to clinical examples and case-based learning.",
        ],

        practicalSkills: [
          "12-lead ECG recording principles",
          "Electrode placement and lead identification",
          "ECG paper and calibration assessment",
          "Heart-rate calculation",
          "Rhythm regularity assessment",
          "P-wave and QRS analysis",
          "PR and QT interval assessment",
          "ST-segment evaluation",
          "Arrhythmia recognition",
          "Emergency ECG pattern recognition",
          "Systematic ECG interpretation",
          "Case-based ECG practice",
        ],

        includes: [
          "45 structured ECG lessons",
          "Premium ECG video learning modules",
          "Professional ECG interpretation notes",
          "12-lead ECG learning resources",
          "Rhythm recognition practice",
          "Clinical ECG examples",
          "Case-based learning exercises",
          "Knowledge assessments and quizzes",
          "Learning progress tracking",
          "Structured course completion pathway",
          "Certificate eligibility after completion",
          "Premium learning access through ICU Learning Portal",
        ],
      }}
    />
  );
}