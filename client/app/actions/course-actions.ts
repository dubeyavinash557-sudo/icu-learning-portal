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

export async function updateCourse(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const title = formData.get("title") as string;

  const slug = formData.get("slug") as string;

  const description =
    formData.get("description") as string;

  const image =
    (formData.get("image") as string) ||
    "/images/default-course.jpg";

  const instructor =
    (formData.get("instructor") as string) ||
    "ICU Learning Team";

  const price = Number(formData.get("price"));

  const duration = Number(
    formData.get("duration")
  );

  const language =
    (formData.get("language") as string) ||
    "Hindi";

  const level =
    (formData.get("level") as string) ||
    "Beginner";

  const isPremium =
    formData.get("isPremium") === "true";

      if (!id) {
    throw new Error("Course ID is missing.");
  }

  await prisma.course.update({
    where: {
      id,
    },
    data: {
      title,
      slug,
      description,
      image,
      instructor,
      price,
      duration,
      language,
      level,
      isPremium,
    },
  });

  revalidatePath("/admin/courses");

  revalidatePath(`/admin/courses/${id}`);

  revalidatePath(`/admin/courses/${id}/edit`);

    redirect(`/admin/courses/${id}`);
}

export async function toggleCoursePremium(
  id: string
) {
  "use server";

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    throw new Error("Course not found.");
  }

  await prisma.course.update({
    where: {
      id,
    },
    data: {
      isPremium: !course.isPremium,
    },
  });

  revalidatePath("/admin/courses");

  revalidatePath(`/admin/courses/${id}`);

  revalidatePath(`/admin/courses/${id}/edit`);
}

export async function deleteCourse(
  id: string
) {
  "use server";

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    throw new Error("Course not found.");
  }

  await prisma.course.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/courses");

  redirect("/admin/courses");
}