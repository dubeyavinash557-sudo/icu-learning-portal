import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import razorpay from "@/lib/razorpay";

export const runtime = "nodejs";

// ============================================================
// TYPES
// ============================================================

type CreateOrderBody = {
  courseId?: unknown;
};

type RazorpayOrder = {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
};

// ============================================================
// HELPERS
// ============================================================

function isNonEmptyString(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

// ============================================================
// PAID COURSE VALIDATION
// ============================================================

function isPaidCourse(
  price: number,
  isPremium: boolean
): boolean {
  return (
    isPremium === true &&
    Number.isFinite(price) &&
    price > 0
  );
}

// ============================================================
// RUPEES -> PAISE
// ============================================================
//
// Database:
// ₹999
//
// Razorpay:
// 99900 paise
//
// The database remains the source of truth for the course
// price. The browser never controls this value.
//
// ============================================================

function rupeesToPaise(
  price: number
): number | null {
  if (
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return null;
  }

  const amountInPaise = Math.round(
    price * 100
  );

  if (
    !Number.isSafeInteger(
      amountInPaise
    ) ||
    amountInPaise <= 0
  ) {
    return null;
  }

  return amountInPaise;
}

// ============================================================
// RAZORPAY RECEIPT
// ============================================================
//
// Razorpay receipt maximum length:
// 40 characters.
//
// We use cryptographically secure randomness.
//
// Math.random() is deliberately not used.
//
// ============================================================

function createReceipt(
  courseId: string,
  userId: string
): string {
  const coursePart = courseId
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-5);

  const userPart = userId
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-5);

  const timestampPart =
    Date.now().toString(36);

  const randomPart =
    randomBytes(5).toString("hex");

  const receipt =
    `lms_${coursePart}_${userPart}_${timestampPart}_${randomPart}`;

  return receipt.slice(0, 40);
}

// ============================================================
// SAFE INTERNAL ERROR
// ============================================================

function internalServerError() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Unable to initialize payment. Please try again.",
    },
    {
      status: 500,
    }
  );
}

// ============================================================
// POST
// ============================================================

