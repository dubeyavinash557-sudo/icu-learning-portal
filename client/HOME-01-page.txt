import Navbar from "../components/layout/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FeaturedCourses from "../components/FeaturedCourses";
import CriticalCareVisuals from "../components/CriticalCareVisuals";
import Experts from "../components/Experts";
import VideoLearning from "../components/VideoLearning";
import PremiumNotes from "../components/PremiumNotes";
import LearningPathway from "../components/LearningPathway";
import Certificates from "../components/Certificates";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import About from "../components/About";
import Footer from "../components/Footer";

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
      {/* =====================================================
          GLOBAL NAVIGATION
      ===================================================== */}

      <Navbar />

      <main>
        {/* ===================================================
            HERO
        =================================================== */}

        <Hero />

        {/* ===================================================
            PLATFORM TRUST & STATISTICS
        =================================================== */}

        <Stats />

        {/* ===================================================
            FEATURED PROFESSIONAL COURSES
        =================================================== */}

        <FeaturedCourses courses={featuredCourses} />

        {/* ===================================================
            CRITICAL CARE SKILLS
        =================================================== */}

        <CriticalCareVisuals />

        {/* ===================================================
            EXPERT EDUCATORS
        =================================================== */}

        <Experts />

        {/* ===================================================
            VIDEO LEARNING EXPERIENCE
        =================================================== */}

        <VideoLearning />

        {/* ===================================================
            PREMIUM NOTES & STUDY RESOURCES
        =================================================== */}

        <PremiumNotes />

        {/* ===================================================
            STRUCTURED LEARNING PATHWAY
        =================================================== */}

        <LearningPathway />

        {/* ===================================================
            PROFESSIONAL CERTIFICATION
        =================================================== */}

        <Certificates />

        {/* ===================================================
            STUDENT TESTIMONIALS & TRUST
        =================================================== */}

        <Testimonials />

        {/* ===================================================
            MEMBERSHIP & PRICING
        =================================================== */}

        <Pricing />

        {/* ===================================================
            WHY CHOOSE ICU LEARNING PORTAL
        =================================================== */}

        <About />
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </>
  );
}