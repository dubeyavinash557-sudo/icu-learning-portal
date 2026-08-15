"use client";

import {
  Bell,
  Search,
  CalendarDays,
  Crown,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { student } from "@/data/dashboard";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setMounted(true);

    const updateDateTime = () => {
      const now = new Date();

      setCurrentDate(
        now.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );

      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );

      const hour = now.getHours();

      setGreeting(
        hour < 12
          ? "Good Morning ☀️"
          : hour < 17
          ? "Good Afternoon 🌤️"
          : "Good Evening 🌙"
      );
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header
      className="
        mb-8 rounded-3xl
        border border-slate-200
        bg-white
        shadow-xl
        transition-colors
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="flex flex-col items-center justify-between gap-6 p-6 lg:flex-row">

        {/* LEFT SIDE */}
        <div>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            ICU Learning Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {greeting || "Welcome"}, {student.name}
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Continue your ICU learning journey today.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400">

            {/* DATE */}
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {currentDate || "Loading date..."}
            </div>

            {/* TIME */}
            <div>
              🕒 {currentTime || "--:--"}
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-wrap items-center gap-4">

          {/* SEARCH */}
          <div
            className="
              flex min-w-[260px] items-center gap-3
              rounded-xl
              bg-slate-100
              px-4 py-3
              dark:bg-slate-800
            "
          >
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search courses..."
              className="
                w-full bg-transparent
                text-slate-900
                outline-none
                placeholder:text-slate-400
                dark:text-white
              "
            />
          </div>

          {/* NOTIFICATION */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative rounded-xl
              bg-slate-100 p-3
              transition
              hover:bg-slate-200
              dark:bg-slate-800
              dark:hover:bg-slate-700
            "
          >
            <Bell
              size={22}
              className="text-slate-700 dark:text-slate-200"
            />

            <span
              className="
                absolute -right-1 -top-1
                flex h-5 w-5
                items-center justify-center
                rounded-full
                bg-red-600
                text-xs font-bold
                text-white
              "
            >
              3
            </span>
          </button>

          {/* DARK MODE */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="
              rounded-xl
              bg-slate-100
              p-3
              text-slate-700
              transition
              hover:bg-slate-200
              dark:bg-slate-800
              dark:text-yellow-300
              dark:hover:bg-slate-700
            "
          >
            {mounted && theme === "dark" ? (
              <Sun size={22} />
            ) : (
              <Moon size={22} />
            )}
          </button>

          {/* PREMIUM */}
          <div
            className="
              hidden items-center gap-2
              rounded-full
              bg-yellow-100
              px-4 py-2
              font-semibold
              text-yellow-700
              md:flex
              dark:bg-yellow-900/30
              dark:text-yellow-300
            "
          >
            <Crown size={18} />
            Premium
          </div>

          {/* STUDENT */}
          <div
            className="
              flex items-center gap-3
              rounded-xl
              bg-slate-100
              px-4 py-2
              dark:bg-slate-800
            "
          >
            <div className="relative">
              <img
                src="https://ui-avatars.com/api/?name=Student&background=2563eb&color=fff"
                alt="Student"
                className="h-11 w-11 rounded-full"
              />

              <span
                className="
                  absolute bottom-0 right-0
                  h-3 w-3
                  rounded-full
                  border-2
                  border-white
                  bg-green-500
                  dark:border-slate-800
                "
              />
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">
                {student.name}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                ICU Student
              </p>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            className="
              rounded-xl
              bg-red-500
              px-4 py-3
              text-white
              shadow-sm
              transition
              hover:bg-red-600
              hover:shadow-md
            "
          >
            <LogOut size={18} />
          </button>

        </div>
      </div>
    </header>
  );
}