"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const body = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      qualification: formData.get("qualification"),
      hospital: formData.get("hospital"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    alert(data.message);

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          Student Registration
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Create your ICU Learning Portal account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            name="fullName"
            placeholder="Full Name"
            required
            className="w-full rounded-xl border p-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full rounded-xl border p-4"
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            required
            className="w-full rounded-xl border p-4"
          />

          <input
            name="qualification"
            placeholder="Qualification"
            required
            className="w-full rounded-xl border p-4"
          />

          <input
            name="hospital"
            placeholder="Hospital Name"
            required
            className="w-full rounded-xl border p-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-xl border p-4"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full rounded-xl border p-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 py-4 text-lg font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-700"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  );
}