"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  UserPlus,
  LogIn,
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
    const callbackUrl = pathname || `/courses/${courseId}`;

    router.push(
      `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    );
  }

  async function handleEnroll() {
    if (loading) {
      return;
    }

    setError("");

    /*
     * Guest users must login before free enrollment.
     * Do not call /api/enroll while unauthenticated.
     */
    if (status === "unauthenticated") {
      redirectToLogin();
      return;
    }

    /*
     * Prevent enrollment request while session is loading.
     */
    if (status === "loading") {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
        }),
      });

      const data =
        (await response.json()) as EnrollResponse;

      /*
       * Session may expire between the session check
       * and the enrollment request.
       */
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
    } finally {
      setLoading(false);
    }
  }

  const isSessionLoading = status === "loading";
  const isGuest = status === "unauthenticated";

  return (
    <div className="w-full max-w-md">
      <button
        type="button"
        onClick={handleEnroll}
        disabled={loading || isSessionLoading}
        className="
          inline-flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-emerald-600
          to-teal-600
          px-8
          py-4
          text-lg
          font-bold
          text-white
          shadow-xl
          shadow-emerald-600/20
          transition
          hover:from-emerald-700
          hover:to-teal-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading || isSessionLoading ? (
          <>
            <Loader2
              size={21}
              className="animate-spin"
            />

            Checking access...
          </>
        ) : isGuest ? (
          <>
            <LogIn size={21} />

            Login to Enroll Free
          </>
        ) : (
          <>
            <UserPlus size={21} />

            Enroll Free
          </>
        )}
      </button>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-emerald-700">
        <CheckCircle2 size={16} />

        Free enrollment • Instant access
      </div>

      {isGuest && !isSessionLoading && (
        <p className="mt-2 text-center text-xs text-slate-500">
          Login or create an account to start learning.
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