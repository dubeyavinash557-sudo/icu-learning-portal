"use client";

import {
  FileDown,
  Video,
  ClipboardCheck,
  Award,
  Crown,
  MessageCircle,
} from "lucide-react";

const actions = [
  {
    title: "Download Notes",
    icon: FileDown,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Join Live Class",
    icon: Video,
    color: "from-green-600 to-emerald-500",
  },
  {
    title: "Start Quiz",
    icon: ClipboardCheck,
    color: "from-purple-600 to-pink-500",
  },
  {
    title: "Certificate",
    icon: Award,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Upgrade Premium",
    icon: Crown,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Contact Mentor",
    icon: MessageCircle,
    color: "from-slate-700 to-slate-900",
  },
];

export default function QuickActions() {
  return (
    <section className="mb-8 rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-2 text-slate-500">
          Frequently used shortcuts for your ICU learning.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className={`rounded-2xl bg-gradient-to-r ${action.color} p-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <Icon size={32} className="mx-auto mb-4" />

              <p className="text-sm font-semibold">
                {action.title}
              </p>
            </button>
          );
        })}

      </div>

    </section>
  );
}