export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 mt-20">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-bold">
            🚑 ICU Learning Portal
          </h2>

          <p className="mt-4 text-gray-300">
            Learn ICU Nursing, Ventilator, ECG, ABG and
            Critical Care from experienced professionals.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-2 text-gray-300">
            <li>Home</li>
            <li>Courses</li>
            <li>Notes</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Contact
          </h3>

          <p className="mt-4">
            📧 dubeyavinash557@gmail.com
          </p>

          <p className="mt-2">
            📞 +91 8177084179
          </p>
        </div>

      </div>

      <div className="text-center mt-10 border-t border-blue-700 pt-6 text-gray-400">
        © 2026 ICU Learning Portal. All Rights Reserved.
      </div>
    </footer>
  );
}