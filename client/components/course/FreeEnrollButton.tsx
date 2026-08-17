"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleEnroll() {
    if (loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/enroll",
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

      const data =
        (await response.json()) as EnrollResponse;

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

      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">

      <button
        type="button"
        onClick={handleEnroll}
        disabled={loading}
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

        {loading ? (
          <>
            <Loader2
              size={21}
              className="animate-spin"
            />

            Enrolling...
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