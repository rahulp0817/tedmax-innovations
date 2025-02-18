// app/dashboard/components/InternshipContent.tsx
import InternshipCard from "./InternshipCard";
import { ChevronRight, House } from "lucide-react";
import Link from "next/link";

interface InternshipContentProps {
  isSidebarOpen: boolean;
}

export default function InternshipContent({
  isSidebarOpen,
}: InternshipContentProps) {
  const internships = [
    {
      title: "Business Development Executive",
      duration: "6 months",
      progress: 35,
      image: "/Image.png",
      color: "bg-blue-500",
    },
    {
      title: "Data Analytics & Business Intelligence",
      duration: "4 months",
      progress: 68,
      image: "/Image.png",
      color: "bg-indigo-500",
    },
    {
      title: "Digital Marketing Specialist",
      duration: "3 months",
      progress: 100,
      image: "/Image.png",
      color: "bg-pink-500",
    },
    {
      title: "UI/UX Design for Mobile Applications",
      duration: "4 months",
      progress: 50,
      image: "/Image.png",
      color: "bg-yellow-500",
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
        <span className="font-medium text-gray-500">Internship</span>
      </nav>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } gap-6`}
      >
        {internships.map((internship, index) => (
          <InternshipCard key={index} {...internship} />
        ))}
      </div>
    </div>
  );
}
