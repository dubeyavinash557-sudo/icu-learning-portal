import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100 py-10 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white text-center py-8 px-6">
          <div className="text-5xl mb-3">🏥</div>

          <h1 className="text-3xl font-bold">
            ICU Learning Portal
          </h1>

          <p className="mt-2 text-blue-100">
            Student Login
          </p>
        </div>

        {/* Form */}
        <div className="p-8">

          <form className="space-y-5">

            <div>
              <label className="block font-bold text-gray-800 mb-2">
                📧 Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-2 border-gray-300 rounded-xl p-3 text-gray-900 placeholder:text-gray-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-2">
                🔒 Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border-2 border-gray-300 rounded-xl p-3 text-gray-900 placeholder:text-gray-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-3 rounded-xl text-lg font-bold hover:scale-105 transition duration-300 shadow-lg"
            >
              🔑 Login
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-700 font-bold hover:underline"
            >
              Register Here
            </Link>
          </p>

        </div>

      </div>
    </main>
  );
}