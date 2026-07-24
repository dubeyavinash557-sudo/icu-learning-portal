export default function VentilatorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Ventilator Full Course
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-8">
          Learn Mechanical Ventilation from Basic to Advanced with practical ICU
          nursing knowledge, ventilator modes, settings, alarms and patient care.
        </p>

        {/* Course Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            📚 Course Overview
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Introduction to Mechanical Ventilation</li>
            <li>Indications for Ventilator Support</li>
            <li>Ventilator Components</li>
            <li>Basic Ventilator Modes</li>
            <li>Ventilator Settings</li>
            <li>Patient Monitoring</li>
            <li>Ventilator Alarms</li>
            <li>Weaning from Ventilator</li>
          </ul>
        </section>

        {/* Ventilator Modules */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🫁 Ventilator Modules
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-700">
                Module 1: Ventilator Basics
              </h3>
              <p className="text-gray-700">
                Introduction, indications and components of a ventilator.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-700">
                Module 2: Ventilator Modes
              </h3>
              <p className="text-gray-700">
                Volume Control, Pressure Control, SIMV, CPAP and BiPAP.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-700">
                Module 3: Ventilator Settings
              </h3>
              <p className="text-gray-700">
                Tidal Volume, FiO₂, PEEP, Respiratory Rate and I:E Ratio.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-700">
                Module 4: Nursing Care
              </h3>
              <p className="text-gray-700">
                Suctioning, ET Tube Care, Alarm Management and Weaning.
              </p>
            </div>

          </div>
        </section>

        {/* Practical Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🩺 Practical Ventilator Skills
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Endotracheal Tube (ET Tube) Care</li>
            <li>Tracheostomy Care</li>
            <li>Suctioning Technique</li>
            <li>Ventilator Alarm Troubleshooting</li>
            <li>Humidifier &amp; HME Filter Care</li>
            <li>Patient Monitoring and Documentation</li>
          </ul>
        </section>

        {/* Buttons */}
        <div className="mt-8 text-center space-y-4">

          <a
            href="/pdfs/ventilator-notes.pdf"
            target="_blank"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            📄 Download Ventilator Notes PDF
          </a>

          <br />

          <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
            ▶ Start Ventilator Course
          </button>

        </div>

      </div>
    </main>
  );
}