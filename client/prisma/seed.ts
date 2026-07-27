import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Remove old data
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();

  // Create ICU Course
  const course = await prisma.course.create({
    data: {
      title: "ICU Nursing Master Course",
      slug: "icu-nursing-master-course",
      description:
        "Complete ICU Nursing course from beginner to advanced level.",
      price: 999,
      isPremium: true,

      lessons: {
        create: [
          {
            lessonOrder: 1,
            title: "ICU Introduction",
            description: "Introduction to ICU environment.",
            duration: 18,
            videoUrl: "https://www.youtube.com/watch?v=video1",
            notesUrl: "/notes/icu-introduction.pdf",
          },
          {
            lessonOrder: 2,
            title: "Patient Assessment",
            description: "Primary patient assessment.",
            duration: 22,
            videoUrl: "https://www.youtube.com/watch?v=video2",
            notesUrl: "/notes/patient-assessment.pdf",
          },
          {
            lessonOrder: 3,
            title: "Vital Signs Monitoring",
            description: "Monitoring ICU patients.",
            duration: 25,
            videoUrl: "https://www.youtube.com/watch?v=video3",
            notesUrl: "/notes/vital-signs.pdf",
          },
          {
            lessonOrder: 4,
            title: "Ventilator Basics",
            description: "Mechanical ventilation basics.",
            duration: 32,
            videoUrl: "https://www.youtube.com/watch?v=video4",
            notesUrl: "/notes/ventilator.pdf",
          },
          {
            lessonOrder: 5,
            title: "ABG Interpretation",
            description: "Understanding arterial blood gas.",
            duration: 28,
            videoUrl: "https://www.youtube.com/watch?v=video5",
            notesUrl: "/notes/abg.pdf",
          },
          {
            lessonOrder: 6,
            title: "ECG Basics",
            description: "Learn ECG interpretation.",
            duration: 30,
            videoUrl: "https://www.youtube.com/watch?v=video6",
            notesUrl: "/notes/ecg.pdf",
          },
          {
            lessonOrder: 7,
            title: "Emergency Drugs",
            description: "Common ICU emergency drugs.",
            duration: 26,
            videoUrl: "https://www.youtube.com/watch?v=video7",
            notesUrl: "/notes/drugs.pdf",
          },
          {
            lessonOrder: 8,
            title: "Shock Management",
            description: "Types and treatment of shock.",
            duration: 34,
            videoUrl: "https://www.youtube.com/watch?v=video8",
            notesUrl: "/notes/shock.pdf",
          },
          {
            lessonOrder: 9,
            title: "Sepsis Management",
            description: "Early recognition and treatment.",
            duration: 31,
            videoUrl: "https://www.youtube.com/watch?v=video9",
            notesUrl: "/notes/sepsis.pdf",
          },
          {
            lessonOrder: 10,
            title: "ICU Infection Control",
            description: "Preventing hospital-acquired infection.",
            duration: 20,
            videoUrl: "https://www.youtube.com/watch?v=video10",
            notesUrl: "/notes/infection-control.pdf",
          },
        ],
      },
    },
  });

  console.log("✅ Course created:", course.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });