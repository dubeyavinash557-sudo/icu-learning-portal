export default function ICUNursingPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          ICU Nursing Full Course
        </h1>

        <p className="text-gray-700 text-lg mb-8">
          Complete ICU Nursing Training - Practical Knowledge, 
          Ventilator, Emergency Care, Drugs, Monitoring and Interview Preparation.
        </p>


        {/* Course Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            📚 Course Overview
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>ICU Setup and Equipment Knowledge</li>
            <li>Patient Monitoring and Assessment</li>
            <li>Ventilator Basics and Nursing Care</li>
            <li>Emergency Drugs Knowledge</li>
            <li>Critical Care Nursing Procedure</li>
            <li>ICU Interview Preparation</li>
          </ul>
        </section>


        {/* Modules */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🏥 ICU Nursing Modules
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-700">
                Module 1: ICU Basics
              </h3>
              <p className="text-gray-700">
                ICU types, equipment, infection control and patient safety.
              </p>
            </div>


            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-700">
                Module 2: Ventilator Care
              </h3>
              <p className="text-gray-700">
                Ventilator modes, settings, alarms and nursing management.
              </p>
            </div>


            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-700">
                Module 3: Emergency Care
              </h3>
              <p className="text-gray-700">
                CPR, Code Blue, emergency drugs and crash cart.
              </p>
            </div>


            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-700">
                Module 4: Critical Care
              </h3>
              <p className="text-gray-700">
                Shock management, ABG, ECG and advanced monitoring.
              </p>
            </div>

          </div>
        </section>



        {/* Practical Skills */}
        <section className="mb-8">

          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🩺 Practical ICU Skills
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">

            <li>Endotracheal Tube (ET Tube) Care</li>
            <li>Central Line Care</li>
            <li>Arterial Line Monitoring</li>
            <li>Suctioning Procedure</li>
            <li>Drug Administration</li>
            <li>Patient Documentation</li>

          </ul>

        </section>



        {/* Interview */}
        <section className="bg-blue-100 p-6 rounded-lg">

          <h2 className="text-2xl font-semibold text-blue-800 mb-3">
            🎤 ICU Nursing Interview Preparation
          </h2>

          <p className="text-gray-700">
            Get important ICU nursing interview questions and answers,
            ventilator viva questions, emergency case discussions and
            practical nursing knowledge.
          </p>

        </section>



        {/* Button */}

        <div className="mt-8 text-center">

          <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
            Start ICU Nursing Course
          </button>

        </div>
        {/* PDF Download Button */}

<div className="mt-6 text-center">

  <a
    href="/pdfs/icu-nursing-notes.pdf"
    target="_blank"
    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 inline-block"
  >
    Download ICU Nursing Notes PDF
  </a>

</div>


      </div>
    </main>
  );
}