import crypto from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import prisma from "@/lib/prisma";

export const runtime = "nodejs";

const RESET_TOKEN_EXPIRY_MINUTES = 30;

function hashToken(token: string) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function normalizeMobile(value: string) {
  return value.replace(/\D/g, "");
}

function createResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: Request) {
  try {
    /*
     * ==========================================================
     * 1. READ REQUEST BODY
     * ==========================================================
     */

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

    const identifier =
      "identifier" in body &&
      typeof body.identifier === "string"
        ? body.identifier.trim()
        : "";

    if (!identifier) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email address or mobile number is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ==========================================================
     * 2. NORMALIZE IDENTIFIER
     * ==========================================================
     */

    const isEmail = identifier.includes("@");

    const normalizedIdentifier = isEmail
      ? normalizeEmail(identifier)
      : normalizeMobile(identifier);

    if (!normalizedIdentifier) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address or mobile number.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ==========================================================
     * 3. FIND USER
     *
     * User can enter either:
     *
     * - Email
     * - Mobile number
     *
     * The account's registered email will be used
     * for sending the secure password-reset link.
     * ==========================================================
     */

    const user = isEmail
      ? await prisma.user.findUnique({
          where: {
            email: normalizedIdentifier,
          },
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        })
      : await prisma.user.findUnique({
          where: {
            mobile: normalizedIdentifier,
          },
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        });

    /*
     * ==========================================================
     * 4. ACCOUNT ENUMERATION PROTECTION
     *
     * Never tell the requester whether an account exists.
     *
     * This prevents attackers from discovering registered
     * email addresses or mobile numbers.
     * ==========================================================
     */

    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists, a password reset link has been sent to the registered email address.",
      });
    }

    /*
     * ==========================================================
     * 5. ENVIRONMENT VALIDATION
     * ==========================================================
     */

    const resendApiKey =
      process.env.RESEND_API_KEY;

    const resendFromEmail =
      process.env.RESEND_FROM_EMAIL;

    if (
      !resendApiKey ||
      !resendFromEmail
    ) {
      console.error(
        "PASSWORD RESET EMAIL CONFIGURATION IS MISSING."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Password reset email service is temporarily unavailable.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ==========================================================
     * 6. INVALIDATE PREVIOUS UNUSED TOKENS
     *
     * Only the latest reset request should remain valid.
     * ==========================================================
     */

    await prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      data: {
        usedAt: new Date(),
      },
    });

    /*
     * ==========================================================
     * 7. GENERATE SECURE RANDOM TOKEN
     *
     * Raw token:
     *   -> sent only through the reset URL
     *
     * Hash:
     *   -> stored in database
     *
     * Therefore the database never stores the usable
     * reset token itself.
     * ==========================================================
     */

    const rawToken = createResetToken();

    const tokenHash = hashToken(rawToken);

    const expiresAt = new Date(
      Date.now() +
        RESET_TOKEN_EXPIRY_MINUTES *
          60 *
          1000
    );

    /*
     * ==========================================================
     * 8. STORE TOKEN HASH
     * ==========================================================
     */

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    /*
     * ==========================================================
     * 9. CREATE RESET URL
     * ==========================================================
     */

    const appUrl =
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";

    const resetUrl =
      `${appUrl}/reset-password?token=${encodeURIComponent(
        rawToken
      )}`;

    /*
     * ==========================================================
     * 10. SEND RESET EMAIL
     * ==========================================================
     */

    const resend = new Resend(
      resendApiKey
    );

    const emailResult =
      await resend.emails.send({
        from: resendFromEmail,
        to: user.email,
        subject:
          "Reset your ICU Learning Portal password",

        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>Password Reset</title>
            </head>

            <body
              style="
                margin:0;
                padding:0;
                background:#f1f5f9;
                font-family:Arial,Helvetica,sans-serif;
                color:#0f172a;
              "
            >

              <div
                style="
                  max-width:620px;
                  margin:40px auto;
                  padding:20px;
                "
              >

                <div
                  style="
                    background:#ffffff;
                    border-radius:20px;
                    overflow:hidden;
                    border:1px solid #e2e8f0;
                  "
                >

                  <div
                    style="
                      background:linear-gradient(
                        135deg,
                        #0891b2,
                        #2563eb,
                        #4338ca
                      );
                      padding:32px;
                      color:#ffffff;
                    "
                  >

                    <div
                      style="
                        font-size:13px;
                        font-weight:bold;
                        letter-spacing:1.5px;
                        text-transform:uppercase;
                        opacity:.9;
                      "
                    >
                      ICU Learning Portal
                    </div>

                    <h1
                      style="
                        margin:10px 0 0;
                        font-size:28px;
                        line-height:1.25;
                      "
                    >
                      Password Reset Request
                    </h1>

                  </div>

                  <div
                    style="
                      padding:32px;
                    "
                  >

                    <p
                      style="
                        margin:0 0 16px;
                        font-size:16px;
                        line-height:1.7;
                      "
                    >
                      Hello ${user.fullName},
                    </p>

                    <p
                      style="
                        margin:0 0 20px;
                        font-size:15px;
                        line-height:1.7;
                        color:#475569;
                      "
                    >
                      We received a request to reset the password
                      for your ICU Learning Portal account.
                    </p>

                    <div
                      style="
                        margin:24px 0;
                        text-align:center;
                      "
                    >

                      <a
                        href="${resetUrl}"
                        style="
                          display:inline-block;
                          background:#2563eb;
                          color:#ffffff;
                          text-decoration:none;
                          padding:14px 24px;
                          border-radius:10px;
                          font-size:15px;
                          font-weight:bold;
                        "
                      >
                        Reset Password
                      </a>

                    </div>

                    <p
                      style="
                        margin:24px 0 8px;
                        font-size:14px;
                        line-height:1.7;
                        color:#64748b;
                      "
                    >
                      This password-reset link will expire in
                      ${RESET_TOKEN_EXPIRY_MINUTES} minutes.
                    </p>

                    <p
                      style="
                        margin:8px 0;
                        font-size:14px;
                        line-height:1.7;
                        color:#64748b;
                      "
                    >
                      If you did not request a password reset,
                      you can safely ignore this email.
                    </p>

                    <div
                      style="
                        margin-top:28px;
                        padding-top:20px;
                        border-top:1px solid #e2e8f0;
                        font-size:12px;
                        line-height:1.6;
                        color:#94a3b8;
                      "
                    >
                      For your security, ICU Learning Portal
                      never sends your existing password by email.
                    </div>

                  </div>

                </div>

              </div>

            </body>
          </html>
        `,
      });

    /*
     * ==========================================================
     * 11. HANDLE EMAIL PROVIDER ERROR
     * ==========================================================
     */

    if (emailResult.error) {
      console.error(
        "PASSWORD RESET EMAIL ERROR:",
        emailResult.error
      );

      /*
       * Do not leave a usable token behind when email
       * delivery could not be initiated successfully.
       */

      await prisma.passwordResetToken.updateMany({
        where: {
          userId: user.id,
          tokenHash,
          usedAt: null,
        },
        data: {
          usedAt: new Date(),
        },
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to send password reset email.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ==========================================================
     * 12. SUCCESS
     *
     * Never return:
     *
     * - raw token
     * - reset URL
     * - email provider response
     * - database information
     * ==========================================================
     */

    return NextResponse.json({
      success: true,
      message:
        "If an account exists, a password reset link has been sent to the registered email address.",
    });
  } catch (error) {
    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process password reset request.",
      },
      {
        status: 500,
      }
    );
  }
}