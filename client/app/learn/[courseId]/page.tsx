import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

import VideoPlayer from "@/components/course/VideoPlayer";
import LessonSidebar from "@/components/course/LessonSidebar";
import CourseProgress from "@/components/course/CourseProgress";
import LessonNavigation from "@/components/course/LessonNavigation";
import NotesDownload from "@/components/course/NotesDownload";

import { auth } from "@/auth";

type Props = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function CourseLearningPage({
  params,
}: Props) {
  const { courseId } = await params;

  /*
   * =====================================================
   * 1. AUTHENTICATION
   * =====================================================
   */

  const session = await auth();

  if (!session?.user?.email) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(
        `/learn/${courseId}`
      )}`
    );
  }

  /*
   * =====================================================
   * 2. CURRENT USER
   * =====================================================
   */

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  /*
   * =====================================================
   * 3. COURSE + LESSONS + ENROLLMENT
   * =====================================================
   */

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      lessons: {
        orderBy: {
          lessonOrder: "asc",
        },
      },

      enrollments: {
        where: {
          userId: user.id,
        },
        select: {
          id: true,
          progress: true,
          completed: true,
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  /*
   * =====================================================
   * 4. ENROLLMENT CHECK
   * =====================================================
   */

  const enrollment = course.enrollments[0] ?? null;

  if (!enrollment) {
    redirect(`/courses/${course.id}`);
  }

  /*
   * =====================================================
   * 5. LESSON COUNT
   * =====================================================
   */

  const totalLessons = course.lessons.length;

  /*
   * =====================================================
   * 6. EMPTY COURSE
   * =====================================================
   */

  if (totalLessons === 0) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Header />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6 lg:p-8">
            <div className="mx-auto max-w-5xl">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-950 px-6 py-12 text-center text-white sm:px-10">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl ring-1 ring-white/10">
                    📚
                  </div>

                  <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                    ICU Learning Portal
                  </p>

                  <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                    Lessons Coming Soon
                  </h1>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300">
                    This course does not have any lessons
                    available yet. Please check back after
                    the course curriculum has been added.
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <a
                    href={`/courses/${course.id}`}
                    className="mx-auto flex w-fit items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                  >
                    Back to Course
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /*
   * =====================================================
   * 7. DEFAULT LESSON
   *
   * /learn/[courseId] starts from first lesson.
   * Individual lesson navigation uses:
   *
   * /courses/[courseId]/lesson/[lessonId]
   * =====================================================
   */

  const lesson = course.lessons[0];

  /*
   * =====================================================
   * 8. COMPLETED LESSONS
   * =====================================================
   */

  const completedLessons =
    await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        completed: true,
        lesson: {
          courseId: course.id,
        },
      },
      select: {
        lessonId: true,
      },
    });

  const completedLessonIds = new Set(
    completedLessons.map(
      (item) => item.lessonId
    )
  );

  const completedLessonCount =
    completedLessonIds.size;

  /*
   * =====================================================
   * 9. COURSE PROGRESS
   * =====================================================
   */

  const calculatedProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessonCount /
            totalLessons) *
            100
        )
      : 0;

  const progress = Math.min(
    Math.max(
      Math.max(
        enrollment.progress,
        calculatedProgress
      ),
      0
    ),
    100
  );

  /*
   * =====================================================
   * 10. COURSE STATUS
   * =====================================================
   */

  const remainingLessons = Math.max(
    totalLessons -
      completedLessonCount,
    0
  );

  const isCourseCompleted =
    enrollment.completed ||
    completedLessonCount >= totalLessons;

  /*
   * =====================================================
   * 11. CURRENT LESSON INDEX
   * =====================================================
   */

  const currentLessonIndex =
    course.lessons.findIndex(
      (item) => item.id === lesson.id
    );

  const previousLesson =
    currentLessonIndex > 0
      ? course.lessons[
          currentLessonIndex - 1
        ]
      : null;

  const nextLesson =
    currentLessonIndex <
    course.lessons.length - 1
      ? course.lessons[
          currentLessonIndex + 1
        ]
      : null;

  /*
   * =====================================================
   * 12. PAGE
   * =====================================================
   */

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">

            {/* =================================================
                LEARNING HEADER
            ================================================= */}

            <div className="mb-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600">
                    ICU Learning Portal
                  </p>

                  <h1 className="mt-2 truncate text-2xl font-black text-slate-900 sm:text-3xl">
                    {course.title}
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Continue your structured learning
                    journey and complete each lesson.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Progress
                    </p>

                    <p className="mt-1 text-2xl font-black text-blue-700">
                      {progress}%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Lessons
                    </p>

                    <p className="mt-1 text-2xl font-black text-slate-900">
                      {completedLessonCount}/
                      {totalLessons}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* =================================================
                MAIN GRID
            ================================================= */}

            <div className="grid gap-8 xl:grid-cols-3">

              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <div className="min-w-0 space-y-8 xl:col-span-2">

                <VideoPlayer
                  courseTitle={course.title}
                  lessonTitle={lesson.title}
                  lessonDescription={
                    lesson.description
                  }
                  lessonNumber={
                    lesson.lessonOrder
                  }
                  totalLessons={
                    totalLessons
                  }
                  duration={
                    lesson.duration
                  }
                  videoUrl={
                    lesson.videoUrl
                  }
                  notesUrl={
                    lesson.notesUrl
                  }
                  isCompleted={completedLessonIds.has(
                    lesson.id
                  )}
                  studentCount={
                    course.students
                  }
                />

                <CourseProgress
                  progress={progress}
                  completedLessons={
                    completedLessonCount
                  }
                  remainingLessons={
                    remainingLessons
                  }
                  totalLessons={
                    totalLessons
                  }
                  isCourseCompleted={
                    isCourseCompleted
                  }
                />

                <LessonNavigation
                  courseId={course.id}
                  previousLesson={
                    previousLesson
                  }
                  nextLesson={
                    nextLesson
                  }
                  lessonId={lesson.id}
                  isCompleted={completedLessonIds.has(
                    lesson.id
                  )}
                />

                <NotesDownload
  lessonId={lesson.id}
  lessonTitle={lesson.title}
  notesUrl={lesson.notesUrl}
/>

              </div>

              {/* =================================================
                  RIGHT SIDEBAR
              ================================================= */}

              <aside className="min-w-0 space-y-8">

                <LessonSidebar
                  courseId={course.id}
                  lessons={course.lessons}
                  completedLessonIds={
                    Array.from(
                      completedLessonIds
                    )
                  }
                  currentLessonId={
                    lesson.id
                  }
                />

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">

                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                    Your Learning
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-900">
                    Course Summary
                  </h2>

                  <div className="mt-6 space-y-3">

                    <LearningSummaryItem
                      label="Completed"
                      value={`${completedLessonCount} lessons`}
                    />

                    <LearningSummaryItem
                      label="Remaining"
                      value={`${remainingLessons} lessons`}
                    />

                    <LearningSummaryItem
                      label="Progress"
                      value={`${progress}%`}
                    />

                    <LearningSummaryItem
                      label="Status"
                      value={
                        isCourseCompleted
                          ? "Completed"
                          : "In Progress"
                      }
                    />

                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500">
                        Overall Progress
                      </span>

                      <span className="text-blue-700">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>

                </div>

              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/*
 * ==========================================================
 * LEARNING SUMMARY ITEM
 * ==========================================================
 */

function LearningSummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
      <span className="text-sm font-medium text-slate-500">
        {label}
      </span>

      <span className="text-sm font-black text-slate-800">
        {value}
      </span>
    </div>
  );
}