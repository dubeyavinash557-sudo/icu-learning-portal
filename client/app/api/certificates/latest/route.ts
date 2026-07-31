import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

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

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

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

    const certificate = await prisma.certificate.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        course: true,
      },
      orderBy: {
        issuedAt: "desc",
      },
    });

    if (!certificate) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      id: certificate.id,
      certificateNo: certificate.certificateNo,
      issuedAt: certificate.issuedAt,
      courseTitle: certificate.course.title,
      courseId: certificate.course.id,
    });
  } catch (error) {
    console.error(error);

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