import prisma from "@/lib/prisma";

/*
 * Lightweight course data for the public course catalogue.
 *
 * IMPORTANT:
 * Do not load all lessons or complete enrollment records here.
 * The public /courses page only needs:
 *
 * - course information
 * - lesson count
 * - enrollment count
 *
 * Full lessons are loaded only on the course detail page.
 */
const courseCatalogueInclude = {
  _count: {
    select: {
      lessons: true,
      enrollments: true,
    },
  },
};

/*
 * Full course data for course detail and learning pages.
 */
const courseDetailInclude = {
  lessons: {
    orderBy: {
      lessonOrder: "asc" as const,
    },
  },
  enrollments: {
    select: {
      id: true,
      userId: true,
      courseId: true,
      progress: true,
      completed: true,
    },
  },
};

/**
 * Lightweight public course catalogue.
 *
 * This query intentionally does not load every lesson.
 * It only loads counts, which is much faster.
 */
export async function getCourses() {
  return prisma.course.findMany({
    include: courseCatalogueInclude,
    orderBy: [
      {
        isPremium: "desc",
      },
      {
        createdAt: "asc",
      },
    ],
  });
}

/**
 * Lightweight premium course catalogue.
 */
export async function getPremiumCourses() {
  return prisma.course.findMany({
    where: {
      isPremium: true,
    },
    include: courseCatalogueInclude,
    orderBy: {
      createdAt: "asc",
    },
  });
}

/**
 * Full course data by database ID.
 *
 * Lessons are loaded here because the course detail page
 * needs the complete curriculum.
 */
export async function getCourseById(id: string) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    include: courseDetailInclude,
  });
}

/**
 * Full course data by public slug.
 */
export async function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({
    where: {
      slug,
    },
    include: courseDetailInclude,
  });
}

/**
 * Resolve course by ID or slug.
 */
export async function getCourseByIdOrSlug(value: string) {
  const courseById = await getCourseById(value);

  if (courseById) {
    return courseById;
  }

  return getCourseBySlug(value);
}