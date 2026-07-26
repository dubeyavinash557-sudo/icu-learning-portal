"use client";

import {
  Video,
  Calendar,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";

const classes = [
  {
    id: 1,
    title: "Advanced Ventilator Management",
    instructor: "Dr. Rajesh Sharma",
    date: "Tomorrow",
    time: "7:00 PM",
    live: true,
  },
  {
    id: 2,
    title: "ECG Masterclass",
    instructor: "Dr. Priya Singh",
    date: "Tuesday",
    time: "8:00 PM",
    live: false,
  },
  {
    id: 3,
    title: "ABG Interpretation Workshop",
    instructor: "Dr. Amit Kumar",
    date: "Friday",
    time: "6:30 PM",
    live: false,
  },
];

export default function LiveClasses() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Upcoming Live Classes
        </h2>

        <p className="mt-2 text-slate-500">
          Join upcoming expert-led ICU training sessions.
        </p>

      </div>

      <div className="space-y-5">

        {classes.map((item) => (

          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-lg transition"
          >

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-red-100 p-3">

                  <Video className="text-red-600" size={28} />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-500">

                    <span className="flex items-center gap-2">
                      <User size={16} />
                      {item.instructor}
                    </span>

                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {item.date}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {item.time}
                    </span>

                  </div>

                </div>

              </div>

              <div className="flex items-center gap-3">

                {item.live && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                    LIVE
                  </span>
                )}

                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition">

                  Join Class

                  <ArrowRight size={18} />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}