import crypto from "crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    /* --------------------------------------------------
       1. Authenticate user
    -------------------------------------------------- */

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login first.",
        },
        {
          status: 401,
        }
      );
    }

    /* --------------------------------------------------
       2. Razorpay credentials
    -------------------------------------------------- */

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error(
        "RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing."
      );

      return NextResponse.json(
        {
          success: false,
          message: "Payment gateway is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /* --------------------------------------------------
       3. Read request body
    -------------------------------------------------- */

    const body = await request.json();

    const {
      courseId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    if (
      !courseId ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Incomplete payment verification data.",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------
       4. Find logged-in user
    -------------------------------------------------- */

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* --------------------------------------------------
       5. Find our pending payment
    -------------------------------------------------- */

    const payment =
      await prisma.payment.findUnique({
        where: {
          razorpayOrderId,
        },
      });

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment order not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* --------------------------------------------------
       6. Security checks
    -------------------------------------------------- */

    if (payment.userId !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied.",
        },
        {
          status: 403,
        }
      );
    }

    if (payment.courseId !== courseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Course does not match payment.",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------
       7. Prevent duplicate successful verification
    -------------------------------------------------- */

    if (
      payment.status.toUpperCase() === "SUCCESS" &&
      payment.razorpayPaymentId === razorpayPaymentId
    ) {
      const existingEnrollment =
        await prisma.enrollment.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId,
            },
          },
        });

      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        message: "Payment already verified.",
        paymentId: payment.id,
        enrollmentId:
          existingEnrollment?.id ?? null,
      });
    }

    /* --------------------------------------------------
       8. Verify Razorpay signature
       
       HMAC SHA256:
       order_id|payment_id
    -------------------------------------------------- */

    const generatedSignature =
      crypto
        .createHmac("sha256", keySecret)
        .update(
          `${razorpayOrderId}|${razorpayPaymentId}`
        )
        .digest("hex");

    const generatedBuffer =
      Buffer.from(generatedSignature, "utf8");

    const receivedBuffer =
      Buffer.from(razorpaySignature, "utf8");

    /* timingSafeEqual requires equal-length buffers */

    const signaturesMatch =
      generatedBuffer.length ===
        receivedBuffer.length &&
      crypto.timingSafeEqual(
        generatedBuffer,
        receivedBuffer
      );

    if (!signaturesMatch) {
      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: "FAILED",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment signature verification failed.",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------
       9. Create Razorpay client
    -------------------------------------------------- */

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    /* --------------------------------------------------
       10. Fetch Razorpay order
    -------------------------------------------------- */

    const razorpayOrder =
      await razorpay.orders.fetch(
        razorpayOrderId
      );

    /* --------------------------------------------------
       11. Verify order amount
    -------------------------------------------------- */

    const expectedAmount = Math.round(
      payment.amount * 100
    );

    if (
      Number(razorpayOrder.amount) !==
      expectedAmount
    ) {
      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: "FAILED",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment amount does not match the course price.",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------
       12. Fetch Razorpay payment
    -------------------------------------------------- */

    const razorpayPayment =
      await razorpay.payments.fetch(
        razorpayPaymentId
      );

    /* --------------------------------------------------
       13. Verify payment belongs to same order
    -------------------------------------------------- */

    if (
      razorpayPayment.order_id !==
      razorpayOrderId
    ) {
      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: "FAILED",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment does not belong to this order.",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------
       14. Verify payment amount
    -------------------------------------------------- */

    if (
      Number(razorpayPayment.amount) !==
      expectedAmount
    ) {
      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: "FAILED",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Paid amount does not match the course price.",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------
       15. Verify payment status
    -------------------------------------------------- */

    if (
      razorpayPayment.status !== "captured"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            `Payment is not captured. Current status: ${razorpayPayment.status}`,
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------
       16. Update payment + create enrollment
       
       Both happen inside one transaction.
    -------------------------------------------------- */

    const result =
      await prisma.$transaction(
        async (tx) => {
          const updatedPayment =
            await tx.payment.update({
              where: {
                id: payment.id,
              },
              data: {
                status: "SUCCESS",
                paymentMethod: "RAZORPAY",
                razorpayPaymentId,
                razorpaySignature,
                transactionId:
                  razorpayPaymentId,
              },
            });

          const enrollment =
            await tx.enrollment.upsert({
              where: {
                userId_courseId: {
                  userId: user.id,
                  courseId,
                },
              },
              update: {},
              create: {
                userId: user.id,
                courseId,
                progress: 0,
                completed: false,
              },
            });

          return {
            paymentId: updatedPayment.id,
            enrollmentId: enrollment.id,
          };
        }
      );

    /* --------------------------------------------------
       17. Success response
    -------------------------------------------------- */

    return NextResponse.json({
      success: true,
      message:
        "Payment verified successfully. Course unlocked.",
      ...result,
    });
  } catch (error) {
    console.error(
      "========== VERIFY RAZORPAY PAYMENT ERROR =========="
    );

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to verify payment.",
      },
      {
        status: 500,
      }
    );
  }
}