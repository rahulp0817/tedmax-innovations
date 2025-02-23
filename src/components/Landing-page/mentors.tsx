"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for Next.js app router
import { MapPin, Users, Briefcase, ArrowRight } from "lucide-react";

const Mentors = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  interface Mentor {
    id: number;
    name: string;
    profession: string;
    university: string;
    imageUrl: string;
    experience?: string;
    specialization?: string;
  }

  const mentorsData: Mentor[] = [
    {
      id: 1,
      name: "John Doe",
      profession: "Software Engineer",
      university: "MIT",
      imageUrl: "/default-avatar.jpg",
      experience: "8+ years",
      specialization: "Full Stack Development",
    },
    {
      id: 2,
      name: "Jane Smith",
      profession: "Data Scientist",
      university: "Stanford",
      imageUrl: "/default-avatar.jpg",
      experience: "6+ years",
      specialization: "Machine Learning",
    },
    {
      id: 3,
      name: "John Doe",
      profession: "Software Engineer",
      university: "MIT",
      imageUrl: "/default-avatar.jpg",
      experience: "8+ years",
      specialization: "Full Stack Development",
    },
    {
      id: 4,
      name: "Jane Smith",
      profession: "Data Scientist",
      university: "Stanford",
      imageUrl: "/default-avatar.jpg",
      experience: "6+ years",
      specialization: "Machine Learning",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 mb-32">
      {/* Header Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
            MENTORS
          </motion.span>
          <motion.h2
            className="text-3xl font-bold mt-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Learn from our{" "}
            <span className="text-red-600">Industry Experts</span>
          </motion.h2>
        </motion.div>
      </motion.div>

      {/* Mentors Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {mentorsData.slice(0, 4).map((mentor, index) => (
            <motion.div
              key={mentor.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
              }}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredCard(mentor.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Link
                href={`/mentors/${mentor.name
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
              >
                <div className="p-6">
                  {/* Mentor Image */}
                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto mb-4">
                      <img
                        src={mentor.imageUrl}
                        alt={mentor.name}
                        className="w-full h-full object-cover rounded-full border-4 border-gray-50"
                      />
                    </div>
                  </div>

                  {/* Mentor Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-red-600 font-medium mb-2">
                      {mentor.specialization}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span>{mentor.profession}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{mentor.university}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{mentor.experience} experience</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Explore Mentors Button */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/mentors"
            className="group border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-red-100 transition-colors inline-flex items-center"
          >
            Explore Mentors
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

export default Mentors;
