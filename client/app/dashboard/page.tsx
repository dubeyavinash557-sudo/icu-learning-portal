"use client";

import { student, stats, courses, recentActivity } from "@/data/dashboard";
import {
  Award,
  BookOpen,
  Clock,
  ChevronRight,
  Flame,
  GraduationCap,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">

        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 min-h-screen bg-slate-900 text-white flex-col p-6">

          <h1 className="text-2xl font-bold">
            🏥 ICU Learning
          </h1>

          <p className="text-slate-400 mt-2">
            Premium Dashboard
          </p>

          <nav className="mt-10 space-y-3">

            {[
              "Dashboard",
              "My Courses",
              "Notes",
              "Certificates",
              "Profile",
              "Settings",
            ].map((item) => (
              <button
                key={item}
                className="w-full rounded-xl px-4 py-3 text-left transition hover:bg-slate-800"
              >
                {item}
              </button>
            ))}

          </nav>

        </aside>

        {/* Main Content */}
        <section className="flex-1 p-8">

          {/* Welcome */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-500 p-8 text-white shadow-xl">

            <h2 className="text-4xl font-bold">
              Welcome, {student.name}
            </h2>

            <p className="mt-2 text-lg opacity-90">
              Continue your ICU Nursing learning journey.
            </p>

            <div className="mt-6 h-3 w-full rounded-full bg-white/30">

              <div
                className="h-3 rounded-full bg-white"
                style={{ width: `${student.progress}%` }}
              />

            </div>

            <p className="mt-3">
              Overall Progress: {student.progress}%
            </p>

          </div>
                    {/* Stats Cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-sm text-slate-500">{item.title}</p>

                <h3 className="mt-3 text-3xl font-bold text-slate-900">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>

          {/* My Courses */}
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <BookOpen size={24} />
                My Courses
              </h2>

              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                View All
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {course.title}
                      </h3>

                      <p className="mt-1 text-slate-500">
                        {course.completed} / {course.lessons} Lessons Completed
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="mt-4 h-3 rounded-full bg-slate-200">
                    <div
                      className="h-3 rounded-full bg-blue-600"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
                    {/* Bottom Section */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            {/* Continue Learning */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <GraduationCap size={24} />
                Continue Learning
              </h2>

              <h3 className="mt-6 text-xl font-semibold">
                🫁 Mechanical Ventilator
              </h3>

              <p className="mt-2 text-slate-500">
                Next Lesson: SIMV Mode
              </p>

              <div className="mt-5 h-3 rounded-full bg-slate-200">
                <div className="h-3 w-[65%] rounded-full bg-blue-600"></div>
              </div>

              <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                Continue Course
              </button>

            </div>

            {/* Recent Activity */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <Clock size={24} />
                Recent Activity
              </h2>

              <div className="mt-6 space-y-4">

                {recentActivity.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                  >
                    <div>

                      <p className="font-medium">
                        {item.title}
                      </p>

                      <p className="text-sm text-slate-500">
                        {item.time}
                      </p>

                    </div>

                    <ChevronRight size={18} />

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Footer Stats */}
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-orange-500 to-yellow-400 p-8 text-white shadow-xl">

            <div className="flex items-center gap-3">

              <Award size={32} />

              <div>

                <h2 className="text-2xl font-bold">
                  Certificates Earned
                </h2>

                <p>
                  {student.certificates} Certificate Unlocked
                </p>

              </div>

            </div>

            <div className="mt-6 flex items-center gap-2">

              <Flame size={22} />

              <span>
                {student.streak} Days Learning Streak 🔥
              </span>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}