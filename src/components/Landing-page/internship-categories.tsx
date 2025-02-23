"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, Wallet, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { internships } from "@/app/(public)/internships/data";
import Link from "next/link";

const InternshipSection = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Function to generate URL-friendly slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const popularInternships = internships.filter(
    (internship) =>
      Array.isArray(internship.category) &&
      internship.category.includes("Popular Internships")
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 mb-32">
      {/* Header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="text-sm font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          INTERNSHIPS
        </motion.span>
        <motion.h2
          className="text-3xl font-bold mt-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Kickstart your career with{" "}
          <span className="text-red-600">internships programs</span>
        </motion.h2>
      </motion.div>

      {/* Internship Grid */}
      <div className="w-full">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {popularInternships.slice(0, 4).map((internship, index) => (
              <motion.div
                key={internship.title}
                className="w-full bg-white rounded-xl overflow-hidden shadow cursor-pointer hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                onClick={() =>
                  router.push(`/internships/${generateSlug(internship.title)}`)
                }
              >
                <motion.div className="p-4 rounded-xl">
                  {/* Company Logo and Info */}
                  <div className="items-start gap-4 mb-4">
                    <div className="w-58 h-40 rounded-xl flex-shrink-0">
                      <img
                        src={internship.image || "/placeholder-company.png"}
                        alt={internship.company}
                        className="w-full h-full object-contain rounded-xl"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-company.png";
                        }}
                      />
                    </div>
                    <div>
                      <motion.h3 className="text-md font-semibold text-gray-900 mb-1 mt-2 line-clamp-2 h-12">
                        {internship.title}
                      </motion.h3>
                    </div>
                  </div>

                  {/* Internship Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{internship.workType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Wallet className="w-4 h-4" />
                      <span className="text-sm">{internship.stipend}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarDays className="w-4 h-4" />
                      <span className="text-sm">{internship.duration}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* View All Internships Button */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/explore-internships"
            className="group border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-red-100 transition-colors inline-flex items-center"
          >
            Explore Internships
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
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InternshipSection;
