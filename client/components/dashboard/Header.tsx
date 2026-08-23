"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  HeartPulse,
  LogOut,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";

type HeaderProps = {
  fullName?: string;
};

function getGreeting(hour: number) {
  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

export default function Header({
  fullName,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [dateLabel, setDateLabel] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateHeaderDate = () => {
      const now = new Date();

      setDateLabel(
        now.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );

      setGreeting(getGreeting(now.getHours()));
    };

    setMounted(true);
    updateHeaderDate();

    const interval = window.setInterval(
      updateHeaderDate,
      60_000
    );

    return () => window.clearInterval(interval);
  }, []);

  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const displayName = fullName?.trim() || "Student";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/20"
            aria-label="Open dashboard"
          >
            <HeartPulse size={23} />
          </Link>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-400">
              ICU Learning Portal
            </p>

            <h1 className="mt-1 truncate text-xl font-black tracking-tight text-slate-950 dark:text-white sm:text-2xl">
              {greeting || "Welcome"}, {displayName}
            </h1>

            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              <CalendarDays size={15} />
              {dateLabel || "Loading date..."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end lg:self-auto">
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-700 dark:hover:text-blue-300"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {initial}
            </span>

            <span className="hidden sm:inline">Profile</span>
            <UserRound
              size={17}
              className="sm:hidden"
            />
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label="Toggle colour theme"
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {mounted && theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sign out"
            className="rounded-xl bg-slate-950 p-2.5 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            <LogOut size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}