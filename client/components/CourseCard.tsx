type CourseCardProps = {
  title: string;
  icon: string;
  description: string;
};

export default function CourseCard({
  title,
  icon,
  description,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-blue-700">
        {title}
      </h3>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

      <button className="mt-5 bg-blue-700 text-white px-5 py-2 rounded-lg">
        Learn More
      </button>

    </div>
  );
}