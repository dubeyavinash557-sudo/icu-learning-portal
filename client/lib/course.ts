import prisma from "@/lib/prisma";

const courseCatalogueInclude = {
  _count: {
    select: {
      lessons: true,
      enrollments: true,
    },
  },
};

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

export async function getCourses() {
  const courses = await prisma.course.findMany({
    include: courseCatalogueInclude,
    orderBy: [
      { isPremium: "desc" },
      { createdAt: "asc" },
    ],
  });

  return courses.map(({ _count, ...course }) => ({
    ...course,
    students: _count.enrollments,
    lessonCount: _count.lessons,
  }));
}

export async function getPremiumCourses() {
  const courses = await prisma.course.findMany({
    where: {
      isPremium: true,
    },
    include: courseCatalogueInclude,
    orderBy: {
      createdAt: "asc",
    },
  });

  return courses.map(({ _count, ...course }) => ({
    ...course,
    students: _count.enrollments,
    lessonCount: _count.lessons,
  }));
}

export async function getCourseById(id: string) {
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: courseDetailInclude,
  });

  if (!course) {
    return null;
  }

  return {
    ...course,
    students: course.enrollments.length,
    lessonCount: course.lessons.length,
  };
}

export async function getCourseBySlug(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    include: courseDetailInclude,
  });

  if (!course) {
    return null;
  }

  return {
    ...course,
    students: course.enrollments.length,
    lessonCount: course.lessons.length,
  };
}

export async function getCourseByIdOrSlug(value: string) {
  const courseById = await getCourseById(value);

  if (courseById) {
    return courseById;
  }

  return getCourseBySlug(value);
}