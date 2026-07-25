"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import MyCourses from "@/components/dashboard/MyCourses";

import {
  student,
  stats,
  recentActivity,
} from "@/data/dashboard";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <Header />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />


        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {student.name} 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Continue your ICU Learning journey and improve your clinical skills.
            </p>
          </div>


          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {stats.map((item) => (
  <StatsCard
    key={item.title}
    title={item.title}
    value={item.value}
    icon={item.icon}
  />
))}

          </div>



          {/* My Courses Section - ONLY ONE TIME */}
          <section className="mb-8">

            <MyCourses />

          </section>




          {/* Recent Activity */}

          <section className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>


            <div className="space-y-4">

              {recentActivity.map((activity, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-3 last:border-none"
                >

                  <div>
                    <p className="font-medium text-gray-700">
                      {activity.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      {activity.time}
                    </p>
                  </div>


                </div>

              ))}

            </div>

          </section>


        </main>

      </div>

    </div>
  );
}