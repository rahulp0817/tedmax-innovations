// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Card, CardHeader, CardContent } from "../ui/card";
// import { Button } from "../ui/button";

// const HeroSection = () => {
//   return (
//     <div className="relative">
//       {/* Hero Image Section */}
//       <div className="relative md:h-[600px] h-[136] mx-4 md:mx-0 md:top-0 top-20 ">
//         <Image
//           src="/landingHero.jpg"
//           alt="Image description"
//           width={1920}
//           height={600}
//           className="w-full h-full object-cover rounded-xl md:rounded-none"
//         />
//         <div className="absolute inset-0 rounded-xl md:rounded-none bg-gradient-to-b from-black/60 to-black/60" />

//         {/* Hero Text */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.8,
//             type: "spring",
//             stiffness: 100,
//           }}
//           className="absolute top-1/4 md:top-[40%] transform -translate-y-1/2 text-center w-full px-8 text-white"
//         >
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             className="md:text-7xl text-2xl font-semibold mb-4"
//           >
//             Learn something new everyday
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//             className=" text-sm md:text-3xl mb-8"
//           >
//             Become professionals and ready to join the world!
//           </motion.p>
//         </motion.div>
//       </div>

//       {/* Search Card Section */}
//       <motion.div
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: -80, opacity: 1 }}
//         transition={{
//           type: "spring",
//           stiffness: 100,
//           damping: 20,
//           delay: 0.6,
//         }}
//         className="relative z-10 max-w-6xl mx-auto px-4"
//       >
//         <Card className="shadow-xl">
//           <CardHeader className="font-semibold text-xl">
//             What do you want to learn?
//           </CardHeader>
//           <CardContent className="flex flex-col sm:flex-row gap-4">
//             <motion.div
//               className="flex-1 flex gap-6"
//               whileTap={{ scale: 0.995 }}
//             >
//               <input
//                 type="text"
//                 placeholder="Search for popular courses"
//                 className="h-12 w-full bg-gray-100 px-4 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition-all"
//               />
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   className="bg-[#C1272D] hover:bg-[#a61f24] transition-colors h-12 w-full sm:w-auto"
//                   size="lg"
//                 >
//                   Search
//                 </Button>
//               </motion.div>
//             </motion.div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// };

