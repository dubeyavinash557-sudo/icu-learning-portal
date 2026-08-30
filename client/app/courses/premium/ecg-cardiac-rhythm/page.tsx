import CourseLandingPage, {
  type CourseLandingData,
} from "@/app/courses/_components/CourseLandingPage";

const course: CourseLandingData = {
  title: "ECG & Cardiac Rhythm Interpretation Masterclass",

  shortTitle: "ECG & Cardiac Rhythm Masterclass",

  category: "ECG & Cardiac Critical Care",

  description:
    "A professional ECG learning program designed for nurses, ICU professionals, paramedical students and healthcare learners who want to build strong ECG interpretation skills from fundamentals to clinical rhythm recognition.",

  longDescription:
    "Master ECG fundamentals, lead placement, cardiac conduction, rate and rhythm assessment, intervals, waveform interpretation, common arrhythmias, heart blocks, ischemic patterns and emergency rhythm recognition through a structured 20-chapter learning pathway.",

  instructor: "Avinash Dubey",

  level: "Beginner to Advanced",

  duration: "20 Chapters",

  lessons: 20,

  students: "10,000+",

  rating: 4.9,

  price: "₹2,499",

  originalPrice: "₹4,999",

  isPremium: true,

  accent: "violet",

  modules: [
    {
      title: "ECG Fundamentals",
      description:
        "Understand the purpose of ECG, basic terminology and how electrical activity of the heart is represented on an ECG.",
      lessons: 1,
    },

    {
      title: "Cardiac Anatomy for ECG",
      description:
        "Build the anatomical and physiological foundation required for understanding cardiac electrical activity.",
      lessons: 1,
    },

    {
      title: "Cardiac Electrical Conduction System",
      description:
        "Learn the SA node, AV node, bundle branches and Purkinje system and understand normal cardiac conduction.",
      lessons: 1,
    },

    {
      title: "ECG Machine & Recording Principles",
      description:
        "Understand ECG machine basics, recording principles, patient preparation and common recording considerations.",
      lessons: 1,
    },

    {
      title: "12-Lead ECG Placement",
      description:
        "Learn standard limb and chest lead placement and understand how lead position affects ECG interpretation.",
      lessons: 1,
    },

    {
      title: "ECG Calibration & Standardization",
      description:
        "Understand ECG paper, calibration, amplitude, time intervals and standard recording conventions.",
      lessons: 1,
    },

    {
      title: "Heart Rate Calculation",
      description:
        "Learn practical approaches for calculating heart rate from regular and irregular ECG rhythms.",
      lessons: 1,
    },

    {
      title: "Rhythm Assessment",
      description:
        "Develop a systematic method for identifying regularity, rhythm origin and major rhythm characteristics.",
      lessons: 1,
    },

    {
      title: "P Wave & Atrial Activity",
      description:
        "Interpret P-wave morphology and understand its relationship with atrial depolarization.",
      lessons: 1,
    },

    {
      title: "PR Interval & AV Conduction",
      description:
        "Understand PR interval assessment and identify important abnormalities in atrioventricular conduction.",
      lessons: 1,
    },

    {
      title: "QRS Complex Interpretation",
      description:
        "Learn QRS duration, morphology and the clinical significance of ventricular depolarization patterns.",
      lessons: 1,
    },

    {
      title: "ST Segment & T Wave",
      description:
        "Understand ST-segment and T-wave assessment and recognize important abnormal patterns.",
      lessons: 1,
    },

    {
      title: "QT Interval & Corrected QT",
      description:
        "Learn QT interval assessment and understand why prolonged repolarization requires clinical attention.",
      lessons: 1,
    },

    {
      title: "Normal Sinus Rhythm",
      description:
        "Identify normal sinus rhythm using a structured ECG interpretation approach.",
      lessons: 1,
    },

    {
      title: "Bradycardia & Tachycardia",
      description:
        "Understand common slow and fast rhythm patterns and their ECG characteristics.",
      lessons: 1,
    },

    {
      title: "Atrial Arrhythmias",
      description:
        "Study important atrial rhythm patterns including atrial fibrillation and atrial flutter.",
      lessons: 1,
    },

    {
      title: "Ventricular Arrhythmias",
      description:
        "Learn recognition of important ventricular rhythms and understand their clinical significance.",
      lessons: 1,
    },

    {
      title: "AV Blocks & Conduction Disorders",
      description:
        "Understand first-degree, second-degree and complete AV block patterns using systematic ECG analysis.",
      lessons: 1,
    },

    {
      title: "Ischemia, Injury & Infarction Patterns",
      description:
        "Learn the basic ECG patterns associated with myocardial ischemia, injury and infarction and their clinical importance.",
      lessons: 1,
    },

    {
      title: "Emergency ECG Cases & Interpretation",
      description:
        "Apply a structured ECG interpretation workflow to high-acuity clinical scenarios and emergency rhythm recognition.",
      lessons: 1,
    },
  ],

  learningOutcomes: [
    "Understand the basic electrical activity of the heart and its ECG representation.",

    "Identify standard ECG leads and understand the purpose of a 12-lead ECG.",

    "Calculate heart rate using practical ECG methods.",

    "Assess rhythm regularity and identify sinus rhythm patterns.",

    "Interpret P waves, PR intervals, QRS complexes, ST segments and T waves.",

    "Understand QT interval and corrected QT concepts.",

    "Recognize common atrial arrhythmias.",

    "Recognize common ventricular arrhythmias.",

    "Identify major AV block patterns.",

    "Develop a systematic approach to ECG interpretation.",

    "Recognize important ischemic and infarction-related ECG patterns.",

    "Improve ECG assessment skills for ICU and emergency care environments.",
  ],

  practicalSkills: [
    "12-lead ECG lead placement fundamentals",

    "ECG paper and calibration assessment",

    "Heart rate calculation",

    "Regular versus irregular rhythm assessment",

    "Systematic P-QRS-T analysis",

    "PR interval assessment",

    "QRS duration assessment",

    "ST-segment evaluation",

    "T-wave assessment",

    "QT interval recognition",

    "Sinus rhythm recognition",

    "Atrial fibrillation recognition",

    "Atrial flutter recognition",

    "Tachycardia and bradycardia assessment",

    "Ventricular rhythm recognition",

    "AV block identification",

    "Emergency ECG pattern recognition",

    "Case-based ECG interpretation workflow",
  ],

  includes: [
    "20 structured ECG learning chapters",

    "Beginner-to-advanced ECG pathway",

    "Professional ECG interpretation framework",

    "12-lead ECG fundamentals",

    "Rhythm and arrhythmia recognition",

    "AV block and conduction disorder training",

    "Ischemia and infarction pattern concepts",

    "Emergency ECG case-based learning",

    "Practice-oriented clinical scenarios",

    "Progress tracking through the LMS",

    "Assessment and quiz pathway",

    "Course completion certificate pathway",

    "Premium learning access",
  ],
};

export default function ECGCardiacRhythmPage() {
  return <CourseLandingPage course={course} />;
}