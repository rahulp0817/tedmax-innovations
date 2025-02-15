// 'use client'
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Filter, Users, Clock,ChevronRight } from 'lucide-react';
// import Link from 'next/link';
// import courses from "@/app/courses/data"
// const CourseExplorer = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedDifficulty, setSelectedDifficulty] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (index) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         delay: index * 0.1,
//         ease: "easeOut"
//       }
//     }),
//     hover: {
//       scale: 1.03,
//       y: -8,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut"
//       }
//     }
//   };

//   const contentVariants = {
//     hover: {
//       y: -5,
//       transition: {
//         duration: 0.2,
//         ease: "easeOut"
//       }
//     }
//   };

// const generateSlug = (title) => {
//   return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
// };

//   // Calculate course counts dynamically
//   const getCategoryCount = (categoryId) => {
//     if (categoryId === 'all') {
//       return courses.length;
//     }
//     if (categoryId === 'popular') {
//       return courses.filter(course => course.category.includes('popular')).length;
//     }
//     return courses.filter(course => course.category.includes(categoryId)).length;
//   };

//   const categories = [
//     { id: 'all', name: 'All Programs' },
//     { id: 'popular', name: 'Popular Programs' },
//     { id: 'cs', name: 'Computer Science & Technology' },
//     { id: 'ee', name: 'Electrical & Electronics Engineering' },
//     { id: 'me', name: 'Mechanical & Manufacturing Engineering' },
//     { id: 'business', name: 'Business & Commerce' }
//   ];

//   const difficulties = [
//     { id: 'all', name: 'All Levels' },
//     { id: 'basic', name: 'Basic' },
//     { id: 'advanced', name: 'Advanced' }
//   ];


//   const displayedCourses = courses.filter(course => {
//     const matchesCategory = selectedCategory === 'all' || 
//       (Array.isArray(course.category) ? 
//         course.category.includes(selectedCategory) : 
//         course.category === selectedCategory);
//     const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
//     const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesDifficulty && matchesSearch;
//   });

//   return (
//     <div className="max-w-7xl mx-auto p-6 mb-24 mt-16">
//         {/*BreadCrump*/}
//         <nav className="flex items-center gap-2 text-sm mb-6">
//         <Link 
//           href="/" 
//           className="text-gray-600 hover:text-red-600 transition-colors"
//         >
//           Home
//         </Link>
//         <ChevronRight className="w-4 h-4 text-gray-400" />
//         <span className="text-red-600 font-medium">Courses</span>
//       </nav>
//       <div className="flex justify-between items-center mb-8 top-0 bg-white z-10 py-4">
//         <h1 className="text-4xl font-bold text-red-600">Discover Our Courses</h1>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search courses..."
//             className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Search className="absolute left-3 top-3 text-gray-400" size={20} />
//         </div>
//       </div>

//       <div className="flex gap-6 relative">
//         <div className="w-64 flex-shrink-0 sticky top-24 space-y-6">
//           {/* Categories */}
//           <div className="bg-white rounded-lg shadow-lg p-4">
//             <h3 className="text-lg font-semibold mb-3">Categories</h3>
//             <div className="space-y-2 max-h-[calc(100vh-200px)]">
//               {categories.map(category => (
//                 <motion.button
//                   key={category.id}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setSelectedCategory(category.id)}
//                   className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
//                     selectedCategory === category.id
//                       ? 'bg-red-100 text-red-600'
//                       : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   <span>{category.name}</span>
//                   <span className="text-sm text-gray-500">({getCategoryCount(category.id)})</span>
//                 </motion.button>
//               ))}
//             </div>
//           </div>

