import Link from "next/link";
import { getCourses } from "@/lib/course";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="mb-3 text-5xl font-bold text-blue-700">
          Our Courses
        </h1>

        <p className="mb-10 text-lg text-gray-600">
          Choose a professional ICU course and start learning today.
        </p>

        {courses.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              No Courses Found
            </h2>

            <p className="mt-3 text-gray-500">
              Please add courses to the database.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 text-5xl">🏥</div>

                <h2 className="text-2xl font-bold">
                  {course.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-gray-600">
                  {course.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-700">
                    ₹{course.price}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {course.lessons.length} Lessons
                  </span>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="mt-6 block rounded-xl bg-blue-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
                >
                  View Course
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}