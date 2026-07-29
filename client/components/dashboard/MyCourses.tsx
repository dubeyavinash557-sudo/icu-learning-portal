"use client";

import { useEffect, useState } from "react";

import {
  ArrowRight,
  Star,
  Clock3,
  BadgeCheck,
  Crown,
} from "lucide-react";

type Course = {
  id: string;
  progress: number;
  completed: boolean;

  course: {
    id: string;
    title: string;
    image: string;
    rating: number;
    lessons: any[];
  };
};

const colors = [
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-green-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-amber-500",
  "from-rose-500 to-red-500",
];

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch("/api/my-courses");

        if (!res.ok) {
          throw new Error("Failed to load courses");
        }

        const data = await res.json();

        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  if (loading) {
    return (
      <section className="rounded-3xl bg-white p-8 shadow-xl">

        <h2 className="text-3xl font-bold">
          My Courses
        </h2>

        <p className="mt-6 text-gray-500">
          Loading courses...
        </p>

      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="rounded-3xl bg-white p-8 shadow-xl">

        <h2 className="text-3xl font-bold">
          My Courses
        </h2>

        <p className="mt-6 text-gray-500">
          You are not enrolled in any course yet.
        </p>

      </section>
    );
  }

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

        {courses.map((item, index) => {

          const totalLessons = item.course.lessons.length;

          const completedLessons = Math.round(
            (item.progress / 100) * totalLessons
          );

          const remainingLessons =
            totalLessons - completedLessons;

          return (

            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex flex-col lg:flex-row">

                <img
                  src={item.course.image}
                  alt={item.course.title}
                  className="h-52 w-full object-cover lg:w-72"
                />

                <div className="flex flex-1 flex-col justify-between p-6">

                  <div>

                    <div className="mb-3 flex flex-wrap items-center gap-3">

                      <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        <Crown size={16} />
                        Premium
                      </span>

                      <span className="flex items-center gap-1 text-amber-500">
                        <Star size={16} fill="currentColor" />
                        {item.course.rating}
                      </span>

                    </div>

                    <h3 className="text-2xl font-bold text-slate-900">
                      {item.course.title}
                    </h3>

                    <p className="mt-3 text-slate-500">
                      {completedLessons} / {totalLessons} Lessons Completed
                    </p>

                    <div className="mt-3 flex flex-wrap gap-6 text-sm text-slate-500">

                      <div className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {remainingLessons} Lessons Remaining
                      </div>

                      <div className="flex items-center gap-2">
                        <BadgeCheck size={16} />
                        {item.completed
                          ? "Certificate Earned"
                          : "Certificate Locked"}
                      </div>

                    </div>

                    <div className="mt-6">
                                            <div className="mb-2 flex justify-between text-sm font-semibold">

                        <span>Progress</span>

                        <span>{item.progress}%</span>

                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${
                            colors[index % colors.length]
                          }`}
                          style={{
                            width: `${item.progress}%`,
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

          );

        })}

      </div>

    </section>
  );
}