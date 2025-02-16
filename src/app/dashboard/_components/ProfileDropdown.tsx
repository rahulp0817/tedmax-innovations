"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Award, Briefcase } from "lucide-react";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    { icon: <User size={16} />, label: "Account", route: "/account" },
    {
      icon: <Award size={16} />,
      label: "Certification",
      route: "/certification",
    },
    {
      icon: <Briefcase size={16} />,
      label: "Applied Internship",
      route: "/internships",
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
    setIsOpen(false); // Close dropdown after navigation
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <img
          src="/profile-image.png"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <ChevronDown size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b">
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-gray-500">johndoe@email.com</div>
          </div>
          <div className="py-1">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.route)}
                className="w-full px-4 py-2 text-sm text-gray-500 text-left flex items-center gap-2 hover:bg-gray-100"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
