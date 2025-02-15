"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Wallet, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import courses from "@/app/(public)/courses/data";
const CourseExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.03,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  };

  // Calculate course counts dynamically
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") {
      return courses.length;
    }
    if (categoryId === "popular") {
      return courses.filter((course) => course.category.includes("popular"))
        .length;
    }
    return courses.filter((course) => course.category.includes(categoryId))
      .length;
  };

  const categories = [
    { id: "all", name: "All Programs" },
    { id: "popular", name: "Popular Programs" },
    { id: "cs", name: "Computer Science & Technology" },
    { id: "ee", name: "Electrical & Electronics Engineering" },
    { id: "me", name: "Mechanical & Manufacturing Engineering" },
    { id: "business", name: "Business & Commerce" },
  ];

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "basic", name: "Basic" },
    { id: "advanced", name: "Advanced" },
  ];

  const displayedCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (Array.isArray(course.category)
        ? course.category.includes(selectedCategory)
        : course.category === selectedCategory);
    const matchesDifficulty =
      selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto mb-24">
      {/*BreadCrump*/}
      <nav className="flex items-center gap-2 text-sm mb-2">
        <Link
          href="/"
          className="text-gray-600 hover:text-red-600 transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-red-600 font-medium">Courses</span>
      </nav>
      <div className="flex justify-between items-center mb-8 top-0 bg-white z-10">
        <h1 className="text-4xl font-bold text-red-600">
          Discover Our Courses
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex gap-6 ">
        <div className="w-64 flex-shrink-0 sticky top-24 space-y-6">
          {/* Categories */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="space-y-2 max-h-[calc(100vh-200px)]">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                    selectedCategory === category.id
                      ? "bg-red-100 text-red-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-gray-500">
                    ({getCategoryCount(category.id)})
                  </span>
                </motion.button>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-3">Difficulty Level</h3>
            <div className="space-y-2">
              {difficulties.map((difficulty) => (
                <motion.button
                  key={difficulty.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    selectedDifficulty === difficulty.id
                      ? "bg-red-100 text-red-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {difficulty.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {displayedCourses.map((course, index) => (
                <Link
                  href={`/courses/${generateSlug(course.title)}`}
                  key={course.id || index}
                >
                  <motion.div
                    className="w-full p-4 space-y-2 bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg shadow "
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    onHoverStart={() => setHoveredCard(course.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    layout
                  >
                    <div className="relative overflow-hidden">
                      <div className="rounded-xl">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-58 h-40 object-contain opacity-90"
                        />
                      </div>
                    </div>

                    <motion.div>
                      <motion.h3 className="text-md font-bold text-gray-900 mb-0 line-clamp-2 h-16 ">
                        {course.title}
                      </motion.h3>

                      <div className="space-y-1">
                        <div className="flex items-center gap-6 text-gray-600">
                          <motion.div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{course.duration}</span>
                          </motion.div>
                        </div>
                        <div className="flex items-center gap-6 text-gray-600">
                          <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.1, color: "#000000" }}
                          >
                            <Wallet className="w-4 h-4" />
                            <span className="text-md font-bold text-black">
                              ₹{course.price}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseExplorer;
