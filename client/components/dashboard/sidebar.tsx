"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Award,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Video,
  CreditCard,
  CircleHelp,
  ClipboardCheck,
  Crown,
} from "lucide-react";

import StudentProfile from "./StudentProfile";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "My Courses",
    icon: BookOpen,
    href: "/courses",
  },
  {
    title: "Live Classes",
    icon: Video,
    href: "/live-classes",
  },
  {
    title: "Notes",
    icon: FileText,
    href: "/notes",
  },
  {
    title: "Quiz",
    icon: ClipboardCheck,
    href: "/dashboard/quiz",
  },
  {
    title: "Certificates",
    icon: Award,
    href: "/dashboard/certificates",
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: "/payments",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Help Center",
    icon: CircleHelp,
    href: "/help",
  },
];

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

  function handleThemeToggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <aside
      className="
        hidden
        min-h-screen
        w-80
        flex-col
        border-r
        transition-colors
        duration-300
        lg:flex

        bg-white
        text-slate-900
        border-slate-200

        dark:bg-gradient-to-b
        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950
        dark:text-white
        dark:border-slate-800
      "
    >
      {/* Logo */}
      <div
        className="
          border-b
          p-6
          border-slate-200
          dark:border-slate-800
        "
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          🏥 ICU Learning
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Premium Student Portal
        </p>

        <div
          className="
            mt-4
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-yellow-100
            px-3
            py-1
            text-sm
            text-yellow-700
            dark:bg-yellow-500/20
            dark:text-yellow-300
          "
        >
          <Crown size={16} />
          Premium Member
        </div>
      </div>

      {/* Student Profile */}
      <div className="p-5">
        <StudentProfile />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-5">
        <p
          className="
            mb-4
            text-xs
            uppercase
            tracking-widest
            text-slate-400
            dark:text-slate-500
          "
        >
          Navigation
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  duration-200

                  ${
                    active
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
                  }
                `}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls */}
      <div
        className="
          space-y-3
          border-t
          p-5
          border-slate-200
          dark:border-slate-800
        "
      >
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={handleThemeToggle}
          disabled={!mounted}
          aria-label="Toggle dark mode"
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            font-medium
            transition-all
            duration-200

            bg-slate-100
            text-slate-700
            hover:bg-slate-200

            dark:bg-slate-800
            dark:text-slate-100
            dark:hover:bg-slate-700

            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {mounted && isDark ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}

          {mounted && isDark ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            bg-red-600
            px-4
            py-3
            font-medium
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-red-700
            hover:shadow-md
          "
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
}