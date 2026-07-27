import { getCourseBySlug } from "@/lib/course";
import { notFound } from "next/navigation";

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

  return (
    <main className="mx-auto max-w-6xl p-10">
      <h1 className="mb-4 text-5xl font-bold text-blue-700">
        {course.title}
      </h1>

      <p className="mb-8 text-lg text-gray-600">
        {course.description}
      </p>

      <div className="rounded-xl border p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">
          Lessons ({course.lessons.length})
        </h2>

        <div className="space-y-3">
          {course.lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="rounded-lg border p-4"
            >
              <h3 className="font-semibold">
                {index + 1}. {lesson.title}
              </h3>

              <p className="text-sm text-gray-500">
                {lesson.duration} Minutes
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}