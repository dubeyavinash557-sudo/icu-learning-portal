import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CourseSeed = {
  title: string;
  slug: string;
  description: string;
  image: string;
  instructor: string;
  price: number;
  duration: number;
  language: string;
  level: string;
  rating: number;
  students: number;
  lessons: {
    title: string;
    description: string;
    duration: number;
  }[];
  quiz: {
    title: string;
    description: string;
    questions: {
      question: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctAnswer: string;
      explanation: string;
    }[];
  };
};

const courses: CourseSeed[] = [
  // =========================================================
  // 1. ICU NURSING MASTER COURSE
  // =========================================================
  {
    title: "ICU Nursing Mastery Program",
    slug: "icu-nursing-mastery-program",
    description:
      "A comprehensive professional ICU Nursing program covering patient assessment, monitoring, critical care principles, ventilator care, ABG, ECG, emergency management, infection prevention, documentation and practical bedside skills.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 2499,
    duration: 720,
    language: "Hindi + English",
    level: "Beginner to Advanced",
    rating: 4.9,
    students: 12500,
    lessons: [
      {
        title: "Introduction to Intensive Care Unit",
        description:
          "Understand ICU structure, workflow, multidisciplinary team roles and essential safety principles.",
        duration: 35,
      },
      {
        title: "ICU Patient Assessment",
        description:
          "Systematic assessment of critically ill patients using primary and secondary assessment principles.",
        duration: 45,
      },
      {
        title: "Vital Signs and Hemodynamic Monitoring",
        description:
          "Learn continuous monitoring of vital signs and interpretation of important clinical parameters.",
        duration: 50,
      },
      {
        title: "Airway and Oxygen Therapy",
        description:
          "Understand airway management, oxygen delivery devices and clinical monitoring.",
        duration: 45,
      },
      {
        title: "Mechanical Ventilation Fundamentals",
        description:
          "Introduction to mechanical ventilation, indications and essential ventilator terminology.",
        duration: 55,
      },
      {
        title: "ABG Interpretation for ICU Nurses",
        description:
          "Develop a structured approach to arterial blood gas interpretation.",
        duration: 50,
      },
      {
        title: "ECG and Cardiac Monitoring",
        description:
          "Learn basic rhythm recognition and continuous cardiac monitoring in critical care.",
        duration: 50,
      },
      {
        title: "ICU Emergency Management",
        description:
          "Understand initial nursing priorities during common ICU emergencies.",
        duration: 55,
      },
      {
        title: "Sepsis and Shock Management",
        description:
          "Study recognition, monitoring and multidisciplinary management principles for sepsis and shock.",
        duration: 55,
      },
      {
        title: "ICU Infection Prevention",
        description:
          "Learn infection prevention, hand hygiene, isolation and device-associated infection principles.",
        duration: 40,
      },
      {
        title: "ICU Documentation and Communication",
        description:
          "Professional documentation, handover and communication in critical care settings.",
        duration: 40,
      },
      {
        title: "Practical ICU Nursing Workflow",
        description:
          "Integrate assessment, monitoring, documentation and patient-care priorities into practical workflow.",
        duration: 55,
      },
    ],
    quiz: {
      title: "ICU Nursing Mastery Assessment",
      description:
        "Professional assessment covering essential ICU nursing concepts.",
      questions: [
        {
          question: "What is the primary purpose of continuous ICU monitoring?",
          optionA: "Entertainment",
          optionB: "Early recognition of clinical deterioration",
          optionC: "Reducing documentation",
          optionD: "Replacing clinical assessment",
          correctAnswer: "B",
          explanation:
            "Continuous monitoring helps identify physiological changes and clinical deterioration early.",
        },
        {
          question: "Which assessment is generally performed first in an acutely deteriorating patient?",
          optionA: "Dietary assessment",
          optionB: "Primary assessment",
          optionC: "Discharge assessment",
          optionD: "Social history only",
          correctAnswer: "B",
          explanation:
            "A primary assessment focuses on immediate life-threatening problems.",
        },
        {
          question: "Which parameter is commonly monitored continuously in ICU patients?",
          optionA: "SpO₂",
          optionB: "Height",
          optionC: "Hair color",
          optionD: "Blood group every hour",
          correctAnswer: "A",
          explanation:
            "Pulse oximetry is commonly used for continuous oxygen saturation monitoring.",
        },
        {
          question: "Which discipline is important in ICU care?",
          optionA: "Only nursing",
          optionB: "Only medicine",
          optionC: "Multidisciplinary collaboration",
          optionD: "Only laboratory services",
          correctAnswer: "C",
          explanation:
            "Critical care requires coordinated multidisciplinary teamwork.",
        },
        {
          question: "What is an important component of safe ICU handover?",
          optionA: "Incomplete information",
          optionB: "Structured clinical communication",
          optionC: "Avoiding patient details",
          optionD: "Only discussing medications",
          correctAnswer: "B",
          explanation:
            "Structured handover reduces communication errors and supports continuity of care.",
        },
      ],
    },
  },

  // =========================================================
  // 2. MECHANICAL VENTILATION
  // =========================================================
  {
    title: "Mechanical Ventilation & Respiratory Care Masterclass",
    slug: "mechanical-ventilation-respiratory-care-masterclass",
    description:
      "Professional mechanical ventilation training covering ventilator principles, modes, settings, alarms, oxygenation, ventilation, troubleshooting, weaning and practical ICU scenarios.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 2999,
    duration: 840,
    language: "Hindi + English",
    level: "Intermediate to Advanced",
    rating: 4.9,
    students: 9800,
    lessons: [
      {
        title: "Introduction to Mechanical Ventilation",
        description:
          "Understand why mechanical ventilation is used and the basic concepts of ventilatory support.",
        duration: 45,
      },
      {
        title: "Ventilator Terminology",
        description:
          "Master essential terms including tidal volume, respiratory rate, minute ventilation and pressure.",
        duration: 50,
      },
      {
        title: "Volume Controlled Ventilation",
        description:
          "Understand the principles and clinical use of volume-controlled ventilation.",
        duration: 55,
      },
      {
        title: "Pressure Controlled Ventilation",
        description:
          "Understand pressure-controlled ventilation and its major clinical considerations.",
        duration: 55,
      },
      {
        title: "SIMV and Assisted Modes",
        description:
          "Study commonly used assisted and synchronized ventilation modes.",
        duration: 55,
      },
      {
        title: "CPAP and Pressure Support",
        description:
          "Understand spontaneous breathing support and pressure support concepts.",
        duration: 50,
      },
      {
        title: "PEEP and FiO2 Management",
        description:
          "Learn the physiological purpose of PEEP and oxygen concentration management.",
        duration: 60,
      },
      {
        title: "Ventilator Waveforms",
        description:
          "Introduction to pressure, flow and volume waveform interpretation.",
        duration: 65,
      },
      {
        title: "Ventilator Alarms",
        description:
          "Understand common high-pressure, low-pressure and other ventilator alarms.",
        duration: 60,
      },
      {
        title: "Ventilator Troubleshooting",
        description:
          "Systematic approach to common ventilator and patient-related problems.",
        duration: 60,
      },
      {
        title: "Weaning and Spontaneous Breathing Trials",
        description:
          "Understand general principles of ventilator liberation and readiness assessment.",
        duration: 60,
      },
      {
        title: "Mechanical Ventilation Case Studies",
        description:
          "Apply ventilation concepts to structured clinical case scenarios.",
        duration: 75,
      },
    ],
    quiz: {
      title: "Mechanical Ventilation Masterclass Assessment",
      description:
        "Assessment of core mechanical ventilation concepts and troubleshooting.",
      questions: [
        {
          question: "What does PEEP stand for?",
          optionA: "Positive End Expiratory Pressure",
          optionB: "Pulmonary End Expiratory Pressure",
          optionC: "Positive Expiratory Exchange Pressure",
          optionD: "Pulmonary Exchange End Pressure",
          correctAnswer: "A",
          explanation:
            "PEEP means Positive End Expiratory Pressure.",
        },
        {
          question: "Which variable is directly related to the amount of gas delivered during volume-controlled ventilation?",
          optionA: "Tidal volume",
          optionB: "Skin temperature",
          optionC: "Heart rhythm",
          optionD: "Blood group",
          correctAnswer: "A",
          explanation:
            "Tidal volume is a key setting in volume-controlled ventilation.",
        },
        {
          question: "A high airway pressure alarm may occur because of:",
          optionA: "Airway obstruction",
          optionB: "Empty water bottle",
          optionC: "Normal blood pressure",
          optionD: "Low body temperature only",
          correctAnswer: "A",
          explanation:
            "Airway obstruction, secretions, coughing and reduced compliance can contribute to high airway pressure.",
        },
        {
          question: "Approximate oxygen concentration in room air is:",
          optionA: "10%",
          optionB: "21%",
          optionC: "50%",
          optionD: "100%",
          correctAnswer: "B",
          explanation:
            "Room air contains approximately 21% oxygen.",
        },
        {
          question: "Weaning refers to:",
          optionA: "Increasing ventilator support permanently",
          optionB: "Gradual reduction of ventilatory support when appropriate",
          optionC: "Removing ECG monitoring",
          optionD: "Stopping all nursing care",
          correctAnswer: "B",
          explanation:
            "Weaning involves gradual reduction and eventual liberation from ventilatory support when clinically appropriate.",
        },
      ],
    },
  },

  // =========================================================
  // 3. ECG
  // =========================================================
  {
    title: "ECG & Cardiac Rhythm Interpretation Masterclass",
    slug: "ecg-cardiac-rhythm-interpretation-masterclass",
    description:
      "Structured ECG training covering ECG fundamentals, rhythm analysis, conduction abnormalities, tachyarrhythmias, bradyarrhythmias and common critical care ECG patterns.",
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 1999,
    duration: 600,
    language: "Hindi + English",
    level: "Beginner to Advanced",
    rating: 4.9,
    students: 8600,
    lessons: [
      {
        title: "ECG Fundamentals",
        description:
          "Understand cardiac electrical activity and the purpose of ECG recording.",
        duration: 40,
      },
      {
        title: "ECG Paper and Calibration",
        description:
          "Learn ECG paper, standard calibration and basic measurements.",
        duration: 45,
      },
      {
        title: "Rate Calculation",
        description:
          "Learn practical methods for calculating heart rate from ECG.",
        duration: 45,
      },
      {
        title: "Rhythm Assessment",
        description:
          "Develop a systematic approach to ECG rhythm interpretation.",
        duration: 50,
      },
      {
        title: "P Wave, PR Interval and QRS",
        description:
          "Understand key ECG components and their clinical significance.",
        duration: 50,
      },
      {
        title: "Atrial Arrhythmias",
        description:
          "Study common atrial rhythm abnormalities.",
        duration: 55,
      },
      {
        title: "Ventricular Arrhythmias",
        description:
          "Recognize important ventricular rhythm abnormalities.",
        duration: 55,
      },
      {
        title: "Heart Blocks",
        description:
          "Understand first-degree, second-degree and complete heart block patterns.",
        duration: 55,
      },
      {
        title: "ST-T Changes",
        description:
          "Understand common ST-segment and T-wave abnormalities.",
        duration: 55,
      },
      {
        title: "Acute Cardiac ECG Patterns",
        description:
          "Review important ECG patterns encountered in critical care.",
        duration: 60,
      },
      {
        title: "ECG Case Practice",
        description:
          "Practice a systematic ECG interpretation workflow using clinical cases.",
        duration: 50,
      },
    ],
    quiz: {
      title: "ECG Interpretation Masterclass Assessment",
      description:
        "Assessment covering ECG fundamentals and rhythm interpretation.",
      questions: [
        {
          question: "The P wave represents:",
          optionA: "Ventricular depolarization",
          optionB: "Atrial depolarization",
          optionC: "Ventricular repolarization",
          optionD: "Cardiac output",
          correctAnswer: "B",
          explanation:
            "The P wave represents atrial depolarization.",
        },
        {
          question: "The QRS complex primarily represents:",
          optionA: "Atrial depolarization",
          optionB: "Ventricular depolarization",
          optionC: "Atrial contraction only",
          optionD: "Ventricular filling",
          correctAnswer: "B",
          explanation:
            "The QRS complex represents ventricular depolarization.",
        },
        {
          question: "The T wave represents:",
          optionA: "Ventricular repolarization",
          optionB: "Atrial depolarization",
          optionC: "Ventricular depolarization",
          optionD: "Cardiac arrest",
          correctAnswer: "A",
          explanation:
            "The T wave represents ventricular repolarization.",
        },
        {
          question: "Which ECG feature is commonly evaluated when assessing rhythm?",
          optionA: "Regularity",
          optionB: "Hair color",
          optionC: "Height",
          optionD: "Body weight only",
          correctAnswer: "A",
          explanation:
            "Rhythm regularity is an important part of systematic ECG interpretation.",
        },
        {
          question: "A systematic ECG interpretation approach helps to:",
          optionA: "Reduce missed findings",
          optionB: "Replace clinical assessment",
          optionC: "Eliminate all emergencies",
          optionD: "Avoid documentation",
          correctAnswer: "A",
          explanation:
            "A structured approach can reduce the chance of overlooking important ECG findings.",
        },
      ],
    },
  },

  // =========================================================
  // 4. ABG
  // =========================================================
  {
    title: "ABG Analysis & Acid-Base Disorders Masterclass",
    slug: "abg-analysis-acid-base-disorders-masterclass",
    description:
      "Professional ABG interpretation program covering normal values, respiratory and metabolic disorders, compensation, mixed disorders and structured ICU case interpretation.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 1799,
    duration: 540,
    language: "Hindi + English",
    level: "Beginner to Advanced",
    rating: 4.9,
    students: 7200,
    lessons: [
      {
        title: "ABG Fundamentals",
        description:
          "Understand arterial blood gas testing and its role in critical care.",
        duration: 40,
      },
      {
        title: "Normal ABG Values",
        description:
          "Learn commonly used reference ranges for pH, PaCO2, HCO3 and oxygenation.",
        duration: 40,
      },
      {
        title: "Stepwise ABG Interpretation",
        description:
          "Develop a structured method for interpreting ABG results.",
        duration: 50,
      },
      {
        title: "Respiratory Acidosis",
        description:
          "Understand causes, physiology and interpretation of respiratory acidosis.",
        duration: 45,
      },
      {
        title: "Respiratory Alkalosis",
        description:
          "Understand causes and interpretation of respiratory alkalosis.",
        duration: 45,
      },
      {
        title: "Metabolic Acidosis",
        description:
          "Study metabolic acidosis and important clinical patterns.",
        duration: 50,
      },
      {
        title: "Metabolic Alkalosis",
        description:
          "Study metabolic alkalosis and common clinical scenarios.",
        duration: 45,
      },
      {
        title: "Compensation",
        description:
          "Understand basic concepts of physiological compensation.",
        duration: 45,
      },
      {
        title: "Anion Gap",
        description:
          "Learn the clinical concept of anion gap and its interpretation.",
        duration: 45,
      },
      {
        title: "Mixed Acid-Base Disorders",
        description:
          "Recognize situations involving more than one acid-base disturbance.",
        duration: 50,
      },
      {
        title: "ICU ABG Case Studies",
        description:
          "Apply ABG interpretation principles to structured critical care cases.",
        duration: 45,
      },
    ],
    quiz: {
      title: "ABG Analysis Masterclass Assessment",
      description:
        "Assessment covering arterial blood gas and acid-base interpretation.",
      questions: [
        {
          question: "The normal arterial blood pH is approximately:",
          optionA: "6.80–7.00",
          optionB: "7.35–7.45",
          optionC: "7.60–7.80",
          optionD: "8.00–8.50",
          correctAnswer: "B",
          explanation:
            "Normal arterial pH is approximately 7.35–7.45.",
        },
        {
          question: "Normal PaCO2 is approximately:",
          optionA: "10–20 mmHg",
          optionB: "20–30 mmHg",
          optionC: "35–45 mmHg",
          optionD: "60–80 mmHg",
          correctAnswer: "C",
          explanation:
            "A commonly used normal PaCO2 range is 35–45 mmHg.",
        },
        {
          question: "Normal HCO3− is approximately:",
          optionA: "5–10 mEq/L",
          optionB: "12–18 mEq/L",
          optionC: "22–26 mEq/L",
          optionD: "35–45 mEq/L",
          correctAnswer: "C",
          explanation:
            "A commonly used normal bicarbonate range is 22–26 mEq/L.",
        },
        {
          question: "Low pH with elevated PaCO2 suggests:",
          optionA: "Respiratory acidosis",
          optionB: "Respiratory alkalosis",
          optionC: "Metabolic alkalosis",
          optionD: "Normal ABG",
          correctAnswer: "A",
          explanation:
            "A low pH with elevated PaCO2 is consistent with respiratory acidosis.",
        },
        {
          question: "A structured ABG approach helps identify:",
          optionA: "Only oxygen saturation",
          optionB: "Acid-base abnormalities",
          optionC: "Only blood pressure",
          optionD: "Only heart rate",
          correctAnswer: "B",
          explanation:
            "ABG interpretation evaluates acid-base status and respiratory/oxygenation parameters.",
        },
      ],
    },
  },

  // =========================================================
  // 5. ICU EMERGENCY
  // =========================================================
  {
    title: "ICU Emergency & Critical Care Management",
    slug: "icu-emergency-critical-care-management",
    description:
      "Professional emergency-focused ICU program covering recognition of deterioration, resuscitation principles, airway emergencies, shock, sepsis, cardiac emergencies and emergency nursing priorities.",
    image:
      "https://images.unsplash.com/photo-1516841273335-e39b37888115?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 2299,
    duration: 660,
    language: "Hindi + English",
    level: "Intermediate to Advanced",
    rating: 4.9,
    students: 6800,
    lessons: [
      {
        title: "Recognition of Clinical Deterioration",
        description:
          "Recognize early warning signs of deterioration in critically ill patients.",
        duration: 45,
      },
      {
        title: "ABCDE Emergency Assessment",
        description:
          "Understand a structured emergency assessment approach.",
        duration: 50,
      },
      {
        title: "Airway Emergencies",
        description:
          "Study common airway emergencies and immediate clinical priorities.",
        duration: 50,
      },
      {
        title: "Respiratory Emergencies",
        description:
          "Understand major respiratory emergencies encountered in critical care.",
        duration: 55,
      },
      {
        title: "Cardiac Emergencies",
        description:
          "Review recognition and initial management principles for cardiac emergencies.",
        duration: 60,
      },
      {
        title: "Cardiac Arrest Response",
        description:
          "Understand coordinated resuscitation principles and team roles.",
        duration: 60,
      },
      {
        title: "Shock Recognition",
        description:
          "Differentiate major shock categories and understand monitoring priorities.",
        duration: 55,
      },
      {
        title: "Sepsis and Septic Shock",
        description:
          "Study early recognition and multidisciplinary management principles.",
        duration: 60,
      },
      {
        title: "Emergency Nursing Priorities",
        description:
          "Organize nursing actions during high-acuity emergencies.",
        duration: 55,
      },
      {
        title: "Emergency Case Scenarios",
        description:
          "Apply emergency assessment and prioritization concepts to clinical scenarios.",
        duration: 70,
      },
    ],
    quiz: {
      title: "ICU Emergency Management Assessment",
      description:
        "Professional emergency and critical care assessment.",
      questions: [
        {
          question: "In an acutely deteriorating patient, the initial priority is to:",
          optionA: "Ignore airway status",
          optionB: "Perform a structured primary assessment",
          optionC: "Complete discharge paperwork",
          optionD: "Wait for symptoms to resolve",
          correctAnswer: "B",
          explanation:
            "A structured primary assessment helps identify immediate life-threatening problems.",
        },
        {
          question: "Which condition can cause circulatory instability?",
          optionA: "Shock",
          optionB: "Normal sleep",
          optionC: "Normal hydration",
          optionD: "Routine documentation",
          correctAnswer: "A",
          explanation:
            "Shock can result in inadequate tissue perfusion and circulatory instability.",
        },
        {
          question: "Sepsis requires:",
          optionA: "Delayed recognition",
          optionB: "Timely clinical assessment and management",
          optionC: "No monitoring",
          optionD: "Only dietary treatment",
          correctAnswer: "B",
          explanation:
            "Timely recognition and appropriate management are important in sepsis.",
        },
        {
          question: "During an emergency, effective teamwork requires:",
          optionA: "Poor communication",
          optionB: "Clear role allocation and communication",
          optionC: "No leadership",
          optionD: "Avoiding documentation",
          correctAnswer: "B",
          explanation:
            "Clear roles and communication support coordinated emergency care.",
        },
        {
          question: "Continuous monitoring in critically ill patients helps with:",
          optionA: "Early recognition of deterioration",
          optionB: "Replacing all clinical examination",
          optionC: "Avoiding treatment",
          optionD: "Eliminating documentation",
          correctAnswer: "A",
          explanation:
            "Monitoring supports early detection of clinically significant changes.",
        },
      ],
    },
  },

  // =========================================================
  // 6. ICU EMERGENCY DRUGS
  // =========================================================
  {
    title: "ICU Emergency Drugs & Critical Care Pharmacology",
    slug: "icu-emergency-drugs-critical-care-pharmacology",
    description:
      "Professional ICU pharmacology course covering emergency medication principles, medication safety, vasoactive agents, sedatives, analgesics, common critical care drugs and monitoring considerations.",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 2199,
    duration: 600,
    language: "Hindi + English",
    level: "Intermediate to Advanced",
    rating: 4.8,
    students: 5900,
    lessons: [
      {
        title: "ICU Medication Safety",
        description:
          "Core principles of medication safety and error prevention in critical care.",
        duration: 45,
      },
      {
        title: "Emergency Medication Preparation",
        description:
          "General principles of safe preparation, labeling and administration.",
        duration: 45,
      },
      {
        title: "Vasoactive Medications",
        description:
          "Introduction to commonly used vasoactive agents and monitoring considerations.",
        duration: 55,
      },
      {
        title: "Sedation and Analgesia",
        description:
          "Understand common ICU sedation and analgesia concepts.",
        duration: 50,
      },
      {
        title: "Anticoagulation Concepts",
        description:
          "Review basic principles of anticoagulant therapy and monitoring.",
        duration: 45,
      },
      {
        title: "Antiarrhythmic Medications",
        description:
          "Study common antiarrhythmic medication categories and monitoring.",
        duration: 50,
      },
      {
        title: "Emergency Resuscitation Medications",
        description:
          "Understand medication principles used during resuscitation protocols.",
        duration: 55,
      },
      {
        title: "Medication Monitoring",
        description:
          "Learn important clinical parameters to monitor during critical care drug therapy.",
        duration: 50,
      },
      {
        title: "High-Alert Medication Safety",
        description:
          "Understand safeguards for high-alert medications in ICU settings.",
        duration: 50,
      },
      {
        title: "ICU Pharmacology Case Review",
        description:
          "Apply medication-safety concepts to structured ICU cases.",
        duration: 55,
      },
    ],
    quiz: {
      title: "ICU Emergency Drugs Assessment",
      description:
        "Assessment covering medication safety and critical care pharmacology concepts.",
      questions: [
        {
          question: "High-alert medications require:",
          optionA: "Reduced monitoring",
          optionB: "Enhanced safety precautions",
          optionC: "No labeling",
          optionD: "Unverified administration",
          correctAnswer: "B",
          explanation:
            "High-alert medications require enhanced safeguards because errors can cause significant harm.",
        },
        {
          question: "Medication administration should be based on:",
          optionA: "Guessing",
          optionB: "Verified clinical orders and institutional protocols",
          optionC: "Social media",
          optionD: "Unverified messages",
          correctAnswer: "B",
          explanation:
            "Medication administration should follow verified orders and applicable protocols.",
        },
        {
          question: "Vasoactive medications generally require:",
          optionA: "No monitoring",
          optionB: "Close hemodynamic monitoring",
          optionC: "Only dietary monitoring",
          optionD: "No documentation",
          correctAnswer: "B",
          explanation:
            "Vasoactive medications can significantly affect hemodynamics and therefore require close monitoring.",
        },
        {
          question: "Medication reconciliation helps:",
          optionA: "Identify medication discrepancies",
          optionB: "Increase errors",
          optionC: "Avoid documentation",
          optionD: "Replace patient assessment",
          correctAnswer: "A",
          explanation:
            "Medication reconciliation helps identify discrepancies and supports medication safety.",
        },
        {
          question: "A medication error should be:",
          optionA: "Hidden",
          optionB: "Handled according to institutional safety and reporting procedures",
          optionC: "Ignored",
          optionD: "Deleted from records",
          correctAnswer: "B",
          explanation:
            "Medication incidents should be managed and reported according to applicable institutional procedures.",
        },
      ],
    },
  },

  // =========================================================
  // 7. CRITICAL CARE PROCEDURES
  // =========================================================
  {
    title: "Critical Care Procedures & Bedside Skills",
    slug: "critical-care-procedures-bedside-skills",
    description:
      "Structured practical course covering essential ICU bedside procedures, patient safety, airway care, vascular access concepts, catheter care, specimen collection and procedure documentation.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 2399,
    duration: 720,
    language: "Hindi + English",
    level: "Intermediate",
    rating: 4.9,
    students: 5400,
    lessons: [
      {
        title: "ICU Bedside Safety",
        description:
          "Understand safety checks before performing critical care procedures.",
        duration: 45,
      },
      {
        title: "Airway Care Principles",
        description:
          "Review safe airway care and monitoring principles.",
        duration: 50,
      },
      {
        title: "Endotracheal Tube Care",
        description:
          "Understand essential nursing care and monitoring considerations for airway devices.",
        duration: 55,
      },
      {
        title: "Tracheostomy Care",
        description:
          "Study general tracheostomy care and patient monitoring principles.",
        duration: 55,
      },
      {
        title: "Central Line Care",
        description:
          "Understand central venous access care and infection prevention.",
        duration: 60,
      },
      {
        title: "Urinary Catheter Care",
        description:
          "Learn catheter care and prevention of catheter-associated complications.",
        duration: 45,
      },
      {
        title: "NG Tube Care",
        description:
          "Review enteral tube care and patient safety considerations.",
        duration: 45,
      },
      {
        title: "Specimen Collection",
        description:
          "Understand safe collection, labeling and transport of clinical specimens.",
        duration: 45,
      },
      {
        title: "Pressure Injury Prevention",
        description:
          "Study risk assessment, repositioning and skin protection principles.",
        duration: 50,
      },
      {
        title: "Procedure Documentation",
        description:
          "Learn professional documentation following bedside procedures.",
        duration: 45,
      },
      {
        title: "Practical Case Workshop",
        description:
          "Integrate bedside safety and procedure principles using structured cases.",
        duration: 60,
      },
    ],
    quiz: {
      title: "Critical Care Bedside Skills Assessment",
      description:
        "Assessment of ICU procedure safety and bedside care principles.",
      questions: [
        {
          question: "Before a bedside procedure, the nurse should first:",
          optionA: "Skip patient identification",
          optionB: "Verify patient identity and procedure requirements",
          optionC: "Ignore equipment",
          optionD: "Avoid hand hygiene",
          correctAnswer: "B",
          explanation:
            "Patient identification and appropriate preparation are fundamental safety steps.",
        },
        {
          question: "Hand hygiene is important because it:",
          optionA: "Reduces transmission of microorganisms",
          optionB: "Increases infection risk",
          optionC: "Replaces sterile technique",
          optionD: "Is only required once per shift",
          correctAnswer: "A",
          explanation:
            "Hand hygiene is a key infection-prevention measure.",
        },
        {
          question: "Central line care requires attention to:",
          optionA: "Infection prevention",
          optionB: "Only room temperature",
          optionC: "Patient height",
          optionD: "Diet only",
          correctAnswer: "A",
          explanation:
            "Central venous access requires careful infection-prevention practices.",
        },
        {
          question: "Procedure documentation should be:",
          optionA: "Accurate and timely",
          optionB: "Optional",
          optionC: "Written from memory days later",
          optionD: "Incomplete",
          correctAnswer: "A",
          explanation:
            "Accurate and timely documentation supports continuity and patient safety.",
        },
        {
          question: "Pressure injury prevention includes:",
          optionA: "Regular risk assessment and appropriate repositioning",
          optionB: "Ignoring skin condition",
          optionC: "Avoiding patient assessment",
          optionD: "Keeping the patient immobile without assessment",
          correctAnswer: "A",
          explanation:
            "Risk assessment and appropriate repositioning are important preventive strategies.",
        },
      ],
    },
  },

  // =========================================================
  // 8. NEURO ICU
  // =========================================================
  {
    title: "Neuro ICU & Neurocritical Care Program",
    slug: "neuro-icu-neurocritical-care-program",
    description:
      "Professional Neuro ICU course covering neurological assessment, consciousness, stroke, seizures, traumatic brain injury, intracranial pressure concepts and neurocritical monitoring.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 2599,
    duration: 660,
    language: "Hindi + English",
    level: "Advanced",
    rating: 4.9,
    students: 4300,
    lessons: [
      {
        title: "Introduction to Neurocritical Care",
        description:
          "Understand the role and principles of neurological critical care.",
        duration: 45,
      },
      {
        title: "Neurological Assessment",
        description:
          "Learn systematic neurological assessment in critically ill patients.",
        duration: 55,
      },
      {
        title: "Glasgow Coma Scale",
        description:
          "Understand the components and clinical use of GCS.",
        duration: 45,
      },
      {
        title: "Pupil Assessment",
        description:
          "Review pupil examination and changes requiring urgent attention.",
        duration: 40,
      },
      {
        title: "Acute Stroke Care",
        description:
          "Study recognition and critical care priorities in acute stroke.",
        duration: 60,
      },
      {
        title: "Seizures and Status Epilepticus",
        description:
          "Understand recognition and critical care considerations.",
        duration: 55,
      },
      {
        title: "Traumatic Brain Injury",
        description:
          "Review major ICU considerations in traumatic brain injury.",
        duration: 60,
      },
      {
        title: "Intracranial Pressure Concepts",
        description:
          "Understand ICP concepts and neurological monitoring principles.",
        duration: 55,
      },
      {
        title: "Neuro ICU Monitoring",
        description:
          "Study important monitoring parameters in neurocritical care.",
        duration: 50,
      },
      {
        title: "Neurocritical Case Studies",
        description:
          "Apply assessment and monitoring principles to clinical cases.",
        duration: 65,
      },
    ],
    quiz: {
      title: "Neuro ICU Assessment",
      description:
        "Professional assessment covering neurocritical care fundamentals.",
      questions: [
        {
          question: "GCS is primarily used to assess:",
          optionA: "Level of consciousness",
          optionB: "Blood glucose only",
          optionC: "Kidney function",
          optionD: "Lung capacity",
          correctAnswer: "A",
          explanation:
            "The Glasgow Coma Scale assesses level of consciousness using eye, verbal and motor responses.",
        },
        {
          question: "Pupil assessment can provide information about:",
          optionA: "Neurological status",
          optionB: "Blood group",
          optionC: "Body weight",
          optionD: "Dietary preference",
          correctAnswer: "A",
          explanation:
            "Pupil size and reactivity can provide important neurological information.",
        },
        {
          question: "Acute neurological deterioration requires:",
          optionA: "Prompt assessment",
          optionB: "Delayed observation only",
          optionC: "No monitoring",
          optionD: "Routine discharge",
          correctAnswer: "A",
          explanation:
            "Acute neurological changes require prompt clinical assessment.",
        },
        {
          question: "Neurocritical care commonly includes:",
          optionA: "Neurological monitoring",
          optionB: "No vital-sign monitoring",
          optionC: "Only dietary assessment",
          optionD: "No documentation",
          correctAnswer: "A",
          explanation:
            "Neurological monitoring is a core component of neurocritical care.",
        },
        {
          question: "A systematic neurological assessment helps:",
          optionA: "Detect changes over time",
          optionB: "Eliminate all neurological disease",
          optionC: "Replace imaging",
          optionD: "Avoid communication",
          correctAnswer: "A",
          explanation:
            "Serial neurological assessments can help identify clinically important changes.",
        },
      ],
    },
  },

  // =========================================================
  // 9. CARDIAC ICU
  // =========================================================
  {
    title: "Cardiac ICU & Hemodynamic Monitoring Masterclass",
    slug: "cardiac-icu-hemodynamic-monitoring-masterclass",
    description:
      "Advanced Cardiac ICU program covering cardiac monitoring, hemodynamics, arrhythmias, acute coronary syndromes, heart failure, shock and critical care nursing priorities.",
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 2799,
    duration: 720,
    language: "Hindi + English",
    level: "Advanced",
    rating: 4.9,
    students: 3900,
    lessons: [
      {
        title: "Cardiac ICU Fundamentals",
        description:
          "Introduction to cardiac critical care and monitoring.",
        duration: 45,
      },
      {
        title: "Hemodynamic Monitoring",
        description:
          "Understand key hemodynamic parameters and clinical interpretation.",
        duration: 60,
      },
      {
        title: "Cardiac Rhythm Monitoring",
        description:
          "Review continuous rhythm monitoring in cardiac critical care.",
        duration: 50,
      },
      {
        title: "Acute Coronary Syndrome",
        description:
          "Study critical care principles for acute coronary syndromes.",
        duration: 60,
      },
      {
        title: "Heart Failure in ICU",
        description:
          "Understand monitoring and management concepts in acute heart failure.",
        duration: 60,
      },
      {
        title: "Cardiogenic Shock",
        description:
          "Recognize cardiogenic shock and understand critical care priorities.",
        duration: 60,
      },
      {
        title: "Arrhythmia Emergencies",
        description:
          "Review clinically important tachyarrhythmias and bradyarrhythmias.",
        duration: 55,
      },
      {
        title: "Vasoactive Support Concepts",
        description:
          "Understand basic principles of vasoactive support and monitoring.",
        duration: 55,
      },
      {
        title: "Cardiac ICU Nursing Priorities",
        description:
          "Organize monitoring and nursing priorities in high-acuity cardiac patients.",
        duration: 55,
      },
      {
        title: "Cardiac ICU Case Studies",
        description:
          "Apply hemodynamic and cardiac monitoring principles to structured cases.",
        duration: 70,
      },
    ],
    quiz: {
      title: "Cardiac ICU Assessment",
      description:
        "Advanced cardiac critical care assessment.",
      questions: [
        {
          question: "Hemodynamic monitoring primarily evaluates:",
          optionA: "Circulatory status",
          optionB: "Hair growth",
          optionC: "Dietary preference",
          optionD: "Height",
          correctAnswer: "A",
          explanation:
            "Hemodynamic monitoring evaluates cardiovascular and circulatory status.",
        },
        {
          question: "A common continuous cardiac monitoring method is:",
          optionA: "ECG monitoring",
          optionB: "Vision testing",
          optionC: "Hearing testing",
          optionD: "Skin color chart only",
          correctAnswer: "A",
          explanation:
            "Continuous ECG monitoring is commonly used in cardiac critical care.",
        },
        {
          question: "Cardiogenic shock is primarily associated with:",
          optionA: "Severe cardiac pump dysfunction",
          optionB: "Normal circulation",
          optionC: "Improved tissue perfusion",
          optionD: "Normal cardiac output",
          correctAnswer: "A",
          explanation:
            "Cardiogenic shock results from inadequate cardiac pump function leading to poor tissue perfusion.",
        },
        {
          question: "Acute coronary syndrome requires:",
          optionA: "Timely clinical evaluation",
          optionB: "No monitoring",
          optionC: "Delayed assessment",
          optionD: "Only dietary management",
          correctAnswer: "A",
          explanation:
            "Acute coronary syndromes require timely assessment and appropriate management.",
        },
        {
          question: "Continuous cardiac monitoring can help identify:",
          optionA: "Rhythm abnormalities",
          optionB: "Blood group",
          optionC: "Height",
          optionD: "Dietary habits",
          correctAnswer: "A",
          explanation:
            "Continuous ECG monitoring can identify clinically significant rhythm abnormalities.",
        },
      ],
    },
  },

  // =========================================================
  // 10. ADVANCED CRITICAL CARE NURSING
  // =========================================================
  {
    title: "Advanced Critical Care Nursing Program",
    slug: "advanced-critical-care-nursing-program",
    description:
      "Advanced professional critical care nursing program integrating assessment, respiratory care, cardiovascular monitoring, renal support concepts, infection control, documentation and clinical decision-making.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 3299,
    duration: 900,
    language: "Hindi + English",
    level: "Advanced",
    rating: 5.0,
    students: 3500,
    lessons: [
      {
        title: "Advanced ICU Assessment",
        description:
          "Advanced approach to systematic assessment of critically ill patients.",
        duration: 55,
      },
      {
        title: "Advanced Respiratory Care",
        description:
          "Integrate oxygenation, ventilation and respiratory monitoring concepts.",
        duration: 60,
      },
      {
        title: "Advanced Hemodynamic Monitoring",
        description:
          "Review cardiovascular monitoring and clinical trends.",
        duration: 65,
      },
      {
        title: "Renal Dysfunction in ICU",
        description:
          "Understand critical care considerations in acute kidney dysfunction.",
        duration: 55,
      },
      {
        title: "Fluid and Electrolyte Management",
        description:
          "Study principles of fluid balance and electrolyte monitoring.",
        duration: 60,
      },
      {
        title: "Nutrition in Critical Care",
        description:
          "Introduction to nutritional assessment and support concepts.",
        duration: 50,
      },
      {
        title: "Infection Prevention",
        description:
          "Advanced infection-prevention principles in ICU.",
        duration: 55,
      },
      {
        title: "Multiorgan Dysfunction",
        description:
          "Understand the concept and monitoring of multiorgan dysfunction.",
        duration: 60,
      },
      {
        title: "Clinical Documentation",
        description:
          "Professional clinical documentation and handover.",
        duration: 50,
      },
      {
        title: "Clinical Decision-Making",
        description:
          "Develop structured clinical reasoning and prioritization skills.",
        duration: 65,
      },
      {
        title: "Advanced ICU Case Studies",
        description:
          "Integrate multiple critical care concepts through structured cases.",
        duration: 80,
      },
    ],
    quiz: {
      title: "Advanced Critical Care Nursing Assessment",
      description:
        "Comprehensive advanced critical care nursing assessment.",
      questions: [
        {
          question: "Clinical prioritization is important because:",
          optionA: "All patient problems have identical urgency",
          optionB: "Life-threatening problems require timely attention",
          optionC: "Documentation is unnecessary",
          optionD: "Monitoring is optional",
          correctAnswer: "B",
          explanation:
            "Clinical prioritization helps address immediate threats to life and safety first.",
        },
        {
          question: "Fluid balance monitoring is particularly important in:",
          optionA: "Critically ill patients",
          optionB: "Only healthy athletes",
          optionC: "No patients",
          optionD: "Only outpatient billing",
          correctAnswer: "A",
          explanation:
            "Fluid balance is important in critically ill patients because fluid status can change rapidly.",
        },
        {
          question: "Clinical documentation should be:",
          optionA: "Accurate",
          optionB: "Fabricated",
          optionC: "Delayed unnecessarily",
          optionD: "Incomplete",
          correctAnswer: "A",
          explanation:
            "Accurate documentation supports patient safety and continuity of care.",
        },
        {
          question: "Multidisciplinary ICU care means:",
          optionA: "One professional works alone",
          optionB: "Different healthcare professionals collaborate",
          optionC: "Communication is avoided",
          optionD: "Monitoring is stopped",
          correctAnswer: "B",
          explanation:
            "Multidisciplinary collaboration is essential to comprehensive critical care.",
        },
        {
          question: "Clinical trends are useful because they:",
          optionA: "Can help identify changes in patient condition",
          optionB: "Have no clinical value",
          optionC: "Replace all examination",
          optionD: "Replace communication",
          correctAnswer: "A",
          explanation:
            "Trends can provide important information about changes in patient condition.",
        },
      ],
    },
  },

  // =========================================================
  // 11. SEPSIS & SHOCK
  // =========================================================
  {
    title: "Sepsis, Shock & Multiorgan Failure Masterclass",
    slug: "sepsis-shock-multiorgan-failure-masterclass",
    description:
      "Advanced critical care course covering sepsis recognition, shock physiology, perfusion assessment, organ dysfunction, monitoring and structured case-based learning.",
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 2899,
    duration: 690,
    language: "Hindi + English",
    level: "Advanced",
    rating: 4.9,
    students: 3100,
    lessons: [
      {
        title: "Introduction to Sepsis",
        description:
          "Understand the clinical concept of sepsis and critical illness.",
        duration: 45,
      },
      {
        title: "Recognition of Sepsis",
        description:
          "Study clinical assessment and recognition of deterioration.",
        duration: 50,
      },
      {
        title: "Perfusion Assessment",
        description:
          "Understand practical assessment of tissue perfusion.",
        duration: 55,
      },
      {
        title: "Hypovolemic Shock",
        description:
          "Review mechanisms and critical care considerations.",
        duration: 50,
      },
      {
        title: "Cardiogenic Shock",
        description:
          "Understand cardiac pump failure and critical care monitoring.",
        duration: 55,
      },
      {
        title: "Distributive Shock",
        description:
          "Study distributive shock and major clinical principles.",
        duration: 55,
      },
      {
        title: "Obstructive Shock",
        description:
          "Understand major mechanisms and recognition principles.",
        duration: 50,
      },
      {
        title: "Organ Dysfunction",
        description:
          "Recognize major signs of organ dysfunction in critical illness.",
        duration: 60,
      },
      {
        title: "Hemodynamic Monitoring in Shock",
        description:
          "Review monitoring and clinical trend assessment.",
        duration: 60,
      },
      {
        title: "Multiorgan Failure",
        description:
          "Understand the concept of progressive multiorgan dysfunction.",
        duration: 55,
      },
      {
        title: "Sepsis and Shock Case Studies",
        description:
          "Apply assessment and monitoring principles to structured cases.",
        duration: 75,
      },
    ],
    quiz: {
      title: "Sepsis & Shock Assessment",
      description:
        "Advanced assessment of sepsis, shock and organ dysfunction concepts.",
      questions: [
        {
          question: "Sepsis requires:",
          optionA: "Timely recognition and management",
          optionB: "No monitoring",
          optionC: "Delayed assessment",
          optionD: "Only dietary treatment",
          correctAnswer: "A",
          explanation:
            "Sepsis is a time-sensitive critical illness requiring timely recognition and management.",
        },
        {
          question: "Shock is associated with:",
          optionA: "Inadequate tissue perfusion",
          optionB: "Always normal perfusion",
          optionC: "Improved oxygen delivery",
          optionD: "No physiological changes",
          correctAnswer: "A",
          explanation:
            "Shock involves inadequate tissue perfusion and impaired cellular oxygen delivery.",
        },
        {
          question: "A key component of shock assessment is:",
          optionA: "Perfusion assessment",
          optionB: "Hair examination",
          optionC: "Height measurement only",
          optionD: "Dietary preference",
          correctAnswer: "A",
          explanation:
            "Assessment of perfusion is an important part of evaluating shock.",
        },
        {
          question: "Multiorgan dysfunction refers to:",
          optionA: "Dysfunction of multiple organ systems",
          optionB: "Normal organ function",
          optionC: "Only skin disease",
          optionD: "Only bone disease",
          correctAnswer: "A",
          explanation:
            "Multiorgan dysfunction involves impaired function across multiple organ systems.",
        },
        {
          question: "Clinical trends can help clinicians:",
          optionA: "Identify changes over time",
          optionB: "Avoid monitoring",
          optionC: "Replace all examination",
          optionD: "Stop communication",
          correctAnswer: "A",
          explanation:
            "Trends can help identify whether a patient's condition is improving or deteriorating.",
        },
      ],
    },
  },

  // =========================================================
  // 12. ICU INTERVIEW & VIVA
  // =========================================================
  {
    title: "ICU Nursing Interview & Clinical Viva Masterclass",
    slug: "icu-nursing-interview-clinical-viva-masterclass",
    description:
      "Professional preparation program for ICU nursing interviews, clinical viva, practical questions, ventilator questions, emergency scenarios, ECG, ABG and critical care decision-making.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=85",
    instructor: "Avinash Dubey",
    price: 1599,
    duration: 480,
    language: "Hindi + English",
    level: "All Levels",
    rating: 4.9,
    students: 4700,
    lessons: [
      {
        title: "ICU Interview Fundamentals",
        description:
          "Understand how to prepare for professional ICU nursing interviews.",
        duration: 35,
      },
      {
        title: "Common ICU Nursing Questions",
        description:
          "Practice frequently asked ICU nursing interview concepts.",
        duration: 45,
      },
      {
        title: "Ventilator Interview Questions",
        description:
          "Review common mechanical ventilation interview topics.",
        duration: 50,
      },
      {
        title: "ECG Interview Questions",
        description:
          "Practice structured ECG-related interview questions.",
        duration: 40,
      },
      {
        title: "ABG Interview Questions",
        description:
          "Practice ABG interpretation questions commonly discussed in clinical interviews.",
        duration: 40,
      },
      {
        title: "Emergency Scenario Questions",
        description:
          "Practice structured responses to emergency clinical scenarios.",
        duration: 50,
      },
      {
        title: "Drug and Medication Questions",
        description:
          "Review medication safety and critical care pharmacology questions.",
        duration: 40,
      },
      {
        title: "Practical ICU Viva",
        description:
          "Structured bedside viva preparation.",
        duration: 45,
      },
      {
        title: "Clinical Case Questions",
        description:
          "Practice reasoning through common ICU clinical cases.",
        duration: 55,
      },
      {
        title: "Final Mock Interview",
        description:
          "Comprehensive final practice assessment.",
        duration: 60,
      },
    ],
    quiz: {
      title: "ICU Interview & Viva Assessment",
      description:
        "Final preparation assessment for ICU nursing interview candidates.",
      questions: [
        {
          question: "A good clinical interview answer should be:",
          optionA: "Structured and clinically relevant",
          optionB: "Completely unrelated",
          optionC: "Based only on guessing",
          optionD: "Without explanation",
          correctAnswer: "A",
          explanation:
            "Structured, clinically relevant answers demonstrate understanding and professional reasoning.",
        },
        {
          question: "When answering an emergency scenario, the candidate should first consider:",
          optionA: "Immediate life-threatening priorities",
          optionB: "Salary negotiation",
          optionC: "Vacation plans",
          optionD: "Hospital cafeteria",
          correctAnswer: "A",
          explanation:
            "Emergency scenarios should be approached by prioritizing immediate threats to life and safety.",
        },
        {
          question: "A systematic ECG approach is useful because:",
          optionA: "It reduces the chance of missing important findings",
          optionB: "It eliminates all cardiac disease",
          optionC: "It replaces patient assessment",
          optionD: "It makes documentation unnecessary",
          correctAnswer: "A",
          explanation:
            "A systematic approach helps ensure important ECG features are reviewed.",
        },
        {
          question: "ABG interpretation should be:",
          optionA: "Systematic",
          optionB: "Random",
          optionC: "Based only on one value",
          optionD: "Ignored",
          correctAnswer: "A",
          explanation:
            "A structured approach improves the consistency of ABG interpretation.",
        },
        {
          question: "Professional ICU communication should be:",
          optionA: "Clear and patient-safety focused",
          optionB: "Incomplete",
          optionC: "Unstructured",
          optionD: "Avoided",
          correctAnswer: "A",
          explanation:
            "Clear communication is essential for safe critical care practice.",
        },
      ],
    },
  },
];

