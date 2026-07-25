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
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition">
      <div className="bg-blue-50 p-3 rounded-xl">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>
    </div>
  );
}