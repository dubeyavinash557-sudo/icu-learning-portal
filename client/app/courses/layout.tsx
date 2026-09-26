import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICU Nursing & Critical Care Courses",
  description:
    "Explore ICU nursing, critical care, mechanical ventilation, ECG, ABG analysis, emergency care and other structured healthcare learning courses at ICU Learning Portal.",
  alternates: {
    canonical: "https://iculearningportal.com/courses",
  },
  openGraph: {
    type: "website",
    url: "https://iculearningportal.com/courses",
    title: "ICU Nursing & Critical Care Courses",
    description:
      "Explore structured ICU nursing and critical-care courses with lessons, assessments, study resources and eligible completion certificates.",
    siteName: "ICU Learning Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICU Nursing & Critical Care Courses",
    description:
      "Explore structured ICU nursing and critical-care learning programs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}