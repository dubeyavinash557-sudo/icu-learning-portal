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
  const confirmed = window.confirm(
    "Are you sure you want to delete this question?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setDeleting(true);

    const response = await fetch(
      `/admin/quizzes/${quizId}/questions/${questionId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete question.");
    }

    window.location.reload();
  } catch (error) {
    console.error(error);

    alert(
      "Failed to delete question. Please try again."
    );

    setDeleting(false);
  }
}

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="inline-flex items-center gap-2 text-red-600 hover:underline disabled:opacity-50"
    >
      <Trash2 size={16} />

      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}