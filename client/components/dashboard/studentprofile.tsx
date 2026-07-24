"use client";

import { student } from "@/data/dashboard";
import { Award, Flame, Hospital, Mail, Star, User } from "lucide-react";

export default function StudentProfile() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex flex-col items-center text-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl">
          <User size={40} />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          {student.name}
        </h2>

        <p className="mt-1 flex items-center gap-2 text-slate-500">
          <Mail size={16} />
          {student.email}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700 font-semibold">
          <Star size={18} />
          {student.membership} Member
        </div>
      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
          <span className="flex items-center gap-2 text-slate-600">
            <Hospital size={18} />
            Hospital
          </span>

          <span className="font-semibold">
            {student.hospital}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
          <span className="flex items-center gap-2 text-slate-600">
            <Award size={18} />
            Experience
          </span>

          <span className="font-semibold">
            {student.experience}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
          <span className="flex items-center gap-2 text-slate-600">
            <Flame size={18} />
            Learning Streak
          </span>

          <span className="font-bold text-orange-600">
            🔥 {student.streak} Days
          </span>
        </div>

      </div>
    </div>
  );
}