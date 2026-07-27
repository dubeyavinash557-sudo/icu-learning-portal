"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

import VideoPlayer from "@/components/course/VideoPlayer";
import LessonSidebar from "@/components/course/LessonSidebar";
import CourseProgress from "@/components/course/CourseProgress";
import LessonNavigation from "@/components/course/LessonNavigation";
import NotesDownload from "@/components/course/NotesDownload";

export default function CourseLearningPage() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">

          <div className="grid gap-8 xl:grid-cols-3">

            {/* Left Content */}
            <div className="xl:col-span-2 space-y-8">

              <VideoPlayer />

              <CourseProgress />

              <LessonNavigation />

              <NotesDownload />

            </div>

            {/* Right Sidebar */}
            <div>

              <LessonSidebar />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}