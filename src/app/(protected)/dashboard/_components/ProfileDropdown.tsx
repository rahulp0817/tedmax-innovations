"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Award, Briefcase } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
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
      {session?.user?.image && !imageError ? (
        <button onClick={() => setIsOpen(!isOpen)}>
          <img
            src={session.user.image || "/default-avatar.jpg"}
            alt="User Profile"
            className="size-10 rounded-full border border-gray-300"
            onError={() => setImageError(true)}
          />
        </button>
      ) : (
        <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white">
          {session?.user?.name?.charAt(0).toUpperCase()}
        </button>
      )}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b">
            <h2 className="text-black text-sm font-semibold truncate w-58">
              {session?.user?.name
                ? session.user.name
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")
                : ""}
            </h2>
            <h3 className="text-gray-500 text-sm truncate w-58">
              {session?.user?.email}
            </h3>
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
