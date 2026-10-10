import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | ICU Learning Portal",
  description:
    "Recover access to your ICU Learning Portal account using the secure password recovery process.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
