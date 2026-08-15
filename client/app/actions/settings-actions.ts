"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

function getStringValue(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

export async function updateOwnProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("You must be logged in to update your profile.");
  }

  const fullName = getStringValue(formData, "fullName");
  const mobile = getStringValue(formData, "mobile");
  const qualification = getStringValue(formData, "qualification");
  const hospital = getStringValue(formData, "hospital");

  if (!fullName) {
    throw new Error("Full name is required.");
  }

  if (!mobile) {
    throw new Error("Mobile number is required.");
  }

  if (!qualification) {
    throw new Error("Qualification is required.");
  }

  if (!hospital) {
    throw new Error("Hospital / organization is required.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!existingUser) {
    throw new Error("User account not found.");
  }

  const mobileOwner = await prisma.user.findFirst({
    where: {
      mobile,
      NOT: {
        id: existingUser.id,
      },
    },
    select: {
      id: true,
    },
  });

  if (mobileOwner) {
    throw new Error(
      "This mobile number is already registered with another account."
    );
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      fullName,
      mobile,
      qualification,
      hospital,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/settings");
  revalidatePath("/dashboard");
  revalidatePath("/admin/students");
}

export async function changeOwnPassword(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("You must be logged in to change your password.");
  }

  const currentPassword = getStringValue(
    formData,
    "currentPassword"
  );

  const newPassword = getStringValue(
    formData,
    "newPassword"
  );

  const confirmPassword = getStringValue(
    formData,
    "confirmPassword"
  );

  if (!currentPassword) {
    throw new Error("Current password is required.");
  }

  if (!newPassword) {
    throw new Error("New password is required.");
  }

  if (newPassword.length < 8) {
    throw new Error(
      "New password must contain at least 8 characters."
    );
  }

  if (newPassword !== confirmPassword) {
    throw new Error(
      "New password and confirm password do not match."
    );
  }

  if (currentPassword === newPassword) {
    throw new Error(
      "New password must be different from your current password."
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    throw new Error("User account not found.");
  }

  const passwordMatches = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!passwordMatches) {
    throw new Error("Current password is incorrect.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  revalidatePath("/settings");
}