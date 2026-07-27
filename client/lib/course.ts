import prisma from "@/lib/prisma";

export async function getCourses() {
  return await prisma.course.findMany({
    include: {
      lessons: {
        orderBy: {
          lessonOrder: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCourseBySlug(slug: string) {
  return await prisma.course.findUnique({
    where: {
      slug,
    },
    include: {
      lessons: {
        orderBy: {
          lessonOrder: "asc",
        },
      },
    },
  });
}