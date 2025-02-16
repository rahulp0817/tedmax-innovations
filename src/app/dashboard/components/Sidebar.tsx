<<<<<<< HEAD:src/app/dashboard/_components/Sidebar.tsx
"use client";
import { Home, BookOpen, Settings, LogOut, Headphones } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
=======
// app/dashboard/components/Sidebar.tsx
'use client';
import { Home, BookOpen, Settings, LogOut, Compass } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoutModal from './LogoutModal';
>>>>>>> fbe7a04c4e8ec2540d2f67b75a81db1ebe243bda:src/app/dashboard/components/Sidebar.tsx

interface SidebarProps {
  isOpen: boolean;
  onTabChange: (tab: "courses" | "internship" | "settings") => void;
  activeTab: "courses" | "internship" | "settings";
}

export default function Sidebar({
  isOpen,
  onTabChange,
  activeTab,
}: SidebarProps) {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

<<<<<<< HEAD:src/app/dashboard/_components/Sidebar.tsx
  const menuItems = [
    {
      icon: <Home size={20} />,
      label: "My Courses",
      href: "/dashboard",
      tab: "courses",
    },
    {
      icon: <BookOpen size={20} />,
      label: "Internship",
      href: "/dashboard/internship",
      tab: "internship",
    },
  ];
=======
    const menuItems = [
        { icon: <Home size={20} />, label: 'My Courses', href: '/dashboard', tab: 'courses' },
        { icon: <BookOpen size={20} />, label: 'Internship', href: '/dashboard/internship', tab: 'internship' },
        { icon: <Compass size={20} />, label: 'Explore Courses', href: '/dashboard/explore', tab: 'explore' },
    ];
    
    const bottomMenuItems = [
        { icon: <Settings size={20} />, label: 'Settings', href: '/dashboard/settings', tab: 'settings' },
        { icon: <LogOut size={20} />, label: 'Logout', href: '#', tab: 'logout' },
    ];
>>>>>>> fbe7a04c4e8ec2540d2f67b75a81db1ebe243bda:src/app/dashboard/components/Sidebar.tsx

  const bottomMenuItems = [
    {
      icon: <Headphones size={20} />,
      label: "Support",
      href: "/dashboard/support",
      tab: "Support",
    },
    { icon: <LogOut size={20} />, label: "Logout", href: "#", tab: "logout" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

<<<<<<< HEAD:src/app/dashboard/_components/Sidebar.tsx
  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };
=======
    return (
        <aside className={`bg-white h-full shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className="flex flex-col h-full justify-between py-4">
                <div>
                    <nav>
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => onTabChange(item.tab as 'courses' | 'internship')}
                                className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 cursor-pointer ${
                                    activeTab === item.tab ? 'bg-gray-100' : ''
                                }`}
                            >
                                <div className={`flex ${isOpen ? '' : 'justify-center w-full'}`}>
                                    {item.icon}
                                </div>
                                {isOpen && <span className="ml-4">{item.label}</span>}
                            </div>
                        ))}
                    </nav>
                </div>
                
                <div>
                    <nav>
                        {bottomMenuItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    if (item.tab === 'logout') {
                                        handleLogoutClick();
                                    } else {
                                        onTabChange(item.tab as 'settings');
                                    }
                                }}
                                className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 cursor-pointer ${
                                    activeTab === item.tab ? 'bg-gray-100' : ''
                                }`}
                            >
                                <div className={`flex ${isOpen ? '' : 'justify-center w-full'}`}>
                                    {item.icon}
                                </div>
                                {isOpen && <span className="ml-4">{item.label}</span>}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
>>>>>>> fbe7a04c4e8ec2540d2f67b75a81db1ebe243bda:src/app/dashboard/components/Sidebar.tsx

  return (
    <aside
      className={`bg-white h-full shadow-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-18"
      }`}
    >
      <TooltipProvider>
        <div className="flex flex-col h-full justify-between py-4 px-2">
          <div>
            <nav>
              {menuItems.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() =>
                        onTabChange(item.tab as "courses" | "internship")
                      }
                      className={`flex items-center px-4 mt-4 rounded-xl py-2 cursor-pointer  
                        ${
                          activeTab === item.tab
                            ? "bg-red-100 text-red-500"
                            : "text-gray-500"
                        }
                        hover:text-[var(--primary-color)]`}
                    >
                      {item.icon}
                      {isOpen && <span className="ml-4">{item.label}</span>}
                    </div>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent
                      side="right"
                      className="bg-white text-red-500 px-2 py-1 rounded-md"
                    >
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </div>

          <div>
            <nav>
              {bottomMenuItems.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => {
                        if (item.tab === "logout") {
                          handleLogoutClick();
                        } else {
                          onTabChange(item.tab as "settings");
                        }
                      }}
                      className={`flex items-center px-4 rounded-xl py-2 cursor-pointer mt-4
                        ${
                          activeTab === item.tab
                            ? "bg-red-100 text-red-500"
                            : "text-gray-500"
                        }
                        hover:text-[var(--primary-color)]`}
                    >
                      {item.icon}
                      {isOpen && <span className="ml-4">{item.label}</span>}
                    </div>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent
                      side="right"
                      className="bg-white text-red-500 px-2 py-1 rounded-md"
                    >
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </div>
        </div>
      </TooltipProvider>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
      />
    </aside>
  );
}
