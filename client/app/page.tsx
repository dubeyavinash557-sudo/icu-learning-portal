import Navbar from "../components/layout/Navbar";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import Stats from "../components/Stats";
import About from "../components/About";
import Footer from "../components/Footer";
import FeaturedCourses from "../components/FeaturedCourses";
export default function Home() {
  return (
    <>
      <Navbar />
<Hero />
<Stats />
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
  <CourseCard
  title="ICU Nursing"
  icon="🏥"
  description="Complete ICU Nursing Course"
/>

<CourseCard
  title="Ventilator"
  icon="🫁"
  description="Mechanical Ventilation Training"
/>

<CourseCard
  title="ECG"
  icon="❤️"
  description="Master ECG Interpretation"
/>

<CourseCard
  title="ABG"
  icon="🩸"
  description="ABG Analysis Made Easy"
/>
</section>
<FeaturedCourses />
<About />
<Footer />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-700">
            ICU Learning Portal 🚑
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            India's Best ICU Learning Platform, Ventilator, ECG, ABG & Critical Care
          </p>

          <button className="mt-8 bg-blue-700 text-white px-8 py-3 rounded-xl">
            Start Learning
          </button>
        </div>
      </main>
    </>
  );
}