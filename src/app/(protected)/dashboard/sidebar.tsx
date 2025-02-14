'use client'
import React, { useState } from "react";
import Image from "next/image";
import LogoutModal from "./logoutmodal"; // Add this import

const CourseIcon = "/CourseIcon.svg";
const InternshipIcon = "/InternshipIcon.svg";
const SettingsIcon = "/SettingsIcon.svg";
const LogOutIcon = "/LogoutIcon.svg";
const CourseIconActive = "/CourseIconActive.svg";
const InternshipIconActive = "/InternshipIconActive.svg";
const SettingsIconActive = "/SettingsIconActive.svg";
const LogoutIconActive = "/LogoutIconActive.svg";

const Sidebar = ({ activeView, setActiveView, isCollapsed }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    {
      id: "courses",
      title: "My Courses",
      icon: CourseIcon,
      activeIcon: CourseIconActive,
    },
    {
      id: "internship",
      title: "Internship",
      icon: InternshipIcon,
      activeIcon: InternshipIconActive,
    },
  ];

  const footerItems = [
    {
      id: "settings",
      title: "Setting",
      icon: SettingsIcon,
      activeIcon: SettingsIconActive,
    },
    {
      id: "logout",
      title: "Log out",
      icon: LogOutIcon,
      activeIcon: LogoutIconActive,
    },
  ];

  const handleItemClick = (itemId) => {
    if (itemId === 'logout') {
      setIsLogoutModalOpen(true);
    } else {
      setActiveView(itemId);
    }
  };

  return (
    <>
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } flex flex-col h-screen`}
      >
        <nav className="flex-1 px-2 py-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-start"
              } gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                activeView === item.id ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Image
                  src={activeView === item.id ? item.activeIcon : item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
              {!isCollapsed && (
                <span 
                  className={`${
                    activeView === item.id ? "text-black font-medium" : "text-gray-500"
                  }`}
                >
                  {item.title}
                </span>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto px-2 py-4 border-t mb-16">
          {footerItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-start"
              } gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                activeView === item.id ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Image
                  src={activeView === item.id ? item.activeIcon : item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
              {!isCollapsed && (
                <span 
                  className={`${
                    activeView === item.id ? "text-black font-medium" : "text-gray-500"
                  }`}
                >
                  {item.title}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;