import CourseLandingPage from "../_components/CourseLandingPage";

export default function ABGPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ABG Analysis Master Course",

        shortTitle: "ABG Analysis",

        category: "Critical Care • ABG & Acid–Base",

        description:
          "Master arterial blood gas analysis through a structured professional learning pathway covering acid–base balance, oxygenation, ventilation, compensation and ICU-focused clinical interpretation.",

        longDescription:
          "A premium, step-by-step ABG learning program designed for healthcare learners who want a systematic approach to interpreting arterial blood gas reports and applying acid–base concepts to critical-care cases.",

        instructor: "ICU Learning Portal Faculty",

        level: "Intermediate to Advanced",

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
              "Understand ABG indications, arterial sampling principles, normal values, report components and the clinical purpose of arterial blood gas testing.",

            lessons: 8,
          },

          {
            title: "Acid–Base Balance",

            description:
              "Build a strong foundation in pH, PaCO₂, HCO₃⁻, bicarbonate buffering and the physiological principles behind acid–base disorders.",

            lessons: 10,
          },

          {
            title: "Step-by-Step ABG Interpretation",

            description:
              "Learn a structured method for analysing pH, respiratory status, metabolic status, compensation and oxygenation without relying on guesswork.",

            lessons: 12,
          },

          {
            title: "Clinical ABG Case Practice",

            description:
              "Apply the interpretation framework to ICU-oriented clinical scenarios and develop confidence in identifying common acid–base patterns.",

            lessons: 10,
          },
        ],

        learningOutcomes: [
          "Understand normal arterial blood gas parameters and their clinical significance.",
          "Explain the relationship between pH, PaCO₂ and HCO₃⁻ in acid–base physiology.",
          "Interpret arterial blood gas reports using a systematic step-by-step framework.",
          "Differentiate respiratory and metabolic acid–base disorders.",
          "Recognise expected and abnormal compensation patterns.",
          "Assess oxygenation and ventilation from ABG findings.",
          "Identify clinically important acid–base abnormalities in critical-care scenarios.",
          "Apply ABG interpretation principles to structured ICU case studies.",
          "Improve clinical reasoning when reviewing abnormal ABG reports.",
          "Develop examination, viva and interview-oriented ABG interpretation confidence.",
        ],

        practicalSkills: [
          "ABG indications and clinical assessment",
          "Arterial blood sample collection principles",
          "Radial artery assessment",
          "Allen's test principles",
          "ABG sample handling and common pre-analytical considerations",
          "Normal ABG parameter recognition",
          "pH interpretation",
          "PaCO₂ interpretation",
          "HCO₃⁻ interpretation",
          "Oxygenation assessment",
          "Ventilation assessment",
          "Respiratory disorder identification",
          "Metabolic disorder identification",
          "Compensation assessment",
          "Mixed acid–base disorder recognition",
          "Step-by-step ABG case interpretation",
        ],

        includes: [
          "40 structured ABG lessons",
          "Step-by-step ABG interpretation framework",
          "Acid–base balance learning modules",
          "Oxygenation and ventilation concepts",
          "ICU-focused clinical case practice",
          "ABG revision resources",
          "Practice assessments and knowledge checks",
          "Learning progress tracking",
          "Premium course access",
          "Structured course completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}