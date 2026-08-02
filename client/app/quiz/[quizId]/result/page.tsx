import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import {
  Trophy,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    quizId: string;
  }>;
}

export default async function QuizResultPage({
  params,
}: PageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const { quizId } = await params;

  const attempt = await prisma.quizAttempt.findUnique({
    where: {
      userId_quizId: {
        userId: user.id,
        quizId,
      },
    },
    include: {
      quiz: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!attempt) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">

        <div className="text-center">

          <Trophy
            className="mx-auto text-yellow-500"
            size={70}
          />

          <h1 className="mt-6 text-4xl font-bold">
            Quiz Result
          </h1>

          <p className="mt-3 text-slate-500">
            {attempt.quiz.title}
          </p>

        </div>

        <div className="mt-10 grid grid-cols-2 gap-6">

          <div className="rounded-2xl bg-slate-100 p-6 text-center">

            <p className="text-slate-500">
              Score
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {attempt.score} / {attempt.total}
            </h2>

          </div>

          <div className="rounded-2xl bg-slate-100 p-6 text-center">

            <p className="text-slate-500">
              Percentage
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {attempt.percentage}%
            </h2>

          </div>

        </div>

        <div className="mt-10 text-center">

          {attempt.passed ? (

            <div className="inline-flex items-center gap-3 rounded-full bg-green-100 px-6 py-3 text-green-700 font-bold">

              <CheckCircle size={24} />

              PASS

            </div>

          ) : (

            <div className="inline-flex items-center gap-3 rounded-full bg-red-100 px-6 py-3 text-red-700 font-bold">

              <XCircle size={24} />

              FAIL

            </div>

          )}

        </div>

        <div className="mt-12 flex justify-center">

          <Link
            href="/dashboard/quiz"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Quiz Dashboard
          </Link>

        </div>

      </div>

    </main>
  );
}