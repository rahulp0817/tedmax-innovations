"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MenuIcon,
  ChevronDown,
  X,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ProfileDropdown from "../profile-menu/profile-dropdown";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const LandingNavbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isprofessional, setIsprofessional] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategories, setIsCategories] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "Courses", link: "/explore-courses" },
    { name: "Internship", link: "/explore-internships" },
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

  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 25,
  };

  const navbarStyles = {
    backgroundColor: isScrolled ? "white" : "transparent",
    boxShadow: isScrolled ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
  };

  const textStyles = isScrolled ? "text-gray-800" : "text-white";
  const borderStyles = isScrolled ? "border-gray-200" : "border-white";
  const heightStyles = isScrolled ? "h-16" : "h-20";
  const brandcoloredStyles = isScrolled
    ? "text-[var(--primary-color)]"
    : "text-white";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={springConfig}
        style={navbarStyles}
        className="fixed top-0 w-full z-50 bg-transparent transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-0">
          <div className={`flex items-center justify-between ${heightStyles}`}>
            <div className="flex gap-12 items-center">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
                transition={springConfig}
              >
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={56}
                  height={56}
                  priority
                />
                <span className={`text-xl font-bold ${brandcoloredStyles}`}>
                  TEDMAX
                </span>
              </motion.div>

              <motion.div
                className={`hidden lg:relative lg:flex lg:items-center border rounded-md ${borderStyles}`}
                onMouseEnter={() => setIsCategories(true)}
                onMouseLeave={() => setIsCategories(false)}
                whileHover={{ scale: 1.02 }}
                transition={springConfig}
              >
                <button
                  className={`flex items-center text-sm gap-1 px-4 py-2 rounded-md transition-all ${textStyles}`}
                  onClick={() => setIsCategories(!isCategories)}
                >
                  Explore
                  {isCategories ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                <AnimatePresence>
                  {isprofessional && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={springConfig}
                      className="absolute top-full mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div className="py-0">
                        {professional.map((item, index) => (
                          <motion.a
                            key={item}
                            href="/explore-courses"
                            className={`
                              block px-4 py-2 overflow-hidden text-sm text-gray-700
                             hover:bg-gray-700 hover:text-white
                             ${index === 0 ? "rounded-t-md" : ""} 
                             ${
                               index === professional.length - 1
                                 ? "rounded-b-md"
                                 : ""
                             }
                           `}
                          >
                            {item}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isCategories && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={springConfig}
                      className="absolute top-full mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div>
                        {categories.map((item, index) => (
                          <Link key={item.name} href={item.link}>
                            <motion.div
                              className={`
                              flex px-4 py-2 overflow-hidden text-sm text-gray-700
                              hover:bg-gray-700 hover:text-white justify-between items-center cursor-pointer
                              ${index === 0 ? "rounded-t-md" : ""} 
                              ${
                                index === categories.length - 1
                                  ? "rounded-b-md"
                                  : ""
                              }
                            `}
                            >
                              {item.name}
                              <ChevronRight className="size-4" />
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="flex gap-2">
              {process.env.ADMINS?.split(",")
                .map((email) => email.trim())
                .includes(session?.user?.email ?? "") && (
                <div className="flex items-center gap-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    transition={springConfig}
                    className="px-4 py-2 text-white rounded-lg transition-all text-sm mr-4"
                    onClick={() => router.push("/admin")}
                  >
                    Admin Dashboard
                  </motion.button>
                </div>
              )}

              {/* Right Navigation Items */}
              {!session?.user && (
                <div className="hidden lg:flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, borderColor: "#dc2626" }}
                    transition={springConfig}
                  >
                    <Link
                      href="/signin"
                      className={`px-4 py-2 border rounded-lg hover:text-red-600 transition-all text-sm hover:bg-red-100 ${textStyles} ${borderStyles}`}
                    >
                      Login
                    </Link>
                  </motion.div>

                  <motion.div
                    className="relative"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={springConfig}
                      className="overflow-hidden"
                    >
                      <Link
                        href="/signup"
                        className="px-4 py-2 text-sm bg-[var(--primary-color)] text-white rounded-lg hover:bg-red-700 transition-all flex gap-1 text-center"
                      >
                        <AnimatePresence mode="wait">
                          {isHovered ? (
                            <motion.span
                              key="hovered"
                              initial={{ y: 30 }}
                              animate={{ y: 0 }}
                              exit={{ y: -30 }}
                              transition={springConfig}
                              className="flex gap-1 items-center"
                            >
                              Join now
                              <ChevronRight className="size-4 text-white" />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="normal"
                              initial={{ y: 30 }}
                              animate={{ y: 0 }}
                              exit={{ y: -30 }}
                              transition={springConfig}
                              className="flex gap-1 items-center"
                            >
                              Join now
                              <ChevronRight className="size-4 text-white" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              )}
              {session?.user && (
                <motion.div
                  className="flex gap-2 items-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={springConfig}
                >
                  <ProfileDropdown />
                  <ChevronDown className="size-4 text-white" />
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.div
              className="lg:hidden flex items-center"
              whileHover={{ scale: 1.1 }}
              transition={springConfig}
            >
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
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={springConfig}
              className="lg:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
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
                    <Link key={category.name} href={category.link}>
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100">
                      {category.name}
                    </a>
                    </Link>
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
                    className="w-full px-4 py-2 bg-[#C1272D] text-white rounded-lg hover:bg-red-700"
                    onClick={() => router.push("/signup")}
                  >
                    Join now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default LandingNavbar;
