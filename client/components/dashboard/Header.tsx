"use client";

import { Bell, Search, CalendarDays } from "lucide-react";
import { student } from "@/data/dashboard";

export default function Header() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  return (
    <header className="mb-8 rounded-3xl bg-white p-6 shadow-lg">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h2 className="text-3xl font-bold text-slate-900">
            {greeting}, {student.name}
          </h2>

          <p className="mt-2 text-slate-500">
            Welcome back to ICU Learning Portal
          </p>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={16} />
            {today}
          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent outline-none"
            />

          </div>

          {/* Notification */}

          <button className="relative rounded-xl bg-slate-100 p-3 hover:bg-slate-200">

            <Bell size={22} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

        </div>

      </div>

    </header>
  );
}