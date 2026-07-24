export default function ECGPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          ECG Full Course
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-8">
          Learn ECG Interpretation from Basic to Advanced with practical ICU nursing knowledge,
          cardiac rhythms, ECG analysis, emergency ECG management and patient monitoring.
        </p>
        {/* Course Overview */}
<section className="mb-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
    📚 Course Overview
  </h2>

  <ul className="list-disc ml-6 text-gray-700 space-y-2">
    <li>Introduction to ECG</li>
    <li>Cardiac Anatomy & Physiology</li>
    <li>ECG Paper and Leads</li>
    <li>Heart Rate Calculation</li>
    <li>Normal ECG Waveforms (P, QRS, T)</li>
    <li>ECG Rhythm Interpretation</li>
    <li>Common Arrhythmias</li>
    <li>Emergency ECG Recognition</li>
  </ul>
</section>{/* ECG Modules */}
<section className="mb-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
    ❤️ ECG Modules
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="font-bold text-blue-700">
        Module 1: ECG Basics
      </h3>
      <p className="text-gray-700">
        Introduction, ECG machine, leads and paper.
      </p>
    </div>

    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-bold text-green-700">
        Module 2: ECG Interpretation
      </h3>
      <p className="text-gray-700">
        P Wave, PR Interval, QRS Complex, ST Segment and T Wave.
      </p>
    </div>

    <div className="bg-yellow-50 p-4 rounded-lg">
      <h3 className="font-bold text-yellow-700">
        Module 3: Cardiac Rhythms
      </h3>
      <p className="text-gray-700">
        Normal Sinus Rhythm, Bradycardia, Tachycardia and Arrhythmias.
      </p>
    </div>

    <div className="bg-red-50 p-4 rounded-lg">
      <h3 className="font-bold text-red-700">
        Module 4: Emergency ECG
      </h3>
      <p className="text-gray-700">
        STEMI, NSTEMI, Heart Block, VF, VT and ACLS ECG Recognition.
      </p>
    </div>

  </div>
</section>
{/* Practical ECG Skills */}
<section className="mb-8">

  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
    🩺 Practical ECG Skills
  </h2>

  <ul className="list-disc ml-6 text-gray-700 space-y-2">
    <li>12 Lead ECG Recording</li>
    <li>ECG Electrode Placement</li>
    <li>Heart Rate Calculation</li>
    <li>Rhythm Analysis</li>
    <li>ECG Interpretation Practice</li>
    <li>Emergency ECG Recognition</li>
  </ul>

</section>
{/* Buttons */}
<div className="mt-8 text-center space-y-4">

  <a
    href="/pdfs/ecg-notes.pdf"
    target="_blank"
    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
  >
    📄 Download ECG Notes PDF
  </a>

  <br />

  <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
    ▶ Start ECG Course
  </button>

</div>

      </div>
    </main>
  );
}