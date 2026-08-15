import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  CreditCard,
  IndianRupee,
  ReceiptText,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PaymentsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      payments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      enrollments: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const payments = user.payments;

  const successfulPayments = payments.filter(
    (payment) =>
      payment.status.toLowerCase() === "success" ||
      payment.status.toLowerCase() === "successful" ||
      payment.status.toLowerCase() === "paid"
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status.toLowerCase() === "pending"
  );

  const failedPayments = payments.filter(
    (payment) =>
      payment.status.toLowerCase() === "failed" ||
      payment.status.toLowerCase() === "failure"
  );

  const totalPaid = successfulPayments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Header */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-700 p-7 text-white shadow-xl sm:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                <ShieldCheck size={17} />
                Secure Payment Center
              </div>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Payments &amp; Billing
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Manage your course purchases, payment history and transaction
                details from one secure dashboard.
              </p>
            </div>

            <div className="hidden h-24 w-24 items-center justify-center rounded-3xl bg-white/10 lg:flex">
              <CreditCard size={46} />
            </div>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

          <PaymentStat
            title="Total Payments"
            value={String(payments.length)}
            description="All transactions"
            icon={<ReceiptText size={22} />}
            iconClass="bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
          />

          <PaymentStat
            title="Total Paid"
            value={formatCurrency(totalPaid)}
            description="Successful payments"
            icon={<IndianRupee size={22} />}
            iconClass="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
          />

          <PaymentStat
            title="Successful"
            value={String(successfulPayments.length)}
            description="Completed transactions"
            icon={<CheckCircle2 size={22} />}
            iconClass="bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
          />

          <PaymentStat
            title="Pending"
            value={String(pendingPayments.length)}
            description="Awaiting confirmation"
            icon={<Clock3 size={22} />}
            iconClass="bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
          />

        </section>

        {/* Payment History */}
        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">

          <div className="border-b border-slate-200 p-6 dark:border-slate-800 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                  Transactions
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Payment History
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Your recent payment transactions.
                </p>
              </div>

              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {payments.length} Transaction
                {payments.length === 1 ? "" : "s"}
              </div>
            </div>
          </div>

          {payments.length === 0 ? (
            <EmptyPayments />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead className="bg-slate-50 dark:bg-slate-950/60">
                  <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="px-6 py-4 font-bold">
                      Transaction
                    </th>

                    <th className="px-6 py-4 font-bold">
                      Amount
                    </th>

                    <th className="px-6 py-4 font-bold">
                      Payment Method
                    </th>

                    <th className="px-6 py-4 font-bold">
                      Date
                    </th>

                    <th className="px-6 py-4 font-bold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
                            <ReceiptText size={20} />
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              Payment
                            </p>

                            <p className="mt-1 max-w-[240px] truncate text-xs text-slate-500 dark:text-slate-400">
                              {payment.transactionId ||
                                `Transaction ID: ${payment.id}`}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {formatCurrency(payment.amount)}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="capitalize text-sm font-medium text-slate-600 dark:text-slate-300">
                          {payment.paymentMethod || "Not specified"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {formatDate(payment.createdAt)}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <PaymentStatus status={payment.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>

        {/* Purchased Courses */}
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-7">

          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Learning Access
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              My Enrolled Courses
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Courses currently connected to your student account.
            </p>
          </div>

          {user.enrollments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <BookOpenIcon />

              <h3 className="mt-4 font-bold">
                No courses enrolled yet
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Explore our courses and start your ICU learning journey.
              </p>

              <Link
                href="/courses"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
              >
                Explore Courses
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {user.enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {enrollment.course.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Course Progress: {enrollment.progress}%
                      </p>
                    </div>

                    {enrollment.completed ? (
                      <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                        Completed
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                        Learning
                      </span>
                    )}
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          Math.max(enrollment.progress, 0),
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <Link
                    href={`/courses/${enrollment.course.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
                  >
                    Open Course
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* Failed Payments */}
        {failedPayments.length > 0 && (
          <section className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 dark:border-red-500/20 dark:bg-red-500/5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <XCircle size={22} />
              </div>

              <div>
                <h2 className="font-bold text-red-800 dark:text-red-300">
                  Failed Payments
                </h2>

                <p className="mt-1 text-sm leading-6 text-red-700 dark:text-red-400">
                  You have {failedPayments.length} failed payment
                  {failedPayments.length === 1 ? "" : "s"}. If you believe
                  there is an issue, please try the payment again or contact
                  support.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Premium CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-7 text-white shadow-xl dark:from-slate-800 dark:to-slate-900 sm:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                <CreditCard size={16} />
                Start Learning
              </div>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Ready to upgrade your ICU skills?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Explore structured ICU Nursing, Ventilator, ECG, ABG and
                Medical Coding courses designed for professional learning.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-cyan-400"
            >
              Browse Courses
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

function PaymentStat({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function PaymentStatus({
  status,
}: {
  status: string;
}) {
  const normalizedStatus = status.toLowerCase();

  const isSuccess =
    normalizedStatus === "success" ||
    normalizedStatus === "successful" ||
    normalizedStatus === "paid";

  const isPending = normalizedStatus === "pending";

  if (isSuccess) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">
        <CheckCircle2 size={14} />
        Successful
      </span>
    );
  }

  if (isPending) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
        <Clock3 size={14} />
        Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 dark:bg-red-500/10 dark:text-red-400">
      <XCircle size={14} />
      {status || "Failed"}
    </span>
  );
}

function EmptyPayments() {
  return (
    <div className="p-10 text-center sm:p-14">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
        <CreditCard size={30} />
      </div>

      <h3 className="mt-5 text-xl font-bold">
        No payments yet
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        Your payment transactions will appear here after you purchase a
        course.
      </p>

      <Link
        href="/courses"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
      >
        Explore Courses
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}

function BookOpenIcon() {
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
      <BookOpen size={26} />
    </div>
  );
}