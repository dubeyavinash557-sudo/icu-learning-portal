import CourseLandingPage from "../_components/CourseLandingPage";

export default function ABGPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ABG Analysis Master Course",
        shortTitle: "ABG Analysis",
        category: "Critical Care • ABG",
        description:
          "Learn arterial blood gas analysis from fundamentals to advanced clinical interpretation with a structured critical-care learning pathway.",
        longDescription:
          "Build a systematic understanding of acid-base balance, oxygenation, ventilation and clinical ABG interpretation.",
        instructor: "ICU Learning Portal Faculty",
        level: "Intermediate",
        duration: "8+ Hours",
        lessons: 40,
        students: "1,200+",
        rating: 4.9,
        price: "₹1,999",
        originalPrice: "₹2,999",
        isPremium: true,
        accent: "cyan",

        modules: [
          {
            title: "ABG Fundamentals",
            description:
              "ABG indications, sample collection, normal values and core concepts.",
            lessons: 8,
          },
          {
            title: "Acid–Base Balance",
            description:
              "Understand pH, bicarbonate, PaCO₂ and the physiological basis of acid-base disorders.",
            lessons: 10,
          },
          {
            title: "ABG Interpretation",
            description:
              "Follow a structured step-by-step approach for interpreting ABG reports.",
            lessons: 12,
          },
          {
            title: "Clinical ABG Cases",
            description:
              "Apply interpretation principles to ICU-oriented clinical case scenarios.",
            lessons: 10,
          },
        ],

        learningOutcomes: [
          "Understand normal arterial blood gas parameters.",
          "Explain respiratory and metabolic acid-base disorders.",
          "Interpret pH, PaCO₂, HCO₃⁻ and oxygenation systematically.",
          "Differentiate respiratory and metabolic compensation patterns.",
          "Recognise clinically important acid-base abnormalities.",
          "Apply ABG interpretation to structured clinical cases.",
        ],

        practicalSkills: [
          "ABG sample collection principles",
          "Radial artery assessment and Allen's test",
          "ABG report interpretation",
          "Oxygenation assessment",
          "Ventilation assessment",
          "Acid-base disorder identification",
          "Compensation assessment",
          "Case-based ABG practice",
        ],

        includes: [
          "Structured video lessons",
          "ABG study notes",
          "Clinical case-based learning",
          "Practice assessments",
          "Learning progress tracking",
          "Course completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}