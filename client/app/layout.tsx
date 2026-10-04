import type { Metadata } from "next";

import "./globals.css";
import Providers from "./providers";

const SITE_URL = "https://iculearningportal.com";

const SITE_NAME = "ICU Learning Portal";

const DEFAULT_TITLE =
  "ICU Learning Portal | ICU Nursing & Critical Care Courses";

const DEFAULT_DESCRIPTION =
  "ICU Learning Portal provides structured ICU nursing and critical-care courses, practical lessons, quizzes, study resources, progress tracking and eligible completion certificates.";

const DEFAULT_OG_IMAGE = "/images/icu-lms-hero.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: "%s | ICU Learning Portal",
  },

  description: DEFAULT_DESCRIPTION,

  applicationName: SITE_NAME,

  generator: "Next.js",

  keywords: [
    "ICU nursing",
    "ICU nursing course",
    "critical care nursing",
    "critical care course",
    "ICU course",
    "nursing course",
    "ICU education",
    "critical care education",
    "mechanical ventilation",
    "ECG interpretation",
    "ABG analysis",
    "ICU emergency care",
    "ICU Learning Portal",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,

  publisher: SITE_NAME,

  category: "Education",

  classification:
    "ICU Nursing and Critical Care Online Education",

  referrer: "strict-origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    url: SITE_URL,

    siteName: SITE_NAME,

    title: DEFAULT_TITLE,

    description: DEFAULT_DESCRIPTION,

    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1024,
        height: 1536,
        alt:
          "ICU Learning Portal - ICU Nursing and Critical Care Education",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: DEFAULT_TITLE,

    description: DEFAULT_DESCRIPTION,

    images: [DEFAULT_OG_IMAGE],
  },

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,

      follow: true,

      noimageindex: false,

      "max-video-preview": -1,

      "max-image-preview": "large",

      "max-snippet": -1,
    },
  },
};

/*
 * ============================================================
 * ORGANIZATION STRUCTURED DATA
 * ============================================================
 *
 * This identifies ICU Learning Portal as the organization
 * responsible for the website.
 *
 * We deliberately do not add unverified social profiles,
 * ratings, reviews, addresses or claims that are not present
 * on the website.
 */

const organizationSchema = {
  "@type": "EducationalOrganization",

  "@id": `${SITE_URL}/#organization`,

  name: SITE_NAME,

  url: SITE_URL,

  description:
    "Online ICU nursing and critical-care education platform providing structured courses, lessons, assessments and learning resources.",

  logo: {
    "@type": "ImageObject",

    url: `${SITE_URL}/favicon.ico`,

    width: 256,

    height: 256,
  },

  email: "support@iculearningportal.com",
};

/*
 * ============================================================
 * WEBSITE STRUCTURED DATA
 * ============================================================
 */

const websiteSchema = {
  "@type": "WebSite",

  "@id": `${SITE_URL}/#website`,

  url: SITE_URL,

  name: SITE_NAME,

  description: DEFAULT_DESCRIPTION,

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  inLanguage: "en-IN",
};

/*
 * ============================================================
 * ROOT LAYOUT
 * ============================================================
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      organizationSchema,
      websiteSchema,
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData,
            ).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body className="min-h-full bg-slate-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}