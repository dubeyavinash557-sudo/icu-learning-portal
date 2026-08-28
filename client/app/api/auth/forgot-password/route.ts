import crypto from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import prisma from "@/lib/prisma";

export const runtime = "nodejs";

const RESET_TOKEN_EXPIRY_MINUTES = 30;

const GENERIC_SUCCESS_MESSAGE =
  "If an account exists, a password reset link has been sent to the registered email address.";

const INVALID_REQUEST_MESSAGE = "Invalid request.";

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

/**
 * Escape user-controlled values before placing them inside
 * the HTML email.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Keep the application URL controlled by environment configuration.
 *
 * In production this should be:
 *
 * NEXTAUTH_URL=https://iculearningportal.com
 *
 * The localhost fallback is useful only for local development.
 */
function getAppUrl() {
  const configuredUrl = process.env.NEXTAUTH_URL?.trim();

  if (!configuredUrl) {
    return "http://localhost:3000";
  }

  return configuredUrl.replace(/\/+$/, "");
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
          message: INVALID_REQUEST_MESSAGE,
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      !("identifier" in body) ||
      typeof body.identifier !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: INVALID_REQUEST_MESSAGE,
        },
        {
          status: 400,
        }
      );
    }

    const identifier = body.identifier.trim();

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
     *
     * Email:
     *   DubeyAvinash557@Gmail.com
     *       ↓
     *   dubeyavinash557@gmail.com
     *
     * Mobile:
     *   +91 81770 84179
     *       ↓
     *   918177084179
     *
     * The database lookup must use the same normalization
     * convention used during registration.
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
     * Basic email validation.
     *
     * This is intentionally not an attempt to implement the
     * complete RFC email grammar. It simply rejects obviously
     * malformed input before querying the database.
     */

    if (isEmail) {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        normalizedIdentifier.length > 254 ||
        !emailPattern.test(normalizedIdentifier)
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please enter a valid email address.",
          },
          {
            status: 400,
          }
        );
      }
    } else {
      /*
       * India-focused LMS validation.
       *
       * The database currently stores mobile as a unique
       * string. We allow common international-style input,
       * but require a reasonable number of digits.
       */

      if (
        normalizedIdentifier.length < 10 ||
        normalizedIdentifier.length > 15
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please enter a valid mobile number.",
          },
          {
            status: 400,
          }
        );
      }
    }

    /*
     * ==========================================================
     * 3. FIND USER
     * ==========================================================
     *
     * The requester may provide:
     *
     * - registered email
     * - registered mobile number
     *
     * The reset link is always delivered to the account's
     * registered email address.
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
     * ==========================================================
     *
     * NEVER tell the requester whether the account exists.
     *
     * Both of these must return the same public response:
     *
     *   registered@example.com
     *   unknown@example.com
     *
     * This prevents attackers from testing which emails are
     * registered on the LMS.
     * ==========================================================
     */

    if (!user) {
      return NextResponse.json({
        success: true,
        message: GENERIC_SUCCESS_MESSAGE,
      });
    }

    /*
     * ==========================================================
     * 5. EMAIL SERVICE CONFIGURATION
     * ==========================================================
     */

    const resendApiKey =
      process.env.RESEND_API_KEY?.trim();

    const resendFromEmail =
      process.env.RESEND_FROM_EMAIL?.trim();

    if (!resendApiKey || !resendFromEmail) {
      console.error(
        "PASSWORD RESET EMAIL CONFIGURATION IS MISSING."
      );

      /*
       * Do not expose email infrastructure configuration
       * to the requester.
       *
       * Returning the same public response also preserves
       * account-enumeration protection.
       */

      return NextResponse.json({
        success: true,
        message: GENERIC_SUCCESS_MESSAGE,
      });
    }

    /*
     * ==========================================================
     * 6. INVALIDATE PREVIOUS ACTIVE RESET TOKENS
     * ==========================================================
     *
     * Only the newest reset request should remain usable.
     *
     * Previous token:
     *   usedAt = current timestamp
     *
     * New token:
     *   will be created below
     * ==========================================================
     */

    const invalidatedAt = new Date();

    await prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
        expiresAt: {
          gt: invalidatedAt,
        },
      },
      data: {
        usedAt: invalidatedAt,
      },
    });

    /*
     * ==========================================================
     * 7. CREATE SECURE RESET TOKEN
     * ==========================================================
     *
     * Raw token:
     *   - generated using Node crypto
     *   - sent only inside the email URL
     *   - never returned by the API
     *   - never stored directly in the database
     *
     * Hash:
     *   - SHA-256
     *   - stored in database
     *
     * The database therefore does not contain the usable
     * reset credential.
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

    const appUrl = getAppUrl();

    const resetUrl =
      `${appUrl}/reset-password?token=${encodeURIComponent(
        rawToken
      )}`;

    /*
     * ==========================================================
     * 10. PREPARE SAFE EMAIL VALUES
     * ==========================================================
     */

    const safeFullName = escapeHtml(
      user.fullName
    );

    const safeResetUrl = escapeHtml(
      resetUrl
    );

    /*
     * ==========================================================
     * 11. SEND PASSWORD RESET EMAIL
     * ==========================================================
     */

    const resend = new Resend(
      resendApiKey
    );

    let emailResult;

    try {
      emailResult =
        await resend.emails.send({
          from: resendFromEmail,
          to: user.email,
          subject:
            "Reset your ICU Learning Portal password",

          html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <title>
                  Reset your ICU Learning Portal password
                </title>
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

                    <!-- Header -->

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

                    <!-- Content -->

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
                        Hello ${safeFullName},
                      </p>

                      <p
                        style="
                          margin:0 0 20px;
                          font-size:15px;
                          line-height:1.7;
                          color:#475569;
                        "
                      >
                        We received a request to reset the
                        password for your ICU Learning Portal
                        account.
                      </p>

                      <div
                        style="
                          margin:28px 0;
                          text-align:center;
                        "
                      >

                        <a
                          href="${safeResetUrl}"
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
                        This password-reset link will expire
                        in ${RESET_TOKEN_EXPIRY_MINUTES}
                        minutes.
                      </p>

                      <p
                        style="
                          margin:8px 0;
                          font-size:14px;
                          line-height:1.7;
                          color:#64748b;
                        "
                      >
                        If you did not request a password
                        reset, you can safely ignore this email.
                        Your existing password will remain
                        unchanged.
                      </p>

                      <!-- Security Notice -->

                      <div
                        style="
                          margin-top:28px;
                          padding:16px;
                          background:#f8fafc;
                          border:1px solid #e2e8f0;
                          border-radius:12px;
                        "
                      >

                        <p
                          style="
                            margin:0;
                            font-size:12px;
                            line-height:1.7;
                            color:#64748b;
                          "
                        >
                          Security notice: ICU Learning Portal
                          never sends your existing password by
                          email. If you did not request this
                          password reset, no action is required.
                        </p>

                      </div>

                      <!-- Footer -->

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
                        ICU Learning Portal<br />
                        Professional Medical Education
                      </div>

                    </div>

                  </div>

                </div>

              </body>
            </html>
          `,
        });
    } catch (emailError) {
      /*
       * ========================================================
       * EMAIL PROVIDER EXCEPTION
       * ========================================================
       *
       * Never expose Resend/internal infrastructure details.
       */

      console.error(
        "PASSWORD RESET EMAIL PROVIDER EXCEPTION:",
        emailError
      );

      /*
       * Immediately invalidate the token because the reset
       * credential could not be delivered successfully.
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

      /*
       * Return the same public response used for a non-existent
       * account. This prevents account enumeration through
       * email-provider failures.
       */

      return NextResponse.json({
        success: true,
        message: GENERIC_SUCCESS_MESSAGE,
      });
    }

    /*
     * ==========================================================
     * 12. HANDLE EMAIL PROVIDER ERROR RESPONSE
     * ==========================================================
     */

    if (emailResult.error) {
      console.error(
        "PASSWORD RESET EMAIL ERROR:",
        emailResult.error
      );

      /*
       * The email was not successfully accepted by the
       * provider, therefore the generated token must not
       * remain usable.
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

      /*
       * Same external response:
       *
       * - account exists
       * - account does not exist
       * - email provider failed
       *
       * All receive the same public message.
       */

      return NextResponse.json({
        success: true,
        message: GENERIC_SUCCESS_MESSAGE,
      });
    }

    /*
     * ==========================================================
     * 13. SUCCESS
     * ==========================================================
     *
     * Never return:
     *
     * - raw reset token
     * - reset URL
     * - token hash
     * - database information
     * - Resend response
     * ==========================================================
     */

    return NextResponse.json({
      success: true,
      message: GENERIC_SUCCESS_MESSAGE,
    });
  } catch (error) {
    /*
     * ==========================================================
     * 14. UNEXPECTED SERVER ERROR
     * ==========================================================
     */

    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    /*
     * Do not expose Prisma, database, environment,
     * authentication or infrastructure details.
     */

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