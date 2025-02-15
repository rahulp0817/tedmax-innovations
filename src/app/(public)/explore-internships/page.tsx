"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Clock,
  MapPin,
  Wallet,
  House,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { internships } from "@/app/(public)/internships/data";

const InternshipExplorer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Read URL parameters on component mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Generate URL-friendly slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") // Convert to slug format
      .replace(/^-+|-+$/g, ""); // Remove extra hyphens
  };

  // Handle Internship Click
  const handleInternshipClick = (internship: { title: string }) => {
    router.push(`/internships/${generateSlug(internship.title)}`);
  };

  const getCategoryCounts = () => ({
    all: internships.length,
    popular: internships.filter((internship) =>
      internship.applicants?.includes("k+")
    ).length,
    software: internships.filter(
      (internship) => internship.category === "software"
    ).length,
    data: internships.filter((internship) => internship.category === "data")
      .length,
    business: internships.filter(
      (internship) => internship.category === "business"
    ).length,
    marketing: internships.filter(
      (internship) => internship.category === "marketing"
    ).length,
    design: internships.filter((internship) => internship.category === "design")
      .length,
    hr: internships.filter((internship) => internship.category === "hr").length,
    finance: internships.filter(
      (internship) => internship.category === "finance"
    ).length,
  });

  const categoryCounts = getCategoryCounts();

  const categories = [
    { id: "all", name: "All Internships", count: categoryCounts.all },
    {
      id: "popular",
      name: "Popular Internships",
      count: categoryCounts.popular,
    },
    {
      id: "software",
      name: "Software Development",
      count: categoryCounts.software,
    },
    { id: "data", name: "Data Analytics", count: categoryCounts.data },
    {
      id: "business",
      name: "Business Development",
      count: categoryCounts.business,
    },
    {
      id: "marketing",
      name: "Digital Marketing",
      count: categoryCounts.marketing,
    },
    { id: "design", name: "UI/UX Design", count: categoryCounts.design },
    { id: "hr", name: "Human Resources", count: categoryCounts.hr },
    { id: "finance", name: "Finance", count: categoryCounts.finance },
  ];

  // Updated filter logic to match first version
  const displayedInternships = internships.filter((internship) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "popular" &&
        internship.applicants.includes("k+")) ||
      internship.category === selectedCategory;

    const matchesSearch =
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  // Update URL when category changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const url = new URL(window.location.href);
    url.searchParams.set("category", categoryId);
    window.history.pushState({}, "", url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mb-24 mt-16">
      {/* Rest of the JSX remains the same */}
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link
          href="/"
          className="text-gray-600 hover:text-red-600 transition-colors"
        >
          <House className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-red-600 font-medium">Internships</span>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 py-4">
        <h1 className="text-4xl font-bold text-red-600">
          Find Your Internship
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search internships..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex gap-6 relative">
        {/* Categories Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                    selectedCategory === category.id
                      ? "bg-red-100 text-red-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-gray-500">
                    ({category.count})
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Internship Grid */}
        <div className="flex-1">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {displayedInternships.map((internship, index) => (
                <motion.div
                  key={internship.id}
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
                  onHoverStart={() => setHoveredCard(internship.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  layout
                >
                  <Link
                    href={`/internships/${generateSlug(internship.title)}`}
                    className="block h-full"
                  >
                    <motion.div className="p-4 rounded-xl">
                      {/* Company Logo and Info */}
                      <div className="items-start gap-4 mb-4">
                        <div className="w-58 h-40 rounded-xl flex-shrink-0">
                          <img
                            src={internship.image}
                            alt="banner"
                            className="w-full h-full object-contain rounded-xl"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder-company.png";
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <motion.h3 className="text-md font-semibold text-gray-900 mb-1 mt-2 line-clamp-2 h-12">
                            {internship.title}
                          </motion.h3>
                        </div>
                      </div>

                      {/* Description */}
                      {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">
                        {internship.description}
                      </p> */}

                      {/* Details */}
                      <div className="space-y-3 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} /> {internship.workType}
                        </div>
                        <div className="flex items-center gap-2">
                          <Wallet size={16} /> {internship.stipend}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} /> {internship.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} /> {internship.applicants} applicants
                        </div>
                      </div>

                      {/* Tech Stacks */}
                      {/* <div className="flex flex-wrap gap-2">
                        {internship.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div> */}
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

export default InternshipExplorer;
