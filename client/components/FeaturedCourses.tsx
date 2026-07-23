const courses = [
  {
    title: "ICU Nursing",
    icon: "🏥",
    price: "₹999",
  },
  {
    title: "Ventilator",
    icon: "🫁",
    price: "₹1499",
  },
  {
    title: "ECG",
    icon: "❤️",
    price: "₹799",
  },
  {
    title: "ABG",
    icon: "🩸",
    price: "₹699",
  },
];

export default function FeaturedCourses() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Featured Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.title}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <div className="text-5xl">{course.icon}</div>

              <h3 className="text-2xl font-bold mt-4">
                {course.title}
              </h3>

              <p className="text-yellow-500 mt-2">
                ⭐⭐⭐⭐⭐
              </p>

              <p className="text-blue-700 font-bold mt-3">
                {course.price}
              </p>

              <button className="mt-5 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}