"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import courses from "@/app/(public)/courses/data";
import { internships } from "@/app/(public)/internships/data";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  interface SearchResult {
    type: string;
    title?: string;
    id?: string | number;
    name?: string;
    count?: number;
    company?: string;
  }

  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef(null);
  const router = useRouter();

  const categories = [
    // { id: 'all', name: 'All Programs', count: 20 },
    // { id: 'popular', name: 'Popular Programs', count: 3 },
    { id: 'cs', name: 'Computer Science & Technology', count: 8 },
    { id: 'ee', name: 'Electrical & Electronics Engineering', count: 5 },
    { id: 'me', name: 'Mechanical & Manufacturing Engineering', count: 5 },
    { id: 'business', name: 'Business & Commerce', count: 2 }
  ];

  const internshipCategories = [
    // { id: 'all', name: 'All Internships', count: internships.length },
    {
      id: "popular",
      name: "Popular Internships",
      count: internships.filter((internship) =>
        internship.category.includes("Popular Internships")
      ).length,
    },
    {
      id: "software",
      name: "Software Development",
      count: internships.filter((internship) =>
        internship.category.includes("software")
      ).length,
    },
    {
      id: "data",
      name: "Data Analytics",
      count: internships.filter((internship) =>
        internship.category.includes("data")
      ).length,
    },
    {
      id: "business",
      name: "Business Development",
      count: internships.filter((internship) =>
        internship.category.includes("business")
      ).length,
    },
    {
      id: "marketing",
      name: "Digital Marketing",
      count: internships.filter((internship) =>
        internship.category.includes("marketing")
      ).length,
    },
    {
      id: "design",
      name: "UI/UX Design",
      count: internships.filter((internship) =>
        internship.category.includes("design")
      ).length,
    },
    {
      id: "hr",
      name: "Human Resources",
      count: internships.filter((internship) =>
        internship.category.includes("hr")
      ).length,
    },
    {
      id: "finance",
      name: "Finance",
      count: internships.filter((internship) =>
        internship.category.includes("finance")
      ).length,
    },
  ];

  const handleSearch = (term: string) => {
    const filteredCourses = courses
      .filter((course) =>
        course.title.toLowerCase().includes(term.toLowerCase())
      )
      .slice(0, 5);

    const filteredInternships = internships
      .filter((internship) =>
        internship.title.toLowerCase().includes(term.toLowerCase())
      )
      .slice(0, 5);

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(term.toLowerCase())
    );

    const filteredInternshipCategories = internshipCategories.filter(
      (category) => category.name.toLowerCase().includes(term.toLowerCase())
    );

    // Combine all results and remove duplicates
    const combinedResults = [
      ...filteredCourses.map((course) => ({
        ...course,
        type: "course",
      })),
      ...filteredInternships.map((internship) => ({
        ...internship,
        type: "internship",
      })),
      ...filteredCategories.map((category) => ({
        ...category,
        type: "category",
      })),
      ...filteredInternshipCategories.map((category) => ({
        ...category,
        type: "internshipCategory",
      })),
    ];

    // Remove duplicates based on title or name
    const uniqueResults = combinedResults.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => ('title' in t && t.title === item.title) || ('name' in t && 'name' in item && t.name === item.name))
    );

    setFilteredResults(uniqueResults);
  };

  const handleSearchFocus = () => {
    const navbarHeight = 80;
    const offset = searchContainerRef.current ? searchContainerRef.current.getBoundingClientRect().top + window.scrollY - navbarHeight : 0;
  
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });

    setShowDropdown(true);

    const initialCourses = courses.slice(0, 5).map((course) => ({
      ...course,
      type: "course",
    }));

    const initialResults = [...initialCourses];

    setFilteredResults(initialResults);
  };

  const handleItemSelect = (item: {
    type: string;
    title?: string;
    id?: string | number;
    name?: string;
  }) => {
    if (item.type === "course") {
      if (item.title) {
        router.push(`/courses/${generateSlug(item.title)}`);
      }
      if (item.title) {
        router.push(`/internships/${generateSlug(item.title)}`);
      }
    } else if (item.type === "category") {
      router.push(`/explore-courses?category=${item.id}`);
    } else if (item.type === "internshipCategory") {
      router.push(`/explore-internships?category=${item.id}`);
    }
    setShowDropdown(false);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  };

  const handleSearchSubmit = () => {
    if (searchTerm) {
      handleSearch(searchTerm);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      setFilteredResults([]);
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
        className="relative z-10 max-w-6xl mx-auto px-4 mt-44 md:mt-0"
      >
        <Card className="shadow-xl">
          <CardHeader className="font-semibold md:text-xl">
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
                className="md:h-12 h-10 w-full bg-gray-100 px-4 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-[126px] mt-2 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                  >
                    {filteredResults.map((item, index) => (
                      <div
                        key={item.id || index}
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
                            </div>
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
                  className="bg-[#C1272D] hover:bg-[#a61f24] transition-colors md:h-12 h-10 w-full sm:w-auto whitespace-nowrap"
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
