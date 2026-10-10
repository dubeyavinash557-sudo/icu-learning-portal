import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | ICU Learning Portal",
  description:
    "Securely reset your ICU Learning Portal account password.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
