"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCourse(
  formData: FormData
) {
  const title = formData.get("title") as string;

  const slug = formData.get("slug") as string;

  const description =
    formData.get("description") as string;

  const price = Number(formData.get("price"));

  const isPremium =
    formData.get("isPremium") === "true";

      if (!title || !slug) {
    throw new Error("Title and slug are required.");
  }

  await prisma.course.create({
  data: {
    title,
    slug,
    description,

    image: (formData.get("image") as string) || "/images/default-course.jpg",

    instructor:
      (formData.get("instructor") as string) || "ICU Learning Team",

    price,

    duration: Number(formData.get("duration")) || 0,

    language:
      (formData.get("language") as string) || "Hindi",

    level:
      (formData.get("level") as string) || "Beginner",

    isPremium,
  },
});

      revalidatePath("/admin/courses");

  redirect("/admin/courses");
}