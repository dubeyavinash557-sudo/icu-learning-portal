import Link from "next/link";
import {
  Award,
  BadgeCheck,
  Download,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Certificates() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background decoration */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-yellow-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-700">
            <Sparkles size={16} />
            Professional Certification
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Learn. Complete. Get Certified.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Complete your professional course and earn a certificate that
            recognizes your learning achievement.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          {/* Certificate Preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-blue-100 via-white to-yellow-100 blur-xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
              <div className="rounded-2xl border-4 border-double border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-white p-7 md:p-10">
                {/* Certificate top */}
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg">
                    <Award size={34} />
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-blue-700">
                    ICU Learning Portal
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                    Certificate of Completion
                  </h3>

                  <p className="mt-5 text-sm text-slate-500">
                    This certificate is proudly presented to
                  </p>

                  <p className="mt-3 text-2xl font-bold text-slate-800">
                    Student Name
                  </p>

                  <div className="mx-auto mt-3 h-px max-w-xs bg-slate-300" />

                  <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-slate-500">
                    For successfully completing the
                  </p>

                  <p className="mt-2 text-xl font-extrabold text-blue-700">
                    ICU Critical Care Professional Course
                  </p>
                </div>

                {/* Certificate footer */}
                <div className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-200 pt-6 text-center">
                  <div>
                    <p className="text-xs text-slate-400">
                      Certificate ID
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      ICU-2026-00001
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Status
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-green-600">
                      <BadgeCheck size={16} />
                      Verified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              <ShieldCheck size={17} />
              Verified Achievement
            </div>

            <h3 className="mt-5 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Showcase your critical care learning achievement
            </h3>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Successfully complete your course, pass the required assessment
              and receive a professional completion certificate.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Award size={22} />
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">
                    Course Completion Certificate
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Earn recognition after successfully completing the course.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <BadgeCheck size={22} />
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">
                    Verified Certificate
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Each certificate can have a unique verification ID.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                  <Download size={22} />
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">
                    Digital Certificate
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Download and keep your achievement digitally.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/register"
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              Start Learning
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="mt-14 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:grid-cols-3">
          <div className="flex items-center justify-center gap-3 text-center">
            <Award className="text-blue-700" size={22} />
            <span className="font-bold text-slate-700">
              Professional Achievement
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 text-center">
            <ShieldCheck className="text-green-600" size={22} />
            <span className="font-bold text-slate-700">
              Verification Ready
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 text-center">
            <Download className="text-yellow-600" size={22} />
            <span className="font-bold text-slate-700">
              Digital Certificate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}