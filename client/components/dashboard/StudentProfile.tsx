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
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        shadow-xl
        transition-colors
        duration-300

        bg-white
        border-slate-200

        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-6 text-white">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative">
            <div
              className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                bg-white
                text-blue-700
                shadow-xl
                ring-4
                ring-white/20
              "
            >
              <User size={42} />
            </div>

            {/* Online Status */}
            <span
              className="
                absolute
                bottom-1
                right-1
                h-5
                w-5
                rounded-full
                border-4
                border-white
                bg-green-500
              "
            />
          </div>

          {/* Name */}
          <h2 className="mt-4 text-center text-2xl font-bold">
            {student.name}
          </h2>

          {/* Email */}
          <p className="mt-1 flex items-center gap-2 text-center text-sm text-blue-100">
            <Mail size={16} />

            <span className="break-all">
              {student.email}
            </span>
          </p>

          {/* Membership */}
          <div
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-yellow-400
              px-4
              py-2
              text-sm
              font-bold
              text-yellow-900
              shadow-lg
            "
          >
            <Crown size={18} />

            {student.membership} Member
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 p-6">
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

        {/* Course Progress */}
        <div className="pt-4">
          <div className="mb-2 flex items-center justify-between text-sm font-semibold">
            <span className="text-slate-700 dark:text-slate-200">
              Course Progress
            </span>

            <span className="text-slate-900 dark:text-white">
              78%
            </span>
          </div>

          {/* Progress Background */}
          <div
            className="
              h-3
              overflow-hidden
              rounded-full
              bg-slate-200
              dark:bg-slate-700
            "
          >
            <div
              className="
                h-full
                w-[78%]
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                transition-all
                duration-500
              "
            />
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
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
        rounded-xl
        p-3
        transition-colors
        duration-200

        bg-slate-50
        hover:bg-slate-100

        dark:bg-slate-800
        dark:hover:bg-slate-700
      "
    >
      {/* Left */}
      <div
        className="
          flex
          min-w-0
          items-center
          gap-3

          text-slate-600
          dark:text-slate-300
        "
      >
        <span className="shrink-0">
          {icon}
        </span>

        <span className="truncate">
          {label}
        </span>
      </div>

      {/* Right */}
      <span
        className="
          max-w-[60%]
          text-right
          text-sm
          font-semibold
          break-words

          text-slate-800
          dark:text-white
        "
      >
        {value}
      </span>
    </div>
  );
}