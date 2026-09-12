import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const demoVideoUrl =
  "https://www.youtube.com/embed/ScMzIvxBSi4";

async function main() {
  console.log("Starting demo course seeding...");

  const demoCourses = [
    {
      title: "ICU Nursing Free Demo",
      slug: "icu-nursing-free-demo",
      description:
        "ICU Nursing Free Demo is a beginner-friendly Hindi + English course for nursing students and healthcare professionals.\n\nइस demo course में ICU nursing की basic knowledge, patient monitoring, vital signs, infection control, emergency care और critical-care nursing fundamentals समझाए जाएंगे.\n\nThis course introduces the basic responsibilities of an ICU nurse through simple explanations, practical examples and structured learning.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&q=85",
      instructor: "Avinash Dubey",
      price: 0,
      duration: 60,
      language: "Hindi + English",
      level: "Beginner",
      rating: 5,
      students: 0,
      isPremium: false,
      lessons: [
        {
          title: "Introduction to ICU Nursing | ICU नर्सिंग परिचय",
          description:
            "Learn the basic ICU environment, ICU team, patient safety and the role of an ICU nurse.\n\nइस lesson में ICU का परिचय, ICU nurse की responsibilities और basic patient safety समझाई जाएगी.",
          duration: 10,
          lessonOrder: 1,
        },
        {
          title: "Vital Signs Monitoring | Vital Signs की Monitoring",
          description:
            "Understand temperature, pulse, respiration, blood pressure and oxygen saturation monitoring.\n\nइस lesson में vital signs और SpO₂ monitoring के basic concepts समझाए जाएंगे.",
          duration: 15,
          lessonOrder: 2,
        },
        {
          title: "Infection Prevention | Infection Control",
          description:
            "Learn hand hygiene, PPE, aseptic technique and basic infection prevention practices in ICU.\n\nइस lesson में hand hygiene, PPE और infection prevention की जानकारी दी जाएगी.",
          duration: 15,
          lessonOrder: 3,
        },
        {
          title: "Basic ICU Emergency Responsibilities",
          description:
            "Understand the basic nursing responsibilities during an ICU emergency and the importance of immediate escalation.",
          duration: 20,
          lessonOrder: 4,
        },
      ],
      quiz: {
        title: "ICU Nursing Free Demo Quiz",
        description:
          "Basic Hindi + English assessment for ICU nursing beginners.",
        questions: [
          {
            question:
              "What is the main purpose of ICU monitoring? | ICU monitoring का मुख्य उद्देश्य क्या है?",
            optionA: "Entertainment",
            optionB: "Early recognition of patient deterioration",
            optionC: "Replacing all clinical assessment",
            optionD: "Reducing patient care",
            correctAnswer: "B",
            explanation:
              "Continuous monitoring helps identify clinical deterioration early.",
          },
          {
            question:
              "Which parameter is commonly monitored using a pulse oximeter?",
            optionA: "Blood group",
            optionB: "Oxygen saturation",
            optionC: "Height",
            optionD: "Weight",
            correctAnswer: "B",
            explanation:
              "A pulse oximeter commonly measures peripheral oxygen saturation, or SpO₂.",
          },
          {
            question:
              "Which practice is important for infection prevention?",
            optionA: "Hand hygiene",
            optionB: "Ignoring PPE",
            optionC: "Reusing contaminated gloves",
            optionD: "Skipping cleaning",
            correctAnswer: "A",
            explanation:
              "Hand hygiene is one of the most important infection prevention practices.",
          },
          {
            question:
              "What should an ICU nurse do when a patient's condition deteriorates?",
            optionA: "Ignore the change",
            optionB: "Immediately assess and escalate appropriately",
            optionC: "Wait until discharge",
            optionD: "Stop monitoring",
            correctAnswer: "B",
            explanation:
              "The nurse should assess the patient and promptly escalate according to the clinical situation and hospital protocol.",
          },
          {
            question:
              "ICU care generally requires which approach?",
            optionA: "Only one person",
            optionB: "Multidisciplinary teamwork",
            optionC: "No documentation",
            optionD: "No monitoring",
            correctAnswer: "B",
            explanation:
              "Critical care requires coordinated multidisciplinary teamwork.",
          },
        ],
      },
    },

    {
      title: "Mechanical Ventilation Free Demo",
      slug: "mechanical-ventilation-free-demo",
      description:
        "Mechanical Ventilation Free Demo is a Hindi + English introductory course for nursing students and ICU professionals.\n\nइस demo में ventilator का basic introduction, important terms, oxygen support, PEEP, ventilator alarms और patient safety के concepts समझाए जाएंगे.\n\nThis is an introductory educational course and does not replace hospital training, clinical supervision or local protocols.",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&q=85",
      instructor: "Avinash Dubey",
      price: 0,
      duration: 60,
      language: "Hindi + English",
      level: "Beginner",
      rating: 5,
      students: 0,
      isPremium: false,
      lessons: [
        {
          title:
            "Introduction to Mechanical Ventilation | Ventilator का परिचय",
          description:
            "Understand why mechanical ventilation is used and the basic purpose of ventilatory support.",
          duration: 15,
          lessonOrder: 1,
        },
        {
          title: "Basic Ventilator Terms | Important Terminology",
          description:
            "Learn tidal volume, respiratory rate, minute ventilation, FiO₂ and airway pressure.",
          duration: 15,
          lessonOrder: 2,
        },
        {
          title: "PEEP and FiO₂ Basics",
          description:
            "Understand the introductory concepts of PEEP and inspired oxygen concentration.",
          duration: 15,
          lessonOrder: 3,
        },
        {
          title: "Basic Ventilator Alarm Awareness",
          description:
            "Learn why ventilator alarms require immediate attention and patient assessment.",
          duration: 15,
          lessonOrder: 4,
        },
      ],
      quiz: {
        title: "Mechanical Ventilation Free Demo Quiz",
        description:
          "Basic Hindi + English quiz on mechanical ventilation.",
        questions: [
          {
            question: "What does PEEP stand for?",
            optionA: "Positive End Expiratory Pressure",
            optionB: "Pulmonary Emergency Expiratory Pressure",
            optionC: "Positive Emergency Exchange Pressure",
            optionD: "Pressure End Expiratory Pulse",
            correctAnswer: "A",
            explanation:
              "PEEP means Positive End Expiratory Pressure.",
          },
          {
            question: "What is the approximate oxygen concentration in room air?",
            optionA: "10%",
            optionB: "21%",
            optionC: "50%",
            optionD: "100%",
            correctAnswer: "B",
            explanation:
              "Room air contains approximately 21% oxygen.",
          },
          {
            question: "Tidal volume refers to:",
            optionA: "Amount of gas delivered in one breath",
            optionB: "Heart rate",
            optionC: "Blood pressure",
            optionD: "Body temperature",
            correctAnswer: "A",
            explanation:
              "Tidal volume is the amount of gas delivered during one breath.",
          },
          {
            question: "A high-pressure alarm may be associated with:",
            optionA: "Airway obstruction",
            optionB: "Normal room temperature",
            optionC: "Patient identity",
            optionD: "Hospital billing",
            correctAnswer: "A",
            explanation:
              "Airway obstruction, secretions, coughing and reduced compliance may contribute to high airway pressure.",
          },
          {
            question: "When a ventilator alarm sounds, the first priority is:",
            optionA: "Ignore the alarm",
            optionB: "Assess the patient and ventilator safely",
            optionC: "Switch off all monitoring",
            optionD: "Leave the ICU",
            correctAnswer: "B",
            explanation:
              "The patient should be assessed immediately while following hospital emergency protocols.",
          },
        ],
      },
    },

    {
      title: "ECG Interpretation Free Demo",
      slug: "ecg-interpretation-free-demo",
      description:
        "ECG Interpretation Free Demo is a beginner-friendly Hindi + English course for nursing students and healthcare professionals.\n\nइस demo में ECG paper, heart rate, P wave, QRS complex, T wave और basic rhythm interpretation समझाया जाएगा.\n\nThe course provides an introductory framework for ECG learning and does not replace supervised clinical education.",
      image:
        "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1600&q=85",
      instructor: "Avinash Dubey",
      price: 0,
      duration: 60,
      language: "Hindi + English",
      level: "Beginner",
      rating: 5,
      students: 0,
      isPremium: false,
      lessons: [
        {
          title: "ECG Introduction | ECG का परिचय",
          description:
            "Understand the purpose of ECG and the basic electrical activity of the heart.",
          duration: 15,
          lessonOrder: 1,
        },
        {
          title: "ECG Paper and Calibration",
          description:
            "Learn the basic ECG paper layout, calibration and important measurements.",
          duration: 15,
          lessonOrder: 2,
        },
        {
          title: "P Wave, QRS Complex and T Wave",
          description:
            "Understand the basic components of a normal ECG.",
          duration: 15,
          lessonOrder: 3,
        },
        {
          title: "Basic Rhythm Interpretation",
          description:
            "Learn a simple systematic approach to rate, rhythm and ECG observation.",
          duration: 15,
          lessonOrder: 4,
        },
      ],
      quiz: {
        title: "ECG Interpretation Free Demo Quiz",
        description:
          "Basic Hindi + English ECG interpretation assessment.",
        questions: [
          {
            question: "The P wave represents:",
            optionA: "Atrial depolarization",
            optionB: "Ventricular depolarization",
            optionC: "Ventricular repolarization",
            optionD: "Cardiac output",
            correctAnswer: "A",
            explanation:
              "The P wave represents atrial depolarization.",
          },
          {
            question: "The QRS complex primarily represents:",
            optionA: "Atrial depolarization",
            optionB: "Ventricular depolarization",
            optionC: "Atrial filling",
            optionD: "Blood pressure",
            correctAnswer: "B",
            explanation:
              "The QRS complex primarily represents ventricular depolarization.",
          },
          {
            question: "The T wave represents:",
            optionA: "Atrial contraction",
            optionB: "Ventricular repolarization",
            optionC: "Ventricular filling",
            optionD: "Cardiac output",
            correctAnswer: "B",
            explanation:
              "The T wave represents ventricular repolarization.",
          },
          {
            question: "Which factor is important during rhythm interpretation?",
            optionA: "Regularity",
            optionB: "Hair colour",
            optionC: "Height",
            optionD: "Blood group only",
            correctAnswer: "A",
            explanation:
              "Regularity is an important part of systematic rhythm interpretation.",
          },
          {
            question: "A systematic ECG approach helps to:",
            optionA: "Reduce missed findings",
            optionB: "Replace clinical assessment",
            optionC: "Remove every emergency",
            optionD: "Avoid documentation",
            correctAnswer: "A",
            explanation:
              "A systematic approach helps reduce missed findings.",
          },
        ],
      },
    },
  ];

  for (const courseData of demoCourses) {
    const course = await prisma.course.upsert({
      where: {
        slug: courseData.slug,
      },
      update: {
        title: courseData.title,
        description: courseData.description,
        image: courseData.image,
        instructor: courseData.instructor,
        price: courseData.price,
        duration: courseData.duration,
        language: courseData.language,
        level: courseData.level,
        rating: courseData.rating,
        students: courseData.students,
        isPremium: courseData.isPremium,
      },
      create: {
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
        isPremium: courseData.isPremium,
      },
    });

    await prisma.lesson.deleteMany({
      where: {
        courseId: course.id,
      },
    });

    await prisma.quiz.deleteMany({
      where: {
        courseId: course.id,
      },
    });

    await prisma.lesson.createMany({
      data: courseData.lessons.map((lesson) => ({
        title: lesson.title,
        description: lesson.description,
        videoUrl: demoVideoUrl,
        notesUrl: null,
        duration: lesson.duration,
        lessonOrder: lesson.lessonOrder,
        courseId: course.id,
      })),
    });

    const quiz = await prisma.quiz.create({
      data: {
        title: courseData.quiz.title,
        description: courseData.quiz.description,
        courseId: course.id,
      },
    });

    await prisma.quizQuestion.createMany({
      data: courseData.quiz.questions.map((question) => ({
        quizId: quiz.id,
        question: question.question,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        marks: 1,
      })),
    });

    console.log(`Created or updated: ${course.title}`);
  }

  console.log("All demo courses were seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Demo course seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });