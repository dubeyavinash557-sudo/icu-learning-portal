"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  LogIn,
  PlayCircle,
  UserPlus,
} from "lucide-react";

type Props = {
  courseId: string;
};

type EnrollResponse = {
  success?: boolean;
  alreadyEnrolled?: boolean;
  message?: string;
};

export default function FreeEnrollButton({
  courseId,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function redirectToLogin() {
    const callbackUrl =
      pathname || `/courses/${courseId}`;

    router.push(
      `/login?callbackUrl=${encodeURIComponent(
        callbackUrl
      )}`
    );
  }

  async function handleEnroll() {
    if (loading) {
      return;
    }

    setError("");

    if (status === "unauthenticated") {
      redirectToLogin();
      return;
    }

    if (status === "loading") {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/enroll",
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

      const data =
        (await response.json()) as EnrollResponse;

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to enroll in this course."
        );
      }

      if (
        data.success ||
        data.alreadyEnrolled
      ) {
        /*
         * IMPORTANT:
         *
         * Free demo enrollment now starts
         * the learning experience immediately.
         *
         * /learn/[courseId] automatically opens
         * the first lesson.
         */
        router.push(
          `/learn/${courseId}`
        );

        router.refresh();

        return;
      }

      throw new Error(
        data.message ||
          "Unable to enroll in this course."
      );
    } catch (error) {
      console.error(
        "FREE COURSE ENROLLMENT ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to enroll in this course."
      );

      setLoading(false);
    }
  }

  const isSessionLoading =
    status === "loading";

  const isGuest =
    status === "unauthenticated";

  return (
    <div className="w-full max-w-md">

      <button
        type="button"
        onClick={handleEnroll}
        disabled={
          loading ||
          isSessionLoading
        }
        className="
          group
          inline-flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-emerald-600
          via-teal-600
          to-cyan-600
          px-8
          py-4
          text-base
          font-black
          text-white
          shadow-xl
          shadow-emerald-600/20
          transition
          duration-200
          hover:-translate-y-0.5
          hover:from-emerald-700
          hover:via-teal-700
          hover:to-cyan-700
          hover:shadow-2xl
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-500
          focus:ring-offset-2
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:translate-y-0
        "
      >
        {loading || isSessionLoading ? (
          <>
            <Loader2
              size={21}
              className="animate-spin"
            />

            Starting Demo...
          </>
        ) : isGuest ? (
          <>
            <LogIn size={21} />

            Login to Start Free
          </>
        ) : (
          <>
            <PlayCircle size={21} />

            Start Free Demo
          </>
        )}
      </button>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-emerald-700">
        <CheckCircle2 size={16} />

        Free enrollment • Instant learning access
      </div>

      {!isGuest &&
        !isSessionLoading && (
          <p className="mt-2 text-center text-xs leading-5 text-slate-500">
            Start the demo now. Complete the
            selected lessons and continue to the
            premium learning programs.
          </p>
        )}

      {isGuest &&
        !isSessionLoading && (
          <p className="mt-2 text-center text-xs leading-5 text-slate-500">
            Login or create your account to start
            the free demo.
          </p>
        )}

      {error && (
        <div
          role="alert"
          className="
            mt-4
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-center
            text-sm
            font-medium
            text-red-700
          "
        >
          {error}
        </div>
      )}

    </div>
  );
}