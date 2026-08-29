import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpenCheck,
  ChevronDown,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { auth } from "@/auth";

const publicNavigation = [
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
    label: "Quiz",
    href: "/dashboard/quiz",
  },
];

export default async function Navbar() {
  const session = await auth();

  const user = session?.user as
    | {
        name?: string | null;
        email?: string | null;
        role?: string;
        isPremium?: boolean;
      }
    | undefined;

  const isLoggedIn = Boolean(user?.email);
  const isAdmin = user?.role === "ADMIN";
  const isPremium = user?.isPremium === true;

  const displayName =
    user?.name?.trim() ||
    user?.email?.split("@")[0] ||
    "Student";

  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          {/* =====================================================
              BRAND
          ====================================================== */}

          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="ICU Learning Portal Home"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-600/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-blue-600/25">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-white/10" />

              <Stethoscope
                size={23}
                strokeWidth={2.2}
                className="relative"
              />
            </div>

            <div className="hidden min-w-0 sm:block">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[17px] font-black tracking-tight text-slate-950">
                  ICU
                </span>

                <span className="text-[17px] font-black tracking-tight text-blue-600">
                  Learning Portal
                </span>
              </div>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Professional Critical Care Education
              </p>
            </div>

            <div className="sm:hidden">
              <p className="text-sm font-black leading-none text-slate-950">
                ICU Learning
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-blue-600">
                Critical Care Education
              </p>
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}

          <nav
            className="hidden items-center lg:flex"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 p-1">
              {publicNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition duration-200 hover:bg-white hover:text-blue-700 hover:shadow-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* =====================================================
              DESKTOP ACTION AREA
          ====================================================== */}

          <div className="hidden items-center gap-2 lg:flex">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-blue-700/20 transition duration-300 hover:-translate-y-0.5 hover:from-blue-800 hover:to-cyan-700 hover:shadow-lg"
                >
                  Start Learning
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </>
            ) : (
              <>
                {/* Premium indicator */}

                {isPremium && (
                  <div className="hidden items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-black text-amber-700 xl:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Premium
                  </div>
                )}

                {/* Dashboard */}

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>

                {/* Account menu */}

                <details className="relative">
                  <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 transition hover:border-blue-200 hover:bg-white [&::-webkit-details-marker]:hidden">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-black text-white">
                      {initials || "S"}
                    </div>

                    <div className="hidden max-w-[120px] text-left xl:block">
                      <p className="truncate text-xs font-black text-slate-900">
                        {displayName}
                      </p>

                      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        {isAdmin
                          ? "Administrator"
                          : isPremium
                            ? "Premium Student"
                            : "Student"}
                      </p>
                    </div>

                    <ChevronDown
                      size={15}
                      className="text-slate-400"
                    />
                  </summary>

                  <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
                    {/* Account header */}

                    <div className="mb-2 rounded-xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 p-4 text-white">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sm font-black ring-1 ring-white/10">
                          {initials || "S"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black">
                            {displayName}
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-blue-200">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${
                            isPremium
                              ? "bg-amber-400/15 text-amber-200 ring-1 ring-amber-300/20"
                              : "bg-white/10 text-blue-100 ring-1 ring-white/10"
                          }`}
                        >
                          {isPremium
                            ? "Premium Member"
                            : "Free Member"}
                        </span>

                        {isAdmin && (
                          <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-200 ring-1 ring-emerald-300/20">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Account links */}

                    <div className="space-y-1">
                      <AccountMenuLink
                        href="/dashboard"
                        icon={<LayoutDashboard size={16} />}
                        label="My Dashboard"
                        description="Track your learning"
                      />

                      <AccountMenuLink
                        href="/profile"
                        icon={<UserRound size={16} />}
                        label="My Profile"
                        description="Manage your account"
                      />

                      <AccountMenuLink
                        href="/dashboard/certificates"
                        icon={<Award size={16} />}
                        label="Certificates"
                        description="View your achievements"
                      />

                      <AccountMenuLink
                        href="/dashboard/quiz"
                        icon={<BookOpenCheck size={16} />}
                        label="Quiz Dashboard"
                        description="Practice & track scores"
                      />

                      {isAdmin && (
                        <AccountMenuLink
                          href="/admin"
                          icon={<ShieldCheck size={16} />}
                          label="Admin Console"
                          description="Manage the LMS"
                        />
                      )}
                    </div>
                  </div>
                </details>
              </>
            )}
          </div>

          {/* =====================================================
              MOBILE NAVIGATION
          ====================================================== */}

          <details className="relative lg:hidden">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 [&::-webkit-details-marker]:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={21} />
            </summary>

            <div className="absolute right-0 top-14 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10">
              {/* Mobile brand strip */}

              <div className="mb-3 rounded-xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                    <Activity size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      ICU Learning Portal
                    </p>

                    <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-200">
                      Professional LMS
                    </p>
                  </div>
                </div>

                {isLoggedIn && (
                  <div className="mt-3 border-t border-white/10 pt-3">
                    <p className="truncate text-xs font-bold text-white">
                      Welcome, {displayName}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-blue-200">
                      {isPremium
                        ? "Premium student account"
                        : "Free student account"}
                    </p>
                  </div>
                )}
              </div>

              {/* Primary links */}

              <div className="space-y-1">
                {publicNavigation.map((item) => (
                  <MobileMenuLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                  />
                ))}
              </div>

              {/* Logged-in links */}

              {isLoggedIn && (
                <div className="mt-3 border-t border-slate-100 pt-3">
                  <p className="px-3 pb-2 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                    My Learning
                  </p>

                  <MobileAccountLink
                    href="/dashboard"
                    icon={<LayoutDashboard size={16} />}
                    label="Dashboard"
                  />

                  <MobileAccountLink
                    href="/profile"
                    icon={<UserRound size={16} />}
                    label="My Profile"
                  />

                  <MobileAccountLink
                    href="/dashboard/certificates"
                    icon={<Award size={16} />}
                    label="Certificates"
                  />

                  <MobileAccountLink
                    href="/dashboard/quiz"
                    icon={<BookOpenCheck size={16} />}
                    label="Quiz Dashboard"
                  />

                  {isAdmin && (
                    <MobileAccountLink
                      href="/admin"
                      icon={<ShieldCheck size={16} />}
                      label="Admin Console"
                    />
                  )}
                </div>
              )}

              {/* CTA */}

              <div className="mt-3 border-t border-slate-100 pt-3">
                {isLoggedIn ? (
                  <Link
                    href="/courses"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-4 py-3 text-sm font-black text-white shadow-md shadow-blue-700/20 transition hover:from-blue-800 hover:to-cyan-700"
                  >
                    Explore Courses
                    <ArrowRight size={17} />
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="flex items-center justify-center gap-1 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800"
                    >
                      Register
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

/* =============================================================
   DESKTOP ACCOUNT MENU LINK
============================================================= */

function AccountMenuLink({
  href,
  icon,
  label,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-blue-50"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition group-hover:bg-blue-100 group-hover:text-blue-700">
        {icon}
      </span>

      <span className="min-w-0">
        <span className="block text-xs font-black text-slate-800 group-hover:text-blue-700">
          {label}
        </span>

        <span className="mt-0.5 block text-[10px] text-slate-400">
          {description}
        </span>
      </span>

      <ArrowRight
        size={14}
        className="ml-auto text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
      />
    </Link>
  );
}

/* =============================================================
   MOBILE PRIMARY LINK
============================================================= */

function MobileMenuLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
    >
      {label}

      <ArrowRight
        size={15}
        className="text-slate-300"
      />
    </Link>
  );
}

/* =============================================================
   MOBILE ACCOUNT LINK
============================================================= */

function MobileAccountLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        {icon}
      </span>

      {label}

      <ArrowRight
        size={14}
        className="ml-auto text-slate-300"
      />
    </Link>
  );
}