import type { ReactNode } from "react";

type CourseForSchema = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  instructor: string;
  price: number;
  language: string;
  level: string;
  rating: number;
  isPremium: boolean;
};

type CourseCatalogJsonLdProps = {
  courses: CourseForSchema[];
};

const SITE_URL = "https://iculearningportal.com";

function absoluteUrl(value: string) {
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
    value.startsWith("/") ? "" : "/"
  }${value}`;
}

function cleanText(
  value: string | null | undefined,
  fallback: string,
) {
  const cleaned = value?.trim();

  return cleaned && cleaned.length > 0
    ? cleaned
    : fallback;
}

export default function CourseCatalogJsonLd({
  courses,
}: CourseCatalogJsonLdProps) {
  const publicCourses = courses
    .filter(
      (course) =>
        typeof course.slug === "string" &&
        course.slug.trim().length > 0 &&
        typeof course.title === "string" &&
        course.title.trim().length > 0,
    )
    .map((course) => {
      const title = course.title.trim();

      const description = cleanText(
        course.description,
        `Study ${title} through structured ICU and critical-care learning at ICU Learning Portal.`,
      );

      const courseUrl =
        `${SITE_URL}/courses/${course.slug.trim()}`;

      const imageUrl = absoluteUrl(
        course.image,
      );

      const provider = {
        "@type": "Organization",
        name: "ICU Learning Portal",
        url: SITE_URL,
      };

      const courseData: Record<
        string,
        unknown
      > = {
        "@type": "Course",

        name: title,

        description,

        url: courseUrl,

        provider,

        ...(course.instructor?.trim()
          ? {
              instructor: {
                "@type": "Person",
                name: course.instructor.trim(),
              },
            }
          : {}),

        ...(course.language?.trim()
          ? {
              inLanguage:
                course.language.trim(),
            }
          : {}),

        ...(course.level?.trim()
          ? {
              educationalLevel:
                course.level.trim(),
            }
          : {}),

        ...(imageUrl
          ? {
              image: [imageUrl],
            }
          : {}),

        ...(Number.isFinite(
          Number(course.rating),
        ) && Number(course.rating) > 0
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue:
                  Number(course.rating).toFixed(1),
                bestRating: "5",
                worstRating: "1",
              },
            }
          : {}),

        offers: {
          "@type": "Offer",
          url: courseUrl,
          priceCurrency: "INR",
          price: Number.isFinite(
            Number(course.price),
          )
            ? Number(course.price).toFixed(2)
            : "0.00",

          availability:
            "https://schema.org/InStock",

          category: course.isPremium
            ? "Premium Course"
            : "Free Demo Course",
        },
      };

      return courseData;
    });

  if (publicCourses.length === 0) {
    return null;
  }

  const itemList = {
    "@context": "https://schema.org",

    "@type": "ItemList",

    name:
      "ICU Learning Portal Courses",

    description:
      "Public ICU nursing and critical-care courses available through ICU Learning Portal.",

    url: `${SITE_URL}/courses`,

    numberOfItems:
      publicCourses.length,

    itemListElement:
      publicCourses.map(
        (course, index) => ({
          "@type": "ListItem",

          position: index + 1,

          item: course,
        }),
      ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          itemList,
        ).replace(/</g, "\\u003c"),
      }}
    />
  );
}