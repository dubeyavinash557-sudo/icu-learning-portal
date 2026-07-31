"use client";

import {
  Award,
  CalendarDays,
  Download,
  CheckCircle2,
} from "lucide-react";

type Props = {
  certificate: {
    id: string;
    certificateNo: string;
    issuedAt: Date;
    course: {
      title: string;
    };
  } | null;
};

export default function RecentCertificate({
  certificate,
}: Props) {
  if (!certificate) {
    return (
      <section className="rounded-3xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900">
          Latest Certificate
        </h2>

        <p className="mt-3 text-slate-500">
          You haven't earned any certificates yet.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Latest Certificate
        </h2>

        <p className="mt-2 text-slate-500">
          Your most recently earned ICU certification.
        </p>

      </div>

      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-cyan-50 p-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex gap-5">

            <div className="rounded-2xl bg-emerald-600 p-4 text-white shadow-lg">
              <Award size={38} />
            </div>

            <div>

              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                <CheckCircle2 size={16} />
                Certified
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {certificate.course.title}
              </h3>

              <p className="mt-2 text-slate-600">
                Certificate No: {certificate.certificateNo}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={16} />
                Issued on:{" "}
                {new Date(certificate.issuedAt).toLocaleDateString("en-IN")}
              </div>

            </div>

          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            <Download size={18} />
            Download PDF
          </button>

        </div>

      </div>

    </section>
  );
}