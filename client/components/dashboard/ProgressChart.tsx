"use client";

import { TrendingUp } from "lucide-react";

const weeklyProgress = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 2 },
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 4 },
];

export default function ProgressChart() {
  const maxHours = Math.max(...weeklyProgress.map((item) => item.hours));

  return (
    <section className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Weekly Learning Progress
          </h2>

          <p className="text-gray-500 mt-1">
            Your study hours for the last 7 days.
          </p>

        </div>

        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

          <TrendingUp className="text-blue-600" size={26} />

        </div>

      </div>

      <div className="flex items-end justify-between h-72 gap-4">
                {weeklyProgress.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center flex-1"
          >
            {/* Bar */}
            <div className="flex items-end h-56 w-full">
              <div
                className="w-full rounded-t-2xl bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-700 hover:scale-105"
                style={{
                  height: `${(item.hours / maxHours) * 100}%`,
                }}
              />
            </div>

            {/* Hours */}
            <span className="mt-3 text-sm font-semibold text-blue-600">
              {item.hours}h
            </span>

            {/* Day */}
            <span className="mt-1 text-sm text-gray-500">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-3 gap-4">

        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-sm text-gray-500">Total Hours</p>
          <h3 className="text-2xl font-bold text-blue-600">
            {weeklyProgress.reduce((sum, item) => sum + item.hours, 0)}h
          </h3>
        </div>

        <div className="rounded-2xl bg-green-50 p-4 text-center">
          <p className="text-sm text-gray-500">Best Day</p>
          <h3 className="text-2xl font-bold text-green-600">
            Sat
          </h3>
        </div>

        <div className="rounded-2xl bg-purple-50 p-4 text-center">
          <p className="text-sm text-gray-500">Average</p>
          <h3 className="text-2xl font-bold text-purple-600">
            3.7h
          </h3>
        </div>

      </div>

    </section>
  );
}