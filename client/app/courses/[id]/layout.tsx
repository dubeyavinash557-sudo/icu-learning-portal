import type { Metadata } from "next";

import { getCourseByIdOrSlug } from "@/lib/course";

import JsonLd from "@/components/seo/JsonLd";

const SITE_URL = "https://iculearningportal.com";

type Props = {
  children: React.ReactNode;

  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const { id } = await params;

  const course =
    await getCourseByIdOrSlug(id);

  if (!course) {
    return {
      title: "Course Not Found",

      description:
        "The requested ICU Learning Portal course could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const courseTitle =
    course.title.trim();

  const courseType =
    course.isPremium
      ? "Premium ICU Course"
      : "Free ICU Course";

  const description =
    course.description?.trim() ||
    `Study ${courseTitle} through structured ICU and critical-care lessons at ICU Learning Portal.`;

  const canonicalUrl =
    `${SITE_URL}/courses/${course.slug}`;

  const image =
    typeof course.image === "string" &&
    course.image.trim().length > 0
      ? course.image
      : undefined;

  return {
    title:
      `${courseTitle} | ${courseType}`,

    description,

    keywords: [
      courseTitle,
      "ICU nursing course",
      "critical care course",
      "ICU learning",
      "nursing education",
      "critical care nursing",
      course.language,
      course.level,
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "article",
      url: canonicalUrl,
      siteName: "ICU Learning Portal",

      title: courseTitle,

      description,

      ...(image
        ? {
            images: [
              {
                url: image,
                alt: courseTitle,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: image
        ? "summary_large_image"
        : "summary",

      title: courseTitle,

      description,

      ...(image
        ? {
            images: [image],
          }
        : {}),
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function CourseIdLayout({
  children,
  params,
}: Props) {
  const { id } = await params;

  const course =
    await getCourseByIdOrSlug(id);

  if (!course) {
    return children;
  }

  const courseTitle =
    course.title.trim();

  const description =
    course.description?.trim() ||
    `Study ${courseTitle} through structured ICU and critical-care lessons at ICU Learning Portal.`;

  const canonicalUrl =
    `${SITE_URL}/courses/${course.slug}`;

  const courseImage =
    typeof course.image === "string" &&
    course.image.trim().length > 0
      ? course.image
      : undefined;

  const courseSchema = {
    "@context": "https://schema.org",

    "@type": "Course",

    name: courseTitle,

    description,

    url: canonicalUrl,

    ...(courseImage
      ? {
          image: [
            courseImage.startsWith("http")
              ? courseImage
              : `${SITE_URL}${courseImage.startsWith("/") ? "" : "/"}${courseImage}`,
          ],
        }
      : {}),

    provider: {
      "@type": "Organization",
      name: "ICU Learning Portal",
      url: SITE_URL,
    },

    instructor: {
      "@type": "Person",
      name: course.instructor,
    },

    inLanguage:
      course.language || "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${SITE_URL}/courses`,
      },

      {
        "@type": "ListItem",
        position: 3,
        name: courseTitle,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={courseSchema} />

      <JsonLd data={breadcrumbSchema} />

      {children}
    </>
  );
}