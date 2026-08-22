import "server-only";

import Razorpay from "razorpay";

// ============================================================
// RAZORPAY SERVER CLIENT
// ============================================================

const razorpayKeyId = process.env.RAZORPAY_KEY_ID?.trim();

const razorpayKeySecret =
  process.env.RAZORPAY_KEY_SECRET?.trim();

if (!razorpayKeyId) {
  throw new Error(
    "RAZORPAY_KEY_ID is missing from environment variables."
  );
}

if (!razorpayKeySecret) {
  throw new Error(
    "RAZORPAY_KEY_SECRET is missing from environment variables."
  );
}

if (
  !razorpayKeyId.startsWith("rzp_test_") &&
  !razorpayKeyId.startsWith("rzp_live_")
) {
  throw new Error(
    "Invalid RAZORPAY_KEY_ID format."
  );
}

// ============================================================
// GLOBAL CLIENT
// ============================================================

const globalForRazorpay =
  globalThis as typeof globalThis & {
    razorpay?: Razorpay;
  };

// ============================================================
// CREATE / REUSE CLIENT
// ============================================================

const razorpay =
  globalForRazorpay.razorpay ??
  new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });

globalForRazorpay.razorpay = razorpay;

export default razorpay;