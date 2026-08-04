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