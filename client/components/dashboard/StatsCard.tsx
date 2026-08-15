import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        p-6
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        bg-white
        border-slate-200

        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      {/* Icon */}
      <div
        className="
          rounded-xl
          p-3
          transition-colors
          duration-300

          bg-blue-50
          dark:bg-blue-500/10
        "
      >
        <Icon
          className="
            h-8
            w-8
            text-blue-600
            transition-transform
            duration-300
            group-hover:scale-110

            dark:text-blue-400
          "
        />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <p
          className="
            text-sm
            font-medium

            text-slate-500
            dark:text-slate-400
          "
        >
          {title}
        </p>

        <h2
          className="
            mt-1
            text-2xl
            font-bold

            text-slate-900
            dark:text-white
          "
        >
          {value}
        </h2>
      </div>
    </div>
  );
}