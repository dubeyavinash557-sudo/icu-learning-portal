import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  Menu,
  Stethoscope,
} from "lucide-react";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Notes",
    href: "/notes",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between">
          {/* =====================================================
              BRAND
          ===================================================== */}

          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="ICU Learning Portal Home"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20 transition duration-300 group-hover:shadow-md group-hover:shadow-blue-600/25">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700" />

              <Stethoscope
                size={23}
                strokeWidth={2.2}
                className="relative"
              />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-[17px] font-black tracking-tight text-slate-950">
                  ICU
                </span>

                <span className="text-[17px] font-black tracking-tight text-blue-600">
                  Learning Portal
                </span>
              </div>

              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Critical Care Education
              </p>
            </div>

            <span className="text-base font-black text-blue-600 sm:hidden">
              ICU Learning
            </span>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}

          <nav
            className="hidden items-center lg:flex"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 transition duration-200 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* =====================================================
              DESKTOP ACTIONS
          ===================================================== */}

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/courses"
              className="group inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:text-blue-600"
            >
              <BookOpenCheck
                size={17}
                className="text-blue-600"
              />

              Learning
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25"
            >
              Login
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* =====================================================
              MOBILE MENU
          ===================================================== */}

          <details className="relative lg:hidden">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 [&::-webkit-details-marker]:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={21} />
            </summary>

            <div className="absolute right-0 top-14 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10">
              {/* Mobile brand strip */}

              <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Activity size={19} />
                </div>

                <div>
                  <p className="text-sm font-black text-slate-950">
                    ICU Learning Portal
                  </p>

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Critical Care Education
                  </p>
                </div>
              </div>

              {/* Mobile navigation */}

              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.label}

                    <ChevronDown
                      size={15}
                      className="-rotate-90 text-slate-400"
                    />
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}

              <div className="mt-3 border-t border-slate-100 pt-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Login to Learning Portal
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}