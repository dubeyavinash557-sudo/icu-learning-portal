import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    console.log("========== ENROLL API ==========");
    console.log("SESSION:", session);
    console.log("SESSION EMAIL:", session?.user?.email);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    console.log("REQUEST BODY:", body);

    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json(
        {
          message: "Course ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    console.log("DATABASE USER:", user);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    console.log("COURSE:", course);

    if (!course) {
      return NextResponse.json(
        {
          message: "Course not found",
        },
        {
          status: 404,
        }
      );
    }

    const alreadyEnrolled = await prisma.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: course.id,
      },
    });

    console.log("ALREADY ENROLLED:", alreadyEnrolled);

    if (alreadyEnrolled) {
      return NextResponse.json(
        {
          message: "Already enrolled",
        },
        {
          status: 409,
        }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id,
        progress: 0,
        completed: false,
      },
    });

    console.log("ENROLLMENT CREATED:", enrollment);

    return NextResponse.json({
      success: true,
      message: "Enrollment successful",
    });
  } catch (error) {
    console.error("ENROLL API ERROR:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}