"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Linkedin,
  Github,
  Building2,
  GraduationCap,
  ChevronRight,
  Home,
  Twitter,
} from "lucide-react";

const mentorsData = [
  {
    name: "John Doe",
    imageUrl: "/default-avatar.jpg",
    specialization: "Web Development",
    socialLinks: {
      facebook: "https://facebook.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    about: "John is a seasoned web developer with over 10 years of experience.",
    university: "University of Technology",
    workExperience: [
      { company: "Tech Corp", period: "2015-2020", role: "Senior Developer" },
      {
        company: "Web Solutions",
        period: "2020-Present",
        role: "Lead Developer",
      },
    ],
    languages: ["JavaScript", "TypeScript", "React", "Node.js"] as Array<keyof typeof languageColors>,
  },
];

const languageColors = {
  JavaScript: "bg-yellow-500",
  TypeScript: "bg-blue-500",
  React: "bg-cyan-500",
  "Node.js": "bg-green-500",
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function InstructorProfile({
  params,
}: {
  params: { mentorsid: string };
}) {
  const mentor = mentorsData.find(
    (m) => m.name.toLowerCase().replace(/ /g, "-") === params.mentorsid
  );

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center mb-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Mentor Not Found
          </h1>
          <Link href="/mentors" className="text-red-600 hover:text-red-700">
            Back to Mentors
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div
        className="relative h-[200px] md:h-[280px] bg-gradient-to-r from-teal-900 to-teal-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -bottom-20 left-6 flex items-center gap-8 lg:left-16">
          <motion.div
            className=" w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <img
              src={mentor.imageUrl}
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-white mb-0">
              {mentor.name}
            </h1>
            <p className="text-teal-100 mb-6 text-lg">
              {mentor.specialization}
            </p>
            <div className="flex space-x-4">
              {Object.entries(mentor.socialLinks).map(
                ([platform, link], index) => (
                  <motion.a
                    key={platform}
                    href={link}
                    className="w-10 h-10 bg-gray-500 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {platform === "facebook" && (
                      <Twitter className="text-white" />
                    )}
                    {platform === "linkedin" && (
                      <Linkedin className="text-white" />
                    )}
                    {platform === "github" && <Github className="text-white" />}
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 lg:px-0 pt-28 pb-32 ">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* About Section */}
          <motion.div
            variants={fadeInUp}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              About Instructor
            </h2>
            <p className="text-gray-600 leading-relaxed">{mentor.about}</p>
          </motion.div>

          {/* Education Section */}
          <motion.div
            variants={fadeInUp}
            className=""
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">Education</h2>
            <div className="flex items-start gap-3">
              <GraduationCap className="w-6 h-6 text-teal-600 mt-1" />
              <div>
                <p className="text-gray-900 font-medium">{mentor.university}</p>
              </div>
            </div>
          </motion.div>

          {/* Work Experience Section */}
          <motion.div
            variants={fadeInUp}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Work Experience
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {mentor.workExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 hover:border-teal-100 hover:bg-teal-50/50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Building2 className="w-6 h-6 text-teal-600 mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {exp.company}
                      </span>
                      <span className="text-gray-500">({exp.period})</span>
                    </div>
                    <p className="text-gray-600">Role: {exp.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Languages Section */}
          <motion.div
            variants={fadeInUp}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {mentor.languages.map((lang, index) => (
                <motion.span
                  key={index}
                  className={`${
                    languageColors[lang] || "bg-gray-500"
                  } text-white px-4 py-1.5 rounded-md text-sm font-medium`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
