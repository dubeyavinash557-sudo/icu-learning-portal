"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function cleanString(value: FormDataEntryValue | null) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function parsePositiveNumber(
  value: FormDataEntryValue | null,
  fieldName: string
) {
  const number = Number(
    typeof value === "string" ? value : ""
  );

  if (!Number.isFinite(number) || number < 0) {
    throw new Error(
      `${fieldName} must be a valid non-negative number.`
    );
  }

  return number;
}

function parsePositiveInteger(
  value: FormDataEntryValue | null,
  fieldName: string
) {
  const number = Number(
    typeof value === "string" ? value : ""
  );

  if (
    !Number.isInteger(number) ||
    number <= 0
  ) {
    throw new Error(
      `${fieldName} must be a positive integer.`
    );
  }

  return number;
}

function normalizeOptionalUrl(
  value: FormDataEntryValue | null,
  fieldName: string
) {
  const raw = cleanString(value);

  if (!raw) {
    return null;
  }

  /*
   * Local resources are allowed, for example:
   * /pdfs/lesson-1.pdf
   * /videos/lesson-1.mp4
   */
  if (raw.startsWith("/")) {
    return raw;
  }

  let url: URL;

  try {
    url = new URL(raw);
  } catch {
    throw new Error(
      `${fieldName} must be a valid URL.`
    );
  }

  if (
    url.protocol !== "https:" &&
    url.protocol !== "http:"
  ) {
    throw new Error(
      `${fieldName} must use HTTP or HTTPS.`
    );
  }

  return url.toString();
}

function normalizeVideoUrl(
  value: FormDataEntryValue | null
) {
  const raw = cleanString(value);

  if (!raw) {
    return "";
  }

  const normalized =
    normalizeOptionalUrl(
      raw,
      "Video URL"
    );

  return normalized ?? "";
}

async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error(
      "Authentication is required."
    );
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        role: true,
      },
    });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.role !== "ADMIN") {
    throw new Error(
      "Administrator access is required."
    );
  }

  return user;
}

export async function createCourse(
  formData: FormData
) {
  await requireAdmin();

  const title = cleanString(
    formData.get("title")
  );

  const slug = cleanString(
    formData.get("slug")
  );

  const description = cleanString(
    formData.get("description")
  );

  const price = parsePositiveNumber(
    formData.get("price"),
    "Price"
  );

  const isPremium =
    formData.get("isPremium") === "true";

  if (!title || !slug) {
    throw new Error(
      "Title and slug are required."
    );
  }

  await prisma.course.create({
    data: {
      title,
      slug,
      description,

      image:
        cleanString(formData.get("image")) ||
        "/images/default-course.jpg",

      instructor:
        cleanString(
          formData.get("instructor")
        ) || "ICU Learning Team",

      price,

      duration: parsePositiveNumber(
        formData.get("duration"),
        "Duration"
      ),

      language:
        cleanString(
          formData.get("language")
        ) || "Hindi",

      level:
        cleanString(
          formData.get("level")
        ) || "Beginner",

      isPremium,
    },
  });

  revalidatePath("/admin/courses");

  redirect("/admin/courses");
}

export async function updateCourse(
  formData: FormData
) {
  await requireAdmin();

  const id = cleanString(
    formData.get("id")
  );

  const title = cleanString(
    formData.get("title")
  );

  const slug = cleanString(
    formData.get("slug")
  );

  const description = cleanString(
    formData.get("description")
  );

  const image =
    cleanString(
      formData.get("image")
    ) || "/images/default-course.jpg";

  const instructor =
    cleanString(
      formData.get("instructor")
    ) || "ICU Learning Team";

  const price = parsePositiveNumber(
    formData.get("price"),
    "Price"
  );

  const duration = parsePositiveNumber(
    formData.get("duration"),
    "Duration"
  );

  const language =
    cleanString(
      formData.get("language")
    ) || "Hindi";

  const level =
    cleanString(
      formData.get("level")
    ) || "Beginner";

  const isPremium =
    formData.get("isPremium") === "true";

  if (!id) {
    throw new Error(
      "Course ID is missing."
    );
  }

  const existingCourse =
    await prisma.course.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

  if (!existingCourse) {
    throw new Error(
      "Course not found."
    );
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
  revalidatePath(
    `/admin/courses/${id}`
  );
  revalidatePath(
    `/admin/courses/${id}/edit`
  );

  redirect(
    `/admin/courses/${id}`
  );
}

export async function toggleCoursePremium(
  id: string
) {
  await requireAdmin();

  const course =
    await prisma.course.findUnique({
      where: {
        id,
      },
    });

  if (!course) {
    throw new Error(
      "Course not found."
    );
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
  revalidatePath(
    `/admin/courses/${id}`
  );
  revalidatePath(
    `/admin/courses/${id}/edit`
  );
}

export async function deleteCourse(
  id: string
) {
  await requireAdmin();

  const course =
    await prisma.course.findUnique({
      where: {
        id,
      },
    });

  if (!course) {
    throw new Error(
      "Course not found."
    );
  }

  await prisma.course.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/courses");

  redirect("/admin/courses");
}

export async function updateLesson(
  formData: FormData
) {
  await requireAdmin();

  const id = cleanString(
    formData.get("id")
  );

  const courseId = cleanString(
    formData.get("courseId")
  );

  const title = cleanString(
    formData.get("title")
  );

  const description = cleanString(
    formData.get("description")
  );

  const videoUrl =
    normalizeVideoUrl(
      formData.get("videoUrl")
    );

  const notesUrl =
    normalizeOptionalUrl(
      formData.get("notesUrl"),
      "Notes URL"
    );

  const duration =
    parsePositiveNumber(
      formData.get("duration"),
      "Duration"
    );

  const lessonOrder =
    parsePositiveInteger(
      formData.get("lessonOrder"),
      "Lesson order"
    );

  if (!id || !courseId) {
    throw new Error(
      "Lesson ID and Course ID are required."
    );
  }

  if (!title) {
    throw new Error(
      "Lesson title is required."
    );
  }

  if (!description) {
    throw new Error(
      "Lesson description is required."
    );
  }

  const lesson =
    await prisma.lesson.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        courseId: true,
      },
    });

  if (!lesson) {
    throw new Error(
      "Lesson not found."
    );
  }

  /*
   * Prevent a malicious request from moving a lesson
   * between courses by changing the hidden courseId.
   */
  if (lesson.courseId !== courseId) {
    throw new Error(
      "Lesson does not belong to this course."
    );
  }

  const duplicateOrder =
    await prisma.lesson.findFirst({
      where: {
        courseId,
        lessonOrder,
        NOT: {
          id,
        },
      },
      select: {
        id: true,
      },
    });

  if (duplicateOrder) {
    throw new Error(
      `Lesson order ${lessonOrder} is already used in this course.`
    );
  }

  await prisma.lesson.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      videoUrl,
      notesUrl,
      duration,
      lessonOrder,
    },
  });

  revalidatePath(
    `/admin/courses/${courseId}/lessons`
  );

  revalidatePath(
    `/admin/courses/${courseId}/lessons/${id}/edit`
  );

  revalidatePath(
    `/courses/${courseId}`
  );

  redirect(
    `/admin/courses/${courseId}/lessons`
  );
}

