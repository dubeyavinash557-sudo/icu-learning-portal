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
    try {
      setLoading(true);

      const res = await fetch("/api/lesson-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {

  if (nextLessonUrl) {

    router.push(nextLessonUrl);

    router.refresh();

  } else {

    router.refresh();

    alert("🎉 Congratulations! Course Completed.");

  }

} else {

  alert(data.message);

}
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={completeLesson}
      disabled={loading || isCompleted}
      className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition disabled:opacity-50 ${
  isCompleted
    ? "bg-gray-500"
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