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
// RESOURCE POLICY
//
// FREE DEMO:
//   Local /public resource is allowed.
//
// PREMIUM:
//   ONLY private Vercel Blob pathname is allowed.
//
// Correct premium value:
//   courses/icu-nursing/lesson-01.pdf
//
// Incorrect premium values:
//   /pdfs/lesson-01.pdf
//   https://xxxxx.public.blob.vercel-storage.com/...
//
// IMPORTANT:
// A premium study resource must never be served from
// /public because /public files are directly accessible
// without this authorization endpoint.
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

    const lessonId = request.nextUrl.searchParams
      .get("lessonId")
      ?.trim();

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

    const coursePrice = Number(lesson.course.price);

    const isFreeDemo =
      lesson.course.isPremium === false &&
      Number.isFinite(coursePrice) &&
      coursePrice === 0;

    const isPremiumCourse =
      lesson.course.isPremium === true &&
      Number.isFinite(coursePrice) &&
      coursePrice > 0;

    const isAdmin = user.role === "ADMIN";

    // ==========================================================
    // INVALID COURSE CONFIGURATION
    //
    // Never grant access when course configuration is ambiguous.
    // ==========================================================

    if (!isFreeDemo && !isPremiumCourse && !isAdmin) {
      console.error(
        "INVALID COURSE ACCESS CONFIGURATION:",
        {
          userId: user.id,
          courseId: lesson.courseId,
          lessonId: lesson.id,
          price: lesson.course.price,
          isPremium: lesson.course.isPremium,
        },
      );

      return jsonError(
        "Course access configuration is invalid",
        "INVALID_COURSE_CONFIGURATION",
        500,
      );
    }

    // ==========================================================
    // 6. ADMIN ACCESS
    //
    // Admin can inspect protected resources without enrollment
    // or payment because this is an administrative operation.
    // ==========================================================

    if (!isAdmin) {
      // ========================================================
      // 7. ENROLLMENT
      // ========================================================

      const enrollment =
        await prisma.enrollment.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: lesson.courseId,
            },
          },
          select: {
            id: true,
          },
        });

      if (!enrollment) {
        return jsonError(
          "Course enrollment required",
          "COURSE_ENROLLMENT_REQUIRED",
          403,
          {
            courseId: lesson.courseId,
          },
        );
      }

      // ========================================================
      // 8. PREMIUM PAYMENT VALIDATION
      //
      // Free demo:
      //   Enrollment is sufficient.
      //
      // Premium:
      //   Enrollment + successful payment + exact amount +
      //   valid payment identifier.
      // ========================================================

      if (isPremiumCourse) {
        const successfulPayment =
          await prisma.payment.findFirst({
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
          return jsonError(
            "Course purchase required",
            "COURSE_PAYMENT_REQUIRED",
            403,
            {
              courseId: lesson.courseId,
            },
          );
        }

        // ------------------------------------------------------
        // PAYMENT AMOUNT VALIDATION
        //
        // Database amount = INR
        // Razorpay amount = paise
        // ------------------------------------------------------

        const paymentAmount = Number(
          successfulPayment.amount,
        );

        const paidAmountInPaise = Math.round(
          paymentAmount * 100,
        );

        const courseAmountInPaise = Math.round(
          coursePrice * 100,
        );

        const amountMatches =
          Number.isFinite(paymentAmount) &&
          Number.isFinite(coursePrice) &&
          Number.isSafeInteger(
            paidAmountInPaise,
          ) &&
          Number.isSafeInteger(
            courseAmountInPaise,
          ) &&
          paidAmountInPaise > 0 &&
          courseAmountInPaise > 0 &&
          paidAmountInPaise ===
            courseAmountInPaise;

        // ------------------------------------------------------
        // PAYMENT IDENTIFIER VALIDATION
        //
        // We require a real payment reference.
        // ------------------------------------------------------

        const hasPaymentIdentifier =
          Boolean(
            successfulPayment
              .razorpayPaymentId
              ?.trim() ||
              successfulPayment
                .transactionId
                ?.trim(),
          );

        if (
          !amountMatches ||
          !hasPaymentIdentifier
        ) {
          console.error(
            "LESSON NOTES PAYMENT VALIDATION FAILED:",
            {
              userId: user.id,
              courseId: lesson.courseId,
              lessonId: lesson.id,
              paymentId:
                successfulPayment.id,
              paidAmount:
                successfulPayment.amount,
              coursePrice:
                lesson.course.price,
              amountMatches,
              hasPaymentIdentifier,
            },
          );

          return jsonError(
            "Your payment could not be validated for this course",
            "PAYMENT_VALIDATION_FAILED",
            403,
          );
        }
      }
    }

    // ==========================================================
    // 9. NOTES URL
    // ==========================================================

    const notesUrl =
      lesson.notesUrl?.trim();

    if (!notesUrl) {
      return jsonError(
        "Study notes are not available for this lesson",
        "NOTES_NOT_AVAILABLE",
        404,
      );
    }

    // ==========================================================
    // 10. ABSOLUTE URL PROTECTION
    //
    // Never fetch an externally supplied URL.
    //
    // This prevents:
    // - public blob URLs
    // - arbitrary remote URLs
    // - accidental SSRF-style resource fetching
    // ==========================================================

    if (
      notesUrl.startsWith("http://") ||
      notesUrl.startsWith("https://") ||
      notesUrl.startsWith("//")
    ) {
      console.error(
        "SECURITY ERROR: EXTERNAL NOTES URL FOUND:",
        {
          lessonId: lesson.id,
          courseId: lesson.courseId,
        },
      );

      return jsonError(
        "Protected resource configuration error",
        "EXTERNAL_NOTES_URL",
        500,
      );
    }

    // ==========================================================
    // 11. PREMIUM RESOURCE STORAGE POLICY
    //
    // This is the most important security check in this file.
    //
    // Premium notes MUST NOT live under /public.
    //
    // Example of forbidden premium resource:
    //
    //   /pdfs/icu-notes.pdf
    //
    // Because that file would remain directly accessible at:
    //
    //   /pdfs/icu-notes.pdf
    //
    // even if this API rejects unauthorized users.
    //
    // Premium resources must instead use a PRIVATE Vercel Blob
    // pathname such as:
    //
    //   courses/icu-nursing/lesson-01.pdf
    // ==========================================================

    if (
      isPremiumCourse &&
      !isAdmin &&
      notesUrl.startsWith("/")
    ) {
      console.error(
        "SECURITY ERROR: PREMIUM NOTES STORED AS PUBLIC LOCAL RESOURCE:",
        {
          userId: user.id,
          lessonId: lesson.id,
          courseId: lesson.courseId,
        },
      );

      return jsonError(
        "Premium study notes must be stored as a private protected resource",
        "PREMIUM_NOTES_MUST_BE_PRIVATE",
        500,
      );
    }

    // ==========================================================
    // 12. RESOLVE RESOURCE
    //
    // FREE DEMO
    //   /pdfs/... is allowed.
    //
    // PREMIUM
    //   Private Vercel Blob pathname only.
    //
    // ADMIN
    //   Can access either configured resource type.
    // ==========================================================

    let stream:
      | ReadableStream<Uint8Array>
      | null = null;

    let contentType =
      "application/pdf";

    let filename =
      `lesson-${lesson.id}.pdf`;

    let contentLength:
      | number
      | undefined;

    // ==========================================================
    // 12A. FREE DEMO LOCAL RESOURCE
    // ==========================================================

    if (notesUrl.startsWith("/")) {
      const localResourceUrl =
        new URL(
          notesUrl,
          request.url,
        );

      // --------------------------------------------------------
      // Extra protection:
      //
      // Only same-origin local paths are accepted.
      // --------------------------------------------------------

      if (
        localResourceUrl.origin !==
        new URL(request.url).origin
      ) {
        console.error(
          "SECURITY ERROR: LOCAL NOTES ORIGIN MISMATCH:",
          {
            lessonId: lesson.id,
            courseId: lesson.courseId,
          },
        );

        return jsonError(
          "Protected resource configuration error",
          "LOCAL_RESOURCE_ORIGIN_MISMATCH",
          500,
        );
      }

      // --------------------------------------------------------
      // Only free demo or admin may use public local resources.
      // Premium students were rejected above.
      // --------------------------------------------------------

      if (
        !isFreeDemo &&
        !isAdmin
      ) {
        return jsonError(
          "Protected resource configuration error",
          "PUBLIC_RESOURCE_NOT_ALLOWED",
          500,
        );
      }

      const resourceResponse =
        await fetch(
          localResourceUrl,
          {
            cache: "no-store",
          },
        );

      if (
        !resourceResponse.ok ||
        !resourceResponse.body
      ) {
        console.error(
          "LOCAL STUDY NOTE NOT FOUND:",
          {
            lessonId: lesson.id,
            courseId: lesson.courseId,
            status:
              resourceResponse.status,
          },
        );

        return jsonError(
          "Protected study note not found",
          "PROTECTED_NOTE_NOT_FOUND",
          404,
        );
      }

      stream =
        resourceResponse.body;

      contentType =
        resourceResponse.headers.get(
          "content-type",
        ) ||
        contentType;

      const localLength =
        Number(
          resourceResponse.headers.get(
            "content-length",
          ),
        );

      if (
        Number.isSafeInteger(
          localLength,
        ) &&
        localLength > 0
      ) {
        contentLength =
          localLength;
      }

      filename =
        notesUrl
          .split("/")
          .pop() ||
        filename;
    }

    // ==========================================================
    // 12B. PRIVATE VERCEL BLOB RESOURCE
    // ==========================================================

    else {
      const result =
        await get(
          notesUrl,
          {
            access: "private",
          },
        );

      if (
        !result ||
        result.statusCode !== 200 ||
        !result.stream
      ) {
        console.error(
          "PROTECTED NOTE NOT FOUND:",
          {
            lessonId: lesson.id,
            courseId: lesson.courseId,
          },
        );

        return jsonError(
          "Protected study note not found",
          "PROTECTED_NOTE_NOT_FOUND",
          404,
        );
      }

      stream =
        result.stream;

      contentType =
        result.blob.contentType ||
        contentType;

      contentLength =
        result.blob.size;

      filename =
        result.blob.pathname
          .split("/")
          .pop() ||
        filename;
    }

    // ==========================================================
    // 13. FINAL RESOURCE SAFETY CHECK
    // ==========================================================

    if (!stream) {
      return jsonError(
        "Protected study note could not be loaded",
        "RESOURCE_STREAM_UNAVAILABLE",
        500,
      );
    }

    // ==========================================================
    // 14. RESPONSE METADATA
    // ==========================================================

    const safeFilename =
      sanitizeFilename(
        filename,
      );

    // ==========================================================
    // 15. SECURITY HEADERS
    // ==========================================================

    const headers =
      new Headers();

    headers.set(
      "Content-Type",
      contentType,
    );

    headers.set(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"`,
    );

    if (
      typeof contentLength ===
        "number" &&
      contentLength > 0
    ) {
      headers.set(
        "Content-Length",
        String(contentLength),
      );
    }

    headers.set(
      "X-Content-Type-Options",
      "nosniff",
    );

    headers.set(
      "Cache-Control",
      "private, no-store, max-age=0, must-revalidate",
    );

    headers.set(
      "Pragma",
      "no-cache",
    );

    headers.set(
      "Content-Security-Policy",
      "default-src 'none'; frame-ancestors 'none';",
    );

    headers.set(
      "Referrer-Policy",
      "no-referrer",
    );

    headers.set(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=()",
    );

    headers.set(
      "X-Robots-Tag",
      "noindex, nofollow, noarchive, nosnippet",
    );

    headers.set(
      "X-Frame-Options",
      "DENY",
    );

    // ==========================================================
    // 16. PROTECTED FILE RESPONSE
    // ==========================================================

    return new NextResponse(
      stream,
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error(
      "LESSON NOTES ACCESS ERROR:",
      error,
    );

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
  extra?: Record<
    string,
    unknown
  >,
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

function sanitizeFilename(
  filename: string,
) {
  return filename
    .replace(
      /[^a-zA-Z0-9._-]/g,
      "-",
    )
    .replace(
      /-+/g,
      "-",
    )
    .slice(
      0,
      150,
    );
}