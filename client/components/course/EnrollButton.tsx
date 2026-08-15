"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CreditCard,
  Loader2,
  ShieldCheck,
} from "lucide-react";

type Props = {
  courseId: string;
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
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions
    ) => RazorpayInstance;
  }
}

export default function EnrollButton({
  courseId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function loadRazorpayScript() {
    if (window.Razorpay) {
      return true;
    }

    return new Promise<boolean>((resolve) => {
      const script =
        document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }

  async function handlePayment() {
    if (loading) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const scriptLoaded =
        await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error(
          "Unable to load Razorpay Checkout."
        );
      }

      const orderResponse =
        await fetch(
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
        await orderResponse.json();

      if (!orderResponse.ok) {
        if (orderData.alreadyEnrolled) {
          router.refresh();
          return;
        }

        throw new Error(
          orderData.message ||
            "Unable to create payment order."
        );
      }

      const options: RazorpayOptions = {
        key: orderData.keyId,

        amount: orderData.amount,

        currency: orderData.currency,

        name: "ICU Learning Portal",

        description:
          orderData.course.title,

        order_id: orderData.orderId,

        theme: {
          color: "#0891b2",
        },

        handler: async (
          response
        ) => {
          try {
            setMessage(
              "Verifying your payment..."
            );

            const verifyResponse =
              await fetch(
                "/api/payments/verify",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
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
              await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(
                verifyData.message ||
                  "Payment verification failed."
              );
            }

            setMessage(
              "Payment successful. Course unlocked!"
            );

            router.refresh();
          } catch (error) {
            console.error(
              "PAYMENT VERIFICATION ERROR:",
              error
            );

            setMessage(
              error instanceof Error
                ? error.message
                : "Payment verification failed."
            );

            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            setMessage(
              "Payment window closed."
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(
        "RAZORPAY CHECKOUT ERROR:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to start payment."
      );

      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className="
          inline-flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-cyan-600
          to-blue-700
          px-8
          py-4
          text-lg
          font-bold
          text-white
          shadow-xl
          shadow-blue-600/20
          transition
          hover:from-cyan-700
          hover:to-blue-800
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <Loader2
              size={21}
              className="animate-spin"
            />
            Processing...
          </>
        ) : (
          <>
            <CreditCard size={21} />
            Buy Now
          </>
        )}
      </button>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
        <ShieldCheck size={16} />
        Secure payment powered by Razorpay
      </div>

      {message && (
        <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-700">
          {message}
        </p>
      )}
    </div>
  );
}