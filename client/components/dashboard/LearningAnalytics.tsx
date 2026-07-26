"use client";

import {
  TrendingUp,
  BookOpen,
  Clock3,
  Target,
} from "lucide-react";

const analytics = [
  {
    title: "Study Hours",
    value: "148 hrs",
    icon: Clock3,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Lessons Completed",
    value: "132",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Quiz Average",
    value: "92%",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Monthly Goal",
    value: "78%",
    icon: Target,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function LearningAnalytics() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Learning Analytics
        </h2>

        <p className="mt-2 text-slate-500">
          Track your learning performance and monthly progress.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {analytics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition"
            >

              <div className={`inline-flex rounded-xl p-3 ${item.color}`}>
                <Icon size={28} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-600">
                {item.title}
              </h3>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {item.value}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}