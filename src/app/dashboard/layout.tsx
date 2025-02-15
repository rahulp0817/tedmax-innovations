// app/dashboard/layout.tsx
"use client";
import { useState } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import DashboardContent from "./_components/DashboardContent";
import InternshipContent from "./_components/InternshipContent";
import SettingsContent from "./_components/SettingsContent";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "courses" | "internship" | "settings"
  >("courses");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tab: "courses" | "internship" | "settings") => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onTabChange={handleTabChange}
          activeTab={activeTab}
        />
        <main className="flex-1 overflow-y-auto p-4">
          {activeTab === "courses" && (
            <DashboardContent isSidebarOpen={isSidebarOpen} />
          )}
          {activeTab === "internship" && (
            <InternshipContent isSidebarOpen={isSidebarOpen} />
          )}
          {activeTab === "settings" && <SettingsContent />}
        </main>
      </div>
    </div>
  );
}
