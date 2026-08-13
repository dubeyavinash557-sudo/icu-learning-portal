import Image from "next/image";
import Link from "next/link";

const experts = [
  {
    name: "Avinash Dubey",
    role: "ICU Nursing & Critical Care Educator",
    experience: "4+ Years ICU Experience",
    description:
      "Practical ICU nursing, emergency care and critical care learning focused on real clinical situations.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800",
  },
  {
    name: "Critical Care Educator",
    role: "Mechanical Ventilation Expert",
    experience: "Advanced Ventilator Training",
    description:
      "Learn ventilator modes, settings, alarms, weaning and practical mechanical ventilation concepts.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800",
  },
  {
    name: "Cardiac Care Educator",
    role: "ECG & Cardiac Care",
    experience: "ECG Interpretation Training",
    description:
      "Build confidence in ECG interpretation, rhythm recognition and common cardiac emergencies.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800",
  },
  {
    name: "Emergency Care Educator",
    role: "ABG & Emergency Care",
    experience: "Critical Care Learning",
    description:
      "Understand ABG interpretation, acid-base balance and important ICU emergency concepts.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
  },
];

export default function Experts() {
  return (
    <section className="bg-slate-50 px-6 py-20 md:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            👨‍⚕️ Professional Educators
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Learn From Critical Care Experts
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Learn practical ICU and critical care concepts through structured
            professional training designed for healthcare learners.
          </p>
        </div>

        {/* Expert Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert) => (
            <article
              key={expert.name}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={expert.image}
                  alt={expert.role}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-lg">
                  ⭐ Expert
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-slate-900">
                  {expert.name}
                </h3>

                <p className="mt-1 text-sm font-bold text-blue-700">
                  {expert.role}
                </p>

                <p className="mt-3 text-xs font-semibold text-slate-500">
                  {expert.experience}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {expert.description}
                </p>

                <Link
                  href="/courses"
                  className="mt-6 flex w-full items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-700 hover:text-white"
                >
                  Explore Learning
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}