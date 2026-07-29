import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Download,
  CheckCircle,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: Props) {
  const { id, lessonId } = await params;

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      lessons: {
        orderBy: {
          lessonOrder: "asc",
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const lesson = course.lessons.find(
    (item) => item.id === lessonId
  );

  if (!lesson) {
    notFound();
  }

  const currentIndex = course.lessons.findIndex(
    (item) => item.id === lesson.id
  );

  const previousLesson =
    currentIndex > 0
      ? course.lessons[currentIndex - 1]
      : null;

  const nextLesson =
    currentIndex < course.lessons.length - 1
      ? course.lessons[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl px-6 py-10">

                <div className="mb-8 flex items-center justify-between">

          <Link
            href={`/courses/${course.id}`}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold shadow hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Back to Course
          </Link>

          <div className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
            Lesson {lesson.lessonOrder} / {course.lessons.length}
          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <h1 className="text-4xl font-bold">
            {lesson.title}
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            {lesson.description}
          </p>

          <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-black">

            {lesson.videoUrl ? (
              <video
                controls
                className="h-full w-full"
                src={lesson.videoUrl}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xl font-semibold text-white">
                🎥 Video Coming Soon
              </div>
            )}

          </div>

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="rounded-xl bg-blue-100 px-5 py-3 font-semibold text-blue-700">
              Duration: {lesson.duration} Minutes
            </div>

            <div className="rounded-xl bg-green-100 px-5 py-3 font-semibold text-green-700">
              <CheckCircle className="mr-2 inline" size={18} />
              Premium Lesson
            </div>

          </div>

                      {lesson.notesUrl && (
            <div className="mt-8">

              <a
                href={lesson.notesUrl}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                <Download size={18} />
                Download Notes
              </a>

            </div>
          )}

          <div className="mt-12 flex flex-wrap justify-between gap-4">

            {previousLesson ? (
              <Link
                href={`/courses/${course.id}/lesson/${previousLesson.id}`}
                className="rounded-xl bg-slate-200 px-6 py-3 font-semibold transition hover:bg-slate-300"
              >
                ← Previous Lesson
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/courses/${course.id}/lesson/${nextLesson.id}`}
                className="flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Next Lesson
                <ArrowRight size={18} />
              </Link>
            ) : (
              <div className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white">
                🎉 Course Completed
              </div>
            )}

          </div>

        </div>

              </div>

    </main>
  );
}