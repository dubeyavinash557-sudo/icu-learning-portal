import prisma from "@/lib/prisma";
import { auth } from "@/auth";

type AccessDeniedReason =
  | "LOGIN_REQUIRED"
  | "COURSE_NOT_FOUND"
  | "ENROLLMENT_REQUIRED"
  | "PAYMENT_REQUIRED"
  | "PAYMENT_AMOUNT_MISMATCH"
  | "PAYMENT_NOT_VERIFIED";

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

/**
 * Normal course access.
 *
 * Used for course pages / learning navigation.
 * Free courses remain accessible.
 * Premium courses require:
 * - ADMIN
 * - global premium membership
 * - OR successful payment for that course
 */
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
      price: true,
    },
  });

  if (!course) {
    return false;
  }

  // Admin always has access.
  if (user.role === "ADMIN") {
    return true;
  }

  // Global premium membership.
  if (user.isPremium) {
    return true;
  }

  // Free course.
  if (!course.isPremium && Number(course.price) <= 0) {
    return true;
  }

  // Paid course requires successful payment.
  const payment = await prisma.payment.findFirst({
    where: {
      userId: user.id,
      courseId: course.id,
      status: "SUCCESS",
    },
    select: {
      id: true,
      amount: true,
      razorpayPaymentId: true,
      transactionId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!payment) {
    return false;
  }

  const paidAmount = Math.round(Number(payment.amount) * 100);
  const courseAmount = Math.round(Number(course.price) * 100);

  if (
    !Number.isSafeInteger(paidAmount) ||
    !Number.isSafeInteger(courseAmount) ||
    paidAmount !== courseAmount
  ) {
    return false;
  }

  if (!payment.razorpayPaymentId && !payment.transactionId) {
    return false;
  }

  return true;
}

/**
 * PREMIUM RESOURCE ACCESS
 *
 * IMPORTANT:
 * Use this function for:
 * - Study Notes
 * - PDF downloads
 * - Premium quizzes
 * - Premium videos/resources
 *
 * This is intentionally stricter than normal course access.
 *
 * For paid/premium resources:
 * successful payment for the exact course is required.
 */
export async function canAccessPremiumResource(courseId: string) {
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
      price: true,
      isPremium: true,
    },
  });

  if (!course) {
    return false;
  }

  // Admin can access protected resources.
  if (user.role === "ADMIN") {
    return true;
  }

  // Global premium membership can access protected resources.
  if (user.isPremium) {
    return true;
  }

  /*
   * Premium resource means payment is required.
   *
   * We intentionally do NOT use enrollment alone.
   */
  const payment = await prisma.payment.findFirst({
    where: {
      userId: user.id,
      courseId: course.id,
      status: "SUCCESS",
    },
    select: {
      id: true,
      amount: true,
      razorpayPaymentId: true,
      transactionId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!payment) {
    return false;
  }

  const paidAmountInPaise = Math.round(
    Number(payment.amount) * 100,
  );

  const courseAmountInPaise = Math.round(
    Number(course.price) * 100,
  );

  if (
    !Number.isSafeInteger(paidAmountInPaise) ||
    !Number.isSafeInteger(courseAmountInPaise)
  ) {
    return false;
  }

  if (paidAmountInPaise !== courseAmountInPaise) {
    return false;
  }

  /*
   * Require an actual payment transaction identifier.
   * This prevents a manually-created SUCCESS record
   * without a real payment reference from unlocking
   * premium resources.
   */
  if (!payment.razorpayPaymentId && !payment.transactionId) {
    return false;
  }

  return true;
}

/**
 * Detailed normal course access check.
 */
export async function requireCourseAccess(courseId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      allowed: false as const,
      status: 401,
      reason: "LOGIN_REQUIRED" as AccessDeniedReason,
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
      price: true,
    },
  });

  if (!course) {
    return {
      allowed: false as const,
      status: 404,
      reason: "COURSE_NOT_FOUND" as AccessDeniedReason,
      user,
    };
  }

  if (user.role === "ADMIN" || user.isPremium) {
    return {
      allowed: true as const,
      user,
      course,
    };
  }

  if (!course.isPremium && Number(course.price) <= 0) {
    return {
      allowed: true as const,
      user,
      course,
    };
  }

  const payment = await prisma.payment.findFirst({
    where: {
      userId: user.id,
      courseId: course.id,
      status: "SUCCESS",
    },
    select: {
      id: true,
      amount: true,
      razorpayPaymentId: true,
      transactionId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!payment) {
    return {
      allowed: false as const,
      status: 403,
      reason: "PAYMENT_REQUIRED" as AccessDeniedReason,
      user,
      course,
    };
  }

  const paidAmountInPaise = Math.round(
    Number(payment.amount) * 100,
  );

  const courseAmountInPaise = Math.round(
    Number(course.price) * 100,
  );

  if (
    paidAmountInPaise !== courseAmountInPaise ||
    !Number.isSafeInteger(paidAmountInPaise) ||
    !Number.isSafeInteger(courseAmountInPaise)
  ) {
    return {
      allowed: false as const,
      status: 403,
      reason: "PAYMENT_AMOUNT_MISMATCH" as AccessDeniedReason,
      user,
      course,
    };
  }

  if (!payment.razorpayPaymentId && !payment.transactionId) {
    return {
      allowed: false as const,
      status: 403,
      reason: "PAYMENT_NOT_VERIFIED" as AccessDeniedReason,
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

/**
 * Detailed PREMIUM RESOURCE access check.
 *
 * Use this specifically for:
 * PDF / notes / premium quiz / protected resources.
 */
export async function requirePremiumResourceAccess(
  courseId: string,
) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      allowed: false as const,
      status: 401,
      reason: "LOGIN_REQUIRED" as AccessDeniedReason,
      user: null,
      course: null,
    };
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      title: true,
      price: true,
      isPremium: true,
    },
  });

  if (!course) {
    return {
      allowed: false as const,
      status: 404,
      reason: "COURSE_NOT_FOUND" as AccessDeniedReason,
      user,
      course: null,
    };
  }

  // Admin bypass.
  if (user.role === "ADMIN") {
    return {
      allowed: true as const,
      user,
      course,
    };
  }

  // Global premium membership.
  if (user.isPremium) {
    return {
      allowed: true as const,
      user,
      course,
    };
  }

  /*
   * IMPORTANT:
   * Enrollment is NOT sufficient for premium resources.
   */
  const payment = await prisma.payment.findFirst({
    where: {
      userId: user.id,
      courseId: course.id,
      status: "SUCCESS",
    },
    select: {
      id: true,
      amount: true,
      razorpayPaymentId: true,
      transactionId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!payment) {
    return {
      allowed: false as const,
      status: 403,
      reason: "PAYMENT_REQUIRED" as AccessDeniedReason,
      user,
      course,
    };
  }

  const paidAmountInPaise = Math.round(
    Number(payment.amount) * 100,
  );

  const courseAmountInPaise = Math.round(
    Number(course.price) * 100,
  );

  if (
    !Number.isSafeInteger(paidAmountInPaise) ||
    !Number.isSafeInteger(courseAmountInPaise) ||
    paidAmountInPaise !== courseAmountInPaise
  ) {
    return {
      allowed: false as const,
      status: 403,
      reason: "PAYMENT_AMOUNT_MISMATCH" as AccessDeniedReason,
      user,
      course,
    };
  }

  if (!payment.razorpayPaymentId && !payment.transactionId) {
    return {
      allowed: false as const,
      status: 403,
      reason: "PAYMENT_NOT_VERIFIED" as AccessDeniedReason,
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