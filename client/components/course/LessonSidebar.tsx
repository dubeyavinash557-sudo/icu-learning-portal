import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  Lock,
  PlayCircle,
} from "lucide-react";

type LessonItem = {
  id: string;
  title: string;
  duration: number;
  lessonOrder: number;
};

type Props = {
  courseId: string;
  lessons: LessonItem[];
  completedLessonIds: string[];
  currentLessonId: string;
};

export default function LessonSidebar({
  courseId,
  lessons,
  completedLessonIds,
  currentLessonId,
}: Props) {
  const completedSet = new Set(
    completedLessonIds
  );

  const completedCount =
    completedSet.size;

  const totalLessons = lessons.length;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

      {/* Header */}

      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 to-blue-950 p-6 text-white">

        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
          Course Curriculum
        </p>

        <h2 className="mt-2 text-2xl font-black">
          Course Lessons
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Complete the lessons step by step.
        </p>

        <div className="mt-5 flex items-center justify-between">

          <span className="text-xs font-semibold text-slate-400">
            Your Progress
          </span>

          <span className="text-sm font-black text-cyan-300">
            {completedCount}/{totalLessons}
          </span>

        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-500"
            style={{
              width:
                totalLessons > 0
                  ? `${Math.min(
                      (completedCount /
                        totalLessons) *
                        100,
                      100
                    )}%`
                  : "0%",
            }}
          />

        </div>

      </div>

      {/* Lessons */}

      <div className="max-h-[700px] overflow-y-auto p-4">

        <div className="space-y-3">

          {lessons.map((lesson) => {
            const completed =
              completedSet.has(
                lesson.id
              );

            const current =
              lesson.id ===
              currentLessonId;

            return (
              <Link
                key={lesson.id}
                href={`/courses/${courseId}/lesson/${lesson.id}`}
                className={`group block rounded-2xl border p-4 transition-all duration-200 ${
                  current
                    ? "border-blue-300 bg-blue-50 shadow-sm"
                    : completed
                    ? "border-emerald-200 bg-emerald-50/60 hover:border-emerald-300"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                }`}
              >

                <div className="flex items-start gap-3">

                  {/* Status Icon */}

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      completed
                        ? "bg-emerald-600 text-white"
                        : current
                        ? "bg-blue-700 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2
                        size={19}
                      />
                    ) : current ? (
                      <PlayCircle
                        size={19}
                      />
                    ) : (
                      <Lock
                        size={17}
                      />
                    )}
                  </div>

                  {/* Lesson Details */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div className="min-w-0">

                        <p
                          className={`text-[10px] font-black uppercase tracking-wider ${
                            current
                              ? "text-blue-600"
                              : "text-slate-400"
                          }`}
                        >
                          Lesson{" "}
                          {String(
                            lesson.lessonOrder
                          ).padStart(
                            2,
                            "0"
                          )}
                        </p>

                        <h3
                          className={`mt-1 line-clamp-2 text-sm font-black ${
                            current
                              ? "text-blue-900"
                              : "text-slate-800"
                          }`}
                        >
                          {lesson.title}
                        </h3>

                      </div>

                      {current && (
                        <span className="shrink-0 rounded-full bg-blue-700 px-2 py-1 text-[9px] font-black uppercase text-white">
                          Current
                        </span>
                      )}

                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">

                      <Clock3
                        size={13}
                      />

                      {formatDuration(
                        lesson.duration
                      )}

                    </div>

                    {completed && (
                      <div className="mt-2 text-[10px] font-black uppercase tracking-wide text-emerald-700">
                        Completed
                      </div>
                    )}

                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
}

function formatDuration(
  minutes: number
) {
  if (
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return "Self-paced";
  }

  const hours = Math.floor(
    minutes / 60
  );

  const remaining =
    minutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (remaining === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${remaining}m`;
}