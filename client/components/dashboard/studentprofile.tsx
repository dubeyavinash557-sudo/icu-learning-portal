"use client";

import { student } from "@/data/dashboard";

import {
  Award,
  Flame,
  Hospital,
  Mail,
  User,
  Crown,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

export default function StudentProfile() {
  return (
    <div className="rounded-3xl bg-white shadow-xl border border-slate-200 overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-6 text-white">

        <div className="flex flex-col items-center">

          <div className="relative">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-blue-700 shadow-xl">

              <User size={42} />

            </div>

            {/* Online */}
            <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white bg-green-500"></span>

          </div>

          <h2 className="mt-4 text-2xl font-bold">
            {student.name}
          </h2>

          <p className="mt-1 flex items-center gap-2 text-blue-100">

            <Mail size={16} />

            {student.email}

          </p>

          <div className="mt-4 flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-yellow-900">

            <Crown size={18} />

            {student.membership} Member

          </div>

        </div>

      </div>

      {/* Body */}
      <div className="p-6 space-y-4">

        <InfoRow
          icon={<Hospital size={18} />}
          label="Hospital"
          value={student.hospital}
        />

        <InfoRow
          icon={<GraduationCap size={18} />}
          label="Qualification"
          value="GNM Nursing"
        />

        <InfoRow
          icon={<Award size={18} />}
          label="ICU Experience"
          value={student.experience}
        />

        <InfoRow
          icon={<Flame size={18} />}
          label="Learning Streak"
          value={`🔥 ${student.streak} Days`}
        />

        <InfoRow
          icon={<TrendingUp size={18} />}
          label="Overall Rank"
          value="Top 5%"
        />

        {/* Progress */}
        <div className="pt-4">

          <div className="flex justify-between text-sm font-semibold mb-2">

            <span>Course Progress</span>

            <span>78%</span>

          </div>

          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"></div>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 hover:bg-slate-100 transition">

      <div className="flex items-center gap-3 text-slate-600">

        {icon}

        <span>{label}</span>

      </div>

      <span className="font-semibold text-slate-800">
        {value}
      </span>

    </div>
  );
}