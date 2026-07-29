import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import EnrollButton from "@/components/course/EnrollButton";
import {
    
  ArrowRight,
  BookOpen,
  Clock3,
  Star,
  Users,
  Globe,
  GraduationCap,
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

if (session?.user?.email) {
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (user) {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: course.id,
      },
    });

    enrolled = !!enrollment;
  }
}
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <img
          src={course.image}
          alt={course.title}
          className="h-80 w-full rounded-3xl object-cover"
        />

        <h1 className="mt-8 text-5xl font-bold">
          {course.title}
        </h1>

        <p className="mt-5 max-w-4xl text-lg text-slate-600">
          {course.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <div className="rounded-xl bg-blue-100 px-5 py-3">
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <Clock3 size={18} />
              {course.duration} Minutes
            </div>
          </div>

          <div className="rounded-xl bg-yellow-100 px-5 py-3">
            <div className="flex items-center gap-2 font-semibold text-yellow-700">
              <Star
                size={18}
                fill="currentColor"
              />
              {course.rating}
            </div>
          </div>

          <div className="rounded-xl bg-green-100 px-5 py-3">
            <div className="flex items-center gap-2 font-semibold text-green-700">
              <Users size={18} />
              {course.students.toLocaleString()} Students
            </div>
          </div>

          <div className="rounded-xl bg-purple-100 px-5 py-3">
            <div className="flex items-center gap-2 font-semibold text-purple-700">
              <Globe size={18} />
              {course.language}
            </div>
          </div>

          <div className="rounded-xl bg-orange-100 px-5 py-3">
            <div className="flex items-center gap-2 font-semibold text-orange-700">
              <GraduationCap size={18} />
              {course.level}
            </div>
          </div>

        </div>

        <div className="mt-10">

  {enrolled ? (

    <Link
      href={`/courses/${course.id}/lesson/${course.lessons[0]?.id}`}
      className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-800"
    >
      <BookOpen size={20} />
      Continue Learning
      <ArrowRight size={18} />
    </Link>

  ) : (

    <EnrollButton courseId={course.id} />

  )}

</div>

        {/* Course Information */}

<div className="mt-12 grid gap-6 md:grid-cols-3">

  <div className="rounded-3xl bg-white p-6 shadow-lg">

    <h3 className="text-xl font-bold">
      Instructor
    </h3>

    <p className="mt-3 text-slate-600">
      {course.instructor}
    </p>

  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg">

    <h3 className="text-xl font-bold">
      Certificate
    </h3>

    <p className="mt-3 text-slate-600">
      Certificate will be awarded after course completion.
    </p>

  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg">

    <h3 className="text-xl font-bold">
      Course Includes
    </h3>

    <ul className="mt-3 space-y-2 text-slate-600">
      <li>✅ Lifetime Access</li>
      <li>✅ HD Video Lessons</li>
      <li>✅ Downloadable Notes</li>
      <li>✅ Practical ICU Cases</li>
      <li>✅ Completion Certificate</li>
    </ul>

  </div>

</div>

{/* Course Overview */}

<div className="mt-12 rounded-3xl bg-white p-8 shadow-lg">

  <h2 className="text-3xl font-bold">
    Course Overview
  </h2>

  <p className="mt-5 leading-8 text-slate-600">
    {course.description}
  </p>

</div>

<div className="mt-12">

  <h2 className="mb-6 text-3xl font-bold">
    Course Lessons
  </h2>

</div>

     {course.lessons.map((lesson) => (

  <div
    key={lesson.id}
    className="mb-5 rounded-2xl border border-slate-200 bg-white p-6 shadow transition hover:shadow-xl"
  >

    <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">

      <div>

        <div className="mb-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          Lesson {lesson.lessonOrder}
        </div>

        <h3 className="text-2xl font-bold">
          {lesson.title}
        </h3>

        <p className="mt-3 text-slate-600">
          {lesson.description}
        </p>

      </div>

      <div className="flex flex-col items-end gap-4">

        <div className="rounded-xl bg-slate-100 px-4 py-2 font-semibold text-blue-700">
          ⏱ {lesson.duration} Minutes
        </div>

        <Link
          href={`/courses/${course.id}/lesson/${lesson.id}`}
          className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Watch Lesson →
        </Link>

      </div>

    </div>

  </div>

))}

              </div>

    </div>
  );
}