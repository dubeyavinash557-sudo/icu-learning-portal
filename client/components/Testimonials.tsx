import Link from "next/link";
import {
  ArrowRight,
  MessageSquareQuote,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            <Users size={15} />
            Learner Reviews
          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Real student feedback will appear here.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            We will publish verified learner feedback only after receiving
            permission from the student. No invented names, ratings or reviews
            are used on this platform.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <MessageSquareQuote size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-black text-slate-950">
              Building our verified learner community
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              If you are an ICU Learning Portal student and would like to share
              your experience, please contact support with your course name and
              permission to publish your first name, role and review.
            </p>

            <div className="mt-7 grid w-full gap-4 sm:grid-cols-3">
              <TrustItem
                icon={<ShieldCheck size={19} />}
                title="Verified"
                text="Feedback from real learners"
              />

              <TrustItem
                icon={<Star size={19} />}
                title="Transparent"
                text="No inflated ratings"
              />

              <TrustItem
                icon={<Users size={19} />}
                title="Permission"
                text="Student consent before publishing"
              />
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Contact Support
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
        {icon}
      </div>

      <p className="mt-4 text-sm font-black text-slate-950">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}