// export default HeroSection;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import courses from "@/app/courses/data";
import { internships } from "@/app/internships/data";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const router = useRouter();

  const categories = [
    { id: 'all', name: 'All Programs', count: 20 },
    { id: 'popular', name: 'Popular Programs', count: 3 },
    { id: 'cs', name: 'Computer Science & Technology', count: 8 },
    { id: 'ee', name: 'Electrical & Electronics Engineering', count: 5 },
    { id: 'me', name: 'Mechanical & Manufacturing Engineering', count: 5 },
    { id: 'business', name: 'Business & Commerce', count: 2 }
  ];

  const internshipCategories = [
    { id: 'all', name: 'All Internships', count: internships.length },
    { id: 'popular', name: 'Popular Internships', count: internships.filter(internship => internship.category.includes('Popular Internships')).length },
    { id: 'software', name: 'Software Development', count: internships.filter(internship => internship.category.includes('software')).length },
    { id: 'data', name: 'Data Analytics', count: internships.filter(internship => internship.category.includes('data')).length },
    { id: 'business', name: 'Business Development', count: internships.filter(internship => internship.category.includes('business')).length },
    { id: 'marketing', name: 'Digital Marketing', count: internships.filter(internship => internship.category.includes('marketing')).length },
    { id: 'design', name: 'UI/UX Design', count: internships.filter(internship => internship.category.includes('design')).length },
    { id: 'hr', name: 'Human Resources', count: internships.filter(internship => internship.category.includes('hr')).length },
    { id: 'finance', name: 'Finance', count: internships.filter(internship => internship.category.includes('finance')).length },
  ];

  const handleSearch = (term) => {
    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 5);

    const filteredInternships = internships.filter(internship =>
      internship.title.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 5);

    const filteredCategories = categories.filter(category =>
      category.name.toLowerCase().includes(term.toLowerCase())
    );

    const filteredInternshipCategories = internshipCategories.filter(category =>
      category.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredResults([
      ...filteredCourses.map(course => ({
        ...course,
        type: 'course'
      })),
      ...filteredInternships.map(internship => ({
        ...internship,
        type: 'internship'
      })),
      ...filteredCategories.map(category => ({
        ...category,
        type: 'category'
      })),
      ...filteredInternshipCategories.map(category => ({
        ...category,
        type: 'internshipCategory'
      }))
    ]);
  };

  const handleSearchFocus = () => {
    const navbarHeight = 80;
    const offset = searchContainerRef.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
    
    window.scrollTo({
      top: offset,
      behavior: 'smooth',
      duration: 1000
    });

    setShowDropdown(true);
    setFilteredResults([
      ...courses
        .filter(course => course.category.includes("popular"))
        .slice(0, 5)
        .map(course => ({ ...course, type: 'course' })),
      ...internships
        .filter(internship => internship.category.includes("Popular Internships"))
        .slice(0, 5)
        .map(internship => ({ ...internship, type: 'internship' }))
    ]);
  };

  const handleItemSelect = (item) => {
    if (item.type === 'course') {
      router.push(`/courses/${generateSlug(item.title)}`);
    } else if (item.type === 'internship') {
      router.push(`/internships/${generateSlug(item.title)}`);
    } else if (item.type === 'category') {
      router.push(`/explore-courses?category=${item.id}`);
    } else if (item.type === 'internshipCategory') {
      router.push(`/explore-internships?category=${item.id}`);
    }
    setShowDropdown(false);
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
  };

  const handleSearchSubmit = () => {
    // First, try to find an exact category match
    const exactCategory = categories.find(cat => 
      cat.name.toLowerCase() === searchTerm.toLowerCase()
    );
    
    // If no exact match, try partial match
    const partialCategory = categories.find(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exactInternshipCategory = internshipCategories.find(cat => 
      cat.name.toLowerCase() === searchTerm.toLowerCase()
    );

    const partialInternshipCategory = internshipCategories.find(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (exactCategory) {
      router.push(`/explore-courses?category=${exactCategory.id}`);
    } else if (partialCategory) {
      router.push(`/explore-courses?category=${partialCategory.id}`);
    } else if (exactInternshipCategory) {
      router.push(`/explore-internships?category=${exactInternshipCategory.id}`);
    } else if (partialInternshipCategory) {
      router.push(`/explore-internships?category=${partialInternshipCategory.id}`);
    } else {
      // If no category match, try to find a course or internship
      const course = courses.find(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const internship = internships.find(i => 
        i.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (course) {
        router.push(`/courses/${generateSlug(course.title)}`);
      } else if (internship) {
        router.push(`/internships/${generateSlug(internship.title)}`);
      } else {
        // If no matches found, go to explore-courses with the search term
        router.push(`/explore-courses?search=${encodeURIComponent(searchTerm)}`);
      }
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="relative">
      {/* Rest of the component remains the same */}
      <div className="relative md:h-[600px] h-[136] mx-4 md:mx-0 md:top-0 top-20">
        <Image
          src="/landingHero.jpg"
          alt="Image description"
          width={1920}
          height={600}
          className="w-full h-full object-cover rounded-xl md:rounded-none"
        />
        <div className="absolute inset-0 rounded-xl md:rounded-none bg-gradient-to-b from-black/60 to-black/60" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="absolute top-1/4 md:top-[40%] transform -translate-y-1/2 text-center w-full px-8 text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:text-7xl text-2xl font-semibold mb-4"
          >
            Learn something new everyday
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm md:text-3xl mb-8"
          >
            Become professionals and ready to join the world!
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        ref={searchContainerRef}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: -80, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.6,
        }}
        className="relative z-10 max-w-6xl mx-auto px-4"
      >
        <Card className="shadow-xl">
          <CardHeader className="font-semibold text-xl">
            What do you want to learn?
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-6 relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="Search for popular courses or internships"
                className="h-12 w-full bg-gray-100 px-4 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-[88px] mt-2 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                  >
                    {filteredResults.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        className={`
                          p-4 hover:bg-gray-50 cursor-pointer transition-colors
                          ${index !== filteredResults.length - 1 ? 'border-b border-gray-100' : ''}
                        `}
                      >
                        {item.type === 'course' ? (
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-900">{item.title}</div>
                              {/* <div className="text-sm text-gray-500 mt-1">
                                {item.duration} • {item.learners} learners
                              </div> */}
                            </div>
                            {/* <span className="text-red-600 font-medium">{item.price}</span> */}
                          </div>
                        ) : item.type === 'internship' ? (
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-500 mt-1">{item.company}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">{item.name}</span>
                            <span className="text-sm text-gray-500">({item.count} {item.type === 'category' ? 'courses' : 'internships'})</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleSearchSubmit}
                  className="bg-[#C1272D] hover:bg-[#a61f24] transition-colors h-12 w-full sm:w-auto whitespace-nowrap"
                  size="lg"
                >
                  Search
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HeroSection;