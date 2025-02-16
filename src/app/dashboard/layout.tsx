"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import DashboardContent from "./_components/DashboardContent";
import InternshipContent from "./_components/InternshipContent";
import SettingsContent from "./_components/SettingsContent";
import ExploreCoursesContent from "./_components/ExploreCoursesContent";
import CoursePurchasePage from "./_components/CoursePurchasePage";
import { SearchProvider } from "./contexts/SearchContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "courses" | "internship" | "settings" | "explore"
  >("courses");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const pathname = usePathname();

  // Extract course ID from pathname if on a course page
  useEffect(() => {
    const match = pathname?.match(/\/dashboard\/course\/(\d+)/);
    if (match && match[1]) {
      setSelectedCourseId(match[1]);
      // You might want to set activeTab to 'explore' here
      // or create a new tab type for course details
      setActiveTab("explore");
    } else {
      setSelectedCourseId(null);
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (
    tab: "courses" | "internship" | "settings" | "explore"
  ) => {
    setActiveTab(tab);
    if (tab === "explore") {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true); // Open the sidebar for other tabs
    }
    // Clear selected course when changing tabs
    setSelectedCourseId(null);
  };

  return (
    <SearchProvider setActiveTab={handleTabChange}>
      <div className="flex flex-col h-screen bg-gray-50">
        <Header onMenuClick={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />
          <main className="flex-1 overflow-y-auto p-4">
            {activeTab === "courses" && !selectedCourseId && (
              <DashboardContent isSidebarOpen={isSidebarOpen} />
            )}
            {activeTab === "explore" && !selectedCourseId && (
              <ExploreCoursesContent />
            )}
            {activeTab === "internship" && !selectedCourseId && (
              <InternshipContent isSidebarOpen={isSidebarOpen} />
            )}
            {activeTab === "settings" && !selectedCourseId && (
              <SettingsContent />
            )}
            {selectedCourseId && (
              <CoursePurchasePage courseId={selectedCourseId} />
            )}
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}
