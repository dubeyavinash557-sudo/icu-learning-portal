import type { Metadata } from "next";

import { getCourseByIdOrSlug } from "@/lib/course";

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

  const course = await getCourseByIdOrSlug(id);

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

  const courseTitle = course.title.trim();

  const courseType = course.isPremium
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
    title: `${courseTitle} | ${courseType}`,

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
    },
  };
}

export default function CourseIdLayout({
  children,
}: Props) {
  return children;
}