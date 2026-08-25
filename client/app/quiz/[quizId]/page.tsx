import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Crown,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import QuizClient from "./QuizClient";

interface PageProps {
  params: Promise<{
    quizId: string;
  }>;
}

export default async function QuizPage({
  params,
}: PageProps) {
  // =========================================================
  // 1. AUTHENTICATION
  // =========================================================

  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // =========================================================
  // 2. GET LOGGED-IN USER
  // =========================================================

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      isPremium: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // =========================================================
  // 3. GET QUIZ ID
  // =========================================================

  const { quizId } = await params;

  if (
    typeof quizId !== "string" ||
    quizId.trim().length === 0
  ) {
    notFound();
  }

  // =========================================================
  // 4. GET QUIZ + COURSE
  //
  // IMPORTANT:
  // Questions are NOT sent to the client until
  // premium access has been verified.
  // =========================================================

  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    select: {
      id: true,
      title: true,

      course: {
        select: {
          id: true,
          title: true,
          isPremium: true,
          price: true,
        },
      },
    },
  });

  // =========================================================
  // 5. QUIZ NOT FOUND
  // =========================================================

  if (!quiz) {
    notFound();
  }

  // =========================================================
  // 6. PREMIUM ACCESS
  //
  // ADMIN = ALWAYS ALLOWED
  // PREMIUM USER = ALLOWED
  // NORMAL USER = BLOCKED
  // =========================================================

  const isAdmin = user.role === "ADMIN";
  const hasPremiumAccess =
    user.isPremium || isAdmin;

  // =========================================================
  // 7. PREMIUM LOCK SCREEN
  // =========================================================

  if (!hasPremiumAccess) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[75vh] max-w-5xl items-center justify-center">
          <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl">
            {/* TOP GRADIENT */}
            <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600" />

            <div className="p-6 sm:p-10 lg:p-14">
              {/* BADGE */}

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-300">
                <Crown size={15} />
                Premium Learning
              </div>

              {/* ICON */}

              <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-amber-300/20 bg-amber-300/10 text-amber-300 shadow-xl">
                <LockKeyhole size={36} />
              </div>

              {/* TITLE */}

              <h1 className="mt-7 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Premium Quiz Locked
              </h1>

              {/* COURSE */}

              <p className="mt-4 text-lg font-bold text-cyan-300">
                {quiz.title}
              </p>

              <p className="mt-2 text-base text-slate-400">
                {quiz.course.title}
              </p>

              {/* DESCRIPTION */}

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                This quiz is part of the Premium Learning
                Program. Upgrade your account to access
                the complete quiz, assessments, results and
                learning resources.
              </p>

              {/* BENEFITS */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <PremiumBenefit
                  icon={<CheckCircle2 size={18} />}
                  title="Premium Quizzes"
                  description="Access complete ICU assessments."
                />

                <PremiumBenefit
                  icon={<BookOpen size={18} />}
                  title="Study Resources"
                  description="Premium notes and learning material."
                />

                <PremiumBenefit
                  icon={<ShieldCheck size={18} />}
                  title="Learning Progress"
                  description="Track your learning and results."
                />
              </div>

              {/* PRICE */}

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                      Premium Access
                    </p>

                    <p className="mt-1 text-2xl font-black text-white">
                      ₹
                      {Number(
                        quiz.course.price || 0
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400">
                    <ShieldCheck size={17} />
                    Secure Premium Access
                  </div>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/premium"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <Crown size={18} />
                  Upgrade to Premium
                  <Sparkles size={17} />
                </Link>

                <Link
                  href="/dashboard/quiz"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10"
                >
                  <ArrowLeft size={18} />
                  Back to Quiz Dashboard
                </Link>
              </div>

              {/* SECURITY NOTE */}

              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />

                <p className="text-sm leading-6 text-slate-400">
                  Premium content is protected on the
                  server. Quiz questions are not loaded
                  into the browser until premium access
                  is verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // 8. ONLY PREMIUM USERS REACH HERE
  // =========================================================

  const quizWithQuestions =
    await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        questions: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

  if (!quizWithQuestions) {
    notFound();
  }

  // =========================================================
  // 9. EMPTY QUIZ PROTECTION
  // =========================================================

  if (quizWithQuestions.questions.length === 0) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <BookOpen size={30} />
            </div>

            <h1 className="mt-6 text-2xl font-black text-slate-900">
              Quiz Unavailable
            </h1>

            <p className="mt-3 leading-7 text-slate-500">
              This premium quiz does not contain any
              questions yet.
            </p>

            <Link
              href="/dashboard/quiz"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              <ArrowLeft size={18} />
              Quiz Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // 10. PREMIUM QUIZ
  // =========================================================

  return (
    <QuizClient
      quiz={quizWithQuestions}
    />
  );
}

// =============================================================
// PREMIUM BENEFIT
// =============================================================

function PremiumBenefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
          {icon}
        </div>

        <div>
          <p className="text-sm font-black text-white">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}