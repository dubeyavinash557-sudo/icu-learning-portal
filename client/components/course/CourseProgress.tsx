import {
  CheckCircle2,
  Trophy,
} from "lucide-react";

type Props = {
  progress: number;
  completedLessons: number;
  remainingLessons: number;
  totalLessons: number;
  isCourseCompleted: boolean;
};

export default function CourseProgress({
  progress,
  completedLessons,
  remainingLessons,
  totalLessons,
  isCourseCompleted,
}: Props) {
  const safeProgress = Math.min(
    Math.max(progress, 0),
    100
  );

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

      {/* Header */}

      <div className="flex flex-col gap-5 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
            Learning Analytics
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Course Progress
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Track your learning journey and course
            completion.
          </p>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          {isCourseCompleted ? (
            <CheckCircle2 size={30} />
          ) : (
            <Trophy size={30} />
          )}
        </div>

      </div>

      <div className="p-6 sm:p-8">

        {/* Progress */}

        <div>

          <div className="mb-3 flex items-center justify-between gap-4">

            <span className="text-sm font-bold text-slate-600">
              Overall Progress
            </span>

            <span className="text-sm font-black text-blue-700">
              {safeProgress}%
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 transition-all duration-700"
              style={{
                width: `${safeProgress}%`,
              }}
            />

          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-400">

            <span>
              {completedLessons} completed
            </span>

            <span>
              {totalLessons} total lessons
            </span>

          </div>

        </div>

        {/* Metrics */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <ProgressMetric
            value={`${completedLessons}`}
            label="Lessons Completed"
            icon={
              <CheckCircle2
                size={22}
              />
            }
          />

          <ProgressMetric
            value={`${remainingLessons}`}
            label="Lessons Remaining"
            icon={
              <Trophy size={22} />
            }
          />

          <ProgressMetric
            value={`${safeProgress}%`}
            label={
              isCourseCompleted
                ? "Course Completed"
                : "Course Progress"
            }
            icon={
              <CheckCircle2
                size={22}
              />
            }
          />

        </div>

        {/* Completion Message */}

        {isCourseCompleted ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <CheckCircle2
                  size={21}
                />
              </div>

              <div>
                <h3 className="font-black text-emerald-900">
                  Course Completed
                </h3>

                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Congratulations! You have completed
                  all lessons in this course.
                </p>
              </div>

            </div>

          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">

            <p className="text-sm font-bold text-blue-900">
              Keep going!
            </p>

            <p className="mt-1 text-sm leading-6 text-blue-700">
              Complete the remaining lessons to finish
              the course and become eligible for your
              completion certificate.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}

function ProgressMetric({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-2xl font-black text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
            {label}
          </p>

        </div>

      </div>

    </div>
  );
}