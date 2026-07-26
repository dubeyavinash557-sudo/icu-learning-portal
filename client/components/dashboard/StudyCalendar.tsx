"use client";

import {
  CalendarDays,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const schedule = [
  {
    day: "Monday",
    title: "Ventilator Modes Revision",
    time: "07:00 PM",
    completed: true,
  },
  {
    day: "Tuesday",
    title: "ECG Interpretation Practice",
    time: "08:00 PM",
    completed: false,
  },
  {
    day: "Wednesday",
    title: "ABG Case Discussion",
    time: "07:30 PM",
    completed: false,
  },
  {
    day: "Thursday",
    title: "Medical Coding Quiz",
    time: "09:00 PM",
    completed: false,
  },
];

export default function StudyCalendar() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Weekly Study Calendar
        </h2>

        <p className="mt-2 text-slate-500">
          Stay organized with your planned learning schedule.
        </p>

      </div>

      <div className="space-y-4">

        {schedule.map((item) => (

          <div
            key={item.day}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-md lg:flex-row lg:items-center lg:justify-between"
          >

            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-blue-100 p-3">
                <CalendarDays className="text-blue-600" size={24} />
              </div>

              <div>

                <h3 className="font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.day}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-6">

              <div className="flex items-center gap-2 text-slate-500">
                <Clock3 size={18} />
                {item.time}
              </div>

              {item.completed ? (
                <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                  <CheckCircle2 size={16} />
                  Completed
                </span>
              ) : (
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                  Scheduled
                </span>
              )}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}