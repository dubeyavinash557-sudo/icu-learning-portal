"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submitResetRequest() {
    if (loading) {
      return;
    }

    setError("");

    const value = identifier.trim();

    if (!value) {
      setError(
        "Please enter your email address or mobile number."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: value,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setSuccess(false);

        setError(
          data?.message ||
            "Unable to process your request. Please try again."
        );

        return;
      }

      setSuccess(true);
    } catch (requestError) {
      console.error(
        "FORGOT PASSWORD REQUEST ERROR:",
        requestError
      );

      setSuccess(false);

      setError(
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    void submitResetRequest();
  }

  function handleSendAgain() {
    setSuccess(false);
    setError("");

    setTimeout(() => {
      void submitResetRequest();
    }, 0);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl lg:grid-cols-2">

          {/* ==================================================
              LEFT — BRAND / INFORMATION
          ================================================== */}

          <section className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative">

              {/* Brand */}

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

              {/* Main Content */}

              <div className="mt-16 max-w-lg">

                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Account Recovery
                </p>

                <h1 className="mt-4 text-4xl font-black leading-tight xl:text-5xl">
                  Securely recover your account.
                </h1>

                <p className="mt-6 text-base leading-8 text-blue-100">
                  Forgot your password? No problem.
                  Enter the email address or mobile number
                  registered with your ICU Learning Portal
                  account and we will help you reset it
                  securely.
                </p>

              </div>

              {/* Recovery Features */}

              <div className="mt-10 space-y-4">

                <RecoveryFeature
                  icon={<ShieldCheck size={18} />}
                  title="Secure recovery"
                  description="Reset links are protected with secure, time-limited tokens."
                />

                <RecoveryFeature
                  icon={<Mail size={18} />}
                  title="Email verification"
                  description="The reset link is sent to your registered email address."
                />

                <RecoveryFeature
                  icon={<KeyRound size={18} />}
                  title="Create a new password"
                  description="Your existing password remains protected and is never emailed."
                />

              </div>

            </div>

            <div className="relative mt-12 border-t border-white/15 pt-6 text-xs text-blue-100">
              ICU Learning Portal • Secure Student Account Recovery
            </div>

          </section>

          {/* ==================================================
              RIGHT — FORM
          ================================================== */}

          <section className="bg-white p-6 sm:p-10 lg:p-12 xl:p-14">

            <div className="mx-auto max-w-md">

              {/* Back */}

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

              {/* Heading */}

              <div className="mt-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <KeyRound size={27} />
                </div>

                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                  Password Recovery
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Forgot your password?
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Enter the email address or mobile number
                  connected to your account.
                </p>

              </div>

              {/* ==================================================
                  SUCCESS STATE
              ================================================== */}

              {success ? (
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 text-emerald-600">
                      <CheckCircle2 size={23} />
                    </div>

                    <div>

                      <h3 className="font-black text-emerald-900">
                        Reset link sent successfully
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-emerald-800">
                        If an account exists for the
                        information you entered, a password
                        reset link has been sent to the
                        registered email address.
                      </p>

                      <p className="mt-3 text-xs leading-5 text-emerald-700">
                        The reset link is time-limited. Please
                        check your inbox and spam or junk folder.
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    <button
                      type="button"
                      onClick={handleSendAgain}
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-3 text-sm font-black text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Mail size={17} />

                      {loading
                        ? "Sending..."
                        : "Send Again"}
                    </button>

                    <Link
                      href="/login"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
                    >
                      Return to Login
                    </Link>

                  </div>

                </div>
              ) : (

                /* ==================================================
                    RESET REQUEST FORM
                ================================================== */

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                  noValidate
                >

                  <div>

                    <label
                      htmlFor="identifier"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Email or Mobile Number
                    </label>

                    <div className="relative">

                      <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-slate-400">
                        <Mail size={17} />
                      </div>

                      <input
                        id="identifier"
                        name="identifier"
                        type="text"
                        inputMode="email"
                        autoComplete="username"
                        value={identifier}
                        onChange={(event) => {
                          setIdentifier(event.target.value);

                          if (error) {
                            setError("");
                          }
                        }}
                        placeholder="Email address or mobile number"
                        disabled={loading}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                      />

                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Example: your registered email or
                      mobile number.
                    </p>

                  </div>

                  {/* Error */}

                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  {/* ==================================================
                      IMPORTANT:
                      type="button" prevents browser GET navigation.
                      The click explicitly calls our POST function.
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() => {
                      void submitResetRequest();
                    }}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-800 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                        Sending Reset Link...
                      </>
                    ) : (
                      <>
                        <KeyRound size={18} />

                        Send Reset Link
                      </>
                    )}

                  </button>

                </form>
              )}

              {/* Security Notice */}

              <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    For your security, we never display
                    whether a particular email or mobile
                    number is registered with an account.
                  </p>

                </div>

              </div>

              {/* Login */}

              <p className="mt-8 text-center text-sm text-slate-500">

                Remember your password?{" "}

                <Link
                  href="/login"
                  className="font-black text-blue-700 hover:text-blue-800"
                >
                  Login here
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
 * RECOVERY FEATURE
 * ==========================================================
 */

function RecoveryFeature({
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