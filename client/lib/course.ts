import { cache } from "react";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

const COURSE_REVALIDATE_SECONDS = 60;

const courseCatalogueInclude = {
  _count: {
    select: {
      lessons: true,
      enrollments: true,
    },
  },
} as const;

const courseDetailSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  image: true,
  instructor: true,
  price: true,
  duration: true,
  language: true,
  level: true,
  rating: true,
  students: true,
  isPremium: true,
  createdAt: true,

  lessons: {
    orderBy: {
      lessonOrder: "asc" as const,
    },

    select: {
      id: true,
      title: true,
      description: true,
      videoUrl: true,
      notesUrl: true,
      duration: true,
      lessonOrder: true,
    },
  },
} as const;

const getCourseSlugByIdCached = unstable_cache(
  async (id: string) => {
    return prisma.course.findUnique({
      where: { id },

      select: {
        id: true,
        slug: true,
      },
    });
  },

  ["course-slug-by-id"],

  {
    revalidate: COURSE_REVALIDATE_SECONDS,
  }
);

const getCourseByIdCached = unstable_cache(
  async (id: string) => {
    return prisma.course.findUnique({
      where: { id },

      select: courseDetailSelect,
    });
  },

  ["course-detail-by-id"],

  {
    revalidate: COURSE_REVALIDATE_SECONDS,
  }
);

const getCourseBySlugCached = unstable_cache(
  async (slug: string) => {
    return prisma.course.findUnique({
      where: { slug },

      select: courseDetailSelect,
    });
  },

  ["course-detail-by-slug"],

  {
    revalidate: COURSE_REVALIDATE_SECONDS,
  }
);

const getCoursesCached = unstable_cache(
  async () => {
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
  },

  ["course-catalogue"],

  {
    revalidate: COURSE_REVALIDATE_SECONDS,
  }
);

const getPremiumCoursesCached = unstable_cache(
  async () => {
    return prisma.course.findMany({
      where: {
        isPremium: true,
      },

      include: courseCatalogueInclude,

      orderBy: {
        createdAt: "asc",
      },
    });
  },

  ["premium-course-catalogue"],

  {
    revalidate: COURSE_REVALIDATE_SECONDS,
  }
);

export const getCourses = cache(async () => {
  const courses = await getCoursesCached();

  return courses.map(({ _count, ...course }) => ({
    ...course,

    students: _count.enrollments,

    lessonCount: _count.lessons,
  }));
});

export const getPremiumCourses = cache(async () => {
  const courses = await getPremiumCoursesCached();

  return courses.map(({ _count, ...course }) => ({
    ...course,

    students: _count.enrollments,

    lessonCount: _count.lessons,
  }));
});

export const getCourseSlugById = cache(
  async (id: string) => {
    return getCourseSlugByIdCached(id);
  }
);

export const getCourseById = cache(
  async (id: string) => {
    return getCourseByIdCached(id);
  }
);

export const getCourseBySlug = cache(
  async (slug: string) => {
    return getCourseBySlugCached(slug);
  }
);

export const getCourseByIdOrSlug = cache(
  async (value: string) => {
    const courseBySlug =
      await getCourseBySlug(value);

    if (courseBySlug) {
      return courseBySlug;
    }

    const courseById =
      await getCourseSlugById(value);

    if (!courseById) {
      return null;
    }

    return getCourseBySlug(
      courseById.slug
    );
  }
);