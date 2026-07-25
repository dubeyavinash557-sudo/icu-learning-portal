"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  HeartPulse,
  Mail,
  Lock,
} from "lucide-react";


export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  async function handleLogin(e: React.FormEvent) {

    e.preventDefault();

    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });


    if (result?.error) {

      setError("Invalid email or password");

      return;

    }


    router.push("/dashboard");

  }



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



        {/* Login Form */}

        <div className="p-8">


          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >



            {/* Error Message */}

            {error && (

              <p className="text-red-600 text-center font-semibold">
                {error}
              </p>

            )}




            {/* Email */}

            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                Email Address
              </label>


              <div className="relative">


                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />


                <input

                  type="email"

                  value={email}

                  onChange={(e)=>setEmail(e.target.value)}

                  placeholder="Enter your email"

                  className="w-full pl-10 p-3 border rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"

                  required

                />


              </div>

            </div>



            {/* Password */}

            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                Password
              </label>


              <div className="relative">


                <Lock

                  className="absolute left-3 top-3 text-gray-400"

                  size={20}

                />


                <input

                  type="password"

                  value={password}

                  onChange={(e)=>setPassword(e.target.value)}

                  placeholder="Enter your password"

                  className="w-full pl-10 p-3 border rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"

                  required

                />


              </div>


            </div>
                        {/* Remember Me */}

            <div className="flex justify-between items-center text-sm">


              <label className="flex items-center gap-2 text-gray-600">

                <input
                  type="checkbox"
                />

                Remember me

              </label>



              <Link

                href="#"

                className="text-blue-600 font-semibold hover:underline"

              >

                Forgot Password?

              </Link>


            </div>




            {/* Login Button */}

            <button

              type="submit"

              className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg"

            >

              Login

            </button>



          </form>





          {/* Register Link */}

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