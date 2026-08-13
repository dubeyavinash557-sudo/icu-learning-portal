export default function Stats() {
  const stats = [
    {
      value: "10,000+",
      label: "Students",
      description: "Learners joined",
      icon: "👨‍⚕️",
    },
    {
      value: "50+",
      label: "Courses",
      description: "Critical care topics",
      icon: "📚",
    },
    {
      value: "100+",
      label: "PDF Notes",
      description: "Study resources",
      icon: "📄",
    },
    {
      value: "95%",
      label: "Success Rate",
      description: "Learning outcomes",
      icon: "🏆",
    },
  ];

  return (
    <section className="relative bg-slate-50 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Trusted Learning Platform
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Learn With Confidence
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Structured learning resources designed for ICU nursing,
            critical care and healthcare professionals.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition duration-300 group-hover:bg-blue-100">
                  {stat.icon}
                </div>

                <span className="text-sm font-semibold text-green-600">
                  ✓
                </span>
              </div>

              <h3 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
                {stat.value}
              </h3>

              <p className="mt-2 text-lg font-bold text-blue-700">
                {stat.label}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}