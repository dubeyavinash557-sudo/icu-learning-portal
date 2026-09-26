import { redirect } from "next/navigation";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  /*
   * ------------------------------------------------------
   * 1. AUTHENTICATION
   * ------------------------------------------------------
   */

  const session = await auth();

  if (!session?.user?.email) {
    redirect(
      "/login?callbackUrl=/admin"
    );
  }

  /*
   * ------------------------------------------------------
   * 2. FIND CURRENT USER
   * ------------------------------------------------------
   */

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },

    select: {
      id: true,
      role: true,
      isPremium: true,
    },
  });

  /*
   * ------------------------------------------------------
   * 3. USER MUST EXIST
   * ------------------------------------------------------
   */

  if (!user) {
    redirect("/login");
  }

  /*
   * ------------------------------------------------------
   * 4. ADMIN AUTHORIZATION
   * ------------------------------------------------------
   *
   * Authentication:
   *   "Is the user logged in?"
   *
   * Authorization:
   *   "Is the logged-in user an administrator?"
   *
   * Every /admin/* page is protected by this layout.
   */

  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  /*
   * ------------------------------------------------------
   * 5. ADMIN CONTENT
   * ------------------------------------------------------
   */

  return children;
}