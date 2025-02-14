"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CatalogSection = () => {
  const courses = [
    {
      title: "Learn real AI skills ",
      highlight: "In less then 30 days",
      description:
        "Includes masterclasses from AI experts at Microsoft and free access to ChatGPT Plus, M365 Copilot and GitHub Copilot.",
      image: "/Images.jpg",
      partner: {
        logo: "Microsoft",
        text: "Making 1 Million Indians, AI-Ready Professionals",
      },
    },
    {
      title: "Master Data Science",
      highlight: "With real-world projects",
      description:
        "Learn from industry experts and get hands-on experience with advanced analytics tools and machine learning frameworks.",
      image: "/Images.jpg",
      partner: {
        logo: "IBM",
        text: "Industry-recognized certification program",
      },
    },
    {
      title: "Become a Full Stack Developer",
      highlight: "in just 6 months",
      description:
        "Comprehensive program covering front-end, back-end, and DevOps with practical projects and mentorship.",
      image: "/Images.jpg",
      partner: {
        logo: "AWS",
        text: "Cloud-ready development skills",
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-0">
      {courses.map((course, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`flex flex-col ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center gap-24 mb-32`}
        >
          {/* Text Content */}
          <motion.div
            className="flex-1 text-left"
            variants={{
              hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              },
            }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold leading-tight mb-6">
              {course.title}{" "}
              <span className="text-red-600 block mt-2">
                {course.highlight}
              </span>
            </h2>
            <p className="text-md text-gray-600 mb-8">{course.description}</p>
            <motion.button
              className="inline-flex items-center px-6 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Program
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="flex-1 relative"
            variants={{
              hidden: { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              },
            }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              {/* Partner Badge */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg">
                <div className="text-sm font-semibold mb-1">
                  {course.partner.logo}
                </div>
                <div className="text-xs opacity-80 max-w-[200px]">
                  {course.partner.text}
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-4 right-4 w-full h-full bg-gray-100 rounded-2xl" />
            <motion.div
              className="absolute -z-10 -bottom-4 -right-4 w-24 h-24 bg-red-100 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default CatalogSection;
