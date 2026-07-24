"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Award,
  User,
  Settings,
  LogOut,
  Moon,
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
    title: "Notes",
    icon: FileText,
    href: "/notes",
  },
  {
    title: "Certificates",
    icon: Award,
    href: "/certificates",
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
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-80 min-h-screen bg-slate-900 text-white flex-col">

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-3xl font-bold">
          🏥 ICU Learning
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Premium Student Portal
        </p>

      </div>

      {/* Student Profile */}

      <div className="p-5">

        <StudentProfile />

      </div>

      {/* Navigation */}

      <div className="flex-1 px-5">

        <p className="mb-4 text-xs uppercase tracking-widest text-slate-500">
          Navigation
        </p>

        <nav className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-slate-800 hover:text-cyan-300"
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

        <button className="flex w-full items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 transition hover:bg-slate-700">
          <Moon size={20} />
          Dark Mode
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl bg-red-600 px-4 py-3 transition hover:bg-red-700">
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}