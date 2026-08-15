const testimonials = [
  {
    name: "Priya Sharma",
    role: "ICU Staff Nurse",
    location: "Delhi",
    rating: 5,
    text: "ICU Learning Portal ने मेरी ICU nursing knowledge को काफी improve किया। Ventilator और ABG topics बहुत आसानी से समझ आए।",
  },
  {
    name: "Rahul Verma",
    role: "Critical Care Nurse",
    location: "Noida",
    rating: 5,
    text: "Structured courses और practical ICU cases बहुत useful हैं। खासकर ventilator modes और emergency management modules अच्छे हैं।",
  },
  {
    name: "Neha Singh",
    role: "GNM Nurse",
    location: "Ghaziabad",
    rating: 5,
    text: "Beginner से advanced level तक सीखने के लिए platform बहुत अच्छा है। Notes, quizzes और practical learning काफी helpful हैं।",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">
      {/* Background decoration */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            ⭐ Student Reviews
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            What Our Students Say
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Thousands of healthcare learners are building their ICU and
            critical care knowledge with structured professional learning.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 text-lg text-yellow-500">
                {Array.from({ length: testimonial.rating }).map(
                  (_, index) => (
                    <span key={index}>★</span>
                  )
                )}
              </div>

              {/* Quote */}
              <p className="mt-6 text-base leading-7 text-slate-600">
                “{testimonial.text}”
              </p>

              {/* Student */}
              <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-extrabold text-blue-700">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {testimonial.role}
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-blue-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Verified */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                Verified Student
              </div>
            </article>
          ))}
        </div>

        {/* Trust banner */}
        <div className="mt-12 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <p className="text-3xl font-extrabold text-blue-700">10,000+</p>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Healthcare Learners
              </p>
            </div>

            <div>
              <p className="text-3xl font-extrabold text-blue-700">4.9/5</p>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Average Rating
              </p>
            </div>

            <div>
              <p className="text-3xl font-extrabold text-blue-700">95%</p>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Student Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}