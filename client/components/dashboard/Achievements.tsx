"use client";

import {
  Trophy,
  Flame,
  Award,
  Star,
} from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "18 Day Learning Streak",
    description: "Keep learning every day.",
    icon: Flame,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    title: "1 Certificate Earned",
    description: "Completed ICU Certification.",
    icon: Award,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Premium Member",
    description: "Access to all premium courses.",
    icon: Star,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "Top Performer",
    description: "Quiz Average 92%",
    icon: Trophy,
    color: "from-green-500 to-emerald-500",
  },
];

export default function Achievements() {
  return (
    <section className="bg-white rounded-3xl shadow-xl p-8">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Achievements
        </h2>

        <p className="text-gray-500 mt-1">
          Celebrate your learning milestones.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg mb-5`}
              >
                <Icon size={30} />
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {item.description}
              </p>

              <div className="mt-5">
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  ✓ Unlocked
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Card */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white">

        <h3 className="text-xl font-bold">
          Keep Going! 🚀
        </h3>

        <p className="mt-2 text-blue-100">
          You're making excellent progress. Complete more courses,
          maintain your daily streak, and unlock new achievements.
        </p>

      </div>

    </section>
  );
}