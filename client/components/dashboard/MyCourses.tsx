"use client";

import {
  BookOpen,
  ArrowRight,
  Star,
  Clock3,
  BadgeCheck,
  Crown,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "ICU Nursing Master Course",
    lessons: 120,
    completed: 52,
    progress: 43,
    rating: 4.9,
    certificate: false,
    color: "from-blue-500 to-cyan-500",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Mechanical Ventilator",
    lessons: 80,
    completed: 35,
    progress: 44,
    rating: 4.8,
    certificate: false,
    color: "from-emerald-500 to-green-500",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "ECG Interpretation",
    lessons: 60,
    completed: 15,
    progress: 25,
    rating: 4.7,
    certificate: false,
    color: "from-purple-500 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    title: "ABG Analysis",
    lessons: 45,
    completed: 20,
    progress: 45,
    rating: 4.8,
    certificate: false,
    color: "from-orange-500 to-amber-500",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    title: "Medical Coding",
    lessons: 100,
    completed: 10,
    progress: 10,
    rating: 4.9,
    certificate: false,
    color: "from-rose-500 to-red-500",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop",
  },
];

export default function MyCourses() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-slate-900">
            My Courses
          </h2>

          <p className="mt-2 text-slate-500">
            Continue your enrolled ICU learning programs.
          </p>

        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition">
          View All
        </button>

      </div>

      <div className="grid gap-6">

        {courses.map((course) => (

          <div
            key={course.id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="flex flex-col lg:flex-row">

              {/* Image */}
              <img
                src={course.image}
                alt={course.title}
                className="h-52 w-full object-cover lg:w-72"
              />

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-6">

                <div>

                  <div className="mb-3 flex flex-wrap items-center gap-3">

                    <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                      <Crown size={16} />
                      Premium
                    </span>

                    <span className="flex items-center gap-1 text-amber-500">
                      <Star size={16} fill="currentColor" />
                      {course.rating}
                    </span>

                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {course.title}
                  </h3>

                  <p className="mt-3 text-slate-500">
                    {course.completed} / {course.lessons} Lessons Completed
                  </p>

                  <div className="mt-3 flex flex-wrap gap-6 text-sm text-slate-500">

                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />
                      {course.lessons - course.completed} Lessons Remaining
                    </div>

                    <div className="flex items-center gap-2">
                      <BadgeCheck size={16} />
                      {course.certificate
                        ? "Certificate Earned"
                        : "Certificate Locked"}
                    </div>

                  </div>

                  {/* Progress */}

                  <div className="mt-6">

                    <div className="mb-2 flex justify-between text-sm font-semibold">

                      <span>Progress</span>

                      <span>{course.progress}%</span>

                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

                <div className="mt-6">

                  <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">

                    Continue Learning

                    <ArrowRight size={18} />

                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}