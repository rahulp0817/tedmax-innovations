import React from 'react';
import { CourseCard } from "./CourseCard";
import { ChevronRight, House } from "lucide-react";
import Link from "next/link";
import courses from '@/app/(public)/courses/data';

interface DashboardContentProps {
  isSidebarOpen: boolean;
}

export default function DashboardContent({
  isSidebarOpen,
}: DashboardContentProps) {
  // Combine the course data with dashboard-specific properties
  const dashboardCourses = [
    {
      ...courses[0], // Spread the existing course data
      progress: 22,
      color: "bg-green-500",
    },
    {
      ...courses[5],
      progress: 22,
      color: "bg-red-500",
    },
    {
      ...courses[2],
      progress: 10,
      color: "bg-purple-500",
    },
    {
      ...courses[3],
      progress: 100,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link
          href="/"
          className="text-gray-500 hover:text-red-600 transition-colors"
        >
          <House className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-gray-600">My Courses</span>
      </nav>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
          } gap-6`}
      >
        {dashboardCourses.map((course) => (
          <CourseCard
            key={course.id}
            // id={course.id}
            title={course.title}
            duration={course.duration}
            progress={course.progress || 0}
            image={course.image}
            color={course.color || "bg-blue-500"}
          />
        ))}
      </div>
    </div>
  );
}