export async function POST(
  request: Request
) {
  try {
    // ========================================================
    // 1. AUTHENTICATION
    // ========================================================

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    // ========================================================
    // 2. PARSE REQUEST BODY
    // ========================================================

    let body: CreateOrderBody;

    try {
      const parsed: unknown =
        await request.json();

      if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid request body.",
          },
          {
            status: 400,
          }
        );
      }

      body =
        parsed as CreateOrderBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // 3. VALIDATE COURSE ID
    // ========================================================

    if (
      !isNonEmptyString(
        body.courseId
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Course ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const courseId =
      body.courseId.trim();

    // ========================================================
    // 4. FIND AUTHENTICATED USER
    // ========================================================
    //
    // Never trust userId from the browser.
    //
    // The authenticated session is the source of truth.
    //
    // ========================================================

    const user =
      await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          mobile: true,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ========================================================
    // 5. FIND COURSE
    // ========================================================
    //
    // IMPORTANT:
    //
    // Price comes ONLY from database.
    //
    // The browser cannot change:
    //
    // - price
    // - premium status
    // - course title
    // - currency
    //
    // ========================================================

    const course =
      await prisma.course.findUnique({
        where: {
          id: courseId,
        },
        select: {
          id: true,
          title: true,
          price: true,
          isPremium: true,
        },
      });

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Course not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ========================================================
    // 6. VERIFY PAID COURSE
    // ========================================================

    if (
      !isPaidCourse(
        course.price,
        course.isPremium
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This course is not available for paid enrollment.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // 7. CALCULATE SERVER-SIDE AMOUNT
    // ========================================================

    const amountInPaise =
      rupeesToPaise(
        course.price
      );

    if (
      amountInPaise === null
    ) {
      console.error(
        "Invalid course payment amount.",
        {
          courseId: course.id,
          price: course.price,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "This course has an invalid payment amount.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // 8. CHECK EXISTING SUCCESSFUL PAYMENT
    // ========================================================
    //
    // A previous successful Razorpay payment is the strongest
    // local proof that the customer has already paid.
    //
    // Enrollment alone is NOT treated as payment proof.
    //
    // ========================================================

    const successfulPayment =
      await prisma.payment.findFirst({
        where: {
          userId: user.id,
          courseId: course.id,
          status: "SUCCESS",

          razorpayOrderId: {
            not: null,
          },

          razorpayPaymentId: {
            not: null,
          },

          transactionId: {
            not: null,
          },
        },

        select: {
          id: true,
          amount: true,
          status: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
          transactionId: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    // ========================================================
    // 9. ALREADY PURCHASED
    // ========================================================

    if (successfulPayment) {
      const storedAmountInPaise =
        rupeesToPaise(
          successfulPayment.amount
        );

      if (
        storedAmountInPaise ===
        amountInPaise
      ) {
        const existingEnrollment =
          await prisma.enrollment.findUnique({
            where: {
              userId_courseId: {
                userId: user.id,
                courseId: course.id,
              },
            },

            select: {
              id: true,
              progress: true,
              completed: true,
            },
          });

        return NextResponse.json(
          {
            success: true,

            alreadyPurchased: true,

            alreadyEnrolled:
              Boolean(
                existingEnrollment
              ),

            message:
              "You already have access to this course.",

            enrollmentId:
              existingEnrollment?.id ??
              null,

            progress:
              existingEnrollment?.progress ??
              0,

            completed:
              existingEnrollment?.completed ??
              false,
          },
          {
            status: 200,
          }
        );
      }

      // ------------------------------------------------------
      // SECURITY
      // ------------------------------------------------------
      //
      // A historical SUCCESS payment with a different amount
      // must NEVER silently grant access.
      //
      // ------------------------------------------------------

      console.error(
        "Successful payment amount mismatch.",
        {
          userId: user.id,
          courseId: course.id,
          paymentId:
            successfulPayment.id,
          storedAmount:
            successfulPayment.amount,
          currentCoursePrice:
            course.price,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment verification is required. Please contact support.",
        },
        {
          status: 409,
        }
      );
    }

    // ========================================================
    // 10. FIND EXISTING PENDING PAYMENT
    // ========================================================
    //
    // If the same user already has a recent pending order for
    // the same course and same amount, reuse it.
    //
    // This reduces accidental duplicate Razorpay orders when
    // the user double-clicks Buy Now or refreshes quickly.
    //
    // ========================================================

    const pendingPayment =
      await prisma.payment.findFirst({
        where: {
          userId: user.id,
          courseId: course.id,
          status: "PENDING",

          razorpayOrderId: {
            not: null,
          },

          amount: course.price,

          createdAt: {
            gte: new Date(
              Date.now() -
                15 * 60 * 1000
            ),
          },
        },

        select: {
          id: true,
          amount: true,
          status: true,
          razorpayOrderId: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    // ========================================================
    // 11. REUSE RECENT PENDING ORDER
    // ========================================================

    if (
      pendingPayment?.razorpayOrderId
    ) {
      try {
        const existingOrder =
          (await razorpay.orders.fetch(
            pendingPayment.razorpayOrderId
          )) as RazorpayOrder;

        const existingAmount =
          Number(
            existingOrder.amount
          );

        const existingCurrency =
          existingOrder.currency;

        const existingOrderValid =
          existingOrder.id ===
            pendingPayment.razorpayOrderId &&
          existingAmount ===
            amountInPaise &&
          existingCurrency === "INR" &&
          existingOrder.status ===
            "created";

        if (
          existingOrderValid
        ) {
          const razorpayKeyId =
            process.env.RAZORPAY_KEY_ID?.trim();

          if (!razorpayKeyId) {
            console.error(
              "Razorpay Key ID is missing."
            );

            return NextResponse.json(
              {
                success: false,
                message:
                  "Payment gateway is temporarily unavailable.",
              },
              {
                status: 503,
              }
            );
          }

          return NextResponse.json(
            {
              success: true,

              keyId:
                razorpayKeyId,

              orderId:
                existingOrder.id,

              amount:
                existingAmount,

              currency:
                existingCurrency,

              paymentId:
                pendingPayment.id,

              course: {
                id: course.id,
                title: course.title,
                price: course.price,
              },
            },
            {
              status: 200,
            }
          );
        }
      } catch (error) {
        console.warn(
          "Existing Razorpay order could not be reused.",
          error
        );
      }
    }

    // ========================================================
    // 12. CREATE UNIQUE RAZORPAY RECEIPT
    // ========================================================

    const receipt =
      createReceipt(
        course.id,
        user.id
      );

    if (
      !isNonEmptyString(receipt) ||
      receipt.length > 40
    ) {
      console.error(
        "Invalid Razorpay receipt generated."
      );

      return internalServerError();
    }

    // ========================================================
    // 13. CREATE RAZORPAY ORDER
    // ========================================================
    //
    // IMPORTANT:
    //
    // This is server-side only.
    //
    // Browser cannot control:
    //
    // - amount
    // - currency
    // - receipt
    // - user ID
    // - course ID
    //
    // ========================================================

    let order: RazorpayOrder;

    try {
      order =
        (await razorpay.orders.create({
          amount: amountInPaise,

          currency: "INR",

          receipt,

          notes: {
            userId: user.id,
            courseId: course.id,
          },
        })) as RazorpayOrder;
    } catch (error) {
      console.error(
        "Razorpay order creation failed.",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to create payment order. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    // ========================================================
    // 14. VALIDATE RAZORPAY ORDER
    // ========================================================

    const razorpayOrderId =
      order.id;

    const razorpayAmount =
      Number(order.amount);

    const razorpayCurrency =
      order.currency;

    if (
      !isNonEmptyString(
        razorpayOrderId
      ) ||
      !Number.isSafeInteger(
        razorpayAmount
      ) ||
      razorpayAmount <= 0 ||
      razorpayCurrency !== "INR"
    ) {
      console.error(
        "Invalid Razorpay order response.",
        {
          orderId:
            razorpayOrderId,
          amount:
            order.amount,
          currency:
            razorpayCurrency,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid payment order received from Razorpay.",
        },
        {
          status: 502,
        }
      );
    }

    // ========================================================
    // 15. SERVER AMOUNT CONSISTENCY CHECK
    // ========================================================

    if (
      razorpayAmount !==
      amountInPaise
    ) {
      console.error(
        "Razorpay order amount mismatch.",
        {
          userId: user.id,
          courseId: course.id,
          expectedAmount:
            amountInPaise,
          razorpayAmount,
          razorpayOrderId,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment amount verification failed.",
        },
        {
          status: 502,
        }
      );
    }

    // ========================================================
    // 16. GET RAZORPAY PUBLIC KEY
    // ========================================================
    //
    // Only Key ID is allowed to go to the browser.
    //
    // Secret is NEVER returned.
    //
    // ========================================================

    const razorpayKeyId =
      process.env.RAZORPAY_KEY_ID?.trim();

    if (!razorpayKeyId) {
      console.error(
        "RAZORPAY_KEY_ID is missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment gateway is temporarily unavailable.",
        },
        {
          status: 503,
        }
      );
    }

    // ========================================================
    // 17. SAVE LOCAL PAYMENT ATTEMPT
    // ========================================================
    //
    // The payment starts as PENDING.
    //
    // It must NOT become SUCCESS here.
    //
    // SUCCESS should only be written after proper Razorpay
    // payment verification.
    //
    // ========================================================

    let payment;

    try {
      payment =
        await prisma.payment.create({
          data: {
            userId: user.id,

            courseId: course.id,

            amount: course.price,

            status: "PENDING",

            paymentMethod:
              "razorpay",

            razorpayOrderId:
              razorpayOrderId,
          },

          select: {
            id: true,
            razorpayOrderId: true,
            amount: true,
            status: true,
          },
        });
    } catch (error) {
      console.error(
        "Failed to save local payment attempt.",
        error
      );

      // ------------------------------------------------------
      // IMPORTANT
      // ------------------------------------------------------
      //
      // Razorpay order exists but local audit record failed.
      //
      // Do NOT send the order to the browser.
      //
      // The customer can safely retry.
      //
      // ------------------------------------------------------

      return internalServerError();
    }

    // ========================================================
    // 18. FINAL SAFE RESPONSE
    // ========================================================
    //
    // Allowed:
    //
    // - Razorpay Key ID
    // - Order ID
    // - Amount
    // - Currency
    // - Local payment ID
    // - Course information
    //
    // NEVER return:
    //
    // - Razorpay Secret
    // - Webhook Secret
    // - DATABASE_URL
    // - Prisma object
    // - Session internals
    // - Stack trace
    //
    // ========================================================

    return NextResponse.json(
      {
        success: true,

        keyId:
          razorpayKeyId,

        orderId:
          razorpayOrderId,

        amount:
          razorpayAmount,

        currency:
          razorpayCurrency,

        paymentId:
          payment.id,

        course: {
          id: course.id,

          title:
            course.title,

          price:
            course.price,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // ========================================================
    // FINAL ERROR BOUNDARY
    // ========================================================

    console.error(
      "CREATE RAZORPAY ORDER ERROR:",
      error
    );

    return internalServerError();
  }
}