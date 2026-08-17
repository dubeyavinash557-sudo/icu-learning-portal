import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import CompleteLessonButton from "@/components/course/CompleteLessonButton";

type Lesson = {
  id: string;
  title: string;
};

type Props = {
  courseId: string;
  lessonId: string;
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
  isCompleted: boolean;
};

export default function LessonNavigation({
  courseId,
  lessonId,
  previousLesson,
  nextLesson,
  isCompleted,
}: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

      <div className="p-6 sm:p-8">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Previous */}

          <div className="order-2 lg:order-1">

            {previousLesson ? (
              <Link
                href={`/courses/${courseId}/lesson/${previousLesson.id}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:w-auto"
              >
                <ArrowLeft
                  size={17}
                  className="transition-transform group-hover:-translate-x-1"
                />

                Previous Lesson
              </Link>
            ) : (
              <Link
                href={`/courses/${courseId}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                <ArrowLeft size={17} />

                Course Overview
              </Link>
            )}

          </div>

          {/* Complete */}

          <div className="order-1 lg:order-2">

            <CompleteLessonButton
              lessonId={lessonId}
              isCompleted={isCompleted}
              nextLessonUrl={
                nextLesson
                  ? `/courses/${courseId}/lesson/${nextLesson.id}`
                  : null
              }
            />

          </div>

          {/* Next */}

          <div className="order-3">

            {nextLesson ? (
              <Link
                href={`/courses/${courseId}/lesson/${nextLesson.id}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 sm:w-auto"
              >
                Next Lesson

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <div className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white sm:w-auto">
                <CheckCircle2
                  size={17}
                />

                Final Lesson
              </div>
            )}

          </div>

        </div>

        {/* Current Lesson Indicator */}

        <div className="mt-6 border-t border-slate-100 pt-5 text-center">

          <p className="text-xs font-semibold text-slate-400">
            Use the navigation above to move through
            your course curriculum.
          </p>

        </div>

      </div>

    </section>
  );
}