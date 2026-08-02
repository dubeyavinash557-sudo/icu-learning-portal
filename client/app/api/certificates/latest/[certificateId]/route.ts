import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import React from "react";
import { pdf } from "@react-pdf/renderer";
import CertificatePDF from "./CertificatePDF";

interface RouteProps {
  params: Promise<{
    certificateId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteProps
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { certificateId } = await params;

    const certificate =
      await prisma.certificate.findUnique({
        where: {
          id: certificateId,
        },
        include: {
          course: true,
        },
      });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    if (certificate.userId !== user.id) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

return NextResponse.json({
  success: true,
  user: user.fullName,
  course: certificate.course.title,
  certificateNo: certificate.certificateNo,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}