//           {/* Rest of the component remains the same */}
//           {/* Difficulty Filter */}
//           <div className="bg-white rounded-lg shadow-lg p-4">
//             <h3 className="text-lg font-semibold mb-3">Difficulty Level</h3>
//             <div className="space-y-2">
//               {difficulties.map(difficulty => (
//                 <motion.button
//                   key={difficulty.id}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setSelectedDifficulty(difficulty.id)}
//                   className={`w-full text-left px-3 py-2 rounded-md ${
//                     selectedDifficulty === difficulty.id
//                       ? 'bg-red-100 text-red-600'
//                       : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   {difficulty.name}
//                 </motion.button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             layout
//           >
//             <AnimatePresence>
//               {displayedCourses.map((course, index) => (
//                 <Link 
//                 href={`/courses/${generateSlug(course.title)}`} 
//                 key={course.id || index}
//               >
//                   <motion.div
//                     className="w-full bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
//                     variants={cardVariants}
//                     initial="hidden"
//                     animate="visible"
//                     whileHover="hover"
//                     custom={index}
//                     onHoverStart={() => setHoveredCard(course.id)}
//                     onHoverEnd={() => setHoveredCard(null)}
//                     layout
//                   >
//                     <div className="relative h-48 overflow-hidden">
//                       <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
//                         <img
//                           src={course.image}
//                           alt={course.title}
//                           className="w-full h-full object-cover opacity-90"
//                         />
//                       </div>
//                       <div className="absolute inset-0 flex flex-col justify-between p-6">
//                         <div className="flex space-x-2">
//                           <span className="text-white text-sm px-2 py-1 bg-black/30 rounded-full capitalize">
//                             {course.difficulty}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span></span>
//                           <span className="text-white text-md font-medium px-3 py-1 bg-black/30 rounded-full">
//                             {course.price}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <motion.div 
//                       className="p-6"
//                       variants={contentVariants}
//                     >
//                       <motion.h3 
//                         className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 h-16 leading-relaxed"
//                         whileHover={{ color: "#dc2626" }}
//                       >
//                         {course.title}
//                       </motion.h3>

//                       <div className="flex items-center gap-6 text-gray-600">
//                         <motion.div 
//                           className="flex items-center gap-2"
//                           whileHover={{ scale: 1.1, color: "#000000" }}
//                         >
//                           <Users className="w-4 h-4" />
//                           <span className="text-sm">{course.learners} learners</span>
//                         </motion.div>
//                         <motion.div 
//                           className="flex items-center gap-2"
//                           whileHover={{ scale: 1.1, color: "#000000" }}
//                         >
//                           <Clock className="w-4 h-4" />
//                           <span className="text-sm">{course.duration}</span>
//                         </motion.div>
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 </Link>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseExplorer;


'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Users, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import courses from "@/app/courses/data"

const CourseExplorer = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.03,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

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
    <div className="max-w-7xl mx-auto p-6 mb-24 mt-16">
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link 
          href="/" 
          className="text-gray-600 hover:text-red-600 transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-red-600 font-medium">Courses</span>
      </nav>
      
      <div className="flex justify-between items-center mb-8 top-0 bg-white z-10 py-4">
        <h1 className="text-4xl font-bold text-red-600">Discover Our Courses</h1>
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
      </div>

      <div className="flex gap-6 relative">
        <div className="w-64 flex-shrink-0 sticky top-24 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="space-y-2 max-h-[calc(100vh-200px)]">
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

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Difficulty Level</h3>
            <div className="space-y-2">
              {difficulties.map(difficulty => (
                <motion.button
                  key={difficulty.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    selectedDifficulty === difficulty.id
                      ? 'bg-red-100 text-red-600'
                      : 'hover:bg-gray-50'
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
                    className="w-full bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    custom={index}
                    onHoverStart={() => setHoveredCard(course.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    layout
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover opacity-90"
                        />
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex space-x-2">
                          <span className="text-white text-sm px-2 py-1 bg-black/30 rounded-full capitalize">
                            {course.difficulty}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span></span>
                          <span className="text-white text-md font-medium px-3 py-1 bg-black/30 rounded-full">
                            {course.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <motion.div 
                      className="p-6"
                      variants={contentVariants}
                    >
                      <motion.h3 
                        className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 h-16 leading-relaxed"
                        whileHover={{ color: "#dc2626" }}
                      >
                        {course.title}
                      </motion.h3>

                      <div className="flex items-center gap-6 text-gray-600">
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.1, color: "#000000" }}
                        >
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{course.learners} learners</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.1, color: "#000000" }}
                        >
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{course.duration}</span>
                        </motion.div>
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