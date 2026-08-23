"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Loader2,
  PlayCircle,
  RefreshCw,
} from "lucide-react";

type NextLesson = {
  id: string;
  title: string;
  lessonOrder: number;
};

type Certificate = {
  id: string;
  certificateNo: string;
  issuedAt: string;
};

type EnrolledCourse = {
  id: string;
  enrolledAt: string;
  progress: number;
  completed: boolean;
  totalLessons: number;
  completedLessons: number;
  remainingLessons: number;
  nextLesson: NextLesson | null;
  certificate: Certificate | null;
  course: {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: number;
    language: string;
    level: string;
  };
};

type MyCoursesResponse = {
  success?: boolean;
  courses?: EnrolledCourse[];
  message?: string;
};

function safeProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function MyCourses() {
  const [courses, setCourses] = useState<
    EnrolledCourse[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCourses() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/my-courses", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        const data =
          (await response.json()) as MyCoursesResponse;

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load your courses."
          );
        }

        setCourses(
          Array.isArray(data.courses)
            ? data.courses
            : []
        );
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        console.error(
          "MY COURSES LOAD ERROR:",
          requestError
        );

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load your courses."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadCourses();

    return () => controller.abort();
  }, [retryKey]);

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Loader2
              size={22}
              className="animate-spin"
            />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-950">
              My Courses
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Loading your enrolled courses…
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-slate-200 p-5"
            >
              <div className="h-5 w-2/3 rounded bg-slate-200" />
              <div className="mt-4 h-4 w-full rounded bg-slate-100" />
              <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
              <div className="mt-7 h-3 w-full rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 rounded-2xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={22}
              className="mt-0.5 shrink-0 text-red-700"
            />

            <div>
              <h2 className="font-black text-red-950">
                Unable to load your courses
              </h2>

              <p className="mt-1 text-sm leading-6 text-red-800">
                {error}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setRetryKey((value) => value + 1)
            }
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-800"
          >
            <RefreshCw size={17} />
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
          <BookOpen size={27} />
        </div>

        <h2 className="mt-5 text-2xl font-black text-slate-950">
          No enrolled courses yet
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
          Explore ICU Learning Portal courses and enrol in a
          program to begin your structured learning journey.
        </p>

        <Link
          href="/courses"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
        >
          Explore Courses
          <ArrowRight size={17} />
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
            Learning Library
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
            My Courses
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Your enrolled courses and current lesson progress.
          </p>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
        >
          Browse all courses
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {courses.map((item) => {
          const progress = safeProgress(item.progress);

          const continueHref = item.nextLesson
            ? `/courses/${item.course.id}/lesson/${item.nextLesson.id}`
            : `/courses/${item.course.id}`;

          return (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-slate-200 p-5 transition hover:border-cyan-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <BookOpen size={23} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-black leading-6 text-slate-950">
                    {item.course.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {item.course.instructor} ·{" "}
                    {item.course.language} ·{" "}
                    {item.course.level}
                  </p>
                </div>
              </div>

              <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-600">
                {item.course.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen
                    size={15}
                    className="text-blue-700"
                  />
                  {item.completedLessons}/{item.totalLessons}{" "}
                  lessons
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3
                    size={15}
                    className="text-cyan-700"
                  />
                  {item.remainingLessons} remaining
                </span>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                  <span>Course progress</span>
                  <span className="text-blue-700">
                    {progress}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-700"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              {item.nextLesson && !item.completed && (
                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">
                    Next lesson
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-950">
                    Lesson {item.nextLesson.lessonOrder}:{" "}
                    {item.nextLesson.title}
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                {item.certificate ? (
                  <div className="text-xs font-semibold text-emerald-700">
                    <span className="inline-flex items-center gap-1">
                      <Award size={15} />
                      Certificate issued
                    </span>

                    <p className="mt-1 text-slate-500">
                      {formatDate(item.certificate.issuedAt)}
                    </p>
                  </div>
                ) : item.completed ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                    <Clock3 size={15} />
                    Certificate processing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <CheckCircle2 size={15} />
                    Complete all lessons for certificate
                  </span>
                )}

                <Link
                  href={continueHref}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 transition hover:text-blue-900"
                >
                  {item.completed
                    ? "Review course"
                    : "Continue learning"}
                  {item.completed ? (
                    <ArrowRight size={16} />
                  ) : (
                    <PlayCircle size={17} />
                  )}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}