import CourseLandingPage from "../_components/CourseLandingPage";

export default function MedicalCodingPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Medical Coding Professional Master Course",
        shortTitle: "Medical Coding Professional",
        category: "Healthcare • Medical Coding",

        description:
          "Build job-oriented medical coding knowledge through a structured professional curriculum covering medical terminology, anatomy and physiology, ICD-10-CM, CPT, HCPCS and coding workflow.",

        longDescription:
          "A premium, structured medical coding learning pathway for healthcare professionals and learners who want to develop practical coding knowledge, strengthen documentation understanding and prepare for coding-focused career opportunities.",

        instructor: "ICU Learning Portal Faculty",

        level: "Beginner to Intermediate",
        duration: "20+ Hours",
        lessons: 60,

        students: "1,000+",
        rating: 4.8,

        price: "₹3,999",
        originalPrice: "₹5,999",

        isPremium: true,
        accent: "violet",

        modules: [
          {
            title: "Medical Terminology & Clinical Foundations",
            description:
              "Develop essential healthcare terminology, anatomy and physiology vocabulary required for understanding clinical documentation and coding concepts.",
            lessons: 12,
          },

          {
            title: "ICD-10-CM Diagnosis Coding",
            description:
              "Learn ICD-10-CM structure, conventions, chapter organisation, code selection principles and diagnosis coding workflow.",
            lessons: 18,
          },

          {
            title: "CPT Procedure & Service Coding",
            description:
              "Understand CPT code categories, procedure terminology and foundational principles for identifying and understanding coded services.",
            lessons: 15,
          },

          {
            title: "HCPCS & Healthcare Coding Workflow",
            description:
              "Build an understanding of HCPCS concepts and how coding information moves through documentation, review and healthcare billing workflows.",
            lessons: 10,
          },

          {
            title: "Coding Practice, Review & Assessment",
            description:
              "Strengthen coding knowledge through structured examples, practice questions, revision exercises and assessment-based learning.",
            lessons: 5,
          },
        ],

        learningOutcomes: [
          "Understand essential medical terminology used in clinical documentation.",
          "Build foundational anatomy and physiology vocabulary for coding practice.",
          "Understand the structure and organisation of ICD-10-CM.",
          "Apply fundamental diagnosis coding concepts and coding conventions.",
          "Understand the core principles of CPT procedure and service coding.",
          "Build foundational knowledge of HCPCS coding concepts.",
          "Understand documentation-to-code workflow and coding review principles.",
          "Analyse structured coding examples and practice questions.",
          "Develop systematic medical coding study and revision habits.",
          "Prepare for coding-focused assessments and career-oriented learning.",
        ],

        practicalSkills: [
          "Medical terminology recognition",
          "Anatomy and physiology terminology review",
          "Clinical documentation reading",
          "ICD-10-CM codebook navigation",
          "Diagnosis-code identification",
          "ICD-10-CM convention awareness",
          "CPT terminology recognition",
          "HCPCS fundamentals",
          "Documentation review principles",
          "Coding workflow understanding",
          "Coding example analysis",
          "Practice-question interpretation",
        ],

        includes: [
          "60 structured professional lessons",
          "Medical terminology learning modules",
          "Anatomy and physiology foundations",
          "ICD-10-CM structured learning",
          "Diagnosis coding fundamentals",
          "CPT coding fundamentals",
          "HCPCS coding fundamentals",
          "Coding workflow education",
          "Practice examples and assessments",
          "Revision-focused learning resources",
          "Progress tracking",
          "Course completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}