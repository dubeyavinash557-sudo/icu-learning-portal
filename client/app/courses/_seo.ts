
import type { Metadata } from "next";

const SITE_URL = "https://www.iculearningportal.com";
const SITE_NAME = "ICU Learning Portal";

type CourseSeoInput = {
  title: string;
  description: string;
  slug: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createCourseMetadata({
  title,
  description,
  slug,
  image,
  keywords = [],
  noIndex = false,
}: CourseSeoInput): Metadata {
  const canonicalUrl = `${SITE_URL}/courses/${slug}`;

  const imageUrl = image
    ? image.startsWith("http://") ||
      image.startsWith("https://")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
    : undefined;

  return {
    title,
    description,

    keywords: [
      title,
      "ICU nursing",
      "critical care nursing",
      "ICU course",
      "critical care education",
      "ICU Learning Portal",
      ...keywords,
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },

    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      url: canonicalUrl,
      title,
      description,
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl
        ? {
            images: [imageUrl],
          }
        : {}),
    },
  };
}
