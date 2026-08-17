"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  LockKeyhole,
  AlertCircle,
} from "lucide-react";

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const [checkingToken, setCheckingToken] = useState(true);

  /*
   * ==========================================================
   * READ RESET TOKEN FROM BROWSER URL
   * ==========================================================
   *
   * We intentionally read the token after the component mounts.
   *
   * This prevents the first client render from incorrectly
   * treating a valid reset link as an invalid link.
   *
   * Expected URL:
   *
   * /reset-password?token=xxxxxxxx
   *
   * The password itself is NEVER read from the URL.
   * ==========================================================
   */

  useEffect(() => {
    try {
      const params = new URLSearchParams(
        window.location.search
      );

      const urlToken = params.get("token")?.trim() || "";

      if (urlToken) {
        setToken(urlToken);
      } else {
        setToken("");
      }
    } catch (error) {
      console.error(
        "RESET TOKEN READ ERROR:",
        error
      );

      setToken("");
    } finally {
      setCheckingToken(false);
    }
  }, []);

  /*
   * ==========================================================
   * SUBMIT NEW PASSWORD
   * ==========================================================
   */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!token) {
      setError(
        "This password reset link is invalid or incomplete."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.message ||
            "Unable to reset your password."
        );
        return;
      }

      setSuccess(true);

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "RESET PASSWORD REQUEST ERROR:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * ==========================================================
   * TOKEN CHECK LOADING
   * ==========================================================
   */

  if (checkingToken) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 px-4">
        <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 text-center shadow-2xl backdrop-blur">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="mt-4 text-sm font-bold text-white">
            Loading secure password reset...
          </p>
        </div>
      </main>
    );
  }

  /*
   * ==========================================================
   * INVALID / MISSING TOKEN
   * ==========================================================
   */

  if (!token) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 px-4 py-8 sm:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white p-8 shadow-2xl sm:p-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertCircle size={31} />
            </div>

            <p className="mt-6 text-center text-xs font-black uppercase tracking-[0.18em] text-red-600">
              Invalid Reset Link
            </p>

            <h1 className="mt-2 text-center text-3xl font-black text-slate-900">
              Password reset link is invalid
            </h1>

            <p className="mt-4 text-center text-sm leading-7 text-slate-500">
              The password reset link is missing
              or incomplete. Please request a
              new password reset link.
            </p>

            <Link
              href="/forgot-password"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-4 text-sm font-black text-white transition hover:bg-blue-800"
            >
              <KeyRound size={18} />
              Request New Reset Link
            </Link>

            <Link
              href="/login"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
              Return to Login
            </Link>

          </div>
        </div>
      </main>
    );
  }

  /*
   * ==========================================================
   * MAIN RESET PASSWORD PAGE
   * ==========================================================
   */

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl lg:grid-cols-2">

          {/* ==================================================
              LEFT — SECURITY INFORMATION
          ================================================== */}

          <section className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative">

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

              <div className="mt-16 max-w-lg">

                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Secure Account Recovery
                </p>

                <h1 className="mt-4 text-4xl font-black leading-tight xl:text-5xl">
                  Create a new password.
                </h1>

                <p className="mt-6 text-base leading-8 text-blue-100">
                  Your password protects your
                  courses, progress, certificates,
                  quiz history and account information.
                  Choose a strong new password to
                  continue learning securely.
                </p>

              </div>

              <div className="mt-10 space-y-4">

                <SecurityFeature
                  icon={<ShieldCheck size={18} />}
                  title="Secure reset token"
                  description="Your reset link uses a secure, time-limited token."
                />

                <SecurityFeature
                  icon={<LockKeyhole size={18} />}
                  title="Password encryption"
                  description="Your new password is stored using bcrypt hashing."
                />

                <SecurityFeature
                  icon={<CheckCircle2 size={18} />}
                  title="One-time reset"
                  description="Once used, the reset link cannot be reused."
                />

              </div>

            </div>

            <div className="relative mt-12 border-t border-white/15 pt-6 text-xs text-blue-100">
              ICU Learning Portal • Secure Student Account Recovery
            </div>

          </section>

          {/* ==================================================
              RIGHT — RESET FORM
          ================================================== */}

          <section className="bg-white p-6 sm:p-10 lg:p-12 xl:p-14">

            <div className="mx-auto max-w-md">

              <Link
                href="/login"
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-blue-700"
              >
                <ArrowLeft
                  size={17}
                  className="transition-transform group-hover:-translate-x-1"
                />

                Back to Login
              </Link>

              {/* ==================================================
                  SUCCESS STATE
              ================================================== */}

              {success ? (
                <div className="mt-12">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <CheckCircle2 size={31} />
                  </div>

                  <p className="mt-6 text-center text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                    Password Updated
                  </p>

                  <h1 className="mt-2 text-center text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                    Password reset successfully
                  </h1>

                  <p className="mt-4 text-center text-sm leading-7 text-slate-500">
                    Your new password is now active.
                    Your old password will no longer
                    work for login.
                  </p>

                  <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

                    <div className="flex items-start gap-3">

                      <ShieldCheck
                        size={20}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />

                      <p className="text-sm leading-6 text-emerald-800">
                        Your reset link has been
                        consumed and cannot be used
                        again.
                      </p>

                    </div>

                  </div>

                  <Link
                    href="/login"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-800 hover:to-cyan-700"
                  >
                    Continue to Login
                  </Link>

                </div>
              ) : (

                /* ==================================================
                   RESET FORM
                ================================================== */

                <>
                  <div className="mt-10">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                      <LockKeyhole size={27} />
                    </div>

                    <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                      New Password
                    </p>

                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                      Reset your password
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500">
                      Create a new password for your
                      ICU Learning Portal account.
                    </p>

                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                  >

                    {/* ==================================================
                        NEW PASSWORD
                    ================================================== */}

                    <div>

                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        New Password
                      </label>

                      <div className="relative">

                        <input
                          id="password"
                          name="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          autoComplete="new-password"
                          value={password}
                          onChange={(event) =>
                            setPassword(
                              event.target.value
                            )
                          }
                          placeholder="Enter new password"
                          disabled={loading}
                          required
                          minLength={8}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (value) => !value
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-700"
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

                      <p className="mt-2 text-xs text-slate-400">
                        Minimum 8 characters.
                      </p>

                    </div>

                    {/* ==================================================
                        CONFIRM PASSWORD
                    ================================================== */}

                    <div>

                      <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        Confirm New Password
                      </label>

                      <div className="relative">

                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(
                              event.target.value
                            )
                          }
                          placeholder="Confirm new password"
                          disabled={loading}
                          required
                          minLength={8}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              (value) => !value
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-700"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* ==================================================
                        ERROR
                    ================================================== */}

                    {error && (
                      <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700"
                      >
                        {error}
                      </div>
                    )}

                    {/* ==================================================
                        SUBMIT BUTTON
                    ================================================== */}

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-800 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Updating Password...
                        </>
                      ) : (
                        <>
                          <KeyRound size={18} />
                          Set New Password
                        </>
                      )}
                    </button>

                  </form>

                  <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4">

                    <div className="flex items-start gap-3">

                      <ShieldCheck
                        size={19}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <p className="text-xs leading-5 text-slate-500">
                        For your security, reset links
                        expire automatically and can
                        only be used once.
                      </p>

                    </div>

                  </div>
                </>
              )}

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