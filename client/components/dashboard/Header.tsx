"use client";

import {
  Bell,
  Search,
  CalendarDays,
  Crown,
  LogOut,
} from "lucide-react";
import { student } from "@/data/dashboard";

export default function Header() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  return (
    <header className="mb-8 rounded-3xl bg-white shadow-xl border border-slate-200">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 p-6">

        {/* Left Side */}
        <div>

          <p className="text-sm text-blue-600 font-semibold">
            ICU Learning Portal
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            {greeting}, {student.name}
          </h1>

          <p className="text-slate-500 mt-2">
            Continue your ICU learning journey today.
          </p>

          <div className="flex items-center gap-5 mt-4 text-sm text-slate-500">

            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {today}
            </div>

            <div>
              🕒 {currentTime}
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center gap-4">

          {/* Search */}
          <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3 min-w-[260px]">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent outline-none w-full"
            />

          </div>

          {/* Notification */}
          <button className="relative rounded-xl bg-slate-100 p-3 hover:bg-slate-200 transition">

            <Bell size={22} />

            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
              3
            </span>

          </button>

          {/* Premium Badge */}
          <div className="hidden md:flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-yellow-700 font-semibold">

            <Crown size={18} />

            Premium

          </div>

          {/* Student */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2">

            <div className="relative">

              <img
                src="https://ui-avatars.com/api/?name=Student&background=2563eb&color=fff"
                alt="Student"
                className="w-11 h-11 rounded-full"
              />

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>

            </div>

            <div>

              <h3 className="font-bold text-slate-800">
                {student.name}
              </h3>

              <p className="text-xs text-slate-500">
                ICU Student
              </p>

            </div>

          </div>

          {/* Logout */}
          <button className="rounded-xl bg-red-500 px-4 py-3 text-white hover:bg-red-600 transition">

            <LogOut size={18} />

          </button>

        </div>

      </div>

    </header>
  );
}