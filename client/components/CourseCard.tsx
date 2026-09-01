import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  Award,
  BookOpen,
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
  return (
    <article
      className="
        group
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
        hover:-translate-y-2
        hover:border-blue-200
        hover:shadow-2xl
      "
    >
      {/* ==================================================
          COURSE IMAGE
      ================================================== */}

      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <Image
          src={course.image}
          alt={`${course.title} - ICU Learning Portal`}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            25vw
          "
        />

        {/* Image overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-950/80
            via-slate-950/15
            to-transparent
          "
        />

        {/* Premium badge */}

        {course.isPremium && (
          <div
            className="
              absolute
              left-4
              top-4
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-yellow-300/30
              bg-slate-950/80
              px-3
              py-1.5
              text-[11px]
              font-black
              uppercase
              tracking-wide
              text-yellow-300
              shadow-lg
              backdrop-blur-md
            "
          >
            <Crown size={13} />
            Premium
          </div>
        )}

        {/* Course level */}

        <div
          className="
            absolute
            right-4
            top-4
            rounded-full
            border
            border-white/30
            bg-white/90
            px-3
            py-1.5
            text-[11px]
            font-black
            uppercase
            tracking-wide
            text-slate-800
            shadow-lg
            backdrop-blur-md
          "
        >
          {course.level}
        </div>

        {/* Rating */}

        <div
          className="
            absolute
            bottom-4
            left-4
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
        >
          <Star
            size={14}
            fill="currentColor"
            className="text-yellow-400"
          />

          <span className="text-sm font-black">
            {Number.isFinite(course.rating)
              ? course.rating.toFixed(1)
              : "5.0"}
          </span>
        </div>

        {/* Course label */}

        <div
          className="
            absolute
            bottom-4
            right-4
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
          <BookOpen size={14} />
          Course
        </div>
      </div>

      {/* ==================================================
          COURSE CONTENT
      ================================================== */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Instructor */}

        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-cyan-50
              text-cyan-700
            "
          >
            <GraduationCap size={14} />
          </div>

          <p
            className="
              truncate
              text-xs
              font-black
              uppercase
              tracking-[0.12em]
              text-cyan-700
            "
          >
            {course.instructor}
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
          {course.title}
        </h3>

        {/* ==================================================
            COURSE METADATA
        ================================================== */}

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <CourseMeta
            icon={<Users size={15} />}
            label="Students"
            value={`${Math.max(0, course.students).toLocaleString(
              "en-IN"
            )}+`}
          />

          <CourseMeta
            icon={<Clock3 size={15} />}
            label="Duration"
            value={formatDuration(course.duration)}
          />

          <CourseMeta
            icon={<Globe2 size={15} />}
            label="Language"
            value={course.language || "Hindi"}
          />

          <CourseMeta
            icon={<Award size={15} />}
            label="Outcome"
            value="Certificate"
          />
        </div>

        {/* Divider */}

        <div className="my-5 h-px bg-slate-100" />

        {/* ==================================================
            PRICE
        ================================================== */}

        <div className="flex items-end justify-between gap-3">
          <div>
            <p
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Course Access
            </p>

            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-950">
                ₹{Math.max(0, course.price).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {course.isPremium && (
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
              <Crown size={12} />
              Premium
            </div>
          )}
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div className="mt-5 space-y-2.5">
          <Link
            href={`/courses/${course.id}`}
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
              className="
                transition-transform
                duration-300
                group-hover/button:translate-x-1
              "
            />
          </Link>

          <Link
            href={`/courses/${course.id}`}
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
            <PlayCircle size={16} />

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
      <div className="flex items-center gap-1.5 text-slate-400">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-wide">
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

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${remainingMinutes}m`;
}