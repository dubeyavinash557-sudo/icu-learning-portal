import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | ICU Learning Portal",
  description:
    "Contact ICU Learning Portal for course, account, learning and technical support.",
};

const supportTopics = [
  {
    title: "Course Support",
    description:
      "Get help with course access, lessons, learning resources and course navigation.",
    icon: Stethoscope,
  },
  {
    title: "Account Support",
    description:
      "Need help with login, registration, profile or premium access? Contact our support team.",
    icon: ShieldCheck,
  },
  {
    title: "Technical Support",
    description:
      "Report website issues, broken links, payment problems or other technical difficulties.",
    icon: MessageCircle,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                ICU Learning Portal Support
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                How can we help you?
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
                Have a question about courses, account access, premium
                learning or technical support? Choose a support topic or
                contact our learning team.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8 lg:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {supportTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <div
                  key={topic.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon size={23} />
                  </div>

                  <h2 className="mt-5 text-lg font-black text-slate-950">
                    {topic.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {topic.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                    Email Support
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    Send us your question
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                For course, account or technical questions, please send a
                detailed message with your registered email address and the
                issue you are facing.
              </p>

              <a
                href="mailto:dubeyavinash557@gmail.com"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Email Support
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                <Clock3 size={21} />
              </div>

              <h2 className="mt-5 text-xl font-black">
                Before contacting support
              </h2>

              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                <li>• Mention the page or course where the issue appears.</li>
                <li>• Include the exact error message, if available.</li>
                <li>• Do not share your password or payment credentials.</li>
                <li>• Add a screenshot when reporting a technical issue.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 p-6 text-center sm:p-8">
            <h2 className="text-xl font-black text-slate-950">
              Ready to continue learning?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore professional ICU and critical-care learning programs.
            </p>

            <Link
              href="/courses"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Explore Courses
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}