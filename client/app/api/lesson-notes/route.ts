import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Authentication required",
          code: "AUTH_REQUIRED",
        },
        {
          status: 401,
        },
      );
    }

    const lessonId = request.nextUrl.searchParams.get("lessonId")?.trim();

    if (!lessonId) {
      return NextResponse.json(
        {
          error: "Missing lessonId",
          code: "LESSON_ID_REQUIRED",
        },
        {
          status: 400,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        role: true,
        isPremium: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
          code: "USER_NOT_FOUND",
        },
        {
          status: 401,
        },
      );
    }

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        id: true,
        courseId: true,
        notesUrl: true,
        course: {
          select: {
            id: true,
            title: true,
            isPremium: true,
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(
        {
          error: "Lesson not found",
          code: "LESSON_NOT_FOUND",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * ============================================================
     * ADMIN ACCESS
     * ============================================================
     */

    const isAdmin = user.role === "ADMIN";

    /*
     * ============================================================
     * PREMIUM ACCESS
     * ============================================================
     *
     * Study notes are paid LMS resources.
     *
     * Requirements:
     *
     * ADMIN
     * OR
     * Premium account + enrollment in this course
     */

    if (!isAdmin) {
      if (!user.isPremium) {
        return NextResponse.json(
          {
            error: "Premium access required",
            code: "PREMIUM_REQUIRED",
            message:
              "Purchase premium access to unlock this study resource.",
          },
          {
            status: 403,
          },
        );
      }

      const enrollment = await prisma.enrollment.findUnique({
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
        return NextResponse.json(
          {
            error: "Course purchase required",
            code: "COURSE_ACCESS_REQUIRED",
            courseId: lesson.courseId,
            message:
              "Purchase this course to unlock its protected study notes.",
          },
          {
            status: 403,
          },
        );
      }
    }

    /*
     * ============================================================
     * NOTES URL
     * ============================================================
     */

    const notesUrl = lesson.notesUrl?.trim();

    if (!notesUrl) {
      return NextResponse.json(
        {
          error: "Notes are not available for this lesson",
          code: "NOTES_NOT_AVAILABLE",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * ============================================================
     * SECURITY CHECK
     * ============================================================
     *
     * The database must contain the PRIVATE Vercel Blob pathname.
     *
     * Example:
     *
     * courses/abg/lesson-1.pdf
     *
     * NOT:
     *
     * https://xxxxx.public.blob.vercel-storage.com/lesson-1.pdf
     */

    if (
      notesUrl.startsWith("http://") ||
      notesUrl.startsWith("https://")
    ) {
      console.error(
        "SECURITY ERROR: Public notes URL detected in database:",
        notesUrl,
      );

      return NextResponse.json(
        {
          error: "Protected resource configuration error",
          code: "PUBLIC_NOTES_URL",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * ============================================================
     * PRIVATE VERCEL BLOB
     * ============================================================
     */

    const result = await get(notesUrl, {
      access: "private",
    });

    if (
      !result ||
      result.statusCode !== 200 ||
      !result.stream
    ) {
      return NextResponse.json(
        {
          error: "Protected note not found",
          code: "PROTECTED_NOTE_NOT_FOUND",
        },
        {
          status: 404,
        },
      );
    }

    const contentType =
      result.blob.contentType || "application/pdf";

    const filename =
      result.blob.pathname.split("/").pop() ||
      `lesson-${lesson.id}.pdf`;

    return new NextResponse(result.stream, {
      status: 200,

      headers: {
        "Content-Type": contentType,

        "Content-Disposition": `attachment; filename="${sanitizeFilename(
          filename,
        )}"`,

        "X-Content-Type-Options": "nosniff",

        "Cache-Control":
          "private, no-store, max-age=0, must-revalidate",

        "Pragma": "no-cache",

        "Content-Security-Policy":
          "default-src 'none'; frame-ancestors 'none';",

        "Referrer-Policy": "no-referrer",

        "X-Robots-Tag":
          "noindex, nofollow, noarchive, nosnippet",
      },
    });
  } catch (error) {
    console.error(
      "LESSON NOTES ACCESS ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error: "Unable to access protected notes",
        code: "NOTES_ACCESS_ERROR",
      },
      {
        status: 500,
      },
    );
  }
}

function sanitizeFilename(filename: string) {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 150);
}