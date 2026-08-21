import {
  BadgeCheck,
  Quote,
  ShieldCheck,
  Star,
  Users,
  BookOpenCheck,
  Stethoscope,
} from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "ICU Staff Nurse",
    location: "Delhi",
    rating: 5,
    initials: "PS",
    text: "ICU Learning Portal ने मेरी ICU nursing knowledge को काफी improve किया। Ventilator और ABG topics structured तरीके से समझना आसान हुआ।",
  },
  {
    name: "Rahul Verma",
    role: "Critical Care Nurse",
    location: "Noida",
    rating: 5,
    initials: "RV",
    text: "Structured courses और practical ICU cases बहुत useful हैं। खासकर ventilator modes और emergency-care learning modules काफी helpful हैं।",
  },
  {
    name: "Neha Singh",
    role: "GNM Nurse",
    location: "Ghaziabad",
    rating: 5,
    initials: "NS",
    text: "Beginner से advanced level तक सीखने के लिए learning pathway बहुत useful है। Notes, quizzes और practical learning एक ही जगह मिलते हैं।",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            <Users size={15} />
            Learner Experience
          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Trusted by Healthcare Learners
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            See how structured ICU learning, practical clinical resources and
            focused revision can support healthcare professionals in their
            learning journey.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-8"
            >
              {/* Top accent */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 opacity-80" />

              {/* Quote icon */}
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Quote size={20} strokeWidth={2.3} />
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill="currentColor"
                        className="text-amber-400"
                      />
                    )
                  )}
                </div>
              </div>

              {/* Review */}
              <blockquote className="mt-7 flex-1 text-[15px] leading-7 text-slate-600">
                “{testimonial.text}”
              </blockquote>

              {/* Divider */}
              <div className="my-7 h-px bg-slate-100" />

              {/* Student */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black text-white shadow-sm">
                  {testimonial.initials}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-sm font-black text-slate-950">
                      {testimonial.name}
                    </h3>

                    <BadgeCheck
                      size={16}
                      className="shrink-0 text-blue-600"
                      fill="currentColor"
                      strokeWidth={1.8}
                    />
                  </div>

                  <p className="mt-0.5 text-sm font-medium text-slate-500">
                    {testimonial.role}
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-blue-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Verification */}
              <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                <ShieldCheck size={14} />
                Learner Review
              </div>
            </article>
          ))}
        </div>

        {/* Trust / Platform Value */}
        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">
            <TrustItem
              icon={<BookOpenCheck size={21} />}
              title="Structured Learning"
              description="Courses organised into focused learning modules."
            />

            <TrustItem
              icon={<Stethoscope size={21} />}
              title="Clinical Focus"
              description="ICU concepts presented with practical learning context."
            />

            <TrustItem
              icon={<ShieldCheck size={21} />}
              title="Professional Pathway"
              description="Lessons, assessments, resources and certificates in one platform."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-6 sm:p-7">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-950">{title}</h3>

        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}