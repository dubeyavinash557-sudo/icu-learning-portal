"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  ClipboardCheck,
  CreditCard,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  UserRound,
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Notes",
    href: "/notes",
    icon: FileText,
  },
  {
    title: "Quizzes",
    href: "/dashboard/quiz",
    icon: ClipboardCheck,
  },
  {
    title: "Certificates",
    href: "/dashboard/certificates",
    icon: Award,
  },
  {
    title: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
];

const accountItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

function isCurrentPath(
  pathname: string,
  href: string
) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
            <HeartPulse size={23} />
          </span>

          <span>
            <span className="block text-base font-black tracking-tight text-slate-950 dark:text-white">
              ICU Learning Portal
            </span>

            <span className="mt-0.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Student Learning Area
            </span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <NavigationGroup
          label="Learning"
          pathname={pathname}
          items={navigationItems}
        />

        <div className="mt-8">
          <NavigationGroup
            label="Account"
            pathname={pathname}
            items={accountItems}
          />
        </div>
      </div>

      <div className="space-y-3 border-t border-slate-200 p-4 dark:border-slate-800">
        <button
          type="button"
          onClick={toggleTheme}
          disabled={!mounted}
          className="flex w-full items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Toggle colour theme"
        >
          {mounted && isDark ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}

          {mounted && isDark ? "Use light mode" : "Use dark mode"}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
        >
          <LogOut size={19} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

function NavigationGroup({
  label,
  pathname,
  items,
}: {
  label: string;
  pathname: string;
  items: ReadonlyArray<{
    title: string;
    href: string;
    icon: typeof LayoutDashboard;
  }>;
}) {
  return (
    <>
      <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
        {label}
      </p>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isCurrentPath(
            pathname,
            item.href
          );

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
                active
                  ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon size={19} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </>
  );
}