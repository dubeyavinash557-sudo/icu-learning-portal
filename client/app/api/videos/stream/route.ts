
import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function jsonError(
  message: string,
  code: string,
  status: number
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code,
    },
    {
      status,
      headers: {
        "Cache-Control": "private, no-store",
      },
    }
  );
}

function isPrivateVideoPath(
  pathname: string,
  courseId: string
) {
  const prefix = `videos/${courseId}/`;

  if (!pathname.startsWith(prefix)) {
    return false;
  }

  if (
    pathname.startsWith("/") ||
    pathname.includes("..") ||
    pathname.includes("\\") ||
    pathname.includes("?") ||
    pathname.includes("#")
  ) {
    return false;
  }

  const filename = pathname.slice(prefix.length);

  if (
    !filename ||
    filename.includes("/") ||
    !/^[a-zA-Z0-9._-]{1,180}$/.test(filename)
  ) {
    return false;
  }

  return /\.(mp4|webm|ogg)$/i.test(filename);
}

export async function GET(request: NextRequest) {
  try {
    // --------------------------------------------------
    // 1. AUTHENTICATION
    // --------------------------------------------------

    const session = await auth();

    const email = session?.user?.email
      ?.trim()
      .toLowerCase();

    if (!email) {
      return jsonError(
        "Please login to watch this lesson.",
        "AUTH_REQUIRED",
        401
      );
    }

    // --------------------------------------------------
    // 2. LESSON ID
    // --------------------------------------------------

    const lessonId = request.nextUrl.searchParams
      .get("lessonId")
      ?.trim();

    if (!lessonId) {
      return jsonError(
        "Lesson ID is required.",
        "LESSON_ID_REQUIRED",
        400
      );
    }

    // --------------------------------------------------
    // 3. CURRENT USER
    // --------------------------------------------------

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
        "User account was not found.",
        "USER_NOT_FOUND",
        401
      );
    }

    const isAdmin = user.role === "ADMIN";

    // --------------------------------------------------
    // 4. LESSON + COURSE
    // --------------------------------------------------

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        id: true,
        title: true,
        videoUrl: true,
        courseId: true,

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
        "Lesson not found.",
        "LESSON_NOT_FOUND",
        404
      );
    }

    // --------------------------------------------------
    // 5. COURSE CONFIGURATION
    // --------------------------------------------------

    const coursePrice = Number(lesson.course.price);

    const isFreeDemo =
      lesson.course.isPremium === false &&
      Number.isFinite(coursePrice) &&
      coursePrice === 0;

    const isPremiumCourse =
      lesson.course.isPremium === true &&
      Number.isFinite(coursePrice) &&
      coursePrice > 0;

    if (!isFreeDemo && !isPremiumCourse && !isAdmin) {
      return jsonError(
        "Course access configuration is invalid.",
        "INVALID_COURSE_CONFIGURATION",
        500
      );
    }

    // --------------------------------------------------
    // 6. ENROLLMENT + PAYMENT VALIDATION
    // --------------------------------------------------

    if (!isAdmin) {
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
          "You must enroll in this course first.",
          "COURSE_ENROLLMENT_REQUIRED",
          403
        );
      }

      if (isPremiumCourse) {
        const payment =
          await prisma.payment.findFirst({
            where: {
              userId: user.id,
              courseId: lesson.courseId,
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
          return jsonError(
            "Successful course payment is required.",
            "COURSE_PAYMENT_REQUIRED",
            403
          );
        }

        const paidAmount = Number(payment.amount);

        const paidAmountInPaise = Math.round(
          paidAmount * 100
        );

        const courseAmountInPaise = Math.round(
          coursePrice * 100
        );

        const amountMatches =
          Number.isFinite(paidAmount) &&
          Number.isFinite(coursePrice) &&
          Number.isSafeInteger(paidAmountInPaise) &&
          Number.isSafeInteger(courseAmountInPaise) &&
          paidAmountInPaise > 0 &&
          courseAmountInPaise > 0 &&
          paidAmountInPaise === courseAmountInPaise;

        const hasPaymentIdentifier = Boolean(
          payment.razorpayPaymentId?.trim() ||
          payment.transactionId?.trim()
        );

        if (
          !amountMatches ||
          !hasPaymentIdentifier
        ) {
          return jsonError(
            "Your course payment could not be verified.",
            "PAYMENT_VALIDATION_FAILED",
            403
          );
        }
      }
    }

    // --------------------------------------------------
    // 7. PRIVATE BLOB PATH VALIDATION
    // --------------------------------------------------

    const pathname = lesson.videoUrl?.trim();

    if (!pathname) {
      return jsonError(
        "No video has been added to this lesson.",
        "VIDEO_NOT_AVAILABLE",
        404
      );
    }

    // Only our Private Blob pathname is accepted.
    // Public URLs and YouTube URLs are rejected here.
    if (
      !isPrivateVideoPath(
        pathname,
        lesson.courseId
      )
    ) {
      return jsonError(
        "This lesson video is not stored in the Private Video Store yet.",
        "VIDEO_MIGRATION_REQUIRED",
        409
      );
    }

    // --------------------------------------------------
    // 8. PRIVATE BLOB STREAM
    // --------------------------------------------------

    const blob = await get(pathname, {
      access: "private",
      abortSignal: request.signal,
    });

    if (!blob || blob.statusCode !== 200 || !blob.stream) {
      return jsonError(
        "Video file could not be found.",
        "VIDEO_FILE_NOT_FOUND",
        404
      );
    }

    const contentType = blob.blob.contentType;

    if (
      !contentType ||
      ![
        "video/mp4",
        "video/webm",
        "video/ogg",
      ].includes(contentType)
    ) {
      return jsonError(
        "Unsupported video file type.",
        "INVALID_VIDEO_TYPE",
        415
      );
    }

    // --------------------------------------------------
    // 9. STREAM RESPONSE
    // --------------------------------------------------

    const headers = new Headers();

    headers.set("Content-Type", contentType);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Cache-Control", "private, no-store");
    headers.set("Content-Disposition", "inline");
    headers.set("Vary", "Cookie");

    if (blob.blob.size !== null) {
      headers.set(
        "Content-Length",
        String(blob.blob.size)
      );
    }

    return new NextResponse(blob.stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(
      "SECURE VIDEO STREAM ERROR:",
      error
    );

    return jsonError(
      "Unable to stream this video right now.",
      "VIDEO_STREAM_FAILED",
      500
    );
  }
}
