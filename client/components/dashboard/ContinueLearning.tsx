"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

type ContinueLearningProps = {
  courseTitle?: string | null;
  courseId: string | null;
  nextLessonId: string | null;
  nextLessonTitle?: string | null;
  progress: number;
  completedLessons: number;
  totalLessons: number;
};

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

export default function ContinueLearning({
  courseTitle,
  courseId,
  nextLessonId,
  nextLessonTitle,
  progress,
  completedLessons,
  totalLessons,
}: ContinueLearningProps) {
  const safeProgress = clampProgress(progress);

  const safeCompletedLessons = Math.max(
    0,
    completedLessons
  );

  const safeTotalLessons = Math.max(0, totalLessons);

  const remainingLessons = Math.max(
    0,
    safeTotalLessons - safeCompletedLessons
  );

  const hasCourse = Boolean(courseId);

  const continueHref =
    courseId && nextLessonId
      ? `/courses/${courseId}/lesson/${nextLessonId}`
      : courseId
      ? `/courses/${courseId}`
      : "/courses";

  const isCompleted =
    hasCourse &&
    safeTotalLessons > 0 &&
    safeCompletedLessons >= safeTotalLessons;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">
            <BookOpen size={15} />
            Continue Learning
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {hasCourse
              ? courseTitle || "Your enrolled course"
              : "Start your learning journey"}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            {hasCourse
              ? isCompleted
                ? "You have completed all available lessons in this course."
                : nextLessonTitle
                ? `Next lesson: ${nextLessonTitle}`
                : "Continue from where you stopped."
              : "Explore structured ICU courses and enrol in a programme that fits your learning goals."}
          </p>

          {hasCourse && (
            <div className="mt-7 max-w-2xl">
              <div className="mb-2 flex items-center justify-between gap-4 text-sm font-bold text-slate-700">
                <span>Course progress</span>

                <span>{safeProgress}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 transition-all duration-500"
                  style={{
                    width: `${safeProgress}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500 sm:text-sm">
                <span>
                  {safeCompletedLessons}/{safeTotalLessons}{" "}
                  lessons completed
                </span>

                <span>
                  {remainingLessons} lessons remaining
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:w-80">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white">
            {isCompleted ? (
              <CheckCircle2 size={22} />
            ) : (
              <PlayCircle size={22} />
            )}
          </div>

          <h3 className="mt-4 text-lg font-black text-slate-950">
            {isCompleted
              ? "Course completed"
              : hasCourse
              ? "Resume your course"
              : "Choose a course"}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {isCompleted
              ? "Review the course content or view your certificate status."
              : hasCourse
              ? "Open your next available lesson."
              : "Browse the available ICU learning programmes."}
          </p>

          <Link
            href={continueHref}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
          >
            {isCompleted
              ? "Review Course"
              : hasCourse
              ? "Continue Learning"
              : "Explore Courses"}
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}