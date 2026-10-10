
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        image: true,
        instructor: true,
        price: true,
        duration: true,
        language: true,
        level: true,
        rating: true,
        students: true,
        isPremium: true,
        createdAt: true,
        lessons: {
          orderBy: {
            lessonOrder: "asc",
          },
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            lessonOrder: true,
            createdAt: true,
            courseId: true,
          },
        },
      },
    });

    return NextResponse.json(courses, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to fetch public courses:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch courses",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
