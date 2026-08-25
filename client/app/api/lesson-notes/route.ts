import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Authentication required",
        },
        {
          status: 401,
        },
      );
    }

    const lessonId = request.nextUrl.searchParams.get("lessonId");

    if (!lessonId) {
      return NextResponse.json(
        {
          error: "Missing lessonId",
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
        isPremium: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
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
      include: {
        course: true,
      },
    });

    if (!lesson) {
      return NextResponse.json(
        {
          error: "Lesson not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * ============================================================
     * PREMIUM ACCESS CHECK
     * ============================================================
     */

    const isAdmin = user.role === "ADMIN";

    if (lesson.course.isPremium && !isAdmin) {
      if (!user.isPremium) {
        return NextResponse.json(
          {
            error: "Premium access required",
            code: "PREMIUM_REQUIRED",
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
      });

      if (!enrollment) {
        return NextResponse.json(
          {
            error: "Course purchase/access required",
            code: "COURSE_ACCESS_REQUIRED",
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
        },
        {
          status: 404,
        },
      );
    }

    /*
     * ============================================================
     * PRIVATE VERCEL BLOB
     * ============================================================
     *
     * IMPORTANT:
     * notesUrl should contain the private Blob pathname
     * such as:
     *
     * courses/icu-nursing/lesson-1.pdf
     *
     * NOT a public .blob.vercel-storage.com URL.
     */

    const result = await get(notesUrl, {
      access: "private",
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return NextResponse.json(
        {
          error: "Protected note not found",
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

        "Cache-Control": "private, no-store",

        "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none';",
      },
    });
  } catch (error) {
    console.error("LESSON NOTES ACCESS ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to access protected notes",
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