'use client';
import React, { useState } from 'react';
import { Users, Clock, Star, Download, CheckCircle, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CourseDetails = ({ course }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedModules, setExpandedModules] = useState({});

  // Default course content structure
  const defaultContent = {
    description: `This comprehensive course in ${course?.title} is designed to provide you with both theoretical knowledge and practical skills. Through hands-on projects and real-world applications, you'll gain the expertise needed to excel in this field.`,
    modules: [
      {
        title: "Module 1: Introduction",
        duration: "2 hours",
        topics: ["Course Overview", "Basic Concepts", "Setting up the Environment"]
      },
      {
        title: "Module 2: Core Concepts",
        duration: "3 hours",
        topics: ["Fundamental Principles", "Best Practices", "Hands-on Exercises"]
      },
      {
        title: "Module 3: Advanced Topics",
        duration: "4 hours",
        topics: ["Advanced Techniques", "Real-world Applications", "Case Studies"]
      }
    ]
  };

  const currentContent = defaultContent;

  const toggleModule = (moduleTitle) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleTitle]: !prev[moduleTitle]
    }));
  };

  const benefits = [
    "Industry-recognized certification",
    "Hands-on practical experience",
    "Real-world project exposure",
    "Expert mentorship",
    "Career guidance and support",
    "Networking opportunities"
  ];

  const trainer = {
    name: "Dr. Sarah Johnson",
    role: "Senior Technical Lead",
    experience: "15+ years",
    expertise: "AI/ML, Data Science, Cloud Computing",
    image: "/trainer-image.jpg"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link href="/explore-courses" className="text-gray-600 hover:text-red-600 transition-colors">
          Courses
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">
          {course?.title || 'Course Details'}
        </span>
      </nav>

      {/* Course Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white mb-8"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Course Image */}
          <div className="w-full md:w-1/3">
            <div className="aspect-video rounded-xl overflow-hidden">
              <img
                src="/Images.jpg"
                alt={course?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Course Info */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{course?.title}</h1>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{course?.learners} learners</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course?.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>4.8/5 rating</span>
              </div>
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

      {/* Navigation Tabs */}
      <div className="flex space-x-6 border-b mb-8">
        {['overview', 'curriculum', 'trainer', 'certificate'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`pb-4 px-2 font-medium capitalize ${
              activeSection === section
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-600'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  {currentContent.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'curriculum' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {currentContent.modules.map((module, index) => (
                  <motion.div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center bg-gray-50"
                      onClick={() => toggleModule(module.title)}
                    >
                      <span className="font-medium">{module.title}</span>
                      <span className="text-sm text-gray-500">{module.duration}</span>
                      {expandedModules[module.title] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    <AnimatePresence>
                      {expandedModules[module.title] && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="p-6 bg-white">
                            <ul className="space-y-3">
                              {module.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                                  <span className="text-gray-700">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CourseDetails;
