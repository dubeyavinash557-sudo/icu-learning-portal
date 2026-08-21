import Link from "next/link";
import {
  ArrowRight,
  Check,
  Crown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    subtitle: "Start your learning journey",
    price: "₹0",
    period: "forever",
    description:
      "Get started with selected ICU learning resources and explore the platform before upgrading to a complete professional learning plan.",
    popular: false,
    icon: Sparkles,
    button: "Get Started",
    href: "/register",
    features: [
      "Selected ICU learning resources",
      "Free learning materials",
      "Basic course previews",
      "Selected PDF resources",
      "Student account",
    ],
  },

  {
    name: "Premium",
    subtitle: "For serious ICU learners",
    price: "₹4,999",
    period: "/ year",
    description:
      "Access the professional ICU course library with structured learning, clinical resources, assessments, progress tracking and certificates.",
    popular: true,
    icon: Crown,
    button: "Choose Premium",
    href: "/register?plan=premium",
    features: [
      "Full Premium ICU course library",
      "ICU Nursing professional courses",
      "Mechanical Ventilation learning",
      "ECG & ABG masterclasses",
      "ICU emergency & critical care content",
      "Premium PDF notes and resources",
      "Course assessments and quizzes",
      "Learning progress tracking",
      "Completion certificates",
    ],
  },

  {
    name: "Professional",
    subtitle: "For advanced healthcare learners",
    price: "₹9,999",
    period: "/ year",
    description:
      "A complete professional ICU learning experience for healthcare professionals seeking advanced critical care education, case-based learning and deeper clinical preparation.",
    popular: false,
    icon: ShieldCheck,
    button: "Choose Professional",
    href: "/register?plan=professional",
    features: [
      "Everything included in Premium",
      "Advanced critical care programs",
      "Advanced ICU case studies",
      "Neuro ICU learning resources",
      "Cardiac ICU & hemodynamic training",
      "Sepsis, shock & multiorgan failure",
      "Complete professional notes library",
      "Advanced assessments and quizzes",
      "ICU interview & clinical viva preparation",
      "Priority learning resources",
      "Professional completion certificates",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-purple-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            <Crown size={16} />

            Professional ICU Learning Plans
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Choose Your Learning Plan
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Start with free resources or unlock a complete professional
            ICU learning experience with structured courses, clinical
            resources, assessments and certificates.
          </p>

        </div>

        {/* =====================================================
            PRICING CARDS
        ===================================================== */}

        <div className="mt-14 grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => {

            const Icon = plan.icon;

            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? "border-blue-500 shadow-xl shadow-blue-700/10"
                    : "border-slate-200"
                }`}
              >

                {/* =================================================
                    MOST POPULAR BADGE
                ================================================= */}

                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-700 px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* =================================================
                    ICON + VALUE BADGE
                ================================================= */}

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      plan.popular
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Icon size={27} />
                  </div>

                  {plan.popular && (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      Best Value
                    </span>
                  )}

                </div>

                {/* =================================================
                    PLAN TITLE
                ================================================= */}

                <h3 className="mt-7 text-2xl font-extrabold text-slate-900">
                  {plan.name}
                </h3>

                <p className="mt-1 text-sm font-semibold text-blue-700">
                  {plan.subtitle}
                </p>

                <p className="mt-4 min-h-[96px] text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>

                {/* =================================================
                    PRICE
                ================================================= */}

                <div className="mt-7 border-b border-slate-100 pb-7">

                  <div className="flex items-end gap-2">

                    <span className="text-4xl font-extrabold text-slate-900">
                      {plan.price}
                    </span>

                    <span className="mb-1 text-sm font-medium text-slate-500">
                      {plan.period}
                    </span>

                  </div>

                </div>

                {/* =================================================
                    CTA BUTTON
                ================================================= */}

                <Link
                  href={plan.href}
                  className={`mt-7 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold transition ${
                    plan.popular
                      ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800"
                      : "border border-slate-300 bg-white text-slate-800 hover:border-blue-400 hover:text-blue-700"
                  }`}
                >
                  {plan.button}

                  <ArrowRight size={18} />
                </Link>

                {/* =================================================
                    FEATURES
                ================================================= */}

                <div className="mt-8">

                  <p className="text-sm font-extrabold text-slate-900">
                    What's included
                  </p>

                  <ul className="mt-5 space-y-3">

                    {plan.features.map((feature) => (

                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >

                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                          <Check
                            size={13}
                            strokeWidth={3}
                          />
                        </span>

                        <span>{feature}</span>

                      </li>

                    ))}

                  </ul>

                </div>

              </article>
            );

          })}

        </div>

        {/* =====================================================
            VALUE / TRUST STRIP
        ===================================================== */}

        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:flex-row">

          <ShieldCheck
            className="shrink-0 text-green-600"
            size={24}
          />

          <p className="text-sm font-medium text-slate-600">
            Structured ICU courses • Clinical learning resources •
            Progress tracking • Assessments • Completion certificates
          </p>

        </div>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <div className="mt-12 text-center">

          <p className="text-sm text-slate-500">
            Not sure which plan is right for you?
          </p>

          <Link
            href="/courses"
            className="mt-3 inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-800"
          >
            Explore Professional Courses First

            <ArrowRight size={17} />
          </Link>

        </div>

      </div>
    </section>
  );
}