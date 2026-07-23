import Link from "next/link";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Our Courses
      </h1>

      <ul className="space-y-4">
        <li>
          <Link
            href="/courses/icu-nursing"
            className="text-blue-600 hover:underline"
          >
            ICU Nursing Course
          </Link>
        </li>

        <li>
          <Link
            href="/courses/ventilator"
            className="text-blue-600 hover:underline"
          >
            Ventilator Course
          </Link>
        </li>
      </ul>
    </main>
  );
}