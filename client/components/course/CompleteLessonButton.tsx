"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Props = {
  lessonId: string;
};

export default function CompleteLessonButton({
  lessonId,
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
        router.refresh();
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
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
    >
      <CheckCircle2 size={18} />

      {loading ? "Completing..." : "Mark as Complete"}
    </button>
  );
}