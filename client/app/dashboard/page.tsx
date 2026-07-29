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

import {
  student,
  stats,
} from "@/data/dashboard";

export default function DashboardPage() {
  
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <Header />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">

          {/* Welcome */}
          <section className="mb-8">

            <h1 className="text-4xl font-bold text-gray-800">
  Welcome back, {student.name} 👋
</h1>

            <p className="text-gray-500 mt-3 text-lg">
              Continue your ICU Learning journey and improve your
              critical care skills.
            </p>

          </section>

          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {stats.map((item) => (
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

            <ContinueLearning />

          </section>
          {/* Quick Actions */}
<section className="mb-8">
  <QuickActions />
</section>

          <section className="mb-8">
  <LiveClasses />
</section>

          <section className="mb-8">
  <LearningAnalytics />
</section>

          <section className="mb-8">
  <StudyCalendar />
</section>

          <section className="mb-8">
  <RecentCertificate />
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