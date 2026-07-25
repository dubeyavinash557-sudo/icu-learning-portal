"use client";

import {
  CheckCircle,
  Download,
  Trophy,
  Clock,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Completed Ventilator Basics",
    description: "Mechanical Ventilator Course",
    time: "Today",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    id: 2,
    title: "Downloaded ICU Notes PDF",
    description: "ICU Nursing Notes",
    time: "Yesterday",
    icon: Download,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    id: 3,
    title: "Passed ECG Quiz",
    description: "Score 92%",
    time: "2 Days Ago",
    icon: Trophy,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
];

export default function RecentActivity() {
  return (
    <section className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Recent Activity
          </h2>

          <p className="text-gray-500 mt-1">
            Your latest learning activities.
          </p>

        </div>

        <Clock className="text-blue-600" />

      </div>

      <div className="space-y-6">
                {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${activity.bg} flex items-center justify-center`}
              >
                <Icon className={activity.color} size={22} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {activity.description}
                </p>
              </div>

              {/* Time */}
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}