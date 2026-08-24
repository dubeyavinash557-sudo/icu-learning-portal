import "server-only";

import crypto from "node:crypto";

const RAZORPAY_API_BASE = "https://api.razorpay.com/v1";

// ==========================================================
// ENVIRONMENT
// ==========================================================

function getEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

export function getRazorpayKeyId(): string {
  return getEnv("RAZORPAY_KEY_ID");
}

export function getRazorpayKeySecret(): string {
  return getEnv("RAZORPAY_KEY_SECRET");
}

export function getRazorpayWebhookSecret(): string {
  return getEnv("RAZORPAY_WEBHOOK_SECRET");
}

// ==========================================================
// TYPES
// ==========================================================

export type RazorpayOrder = {
  id: string;
  entity: "order";
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid" | string;
  attempts: number;
  notes?: Record<string, string>;
  created_at: number;
};

export type RazorpayPayment = {
  id: string;
  entity: "payment";
  amount: number;
  currency: string;
  status:
    | "created"
    | "authorized"
    | "captured"
    | "refunded"
    | "failed"
    | string;
  order_id: string | null;
  method?: string;
  email?: string | null;
  contact?: string | null;
  description?: string | null;
  captured?: boolean;
  created_at?: number;
};

// ==========================================================
// BASIC AUTH
// ==========================================================

function getBasicAuthHeader(): string {
  const keyId = getRazorpayKeyId();
  const keySecret = getRazorpayKeySecret();

  const token = Buffer.from(
    `${keyId}:${keySecret}`,
    "utf8"
  ).toString("base64");

  return `Basic ${token}`;
}

// ==========================================================
// RAZORPAY API REQUEST
// ==========================================================

async function razorpayRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(
    `${RAZORPAY_API_BASE}${path}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: getBasicAuthHeader(),
        ...(options.headers ?? {}),
      },
      cache: "no-store",
    }
  );

  const text = await response.text();

  let data: unknown = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = {
      error: text,
    };
  }

  if (!response.ok) {
    console.error(
      "Razorpay API request failed:",
      {
        path,
        status: response.status,
        data,
      }
    );

    throw new Error(
      `Razorpay API request failed with status ${response.status}`
    );
  }

  return data as T;
}

// ==========================================================
// CREATE ORDER
// ==========================================================

export async function createRazorpayOrder(params: {
  amount: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrder> {
  if (
    !Number.isSafeInteger(params.amount) ||
    params.amount <= 0
  ) {
    throw new Error(
      "Razorpay order amount must be a positive integer."
    );
  }

  const currency =
    params.currency?.trim().toUpperCase() || "INR";

  if (currency !== "INR") {
    throw new Error(
      "Only INR payments are supported."
    );
  }

  const receipt = params.receipt.trim();

  if (!receipt) {
    throw new Error(
      "Razorpay order receipt is required."
    );
  }

  return razorpayRequest<RazorpayOrder>(
    "/orders",
    {
      method: "POST",
      body: JSON.stringify({
        amount: params.amount,
        currency,
        receipt,
        notes: params.notes ?? {},
        partial_payment: false,
      }),
    }
  );
}

// ==========================================================
// FETCH ORDER
// ==========================================================

export async function fetchRazorpayOrder(
  orderId: string
): Promise<RazorpayOrder> {
  const normalizedOrderId = orderId.trim();

  if (!normalizedOrderId) {
    throw new Error(
      "Razorpay order ID is required."
    );
  }

  return razorpayRequest<RazorpayOrder>(
    `/orders/${encodeURIComponent(normalizedOrderId)}`,
    {
      method: "GET",
    }
  );
}

// ==========================================================
// FETCH PAYMENT
// ==========================================================

export async function fetchRazorpayPayment(
  paymentId: string
): Promise<RazorpayPayment> {
  const normalizedPaymentId = paymentId.trim();

  if (!normalizedPaymentId) {
    throw new Error(
      "Razorpay payment ID is required."
    );
  }

  return razorpayRequest<RazorpayPayment>(
    `/payments/${encodeURIComponent(normalizedPaymentId)}`,
    {
      method: "GET",
    }
  );
}

// ==========================================================
// PAYMENT SIGNATURE
// ==========================================================

export function generatePaymentSignature(params: {
  orderId: string;
  paymentId: string;
}): string {
  const orderId = params.orderId.trim();
  const paymentId = params.paymentId.trim();

  if (!orderId || !paymentId) {
    throw new Error(
      "Order ID and payment ID are required."
    );
  }

  return crypto
    .createHmac(
      "sha256",
      getRazorpayKeySecret()
    )
    .update(
      `${orderId}|${paymentId}`,
      "utf8"
    )
    .digest("hex");
}

// ==========================================================
// TIMING-SAFE PAYMENT SIGNATURE
// ==========================================================

export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const orderId = params.orderId.trim();
  const paymentId = params.paymentId.trim();
  const signature = params.signature.trim();

  if (!orderId || !paymentId || !signature) {
    return false;
  }

  const expectedSignature =
    generatePaymentSignature({
      orderId,
      paymentId,
    });

  const expectedBuffer =
    Buffer.from(expectedSignature, "utf8");

  const receivedBuffer =
    Buffer.from(signature, "utf8");

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    expectedBuffer,
    receivedBuffer
  );
}

// ==========================================================
// WEBHOOK SIGNATURE
// ==========================================================

export function generateWebhookSignature(
  rawBody: string
): string {
  if (!rawBody) {
    throw new Error(
      "Webhook body is required."
    );
  }

  return crypto
    .createHmac(
      "sha256",
      getRazorpayWebhookSecret()
    )
    .update(rawBody, "utf8")
    .digest("hex");
}

// ==========================================================
// TIMING-SAFE WEBHOOK SIGNATURE
// ==========================================================

export function verifyWebhookSignature(params: {
  rawBody: string;
  signature: string;
}): boolean {
  const rawBody = params.rawBody;
  const signature = params.signature.trim();

  if (!rawBody || !signature) {
    return false;
  }

  const expectedSignature =
    generateWebhookSignature(rawBody);

  const expectedBuffer =
    Buffer.from(expectedSignature, "utf8");

  const receivedBuffer =
    Buffer.from(signature, "utf8");

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    expectedBuffer,
    receivedBuffer
  );
}

// ==========================================================
// ORDER NOTES
// ==========================================================

export function getOrderNote(
  order: RazorpayOrder,
  key: string
): string | null {
  const value = order.notes?.[key];

  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    return null;
  }

  return value.trim();
}