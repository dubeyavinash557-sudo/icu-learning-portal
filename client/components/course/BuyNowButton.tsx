"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  ShieldCheck,
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
  orderId?: string;
  amount?: number;
  currency?: string;
  keyId?: string;
  paymentId?: string;
  alreadyPurchased?: boolean;
  message?: string;
};

type VerifyResponse = {
  success?: boolean;
  message?: string;
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
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
  handler: (response: RazorpayResponse) => void;
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
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
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState("");

  const handleBuyNow = async () => {
    setError("");

    if (!isLoggedIn) {
      router.push(
        `/login?callbackUrl=${encodeURIComponent(
          `/courses/${courseId}`
        )}`
      );

      return;
    }

    if (!scriptLoaded || !window.Razorpay) {
      setError(
        "Payment system is still loading. Please try again in a moment."
      );

      return;
    }

    if (!price || price <= 0) {
      setError("Invalid course price.");

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
          body: JSON.stringify({
            courseId,
          }),
        }
      );

      const orderData =
        (await orderResponse.json()) as CreateOrderResponse;

      if (!orderResponse.ok) {
        if (orderData.alreadyPurchased) {
          router.push(`/courses/${courseId}`);
          router.refresh();
          return;
        }

        throw new Error(
          orderData.message ||
            "Unable to create payment order."
        );
      }

      if (
        !orderData.orderId ||
        !orderData.amount ||
        !orderData.currency ||
        !orderData.keyId
      ) {
        throw new Error(
          "Invalid payment order received from server."
        );
      }

      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ICU Learning Portal",
        description: courseTitle,
        order_id: orderData.orderId,

        prefill: {
          name: customerName || "",
          email: customerEmail || "",
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
            setError("");

            const verifyResponse = await fetch(
              "/api/payments/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
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
              (await verifyResponse.json()) as VerifyResponse;

            if (!verifyResponse.ok) {
              throw new Error(
                verifyData.message ||
                  "Payment verification failed."
              );
            }

            router.push(`/courses/${courseId}`);
            router.refresh();
          } catch (verificationError) {
            console.error(
              "PAYMENT VERIFICATION ERROR:",
              verificationError
            );

            setError(
              verificationError instanceof Error
                ? verificationError.message
                : "Payment verification failed."
            );

            setLoading(false);
          }
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (paymentError) {
      console.error(
        "RAZORPAY CHECKOUT ERROR:",
        paymentError
      );

      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Unable to start payment."
      );

      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          setScriptLoaded(true);
        }}
        onError={() => {
          setError(
            "Unable to load Razorpay payment system."
          );
        }}
      />

      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={loading}
          className="
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
            text-lg
            font-bold
            text-white
            shadow-xl
            shadow-blue-600/20
            transition
            hover:from-cyan-700
            hover:via-blue-700
            hover:to-indigo-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <Loader2
                size={22}
                className="animate-spin"
              />
              Processing...
            </>
          ) : (
            <>
              <CreditCard size={22} />
              {isLoggedIn
                ? `Buy Now • ₹${price.toLocaleString("en-IN")}`
                : "Login to Purchase"}
            </>
          )}
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck
              size={15}
              className="text-emerald-600"
            />
            Secure Payment
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2
              size={15}
              className="text-emerald-600"
            />
            Instant Access
          </span>

          <span>UPI • Cards • Net Banking</span>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}
      </div>
    </>
  );
}