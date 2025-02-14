"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Clock, MapPin, Wallet, CheckCircle, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import Link from "next/link";

const InternshipDetails = ({ internship }) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedModules, setExpandedModules] = useState({});

  // Default content if the internship isn't in the predefined list
  const defaultContent = {
    description: `This internship provides hands-on experience in ${internship?.title}. Gain real-world expertise through structured training and projects.`,
    modules: [
      {
        title: "Module 1: Introduction",
        duration: "2 hours",
        topics: ["Internship Overview", "Expectations", "Industry Relevance"],
      },
      {
        title: "Module 2: Skill Development",
        duration: "3 hours",
        topics: ["Technical Skills", "Project Work", "Mentorship"],
      },
      {
        title: "Module 3: Final Project",
        duration: "4 hours",
        topics: ["Capstone Project", "Presentation", "Career Guidance"],
      },
    ],
  };

  const currentContent = defaultContent;

  const toggleModule = (moduleTitle) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleTitle]: !prev[moduleTitle],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link href="/explore-internships" className="text-gray-600 hover:text-red-600 transition-colors">
          Internships
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{internship?.title}</span>
      </nav>

      {/* Internship Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white mb-8"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Internship Image */}
          <div className="w-full md:w-1/3">
            <img src={internship?.image} alt={internship?.title} className="rounded-xl" />
          </div>

          {/* Internship Info */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{internship?.title}</h1>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2"><Users className="w-5 h-5" /> {internship?.applicants}</div>
              <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> {internship?.duration}</div>
              <div className="flex items-center gap-2"><Wallet className="w-5 h-5" /> {internship?.stipend}</div>
              <div className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {internship?.workType}</div>
                      </div>
                      <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
                                  >
                                    Enroll Now
                                  </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Curriculum Section */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Internship Curriculum</h2>
        <div className="space-y-4">
          {currentContent.modules.map((module, index) => (
            <motion.div key={index} className="border rounded-lg overflow-hidden">
              <button className="w-full px-6 py-4 flex justify-between items-center bg-gray-50" onClick={() => toggleModule(module.title)}>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{module.title}</span>
                  <span className="text-sm text-gray-500">{module.duration}</span>
                </div>
                {expandedModules[module.title] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <AnimatePresence>
                {expandedModules[module.title] && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden p-6">
                    <ul className="space-y-3">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                  </AnimatePresence>
                  
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
