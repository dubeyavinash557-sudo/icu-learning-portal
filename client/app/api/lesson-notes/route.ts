import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ============================================================
// GET /api/lesson-notes?lessonId=...
//
// PROTECTED LMS STUDY NOTES
//
// ACCESS POLICY
//
// ADMIN
//   OR
//
// FREE DEMO COURSE
//   + AUTHENTICATED USER
//   + COURSE ENROLLMENT
//
// PREMIUM COURSE
//   + AUTHENTICATED USER
//   + COURSE ENROLLMENT
//   + SUCCESSFUL PAYMENT
//   + EXACT PAYMENT AMOUNT
//   + VALID PAYMENT IDENTIFIER
//
// NOTES MUST BE STORED AS A PRIVATE VERCEL BLOB PATHNAME.
//
// Correct:
//   courses/icu/lesson-01.pdf
//
// Incorrect:
//   https://xxxxx.public.blob.vercel-storage.com/...
//
// This endpoint returns the protected file only after
// authorization and private Blob validation.
// ============================================================

export async function GET(request: NextRequest) {
  try {
    // ==========================================================
    // 1. AUTHENTICATION
    // ==========================================================

    const session = await auth();

    const email = session?.user?.email?.trim().toLowerCase();

    if (!email) {
      return jsonError(
        "Authentication required",
        "AUTH_REQUIRED",
        401,
      );
    }

    // ==========================================================
    // 2. LESSON ID
    // ==========================================================

    const lessonId = request.nextUrl.searchParams.get("lessonId")?.trim();

    if (!lessonId) {
      return jsonError(
        "Missing lessonId",
        "LESSON_ID_REQUIRED",
        400,
      );
    }

    // ==========================================================
    // 3. CURRENT USER
    // ==========================================================

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return jsonError(
        "User account was not found",
        "USER_NOT_FOUND",
        401,
      );
    }

        // ==========================================================
    // 4. LESSON + COURSE
    // ==========================================================

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        id: true,
        courseId: true,
        title: true,
        notesUrl: true,

        course: {
          select: {
            id: true,
            title: true,
            price: true,
            isPremium: true,
          },
        },
      },
    });

    if (!lesson) {
      return jsonError(
        "Lesson not found",
        "LESSON_NOT_FOUND",
        404,
      );
    }

    // ==========================================================
    // 5. COURSE TYPE
    // ==========================================================

    const isFreeDemo =
      lesson.course.isPremium === false &&
      Number.isFinite(lesson.course.price) &&
      lesson.course.price === 0;

    const isPremiumCourse =
      lesson.course.isPremium === true &&
      Number.isFinite(lesson.course.price) &&
      lesson.course.price > 0;

    const isAdmin = user.role === "ADMIN";

    // Invalid course configuration should never grant access.
    if (!isFreeDemo && !isPremiumCourse && !isAdmin) {
      console.error("INVALID COURSE ACCESS CONFIGURATION:", {
        userId: user.id,
        courseId: lesson.courseId,
        lessonId: lesson.id,
        price: lesson.course.price,
        isPremium: lesson.course.isPremium,
      });

      return jsonError(
        "Course access configuration is invalid",
        "INVALID_COURSE_CONFIGURATION",
        500,
      );
    }

    // ==========================================================
    // 6. ADMIN ACCESS
    // ==========================================================

    if (isAdmin) {
      // Admin can access protected study resources directly.
      // Payment and enrollment checks are intentionally skipped.
    } else {
      // Student authorization continues in the next section.

            // ========================================================
      // 7. ENROLLMENT
      // ========================================================

      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: lesson.courseId,
          },
        },
        select: {
          id: true,
          progress: true,
          completed: true,
        },
      });

      if (!enrollment) {
        return NextResponse.json(
          {
            success: false,
            error: "Course enrollment required",
            code: "COURSE_ENROLLMENT_REQUIRED",
            courseId: lesson.courseId,
            message: isFreeDemo
              ? "Enroll in this free demo course to access its study notes."
              : "Enroll in the course and complete the purchase to access protected study notes.",
          },
          {
            status: 403,
          },
        );
      }

      // ========================================================
      // 8. FREE DEMO ACCESS
      // ========================================================

      if (isFreeDemo) {
        // Free demo notes require only:
        //
        // 1. Authenticated user
        // 2. Existing enrollment
        //
        // No payment is required.
      }

      // Premium payment validation continues below.

            // ========================================================
      // 9. PREMIUM PAYMENT VALIDATION
      // ========================================================

      if (isPremiumCourse) {
        const successfulPayment = await prisma.payment.findFirst({
          where: {
            userId: user.id,
            courseId: lesson.courseId,
            status: "SUCCESS",
          },
          select: {
            id: true,
            amount: true,
            status: true,
            transactionId: true,
            razorpayOrderId: true,
            razorpayPaymentId: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (!successfulPayment) {
          return NextResponse.json(
            {
              success: false,
              error: "Course purchase required",
              code: "COURSE_PAYMENT_REQUIRED",
              courseId: lesson.courseId,
              message:
                "Complete the course purchase to unlock protected study notes.",
            },
            {
              status: 403,
            },
          );
        }

        // ------------------------------------------------------
        // PAYMENT AMOUNT VALIDATION
        // ------------------------------------------------------

        const paidAmountInPaise = Math.round(
          Number(successfulPayment.amount) * 100,
        );

        const courseAmountInPaise = Math.round(
          Number(lesson.course.price) * 100,
        );

        const amountMatches =
          Number.isSafeInteger(paidAmountInPaise) &&
          Number.isSafeInteger(courseAmountInPaise) &&
          paidAmountInPaise > 0 &&
          courseAmountInPaise > 0 &&
          paidAmountInPaise === courseAmountInPaise;

        // ------------------------------------------------------
        // PAYMENT IDENTIFIER VALIDATION
        // ------------------------------------------------------

        const hasPaymentIdentifier = Boolean(
          successfulPayment.razorpayPaymentId?.trim() ||
            successfulPayment.transactionId?.trim(),
        );

        if (!amountMatches || !hasPaymentIdentifier) {
          console.error("LESSON NOTES PAYMENT VALIDATION FAILED:", {
            userId: user.id,
            courseId: lesson.courseId,
            lessonId: lesson.id,
            paymentId: successfulPayment.id,
            paidAmount: successfulPayment.amount,
            coursePrice: lesson.course.price,
            amountMatches,
            hasPaymentIdentifier,
          });

          return jsonError(
            "Your payment could not be validated for this course",
            "PAYMENT_VALIDATION_FAILED",
            403,
          );
        }
      }
    }

    // ==========================================================
    // 10. NOTES URL
    // ==========================================================

    const notesUrl = lesson.notesUrl?.trim();

    if (!notesUrl) {
      return jsonError(
        "Study notes are not available for this lesson",
        "NOTES_NOT_AVAILABLE",
        404,
      );
    }

        // ==========================================================
    // 11. PUBLIC URL PROTECTION
    // ==========================================================

    if (
      notesUrl.startsWith("http://") ||
      notesUrl.startsWith("https://")
    ) {
      console.error("SECURITY ERROR: PUBLIC NOTES URL FOUND:", {
        lessonId: lesson.id,
        courseId: lesson.courseId,
        notesUrl,
      });

      return jsonError(
        "Protected resource configuration error",
        "PUBLIC_NOTES_URL",
        500,
      );
    }

    // ==========================================================
    // 12. PRIVATE VERCEL BLOB
    // ==========================================================

    const result = await get(notesUrl, {
      access: "private",
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      console.error("PROTECTED NOTE NOT FOUND:", {
        lessonId: lesson.id,
        courseId: lesson.courseId,
        notesUrl,
      });

      return jsonError(
        "Protected study note not found",
        "PROTECTED_NOTE_NOT_FOUND",
        404,
      );
    }

    // ==========================================================
    // 13. RESPONSE METADATA
    // ==========================================================

    const contentType = result.blob.contentType || "application/pdf";

    const filename =
      result.blob.pathname.split("/").pop() ||
      `lesson-${lesson.id}.pdf`;

    const safeFilename = sanitizeFilename(filename);

    // ==========================================================
    // 14. SECURITY HEADERS
    // ==========================================================

    const headers = new Headers();

    headers.set("Content-Type", contentType);

    headers.set(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"`,
    );

    if (typeof result.blob.size === "number") {
      headers.set("Content-Length", String(result.blob.size));
    }

    headers.set("X-Content-Type-Options", "nosniff");

    headers.set(
      "Cache-Control",
      "private, no-store, max-age=0, must-revalidate",
    );

    headers.set("Pragma", "no-cache");

    headers.set(
      "Content-Security-Policy",
      "default-src 'none'; frame-ancestors 'none';",
    );

    headers.set("Referrer-Policy", "no-referrer");

    headers.set(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=()",
    );

    headers.set(
      "X-Robots-Tag",
      "noindex, nofollow, noarchive, nosnippet",
    );

    headers.set("X-Frame-Options", "DENY");

        // ==========================================================
    // 15. PROTECTED FILE RESPONSE
    // ==========================================================

    return new NextResponse(result.stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("LESSON NOTES ACCESS ERROR:", error);

    return jsonError(
      "Unable to access protected study notes",
      "NOTES_ACCESS_ERROR",
      500,
    );
  }
}

// ============================================================
// JSON ERROR HELPER
// ============================================================

function jsonError(
  error: string,
  code: string,
  status: number,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json(
    {
      success: false,
      error,
      code,
      ...extra,
    },
    {
      status,
    },
  );
}

// ============================================================
// FILENAME SANITIZER
// ============================================================

function sanitizeFilename(filename: string) {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 150);
}