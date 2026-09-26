import type { MetadataRoute } from "next";

import { getCourses } from "@/lib/course";

const SITE_URL = "https://iculearningportal.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${SITE_URL}/courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    {
      url: `${SITE_URL}/certificate-sample`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${SITE_URL}/refund`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  let coursePages: MetadataRoute.Sitemap = [];

  try {
    const courses = await getCourses();

    coursePages = courses
      .filter(
        (course) =>
          typeof course.slug === "string" &&
          course.slug.trim().length > 0,
      )
      .map((course) => ({
        url: `${SITE_URL}/courses/${course.slug}`,
        lastModified: course.createdAt ?? now,
        changeFrequency: "weekly" as const,
        priority: course.isPremium ? 0.9 : 0.8,
      }));
  } catch (error) {
    console.error(
      "SITEMAP COURSE LOAD FAILED:",
      error,
    );

    /*
     * Keep the sitemap available even if the database is
     * temporarily unavailable.
     */
    coursePages = [];
  }

  return [
    ...staticPages,
    ...coursePages,
  ];
}