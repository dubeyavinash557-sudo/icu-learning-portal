import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Crown,
  Eye,
  GraduationCap,
  Hospital,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import {
  changeOwnPassword,
  updateOwnProfile,
} from "@/app/actions/settings-actions";

import ThemeToggle from "@/components/settings/ThemeToggle";

type SettingsPageProps = {
  searchParams: Promise<{
    updated?: string;
  }>;
};

export default async function SettingsPage({
  searchParams,
}: SettingsPageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      enrollments: true,
      certificates: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;

  const profileUpdated = params.updated === "profile";

  const totalCourses = user.enrollments.length;
  const completedCourses = user.enrollments.filter(
    (enrollment) => enrollment.completed
  ).length;

  const certificates = user.certificates.length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <span className="text-2xl">🏥</span>

            <div>
              <h1 className="font-bold text-slate-900 dark:text-white">
                ICU Learning
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Student Settings
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Account Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Settings
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
            Manage your account information, security and learning preferences.
          </p>
        </section>

        {/* Success Message */}
        {profileUpdated && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-300">
            <CheckCircle2
              size={21}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-bold">
                Profile updated successfully.
              </p>

              <p className="mt-1 text-sm">
                Your account information has been saved.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Main Settings */}
          <div className="space-y-8 xl:col-span-2">
            {/* Profile Information */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <User size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Personal Information
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Update your professional student information.
                    </p>
                  </div>
                </div>
              </div>

              <form
                action={updateOwnProfile}
                className="space-y-6 p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InputField
                    label="Full Name"
                    name="fullName"
                    defaultValue={user.fullName}
                    icon={<User size={18} />}
                    required
                  />

                  <InputField
                    label="Mobile Number"
                    name="mobile"
                    defaultValue={user.mobile}
                    icon={<Phone size={18} />}
                    required
                  />

                  <InputField
                    label="Qualification"
                    name="qualification"
                    defaultValue={user.qualification}
                    icon={<GraduationCap size={18} />}
                    required
                  />

                  <InputField
                    label="Hospital / Organization"
                    name="hospital"
                    defaultValue={user.hospital}
                    icon={<Hospital size={18} />}
                    required
                  />
                </div>

                {/* Email - Read Only */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                    <Mail
                      size={18}
                      className="shrink-0 text-slate-400"
                    />

                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none dark:text-slate-300"
                    />

                    <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-slate-400">
                      Login Email
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Email changes will require a secure verification process.
                  </p>
                </div>

                <div className="flex justify-end border-t border-slate-200 pt-6 dark:border-slate-800">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700 hover:shadow-xl"
                  >
                    <CheckCircle2 size={18} />
                    Save Changes
                  </button>
                </div>
              </form>
            </section>

            {/* Password */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400">
                    <LockKeyhole size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Password & Security
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Keep your ICU Learning account secure.
                    </p>
                  </div>
                </div>
              </div>

              <form
                action={changeOwnPassword}
                className="space-y-5 p-6 sm:p-8"
              >
                <PasswordField
                  label="Current Password"
                  name="currentPassword"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <PasswordField
                    label="New Password"
                    name="newPassword"
                  />

                  <PasswordField
                    label="Confirm New Password"
                    name="confirmPassword"
                  />
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-500/20 dark:bg-blue-500/10">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                    />

                    <div>
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-200">
                        Password security
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-800 dark:text-blue-300">
                        Use at least 8 characters. Never share your password
                        with anyone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-200 pt-6 dark:border-slate-800">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    <LockKeyhole size={18} />
                    Change Password
                  </button>
                </div>
              </form>
            </section>

            {/* Appearance */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                    <Eye size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Appearance
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Customize how ICU Learning looks on your device.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h3 className="font-bold">
                    Theme
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Switch between light and dark mode.
                  </p>
                </div>

                <ThemeToggle />
              </div>
            </section>
          </div>

          {/* Account Sidebar */}
          <aside className="space-y-8">
            {/* Account Card */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="bg-gradient-to-br from-blue-700 via-cyan-600 to-sky-500 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-700 shadow-xl">
                    <User size={28} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold">
                      {user.fullName}
                    </h2>

                    <p className="truncate text-sm text-blue-100">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-yellow-950">
                  <Crown size={17} />
                  {user.isPremium ? "Premium Member" : "Free Member"}
                </div>
              </div>

              <div className="space-y-4 p-6">
                <AccountRow
                  icon={<BadgeCheck size={18} />}
                  label="Verification"
                  value={
                    user.isVerified
                      ? "Verified"
                      : "Not Verified"
                  }
                  positive={user.isVerified}
                />

                <AccountRow
                  icon={<BookOpen size={18} />}
                  label="Courses"
                  value={String(totalCourses)}
                  positive
                />

                <AccountRow
                  icon={<CheckCircle2 size={18} />}
                  label="Completed"
                  value={String(completedCourses)}
                  positive
                />

                <AccountRow
                  icon={<Crown size={18} />}
                  label="Certificates"
                  value={String(certificates)}
                  positive
                />
              </div>
            </section>

            {/* Security Notice */}
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                />

                <div>
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-200">
                    Account Security
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-emerald-800 dark:text-emerald-300">
                    Your password is securely hashed before it is stored in
                    the database.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <h3 className="font-bold">
                Quick Links
              </h3>

              <div className="mt-4 space-y-2">
                <QuickLink
                  href="/profile"
                  icon={<User size={18} />}
                  label="My Profile"
                />

                <QuickLink
                  href="/courses"
                  icon={<BookOpen size={18} />}
                  label="My Courses"
                />

                <QuickLink
                  href="/dashboard/quiz"
                  icon={<GraduationCap size={18} />}
                  label="Quiz Dashboard"
                />
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

/*
 * ---------------------------------------------------------
 * Reusable Components
 * ---------------------------------------------------------
 */

function InputField({
  label,
  name,
  defaultValue,
  icon,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue: string;
  icon: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold"
      >
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800"
      >
        <span className="shrink-0 text-slate-400">
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type="text"
          defaultValue={defaultValue}
          required={required}
          className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

function PasswordField({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold"
      >
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800"
      >
        <LockKeyhole
          size={18}
          className="shrink-0 text-slate-400"
        />

        <input
          id={name}
          name={name}
          type="password"
          minLength={8}
          required
          autoComplete={
            name === "currentPassword"
              ? "current-password"
              : "new-password"
          }
          className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          placeholder="••••••••"
        />
      </div>
    </div>
  );
}

function AccountRow({
  icon,
  label,
  value,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  positive: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </div>

      <span
        className={`text-sm font-bold ${
          positive
            ? "text-green-600 dark:text-green-400"
            : "text-amber-600 dark:text-amber-400"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl p-3 transition hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <span className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
        <span className="text-cyan-600 dark:text-cyan-400">
          {icon}
        </span>

        {label}
      </span>

      <ChevronRight
        size={17}
        className="text-slate-400 transition group-hover:translate-x-1"
      />
    </Link>
  );
}