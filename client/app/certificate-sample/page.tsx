import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Certificate Sample | ICU Learning Portal",
  description:
    "Preview the ICU Learning Portal course completion certificate and learn how certificate eligibility works.",
};

export default function CertificateSamplePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
              <Award size={15} aria-hidden="true" />
              Certificate Preview
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              ICU Learning Portal Certificate
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Explore the certificate design and understand the completion
              pathway for eligible ICU Learning Portal courses.
            </p>
          </div>

          {/* Certificate Preview */}
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl sm:p-6">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 sm:p-6">
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-blue-100/60 blur-3xl"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-cyan-100/70 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative mx-auto max-w-5xl">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <Image
                    src="/images/certificate-preview.svg"
                    alt="ICU Learning Portal certificate design preview"
                    width={1200}
                    height={800}
                    className="h-auto w-full"
                    priority
                  />
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-center">
                  <ShieldCheck
                    size={18}
                    className="shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />

                  <p className="text-sm font-semibold text-slate-600">
                    Design preview only — this image is not an issued
                    certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Information */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <InfoCard
              icon={<CheckCircle2 size={21} />}
              title="Complete the lessons"
              text="Finish the required lessons and learning activities included in the eligible course."
            />

            <InfoCard
              icon={<ShieldCheck size={21} />}
              title="Meet course requirements"
              text="Complete the required assessments and any other completion conditions defined for the course."
            />

            <InfoCard
              icon={<Award size={21} />}
              title="Certificate eligibility"
              text="After the required conditions are satisfied, an eligible learner can receive a course completion certificate."
            />
          </div>

          {/* Important Notice */}
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
                <ShieldCheck size={21} aria-hidden="true" />
              </div>

              <div>
                <h2 className="text-base font-black text-amber-950">
                  Certificate preview notice
                </h2>

                <p className="mt-2 text-sm leading-7 text-amber-900/80">
                  This page displays a sample certificate design for
                  demonstration purposes. It does not represent a certificate
                  issued to a specific learner and should not be used as proof
                  of course completion.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Explore Courses
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <h2 className="mt-5 text-lg font-black text-slate-950">{title}</h2>

      <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
    </article>
  );
}