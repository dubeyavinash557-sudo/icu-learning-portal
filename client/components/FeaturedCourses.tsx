import Link from "next/link";

type Course = {
  id: string;
  title: string;
  slug: string;
  price: number;
};

interface FeaturedCoursesProps {
  courses: Course[];
}

export default function FeaturedCourses({
  courses,
}: FeaturedCoursesProps) {
  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-6xl px-8">
        <h2 className="mb-10 text-center text-4xl font-bold text-blue-700">
          Featured Courses
        </h2>

        {courses.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-lg">
            <h3 className="text-2xl font-bold">
              No Courses Available
            </h3>

            <p className="mt-3 text-gray-500">
              Please add courses from the database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-xl bg-white p-6 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-5xl">🏥</div>

                <h3 className="mt-4 text-2xl font-bold text-black">
                  {course.title}
                </h3>

                <p className="mt-2 text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </p>

                <p className="mt-3 text-lg font-bold text-blue-700">
                  ₹{course.price}
                </p>

                <Link href={`/courses/${course.slug}`}>
                  <button className="mt-5 rounded-lg bg-blue-700 px-6 py-2 text-white hover:bg-blue-800">
                    Enroll Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}