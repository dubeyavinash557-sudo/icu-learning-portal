import type { MetadataRoute } from "next";

const SITE_URL = "https://www.iculearningportal.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/dashboard",
          "/dashboard/",
          "/payments",
          "/payments/",
          "/profile",
          "/profile/",
          "/settings",
          "/settings/",
          "/learn",
          "/learn/",
          "/courses/*/lesson/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}