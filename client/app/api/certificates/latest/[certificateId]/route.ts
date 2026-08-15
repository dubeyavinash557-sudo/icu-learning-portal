import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import React from "react";

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
        {
          error: "Unauthorized",
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
      select: {
        id: true,
        fullName: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const { certificateId } = await params;

    const certificate = await prisma.certificate.findUnique({
      where: {
        id: certificateId,
      },
      include: {
        course: true,
      },
    });

    if (!certificate) {
      return NextResponse.json(
        {
          error: "Certificate not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Security:
     * A student can only download their own certificate.
     */
    if (certificate.userId !== user.id) {
      return NextResponse.json(
        {
          error: "Access denied",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * Generate certificate PDF.
     *
     * @react-pdf/renderer returns a Node Buffer.
     * Convert it to Uint8Array so it is accepted by
     * NextResponse BodyInit under the current Next.js
     * and TypeScript typings.
     */
    const certificateDocument =
      React.createElement(CertificatePDF, {
        studentName: user.fullName,
        courseTitle: certificate.course.title,
        certificateNo: certificate.certificateNo,
        issuedAt: certificate.issuedAt,
      }) as any;

    const pdfBuffer = await renderToBuffer(
      certificateDocument
    );

    const pdfData = new Uint8Array(pdfBuffer);

    const safeCourseName = certificate.course.title
      .replace(/[^a-zA-Z0-9-_ ]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const fileName =
      `ICU-Learning-${safeCourseName}-Certificate.pdf`;

    return new NextResponse(pdfData, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error(
      "Certificate PDF Error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to generate certificate PDF.",
      },
      {
        status: 500,
      }
    );
  }
}