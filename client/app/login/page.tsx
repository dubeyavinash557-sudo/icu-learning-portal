"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    const email =
      typeof emailValue === "string"
        ? emailValue.trim()
        : "";

    const password =
      typeof passwordValue === "string"
        ? passwordValue
        : "";

    if (!email || !password) {
      setError("Please enter your email address and password.");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!result) {
        setError(
          "Unable to complete login. Please try again."
        );
        return;
      }

      if (result.error) {
        setError("Invalid email or password.");
        return;
      }

      setSuccess("Login successful. Redirecting to your dashboard...");

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("LOGIN REQUEST ERROR:", error);

      setError(
        "Something went wrong while logging in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl lg:grid-cols-2">

          {/* =====================================================
              LEFT — BRAND / SECURITY INFORMATION
          ===================================================== */}

          <section className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative">

              {/* BRAND */}

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                  <KeyRound size={25} />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-100">
                    ICU Learning Portal
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-blue-100">
                    Professional Medical Education
                  </p>
                </div>
              </div>

              {/* HERO */}

              <div className="mt-16 max-w-lg">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Student Account
                </p>

                <h1 className="mt-4 text-4xl font-black leading-tight xl:text-5xl">
                  Continue your ICU learning journey.
                </h1>

                <p className="mt-6 text-base leading-8 text-blue-100">
                  Sign in to access your courses,
                  learning progress, certificates,
                  quizzes and personalized
                  medical education resources.
                </p>
              </div>

              {/* SECURITY FEATURES */}

              <div className="mt-10 space-y-4">

                <SecurityFeature
                  icon={<ShieldCheck size={18} />}
                  title="Secure authentication"
                  description="Your account credentials are protected by secure authentication."
                />

                <SecurityFeature
                  icon={<LockKeyhole size={18} />}
                  title="Protected password"
                  description="Your password is never displayed or sent by email."
                />

                <SecurityFeature
                  icon={<CheckCircle2 size={18} />}
                  title="Learning dashboard"
                  description="Continue your courses and track your learning progress."
                />

              </div>
            </div>

            <div className="relative mt-12 border-t border-white/15 pt-6 text-xs text-blue-100">
              ICU Learning Portal • Professional Medical Education
            </div>
          </section>

          {/* =====================================================
              RIGHT — LOGIN FORM
          ===================================================== */}

          <section className="bg-white p-6 sm:p-10 lg:p-12 xl:p-14">
            <div className="mx-auto max-w-md">

              {/* MOBILE BRAND */}

              <div className="flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <KeyRound size={22} />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.15em] text-blue-700">
                    ICU Learning Portal
                  </p>

                  <p className="text-xs text-slate-500">
                    Professional Medical Education
                  </p>
                </div>
              </div>

              {/* HEADING */}

              <div className="mt-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <LogIn size={27} />
                </div>

                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                  Student Login
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Welcome back
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Login to continue your ICU Learning
                  Portal journey.
                </p>
              </div>

              {/* =================================================
                  SUCCESS MESSAGE
              ================================================= */}

              {success && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <p className="text-sm font-semibold leading-6 text-emerald-700">
                      {success}
                    </p>
                  </div>
                </div>
              )}

              {/* =================================================
                  ERROR MESSAGE
              ================================================= */}

              {error && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      size={19}
                      className="mt-0.5 shrink-0 text-red-600"
                    />

                    <p className="text-sm font-semibold leading-6 text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* =================================================
                  LOGIN FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="Enter your email address"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-slate-700"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-bold text-blue-700 transition hover:text-blue-800 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-800 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Login
                    </>
                  )}
                </button>
              </form>

              {/* =================================================
                  SECURITY NOTICE
              ================================================= */}

              <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    Your login credentials are protected.
                    Never share your password with anyone.
                  </p>
                </div>
              </div>

              {/* =================================================
                  REGISTER
              ================================================= */}

              <p className="mt-7 text-center text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-bold text-blue-700 transition hover:text-blue-800 hover:underline"
                >
                  Register
                </Link>
              </p>

            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/*
 * ==========================================================
 * SECURITY FEATURE
 * ==========================================================
 */

function SecurityFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-200 ring-1 ring-white/10">
        {icon}
      </div>

      <div>
        <p className="text-sm font-black text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-100">
          {description}
        </p>
      </div>
    </div>
  );
}