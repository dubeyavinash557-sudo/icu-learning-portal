import CourseLandingPage from "../_components/CourseLandingPage";

export default function MedicalCodingPage() {
  return (
    <CourseLandingPage
      course={{
        title: "Medical Coding Professional Course",
        shortTitle: "Medical Coding",
        category: "Healthcare • Medical Coding",
        description:
          "Build a structured foundation in medical coding, healthcare terminology, ICD-10-CM, CPT and HCPCS with practical coding-oriented learning.",
        longDescription:
          "A professional learning pathway designed for healthcare learners who want to understand medical coding concepts and coding workflows.",
        instructor: "ICU Learning Portal Faculty",
        level: "Beginner to Intermediate",
        duration: "15+ Hours",
        lessons: 60,
        students: "1,000+",
        rating: 4.8,
        price: "₹3,999",
        originalPrice: "₹5,999",
        isPremium: true,
        accent: "violet",

        modules: [
          {
            title: "Medical Terminology",
            description:
              "Build a strong foundation in healthcare terminology, anatomy and common clinical terms.",
            lessons: 12,
          },
          {
            title: "ICD-10-CM Fundamentals",
            description:
              "Understand ICD-10-CM structure, conventions and diagnosis coding concepts.",
            lessons: 18,
          },
          {
            title: "CPT Coding Fundamentals",
            description:
              "Learn the basic concepts behind CPT procedure and service coding.",
            lessons: 15,
          },
          {
            title: "HCPCS & Coding Workflow",
            description:
              "Understand HCPCS concepts and how coding fits into healthcare workflows.",
            lessons: 10,
          },
          {
            title: "Coding Practice & Review",
            description:
              "Apply concepts through structured examples, practice questions and revision.",
            lessons: 5,
          },
        ],

        learningOutcomes: [
          "Understand core medical terminology.",
          "Build foundational anatomy and physiology vocabulary.",
          "Understand ICD-10-CM coding structure.",
          "Learn fundamental diagnosis coding concepts.",
          "Understand CPT coding fundamentals.",
          "Understand HCPCS coding concepts.",
          "Develop a structured coding workflow.",
          "Practise coding concepts through assessment-based learning.",
        ],

        practicalSkills: [
          "Medical terminology recognition",
          "ICD-10-CM navigation",
          "Diagnosis-code identification",
          "CPT terminology",
          "HCPCS fundamentals",
          "Coding documentation review",
          "Coding workflow understanding",
          "Practice-question analysis",
        ],

        includes: [
          "60 structured lessons",
          "Medical coding modules",
          "ICD-10-CM learning",
          "CPT fundamentals",
          "HCPCS fundamentals",
          "Coding revision resources",
          "Practice assessments",
          "Progress tracking",
          "Course completion pathway",
          "Certificate eligibility after completion",
        ],
      }}
    />
  );
}