import CourseLandingPage, {
  type CourseLandingData,
} from "@/app/courses/_components/CourseLandingPage";

const course: CourseLandingData = {
  title: "Airway Management & Advanced Airway Care Masterclass",

  shortTitle: "Airway Management Masterclass",

  category: "Critical Care • Airway Management",

  description:
    "Professional airway management training for ICU nurses, critical care professionals and healthcare learners.",

  longDescription:
    "A structured premium airway-management program covering airway assessment, oxygen therapy, airway adjuncts, bag-mask ventilation, endotracheal airway care, suctioning, tracheostomy care, difficult-airway awareness, airway emergencies and practical ICU decision-making. The course is designed for systematic study, clinical revision and professional skill development.",

  instructor: "Avinash Dubey",

  level: "Intermediate to Advanced",

  duration: "20 Chapters • 50 Lessons",

  lessons: 50,

  students: "5,200+",

  rating: 4.9,

  price: "₹2,499",

  originalPrice: "₹3,999",

  isPremium: true,

  accent: "cyan",

  modules: [
    {
      title: "Airway Management Foundations",
      description:
        "Build a strong foundation in airway anatomy, physiology and airway-management priorities.",
      lessons: 3,
    },
    {
      title: "Airway Assessment",
      description:
        "Learn structured airway assessment, recognition of obstruction and clinical deterioration.",
      lessons: 3,
    },
    {
      title: "Airway Anatomy & Physiology",
      description:
        "Review clinically relevant upper and lower airway anatomy and respiratory physiology.",
      lessons: 2,
    },
    {
      title: "Airway Obstruction",
      description:
        "Understand common causes, recognition and immediate priorities in airway obstruction.",
      lessons: 3,
    },
    {
      title: "Oxygen Therapy",
      description:
        "Study oxygen-delivery devices, oxygenation monitoring and safe oxygen-support principles.",
      lessons: 3,
    },
    {
      title: "Airway Adjuncts",
      description:
        "Understand commonly used airway adjuncts and their role in airway support.",
      lessons: 2,
    },
    {
      title: "Bag-Mask Ventilation",
      description:
        "Learn the principles of bag-mask ventilation, equipment preparation and ventilation support.",
      lessons: 3,
    },
    {
      title: "Supraglottic Airway Devices",
      description:
        "Review the role, indications and care considerations of supraglottic airway devices.",
      lessons: 2,
    },
    {
      title: "Endotracheal Intubation",
      description:
        "Study the concepts, preparation, confirmation and ongoing care associated with endotracheal intubation.",
      lessons: 3,
    },
    {
      title: "Endotracheal Tube Care",
      description:
        "Develop systematic knowledge of ETT positioning, fixation, cuff monitoring and bedside care.",
      lessons: 3,
    },
    {
      title: "Endotracheal Suctioning",
      description:
        "Understand indications, preparation, monitoring and aftercare for ETT suctioning.",
      lessons: 3,
    },
    {
      title: "Airway Humidification",
      description:
        "Review humidification concepts and airway-care considerations in mechanically ventilated patients.",
      lessons: 2,
    },
    {
      title: "Tracheostomy Management",
      description:
        "Study tracheostomy care, tube-related considerations, suctioning and emergency awareness.",
      lessons: 3,
    },
    {
      title: "Airway Emergencies",
      description:
        "Recognize major airway emergencies and understand structured emergency priorities.",
      lessons: 3,
    },
    {
      title: "Difficult Airway Awareness",
      description:
        "Learn warning signs and safety principles related to potentially difficult airways.",
      lessons: 2,
    },
    {
      title: "Airway & Mechanical Ventilation",
      description:
        "Connect airway care with mechanical ventilation, oxygenation and ventilator monitoring.",
      lessons: 2,
    },
    {
      title: "Airway Monitoring",
      description:
        "Understand SpO₂, respiratory assessment, clinical observation and trend monitoring.",
      lessons: 2,
    },
    {
      title: "Airway Complications",
      description:
        "Review common airway complications and the importance of early recognition.",
      lessons: 2,
    },
    {
      title: "Practical ICU Airway Scenarios",
      description:
        "Apply airway-assessment and nursing priorities to structured ICU case scenarios.",
      lessons: 2,
    },
    {
      title: "Final Airway Management Review",
      description:
        "Consolidate key concepts with revision, practical checkpoints and final assessment preparation.",
      lessons: 2,
    },
  ],

  learningOutcomes: [
    "Understand systematic airway assessment in critically ill patients.",
    "Recognize common signs of airway obstruction and respiratory deterioration.",
    "Understand oxygen therapy and commonly used oxygen-delivery systems.",
    "Understand the role of basic airway adjuncts in airway support.",
    "Develop structured knowledge of bag-mask ventilation principles.",
    "Understand endotracheal tube care and bedside airway monitoring.",
    "Recognize important indications for airway suctioning.",
    "Understand principles of safe endotracheal suctioning and patient monitoring.",
    "Understand tracheostomy care and airway emergency awareness.",
    "Connect airway management with oxygenation and mechanical ventilation.",
    "Apply airway knowledge to structured ICU case scenarios.",
    "Prepare for ICU nursing interviews, viva and professional revision.",
  ],

  practicalSkills: [
    "Airway assessment checklist",
    "Airway equipment preparation",
    "Oxygen therapy setup awareness",
    "Bag-mask ventilation principles",
    "Airway adjunct identification",
    "Endotracheal tube bedside care",
    "ETT fixation and position monitoring",
    "Cuff-pressure awareness",
    "Endotracheal suctioning preparation",
    "Airway suctioning monitoring",
    "Tracheostomy bedside care",
    "Airway emergency recognition",
    "Respiratory deterioration recognition",
    "ICU airway documentation",
    "Structured airway case assessment",
  ],

  includes: [
    "20 structured chapters",
    "50 professional lessons",
    "Premium airway-management curriculum",
    "ICU-focused clinical learning",
    "Airway assessment framework",
    "Oxygen therapy study",
    "Endotracheal tube care",
    "Endotracheal suctioning study",
    "Tracheostomy management",
    "Airway emergency scenarios",
    "Practical ICU case-based learning",
    "Final course assessment",
    "Premium learner access",
    "Certificate eligibility after completing required course criteria",
  ],
};

export default function AirwayManagementPremiumPage() {
  return <CourseLandingPage course={course} />;
}