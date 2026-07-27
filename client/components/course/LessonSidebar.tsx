"use client";

import {
  CheckCircle2,
  Lock,
  PlayCircle,
} from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "ICU Introduction",
    duration: "18 min",
    completed: true,
    locked: false,
  },
  {
    id: 2,
    title: "Patient Assessment",
    duration: "22 min",
    completed: false,
    locked: false,
  },
  {
    id: 3,
    title: "Vital Signs Monitoring",
    duration: "25 min",
    completed: false,
    locked: false,
  },
  {
    id: 4,
    title: "Ventilator Basics",
    duration: "32 min",
    completed: false,
    locked: true,
  },
  {
    id: 5,
    title: "ABG Interpretation",
    duration: "28 min",
    completed: false,
    locked: true,
  },
];

export default function LessonSidebar() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-slate-900">
        Course Lessons
      </h2>

      <p className="mt-2 text-slate-500">
        Complete lessons one by one.
      </p>

      <div className="mt-6 space-y-4">

        {lessons.map((lesson) => (

          <div
            key={lesson.id}
            className="rounded-2xl border border-slate-200 p-4 transition hover:border-blue-400 hover:shadow-md"
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                {lesson.completed ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={22}
                  />
                ) : lesson.locked ? (
                  <Lock
                    className="text-slate-400"
                    size={22}
                  />
                ) : (
                  <PlayCircle
                    className="text-blue-600"
                    size={22}
                  />
                )}

                <div>

                  <h3 className="font-semibold text-slate-900">
                    {lesson.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {lesson.duration}
                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}