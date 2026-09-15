import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Crown,
  Globe2,
  GraduationCap,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";

export type Course = {
  id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  instructor: string;
  rating: number;
  students: number;
  duration: number;
  language: string;
  level: string;
  isPremium: boolean;
};

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  const courseHref = `/courses/${course.id}`;

  const safeTitle = course.title?.trim() || "ICU Learning Course";
  const safeInstructor = course.instructor?.trim() || "ICU Learning Portal";
  const safeLanguage = course.language?.trim() || "Hindi";
  const safeLevel = course.level?.trim() || "Beginner";

  const safeRating =
    Number.isFinite(course.rating) && course.rating > 0
      ? Math.min(course.rating, 5).toFixed(1)
      : "5.0";

  const safeStudents =
    Number.isFinite(course.students) && course.students > 0
      ? Math.floor(course.students).toLocaleString("en-IN")
      : "0";

  const safePrice =
    Number.isFinite(course.price) && course.price > 0
      ? Math.max(0, course.price).toLocaleString("en-IN")
      : "0";

  const imageSource =
    typeof course.image === "string" && course.image.trim().length > 0
      ? course.image
      : "/images/icu-lms-hero.png";

  return (
    <article
      className="
        group/card
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[1.75rem]
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1.5
        hover:border-blue-200
        hover:shadow-2xl
        focus-within:border-blue-300
        focus-within:ring-2
        focus-within:ring-blue-500/20
      "
    >
      {/* ==================================================
          COURSE IMAGE
      ================================================== */}

      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <Image
          src={imageSource}
          alt={`${safeTitle} course cover`}
          fill
          quality={85}
          loading="lazy"
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover/card:scale-105
          "
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            (max-width: 1536px) 33vw,
            25vw
          "
        />

        {/* Image overlay */}

        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-950/85
            via-slate-950/20
            to-transparent
          "
        />

        {/* Top badges */}

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
          {course.isPremium ? (
            <div
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-yellow-300/30
                bg-slate-950/85
                px-3
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-[0.08em]
                text-yellow-300
                shadow-lg
                backdrop-blur-md
              "
            >
              <Crown size={13} aria-hidden="true" />
              Premium
            </div>
          ) : (
            <div
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-emerald-200/30
                bg-emerald-950/80
                px-3
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-[0.08em]
                text-emerald-200
                shadow-lg
                backdrop-blur-md
              "
            >
              <CheckCircle2 size={13} aria-hidden="true" />
              Free Access
            </div>
          )}

          <span
            className="
              rounded-full
              border
              border-white/30
              bg-white/90
              px-3
              py-1.5
              text-[10px]
              font-black
              uppercase
              tracking-[0.08em]
              text-slate-800
              shadow-lg
              backdrop-blur-md
            "
          >
            {safeLevel}
          </span>
        </div>

        {/* Bottom image information */}

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-xl
              border
              border-white/20
              bg-slate-950/75
              px-3
              py-2
              text-white
              shadow-lg
              backdrop-blur-md
            "
            aria-label={`Course rating ${safeRating} out of 5`}
          >
            <Star
              size={14}
              fill="currentColor"
              className="text-yellow-400"
              aria-hidden="true"
            />

            <span className="text-sm font-black">{safeRating}</span>
          </div>

          <div
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-xl
              bg-blue-600/90
              px-3
              py-2
              text-xs
              font-black
              text-white
              shadow-lg
              backdrop-blur-md
            "
          >
            <BookOpen size={14} aria-hidden="true" />
            Course
          </div>
        </div>
      </div>

      {/* ==================================================
          COURSE CONTENT
      ================================================== */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Instructor */}

        <div className="flex min-w-0 items-center gap-2">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-cyan-50
              text-cyan-700
            "
          >
            <GraduationCap size={15} aria-hidden="true" />
          </div>

          <p
            className="
              truncate
              text-[11px]
              font-black
              uppercase
              tracking-[0.1em]
              text-cyan-700
            "
            title={safeInstructor}
          >
            {safeInstructor}
          </p>
        </div>

        {/* Course title */}

        <h3
          className="
            mt-4
            line-clamp-2
            min-h-[3.5rem]
            text-xl
            font-black
            leading-7
            tracking-tight
            text-slate-950
          "
        >
          {safeTitle}
        </h3>

        {/* Course metadata */}

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <CourseMeta
            icon={<Users size={15} aria-hidden="true" />}
            label="Students"
            value={`${safeStudents}+`}
          />

          <CourseMeta
            icon={<Clock3 size={15} aria-hidden="true" />}
            label="Duration"
            value={formatDuration(course.duration)}
          />

          <CourseMeta
            icon={<Globe2 size={15} aria-hidden="true" />}
            label="Language"
            value={safeLanguage}
          />

          <CourseMeta
            icon={<Award size={15} aria-hidden="true" />}
            label="Outcome"
            value="Certificate"
          />
        </div>

        {/* Divider */}

        <div className="my-5 h-px bg-slate-100" />

        {/* Price and access status */}

        <div className="flex items-end justify-between gap-3">
          <div>
            <p
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-slate-400
              "
            >
              Course Access
            </p>

            <div className="mt-1 flex items-baseline gap-1">
              {course.price > 0 ? (
                <>
                  <span className="text-2xl font-black text-slate-950">
                    ₹{safePrice}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-black text-emerald-600">
                  Free
                </span>
              )}
            </div>
          </div>

          {course.isPremium ? (
            <div
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-lg
                bg-yellow-50
                px-2.5
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-wide
                text-yellow-700
              "
            >
              <Crown size={12} aria-hidden="true" />
              Premium
            </div>
          ) : (
            <div
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-lg
                bg-emerald-50
                px-2.5
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-wide
                text-emerald-700
              "
            >
              <CheckCircle2 size={12} aria-hidden="true" />
              Free
            </div>
          )}
        </div>

        {/* Actions */}

        <div className="mt-5 space-y-2.5">
          <Link
            href={courseHref}
            aria-label={`View ${safeTitle} course`}
            className="
              group/button
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-700
              px-5
              py-3.5
              text-sm
              font-black
              text-white
              shadow-lg
              shadow-blue-700/15
              transition-all
              duration-300
              hover:bg-blue-800
              hover:shadow-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
            "
          >
            View Course

            <ArrowRight
              size={17}
              aria-hidden="true"
              className="
                transition-transform
                duration-300
                group-hover/button:translate-x-1
              "
            />
          </Link>

          <Link
            href={courseHref}
            aria-label={`Start learning ${safeTitle}`}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-5
              py-3
              text-sm
              font-bold
              text-slate-700
              transition-all
              duration-300
              hover:border-blue-300
              hover:bg-blue-50
              hover:text-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
            "
          >
            <PlayCircle size={16} aria-hidden="true" />
            Start Learning
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   COURSE META
   ============================================================ */

function CourseMeta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-xl
        border
        border-slate-100
        bg-slate-50
        px-3
        py-2.5
      "
    >
      <div className="flex min-w-0 items-center gap-1.5 text-slate-400">
        {icon}

        <span className="truncate text-[10px] font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p
        className="
          mt-1
          truncate
          text-xs
          font-black
          text-slate-800
        "
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   DURATION FORMATTER
   ============================================================ */

function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "—";
  }

  const safeMinutes = Math.floor(minutes);

  if (safeMinutes < 60) {
    return `${safeMinutes} min`;
  }

  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${remainingMinutes}m`;
}