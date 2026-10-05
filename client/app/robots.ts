import type { MetadataRoute } from "next";

const SITE_URL = "https://www.iculearningportal.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",

        allow: "/",

        disallow: [
          "/admin/",
          "/api/",
          "/dashboard/",
          "/payments/",
          "/profile/",
          "/settings/",

          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/verify",

          "/courses/*/lesson/",
        ],
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
