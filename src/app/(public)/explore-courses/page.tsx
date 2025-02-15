"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, House, Wallet, Clock, ChevronRight, ChevronDown, Users } from "lucide-react";
import Link from "next/link";
import courses from "@/app/(public)/courses/data";
import { useSearchParams } from "next/navigation";
const CourseExplorer = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Read URL parameters on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
  };

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') {
      return courses.length;
    }
    if (categoryId === 'popular') {
      return courses.filter(course => course.category.includes('popular')).length;
    }
    return courses.filter(course => course.category.includes(categoryId)).length;
  };

  const categories = [
    { id: 'all', name: 'All Programs' },
    { id: 'popular', name: 'Popular Programs' },
    { id: 'cs', name: 'Computer Science & Technology' },
    { id: 'ee', name: 'Electrical & Electronics Engineering' },
    { id: 'me', name: 'Mechanical & Manufacturing Engineering' },
    { id: 'business', name: 'Business & Commerce' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'basic', name: 'Basic' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const displayedCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || 
      (Array.isArray(course.category) ? 
        course.category.includes(selectedCategory) : 
        course.category === selectedCategory);
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  // Update URL when category changes
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const url = new URL(window.location.href);
    url.searchParams.set('category', categoryId);
    window.history.pushState({}, '', url);
  };

  return (
    <div className="max-w-7xl mx-auto mb-24">
      {/*BreadCrump*/}
      <nav className="flex items-center gap-2 text-sm mb-2">
        <Link
          href="/"
          className="text-gray-600 hover:text-red-600 transition-colors"
        >
         <House className="w-4 h-4"/>
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-500 font-medium">Courses</span>
      </nav>
      
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 py-4">
        <h1 className="text-4xl font-bold text-red-600">Discover Our Courses</h1>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          
          {/* Difficulty Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>
                {difficulties.find(d => d.id === selectedDifficulty)?.name || 'Select Level'}
              </span>
              <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty.id}
                    onClick={() => {
                      setSelectedDifficulty(difficulty.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      selectedDifficulty === difficulty.id ? 'bg-red-50 text-red-600' : ''
                    }`}
                  >
                    {difficulty.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-6 relative">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                    selectedCategory === category.id
                      ? 'bg-red-100 text-red-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-gray-500">({getCategoryCount(category.id)})</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {displayedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="w-full bg-white rounded-xl overflow-hidden shadow cursor-pointer hover:shadow-lg"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: index * 0.1 },
                    },
                    hover: {
                      scale: 1.03,
                      y: -8,
                      transition: { duration: 0.3 },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onHoverStart={() => setHoveredCard(course.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  layout
                >
                  <Link
                    href={`/courses/${generateSlug(course.title)}`}
                    className="block h-full"
                  >
                    <motion.div className="p-4 rounded-xl">
                      <div className="items-start gap-4 mb-4">
                        <div className="w-58 h-40 rounded-xl flex-shrink-0">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-contain rounded-xl"
                            onError={(e) => {
                              e.target.src = '/placeholder-course.png';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <motion.h3 className="text-md font-semibold text-gray-900 mb-1 mt-2 line-clamp-2 h-12">
                            {course.title}
                          </motion.h3>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock size={16} /> {course.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Wallet size={16} /> {course.price}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} /> {course.learners} learners
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
                            {course.difficulty}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseExplorer;