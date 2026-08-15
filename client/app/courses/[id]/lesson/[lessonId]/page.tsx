import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import CompleteLessonButton from "@/components/course/CompleteLessonButton";
import { auth } from "@/auth";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  CheckCircle,
  Lock,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
};

export default async function LessonPage({
  params,
}: Props) {
  const { id, lessonId } = await params;

  // --------------------------------------------------
  // 1. Get Course + Lessons
  // --------------------------------------------------

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

  // --------------------------------------------------
  // 2. Find Requested Lesson
  // --------------------------------------------------

  const lesson = course.lessons.find(
    (item) => item.id === lessonId
  );

  if (!lesson) {
    notFound();
  }

  // --------------------------------------------------
  // 3. Authentication Check
  // --------------------------------------------------

  const session = await auth();

  if (!session?.user?.email) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(
        `/courses/${course.id}/lesson/${lesson.id}`
      )}`
    );
  }

  // --------------------------------------------------
  // 4. Get Current User
  // --------------------------------------------------

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // --------------------------------------------------
  // 5. PAID COURSE ACCESS CHECK
  //
  // Only enrolled students can access lessons.
  // --------------------------------------------------

  const enrollment =
    await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
    });

  if (!enrollment) {
    redirect(`/courses/${course.id}`);
  }

  // --------------------------------------------------
  // 6. Check Lesson Completion
  // --------------------------------------------------

  const progress =
    await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lesson.id,
        },
      },
    });

  const isCompleted =
    progress?.completed ?? false;

  // --------------------------------------------------
  // 7. Previous / Next Lesson
  // --------------------------------------------------

  const currentIndex =
    course.lessons.findIndex(
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

  // --------------------------------------------------
  // 8. UI
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* Top Navigation */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <Link
            href={`/courses/${course.id}`}
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              font-semibold
              text-slate-700
              shadow
              transition
              hover:bg-slate-50
              dark:bg-slate-900
              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >
            <ArrowLeft size={18} />
            Back to Course
          </Link>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg">
            <BookIcon />

            Lesson {lesson.lessonOrder} /{" "}
            {course.lessons.length}
          </div>

        </div>

        {/* Main Lesson Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-slate-900">

          {/* Lesson Header */}
          <div className="p-6 sm:p-8 lg:p-10">

            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                Lesson {lesson.lessonOrder}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Lock size={14} />
                Enrolled Access
              </span>

              {isCompleted && (
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                  <CheckCircle size={15} />
                  Completed
                </span>
              )}

            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {lesson.title}
            </h1>

            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
              {lesson.description}
            </p>

          </div>

          {/* Video */}
          <div className="px-6 sm:px-8 lg:px-10">

            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">

              {lesson.videoUrl ? (
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="h-full w-full"
                  src={lesson.videoUrl}
                >
                  Your browser does not support
                  HTML video.
                </video>
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center text-white">

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                    🎥
                  </div>

                  <h2 className="text-2xl font-bold">
                    Video Coming Soon
                  </h2>

                  <p className="mt-2 max-w-md text-sm text-slate-300">
                    The video for this lesson has not
                    been uploaded yet.
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* Lesson Information */}
          <div className="px-6 py-8 sm:px-8 lg:px-10">

            <div className="flex flex-wrap gap-4">

              <div className="rounded-xl bg-blue-50 px-5 py-3 font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                ⏱ Duration: {lesson.duration} Minutes
              </div>

              <div className="inline-flex items-center rounded-xl bg-green-50 px-5 py-3 font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                <CheckCircle
                  className="mr-2"
                  size={18}
                />
                Premium Lesson
              </div>

            </div>

            {/* Notes */}
            {lesson.notesUrl && (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="font-bold text-emerald-800 dark:text-emerald-300">
                      Lesson Notes
                    </h2>

                    <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                      Download the notes and revise this
                      lesson anytime.
                    </p>
                  </div>

                  <a
                    href={lesson.notesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      rounded-xl
                      bg-emerald-600
                      px-6
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-emerald-700
                    "
                  >
                    <Download size={18} />
                    Download Notes
                  </a>

                </div>

              </div>
            )}

            {/* Lesson Completion + Navigation */}
            <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* Previous */}
                <div className="order-2 lg:order-1">

                  {previousLesson ? (
                    <Link
                      href={`/courses/${course.id}/lesson/${previousLesson.id}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-slate-100
                        px-6
                        py-3
                        font-semibold
                        text-slate-700
                        transition
                        hover:bg-slate-200
                        dark:bg-slate-800
                        dark:text-slate-200
                        dark:hover:bg-slate-700
                      "
                    >
                      <ArrowLeft size={18} />
                      Previous Lesson
                    </Link>
                  ) : (
                    <div />
                  )}

                </div>

                {/* Complete */}
                <div className="order-1 lg:order-2">

                  <CompleteLessonButton
                    lessonId={lesson.id}
                    isCompleted={isCompleted}
                    nextLessonUrl={
                      nextLesson
                        ? `/courses/${course.id}/lesson/${nextLesson.id}`
                        : null
                    }
                  />

                </div>

                {/* Next */}
                <div className="order-3">

                  {nextLesson ? (
                    <Link
                      href={`/courses/${course.id}/lesson/${nextLesson.id}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-700
                        px-6
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-800
                      "
                    >
                      Next Lesson
                      <ArrowRight size={18} />
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white">
                      <CheckCircle size={18} />
                      Course Completed
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Course Progress Information */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Your Learning
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {course.title}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-50 px-5 py-3 text-center dark:bg-blue-500/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Course Progress
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-700 dark:text-blue-400">
                {enrollment.progress}%
              </p>
            </div>

          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 transition-all duration-500"
              style={{
                width: `${Math.min(
                  Math.max(enrollment.progress, 0),
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      </div>

    </main>
  );
}

function BookIcon() {
  return (
    <span className="text-base">
      📖
    </span>
  );
}