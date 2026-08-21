import Link from "next/link";

import {
  ArrowRight,
  Award,
  CheckCircle2,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import CourseCard, { type Course } from "./CourseCard";

interface FeaturedCoursesProps {
  courses: Course[];
}

export default function FeaturedCourses({
  courses,
}: FeaturedCoursesProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        border-y
        border-slate-200/80
        bg-gradient-to-b
        from-white
        via-slate-50
        to-white
        py-20
        md:py-24
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-80
          w-80
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <div className="mb-12 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {/* Eyebrow */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-200
                bg-cyan-50
                px-4
                py-2
                text-xs
                font-black
                uppercase
                tracking-[0.14em]
                text-cyan-700
              "
            >
              <GraduationCap size={16} />

              Professional Learning
            </div>

            {/* Heading */}

            <h2
              className="
                text-3xl
                font-black
                tracking-tight
                text-slate-950
                sm:text-4xl
                md:text-5xl
              "
            >
              Master Critical Care

              <span className="block text-blue-700">
                With Professional Courses
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-8
                text-slate-600
                sm:text-lg
              "
            >
              Structured ICU and critical-care learning designed to
              help healthcare learners build practical knowledge
              through lessons, video learning, study resources and
              assessments.
            </p>

            {/* Trust Points */}

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <TrustPoint
                icon={<CheckCircle2 size={16} />}
                text="Structured curriculum"
              />

              <TrustPoint
                icon={<PlayCircle size={16} />}
                text="Video-based learning"
              />

              <TrustPoint
                icon={<Award size={16} />}
                text="Course certificates"
              />
            </div>
          </div>

          {/* View All Courses */}

          <Link
            href="/courses"
            className="
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-6
              py-3.5
              text-sm
              font-black
              text-slate-800
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-blue-400
              hover:text-blue-700
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
            "
          >
            Explore All Courses

            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* ===================================================
            COURSE GRID
        =================================================== */}

        {courses.length === 0 ? (
          <EmptyCourses />
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        )}

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

        {courses.length > 0 && (
          <div
            className="
              mt-12
              overflow-hidden
              rounded-[2rem]
              border
              border-slate-800
              bg-slate-950
              shadow-2xl
            "
          >
            <div
              className="
                relative
                flex
                flex-col
                gap-7
                px-6
                py-8
                sm:px-8
                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:px-10
              "
            >
              {/* Decorative glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-32
                  h-72
                  w-72
                  rounded-full
                  bg-cyan-500/10
                  blur-3xl
                "
              />

              {/* CTA Content */}

              <div className="relative flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-cyan-500/10
                    text-cyan-300
                    ring-1
                    ring-cyan-400/20
                  "
                >
                  <Sparkles size={22} />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.16em]
                      text-cyan-300
                    "
                  >
                    Build Your Learning Path
                  </p>

                  <h3
                    className="
                      mt-1
                      text-xl
                      font-black
                      text-white
                      sm:text-2xl
                    "
                  >
                    Choose your next critical-care skill.
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-2xl
                      text-sm
                      leading-6
                      text-slate-400
                    "
                  >
                    Explore ICU Nursing, Ventilator, ECG, ABG and
                    other professional learning resources.
                  </p>
                </div>
              </div>

              {/* CTA Button */}

              <Link
                href="/courses"
                className="
                  relative
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-black
                  text-slate-950
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-cyan-50
                  hover:shadow-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                  focus:ring-offset-2
                  focus:ring-offset-slate-950
                "
              >
                Browse Courses

                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   TRUST POINT
   ============================================================ */

function TrustPoint({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-emerald-600">
        {icon}
      </span>

      <span
        className="
          text-xs
          font-bold
          text-slate-600
        "
      >
        {text}
      </span>
    </div>
  );
}

/* ============================================================
   EMPTY COURSES
   ============================================================ */

function EmptyCourses() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[2rem]
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-16
        text-center
        shadow-sm
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          bg-cyan-50
          text-cyan-700
        "
      >
        <GraduationCap size={36} />
      </div>

      <h3
        className="
          mt-6
          text-2xl
          font-black
          text-slate-950
        "
      >
        Courses Are Being Prepared
      </h3>

      <p
        className="
          mx-auto
          mt-3
          max-w-lg
          text-sm
          leading-7
          text-slate-500
        "
      >
        Professional ICU and critical-care courses will appear
        here once they are published to the learning platform.
      </p>

      <Link
        href="/courses"
        className="
          mt-7
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-700
          px-6
          py-3
          text-sm
          font-black
          text-white
          transition
          hover:bg-blue-800
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
        "
      >
        Explore Courses

        <ArrowRight size={17} />
      </Link>
    </div>
  );
}