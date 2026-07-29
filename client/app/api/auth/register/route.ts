import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      mobile,
      qualification,
      hospital,
      password,
      confirmPassword,
    } = body;

    // Required fields
    if (
      !fullName ||
      !email ||
      !mobile ||
      !qualification ||
      !hospital ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    // Existing email
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already registered." },
        { status: 400 }
      );
    }

    // Existing mobile
    const existingMobile = await prisma.user.findUnique({
      where: {
        mobile,
      },
    });

    if (existingMobile) {
      return NextResponse.json(
        { message: "Mobile number already registered." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        fullName,
        email,
        mobile,
        qualification,
        hospital,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}