// app/dashboard/components/DashboardContent.tsx
import CourseCard from "./CourseCard";
import { ChevronRight, House } from "lucide-react";
import Link from "next/link";

interface DashboardContentProps {
  isSidebarOpen: boolean;
}

export default function DashboardContent({
  isSidebarOpen,
}: DashboardContentProps) {
  const courses = [
    {
      title: "Mobile Dev React Native",
      duration: "4hrs 22min",
      progress: 22,
      image: "/CradImage.png",
      color: "bg-green-500",
    },
    {
      title: "UI Design for Beginners",
      duration: "4hrs 22min",
      progress: 22,
      image: "/CradImage.png",
      color: "bg-red-500",
    },
    {
      title: "Website Dev Zero to Hero",
      duration: "4hrs 22min",
      progress: 10,
      image: "/CradImage.png",
      color: "bg-purple-500",
    },
    {
      title: "Vue JavaScript Course",
      duration: "4hrs 22min",
      progress: 100,
      image: "/CradImage.png",
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
          <House className="w-4 h-4"/>
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-gray-600">My Courses</span>
      </nav>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } gap-6`}
      >
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
}
