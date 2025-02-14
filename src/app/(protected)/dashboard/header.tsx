import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, Home, User, Award, Briefcase } from 'lucide-react';
import Link from 'next/link';

const Header = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="relative h-16 min-h-[64px] border-b bg-white flex items-center justify-between px-6">
      {/* Left section with menu and logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2 font-bold text-xl text-gray-800">
          <div className="relative w-8 h-8">
            <Image
              src="/TedmaxLogo.png"
              alt="TEDMAX Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          TEDMAX
        </div>
      </div>

      {/* Center section with search */}
      <div className="flex-1 flex justify-center max-w-2xl px-4">
        <div className="relative w-full max-w-xl flex-row">
          <input
            type="text"
            placeholder="Search courses"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          <Image
            src="/SearchIcon.svg"
            alt="Search Icon"
            width={20}
            height={20}
            className="absolute left-3 top-3"
            priority
          />
        </div>
      </div>

      {/* Right section with actions */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg">
          <Image
            src="/HelpIcon.svg"
            alt="Alert Icon"
            width={24}
            height={24}
            priority
          />
          <span className="text-gray-700">Help</span>
        </button>
        <div className="relative">
          <button
            ref={profileButtonRef}
            onClick={toggleProfile}
            className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center cursor-pointer overflow-hidden"
          >
            <Image
              src="/profile.jpg"
              alt="User"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div 
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b">
                <h3 className="text-lg font-semibold">Vishnu Pradhan</h3>
                <p className="text-sm text-gray-600">Vishnupradhan119@gmail.com</p>
              </div>

              {/* Menu Items */}
              <nav className="py-2">
                <Link href="/home" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700">
                  <Home size={20} className="text-gray-500" />
                  <span>Home Page</span>
                </Link>
                <Link href="/account" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-red-600">
                  <User size={20} className="text-red-600" />
                  <span>Account</span>
                </Link>
                <Link href="/certification" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700">
                  <Award size={20} className="text-gray-500" />
                  <span>Certification</span>
                </Link>
                <Link href="/internship" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700">
                  <Briefcase size={20} className="text-gray-500" />
                  <span>Applied Internship</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;