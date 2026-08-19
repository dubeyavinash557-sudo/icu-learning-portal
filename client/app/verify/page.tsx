import Link from "next/link";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{
    certificateNo?: string;
  }>;
};

function formatIssuedDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function VerifyCertificatePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const certificateNo =
    typeof params.certificateNo === "string"
      ? params.certificateNo.trim()
      : "";

  let certificate = null;

  if (certificateNo) {
    certificate =
      await prisma.certificate.findUnique({
        where: {
          certificateNo,
        },
        select: {
          certificateNo: true,
          issuedAt: true,
          user: {
            select: {
              fullName: true,
            },
          },
          course: {
            select: {
              title: true,
              level: true,
              language: true,
            },
          },
        },
      });
  }

  const searched = Boolean(certificateNo);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 px-6 py-20 text-white">
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-xl ring-1 ring-white/20 backdrop-blur">
              <ShieldCheck size={34} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
              ICU Learning Portal
            </p>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Certificate Verification
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Verify the authenticity of an ICU Learning Portal
              certificate using its unique certificate number.
            </p>
          </div>
        </section>

        {/* Main */}
        <section className="px-6 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            {/* Search Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                  <Search size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Verify Certificate
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Enter the certificate number exactly as shown on
                    the certificate.
                  </p>
                </div>
              </div>

              <form
                method="GET"
                action="/verify"
                className="mt-7"
              >
                <label
                  htmlFor="certificateNo"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Certificate Number
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="certificateNo"
                    name="certificateNo"
                    type="text"
                    defaultValue={certificateNo}
                    placeholder="Example: ICU-1787065915509-94ykke"
                    autoComplete="off"
                    required
                    className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:from-cyan-700 hover:to-blue-800"
                  >
                    <Search size={18} />
                    Verify Certificate
                  </button>
                </div>
              </form>
            </div>

            {/* Verification Result */}
            {searched && certificate && (
              <section className="mt-8 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl">
                <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-cyan-50 px-6 py-7 sm:px-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                        <CheckCircle2 size={30} />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                          Verification Result
                        </p>

                        <h2 className="mt-1 text-2xl font-extrabold text-emerald-900">
                          Certificate Verified
                        </h2>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-100 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-emerald-700 sm:self-auto">
                      <ShieldCheck size={15} />
                      Valid Certificate
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <VerificationDetail
                      label="Student Name"
                      value={certificate.user.fullName}
                    />

                    <VerificationDetail
                      label="Course"
                      value={certificate.course.title}
                    />

                    <VerificationDetail
                      label="Certificate Number"
                      value={certificate.certificateNo}
                    />

                    <VerificationDetail
                      label="Issue Date"
                      value={formatIssuedDate(
                        certificate.issuedAt
                      )}
                    />

                    <VerificationDetail
                      label="Course Level"
                      value={certificate.course.level}
                    />

                    <VerificationDetail
                      label="Language"
                      value={certificate.course.language}
                    />
                  </div>

                  <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />

                      <div>
                        <p className="font-bold text-emerald-900">
                          Authentic Certificate
                        </p>

                        <p className="mt-1 text-sm leading-6 text-emerald-800">
                          This certificate number exists in the ICU
                          Learning Portal certificate registry and is
                          associated with the course completion record
                          shown above.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/verify"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      <Search size={17} />
                      Verify Another Certificate
                    </Link>

                    <Link
                      href="/courses"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
                    >
                      Explore Courses
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Not Found */}
            {searched && !certificate && (
              <section className="mt-8 overflow-hidden rounded-3xl border border-red-200 bg-white shadow-xl">
                <div className="p-7 text-center sm:p-10">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <XCircle size={34} />
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                    Verification Result
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                    Certificate Not Found
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    We could not find a certificate matching the
                    certificate number you entered. Please check the
                    number and try again.
                  </p>

                  <div className="mx-auto mt-6 max-w-md rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                      Searched Certificate Number
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-red-800">
                      {certificateNo}
                    </p>
                  </div>

                  <Link
                    href="/verify"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
                  >
                    <Search size={17} />
                    Try Again
                  </Link>
                </div>
              </section>
            )}

            {/* Information */}
            <section className="mt-8 grid gap-6 md:grid-cols-3">
              <InfoCard
                icon={<ShieldCheck size={21} />}
                title="Secure Verification"
                description="Certificate records are verified directly against the official portal database."
              />

              <InfoCard
                icon={<Award size={21} />}
                title="Unique Certificate ID"
                description="Every issued certificate has a unique certificate number."
              />

              <InfoCard
                icon={<CheckCircle2 size={21} />}
                title="Authenticity Check"
                description="Use the verification result to confirm certificate authenticity."
              />
            </section>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-cyan-600"
              >
                <ArrowLeft size={17} />
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function VerificationDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}