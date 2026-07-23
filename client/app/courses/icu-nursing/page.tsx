export default function ICUNursingPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-8 py-16">

        <h1 className="text-5xl font-bold text-blue-700">
          ICU Nursing Course
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Learn ICU Nursing from beginner to advanced level.
        </p>

        <div className="mt-10 bg-white shadow-lg rounded-2xl p-8">

          <h2 className="text-3xl font-bold">
            What You Will Learn
          </h2>

          <ul className="mt-6 space-y-3 text-lg">
            <li>✅ ICU Basics</li>
            <li>✅ Patient Assessment</li>
            <li>✅ Ventilator Management</li>
            <li>✅ ECG Interpretation</li>
            <li>✅ ABG Analysis</li>
            <li>✅ Emergency Drugs</li>
            <li>✅ ICU Equipment</li>
            <li>✅ Infection Control</li>
          </ul>

          <button className="mt-8 bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800">
            Enroll Now
          </button>

        </div>

      </div>
    </main>
  );
}