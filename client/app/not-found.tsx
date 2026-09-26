import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Home,
  SearchX,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] items-center bg-slate-50">
        <section className="mx-auto w-full max-w-3xl px-6 py-20 text-center sm:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
            <SearchX size={38} />
          </div>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-blue-700">
            404 • Page not found
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            This learning page does not exist.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            The link may be outdated, the course may have moved, or the page
            may no longer be available. Use one of the options below to
            continue.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-800"
            >
              <Home size={17} />
              Go Home
            </Link>

            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
            >
              <BookOpen size={17} />
              Browse Courses
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
            >
              Contact Support
              <ArrowLeft
                className="rotate-180"
                size={17}
              />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}