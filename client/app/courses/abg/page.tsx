export default function ABGPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          ABG Full Course
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-8">
          Learn Arterial Blood Gas (ABG) Analysis from Basic to Advanced with
          practical ICU nursing knowledge, acid-base balance, oxygenation,
          ventilation and emergency patient assessment.
        </p>
        {/* Course Overview */}
<section className="mb-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
    📚 Course Overview
  </h2>

  <ul className="list-disc ml-6 text-gray-700 space-y-2">
    <li>Introduction to ABG</li>
    <li>Acid-Base Balance</li>
    <li>Normal ABG Values</li>
    <li>ABG Sample Collection</li>
    <li>Step-by-Step ABG Interpretation</li>
    <li>Respiratory Acidosis & Alkalosis</li>
    <li>Metabolic Acidosis & Alkalosis</li>
    <li>Clinical Case Practice</li>
  </ul>
</section>
{/* ABG Modules */}
<section className="mb-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
    🩸 ABG Modules
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="font-bold text-blue-700">
        Module 1: ABG Basics
      </h3>
      <p className="text-gray-700">
        Introduction, indications, sample collection and normal ABG values.
      </p>
    </div>

    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-bold text-green-700">
        Module 2: Acid-Base Disorders
      </h3>
      <p className="text-gray-700">
        Respiratory and metabolic acidosis & alkalosis.
      </p>
    </div>

    <div className="bg-yellow-50 p-4 rounded-lg">
      <h3 className="font-bold text-yellow-700">
        Module 3: ABG Interpretation
      </h3>
      <p className="text-gray-700">
        Step-by-step interpretation with clinical examples.
      </p>
    </div>

    <div className="bg-red-50 p-4 rounded-lg">
      <h3 className="font-bold text-red-700">
        Module 4: Clinical Practice
      </h3>
      <p className="text-gray-700">
        ICU case studies, oxygen therapy and patient management.
      </p>
    </div>

  </div>
</section>
{/* Practical ABG Skills */}
<section className="mb-8">

  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
    🩺 Practical ABG Skills
  </h2>

  <ul className="list-disc ml-6 text-gray-700 space-y-2">
    <li>Radial Artery ABG Sample Collection</li>
    <li>Allen's Test Procedure</li>
    <li>Safe Handling of ABG Samples</li>
    <li>Step-by-Step ABG Interpretation</li>
    <li>Oxygen Therapy Assessment</li>
    <li>Clinical Case-Based ABG Analysis</li>
  </ul>

</section>
{/* Buttons */}
<div className="mt-8 text-center space-y-4">

  <a
    href="/pdfs/abg-notes.pdf"
    target="_blank"
    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
  >
    📄 Download ABG Notes PDF
  </a>

  <br />

  <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
    ▶ Start ABG Course
  </button>

</div>

      </div>
    </main>
  );
}