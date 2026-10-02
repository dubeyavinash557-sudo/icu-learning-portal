import type { Metadata } from "next";

import "./globals.css";
import Providers from "./providers";

const SITE_URL = "https://iculearningportal.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "ICU Learning Portal | ICU Nursing & Critical Care Education",
    template: "%s | ICU Learning Portal",
  },

  description:
    "ICU Learning Portal provides structured ICU nursing and critical-care courses, practical lessons, quizzes, study resources, progress tracking and eligible completion certificates.",

  applicationName: "ICU Learning Portal",

  authors: [
    {
      name: "ICU Learning Portal",
      url: SITE_URL,
    },
  ],

  creator: "ICU Learning Portal",
  publisher: "ICU Learning Portal",

  category: "Education",

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ICU Learning Portal",
    locale: "en_IN",

    title:
      "ICU Learning Portal | ICU Nursing & Critical Care Education",

    description:
      "Structured ICU nursing and critical-care education with courses, lessons, assessments, study resources and eligible completion certificates.",

    images: [
      {
        url: "/images/icu-lms-hero.png",
        width: 1024,
        height: 1536,
        alt:
          "ICU Learning Portal - ICU nursing and critical care education",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "ICU Learning Portal | ICU Nursing & Critical Care Education",

    description:
      "Structured ICU nursing and critical-care learning programs with lessons, assessments and certificate pathways.",

    images: ["/images/icu-lms-hero.png"],
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

const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "ICU Learning Portal",
  url: SITE_URL,

  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.ico`,
    width: 256,
    height: 256,
  },

  email: "support@iculearningportal.com",
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "ICU Learning Portal",

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  inLanguage: "en-IN",
};

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
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c",
            ),
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