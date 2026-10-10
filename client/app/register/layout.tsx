import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | ICU Learning Portal",
  description:
    "Create an ICU Learning Portal account to access ICU nursing and critical-care learning resources.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
