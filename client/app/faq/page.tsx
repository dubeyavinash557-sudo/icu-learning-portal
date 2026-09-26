import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ | ICU Learning Portal",
  description:
    "Frequently asked questions about ICU Learning Portal courses, payments, access, certificates, refunds and mobile learning.",
};

const faqs = [
  {
    question: "Who is ICU Learning Portal for?",
    answer:
      "The platform is designed for nursing students, ICU nurses, healthcare learners and professionals who want structured ICU and critical-care education, revision and assessment practice.",
  },
  {
    question: "Are there free courses or demos?",
    answer:
      "Yes. The catalogue can include free demo courses so you can understand the learning format before purchasing a premium program. Free and premium access are shown separately on the course catalogue.",
  },
  {
    question: "How does a premium course purchase work?",
    answer:
      "Create or log in to your learner account, open the premium course, choose the purchase action and complete the Razorpay checkout. The LMS verifies the transaction before protected course access is enabled.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "The current payment flow uses Razorpay and can present supported Indian payment methods such as UPI, cards and net banking, subject to the options available in the Razorpay checkout.",
  },
  {
    question: "When will my course unlock after payment?",
    answer:
      "After a successful payment is verified, the LMS creates or confirms the course enrollment. If money was deducted but access is not visible, contact support with your registered email and payment reference rather than paying again.",
  },
  {
    question: "Can I learn on a mobile phone?",
    answer:
      "The website is designed as a responsive web LMS, so you can use supported modern browsers on mobile, tablet or desktop. A dedicated native mobile app is not required to use the current web platform.",
  },
  {
    question: "How does the certificate work?",
    answer:
      "Eligible courses can include a completion certificate pathway. You must satisfy the course's required lessons, assessments and completion conditions before the certificate becomes available.",
  },
  {
    question: "Can I download course notes?",
    answer:
      "Where a course includes protected notes or downloadable resources, access is limited to authenticated learners who are authorised for that course. Availability depends on the individual course.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "Use the Forgot Password flow on the login page. If the reset email does not arrive, check your spam folder and contact support if the problem continues.",
  },
  {
    question: "How do I request a refund?",
    answer:
      "Open the Refund Policy and Contact pages. Submit the request using your registered email, course name and payment reference. The current launch policy asks learners to submit requests within 7 calendar days, subject to eligibility and applicable law.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-8 lg:py-20">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
              Help Centre
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Frequently Asked Questions
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Clear answers about courses, premium access, payments,
              certificates, refunds and using the ICU Learning Portal.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-8 lg:py-16">
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 font-black text-slate-950 sm:p-6">
                  <span>{faq.question}</span>

                  <ChevronDown
                    className="shrink-0 text-blue-600 transition-transform group-open:rotate-180"
                    size={20}
                  />
                </summary>

                <div className="border-t border-slate-100 px-5 pb-6 pt-5 text-sm leading-7 text-slate-600 sm:px-6">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm">
              <MessageCircle
                className="text-emerald-600"
                size={25}
              />

              <h2 className="mt-4 text-xl font-black text-slate-950">
                Still need help?
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Send your course, account or payment question to support with
                enough detail for us to investigate it.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                Contact Support
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
              <ShieldCheck
                className="text-blue-700"
                size={25}
              />

              <h2 className="mt-4 text-xl font-black text-slate-950">
                Before you pay
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-700">
                Review the course curriculum, price, access details,
                certificate eligibility and refund policy before completing
                checkout.
              </p>

              <Link
                href="/courses"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
              >
                Browse Courses
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}