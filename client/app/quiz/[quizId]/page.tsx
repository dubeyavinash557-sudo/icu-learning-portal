import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import QuizClient from "./QuizClient";

type Props = {
  params: Promise<{
    quizId: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function QuizPage({ params }: Props) {
  const { quizId } = await params;

  // ==========================================================
  // 1. AUTHENTICATION
  // ==========================================================

  const session = await auth();

  if (!session?.user?.email) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(
        `/quiz/${quizId}`
      )}`
    );
  }

  // ==========================================================
  // 2. CURRENT USER
  // ==========================================================

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // ==========================================================
  // 3. FIND QUIZ
  // ==========================================================

  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          price: true,
          isPremium: true,
        },
      },

      /*
       * QuizQuestion schema me createdAt nahi hai.
       * Isliye yahan createdAt par orderBy nahi karna hai.
       */
      questions: {
        select: {
          id: true,
          question: true,
          optionA: true,
          optionB: true,
          optionC: true,
          optionD: true,
        },
      },
    },
  });

  if (!quiz) {
    notFound();
  }

  const course = quiz.course;

  // ==========================================================
  // 4. COURSE ACCESS TYPE
  //
  // Free:
  //   price === 0
  //   AND
  //   isPremium === false
  //
  // Everything else = Paid / Premium
  // ==========================================================

  const isFreeCourse =
    course.price === 0 &&
    course.isPremium === false;

  // ==========================================================
  // 5. ADMIN ACCESS
  // ==========================================================

  const isAdmin = user.role === "ADMIN";

  // ==========================================================
  // 6. STUDENT ENROLLMENT
  //
  // Admin ko enrollment ki requirement nahi.
  // Student ko enrollment required hai.
  // ==========================================================

  if (!isAdmin) {
    const enrollment =
      await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
        select: {
          id: true,
          progress: true,
          completed: true,
        },
      });

    if (!enrollment) {
      redirect(`/courses/${course.id}`);
    }

    // ========================================================
    // 7. PAYMENT SECURITY
    // ========================================================

    if (!isFreeCourse) {
      const successfulPayment =
        await prisma.payment.findFirst({
          where: {
            userId: user.id,
            courseId: course.id,
            status: "SUCCESS",
          },
          select: {
            id: true,
            amount: true,
            status: true,
            razorpayOrderId: true,
            razorpayPaymentId: true,
            transactionId: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

      // ------------------------------------------------------
      // No successful payment
      // ------------------------------------------------------

      if (!successfulPayment) {
        console.warn(
          "QUIZ ACCESS DENIED - PAYMENT REQUIRED:",
          {
            userId: user.id,
            courseId: course.id,
            quizId: quiz.id,
          }
        );

        redirect(`/courses/${course.id}`);
      }

      // ------------------------------------------------------
      // Verify payment amount
      // ------------------------------------------------------

      const paymentAmountInPaise =
        Math.round(
          successfulPayment.amount * 100
        );

      const courseAmountInPaise =
        Math.round(course.price * 100);

      if (
        !Number.isSafeInteger(
          paymentAmountInPaise
        ) ||
        !Number.isSafeInteger(
          courseAmountInPaise
        ) ||
        paymentAmountInPaise !==
          courseAmountInPaise
      ) {
        console.error(
          "QUIZ ACCESS DENIED - PAYMENT AMOUNT MISMATCH:",
          {
            userId: user.id,
            courseId: course.id,
            quizId: quiz.id,
            paymentId:
              successfulPayment.id,
            paymentAmount:
              successfulPayment.amount,
            coursePrice:
              course.price,
          }
        );

        redirect(`/courses/${course.id}`);
      }

      // ------------------------------------------------------
      // Verify Razorpay transaction
      // ------------------------------------------------------

      if (
        !successfulPayment.razorpayPaymentId &&
        !successfulPayment.transactionId
      ) {
        console.error(
          "QUIZ ACCESS DENIED - PAYMENT VERIFICATION INCOMPLETE:",
          {
            userId: user.id,
            courseId: course.id,
            quizId: quiz.id,
            paymentId:
              successfulPayment.id,
          }
        );

        redirect(`/courses/${course.id}`);
      }

      console.log(
        "QUIZ PAYMENT ACCESS VERIFIED:",
        {
          userId: user.id,
          courseId: course.id,
          quizId: quiz.id,
          paymentId:
            successfulPayment.id,
          razorpayPaymentId:
            successfulPayment.razorpayPaymentId,
        }
      );
    }
  }

  // ==========================================================
  // 8. PROTECT CORRECT ANSWERS
  //
  // Sirf question/options browser ko bheje jayenge.
  // correctAnswer / explanation browser ko nahi bheje jayenge.
  // ==========================================================

  const questions = quiz.questions.map(
    (question) => ({
      id: question.id,
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
    })
  );

  // ==========================================================
  // 9. EMPTY QUIZ PROTECTION
  // ==========================================================

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 px-6 py-10 text-center text-white sm:px-10">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <span className="text-3xl">
                  ?
                </span>
              </div>

              <h1 className="mt-5 text-2xl font-black sm:text-3xl">
                Quiz Not Available
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100">
                This quiz has been created, but no
                questions have been added yet.
              </p>

            </div>

            <div className="p-6 text-center sm:p-8">

              <p className="text-sm text-slate-500">
                Course
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                {course.title}
              </h2>

              <Link
                href={`/courses/${course.id}`}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Back to Course
              </Link>

            </div>

          </div>
        </div>
      </main>
    );
  }

  // ==========================================================
  // 10. RENDER QUIZ
  // ==========================================================

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ======================================================
          TOP HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-blue-700"
          >
            <span aria-hidden="true">
              ←
            </span>

            <span className="hidden sm:inline">
              Back to Course
            </span>

            <span className="sm:hidden">
              Course
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center md:flex">
            <div className="max-w-xl text-center">

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
                ICU Learning Portal
              </p>

              <p className="truncate text-sm font-black text-slate-800">
                {course.title}
              </p>

            </div>
          </div>

          <div className="flex items-center gap-2">

            <span className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
              {questions.length} Questions
            </span>

            <span className="hidden rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 sm:inline-flex">
              {isAdmin
                ? "Admin Access"
                : isFreeCourse
                  ? "Free Access"
                  : "Premium Access"}
            </span>

          </div>

        </div>

      </header>

      {/* ======================================================
          QUIZ INTRO
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 lg:px-8">

          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 text-white shadow-xl sm:p-8 lg:p-10">

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-cyan-300 ring-1 ring-cyan-400/20">
                Course Assessment
              </span>

              {!isFreeCourse && !isAdmin && (
                <span className="rounded-full bg-amber-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-amber-300 ring-1 ring-amber-400/20">
                  Premium
                </span>
              )}

            </div>

            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
              {quiz.title}
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
              Test your understanding of the
              course content with this structured
              assessment.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <QuizStat
                label="Course"
                value={course.title}
              />

              <QuizStat
                label="Questions"
                value={String(
                  questions.length
                )}
              />

              <QuizStat
                label="Access"
                value={
                  isAdmin
                    ? "Admin"
                    : isFreeCourse
                      ? "Free"
                      : "Premium"
                }
              />

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          QUIZ CLIENT
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        <QuizClient
          quiz={{
            id: quiz.id,
            title: quiz.title,
            course: {
              title: course.title,
            },
            questions,
          }}
        />

      </section>

    </main>
  );
}

// ==========================================================
// QUIZ STAT
// ==========================================================

function QuizStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 line-clamp-2 text-sm font-black text-white">
        {value}
      </p>

    </div>
  );
}