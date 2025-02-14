"use client";
import React, { useState } from "react";
import { Users, Clock, ArrowRight, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const CourseSection = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Popular Programs");
  const [showAll, setShowAll] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const tabs = [
    "Popular Programs",
    "Computer Science & Technology",
    "Electrical & Electronics Engineering",
    "Mechanical & Manufacturing Engineering",
    "Business & Commerce",
  ];

  const courses = [
    {
      title: "Artificial Intelligence & Machine Learning",
      image: "/CradImage.png",
      duration: "5hrs 45mins",
      price: "499",
      categories: ["Computer Science & Technology", "Popular Programs"],
    },
    {
      title: "Cybersecurity",
      image: "/CradImage.png",
      duration: "5 hrs of learning",
      price: "499",
      categories: ["Computer Science & Technology", "Popular Programs"],
    },
    {
      title: "Cloud Computing",
      image: "/CradImage.png",
      learners: "78.3k+",
      duration: "6 hrs of learning",
      price: "499",
      categories: ["Computer Science & Technology", "Popular Programs"],
    },
    {
      title: "Data Science",
      image: "/CradImage.png",
      duration: "12 hrs of learning",
      price: "499",
      categories: ["Computer Science & Technology"],
    },
    {
      title: "IoT",
      image: "/Images.jpg",
      duration: "8 hrs of learning",
      price: "499",
      categories: ["Computer Science & Technology"],
    },
    {
      title: "Augmented and Virtual Reality",
      image: "/Images.jpg",
      duration: "10 hrs of learning",
      price: "499",
      categories: ["Computer Science & Technology"],
    },
    {
      title: "Android Development",
      image: "/Images.jpg",
      duration: "7 hrs of learning",
      price: "499",
      categories: ["Computer Science & Technology"],
    },
    {
      title: "Web Development",
      image: "/Images.jpg",
      duration: "8 hrs of learning",
      price: "499",
      categories: ["Computer Science & Technology"],
    },
    {
      title: "Renewable Energy Systems",
      image: "/Images.jpg",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Electrical & Electronics Engineering"],
    },
    {
      title: "Smart Grid Technology",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Electrical & Electronics Engineering"],
    },
    {
      title: "Electric Vehicles",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Electrical & Electronics Engineering"],
    },
    {
      title: "Embedded Systems",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Electrical & Electronics Engineering"],
    },
    {
      title: "Wireless Communication",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Electrical & Electronics Engineering"],
    },
    {
      title: "Robotics & Automation",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Mechanical & Manufacturing Engineering"],
    },
    {
      title: "Additive Manufacturing",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Mechanical & Manufacturing Engineering"],
    },
    {
      title: "Aerospace Engineering",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Mechanical & Manufacturing Engineering"],
    },
    {
      title: "Advanced Material Engineering",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Mechanical & Manufacturing Engineering"],
    },
    {
      title: "Mechatronics",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Mechanical & Manufacturing Engineering"],
    },
    {
      title: "Digital Marketing & E-Commerce",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Business & Commerce"],
    },
    {
      title: "Business Analytics",
      image: "/Images.jpg",
      learners: "32.1k+",
      duration: "11 hrs of learning",
      price: "499",
      categories: ["Business & Commerce"],
    },
  ];

  const filteredCourses = courses.filter((course) =>
    activeTab === "Popular Programs"
      ? course.categories.includes("Popular Programs")
      : course.categories.includes(activeTab)
  );

  const handleCourseClick = (course: {
    title: string;
    image: string;
    learners: string;
    duration: string;
    price: string;
    categories: string[];
  }) => {
    const courseSlug = course.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-");
    router.push(`/courses/${courseSlug}`);
  };

  const displayedCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, 6);

  interface Course {
    title: string;
    image: string;
    learners: string;
    duration: string;
    price: string;
    categories: string[];
  }

  interface CardVariants {
    hidden: { opacity: number; y: number };
    visible: (index: number) => {
      opacity: number;
      y: number;
      transition: {
        duration: number;
        delay: number;
        ease: string;
      };
    };
    hover: {
      scale: number;
      y: number;
      transition: {
        duration: number;
        ease: string;
      };
    };
  }

  const cardVariants: CardVariants = {
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

  return (
    <div className="w-full max-w-7xl mx-auto px-2 mb-32">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold mt-2 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Browse Our{" "}
          <span className="text-[var(--primary-color)]">Top Courses</span>
        </motion.h2>
      </motion.div>

      {/* Animated Tabs */}
      <div className="relative mb-4">
        <div className="flex justify-center">
          <div className="flex space-x-8 overflow-x-auto pb-4 hide-scrollbar text-center">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap text-base font-medium pb-4 ${
                  activeTab === tab
                    ? "text-[var(--primary-color)]"
                    : "text-black hover:text-gray-600"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary-color)]"
                    layoutId="activeTab"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="w-full">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
          layout
        >
          <AnimatePresence mode="wait">
            {displayedCourses.map((course, index) => (
              <motion.div
                key={course.title}
                className="w-full p-4 space-y-2 bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg shadow "
                //@ts-ignore
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={"hover"}
                custom={index}
                layout
                //@ts-ignore
                onClick={() => handleCourseClick(course)}
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
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* View All Courses Button */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => router.push("/explore-courses")}
          className="group border border-[var(--primary-color)] text-[var(--primary-color)] px-6 py-3 rounded-lg font-medium hover:bg-red-100 transition-colors inline-flex items-center"
          whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Courses
          <motion.span
            className="inline-block ml-2"
            initial={{ x: 0 }}
            animate={{ x: 5 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CourseSection;
