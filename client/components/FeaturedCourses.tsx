import Link from "next/link";

import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  GraduationCap,
  PlayCircle,
  Sparkles,
  Stethoscope,
  ShieldCheck,
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
      id="featured-courses"
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
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-16
          h-96
          w-96
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-1/3
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-64
          w-64
          -translate-x-1/2
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      {/* Subtle clinical grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
        "
        style={{
          backgroundImage:
            "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <div className="mb-12 lg:mb-14">
          <div
            className="
              flex
              flex-col
              gap-8
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* -------------------------------------------------
                LEFT CONTENT
            ------------------------------------------------- */}

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
                  leading-[1.08]
                  tracking-[-0.025em]
                  text-slate-950
                  sm:text-4xl
                  md:text-5xl
                "
              >
                Master Critical Care

                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-blue-700
                    via-blue-600
                    to-cyan-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  With Professional Courses
                </span>
              </h2>

              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-7
                  text-slate-600
                  sm:text-lg
                  sm:leading-8
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

            {/* -------------------------------------------------
                VIEW ALL COURSES
            ------------------------------------------------- */}

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
        </div>

        {/* ===================================================
            COURSE GRID
        =================================================== */}

        {courses.length === 0 ? (
          <EmptyCourses />
        ) : (
          <>
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

            {/* Course count / supporting information */}

            <div
              className="
                mt-7
                flex
                flex-col
                gap-3
                text-center
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:text-left
              "
            >
              <div className="inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-500 sm:justify-start">
                <ShieldCheck
                  size={15}
                  className="text-emerald-600"
                />

                Professional learning resources
              </div>

              <Link
                href="/courses"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  text-xs
                  font-black
                  text-blue-700
                  transition
                  hover:text-blue-900
                "
              >
                View complete course catalogue
                <ArrowRight size={15} />
              </Link>
            </div>
          </>
        )}

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

        {courses.length > 0 && (
          <div
            className="
              relative
              mt-12
              overflow-hidden
              rounded-[2rem]
              border
              border-slate-800
              bg-slate-950
              shadow-2xl
              sm:mt-14
            "
          >
            {/* CTA background glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                -top-36
                h-80
                w-80
                rounded-full
                bg-cyan-500/10
                blur-3xl
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-40
                left-1/3
                h-80
                w-80
                rounded-full
                bg-blue-600/10
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                flex-col
                gap-8
                px-6
                py-8
                sm:px-8
                sm:py-9
                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:px-10
                lg:py-10
              "
            >
              {/* CTA Content */}

              <div className="flex items-start gap-4">
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
                  <div className="flex flex-wrap items-center gap-2">
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

                    <span
                      className="
                        rounded-full
                        border
                        border-emerald-400/20
                        bg-emerald-400/10
                        px-2.5
                        py-1
                        text-[9px]
                        font-black
                        uppercase
                        tracking-wider
                        text-emerald-300
                      "
                    >
                      Learn at your pace
                    </span>
                  </div>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-black
                      leading-tight
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

              {/* CTA Actions */}

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  lg:shrink-0
                "
              >
                <Link
                  href="/courses"
                  className="
                    group
                    inline-flex
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

                  <ArrowRight
                    size={17}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>

                <Link
                  href="/register"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-white/5
                    px-6
                    py-3.5
                    text-sm
                    font-black
                    text-white
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-white/30
                    hover:bg-white/10
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-400
                    focus:ring-offset-2
                    focus:ring-offset-slate-950
                  "
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            PROFESSIONAL LEARNING STRIP
        =================================================== */}

        <div
          className="
            mt-10
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <div
            className="
              grid
              divide-y
              divide-slate-200
              md:grid-cols-3
              md:divide-x
              md:divide-y-0
            "
          >
            <PlatformValue
              icon={<BookOpenCheck size={19} />}
              title="Structured Courses"
              description="Follow clear learning paths from fundamentals to advanced topics."
            />

            <PlatformValue
              icon={<Stethoscope size={19} />}
              title="Clinical Learning"
              description="Build practical understanding of important ICU concepts."
            />

            <PlatformValue
              icon={<Award size={19} />}
              title="Learning Achievement"
              description="Complete eligible programs and earn course certificates."
            />
          </div>
        </div>
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

      <span className="text-xs font-bold text-slate-600">
        {text}
      </span>
    </div>
  );
}

/* ============================================================
   PLATFORM VALUE
============================================================ */

function PlatformValue({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 sm:p-6">
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-700
          ring-1
          ring-blue-100
        "
      >
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
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
        sm:px-10
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
          ring-1
          ring-cyan-100
        "
      >
        <GraduationCap size={36} />
      </div>

      <p
        className="
          mt-6
          text-xs
          font-black
          uppercase
          tracking-[0.16em]
          text-cyan-700
        "
      >
        Professional Learning
      </p>

      <h3
        className="
          mt-2
          text-2xl
          font-black
          tracking-tight
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
          shadow-lg
          shadow-blue-700/20
          transition
          hover:bg-blue-800
          hover:shadow-xl
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