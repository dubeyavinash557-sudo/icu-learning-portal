import Link from "next/link";
import { Mail, Lock, HeartPulse } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white text-center p-8">

          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <HeartPulse size={45} />
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            ICU Learning Portal
          </h1>

          <p className="mt-2 text-blue-100">
            Welcome Back, Student
          </p>

        </div>


        {/* Form */}
        <div className="p-8">

          <form className="space-y-5">


            {/* Email */}
            <div>

              <label className="font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative mt-2">

                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 p-3 border rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />

              </div>

            </div>



            {/* Password */}
            <div>

              <label className="font-semibold text-gray-700">
                Password
              </label>


              <div className="relative mt-2">

                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />


                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 p-3 border rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />

              </div>

            </div>



            {/* Options */}
            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2 text-gray-600">

                <input type="checkbox" />

                Remember me

              </label>


              <Link
                href="#"
                className="text-blue-600 font-semibold"
              >
                Forgot Password?
              </Link>

            </div>



            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg"
            >

              Login

            </button>


          </form>



          <p className="text-center mt-8 text-gray-600">

            Don't have an account?{" "}

            <Link
              href="/register"
              className="text-blue-700 font-bold"
            >
              Register Here
            </Link>

          </p>


        </div>

      </div>

    </main>
  );
}