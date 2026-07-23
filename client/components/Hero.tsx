import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center py-20 bg-blue-50">
      <h2 className="text-5xl font-bold text-blue-700">
        Become an ICU Critical Care Expert 🚑
      </h2>

      <p className="mt-6 text-xl text-gray-600">
        Learn ICU Nursing, Ventilator, ECG, ABG and Emergency Care
      </p>

      <Link href="/courses">
        <button className="mt-8 bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition">
          Explore Courses
        </button>
      </Link>
    </section>
  );
}