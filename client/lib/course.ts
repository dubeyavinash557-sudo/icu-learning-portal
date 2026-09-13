import prisma from "@/lib/prisma";

/*
 * Keep the course catalogue response lightweight.
 *
 * Important:
 * We only select the enrollment id because the frontend
 * currently uses enrollment count through:
 *
 * course.enrollments.length
 *
 * Loading complete enrollment records is unnecessary and
 * makes the courses page slower.
 */
const courseInclude = {
  lessons: {
    orderBy: {
      lessonOrder: "asc" as const,
    },
  },
  enrollments: {
    select: {
      id: true,
    },
  },
};

/**
 * Canonical LMS course catalogue.
 *
 * Prisma is the single source of truth.
 */
export async function getCourses() {
  return prisma.course.findMany({
    include: courseInclude,
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
 * Official premium course catalogue.
 */
export async function getPremiumCourses() {
  return prisma.course.findMany({
    where: {
      isPremium: true,
    },
    include: courseInclude,
    orderBy: {
      createdAt: "asc",
    },
  });
}

/**
 * Resolve course by stable database ID.
 */
export async function getCourseById(id: string) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    include: courseInclude,
  });
}

/**
 * Resolve course by public slug.
 *
 * Kept for legacy/external URLs.
 */
export async function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({
    where: {
      slug,
    },
    include: courseInclude,
  });
}

/**
 * Compatibility resolver.
 *
 * New internal links should use the course ID.
 * Existing slug-based URLs remain supported.
 */
export async function getCourseByIdOrSlug(value: string) {
  const courseById = await getCourseById(value);

  if (courseById) {
    return courseById;
  }

  return getCourseBySlug(value);
}