"use client";

import { CheckCircle2, Circle } from "lucide-react";

const studyPlan = [
  {
    id: 1,
    title: "Ventilator Modes Revision",
    duration: "30 min",
    completed: true,
  },
  {
    id: 2,
    title: "ECG Interpretation Practice",
    duration: "45 min",
    completed: false,
  },
  {
    id: 3,
    title: "ABG Case Study",
    duration: "20 min",
    completed: false,
  },
  {
    id: 4,
    title: "Medical Coding Chapter 2",
    duration: "40 min",
    completed: false,
  },
];

export default function StudyPlan() {
  const completed = studyPlan.filter(
    (item) => item.completed
  ).length;

  return (
    <section className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Today's Study Plan
          </h2>

          <p className="text-gray-500 mt-1">
            Stay on track with today's learning goals.
          </p>

        </div>

        <div className="text-blue-600 font-bold">
          {completed}/{studyPlan.length}
        </div>

      </div>

      <div className="space-y-4">
                {studyPlan.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">

              {item.completed ? (
                <CheckCircle2
                  size={24}
                  className="text-green-600"
                />
              ) : (
                <Circle
                  size={24}
                  className="text-gray-400"
                />
              )}

              <div>
                <h3
                  className={`font-semibold ${
                    item.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">
                  Duration: {item.duration}
                </p>
              </div>

            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                item.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {item.completed ? "Completed" : "Pending"}
            </span>

          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
        <h3 className="font-bold text-lg">
          Daily Goal
        </h3>

        <p className="text-blue-100 mt-2">
          Complete at least <strong>2 learning tasks</strong> today to
          maintain your learning streak and improve your ICU skills.
        </p>
      </div>

    </section>
  );
}