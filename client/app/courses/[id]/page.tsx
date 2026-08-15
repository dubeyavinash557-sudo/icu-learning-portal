import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import BuyNowButton from "@/components/course/BuyNowButton";

import {
  ArrowRight,
  BookOpen,
  Clock3,
  Star,
  Users,
  Globe,
  GraduationCap,
  Lock,
  CheckCircle2,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CourseDetailsPage({
  params,
}: Props) {
  const { id } = await params;

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

  const session = await auth();

  let enrolled = false;
  let nextLessonId: string | null = null;
  let customerName = "";
  let customerEmail = "";

  if (session?.user?.email) {
    customerName = session.user.name || "";
    customerEmail = session.user.email;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (user) {
      const enrollment =
        await prisma.enrollment.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: course.id,
            },
          },
        });

      enrolled = !!enrollment;

      if (enrollment) {
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

        const completedIds =
          completedLessons.map(
            (item) => item.lessonId
          );

        const nextLesson =
          course.lessons.find(
            (lesson) =>
              !completedIds.includes(lesson.id)
          );

        nextLessonId =
          nextLesson?.id ??
          course.lessons[
            course.lessons.length - 1
          ]?.id ??
          null;
      }
    }
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <img
            src={course.image}
            alt={course.title}
            className="h-72 w-full object-cover sm:h-96"
          />

          <div className="p-7 sm:p-10">
            <div className="flex flex-wrap gap-2">
              {course.isPremium && (
                <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
                  ⭐ Premium Course
                </span>
              )}

              <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">
                Professional ICU Training
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
              {course.description}
            </p>

            {/* Course Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

              <CourseStat
                icon={<Clock3 size={19} />}
                label="Duration"
                value={`${course.duration} Minutes`}
                className="bg-blue-50 text-blue-700"
              />

              <CourseStat
                icon={
                  <Star
                    size={19}
                    fill="currentColor"
                  />
                }
                label="Rating"
                value={String(course.rating)}
                className="bg-yellow-50 text-yellow-700"
              />

              <CourseStat
                icon={<Users size={19} />}
                label="Students"
                value={course.students.toLocaleString()}
                className="bg-green-50 text-green-700"
              />

              <CourseStat
                icon={<Globe size={19} />}
                label="Language"
                value={course.language}
                className="bg-purple-50 text-purple-700"
              />

              <CourseStat
                icon={<GraduationCap size={19} />}
                label="Level"
                value={course.level}
                className="bg-orange-50 text-orange-700"
              />

            </div>

            {/* Purchase Area */}
            <div className="mt-10 rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 p-6 sm:p-8">

              {enrolled ? (
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                      <CheckCircle2 size={17} />
                      Course Unlocked
                    </div>

                    <h2 className="mt-3 text-2xl font-bold text-slate-900">
                      Continue your learning
                    </h2>

                    <p className="mt-2 text-slate-600">
                      Your course access is active.
                      Continue from where you stopped.
                    </p>
                  </div>

                  <Link
                    href={
                      nextLessonId
                        ? `/courses/${course.id}/lesson/${nextLessonId}`
                        : `/courses/${course.id}`
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-4 font-bold text-white transition hover:bg-blue-800"
                  >
                    <BookOpen size={20} />
                    Continue Learning
                    <ArrowRight size={18} />
                  </Link>

                </div>
              ) : (
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">
                      Complete Course Access
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                      Learn ICU skills professionally
                    </h2>

                    <p className="mt-2 max-w-2xl text-slate-600">
                      Get access to all lessons, practical
                      ICU knowledge, notes and completion
                      certification.
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <span className="text-4xl font-black text-blue-700">
                        ₹
                        {course.price.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <span className="text-sm text-slate-500">
                        One-time payment
                      </span>
                    </div>
                  </div>

                  <BuyNowButton
                    courseId={course.id}
                    courseTitle={course.title}
                    price={course.price}
                    isLoggedIn={!!session?.user?.email}
                    customerName={customerName}
                    customerEmail={customerEmail}
                  />

                </div>
              )}

            </div>
          </div>
        </section>

        {/* Course Information */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">

          <InfoCard
            title="Instructor"
            content={course.instructor}
          />

          <InfoCard
            title="Certificate"
            content="Earn a completion certificate after successfully completing the course."
          />

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900">
              Course Includes
            </h3>

            <ul className="mt-4 space-y-3 text-slate-600">
              <li>✅ Lifetime Course Access</li>
              <li>✅ HD Video Lessons</li>
              <li>✅ Downloadable Notes</li>
              <li>✅ Practical ICU Cases</li>
              <li>✅ Completion Certificate</li>
            </ul>
          </div>

        </section>

        {/* Overview */}
        <section className="mt-10 rounded-3xl bg-white p-8 shadow-lg">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-600">
            About this course
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Course Overview
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {course.description}
          </p>
        </section>

        {/* Lessons */}
        <section className="mt-10">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-600">
              Curriculum
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Course Lessons
            </h2>

            <p className="mt-2 text-slate-600">
              {course.lessons.length} structured lessons
              designed for practical learning.
            </p>
          </div>

          {course.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="mb-5 rounded-2xl border border-slate-200 bg-white p-6 shadow transition hover:shadow-xl"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <div className="mb-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    Lesson {lesson.lessonOrder}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {lesson.title}
                  </h3>

                  <p className="mt-3 text-slate-600">
                    {lesson.description}
                  </p>

                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    ⏱ {lesson.duration} Minutes
                  </p>
                </div>

                <div className="shrink-0">

                  {enrolled ? (
                    <Link
                      href={`/courses/${course.id}/lesson/${lesson.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
                    >
                      <BookOpen size={18} />
                      Watch Lesson
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-500">
                      <Lock size={18} />
                      Purchase Required
                    </div>
                  )}

                </div>

              </div>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}

function CourseStat({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-sm font-bold">
        {icon}
        {label}
      </div>

      <p className="mt-2 font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h3 className="text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {content}
      </p>
    </div>
  );
}