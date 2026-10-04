import type { Metadata } from "next";

import { getCourseBySlug } from "@/lib/course";

import JsonLd from "@/components/seo/JsonLd";

const SITE_URL = "https://iculearningportal.com";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

function getAbsoluteUrl(value: string | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  /*
   * Public course pages are identified by their slug.
   *
   * The page.tsx route is responsible for permanently redirecting
   * valid legacy/database-ID URLs to the canonical slug URL.
   *
   * Metadata itself always points to the canonical slug URL.
   */

  const course = await getCourseBySlug(id);

  if (!course) {
    return {
      title: "Course Not Found | ICU Learning Portal",
      description:
        "The requested ICU nursing course could not be found on ICU Learning Portal.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${course.title} | ICU Learning Portal`;

  const description =
    course.description?.trim() ||
    `Learn ${course.title} with structured ICU nursing and critical care education from ICU Learning Portal.`;

  const canonicalUrl = `${SITE_URL}/courses/${course.slug}`;

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

  /*
   * IMPORTANT:
   *
   * The public canonical course URL is:
   *
   * /courses/<course-slug>
   *
   * Course page.tsx handles legacy/database-ID requests and
   * permanently redirects them to the canonical slug URL.
   *
   * The layout itself therefore resolves the course strictly
   * by slug so that canonical metadata and structured data
   * always represent the public URL.
   */

  const course = await getCourseBySlug(id);

  /*
   * If the course does not exist, the page itself handles
   * notFound(). We simply render the children here so the
   * route-level 404 behaviour remains unchanged.
   */

  if (!course) {
    return children;
  }

  const canonicalUrl = `${SITE_URL}/courses/${course.slug}`;

  const courseImage = getAbsoluteUrl(course.image);

  const courseDescription =
    course.description?.trim() ||
    `Learn ${course.title} with structured ICU nursing and critical care education from ICU Learning Portal.`;

  const courseSchema = {
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

    ...(course.instructor
      ? {
          instructor: {
            "@type": "Person",
            name: course.instructor,
          },
        }
      : {}),

    ...(course.language
      ? {
          inLanguage: course.language,
        }
      : {}),

    ...(course.level
      ? {
          educationalLevel: course.level,
        }
      : {}),

    ...(courseImage
      ? {
          image: courseImage,
        }
      : {}),

    ...(course.duration
      ? {
          timeRequired: `PT${course.duration}H`,
        }
      : {}),

    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "INR",
      price: Number(course.price ?? 0).toFixed(2),
      availability: "https://schema.org/InStock",
      category: course.isPremium ? "Premium Course" : "Free Course",
    },
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