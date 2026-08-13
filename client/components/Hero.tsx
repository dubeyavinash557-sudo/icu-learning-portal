import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background decoration */}
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-16">
        
        {/* LEFT CONTENT */}
        <div className="max-w-2xl">
          {/* Small badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500" />
            Professional Critical Care Learning Platform
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Become an{" "}
            <span className="text-blue-700">
              ICU Critical Care Expert
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn ICU Nursing, Mechanical Ventilation, ECG, ABG,
            Emergency Care and Critical Care skills with structured
            professional courses.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 hover:shadow-xl"
            >
              Explore Courses
              <span className="ml-2 text-lg">→</span>
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-bold text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
            >
              Start Learning
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-9 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg">
                ✓
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Expert Learning
                </p>
                <p className="text-xs text-slate-500">
                  Practical focused
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg">
                📚
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Complete Notes
                </p>
                <p className="text-xs text-slate-500">
                  PDF resources
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-lg">
                🏆
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Certification
                </p>
                <p className="text-xs text-slate-500">
                  Earn certificates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mx-auto w-full max-w-xl">
          {/* Main image container */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-blue-900/10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200"
                alt="Medical professional and critical care learning"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Image text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm font-medium text-blue-200">
                  ICU Learning Portal
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Learn. Practice. Become Expert.
                </h2>
              </div>
            </div>
          </div>

          {/* Floating card - top */}
          <div className="absolute -right-3 top-8 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:-right-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                🩺
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Learn Critical Care
                </p>

                <p className="text-sm font-bold text-slate-900">
                  Practical Skills
                </p>
              </div>
            </div>
          </div>

          {/* Floating card - bottom */}
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                🎓
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Professional Courses
                </p>

                <p className="text-sm font-bold text-slate-900">
                  Learn Anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}