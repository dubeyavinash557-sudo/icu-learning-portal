import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Certificate Sample | ICU Learning Portal",
  description:
    "Preview the ICU Learning Portal course completion certificate pathway and learn how certificate eligibility works.",
};

export default function CertificateSamplePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
              <Award size={15} />
              Certificate Preview
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              See the Completion Certificate Pathway
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Eligible ICU Learning Portal courses can provide a completion
              certificate after the learner satisfies the required course
              completion conditions.
            </p>
          </div>

          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl sm:p-6">
            <div className="relative overflow-hidden border-[10px] border-slate-950 bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-10 sm:border-[14px] sm:px-14 sm:py-14">
              <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-blue-100/60 blur-2xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-cyan-100/70 blur-2xl" />

              <div className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-700 text-blue-700">
                  <Award size={31} />
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.3em] text-blue-700">
                  ICU Learning Portal
                </p>

                <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-5xl">
                  Certificate of Completion
                </h2>

                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  This is a design preview — not an issued certificate
                </p>

                <div className="mx-auto mt-10 max-w-2xl border-y border-slate-200 py-8">
                  <p className="text-sm text-slate-500">
                    This certifies that
                  </p>

                  <p className="mt-3 text-2xl font-black text-slate-950 sm:text-4xl">
                    Student Name
                  </p>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                    has successfully completed the required learning pathway
                    for
                  </p>

                  <p className="mt-3 text-xl font-black text-blue-700 sm:text-2xl">
                    ICU Nursing & Critical Care Program
                  </p>
                </div>

                <div className="mt-8 grid gap-5 text-left sm:grid-cols-3">
                  <CertificateMeta
                    label="Certificate No."
                    value="ICULP-XXXX-XXXX"
                  />

                  <CertificateMeta
                    label="Issued"
                    value="Completion Date"
                  />

                  <CertificateMeta
                    label="Verification"
                    value="Online LMS Record"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <InfoCard
              icon={<CheckCircle2 size={21} />}
              title="Complete the lessons"
              text="Finish the required lessons in the eligible course."
            />

            <InfoCard
              icon={<ShieldCheck size={21} />}
              title="Meet course requirements"
              text="Complete any required assessments or completion conditions."
            />

            <InfoCard
              icon={<Award size={21} />}
              title="Certificate eligibility"
              text="Once eligible, the LMS can issue the course completion certificate."
            />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              Explore Certificate-Eligible Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function CertificateMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-black text-slate-800">
        {value}
      </p>
    </div>
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
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <h2 className="mt-5 text-lg font-black text-slate-950">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-7 text-slate-600">
        {text}
      </p>
    </article>
  );
}