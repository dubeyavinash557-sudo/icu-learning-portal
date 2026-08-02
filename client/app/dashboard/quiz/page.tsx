import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Trophy,
  BookOpen,
  CheckCircle,
  Award,
  ArrowRight,
} from "lucide-react";

export default async function QuizDashboardPage() {
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

  const quizzes = await prisma.quiz.findMany({
    include: {
      course: true,
      questions: true,
      quizAttempts: {
        where: {
          userId: user.id,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const totalQuizzes = quizzes.length;

  const completedQuizzes = quizzes.filter(
    (quiz) => quiz.quizAttempts.length > 0
  ).length;

  const averageScore =
    completedQuizzes === 0
      ? 0
      : Math.round(
          quizzes.reduce((sum, quiz) => {
            if (quiz.quizAttempts.length === 0) return sum;

            return sum + quiz.quizAttempts[0].percentage;
          }, 0) / completedQuizzes
        );

  const certificates = await prisma.certificate.count({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Quiz Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Test your ICU nursing knowledge and track your progress.
        </p>
      </div>


      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow p-6">
          <BookOpen className="text-blue-600 mb-3" />
          <h2 className="text-3xl font-bold">
            {totalQuizzes}
          </h2>
          <p className="text-gray-500">
            Total Quizzes
          </p>
        </div>

        <div className="mt-3 text-sm text-slate-500">
  Live Database Data
</div>


        <div className="bg-white rounded-2xl shadow p-6">
          <CheckCircle className="text-green-600 mb-3" />
          <h2 className="text-3xl font-bold">
            {completedQuizzes}
          </h2>
          <p className="text-gray-500">
            Completed
          </p>
        </div>


        <div className="bg-white rounded-2xl shadow p-6">
          <Trophy className="text-yellow-500 mb-3" />
          <h2 className="text-3xl font-bold">
            {averageScore}%
          </h2>
          <p className="text-gray-500">
            Average Score
          </p>
        </div>


        <div className="bg-white rounded-2xl shadow p-6">
          <Award className="text-purple-600 mb-3" />
          <h2 className="text-3xl font-bold">
            {certificates}
          </h2>
          <p className="text-gray-500">
            Certificates
          </p>
        </div>

      </div>



      {/* Quiz List */}
      <div className="grid md:grid-cols-2 gap-6">

        {quizzes.map((quiz) => {

          const attempted =
            quiz.quizAttempts.length > 0;

          return (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl shadow p-6"
            >

              <h2 className="text-xl font-bold">
                {quiz.title}
              </h2>


              <p className="text-gray-500 mt-2">
                Course: {quiz.course.title}
              </p>


              <p className="text-sm mt-3">
                Questions: {quiz.questions.length}
              </p>


              <div className="mt-5">

                {attempted ? (

                  <div className="flex justify-between items-center">

                    <span className="text-green-600 font-semibold">
                      Completed
                    </span>


                    <Link
                      href={`/quiz/${quiz.id}/result`}
                      className="flex items-center gap-2 text-blue-600"
                    >
                      View Result
                      <ArrowRight size={18}/>
                    </Link>

                  </div>

                ) : (

                  <Link
                    href={`/quiz/${quiz.id}`}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl"
                  >
                    Start Quiz
                    <ArrowRight size={18}/>
                  </Link>

                )}

              </div>

            </div>
          );
        })}

      </div>


      {quizzes.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold">
            No quizzes available
          </h2>

          <p className="text-gray-500 mt-2">
            New quizzes will appear here.
          </p>
        </div>
      )}

    </div>
  );
}