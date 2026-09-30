"use client";

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import { FormEvent, useState } from "react";

const TOPICS = [
  "Course Support",
  "Account Support",
  "Payment Support",
  "Technical Support",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      topic: String(formData.get("topic") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to send your enquiry."
        );
      }

      setStatus("success");
      setMessage(
        "Your enquiry has been sent successfully. Our support team will review it and respond to you by email."
      );

      form.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your enquiry. Please email support@iculearningportal.com."
      );
    }
  }

  return (
    <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
          Contact Form
        </p>

        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Send us an enquiry
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Tell us what you need help with. Please do not include passwords,
          OTPs, card numbers or other sensitive authentication information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-5"
        noValidate
      >
        {/* Honeypot field */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label htmlFor="website">
            Website
          </label>

          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-bold text-slate-900"
            >
              Your name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={80}
              autoComplete="name"
              placeholder="Enter your name"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-bold text-slate-900"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={160}
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="topic"
            className="text-sm font-bold text-slate-900"
          >
            Enquiry type
          </label>

          <select
            id="topic"
            name="topic"
            required
            defaultValue=""
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="" disabled>
              Select an enquiry type
            </option>

            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="text-sm font-bold text-slate-900"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={6}
            placeholder="Describe your question or problem..."
            className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {status === "success" && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
          >
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{message}</span>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Enquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
}