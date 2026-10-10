import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | ICU Learning Portal",
  description:
    "Sign in to your ICU Learning Portal account to access your courses and learning dashboard.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
