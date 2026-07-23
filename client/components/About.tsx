export default function About() {
  return (
    <section className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl font-bold text-center text-blue-700">
          Why Choose ICU Learning Portal?
        </h2>

        <p className="text-center text-gray-600 mt-6 text-xl">
          India's Professional Critical Care Learning Platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          <div className="shadow-lg rounded-2xl p-8 text-center hover:scale-105 duration-300">
            <div className="text-5xl">👨‍⚕️</div>
            <h3 className="text-2xl font-bold mt-4 text-blue-700">
              ICU Expert Trainers
            </h3>
            <p className="mt-3 text-gray-600">
              Learn directly from experienced ICU professionals.
            </p>
          </div>

          <div className="shadow-lg rounded-2xl p-8 text-center hover:scale-105 duration-300">
            <div className="text-5xl">📺</div>
            <h3 className="text-2xl font-bold mt-4 text-blue-700">
              HD Video Classes
            </h3>
            <p className="mt-3 text-gray-600">
              Easy-to-understand video lectures with practical demonstrations.
            </p>
          </div>

          <div className="shadow-lg rounded-2xl p-8 text-center hover:scale-105 duration-300">
            <div className="text-5xl">📄</div>
            <h3 className="text-2xl font-bold mt-4 text-blue-700">
              PDF Notes
            </h3>
            <p className="mt-3 text-gray-600">
              Download complete ICU notes for revision anytime.
            </p>
          </div>

          <div className="shadow-lg rounded-2xl p-8 text-center hover:scale-105 duration-300">
            <div className="text-5xl">📝</div>
            <h3 className="text-2xl font-bold mt-4 text-blue-700">
              Practice MCQs
            </h3>
            <p className="mt-3 text-gray-600">
              Test your knowledge with chapter-wise quizzes.
            </p>
          </div>

          <div className="shadow-lg rounded-2xl p-8 text-center hover:scale-105 duration-300">
            <div className="text-5xl">🏆</div>
            <h3 className="text-2xl font-bold mt-4 text-blue-700">
              Certificate
            </h3>
            <p className="mt-3 text-gray-600">
              Earn a certificate after successful course completion.
            </p>
          </div>

          <div className="shadow-lg rounded-2xl p-8 text-center hover:scale-105 duration-300">
            <div className="text-5xl">📱</div>
            <h3 className="text-2xl font-bold mt-4 text-blue-700">
              Mobile Friendly
            </h3>
            <p className="mt-3 text-gray-600">
              Learn anytime, anywhere from your phone or computer.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}