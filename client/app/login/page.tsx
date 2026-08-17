"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      alert("Invalid email or password.");
      return;
    }

    alert("Login successful.");

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-center text-4xl font-bold text-blue-700">
          Student Login
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Login to continue your ICU Learning journey
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
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

          <div className="flex justify-end">
  <Link
    href="/forgot-password"
    className="text-sm font-bold text-blue-700 transition hover:text-blue-800 hover:underline"
  >
    Forgot Password?
  </Link>
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 py-4 text-lg font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-700"
          >
            Register
          </Link>
        </p>

      </div>
    </main>
  );
}