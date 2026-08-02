import StudentProfile from "@/components/dashboard/StudentProfile";
import QuickActions from "@/components/dashboard/QuickActions";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import LiveClasses from "@/components/dashboard/LiveClasses";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import ProgressChart from "@/components/dashboard/ProgressChart";
import StudyPlan from "@/components/dashboard/StudyPlan";
import MyCourses from "@/components/dashboard/MyCourses";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Achievements from "@/components/dashboard/Achievements";
import Notifications from "@/components/dashboard/Notifications";
import LearningAnalytics from "@/components/dashboard/LearningAnalytics";
import StudyCalendar from "@/components/dashboard/StudyCalendar";
import RecentCertificate from "@/components/dashboard/RecentCertificate";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      enrollments: {
        include: {
          course: true,
        },
      },

      lessonProgress: true,

      certificates: {
        include: {
          course: true,
        },
        orderBy: {
          issuedAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const completedLessons = user.lessonProgress.filter(
    (lesson) => lesson.completed
  ).length;

  const totalLessons = await prisma.lesson.count();

  const progress =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  const currentCourse =
    user.enrollments.length > 0
      ? user.enrollments[0].course
      : null;

  const latestCertificate =
    user.certificates.length > 0
      ? user.certificates[0]
      : null;

      const quizAttempts = await prisma.quizAttempt.findMany({
  where: {
    userId: user.id,
  },
});

const averageQuizScore =
  quizAttempts.length === 0
    ? 0
    : Math.round(
        quizAttempts.reduce(
          (sum, quiz) => sum + quiz.percentage,
          0
        ) / quizAttempts.length
      );

const completedCourses = user.enrollments.filter(
  (course) => course.completed
).length;

const dashboardStats = [
  {
    title: "Total Courses",
    value: String(user.enrollments.length),
    icon: BookOpen,
  },
  {
    title: "Completed",
    value: String(completedCourses),
    icon: CheckCircle,
  },
  {
    title: "Hours Learned",
    value: String(completedLessons),
    icon: Clock,
  },
  {
    title: "Quiz Average",
    value: `${averageQuizScore}%`,
    icon: Award,
  },
];

  return (

        <div className="min-h-screen bg-slate-100">

      <Header />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">

          {/* Welcome */}
          <section className="mb-8">

            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back, {user.fullName} 👋
            </h1>

            <p className="mt-3 text-lg text-gray-500">
              Continue your ICU Learning journey and improve your
              critical care skills.
            </p>

          </section>

          {/* Stats Cards */}
          <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

            {dashboardStats.map((item) => (
              <StatsCard
                key={item.title}
                title={item.title}
                value={item.value}
                icon={item.icon}
              />
            ))}

          </section>

          {/* Continue Learning */}
          <section className="mb-8">

            <ContinueLearning
              courseTitle={currentCourse?.title ?? "No Course Enrolled"}
              progress={progress}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
            />

          </section>

          {/* Quick Actions */}
          <section className="mb-8">
            <QuickActions />
          </section>

          {/* Live Classes */}
          <section className="mb-8">
            <LiveClasses />
          </section>

          {/* Learning Analytics */}
          <section className="mb-8">
            <LearningAnalytics />
          </section>

          {/* Study Calendar */}
          <section className="mb-8">
            <StudyCalendar />
          </section>

          {/* Latest Certificate */}
          <section className="mb-8">
            <RecentCertificate
              certificate={latestCertificate}
            />
          </section>

          {/* Progress + Study Plan */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

            <ProgressChart />

            <StudyPlan />

          </section>

                    {/* My Courses */}
          <section className="mb-8">
            <MyCourses />
          </section>

          {/* Recent Activity + Achievements */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

            <RecentActivity />

            <Achievements />

          </section>

          {/* Notifications */}
          <section className="mb-8">
            <Notifications />
          </section>

          {/* Student Profile */}
          <section className="mb-8">
            <StudentProfile />
          </section>

        </main>

      </div>

    </div>
  );
}