"use client";
import {
  Home,
  BookOpen,
  Settings,
  LogOut,
  Headphones,
  Compass,
} from "lucide-react";
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

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

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

//http://localhost:3000/dashboard/course/1