export async function createLesson(
  formData: FormData
) {
  await requireAdmin();

  const courseId = cleanString(
    formData.get("courseId")
  );

  const title = cleanString(
    formData.get("title")
  );

  const description = cleanString(
    formData.get("description")
  );

  const videoUrl =
    normalizeVideoUrl(
      formData.get("videoUrl")
    );

  const notesUrl =
    normalizeOptionalUrl(
      formData.get("notesUrl"),
      "Notes URL"
    );

  const duration =
    parsePositiveNumber(
      formData.get("duration"),
      "Duration"
    );

  const lessonOrder =
    parsePositiveInteger(
      formData.get("lessonOrder"),
      "Lesson order"
    );

  if (!courseId || !title) {
    throw new Error(
      "Course ID and Title are required."
    );
  }

  if (!description) {
    throw new Error(
      "Lesson description is required."
    );
  }

  const course =
    await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
      },
    });

  if (!course) {
    throw new Error(
      "Course not found."
    );
  }

  const duplicateOrder =
    await prisma.lesson.findFirst({
      where: {
        courseId,
        lessonOrder,
      },
      select: {
        id: true,
      },
    });

  if (duplicateOrder) {
    throw new Error(
      `Lesson order ${lessonOrder} is already used in this course.`
    );
  }

  await prisma.lesson.create({
    data: {
      title,
      description,
      videoUrl,
      notesUrl,
      duration,
      lessonOrder,
      courseId,
    },
  });

  revalidatePath(
    `/admin/courses/${courseId}/lessons`
  );

  revalidatePath(
    `/courses/${courseId}`
  );

  redirect(
    `/admin/courses/${courseId}/lessons`
  );
}

export async function createQuiz(
  formData: FormData
) {
  await requireAdmin();

  const title = cleanString(
    formData.get("title")
  );

  const courseId = cleanString(
    formData.get("courseId")
  );

  const description =
    cleanString(
      formData.get("description")
    ) || null;

  if (!title || !courseId) {
    throw new Error(
      "Title and Course are required."
    );
  }

  const course =
    await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
      },
    });

  if (!course) {
    throw new Error(
      "Course not found."
    );
  }

  await prisma.quiz.create({
    data: {
      title,
      description,
      courseId,
    },
  });

  revalidatePath("/admin/quizzes");

  redirect("/admin/quizzes");
}

export async function deleteLesson(
  lessonId: string,
  courseId: string
) {
  await requireAdmin();

  const lesson =
    await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        id: true,
        courseId: true,
      },
    });

  if (!lesson) {
    throw new Error(
      "Lesson not found."
    );
  }

  if (lesson.courseId !== courseId) {
    throw new Error(
      "Lesson does not belong to this course."
    );
  }

  await prisma.lesson.delete({
    where: {
      id: lessonId,
    },
  });

  revalidatePath(
    `/admin/courses/${courseId}/lessons`
  );

  redirect(
    `/admin/courses/${courseId}/lessons`
  );
}

export async function deleteQuiz(
  quizId: string
) {
  await requireAdmin();

  const quiz =
    await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
    });

  if (!quiz) {
    throw new Error(
      "Quiz not found."
    );
  }

  await prisma.quiz.delete({
    where: {
      id: quizId,
    },
  });

  revalidatePath("/admin/quizzes");

  redirect("/admin/quizzes");
}