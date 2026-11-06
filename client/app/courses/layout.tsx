
import type { Metadata } from "next";

const SITE_NAME = "ICU Learning Portal";

export const metadata: Metadata = {
  title: {
    default: "ICU Nursing & Critical Care Courses",
    template: "%s | ICU Learning Portal",
  },

  description:
    "Explore ICU nursing and critical care courses covering mechanical ventilation, ECG interpretation, ABG analysis, emergency care and structured healthcare learning.",

  applicationName: SITE_NAME,

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
