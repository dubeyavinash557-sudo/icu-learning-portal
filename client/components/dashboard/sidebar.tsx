"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Award,
  User,
  Settings,
  LogOut,
  Moon,
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
    href: "/quiz",
  },
  {
    title: "Certificates",
    icon: Award,
    href: "/certificates",
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

  return (
    <aside className="hidden lg:flex w-80 min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-r border-slate-800">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">

        <h1 className="text-3xl font-bold">
          🏥 ICU Learning
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Premium Student Portal
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-300">
          <Crown size={16} />
          Premium Member
        </div>

      </div>

      {/* Student Profile */}
      <div className="p-5">
        <StudentProfile />
      </div>

      {/* Navigation */}
      <div className="flex-1 px-5 overflow-y-auto">

        <p className="mb-4 text-xs uppercase tracking-widest text-slate-500">
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
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "hover:bg-slate-800 hover:text-cyan-300 text-slate-300"
                }`}
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

      {/* Bottom */}
      <div className="border-t border-slate-800 p-5 space-y-3">

        <button className="flex w-full items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 hover:bg-slate-700 transition">
          <Moon size={20} />
          Dark Mode
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl bg-red-600 px-4 py-3 hover:bg-red-700 transition">
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}