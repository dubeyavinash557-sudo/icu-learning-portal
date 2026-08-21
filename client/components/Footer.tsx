import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const courseLinks = [
  {
    label: "ICU Nursing",
    href: "/courses/icu-nursing",
  },
  {
    label: "Mechanical Ventilation",
    href: "/courses/ventilator",
  },
  {
    label: "ECG Interpretation",
    href: "/courses/ecg",
  },
  {
    label: "ABG Analysis",
    href: "/courses/abg",
  },
];

const learningLinks = [
  {
    label: "All Courses",
    href: "/courses",
  },
  {
    label: "Study Notes",
    href: "/notes",
  },
  {
    label: "Quizzes",
    href: "/dashboard/quiz",
  },
  {
    label: "Certificates",
    href: "/dashboard/certificates",
  },
];

const companyLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Create Account",
    href: "/register",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
        {/* Learning CTA */}
        <div className="mb-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/15 via-cyan-500/10 to-indigo-600/15 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20">
                <GraduationCap size={24} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                  Professional Critical Care Learning
                </p>

                <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
                  Build stronger ICU & critical-care skills.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Learn through structured courses, practical lessons,
                  clinical resources and assessments.
                </p>
              </div>
            </div>

            <Link
              href="/courses"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
            >
              Explore Courses

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/30">
                <Stethoscope
                  size={25}
                  strokeWidth={2.2}
                />
              </span>

              <span>
                <span className="block text-xl font-black tracking-tight text-white">
                  ICU{" "}
                  <span className="text-blue-400">
                    Learning Portal
                  </span>
                </span>

                <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Critical Care Education
                </span>
              </span>
            </Link>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              A structured learning platform for healthcare
              professionals building knowledge in ICU nursing,
              mechanical ventilation, ECG, ABG and critical care.
            </p>

            {/* Trust Points */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <ShieldCheck
                  size={17}
                  className="shrink-0 text-emerald-400"
                />

                Structured professional learning
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <BookOpen
                  size={17}
                  className="shrink-0 text-cyan-400"
                />

                Practical ICU learning resources
              </div>
            </div>

            {/* Platform Status */}
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3.5 py-2 text-xs font-bold text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Professional Learning Platform
            </div>
          </div>

          {/* Courses */}
          <FooterColumn title="Courses">
            {courseLinks.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Learning */}
          <FooterColumn title="Learning">
            {learningLinks.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Company + Contact */}
          <div>
            <FooterColumn title="Company">
              {companyLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                >
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>

            {/* Contact */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                Contact
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:dubeyavinash557@gmail.com"
                  className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-white"
                >
                  <Mail
                    size={16}
                    className="mt-0.5 shrink-0 text-blue-400"
                  />

                  <span className="break-all">
                    dubeyavinash557@gmail.com
                  </span>
                </a>

                <a
                  href="tel:+918177084179"
                  className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-white"
                >
                  <Phone
                    size={16}
                    className="shrink-0 text-blue-400"
                  />

                  <span>+91 8177084179</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <MapPin
                    size={16}
                    className="shrink-0 text-blue-400"
                  />

                  <span>Ghaziabad, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500">
            © {new Date().getFullYear()} ICU Learning Portal.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/"
              className="text-slate-500 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
              className="text-slate-500 transition hover:text-white"
            >
              Terms of Use
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-semibold text-blue-400 transition hover:text-cyan-300"
            >
              Contact Support

              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.14em] text-white">
        {title}
      </h3>

      <div className="mt-5 space-y-3">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   FOOTER LINK
========================================================= */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
    >
      <ChevronRight
        size={14}
        className="text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-blue-400"
      />

      {children}
    </Link>
  );
}