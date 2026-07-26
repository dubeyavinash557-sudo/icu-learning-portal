"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    qualification: "",
    hospital: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          qualification: formData.qualification,
          hospital: formData.hospital,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        setLoading(false);
        return;
      }

      setMessage("Registration Successful.");

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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

        <div className="p-8">

          {message && (
            <div className="mb-5 rounded-xl bg-blue-50 border border-blue-200 p-3 text-center text-blue-700 font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <InputField
              icon={<User size={20} />}
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <InputField
              icon={<Mail size={20} />}
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <InputField
              icon={<Phone size={20} />}
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
            />

            <InputField
              icon={<GraduationCap size={20} />}
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="GNM / B.Sc Nursing"
            />

            <InputField
              icon={<Building2 size={20} />}
              label="Hospital Name"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="Enter hospital name"
            />

            <InputField
              icon={<Lock size={20} />}
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
            />

            <InputField
              icon={<Lock size={20} />}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
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

type InputFieldProps = {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  icon,
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
}: InputFieldProps) {
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
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full pl-10 p-3 border rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

    </div>
  );
}