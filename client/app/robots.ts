import type { MetadataRoute } from "next";

const SITE_URL = "https://iculearningportal.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/admin/",
          "/api/",
          "/payments/",
          "/profile/",
          "/settings/",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/verify",
        ],
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}