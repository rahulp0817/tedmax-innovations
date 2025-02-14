"use client";

import Link from "next/link";
import { User, LogOut, Settings, Book } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ProfileDropdown = () => {
  const { data: session } = useSession();
  const [imageError, setImageError] = useState(false);
  const menuItemLinks = [
    {
      href: "/account",
      icon: <User className="size-4" />,
      label: "Account",
    },
    {
      href: "/dashboard",
      icon: <Book className="size-4" />,
      label: "My Courses",
    },
    {
      href: "/settings",
      icon: <Settings className="size-4" />,
      label: "Settings",
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {session?.user?.image && !imageError ? (
          <button>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[99999] m-2 min-w-44 bg-white mr-24 rounded-lg ">
        <div className="mt-4 px-4 mb-3">
          <h2 className="text-black text-sm font-semibold truncate w-58">
            {session?.user?.name
              ? session.user.name
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")
              : ""}
          </h2>
          <h3 className="text-gray-500 text-sm truncate w-58">
            {session?.user?.email}
          </h3>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItemLinks.map(({ href, label, icon }) => (
            <Link href={href} key={href}>
              <DropdownMenuItem className="flex gap-2 text-sm cursor-pointer hover:bg-slate-50 rounded-sm px-4 py-2">
                {icon}
                <span>{label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
          className="hover:bg-slate-50 rounded-sm cursor-pointer pl-5 mb-3"
        >
          <span
            className={`flex items-center gap-2 text-base transition-all duration-300 hover:text-red-500`}
          >
            <LogOut className="size-4" />
            Logout
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
