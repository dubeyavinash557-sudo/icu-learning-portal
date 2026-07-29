import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Delete old data

  await prisma.lesson.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.course.deleteMany();

  // ICU Nursing Course

  const icuCourse = await prisma.course.create({
    data: {
      title: "ICU Nursing Master Course",
      slug: "icu-nursing-master-course",
      description:
        "Complete ICU Nursing course from beginner to advanced level with practical ICU management, ventilator care, ECG, ABG and emergency management.",

      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200",

      instructor: "Avinash Dubey",

      price: 999,

      rating: 4.9,

      students: 10542,

      duration: 266,

      language: "Hindi",

      level: "Beginner",

      isPremium: true,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "ICU Introduction",
        description: "Introduction to ICU environment.",
        videoUrl: "",
        notesUrl: "",
        duration: 18,
        lessonOrder: 1,
        courseId: icuCourse.id,
      },
      {
        title: "Patient Assessment",
        description: "Primary patient assessment.",
        videoUrl: "",
        notesUrl: "",
        duration: 22,
        lessonOrder: 2,
        courseId: icuCourse.id,
      },
      {
        title: "Vital Signs Monitoring",
        description: "Monitoring ICU patients.",
        videoUrl: "",
        notesUrl: "",
        duration: 25,
        lessonOrder: 3,
        courseId: icuCourse.id,
      },
      {
        title: "Ventilator Basics",
        description: "Mechanical ventilation basics.",
        videoUrl: "",
        notesUrl: "",
        duration: 32,
        lessonOrder: 4,
        courseId: icuCourse.id,
      },
      {
        title: "ABG Interpretation",
        description: "Understanding arterial blood gas.",
        videoUrl: "",
        notesUrl: "",
        duration: 28,
        lessonOrder: 5,
        courseId: icuCourse.id,
      },
      {
        title: "ECG Basics",
        description: "Learn ECG interpretation.",
        videoUrl: "",
        notesUrl: "",
        duration: 30,
        lessonOrder: 6,
        courseId: icuCourse.id,
      },
      {
        title: "Emergency Drugs",
        description: "Common ICU emergency drugs.",
        videoUrl: "",
        notesUrl: "",
        duration: 26,
        lessonOrder: 7,
        courseId: icuCourse.id,
      },
      {
        title: "Shock Management",
        description: "Types and treatment of shock.",
        videoUrl: "",
        notesUrl: "",
        duration: 34,
        lessonOrder: 8,
        courseId: icuCourse.id,
      },
      {
        title: "Sepsis Management",
        description: "Early recognition and treatment.",
        videoUrl: "",
        notesUrl: "",
        duration: 31,
        lessonOrder: 9,
        courseId: icuCourse.id,
      },
      {
        title: "ICU Infection Control",
        description: "Preventing hospital-acquired infection.",
        videoUrl: "",
        notesUrl: "",
        duration: 20,
        lessonOrder: 10,
        courseId: icuCourse.id,
      },
    ],
  });

  // Ventilator Course
    const ventilatorCourse = await prisma.course.create({
    data: {
      title: "Mechanical Ventilator Master Course",
      slug: "mechanical-ventilator-master-course",
      description:
        "Complete ventilator management from beginner to advanced with practical ICU cases.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200",
      instructor: "Avinash Dubey",
      price: 1499,
      rating: 4.8,
      students: 8250,
      duration: 320,
      language: "Hindi",
      level: "Intermediate",
      isPremium: true,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "Ventilator Introduction",
        description: "Basics of mechanical ventilation.",
        videoUrl: "",
        notesUrl: "",
        duration: 22,
        lessonOrder: 1,
        courseId: ventilatorCourse.id,
      },
      {
        title: "Ventilator Modes",
        description: "VCV, PCV, SIMV, CPAP.",
        videoUrl: "",
        notesUrl: "",
        duration: 35,
        lessonOrder: 2,
        courseId: ventilatorCourse.id,
      },
      {
        title: "PEEP & FiO2",
        description: "Setting oxygen parameters.",
        videoUrl: "",
        notesUrl: "",
        duration: 30,
        lessonOrder: 3,
        courseId: ventilatorCourse.id,
      },
      {
        title: "Ventilator Alarms",
        description: "High & Low pressure alarms.",
        videoUrl: "",
        notesUrl: "",
        duration: 28,
        lessonOrder: 4,
        courseId: ventilatorCourse.id,
      },
      {
        title: "Weaning",
        description: "How to wean ICU patients.",
        videoUrl: "",
        notesUrl: "",
        duration: 34,
        lessonOrder: 5,
        courseId: ventilatorCourse.id,
      },
    ],
  });

  // ECG Course

  const ecgCourse = await prisma.course.create({
    data: {
      title: "ECG Interpretation Master Course",
      slug: "ecg-interpretation-master-course",
      description:
        "Master ECG interpretation from basic rhythm recognition to advanced cardiac emergencies.",
      image:
        "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200",
      instructor: "Avinash Dubey",
      price: 799,
      rating: 4.9,
      students: 6400,
      duration: 210,
      language: "Hindi",
      level: "Beginner",
      isPremium: true,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "ECG Basics",
        description: "Understanding ECG paper.",
        videoUrl: "",
        notesUrl: "",
        duration: 20,
        lessonOrder: 1,
        courseId: ecgCourse.id,
      },
      {
        title: "Normal ECG",
        description: "Recognize normal rhythm.",
        videoUrl: "",
        notesUrl: "",
        duration: 24,
        lessonOrder: 2,
        courseId: ecgCourse.id,
      },
      {
        title: "Arrhythmias",
        description: "Identify common arrhythmias.",
        videoUrl: "",
        notesUrl: "",
        duration: 32,
        lessonOrder: 3,
        courseId: ecgCourse.id,
      },
      {
        title: "Heart Blocks",
        description: "First, second & third degree block.",
        videoUrl: "",
        notesUrl: "",
        duration: 30,
        lessonOrder: 4,
        courseId: ecgCourse.id,
      },
      {
        title: "STEMI Recognition",
        description: "Identify myocardial infarction.",
        videoUrl: "",
        notesUrl: "",
        duration: 35,
        lessonOrder: 5,
        courseId: ecgCourse.id,
      },
    ],
  });

     // ABG Course

  const abgCourse = await prisma.course.create({
    data: {
      title: "ABG Analysis Master Course",
      slug: "abg-analysis-master-course",
      description:
        "Learn Arterial Blood Gas interpretation from basic to advanced with ICU case studies.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200",
      instructor: "Avinash Dubey",
      price: 699,
      rating: 4.8,
      students: 5200,
      duration: 180,
      language: "Hindi",
      level: "Beginner",
      isPremium: true,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "ABG Introduction",
        description: "What is ABG?",
        videoUrl: "",
        notesUrl: "",
        duration: 18,
        lessonOrder: 1,
        courseId: abgCourse.id,
      },
      {
        title: "Normal Values",
        description: "Understand ABG normal ranges.",
        videoUrl: "",
        notesUrl: "",
        duration: 24,
        lessonOrder: 2,
        courseId: abgCourse.id,
      },
      {
        title: "Acidosis",
        description: "Respiratory & Metabolic Acidosis.",
        videoUrl: "",
        notesUrl: "",
        duration: 30,
        lessonOrder: 3,
        courseId: abgCourse.id,
      },
      {
        title: "Alkalosis",
        description: "Respiratory & Metabolic Alkalosis.",
        videoUrl: "",
        notesUrl: "",
        duration: 28,
        lessonOrder: 4,
        courseId: abgCourse.id,
      },
      {
        title: "ICU Case Studies",
        description: "Real ICU ABG practice cases.",
        videoUrl: "",
        notesUrl: "",
        duration: 35,
        lessonOrder: 5,
        courseId: abgCourse.id,
      },
    ],
  });

  // Medical Coding Course

  const codingCourse = await prisma.course.create({
    data: {
      title: "Medical Coding Master Course",
      slug: "medical-coding-master-course",
      description:
        "Complete Medical Coding training including ICD-10-CM, CPT, HCPCS and real-world coding practice.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
      instructor: "Avinash Dubey",
      price: 1999,
      rating: 5.0,
      students: 3100,
      duration: 420,
      language: "Hindi",
      level: "Advanced",
      isPremium: true,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "Medical Coding Introduction",
        description: "Overview of medical coding.",
        videoUrl: "",
        notesUrl: "",
        duration: 20,
        lessonOrder: 1,
        courseId: codingCourse.id,
      },
      {
        title: "ICD-10-CM",
        description: "Diagnosis coding guidelines.",
        videoUrl: "",
        notesUrl: "",
        duration: 35,
        lessonOrder: 2,
        courseId: codingCourse.id,
      },
      {
        title: "CPT Coding",
        description: "Procedure coding basics.",
        videoUrl: "",
        notesUrl: "",
        duration: 40,
        lessonOrder: 3,
        courseId: codingCourse.id,
      },
      {
        title: "HCPCS Coding",
        description: "HCPCS Level II codes.",
        videoUrl: "",
        notesUrl: "",
        duration: 32,
        lessonOrder: 4,
        courseId: codingCourse.id,
      },
      {
        title: "Mock Coding Practice",
        description: "Real patient coding exercises.",
        videoUrl: "",
        notesUrl: "",
        duration: 45,
        lessonOrder: 5,
        courseId: codingCourse.id,
      },
    ],
  });

    // ----------------------
// Create Enrollment
// ----------------------

const user = await prisma.user.findFirst();

if (user) {
  await prisma.enrollment.createMany({
    data: [
      {
        userId: user.id,
        courseId: icuCourse.id,
        progress: 43,
      },
      {
        userId: user.id,
        courseId: ventilatorCourse.id,
        progress: 44,
      },
      {
        userId: user.id,
        courseId: ecgCourse.id,
        progress: 25,
      },
      {
        userId: user.id,
        courseId: abgCourse.id,
        progress: 45,
      },
      {
        userId: user.id,
        courseId: codingCourse.id,
        progress: 10,
      },
    ],
  });

  console.log("✅ User enrolled in all courses");
}

    console.log("✅ Database seeded successfully");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });