import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-8 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to ICU Learning Portal
          </Link>

          <div className="mt-8 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cyan-300 ring-1 ring-white/10">
              <FileText size={23} />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                {eyebrow}
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                {title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-8 lg:py-16">
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-900">
          <ShieldCheck
            className="mt-0.5 shrink-0 text-blue-700"
            size={19}
          />

          <p>
            This page explains the website&apos;s current operating rules in
            plain language. If a specific purchase, invoice, checkout screen
            or applicable law provides a different mandatory requirement,
            that requirement will apply to the extent required by law.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-slate-700">
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <h2 className="text-xl font-black text-slate-950 sm:text-2xl">
                    {section.title}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-sm leading-7 text-slate-600 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets &&
                    section.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 sm:text-base">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3"
                          >
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />

                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white sm:p-8">
          <h2 className="text-xl font-black">
            Questions about this policy?
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-300">
            Contact ICU Learning Portal support before making a purchase if
            you need clarification about access, refunds, certificates or
            account use.
          </p>

          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}