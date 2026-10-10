import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate Verification | ICU Learning Portal",
  description:
    "Verify an ICU Learning Portal certificate using the official certificate verification page.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function VerifyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
