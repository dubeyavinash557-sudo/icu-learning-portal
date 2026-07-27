import { getCourseBySlug } from "@/lib/course";
import { notFound } from "next/navigation";
import {
  Star,
  BookOpen,
  Clock3,
  Award,
  Users,
  PlayCircle,
} from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CourseDetails({ params }: Props) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const totalDuration = course.lessons.reduce(
    (total, lesson) => total + lesson.duration,
    0
  );

  return (
    <main className="min-h-screen bg-slate-100">

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="grid gap-12 lg:grid-cols-3">

            {/* Left */}

            <div className="lg:col-span-2">

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                Premium Course
              </span>

              <h1 className="mt-6 text-5xl font-bold">
                {course.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-blue-100">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-6">

                <div className="flex items-center gap-2">
                  <Star
                    size={20}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span>4.9 Rating</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>10,000+ Students</span>
                </div>

                <div className="flex items-center gap-2">
                  <BookOpen size={20} />
                  <span>{course.lessons.length} Lessons</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={20} />
                  <span>{totalDuration} Minutes</span>
                </div>

              </div>

            </div>

            {/* Right Card */}

            <div>

              <div className="rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">

                <h2 className="text-4xl font-bold text-blue-700">
                  ₹{course.price}
                </h2>

                <button className="mt-6 w-full rounded-xl bg-blue-700 py-4 text-lg font-semibold text-white hover:bg-blue-800">
                  Enroll Now
                </button>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-700 py-4 font-semibold text-blue-700 hover:bg-blue-50">
                  <PlayCircle size={20} />
                  Preview Course
                </button>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3">
                    <Award className="text-green-600" />
                    Certificate Included
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="text-green-600" />
                    Lifetime Access
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="text-green-600" />
                    Community Support
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock3 className="text-green-600" />
                    Learn Anytime
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Curriculum */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <h2 className="mb-8 text-3xl font-bold">
            Course Curriculum
          </h2>

          <div className="space-y-4">

            {course.lessons.map((lesson, index) => (

              <div
                key={lesson.id}
                className="flex items-center justify-between rounded-2xl border p-5 hover:bg-slate-50"
              >

                <div>

                  <h3 className="font-semibold">
                    {index + 1}. {lesson.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {lesson.description}
                  </p>

                </div>

                <div className="font-semibold text-blue-700">
                  {lesson.duration} min
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}