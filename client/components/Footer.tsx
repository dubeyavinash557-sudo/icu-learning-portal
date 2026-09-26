import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const whatsappNumber = "918177084179";

const whatsappMessage = encodeURIComponent(
  "Hello ICU Learning Portal Support,\n\nI need help with:\n\nIssue:\n\nCourse/Page:\n\nRegistered Email:\n\nThank you."
);

const whatsappUrl =
  `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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
    label: "About Us",
    href: "/about",
  },
  {
    label: "FAQ",
    href: "/faq",
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

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
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
                  Structured courses, practical lessons, assessments,
                  protected resources and completion pathways for serious
                  learners.
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

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
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
              A structured learning platform for nursing students, ICU nurses
              and healthcare learners building knowledge in critical care.
            </p>

            <div className="mt-6 space-y-3">
              <TrustPoint
                icon={<ShieldCheck size={17} />}
                text="Secure payment flow via Razorpay"
              />

              <TrustPoint
                icon={<BookOpen size={17} />}
                text="Hindi + English learning support"
              />

              <TrustPoint
                icon={<Award size={17} />}
                text="Eligible course completion certificates"
              />
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-2.5 text-xs font-black text-emerald-300 transition hover:bg-emerald-400/10"
            >
              <MessageCircle size={16} />
              WhatsApp Support
            </a>
          </div>

          <FooterColumn title="Courses">
            {courseLinks.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Learning">
            {learningLinks.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <div>
            <FooterColumn title="Company">
              {companyLinks.map((link) => (
                <FooterLink
                  key={link.href}
                  href={link.href}
                >
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                Support
              </p>

              <div className="space-y-3">
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
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

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

function TrustPoint({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-400">
      <span className="text-cyan-400">
        {icon}
      </span>

      {text}
    </div>
  );
}

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