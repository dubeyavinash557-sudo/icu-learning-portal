"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  ShieldCheck,
  Sparkles,
  LockKeyhole,
  BadgeCheck,
} from "lucide-react";

type Props = {
  courseId: string;
  courseTitle: string;
  price: number;
  isLoggedIn: boolean;
  customerName?: string;
  customerEmail?: string;
};

type CreateOrderResponse = {
  success?: boolean;
  message?: string;

  keyId?: string;

  alreadyPurchased?: boolean;
  alreadyEnrolled?: boolean;
  existingOrder?: boolean;

  order?: {
    id?: string;
    amount?: number;
    currency?: string;
    receipt?: string;
    status?: string;
  };

  payment?: {
    id?: string;
    status?: string;
  };

  course?: {
    id?: string;
    title?: string;
    price?: number;
  };

  customer?: {
    name?: string;
    email?: string;
    contact?: string;
  };
};

type VerifyResponse = {
  success?: boolean;
  message?: string;
  alreadyProcessed?: boolean;

  payment?: {
    id?: string;
    status?: string;
    amount?: number;
    transactionId?: string | null;
    razorpayPaymentId?: string | null;
  };

  enrollment?: {
    id?: string;
    progress?: number;
    completed?: boolean;
  };
};

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;

  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };

  notes?: Record<string, string>;

  theme?: {
    color?: string;
  };

  modal?: {
    ondismiss?: () => void;
  };

  handler: (
    response: RazorpayResponse
  ) => void | Promise<void>;
};

declare global {
  interface Window {
    Razorpay?: new (
      options: RazorpayOptions
    ) => {
      open: () => void;
    };
  }
}

async function readJson<T>(
  response: Response
): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}

function formatPrice(price: number) {
  if (!Number.isFinite(price) || price <= 0) {
    return "₹0";
  }

  return `₹${price.toLocaleString("en-IN")}`;
}

