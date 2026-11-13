
import { getSignedInAdmin } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";
import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
];

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { success: false, error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

function parseClientPayload(value: string | null) {
  if (!value) {
    throw new Error("Course information is missing.");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error("Invalid upload information.");
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("courseId" in parsed) ||
    typeof parsed.courseId !== "string"
  ) {
    throw new Error("Invalid course information.");
  }

  const courseId = parsed.courseId.trim();

  if (
    !courseId ||
    courseId.length > 100 ||
    courseId.includes("/") ||
    courseId.includes("\\")
  ) {
    throw new Error("Invalid course ID.");
  }

  return { courseId };
}

function validatePathname(
  pathname: string,
  courseId: string
) {
  const expectedPrefix = `videos/${courseId}/`;

  if (
    !pathname.startsWith(expectedPrefix) ||
    pathname.includes("..") ||
    pathname.includes("\\") ||
    pathname.startsWith("/")
  ) {
    throw new Error("Invalid video destination.");
  }

  const filename = pathname.slice(
    expectedPrefix.length
  );

  if (
    !filename ||
    filename.includes("/") ||
    !/^[a-zA-Z0-9._-]{1,180}$/.test(filename)
  ) {
    throw new Error("Invalid video filename.");
  }
}

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as HandleUploadBody;

    const result = await handleUpload({
      request,
      body,

      onBeforeGenerateToken: async (
        pathname,
        clientPayload
      ) => {
        // Verify Owner/Admin using the shared authorization helper.
        const admin = await getSignedInAdmin();

        if (!admin) {
          throw new Error(
            "Administrator access is required."
          );
        }

        const { courseId } =
          parseClientPayload(clientPayload);

        const course = await prisma.course.findUnique({
          where: {
            id: courseId,
          },
          select: {
            id: true,
          },
        });

        if (!course) {
          throw new Error("Course not found.");
        }

        validatePathname(pathname, courseId);

        return {
          allowedContentTypes: ALLOWED_VIDEO_TYPES,
          maximumSizeInBytes: MAX_VIDEO_SIZE,
          addRandomSuffix: true,

          tokenPayload: JSON.stringify({
            courseId,
            adminId: admin.id,
          }),
        };
      },

      onUploadCompleted: async ({
        blob,
        tokenPayload,
      }) => {
        if (!blob.pathname.startsWith("videos/")) {
          throw new Error(
            "Unexpected uploaded video location."
          );
        }

        // Lesson record is saved separately when
        // the Admin submits the lesson form.
        void tokenPayload;
      },
    });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(
      "Private video upload error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Video upload failed.";

    const status =
      message.includes("Administrator access")
        ? 403
        : message.includes("Authentication")
          ? 401
          : 400;

    return jsonError(message, status);
  }
}
