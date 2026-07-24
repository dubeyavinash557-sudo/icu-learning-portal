import Link from "next/link";

export default function RegisterPage() {
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
            Create Your Student Account
          </p>
        </div>

        {/* Form */}
        <div className="p-8">

          <form className="space-y-5">

            <div>
              <label className="block font-bold text-gray-800 mb-2">
                👤 Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border-2 border-gray-300 rounded-xl p-3 text-gray-900 placeholder:text-gray-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
              />
            </div>

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
                📱 Mobile Number
              </label>

              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full border-2 border-gray-300 rounded-xl p-3 text-gray-900 placeholder:text-gray-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-2">
                🔒 Password
              </label>

              <input
                type="password"
                placeholder="Create your password"
                className="w-full border-2 border-gray-300 rounded-xl p-3 text-gray-900 placeholder:text-gray-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-2">
                🔐 Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border-2 border-gray-300 rounded-xl p-3 text-gray-900 placeholder:text-gray-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2"
              />

              <label className="text-gray-700">
                I agree to the{" "}
                <span className="text-blue-700 font-semibold">
                  Terms & Conditions
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-3 rounded-xl text-lg font-bold hover:scale-105 transition duration-300 shadow-lg"
            >
              🚀 Create Account
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-700 font-bold hover:underline"
            >
              Login Here
            </Link>
          </p>

        </div>

      </div>
    </main>
  );
}