import Link from "next/link";
import Image from "next/image";

type Course = {
  id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  instructor: string;
  rating: number;
  students: number;
  duration: number;
  language: string;
  level: string;
  isPremium: boolean;
};

interface FeaturedCoursesProps {
  courses: Course[];
}

export default function FeaturedCourses({
  courses,
}: FeaturedCoursesProps) {
  return (
    <section className="bg-slate-50 px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              🎓 Professional Courses
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Featured Courses
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Build practical ICU and critical care skills with structured
              courses designed for nurses, healthcare professionals and
              medical learners.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex w-fit items-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-700 shadow-sm transition hover:border-blue-400 hover:text-blue-700 hover:shadow-md"
          >
            View All Courses
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Courses */}
        {courses.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-lg">
            <div className="text-5xl">📚</div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              No Courses Available
            </h3>

            <p className="mt-3 text-slate-500">
              Please add courses from the database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <article
                key={course.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
              >

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Premium Badge */}
                  {course.isPremium && (
                    <div className="absolute left-4 top-4 rounded-full bg-blue-700 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      ⭐ PREMIUM
                    </div>
                  )}

                  {/* Level */}
                  <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg">
                    {course.level}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-lg">
                    <span className="text-yellow-500">★</span>

                    <span className="text-sm font-bold text-slate-800">
                      {course.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">

                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    {course.instructor}
                  </p>

                  <h3 className="mt-2 line-clamp-2 min-h-[56px] text-xl font-extrabold leading-7 text-slate-900">
                    {course.title}
                  </h3>

                  {/* Course information */}
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        Students
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {course.students.toLocaleString()}+
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        Duration
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {course.duration} min
                      </p>
                    </div>

                  </div>

                  {/* Language */}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Language
                    </span>

                    <span className="font-bold text-slate-700">
                      {course.language}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="my-5 border-t border-slate-100" />

                  {/* Price + buttons */}
                  <div className="flex items-end justify-between gap-3">

                    <div>
                      <p className="text-xs text-slate-500">
                        Course Price
                      </p>

                      <p className="mt-1 text-2xl font-extrabold text-blue-700">
                        ₹{course.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800 hover:shadow-lg"
                    >
                      View Course
                    </Link>

                  </div>

                  {/* Enroll */}
                  <Link
                    href={`/courses/${course.slug}`}
                    className="mt-4 flex w-full items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-700 hover:text-white"
                  >
                    Enroll Now
                    <span className="ml-2">→</span>
                  </Link>

                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}