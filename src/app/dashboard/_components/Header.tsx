"use client";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "../components/ProfileDropdown";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-md h-16 z-50 flex items-center justify-between px-4 pr-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="TEDMAX" className="h-10 w-10" />
          <span className="font-bold text-xl text-[var(--primary-color)]">
            TEDMAX
          </span>
        </Link>
      </div>

      <div className="relative w-96 items-center justify-center">
        <input
          type="text"
          placeholder="Search courses"
          className="w-full pl-4 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
      </div>

      <div className="px-5">
        <ProfileDropdown />
      </div>
    </header>
  );
}
