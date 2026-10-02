import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

/* =========================================================
   SOCIAL ICONS
   Inline SVGs are used so this works with the current
   lucide-react version without requiring package changes.
========================================================= */

function InstagramIcon({
  size = 19,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function YouTubeIcon({
  size = 19,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21.6 7.2a2.8 2.8 0 0 0-1.97-1.98C17.9 4.75 12 4.75 12 4.75s-5.9 0-7.63.47A2.8 2.8 0 0 0 2.4 7.2C1.93 8.93 1.93 12 1.93 12s0 3.07.47 4.8a2.8 2.8 0 0 0 1.97 1.98c1.73.47 7.63.47 7.63.47s5.9 0 7.63-.47a2.8 2.8 0 0 0 1.97-1.98c.47-1.73.47-4.8.47-4.8s0-3.07-.47-4.8Z"
        fill="currentColor"
      />

      <path
        d="m10 15.5 5-3.5-5-3.5v7Z"
        fill="rgb(2 6 23)"
      />
    </svg>
  );
}

/* =========================================================
   LINKS
========================================================= */

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/iculearningportal/",
    description: "Follow us for ICU learning updates",
    icon: InstagramIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ICULearningPortal",
    description: "Watch nursing & critical-care lessons",
    icon: YouTubeIcon,
  },
];

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
  {
    label: "Certificate Sample",
    href: "/certificate-sample",
  },
];

const companyLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "FAQ",
    href: "/faq",
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

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms",
  },
  {
    label: "Refund Policy",
    href: "/refund",
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8 lg:py-20">

        {/* =================================================
            LEARNING CTA
        ================================================= */}
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

        {/* =================================================
            FOOTER COLUMNS
        ================================================= */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* =================================================
              BRAND
          ================================================= */}
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

            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}
            <div className="mt-8 border-t border-white/10 pt-6">

              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                Follow ICU Learning Portal
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">

                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ICU Learning Portal on ${social.label}`}
                      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-blue-400/30 hover:bg-white/[0.06]"
                    >
                      <div className="flex items-center gap-3">

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/10 transition group-hover:bg-blue-500/20">
                          <Icon size={19} />
                        </span>

                        <span className="min-w-0">

                          <span className="block text-sm font-black text-white">
                            {social.label}
                          </span>

                          <span className="mt-0.5 block text-[10px] leading-4 text-slate-500">
                            {social.description}
                          </span>

                        </span>

                      </div>
                    </a>
                  );
                })}

              </div>
            </div>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-400/5 px-4 py-2.5 text-xs font-black text-blue-200 transition hover:bg-blue-400/10"
            >
              <span
                aria-hidden="true"
                className="text-base"
              >
                ✉️
              </span>

              Contact Support
            </Link>

          </div>

          {/* =================================================
              COURSES
          ================================================= */}
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

          {/* =================================================
              LEARNING
          ================================================= */}
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

          {/* =================================================
              COMPANY + CONTACT
          ================================================= */}
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
  href="mailto:support@iculearningportal.com"
  className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-white"
>
  <Mail
    size={16}
    className="mt-0.5 shrink-0 text-blue-400"
  />

  <span className="break-all">
    support@iculearningportal.com
  </span>
</a>

                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <MapPin
                    size={16}
                    className="shrink-0 text-blue-400"
                  />

                  <span>
                    Ghaziabad, India
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* =================================================
            DIVIDER
        ================================================= */}
        <div className="my-10 h-px bg-white/10" />

        {/* =================================================
            BOTTOM FOOTER
        ================================================= */}
        <div className="flex flex-col gap-5 text-sm md:flex-row md:items-start md:justify-between">

          <div>

            <p className="text-slate-500">
              © {new Date().getFullYear()} ICU Learning Portal.
              All rights reserved.
            </p>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-600">
              Educational content is for learning and revision and does not
              replace supervised clinical training, institutional protocols or
              professional medical judgement.
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">

            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-500 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}

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