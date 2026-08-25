import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      isPremium: true,
    },
  });
}

export async function canAccessCourse(courseId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      isPremium: true,
    },
  });

  if (!course) {
    return false;
  }

  // Free course
  if (!course.isPremium) {
    return true;
  }

  // Admin always has access
  if (user.role === "ADMIN") {
    return true;
  }

  // Global premium membership
  if (user.isPremium) {
    return true;
  }

  // Paid/enrolled course access
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: user.id,
      courseId: course.id,
    },
    select: {
      id: true,
    },
  });

  return Boolean(enrollment);
}

export async function requireCourseAccess(courseId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      allowed: false as const,
      status: 401,
      reason: "LOGIN_REQUIRED",
      user: null,
    };
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      title: true,
      isPremium: true,
    },
  });

  if (!course) {
    return {
      allowed: false as const,
      status: 404,
      reason: "COURSE_NOT_FOUND",
      user,
    };
  }

  if (!course.isPremium) {
    return {
      allowed: true as const,
      user,
      course,
    };
  }

  if (user.role === "ADMIN" || user.isPremium) {
    return {
      allowed: true as const,
      user,
      course,
    };
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: user.id,
      courseId: course.id,
    },
    select: {
      id: true,
    },
  });

  if (!enrollment) {
    return {
      allowed: false as const,
      status: 403,
      reason: "PREMIUM_REQUIRED",
      user,
      course,
    };
  }

  return {
    allowed: true as const,
    user,
    course,
  };
}