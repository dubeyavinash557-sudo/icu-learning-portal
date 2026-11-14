
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const OWNER_EMAIL = (
  process.env.OWNER_EMAIL || "dubeyavinash557@gmail.com"
)
  .trim()
  .toLowerCase();

export async function getSignedInAdmin() {
  const session = await auth();

  const email = session?.user?.email
    ?.trim()
    .toLowerCase();

  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      isPremium: true,
    },
  });

  if (!user) {
    return null;
  }

  const isOwner = email === OWNER_EMAIL;
  const isAdmin = user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return null;
  }

  return {
    ...user,
    isOwner,
    isAdmin: true,
  };
}

export async function requireAdmin() {
  const user = await getSignedInAdmin();

  if (!user) {
    throw new Error("Admin access denied.");
  }

  return user;
}

export async function requireOwner() {
  const user = await getSignedInAdmin();

  if (!user || !user.isOwner) {
    throw new Error("Only the portal owner can perform this action.");
  }

  return user;
}
