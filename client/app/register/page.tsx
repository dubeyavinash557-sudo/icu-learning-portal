import Link from "next/link";
import {
  HeartPulse,
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  GraduationCap,
} from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100 px-4 py-10">

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">

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
            Create Your Student Account
          </p>

        </div>


        {/* Form */}
        <div className="p-8">

          <form className="space-y-4">


            <InputField
              icon={<User size={20}/>}
              label="Full Name"
              placeholder="Enter your full name"
            />


            <InputField
              icon={<Mail size={20}/>}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
            />


            <InputField
              icon={<Phone size={20}/>}
              label="Mobile Number"
              placeholder="Enter your mobile number"
              type="tel"
            />


            <InputField
              icon={<GraduationCap size={20}/>}
              label="Qualification"
              placeholder="GNM / B.Sc Nursing"
            />


            <InputField
              icon={<Building2 size={20}/>}
              label="Hospital Name"
              placeholder="Enter hospital name"
            />


            <InputField
              icon={<Lock size={20}/>}
              label="Password"
              placeholder="Create password"
              type="password"
            />


            <InputField
              icon={<Lock size={20}/>}
              label="Confirm Password"
              placeholder="Confirm password"
              type="password"
            />


            <button
              className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg"
            >
              Create Account
            </button>


          </form>


          <p className="text-center mt-6 text-gray-600">

            Already have an account?{" "}

            <Link
              href="/login"
              className="text-blue-700 font-bold"
            >
              Login Here
            </Link>

          </p>


        </div>

      </div>

    </main>
  );
}



function InputField({
  icon,
  label,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
}) {

  return (
    <div>

      <label className="block font-semibold text-gray-700 mb-2">
        {label}
      </label>


      <div className="relative">

        <div className="absolute left-3 top-3 text-gray-400">
          {icon}
        </div>


        <input
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 p-3 border rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

    </div>
  );
}