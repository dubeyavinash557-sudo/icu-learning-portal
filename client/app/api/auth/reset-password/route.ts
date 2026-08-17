import crypto from "crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export const runtime = "nodejs";

const MIN_PASSWORD_LENGTH = 8;

function hashToken(token: string) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    // ==========================================================
    // 1. READ REQUEST
    // ==========================================================

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof body !== "object" ||
      body === null
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        {
          status: 400,
        }
      );
    }

    const token =
      "token" in body &&
      typeof body.token === "string"
        ? body.token.trim()
        : "";

    const password =
      "password" in body &&
      typeof body.password === "string"
        ? body.password
        : "";

    const confirmPassword =
      "confirmPassword" in body &&
      typeof body.confirmPassword === "string"
        ? body.confirmPassword
        : "";

    // ==========================================================
    // 2. BASIC VALIDATION
    // ==========================================================

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password reset link is invalid.",
        },
        {
          status: 400,
        }
      );
    }

    if (!password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "New password and confirm password are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      password.length <
      MIN_PASSWORD_LENGTH
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters long.",
        },
        {
          status: 400,
        }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Passwords do not match.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================================
    // 3. HASH RAW TOKEN
    //
    // Database stores only tokenHash.
    // The usable raw token never gets stored.
    // ==========================================================

    const tokenHash = hashToken(token);

    // ==========================================================
    // 4. FIND RESET TOKEN
    // ==========================================================

    const resetToken =
      await prisma.passwordResetToken.findUnique({
        where: {
          tokenHash,
        },
        select: {
          id: true,
          userId: true,
          tokenHash: true,
          expiresAt: true,
          usedAt: true,
        },
      });

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link is invalid or has expired.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================================
    // 5. USED TOKEN PROTECTION
    // ==========================================================

    if (resetToken.usedAt) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link has already been used.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================================
    // 6. EXPIRY VALIDATION
    // ==========================================================

    const now = new Date();

    if (
      resetToken.expiresAt <= now
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link has expired. Please request a new one.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================================
    // 7. FIND USER
    // ==========================================================

    const user =
      await prisma.user.findUnique({
        where: {
          id: resetToken.userId,
        },
        select: {
          id: true,
          password: true,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to reset the password for this account.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================================
    // 8. PREVENT REUSING CURRENT PASSWORD
    // ==========================================================

    const samePassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (samePassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "New password must be different from your current password.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================================
    // 9. HASH NEW PASSWORD
    // ==========================================================

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    // ==========================================================
    // 10. ATOMIC PASSWORD RESET
    //
    // The token is consumed and password changed
    // inside the same transaction.
    // ==========================================================

    await prisma.$transaction(
      async (tx) => {
        /*
         * Consume ONLY the still-valid token.
         *
         * updateMany protects against a race where
         * another request tries to use the same token.
         */
        const consumedToken =
          await tx.passwordResetToken.updateMany({
            where: {
              id: resetToken.id,
              tokenHash,
              usedAt: null,
              expiresAt: {
                gt: new Date(),
              },
            },
            data: {
              usedAt: new Date(),
            },
          });

        if (
          consumedToken.count !== 1
        ) {
          throw new Error(
            "RESET_TOKEN_ALREADY_CONSUMED"
          );
        }

        /*
         * Update password.
         *
         * Password is stored only as a bcrypt hash.
         */
        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            password: hashedPassword,
          },
        });

        /*
         * Invalidate all other active reset tokens
         * belonging to this user.
         */
        await tx.passwordResetToken.updateMany({
          where: {
            userId: user.id,
            usedAt: null,
          },
          data: {
            usedAt: new Date(),
          },
        });
      }
    );

    // ==========================================================
    // 11. SUCCESS
    // ==========================================================

    console.log(
      "PASSWORD RESET SUCCESS:",
      {
        userId: user.id,
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "RESET_TOKEN_ALREADY_CONSUMED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link is invalid, expired, or has already been used.",
        },
        {
          status: 400,
        }
      );
    }

    console.error(
      "RESET PASSWORD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to reset your password. Please request a new reset link.",
      },
      {
        status: 500,
      }
    );
  }
}