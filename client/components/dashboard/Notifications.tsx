"use client";

import {
  Bell,
  Calendar,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New ICU Course Available",
    message: "Advanced Hemodynamic Monitoring has been added.",
    time: "10 min ago",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Upcoming Live Class",
    message: "Ventilator Management - Tomorrow 7:00 PM",
    time: "Today",
    icon: Calendar,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Quiz Reminder",
    message: "Complete your ECG Quiz before tonight.",
    time: "Today",
    icon: ClipboardCheck,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function Notifications() {
  return (
    <section className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Notifications
          </h2>

          <p className="text-gray-500 mt-1">
            Stay updated with your latest learning alerts.
          </p>

        </div>

        <Bell className="text-blue-600" size={26} />

      </div>

      <div className="space-y-5">
                {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={22} />
              </div>

              {/* Content */}
              <div className="flex-1">

                <h3 className="font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.message}
                </p>

              </div>

              {/* Time */}
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
                {item.time}
              </span>

            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">

        <h3 className="text-xl font-bold">
          Stay Connected 📢
        </h3>

        <p className="mt-2 text-blue-100">
          Enable notifications so you never miss a live class,
          new ICU course, quiz reminder, or important announcement.
        </p>

      </div>

    </section>
  );
}