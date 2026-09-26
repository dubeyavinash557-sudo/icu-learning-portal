import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://iculearningportal.com"
  ),

  title: {
    default:
      "ICU Learning Portal | ICU Nursing & Critical Care Education",

    template:
      "%s | ICU Learning Portal",
  },

  description:
    "Structured ICU nursing and critical-care courses with practical lessons, quizzes, study resources, progress tracking and eligible completion certificates.",

  applicationName:
    "ICU Learning Portal",

  keywords: [
    "ICU nursing course",
    "critical care nursing",
    "mechanical ventilation course",
    "ECG interpretation course",
    "ABG analysis course",
    "ICU emergency drugs",
    "ICU nursing interview",
    "Hindi English ICU course",
  ],

  alternates: {
    canonical:
      "https://iculearningportal.com/",
  },

  openGraph: {
    type: "website",
    url: "https://iculearningportal.com/",
    siteName: "ICU Learning Portal",

    title:
      "ICU Learning Portal | ICU Nursing & Critical Care Education",

    description:
      "Learn ICU nursing and critical-care concepts through structured courses, practical lessons, assessments and completion pathways.",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "ICU Learning Portal | ICU Nursing & Critical Care Education",

    description:
      "Structured ICU and critical-care learning for nursing students and healthcare professionals.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}