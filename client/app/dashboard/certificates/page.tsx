import Link from "next/link";
import {
  Award,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  GraduationCap,
  Medal,
  ShieldCheck,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function CertificatesPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      certificates: {
        include: {
          course: true,
        },
        orderBy: {
          issuedAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const certificates = user.certificates;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {/* Back */}
            <div className="mb-6">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
              >
                <ArrowLeft size={17} />
                Back to Dashboard
              </Link>
            </div>

            {/* Hero */}
            <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-6 text-white shadow-xl sm:p-8 lg:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                      <ShieldCheck size={17} />
                      Verified Learning Achievement
                    </div>

                    <h1 className="text-3xl font-bold sm:text-4xl">
                      My Certificates
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                      View and download your professional certificates earned
                      through ICU Learning Portal courses.
                    </p>
                  </div>

                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/15 shadow-2xl backdrop-blur-sm">
                    <Award size={48} />
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <CertificateStat
                icon={<Award size={22} />}
                label="Certificates Earned"
                value={String(certificates.length)}
              />

              <CertificateStat
                icon={<GraduationCap size={22} />}
                label="Courses Certified"
                value={String(certificates.length)}
              />

              <CertificateStat
                icon={<CheckCircle2 size={22} />}
                label="Verification Status"
                value={certificates.length > 0 ? "Verified" : "Pending"}
              />
            </section>

            {/* Certificates */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                    <Medal size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Earned Certificates
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Your course completion achievements
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {certificates.length === 0 ? (
                  <EmptyCertificates />
                ) : (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {certificates.map((certificate) => (
                      <CertificateCard
                        key={certificate.id}
                        certificate={{
                          id: certificate.id,
                          certificateNo: certificate.certificateNo,
                          issuedAt: certificate.issuedAt,
                          courseTitle: certificate.course.title,
                          courseLevel: certificate.course.level,
                          language: certificate.course.language,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Information */}
            <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-500/20 dark:bg-blue-500/10">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    <ShieldCheck size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-900 dark:text-blue-200">
                      Certificate Security
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-blue-800 dark:text-blue-300">
                      Each certificate is linked to your authenticated student
                      account. Only the certificate owner can download the
                      certificate PDF.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <GraduationCap size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-emerald-900 dark:text-emerald-200">
                      Continue Learning
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-emerald-800 dark:text-emerald-300">
                      Complete more ICU courses and assessments to earn
                      additional professional certificates.
                    </p>

                    <Link
                      href="/courses"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline dark:text-emerald-300"
                    >
                      Explore Courses
                      <ExternalLink size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/*
 * ---------------------------------------------------------
 * Certificate Card
 * ---------------------------------------------------------
 */

function CertificateCard({
  certificate,
}: {
  certificate: {
    id: string;
    certificateNo: string;
    issuedAt: Date;
    courseTitle: string;
    courseLevel: string;
    language: string;
  };
}) {
  const issuedDate = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(certificate.issuedAt);

  return (
    <article className="group overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-cyan-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-amber-500/20 dark:from-amber-500/5 dark:via-slate-900 dark:to-cyan-500/5">
      {/* Certificate Header */}
      <div className="border-b border-amber-200/70 p-6 dark:border-amber-500/10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-sm dark:bg-amber-500/10 dark:text-amber-400">
              <Award size={28} />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                <CheckCircle2 size={14} />
                Certified
              </span>

              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ICU Learning Portal
              </p>
            </div>
          </div>

          <Medal
            size={26}
            className="text-amber-500"
          />
        </div>
      </div>

      {/* Certificate Body */}
      <div className="p-6">
        <h3 className="text-xl font-bold leading-snug text-slate-900 dark:text-white">
          {certificate.courseTitle}
        </h3>

        <div className="mt-4 space-y-3">
          <CertificateInfo
            icon={<CalendarDays size={16} />}
            label="Issued"
            value={issuedDate}
          />

          <CertificateInfo
            icon={<ShieldCheck size={16} />}
            label="Certificate No."
            value={certificate.certificateNo}
          />

          <CertificateInfo
            icon={<GraduationCap size={16} />}
            label="Course"
            value={`${certificate.courseLevel} • ${certificate.language}`}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-3 border-t border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 sm:grid-cols-2">
        <a
          href={`/api/certificates/latest/${certificate.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700"
        >
          <Download size={17} />
          Download PDF
        </a>

        <Link
          href={`/api/certificates/latest/${certificate.id}`}
          target="_blank"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <ExternalLink size={17} />
          Open Certificate
        </Link>
      </div>
    </article>
  );
}

/*
 * ---------------------------------------------------------
 * Empty State
 * ---------------------------------------------------------
 */

function EmptyCertificates() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-800/50">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
        <Award size={38} />
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
        No Certificates Yet
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        Complete your enrolled courses and required assessments to earn your
        professional ICU Learning certificate.
      </p>

      <Link
        href="/courses"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
      >
        Browse Courses
        <ExternalLink size={17} />
      </Link>
    </div>
  );
}

/*
 * ---------------------------------------------------------
 * Stats
 * ---------------------------------------------------------
 */

function CertificateStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

/*
 * ---------------------------------------------------------
 * Certificate Info
 * ---------------------------------------------------------
 */

function CertificateInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 break-words text-sm font-bold text-slate-800 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}