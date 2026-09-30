import { NextResponse } from "next/server";
import { Resend } from "resend";

const SUPPORT_EMAIL = "support@iculearningportal.com";

const ALLOWED_TOPICS = new Set([
  "Course Support",
  "Account Support",
  "Payment Support",
  "Technical Support",
  "Other",
]);

function cleanText(
  value: unknown,
  maxLength: number
) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const name = cleanText(body?.name, 80);
    const email = cleanText(body?.email, 160).toLowerCase();
    const topic = cleanText(body?.topic, 50);
    const message = cleanText(body?.message, 2000);
    const website = cleanText(body?.website, 200);

    /*
     * Honeypot:
     * Normal users never fill this hidden field.
     */
    if (website) {
      return NextResponse.json({
        success: true,
        message:
          "Your enquiry has been submitted.",
      });
    }

    if (
      !name ||
      name.length < 2 ||
      !email ||
      !isValidEmail(email) ||
      !ALLOWED_TOPICS.has(topic) ||
      !message ||
      message.length < 10
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide a valid name, email, enquiry type and message.",
        },
        { status: 400 }
      );
    }

    const resendApiKey =
      process.env.RESEND_API_KEY?.trim();

    const resendFromEmail =
      process.env.RESEND_FROM_EMAIL?.trim();

    if (
      !resendApiKey ||
      !resendFromEmail
    ) {
      console.error(
        "CONTACT EMAIL CONFIGURATION IS MISSING."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Support email is temporarily unavailable. Please email support@iculearningportal.com directly.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(
      resendApiKey
    );

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeTopic = escapeHtml(topic);
    const safeMessage = escapeHtml(message).replaceAll(
      "\n",
      "<br />"
    );

    const result =
      await resend.emails.send({
        from: resendFromEmail,
        to: SUPPORT_EMAIL,
        replyTo: email,
        subject: `ICU Learning Portal enquiry — ${topic}`,

        html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>ICU Learning Portal Enquiry</title>
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
                  max-width:640px;
                  margin:40px auto;
                  padding:20px;
                "
              >
                <div
                  style="
                    overflow:hidden;
                    border:1px solid #e2e8f0;
                    border-radius:20px;
                    background:#ffffff;
                  "
                >
                  <div
                    style="
                      padding:28px;
                      background:linear-gradient(
                        135deg,
                        #0891b2,
                        #2563eb
                      );
                      color:#ffffff;
                    "
                  >
                    <div
                      style="
                        font-size:12px;
                        font-weight:700;
                        letter-spacing:1.5px;
                        text-transform:uppercase;
                      "
                    >
                      ICU Learning Portal
                    </div>

                    <h1
                      style="
                        margin:10px 0 0;
                        font-size:26px;
                        line-height:1.3;
                      "
                    >
                      New Support Enquiry
                    </h1>
                  </div>

                  <div style="padding:28px;">
                    <table
                      style="
                        width:100%;
                        border-collapse:collapse;
                        font-size:15px;
                      "
                    >
                      <tr>
                        <td
                          style="
                            width:120px;
                            padding:8px 0;
                            font-weight:700;
                            vertical-align:top;
                          "
                        >
                          Name
                        </td>

                        <td
                          style="
                            padding:8px 0;
                            vertical-align:top;
                          "
                        >
                          ${safeName}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:8px 0;
                            font-weight:700;
                            vertical-align:top;
                          "
                        >
                          Email
                        </td>

                        <td
                          style="
                            padding:8px 0;
                            vertical-align:top;
                          "
                        >
                          ${safeEmail}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:8px 0;
                            font-weight:700;
                            vertical-align:top;
                          "
                        >
                          Topic
                        </td>

                        <td
                          style="
                            padding:8px 0;
                            vertical-align:top;
                          "
                        >
                          ${safeTopic}
                        </td>
                      </tr>
                    </table>

                    <div
                      style="
                        margin-top:24px;
                        padding:18px;
                        border-radius:14px;
                        background:#f8fafc;
                        border:1px solid #e2e8f0;
                        line-height:1.7;
                      "
                    >
                      <div
                        style="
                          margin-bottom:8px;
                          font-size:12px;
                          font-weight:700;
                          letter-spacing:1px;
                          text-transform:uppercase;
                          color:#2563eb;
                        "
                      >
                        Message
                      </div>

                      <div>
                        ${safeMessage}
                      </div>
                    </div>

                    <p
                      style="
                        margin:24px 0 0;
                        font-size:12px;
                        line-height:1.6;
                        color:#64748b;
                      "
                    >
                      Reply directly to this email to respond to
                      the learner at ${safeEmail}.
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

    if (result.error) {
      console.error(
        "CONTACT EMAIL SEND FAILED:",
        result.error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "We could not send your enquiry right now. Please email support@iculearningportal.com directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error(
      "CONTACT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process your enquiry right now. Please email support@iculearningportal.com directly.",
      },
      { status: 500 }
    );
  }
}