export default function BuyNowButton({
  courseId,
  courseTitle,
  price,
  isLoggedIn,
  customerName,
  customerEmail,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState("");

  const displayPrice = formatPrice(price);

  async function verifyPayment(
    response: RazorpayResponse
  ) {
    const verifyResponse = await fetch(
      "/api/payments/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          courseId,
          razorpayOrderId:
            response.razorpay_order_id,
          razorpayPaymentId:
            response.razorpay_payment_id,
          razorpaySignature:
            response.razorpay_signature,
        }),
      }
    );

    const verifyData =
      await readJson<VerifyResponse>(
        verifyResponse
      );

    if (
      !verifyResponse.ok ||
      !verifyData.success
    ) {
      throw new Error(
        verifyData.message ||
          "Payment verification failed. If your payment was deducted, please contact support."
      );
    }

    router.push(`/courses/${courseId}`);
    router.refresh();
  }

  async function handleBuyNow() {
    if (loading) {
      return;
    }

    setError("");

    if (!isLoggedIn) {
      router.push(
        `/login?callbackUrl=${encodeURIComponent(
          `/courses/${courseId}`
        )}`
      );
      return;
    }

    if (
      !scriptReady ||
      typeof window === "undefined" ||
      !window.Razorpay
    ) {
      setError(
        "Secure payment system is still loading. Please wait a moment and try again."
      );
      return;
    }

    if (
      !Number.isFinite(price) ||
      price <= 0
    ) {
      setError(
        "This course has an invalid price configuration."
      );
      return;
    }

    try {
      setLoading(true);

      const orderResponse = await fetch(
        "/api/payments/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            courseId,
          }),
        }
      );

      const orderData =
        await readJson<CreateOrderResponse>(
          orderResponse
        );

      if (
        orderData.alreadyPurchased ||
        orderData.alreadyEnrolled
      ) {
        router.push(`/courses/${courseId}`);
        router.refresh();
        return;
      }

      if (!orderResponse.ok) {
        throw new Error(
          orderData.message ||
            "Unable to create the payment order."
        );
      }

      const orderId =
        orderData.order?.id;

      const orderAmount =
        orderData.order?.amount;

      const orderCurrency =
        orderData.order?.currency;

      if (
        !orderData.success ||
        !orderData.keyId ||
        !orderId ||
        !Number.isSafeInteger(orderAmount) ||
        !orderAmount ||
        orderAmount <= 0 ||
        orderCurrency !== "INR"
      ) {
        throw new Error(
          orderData.message ||
            "Invalid payment order received from the server."
        );
      }

      const RazorpayCheckout =
        window.Razorpay;

      if (!RazorpayCheckout) {
        throw new Error(
          "Unable to load Razorpay Checkout. Please try again."
        );
      }

      const options: RazorpayOptions = {
        key: orderData.keyId,

        amount: orderAmount,

        currency: orderCurrency,

        name: "ICU Learning Portal",

        description:
          courseTitle.length > 255
            ? courseTitle.slice(0, 255)
            : courseTitle,

        order_id: orderId,

        prefill: {
          name: customerName || "",
          email: customerEmail || "",
        },

        notes: {
          courseId,
          courseTitle:
            courseTitle.slice(0, 240),
        },

        theme: {
          color: "#0891b2",
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        handler: async (
          response: RazorpayResponse
        ) => {
          try {
            await verifyPayment(response);
          } catch (
            verificationError
          ) {
            console.error(
              "RAZORPAY PAYMENT VERIFICATION ERROR:",
              verificationError
            );

            setError(
              verificationError instanceof
                Error
                ? verificationError.message
                : "Payment verification failed."
            );

            setLoading(false);
          }
        },
      };

      const razorpay =
        new RazorpayCheckout(options);

      razorpay.open();
    } catch (paymentError) {
      console.error(
        "RAZORPAY CHECKOUT ERROR:",
        paymentError
      );

      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Unable to start secure payment."
      );

      setLoading(false);
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onReady={() => {
          if (window.Razorpay) {
            setScriptReady(true);
          }
        }}
        onError={() => {
          setScriptReady(false);

          setError(
            "Unable to load the secure payment gateway. Please check your internet connection and try again."
          );
        }}
      />

      <div className="w-full max-w-md">
        <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <BadgeCheck size={20} />
            </div>

            <div>
              <p className="text-sm font-black text-emerald-900">
                Premium Course Access
              </p>

              <p className="mt-1 text-xs leading-5 text-emerald-800">
                Complete payment securely to unlock the
                course, protected lessons, learning progress
                and completion pathway.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={loading}
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-cyan-600
            via-blue-600
            to-indigo-600
            px-7
            py-4
            text-base
            font-black
            text-white
            shadow-xl
            shadow-blue-600/20
            transition
            duration-200
            hover:-translate-y-0.5
            hover:from-cyan-700
            hover:via-blue-700
            hover:to-indigo-700
            hover:shadow-2xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:hover:translate-y-0
          "
        >
          {loading ? (
            <>
              <Loader2
                size={21}
                className="animate-spin"
              />

              Securely Processing Payment...
            </>
          ) : (
            <>
              <CreditCard size={21} />

              {isLoggedIn
                ? `Purchase Course • ${displayPrice}`
                : "Login to Purchase"}
            </>
          )}
        </button>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600">
            <ShieldCheck
              size={14}
              className="text-emerald-600"
            />
            Secure Payment
          </div>

          <div className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600">
            <CheckCircle2
              size={14}
              className="text-emerald-600"
            />
            Verified Access
          </div>

          <div className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600">
            <LockKeyhole
              size={14}
              className="text-blue-600"
            />
            Protected Content
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
          <Sparkles
            size={14}
            className="text-cyan-600"
          />

          UPI • Cards • Net Banking
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-800">
              Payment Error
            </p>

            <p className="mt-1 text-xs leading-5 text-red-700">
              {error}
            </p>
          </div>
        )}
      </div>
    </>
  );
}