"use client";

import { BookOpen, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "ICU Nursing Master Course",
    lessons: 120,
    completed: 52,
    progress: 43,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Mechanical Ventilator",
    lessons: 80,
    completed: 35,
    progress: 44,
    color: "from-emerald-500 to-green-500",
  },
  {
    id: 3,
    title: "ECG Interpretation",
    lessons: 60,
    completed: 15,
    progress: 25,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "ABG Analysis",
    lessons: 45,
    completed: 20,
    progress: 45,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 5,
    title: "Medical Coding",
    lessons: 100,
    completed: 10,
    progress: 10,
    color: "from-rose-500 to-red-500",
  },
];

export default function MyCourses() {
  return (
    <section className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            My Courses
          </h2>

          <p className="text-gray-500 mt-1">
            Continue your enrolled ICU learning programs.
          </p>

        </div>

        <button className="text-blue-600 font-semibold hover:text-blue-700 transition">
          View All
        </button>

      </div>

      <div className="grid gap-6">

              {courses.map((course) => (
        <div
          key={course.id}
          className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* Left */}
            <div className="flex items-start gap-4 flex-1">

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center text-white shadow-lg`}
              >
                <BookOpen size={28} />
              </div>

              <div className="flex-1">

                <h3 className="text-xl font-bold text-gray-800">
                  {course.title}
                </h3>

                <p className="text-gray-500 mt-1">
                  {course.completed} / {course.lessons} Lessons Completed
                </p>

                {/* Progress */}
                <div className="mt-4">

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-semibold text-blue-600">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${course.color} rounded-full transition-all duration-700`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                </div>

              </div>

            </div>

            {/* Right */}
            <div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition">

                Continue

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