import type { MetadataRoute } from "next";

import { getCourses } from "@/lib/course";

const SITE_URL = "https://iculearningportal.com";

export const runtime = "nodejs";

/*
 * Keep the sitemap cached and periodically regenerated instead of
 * forcing a fresh database request on every Google crawl.
 *
 * This is important for production crawlers because the sitemap
 * should remain a lightweight, reliable public endpoint.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  /*
   * Public pages that should be discoverable by search engines.
   *
   * Private/authenticated routes are intentionally excluded.
   */
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

  /*
   * Course URLs are loaded from the database so newly created
   * public courses can automatically appear in the sitemap.
   *
   * If the database is temporarily unavailable, the sitemap still
   * returns all static public URLs instead of failing completely.
   */
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
          lastModified: course.createdAt ?? now,
          changeFrequency: "weekly" as const,
          priority: course.isPremium ? 0.9 : 0.8,
        };
      });
  } catch (error) {
    console.error("SITEMAP COURSE LOAD FAILED:", error);

    /*
     * Do not allow a temporary database problem to make the
     * public sitemap unavailable.
     */
    coursePages = [];
  }

  return [...staticPages, ...coursePages];
}