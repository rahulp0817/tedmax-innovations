"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Users, Briefcase, Star, ExternalLink } from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  profession: string;
  university: string;
  imageUrl: string;
  experience?: string;
  rating?: number;
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
  {
    id: 5,
    name: "John Doe",
    profession: "Software Engineer",
    university: "MIT",
    imageUrl: "/default-avatar.jpg",
    experience: "8+ years",
    specialization: "Full Stack Development",
  },
  {
    id: 6,
    name: "Jane Smith",
    profession: "Data Scientist",
    university: "Stanford",
    imageUrl: "/default-avatar.jpg",
    experience: "6+ years",
    specialization: "Machine Learning",
  },
];

const MentorsPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-4 py-12 mb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn from{" "}
            <span className="text-[var(--primary-color)]">
              Industry Experts
            </span>
          </h1>
          <p className="md:text-lg text-sm text-gray-600 max-w-2xl mx-auto">
            Connect with experienced mentors who will guide you through your
            learning journey and help you achieve your career goals.
          </p>
        </motion.div>

        {/* Mentors Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {mentorsData.map((mentor, index) => (
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

                    {/* View Profile Button */}
                    {/* <motion.div 
                      className="mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === mentor.id ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button className="w-full py-2 px-4 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors">
                        View Profile
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </motion.div> */}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorsPage;
