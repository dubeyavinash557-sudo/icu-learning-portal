
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const OWNER_EMAIL = "dubeyavinash557@gmail.com";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  // Step 1: Check authenticated session.
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/admin");
  }

  // Step 2: Normalize the signed-in email.
  const sessionEmail = session.user.email
    .trim()
    .toLowerCase();

  // Step 3: Only the designated owner can
  // access the Admin section.
  if (sessionEmail !== OWNER_EMAIL) {
    redirect("/dashboard");
  }

  // Step 4: Verify the owner account
  // exists and has ADMIN role.
  const admin = await prisma.user.findUnique({
    where: {
      email: OWNER_EMAIL,
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (!admin || admin.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Step 5: Render protected Admin pages.
  return <>{children}</>;
}