async function main() {
  console.log("🌱 Starting professional ICU Learning Portal seed...");

  // =========================================================
  // DELETE OLD QUIZ / COURSE DATA
  // =========================================================

  console.log("🧹 Removing old course data...");

  await prisma.quizAttemptAnswer.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();

  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();

  await prisma.enrollment.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.payment.deleteMany();

  await prisma.course.deleteMany();

  // =========================================================
  // CREATE COURSES
  // =========================================================

  for (const courseData of courses) {
    console.log(`📚 Creating: ${courseData.title}`);

    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        image: courseData.image,
        instructor: courseData.instructor,
        price: courseData.price,
        duration: courseData.duration,
        language: courseData.language,
        level: courseData.level,
        rating: courseData.rating,
        students: courseData.students,

        // IMPORTANT:
        // Every course is PREMIUM.
        isPremium: true,

        lessons: {
          create: courseData.lessons.map(
            (lesson, index) => ({
              title: lesson.title,
              description: lesson.description,

              // Videos will be added later.
              videoUrl: "",

              // Notes will be added later.
              notesUrl: "",

              duration: lesson.duration,
              lessonOrder: index + 1,
            })
          ),
        },

        quizzes: {
          create: {
            title: courseData.quiz.title,
            description: courseData.quiz.description,

            questions: {
              create:
                courseData.quiz.questions.map(
                  (question) => ({
                    question: question.question,
                    optionA: question.optionA,
                    optionB: question.optionB,
                    optionC: question.optionC,
                    optionD: question.optionD,
                    correctAnswer:
                      question.correctAnswer,
                    explanation:
                      question.explanation,
                    marks: 1,
                  })
                ),
            },
          },
        },
      },

      include: {
        lessons: true,
        quizzes: {
          include: {
            questions: true,
          },
        },
      },
    });

    console.log(
      `✅ ${course.title} created`
    );

    console.log(
      `   💰 Price: ₹${course.price.toLocaleString(
        "en-IN"
      )}`
    );

    console.log(
      `   📚 Lessons: ${course.lessons.length}`
    );

    console.log(
      `   📝 Quiz Questions: ${course.quizzes[0]?.questions.length ?? 0}`
    );

    console.log(
      `   👑 Premium: ${course.isPremium}`
    );
  }

  // =========================================================
  // FINAL VERIFICATION
  // =========================================================

  const totalCourses =
    await prisma.course.count();

  const totalLessons =
    await prisma.lesson.count();

  const totalQuizzes =
    await prisma.quiz.count();

  const totalQuestions =
    await prisma.quizQuestion.count();

  const premiumCourses =
    await prisma.course.count({
      where: {
        isPremium: true,
      },
    });

  const paidCourses =
    await prisma.course.count({
      where: {
        price: {
          gt: 0,
        },
      },
    });

  console.log("");
  console.log(
    "================================================="
  );
  console.log(
    "🎓 ICU LEARNING PORTAL - SEED COMPLETE"
  );
  console.log(
    "================================================="
  );

  console.log(
    `📚 Total Courses: ${totalCourses}`
  );

  console.log(
    `🎥 Total Lessons: ${totalLessons}`
  );

  console.log(
    `📝 Total Quizzes: ${totalQuizzes}`
  );

  console.log(
    `❓ Total Questions: ${totalQuestions}`
  );

  console.log(
    `👑 Premium Courses: ${premiumCourses}`
  );

  console.log(
    `💰 Paid Courses: ${paidCourses}`
  );

  console.log(
    "🔐 Free courses: 0"
  );

  console.log(
    "================================================="
  );

  if (
    totalCourses !== 12 ||
    premiumCourses !== 12 ||
    paidCourses !== 12
  ) {
    throw new Error(
      "❌ Premium course verification failed."
    );
  }

  console.log(
    "✅ All 12 courses are Premium and Paid."
  );

  console.log(
    "🔐 No automatic student enrollment was created."
  );

  console.log(
    "🎯 Next step: professional course images + video/notes LMS setup."
  );
}

main()
  .catch((error) => {
    console.error(
      "❌ Seed failed:"
    );

    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });