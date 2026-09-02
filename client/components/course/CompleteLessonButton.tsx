"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Award,
  CheckCircle2,
  Download,
  Loader2,
  ArrowRight,
  LayoutDashboard,
  AlertCircle,
  X,
} from "lucide-react";

type Props = {
  lessonId: string;
  isCompleted: boolean;
  nextLessonUrl: string | null;
};

type ProgressResponse = {
  success?: boolean;
  message?: string;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
  courseCompleted?: boolean;
};

type CertificateResponse = {
  id?: string;
  certificateNo?: string;
  issuedAt?: string;
  courseTitle?: string;
  courseId?: string;
};

export default function CompleteLessonButton({
  lessonId,
  isCompleted,
  nextLessonUrl,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [certificateId, setCertificateId] = useState<string | null>(
    null
  );
  const [certificateLoading, setCertificateLoading] =
    useState(false);
  const [certificateError, setCertificateError] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const completeLesson = async () => {
    if (loading || isCompleted) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/lesson-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
        }),
      });

      let data: ProgressResponse = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to complete this lesson. Please try again."
        );

        return;
      }

      /*
       * Course completed
       *
       * The lesson-progress API creates the certificate when
       * the final lesson is completed. We then fetch the latest
       * certificate through the existing protected endpoint.
       */
      if (data.courseCompleted) {
        setShowCompletion(true);
        setCertificateLoading(true);
        setCertificateError(null);

        try {
          const certificateResponse = await fetch(
            "/api/certificates/latest",
            {
              method: "GET",
              cache: "no-store",
            }
          );

          if (!certificateResponse.ok) {
            throw new Error(
              "Unable to load your certificate."
            );
          }

          const certificateData: CertificateResponse | null =
            await certificateResponse.json();

          if (certificateData?.id) {
            setCertificateId(certificateData.id);
          } else {
            setCertificateError(
              "Your course is complete, but the certificate is still being prepared. Please check the Certificates section."
            );
          }
        } catch (certificateFetchError) {
          console.error(
            "CERTIFICATE FETCH ERROR:",
            certificateFetchError
          );

          setCertificateError(
            "Course completed successfully. Your certificate could not be loaded right now. Please check the Certificates section."
          );
        } finally {
          setCertificateLoading(false);
        }

        router.refresh();
        return;
      }

      /*
       * Move directly to the next lesson.
       */
      if (nextLessonUrl) {
        router.push(nextLessonUrl);
        return;
      }

      /*
       * Fallback when no next lesson exists.
       */
      router.refresh();
    } catch (requestError) {
      console.error(
        "COMPLETE LESSON ERROR:",
        requestError
      );

      setError(
        "Something went wrong while completing this lesson. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const closeCompletionPanel = () => {
    setShowCompletion(false);
    router.refresh();
  };

  /*
   * Course completion success state
   */
  if (showCompletion) {
    return (
      <div
        className="w-full rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6 shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Award size={26} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Course Completed
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Congratulations! 🎉
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                You have successfully completed this course.
                Your achievement has been recorded in your
                learning profile.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCompletionPanel}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-700"
            aria-label="Close completion message"
          >
            <X size={20} />
          </button>
        </div>

        {certificateLoading && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <Loader2
              size={18}
              className="animate-spin"
            />

            <span>
              Preparing your certificate...
            </span>
          </div>
        )}

        {certificateError && !certificateLoading && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{certificateError}</span>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {certificateId && (
            <a
              href={`/api/certificates/latest/${certificateId}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <Download size={18} />

              Download Certificate
            </a>
          )}

          <button
            type="button"
            onClick={() =>
              router.push("/dashboard/certificates")
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <Award size={18} />

            My Certificates
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <LayoutDashboard size={18} />

            Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        onClick={completeLesson}
        disabled={loading || isCompleted}
        aria-busy={loading}
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
          isCompleted
            ? "bg-slate-500"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <CheckCircle2 size={18} />
        )}

        {loading
          ? "Completing..."
          : isCompleted
            ? "Completed"
            : "Mark as Complete"}

        {!loading &&
          !isCompleted &&
          nextLessonUrl && (
            <ArrowRight size={17} />
          )}
      </button>

      {error && (
        <div
          className="flex max-w-xl items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
          role="alert"
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>{error}</span>
        </div>
      )}
    </div>
  );
}