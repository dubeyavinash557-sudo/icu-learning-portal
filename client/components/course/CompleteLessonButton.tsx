"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Props = {
  lessonId: string;
  isCompleted: boolean;
  nextLessonUrl: string | null;
};

export default function CompleteLessonButton({
  lessonId,
  isCompleted,
  nextLessonUrl,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const completeLesson = async () => {
    if (loading || isCompleted) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/lesson-progress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonId,
          }),
        }
      );

      let data: {
        success?: boolean;
        message?: string;
        progress?: number;
        completedLessons?: number;
        totalLessons?: number;
        courseCompleted?: boolean;
      } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to complete this lesson."
        );

        return;
      }

      /*
       * Course completed
       */
      if (data.courseCompleted) {
        router.refresh();

        alert(
          "🎉 Congratulations! Course Completed."
        );

        return;
      }

      /*
       * Move to next lesson
       */
      if (nextLessonUrl) {
        router.push(nextLessonUrl);
        return;
      }

      /*
       * No next lesson available
       */
      router.refresh();

      alert(
        data.message ||
          "Lesson completed successfully."
      );
    } catch (error) {
      console.error(
        "COMPLETE LESSON ERROR:",
        error
      );

      alert(
        "Something went wrong while completing the lesson. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <CheckCircle2 size={18} />

      {loading
        ? "Completing..."
        : isCompleted
          ? "Completed"
          : "Mark as Complete"}
    </button>
  );
}