
"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function requiredString(formData: FormData, name: string): string {
  const value = formData.get(name);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${name} is required.`);
  }

  return value.trim();
}

function optionalString(formData: FormData, name: string): string {
  const value = formData.get(name);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Authentication is required.");
  }

  const email = session.user.email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      role: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    throw new Error("Administrator access is required.");
  }

  return user;
}

async function requireStudent(id: string) {
  const normalizedId = id.trim();

  if (!normalizedId) {
    throw new Error("Student ID is required.");
  }

  const student = await prisma.user.findUnique({
    where: { id: normalizedId },
    select: {
      id: true,
      role: true,
    },
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  if (student.role !== "STUDENT") {
    throw new Error("This action is only available for student accounts.");
  }

  return student;
}

export async function updateStudent(formData: FormData) {
  await requireAdmin();

  const id = requiredString(formData, "id");
  const fullName = requiredString(formData, "fullName");
  const email = requiredString(formData, "email").toLowerCase();
  const mobile = requiredString(formData, "mobile");
  const qualification = optionalString(formData, "qualification");
  const hospital = optionalString(formData, "hospital");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error("A valid email address is required.");
  }

  if (fullName.length > 120) {
    throw new Error("Full name is too long.");
  }

  if (mobile.length > 32) {
    throw new Error("Mobile number is too long.");
  }

  if (qualification.length > 160 || hospital.length > 160) {
    throw new Error("Qualification or hospital field is too long.");
  }

  const student = await requireStudent(id);

  const [emailOwner, mobileOwner] = await Promise.all([
    prisma.user.findUnique({
      where: { email },
      select: { id: true },
    }),
    prisma.user.findUnique({
      where: { mobile },
      select: { id: true },
    }),
  ]);

  if (emailOwner && emailOwner.id !== student.id) {
    throw new Error("This email address is already registered to another account.");
  }

  if (mobileOwner && mobileOwner.id !== student.id) {
    throw new Error("This mobile number is already registered to another account.");
  }

  await prisma.user.update({
    where: { id: student.id },
    data: {
      fullName,
      email,
      mobile,
      qualification,
      hospital,
    },
  });

  revalidatePath("/admin/students");
  revalidatePath(`/admin/students/${student.id}`);
  revalidatePath(`/admin/students/${student.id}/edit`);

  redirect(`/admin/students/${student.id}`);
}

export async function togglePremium(id: string) {
  await requireAdmin();

  const student = await requireStudent(id);

  const current = await prisma.user.findUnique({
    where: { id: student.id },
    select: { isPremium: true },
  });

  if (!current) {
    throw new Error("Student not found.");
  }

  await prisma.user.update({
    where: { id: student.id },
    data: {
      isPremium: !current.isPremium,
    },
  });

  revalidatePath("/admin/students");
  revalidatePath(`/admin/students/${student.id}`);
}

export async function deleteStudent(id: string) {
  await requireAdmin();

  const student = await requireStudent(id);

  await prisma.user.delete({
    where: { id: student.id },
  });

  revalidatePath("/admin/students");

  redirect("/admin/students");
}
