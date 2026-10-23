
"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteQuestionButtonProps {
  quizId: string;
  questionId: string;
}

export default function DeleteQuestionButton({
  quizId,
  questionId,
}: DeleteQuestionButtonProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (deleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this question? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      const response = await fetch(
        `/api/admin/quizzes/${encodeURIComponent(quizId)}/questions/${encodeURIComponent(questionId)}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        let message = "Failed to delete question. Please try again.";

        try {
          const result: { error?: string } = await response.json();

          if (result.error) {
            message = result.error;
          }
        } catch {
          // Keep the default error message if the response is not JSON.
        }

        throw new Error(message);
      }

      window.location.reload();
    } catch (error) {
      console.error("Delete question failed:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete question. Please try again."
      );

      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      aria-label={deleting ? "Deleting question" : "Delete question"}
      className="inline-flex items-center gap-2 text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={16} aria-hidden="true" />
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
