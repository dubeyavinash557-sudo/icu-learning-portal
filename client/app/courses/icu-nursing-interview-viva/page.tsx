import CourseLandingPage from "../_components/CourseLandingPage";

export default function ICUNursingInterviewVivaPage() {
  return (
    <CourseLandingPage
      course={{
        title: "ICU Nursing Interview & Viva Master Course",
        shortTitle: "ICU Nursing Interview & Viva",
        category: "Career • ICU Nursing Interview",

        description:
          "Build confidence for ICU nursing interviews, viva examinations and clinical discussions through structured preparation across critical-care assessment, monitoring, ventilators, emergency care, drugs, procedures and scenario-based questions.",

        longDescription:
          "A premium career-focused interview and viva preparation pathway designed for nurses and ICU professionals preparing for hospital interviews, practical assessments and clinical viva examinations. The course combines high-yield ICU revision, structured question practice, clinical scenarios, rapid revision and mock-interview preparation to help learners communicate their clinical knowledge clearly and professionally.",

        instructor: "ICU Learning Portal Faculty",

        level: "All Levels",
        duration: "10+ Hours",
        lessons: 50,

        students: "4,500+",
        rating: 4.9,

        price: "₹1,299",
        originalPrice: "₹1,799",

        isPremium: true,
        accent: "blue",

        modules: [
          {
            title: "ICU Nursing Interview Fundamentals",
            description:
              "Build a professional interview strategy covering self-introduction, qualification discussion, ICU experience presentation, common HR questions and a structured approach to clinical interviews.",
            lessons: 6,
          },
          {
            title: "ICU Assessment & Monitoring Viva",
            description:
              "Revise patient assessment, vital signs, neurological observations, ECG, SpO₂ and critical-care monitoring concepts through focused viva preparation.",
            lessons: 7,
          },
          {
            title: "Ventilator & Airway Interview",
            description:
              "Prepare for commonly discussed ventilator and airway questions covering ventilation fundamentals, modes, settings, alarms, ET-tube care and intubation-support concepts.",
            lessons: 7,
          },
          {
            title: "Emergency Drugs & Code Blue",
            description:
              "Strengthen interview knowledge of emergency medications, crash-cart concepts, resuscitation workflows, emergency priorities and safe critical-care medication awareness.",
            lessons: 6,
          },
          {
            title: "ABG, ECG & Critical Care Cases",
            description:
              "Practice structured clinical discussions involving ABG interpretation concepts, ECG fundamentals, patient deterioration and common ICU case scenarios.",
            lessons: 7,
          },
          {
            title: "ICU Procedures & Patient Safety",
            description:
              "Revise important ICU procedures, infection prevention, patient identification, documentation, medication safety and bedside patient-safety responsibilities.",
            lessons: 6,
          },
          {
            title: "Scenario-Based Nursing Viva",
            description:
              "Work through clinical prioritisation, emergency situations, deterioration, communication, escalation and scenario-based nursing questions.",
            lessons: 6,
          },
          {
            title: "Final Mock Interview & Rapid Revision",
            description:
              "Complete structured mock-interview preparation, high-yield revision, rapid-fire questions and final viva practice before the assessment or interview.",
            lessons: 5,
          },
        ],

        learningOutcomes: [
          "Answer common ICU nursing interview questions using a clear and structured approach.",
          "Present professional qualifications, ICU experience and clinical responsibilities confidently.",
          "Revise essential ICU assessment and bedside monitoring concepts.",
          "Explain fundamental ventilator, airway and respiratory-care concepts during interviews.",
          "Prepare for emergency-drug, Code Blue and critical-care emergency questions.",
          "Discuss ABG, ECG and common ICU case scenarios in a structured manner.",
          "Explain important ICU procedures and patient-safety responsibilities.",
          "Handle scenario-based clinical prioritisation and deterioration questions.",
          "Improve communication during clinical viva and professional interviews.",
          "Build interview confidence through mock-interview and rapid-revision practice.",
        ],

        practicalSkills: [
          "Professional self-introduction",
          "ICU experience presentation",
          "Clinical interview communication",
          "ICU assessment question handling",
          "Vital-sign and monitoring viva practice",
          "Ventilator viva practice",
          "Airway and intubation question practice",
          "Emergency-drug viva practice",
          "ABG and ECG case discussion",
          "Patient-safety scenario handling",
          "Clinical prioritisation",
          "Emergency-situation discussion",
          "Structured clinical answer delivery",
          "Mock interview practice",
        ],

        includes: [
          "50 structured premium interview-preparation lessons",
          "Complete ICU nursing interview curriculum",
          "High-yield ICU viva question bank",
          "Ventilator and airway interview preparation",
          "Emergency-drug and Code Blue revision",
          "ABG, ECG and monitoring case practice",
          "ICU procedure and patient-safety revision",
          "Scenario-based clinical questions",
          "Premium PDF study resources",
          "Practice assessments and quizzes",
          "Rapid-revision preparation pathway",
          "Mock interview preparation",
          "LMS progress tracking",
          "Structured course completion pathway",
          "Certificate eligibility after course completion",
        ],
      }}
    />
  );
}