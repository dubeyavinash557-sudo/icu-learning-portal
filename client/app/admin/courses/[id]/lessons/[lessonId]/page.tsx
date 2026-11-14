
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  FileText,
  Video,
  Pencil,
  GraduationCap,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}

export default async function LessonDetailsPage({
  params,
}: PageProps) {
  const { id, lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!lesson || lesson.courseId !== id) {
    notFound();
  }

  const isPrivateVideo = lesson.videoUrl.startsWith("videos/");

  const videoSource = isPrivateVideo
    ? `/api/videos/${lesson.videoUrl}`
    : lesson.videoUrl;

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href={`/admin/courses/${id}/lessons`}
            className="mb-5 inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Lessons
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Lesson Details
          </h1>

          <p className="mt-2 text-slate-500">
            {lesson.course.title}
          </p>
        </div>

        <Link
          href={`/admin/courses/${id}/lessons/${lesson.id}/edit`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Pencil size={18} />
          Edit Lesson
        </Link>
      </div>

      {/* Lesson Information */}

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <BookOpen size={25} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Lesson {lesson.lessonOrder}
              </p>

              <h2 className="text-2xl font-bold text-slate-900">
                {lesson.title}
              </h2>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-lg font-bold text-slate-900">
              Description
            </h3>

            <p className="whitespace-pre-wrap leading-7 text-slate-600">
              {lesson.description}
            </p>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Video size={20} />
              Lesson Video
            </h3>

            {lesson.videoUrl ? (
              <>
                <video
                  key={videoSource}
                  controls
                  preload="metadata"
                  playsInline
                  className="aspect-video w-full rounded-xl bg-black"
                >
                  <source src={videoSource} />
                  Your browser does not support video playback.
                </video>

                <p className="mt-3 break-all text-xs text-slate-500">
                  Video source: {isPrivateVideo ? "Private video" : "External video"}
                </p>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <Video className="mx-auto text-slate-400" size={36} />

                <p className="mt-3 font-semibold text-slate-700">
                  No video added
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Edit this lesson to upload or add a video.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <FileText size={20} />
              Lesson Notes
            </h3>

            {lesson.notesUrl ? (
              <a
                href={lesson.notesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                <FileText size={18} />
                Open Lesson Notes
              </a>
            ) : (
              <p className="text-sm text-slate-500">
                No notes have been added to this lesson.
              </p>
            )}
          </div>
        </section>

        {/* Lesson Summary */}

        <aside className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-slate-900">
              Lesson Summary
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Clock className="text-blue-600" size={21} />

                <div>
                  <p className="text-sm text-slate-500">
                    Duration
                  </p>

                  <p className="font-semibold text-slate-900">
                    {lesson.duration} minutes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-600" size={21} />

                <div>
                  <p className="text-sm text-slate-500">
                    Lesson Order
                  </p>

                  <p className="font-semibold text-slate-900">
                    {lesson.lessonOrder}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <GraduationCap className="text-blue-600" size={21} />

                <div>
                  <p className="text-sm text-slate-500">
                    Course
                  </p>

                  <p className="font-semibold text-slate-900">
                    {lesson.course.title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white">
            <h3 className="text-lg font-bold">
              Admin Actions
            </h3>

            <Link
              href={`/admin/courses/${id}/lessons/${lesson.id}/edit`}
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-700"
            >
              <Pencil size={18} />
              Edit Lesson
            </Link>

            <Link
              href={`/admin/courses/${id}/lessons`}
              className="mt-3 flex items-center justify-center rounded-xl border border-slate-600 px-4 py-3 font-semibold transition hover:bg-slate-800"
            >
              All Lessons
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
