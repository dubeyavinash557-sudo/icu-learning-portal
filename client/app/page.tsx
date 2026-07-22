import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-700">
            ICU Learning Portal
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Master ICU Nursing, Ventilator, ECG, ABG & Critical Care
          </p>

          <button className="mt-8 bg-blue-700 text-white px-8 py-3 rounded-xl">
            Start Learning
          </button>
        </div>
      </main>
    </>
  );
}