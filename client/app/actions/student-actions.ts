"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateStudent(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const fullName = formData.get("fullName") as string;

  const email = formData.get("email") as string;

  const mobile = formData.get("mobile") as string;

  const qualification =
    formData.get("qualification") as string;

  const hospital =
    formData.get("hospital") as string;

  if (!id) {
    throw new Error("Student ID is missing.");
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      fullName,
      email,
      mobile,
      qualification,
      hospital,
    },
  });

  revalidatePath("/admin/students");

  revalidatePath(`/admin/students/${id}`);

  redirect(`/admin/students/${id}`);
}

export async function togglePremium(id: string) {
  "use server";

  const student = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      isPremium: !student.isPremium,
    },
  });

  revalidatePath("/admin/students");
  revalidatePath(`/admin/students/${id}`);
}

export async function deleteStudent(id: string) {
  "use server";

  const student = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/students");

  redirect("/admin/students");
}