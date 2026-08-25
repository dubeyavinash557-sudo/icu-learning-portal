"use client";

import {
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Target,
  Award,
} from "lucide-react";

type Props = {
  totalCourses: number;
  completedCourses: number;
  completedLessons: number;
  quizAverage: number;
  passedQuizzes: number;
  overallProgress: number;
};

export default function LearningAnalytics({
  totalCourses,
  completedCourses,
  completedLessons,
  quizAverage,
  passedQuizzes,
  overallProgress,
}: Props) {
  const analytics = [
    {
      title: "Enrolled Courses",
      value: String(totalCourses),
      icon: BookOpen,
      description:
        totalCourses === 1
          ? "Active learning program"
          : "Active learning programs",
      iconClass:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },

    {
      title: "Completed Courses",
      value: String(completedCourses),
      icon: CheckCircle2,
      description:
        completedCourses === 0
          ? "Keep learning to complete your first course"
          : `${completedCourses} course${
              completedCourses === 1 ? "" : "s"
            } completed`,
      iconClass:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },

    {
      title: "Lessons Completed",
      value: String(completedLessons),
      icon: BookOpen,
      description:
        completedLessons === 0
          ? "No completed lessons yet"
          : "Lessons successfully completed",
      iconClass:
        "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
    },

    {
      title: "Quiz Average",
      value: `${quizAverage}%`,
      icon: TrendingUp,
      description:
  passedQuizzes === 0
    ? "No passed quizzes yet"
    : `${passedQuizzes} ${
        passedQuizzes === 1
          ? "quiz"
          : "quizzes"
      } passed`,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
            Performance
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Learning Analytics
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Track your actual course completion,
            lesson activity and quiz performance.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <Target size={24} />
        </div>

      </div>

      {/* ==================================================
          ANALYTIC CARDS
      ================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {analytics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            >
              <div
                className={`inline-flex rounded-xl p-3 ${item.iconClass}`}
              >
                <Icon size={23} />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {item.title}
              </p>

              <p className="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {item.value}
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400 dark:text-slate-500">
                {item.description}
              </p>
            </div>
          );
        })}

      </div>

      {/* ==================================================
          OVERALL PROGRESS
      ================================================== */}

      <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 dark:border-blue-900/40 dark:from-blue-950/30 dark:to-cyan-950/30">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Award size={20} />
            </div>

            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                Overall Learning Progress
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Based on lessons completed in your enrolled courses.
              </p>
            </div>

          </div>

          <span className="text-2xl font-black text-blue-700 dark:text-blue-400">
            {Math.min(
              100,
              Math.max(0, overallProgress)
            )}
            %
          </span>

        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white dark:bg-slate-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-700"
            style={{
              width: `${Math.min(
                100,
                Math.max(0, overallProgress)
              )}%`,
            }}
          />

        </div>

      </div>

    </section>
  );
}