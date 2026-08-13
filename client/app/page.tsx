import Navbar from "../components/layout/Navbar";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import Stats from "../components/Stats";
import About from "../components/About";
import Footer from "../components/Footer";
import FeaturedCourses from "../components/FeaturedCourses";
import Experts from "../components/Experts";
import { getCourses } from "@/lib/course";

export default async function Home() {
  const dbCourses = await getCourses();

  const featuredCourses = dbCourses.map((course) => ({
  id: course.id,
  title: course.title,
  slug: course.slug,
  price: course.price,
  image: course.image,
  instructor: course.instructor,
  rating: course.rating,
  students: course.students,
  duration: course.duration,
  language: course.language,
  level: course.level,
  isPremium: course.isPremium,
}));

  return (
    <>
      <Navbar />

      <Hero />

      <Stats />

      <Experts />

      <section className="grid grid-cols-1 gap-6 p-10 md:grid-cols-2 lg:grid-cols-4">
        <CourseCard
          title="ICU Nursing"
          icon="🏥"
          description="Complete ICU Nursing Course"
          href="/courses/icu-nursing"
        />

        <CourseCard
          title="Ventilator"
          icon="🫁"
          description="Mechanical Ventilation Training"
          href="/courses/ventilator"
        />

        <CourseCard
          title="ECG"
          icon="❤️"
          description="Master ECG Interpretation"
          href="/courses/ecg"
        />

        <CourseCard
          title="ABG"
          icon="🩸"
          description="ABG Analysis Made Easy"
          href="/courses/abg"
        />
      </section>

      <FeaturedCourses courses={featuredCourses} />

      <About />

      <Footer />
    </>
  );
}