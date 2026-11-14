
import type { Metadata } from "next";

import "./globals.css";
import Providers from "./providers";

const SITE_URL = "https://www.iculearningportal.com";
const SITE_NAME = "ICU Learning Portal";

const DEFAULT_TITLE =
  "ICU Learning Portal – ICU Nursing & Critical Care Courses";

const DEFAULT_DESCRIPTION =
  "Learn ICU nursing and critical care with structured courses, practical lessons, mechanical ventilation, ECG interpretation, ABG analysis, quizzes and study resources.";

const DEFAULT_OG_IMAGE = "/images/icu-lms-hero.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: "%s | ICU Learning Portal",
  },

  description: DEFAULT_DESCRIPTION,

  applicationName: SITE_NAME,

  keywords: [
    "ICU Learning Portal",
    "ICU learning",
    "ICU education portal",
    "ICU nursing courses",
    "ICU nursing training",
    "critical care nursing",
    "critical care nursing course",
    "ICU training program",
    "mechanical ventilation course",
    "ECG interpretation course",
    "ABG analysis course",
    "ICU emergency care",
    "nursing education",
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
  classification: "ICU Nursing and Critical Care Education",

  referrer: "strict-origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  /*
   * Canonical URLs must be configured separately
   * for individual public pages.
   */

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
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,

    url: SITE_URL,

    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1024,
        height: 1536,
        alt: "ICU Learning Portal – ICU Nursing and Critical Care Courses",
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
 * ORGANIZATION STRUCTURED DATA
 */

const organizationSchema = {
  "@type": "EducationalOrganization",

  "@id": `${SITE_URL}/#organization`,

  name: SITE_NAME,

  url: SITE_URL,

  description:
    "Online educational platform providing ICU nursing and critical care courses, practical lessons, assessments and study resources.",

  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.ico`,
  },

  email: "support@iculearningportal.com",
};

/*
 * WEBSITE STRUCTURED DATA
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

  inLanguage: ["en-IN", "hi-IN"],
};

/*
 * ROOT LAYOUT
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

  const structuredDataJson = JSON.stringify(
    structuredData,
  ).replace(/</g, "\\u003c");

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
            __html: structuredDataJson,
          }}
        />
      </head>

      <body className="min-h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
