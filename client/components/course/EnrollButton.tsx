"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  courseId: string;
};

export default function EnrollButton({ courseId }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const enroll = async () => {
    setLoading(true);

    const res = await fetch("/api/enroll", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    courseId,
  }),
});

console.log("Status:", res.status);

const data = await res.text();

console.log("Response:", data);

    setLoading(false);

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <button
      onClick={enroll}
      disabled={loading}
      className="inline-flex items-center rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? "Enrolling..." : "Enroll Now"}
    </button>
  );
}