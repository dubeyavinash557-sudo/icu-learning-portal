import type { MetadataRoute } from "next";

import { getCourses } from "@/lib/course";

const SITE_URL = "https://www.iculearningportal.com";

export const runtime = "nodejs";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/courses`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/certificate-sample`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund`,
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
      .map((course) => {
        const slug = course.slug.trim();

        return {
          url: `${SITE_URL}/courses/${slug}`,
          changeFrequency: "weekly" as const,
          priority: course.isPremium ? 0.9 : 0.8,
        };
      });
  } catch (error) {
    console.error("SITEMAP COURSE LOAD FAILED:", error);
    coursePages = [];
  }

  return [...staticPages, ...coursePages];
}