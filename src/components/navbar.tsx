"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MenuIcon, ChevronDown, X, ChevronUp } from "lucide-react";
import AuthModal from "./Landing-page/auth-modal";
import { useSession } from "next-auth/react";
import ProfileDropdown from "./profile-menu/profile-dropdown";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isprofessional, setIsprofessional] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const categories = [
    "Development",
    "Business",
    "Finance & Accounting",
    "IT & Software",
    "Design",
    "Marketing",
    "Personal Development",
    "Music",
  ];

  const professional = [
    "Development",
    "Business",
    "Finance & Accounting",
    "IT & Software",
    "Design",
    "Marketing",
    "Personal Development",
    "Music",
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white transition-all duration-300 backdrop-blur-2xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex gap-4">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-red-600">TedMex</span>
              </div>

              <div
                className="hidden lg:relative lg:flex lg:items-center border rounded-md "
                onMouseEnter={() => setIsprofessional(true)}
                onMouseLeave={() => setIsprofessional(false)}
              >
                <button
                  className="flex items-center text-sm gap-1 px-3 py-2 rounded-md text-black hover:text-red-600 transition-all"
                  onClick={() => setIsprofessional(!setIsprofessional)}
                >
                  Explore
                  {isprofessional ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {isprofessional && (
                  <div className="absolute top-full mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {professional.map((professional) => (
                        <a
                          key={professional}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {professional}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* search global */}
            {/* <div className="hidden lg:flex flex-1 max-w-xl mx-6 ">
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Search for courses..."
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div> */}

            <div className="flex gap-2">
              {process.env.ADMINS?.split(",")
                .map((email) => email.trim())
                .includes(session?.user?.email ?? "") && (
                <div className="flex items-center gap-8">
                  <button
                    className="px-4 py-2 text-black rounded-lg transition-all text-sm mr-4"
                    onClick={() => router.push("/admin")}
                  >
                    Admin Dashboard
                  </button>
                </div>
              )}

              {/* Right Navigation Items */}
              {!session?.user && (
                <div className="hidden lg:flex items-center gap-4">
                  <button
                    className="px-4 py-2 text-black border border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition-all text-sm hover:bg-red-100"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Login
                  </button>
                  <button
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    onClick={() => router.push("/signin")}
                  >
                    Join now
                  </button>
                </div>
              )}
              {session?.user && <ProfileDropdown />}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Search for courses..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Mobile Categories */}
              <div className="px-3 py-2 font-medium text-gray-600">
                Categories
              </div>
              {categories.map((category) => (
                <a
                  key={category}
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100"
                >
                  {category}
                </a>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="px-3 py-2 space-y-2">
                <button
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600"
                  onClick={() => router.push("/signin")}
                >
                  Log In
                </button>
                <button
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={() => router.push("/signup")}
                >
                  Join now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
