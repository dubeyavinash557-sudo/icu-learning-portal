
import type { Metadata } from "next";

import {
  getCourseBySlug,
  getCourseSlugById,
} from "@/lib/course";

import JsonLd from "@/components/seo/JsonLd";

const SITE_URL = "https://www.iculearningportal.com";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

function getAbsoluteUrl(
  value: string | null | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `${SITE_URL}${
    value.startsWith("/") ? value : `/${value}`
  }`;
}

async function resolveCourseRoute(id: string) {
  const courseBySlug = await getCourseBySlug(id);

  if (courseBySlug) {
    return courseBySlug;
  }

  const courseById = await getCourseSlugById(id);

  if (!courseById) {
    return null;
  }

  return getCourseBySlug(courseById.slug);
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const course = await resolveCourseRoute(id);

  if (!course) {
    return {
      title: "Course Not Found",
      description:
        "The requested ICU nursing course could not be found on ICU Learning Portal.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = course.title;

  const description =
    course.description?.trim() ||
    `Learn ${course.title} with structured ICU nursing and critical care education from ICU Learning Portal.`;

  const canonicalUrl =
    `${SITE_URL}/courses/${course.slug}`;

  const imageUrl = getAbsoluteUrl(course.image);

  return {
    title,
    description,

    keywords: [
      course.title,
      "ICU nursing",
      "critical care nursing",
      "ICU course",
      "nursing course",
      "critical care education",
      "ICU Learning Portal",
    ],

    authors: [
      {
        name: "ICU Learning Portal",
        url: SITE_URL,
      },
    ],

    creator: "ICU Learning Portal",
    publisher: "ICU Learning Portal",

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      siteName: "ICU Learning Portal",
      title,
      description,

      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: course.title,
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

export default async function CourseIdLayout({
  children,
  params,
}: Props) {
  const { id } = await params;
  const course = await resolveCourseRoute(id);

  /*
   * Do not redirect from this layout.
   *
   * This layout also wraps nested lesson URLs:
   * /courses/[id]/lesson/[lessonId]
   *
   * Redirecting here to /courses/[slug] would discard
   * the lesson path and send the student to the course page.
   *
   * The course overview page handles its own canonical redirect.
   */

  if (!course) {
    return children;
  }

  const canonicalUrl =
    `${SITE_URL}/courses/${course.slug}`;

  const courseImage = getAbsoluteUrl(course.image);

  const courseDescription =
    course.description?.trim() ||
    `Learn ${course.title} with structured ICU nursing and critical care education from ICU Learning Portal.`;

  const duration = Number(course.duration);

  const validDuration =
    Number.isFinite(duration) && duration > 0
      ? Math.round(duration)
      : null;

  const courseSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: courseDescription,
    url: canonicalUrl,

    provider: {
      "@type": "Organization",
      name: "ICU Learning Portal",
      url: SITE_URL,
    },
  };

  if (course.instructor) {
    courseSchema.instructor = {
      "@type": "Person",
      name: course.instructor,
    };
  }

  if (course.language) {
    courseSchema.inLanguage = course.language;
  }

  if (course.level) {
    courseSchema.educationalLevel = course.level;
  }

  if (courseImage) {
    courseSchema.image = courseImage;
  }

  if (validDuration !== null) {
    courseSchema.timeRequired = `PT${validDuration}M`;
  }

  courseSchema.offers = {
    "@type": "Offer",
    url: canonicalUrl,
    priceCurrency: "INR",
    price: Number(course.price ?? 0).toFixed(2),
    availability: "https://schema.org/InStock",
    category: course.isPremium
      ? "Premium Course"
      : "Free Course",
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
        name: course.title,
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
