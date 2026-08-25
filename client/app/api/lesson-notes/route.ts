import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ============================================================
// GET /api/lesson-notes?lessonId=...
//
// PROTECTED LMS STUDY NOTES
//
// ACCESS:
//
// ADMIN
//   OR
//
// STUDENT + ENROLLMENT + SUCCESSFUL PAYMENT
//
// IMPORTANT:
//
// 1. Every learner-facing study note is treated as PREMIUM.
// 2. Enrollment alone is NOT enough.
// 3. A successful payment is required for EVERY course.
// 4. Paid amount must exactly match the current course price.
// 5. A valid Razorpay payment/transaction ID is required.
// 6. Database must store the PRIVATE Vercel Blob pathname only.
//
// Example:
//   courses/abg/lesson-01.pdf
//
// Never store:
//   https://xxxxx.public.blob.vercel-storage.com/...
//
// This endpoint returns the protected file only after authorization.
// ============================================================

export async function GET(request: NextRequest) {
  try {
    // ==========================================================
    // 1. AUTHENTICATION
    // ==========================================================

    const session = await auth();

    const email = session?.user?.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
          code: "AUTH_REQUIRED",
        },
        {
          status: 401,
        },
      );
    }

    // ==========================================================
    // 2. LESSON ID
    // ==========================================================

    const lessonId = request.nextUrl.searchParams.get("lessonId")?.trim();

    if (!lessonId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing lessonId",
          code: "LESSON_ID_REQUIRED",
        },
        {
          status: 400,
        },
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
      return NextResponse.json(
        {
          success: false,
          error: "User account was not found",
          code: "USER_NOT_FOUND",
        },
        {
          status: 401,
        },
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
      return NextResponse.json(
        {
          success: false,
          error: "Lesson not found",
          code: "LESSON_NOT_FOUND",
        },
        {
          status: 404,
        },
      );
    }

    // ==========================================================
    // 5. ADMIN ACCESS
    //
    // Admin can access protected study resources.
    // ==========================================================

    const isAdmin = user.role === "ADMIN";

    // ==========================================================
    // 6. STUDENT ACCESS
    //
    // IMPORTANT:
    //
    // ALL STUDY NOTES ARE NOW PAID-ONLY FOR STUDENTS.
    //
    // Required:
    //
    //   Enrollment
    //   +
    //   SUCCESSFUL PAYMENT
    //   +
    //   Exact payment amount match
    //   +
    //   Valid Razorpay/payment transaction ID
    //
    // This intentionally does NOT depend on user.isPremium.
    // Access is tied to the purchased course.
    //
    // This also protects against an accidentally configured
    // isPremium=false course giving away private notes.
    // ==========================================================

    if (!isAdmin) {
      // --------------------------------------------------------
      // ENROLLMENT
      // --------------------------------------------------------

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
            message:
              "Enroll in the course and complete the purchase to access protected study notes.",
          },
          {
            status: 403,
          },
        );
      }

      // --------------------------------------------------------
      // SUCCESSFUL PAYMENT
      // --------------------------------------------------------

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

      // --------------------------------------------------------
      // PAYMENT AMOUNT VALIDATION
      //
      // Protect against inconsistent or manually altered payment
      // records.
      // --------------------------------------------------------

      const paidAmountInPaise = Math.round(
        Number(successfulPayment.amount) * 100,
      );

      const courseAmountInPaise = Math.round(Number(lesson.course.price) * 100);

      const amountMatches =
        Number.isSafeInteger(paidAmountInPaise) &&
        Number.isSafeInteger(courseAmountInPaise) &&
        paidAmountInPaise > 0 &&
        courseAmountInPaise > 0 &&
        paidAmountInPaise === courseAmountInPaise;

      // --------------------------------------------------------
      // PAYMENT TRANSACTION VALIDATION
      // --------------------------------------------------------

      const transactionExists = Boolean(
        successfulPayment.razorpayPaymentId ||
          successfulPayment.transactionId,
      );

      if (!amountMatches || !transactionExists) {
        console.error("LESSON NOTES PAYMENT VALIDATION FAILED:", {
          userId: user.id,
          courseId: lesson.courseId,
          lessonId: lesson.id,
          paymentId: successfulPayment.id,
          paidAmount: successfulPayment.amount,
          coursePrice: lesson.course.price,
          amountMatches,
          transactionExists,
        });

        return NextResponse.json(
          {
            success: false,
            error: "Payment verification required",
            code: "PAYMENT_VALIDATION_FAILED",
            message:
              "Your payment could not be validated for this course.",
          },
          {
            status: 403,
          },
        );
      }

      // --------------------------------------------------------
      // EXTRA PREMIUM ENFORCEMENT
      //
      // All learner-facing notes are paid resources.
      // Even if an old/incorrect course record says isPremium=false,
      // notes remain locked for students.
      // --------------------------------------------------------

      if (!lesson.course.isPremium) {
        console.error("NON-PREMIUM COURSE NOTE ACCESS BLOCKED:", {
          userId: user.id,
          courseId: lesson.courseId,
          lessonId: lesson.id,
        });

        return NextResponse.json(
          {
            success: false,
            error: "Premium purchase required",
            code: "PREMIUM_RESOURCE_REQUIRED",
            message:
              "This study resource is available only through paid course access.",
          },
          {
            status: 403,
          },
        );
      }
    }

    // ==========================================================
    // 7. NOTES URL
    // ==========================================================

    const notesUrl = lesson.notesUrl?.trim();

    if (!notesUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Study notes are not available for this lesson",
          code: "NOTES_NOT_AVAILABLE",
        },
        {
          status: 404,
        },
      );
    }

    // ==========================================================
    // 8. PUBLIC URL PROTECTION
    //
    // Never allow an already-public Blob URL to be served through
    // this protected endpoint.
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

      return NextResponse.json(
        {
          success: false,
          error: "Protected resource configuration error",
          code: "PUBLIC_NOTES_URL",
        },
        {
          status: 500,
        },
      );
    }

    // ==========================================================
    // 9. PROTECTED VERCEL BLOB
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

      return NextResponse.json(
        {
          success: false,
          error: "Protected study note not found",
          code: "PROTECTED_NOTE_NOT_FOUND",
        },
        {
          status: 404,
        },
      );
    }

    // ==========================================================
    // 10. RESPONSE METADATA
    // ==========================================================

    const contentType = result.blob.contentType || "application/pdf";

    const filename =
      result.blob.pathname.split("/").pop() ||
      `lesson-${lesson.id}.pdf`;

    const safeFilename = sanitizeFilename(filename);

    // ==========================================================
    // 11. PROTECTED RESPONSE HEADERS
    //
    // Use Headers API so optional Content-Length does not create
    // a TypeScript HeadersInit error.
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
    // 12. FILE RESPONSE
    // ==========================================================

    return new NextResponse(result.stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("LESSON NOTES ACCESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to access protected study notes",
        code: "NOTES_ACCESS_ERROR",
      },
      {
        status: 500,
      },
    );
  }
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