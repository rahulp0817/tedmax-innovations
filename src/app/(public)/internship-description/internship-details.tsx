"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  MapPin,
  Wallet,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  House,
} from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

interface Internship {
  title: string;
  image: string;
  workType: string;
  duration: string;
  stipend: string;
  learningOutcomes: string[];
}

const InternshipDetails = ({ internship }: { internship: Internship }) => {

  const defaultContent = {
    description: `This internship provides hands-on experience in ${internship?.title}. Gain real-world expertise through structured training and projects.`,
    modules: [
      {
        title: "Introduction",
        module: 1,
        duration: "2 hours",
        topics: ["Internship Overview", "Expectations", "Industry Relevance"],
      },
      {
        title: "Skill Development",
        module: 2,
        duration: "3 hours",
        topics: ["Technical Skills", "Project Work", "Mentorship"],
      },
      {
        title: "Final Project",
        module: 3,
        duration: "4 hours",
        topics: ["Capstone Project", "Presentation", "Career Guidance"],
      },
    ],
  };

  const currentContent = defaultContent;


  const certificateFeatures = [
    "Industry-recognized certification",
    "Detailed performance assessment",
    "Digital badge for your portfolio",
    "Shareable on LinkedIn and other platforms",
    "Verifiable credentials",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mb-32">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link
          href="/"
          className="text-gray-600 hover:text-red-600 transition-colors"
        >
          <House className="w-4 h-4"/>
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link
          href="/explore-internships"
          className="text-gray-600 hover:text-red-600 transition-colors"
        >
          Internships
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-500 font-medium">{internship?.title}</span>
      </nav>

      {/* Internship Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white mb-8 gap-4"
      >
        <div className="flex flex-col md:flex-row gap-12">
          {/* Internship Image */}
          <div className="w-full md:w-1/3">
            <img
              src={internship?.image}
              alt={internship?.title}
              className="rounded-xl object-cover "
            />
          </div>

          {/* Internship Info */}
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-6">{internship?.title}</h1>
            <div className="gap-6 mb-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {internship?.workType}
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Completion of Internship certificate
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Completion of Industrial Training
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                {internship?.duration}
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                {internship?.stipend}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--primary-color)] text-white px-5 py-2 rounded-lg font-medium text-sm"
            >
              Enroll Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* About it */}
      <div className="bg-white rounded-xl p-0 mb-8 gap-4">
        <h2 className="text-2xl font-bold mb-6">About the Internship</h2>
        <p className="text-gray-500 line-clamp-5">
          {currentContent.description}
        </p>
      </div>

      {/* learning outcomes */}
      <div className="bg-white rounded-xl p-0 mb-8 gap-4">
        <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
        <ul className="space-y-3">
          {internship?.learningOutcomes?.map((outcome, index) => (
            <li key={index} className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Internship certificate and Industrial certificate */}
      <div className="bg-white p-0  mt-4">
        <div className="grid md:grid-cols-2 gap-48">
          {/* Left side - Certificate Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Internship Certificate
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Upon successful completion of the internship program, you'll
                receive our prestigious certification that validates your
                practical experience and newly acquired skills.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Certificate Benefits
              </h3>
              <ul className="space-y-3">
                {certificateFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right side - Certificate Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              className="absolute -top-4 -left-4 w-full h-full  rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />

            <Image
              src="/Webdev-Internship-Certificate.png"
              alt="Webdev-Internship-Certificate"
              width={500}
              height={500}
              priority
            />
          </motion.div>
        </div>

        {/* industrial */}
        <div className="grid md:grid-cols-2 gap-48 mt-16">
          {/* Left side - Certificate  */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              className="absolute -top-4 -left-4 w-full h-full  rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />

            <Image
              src="/Webdev-Industrial-Training-Certificate.png"
              alt="Industrial-Training-Certificate"
              width={500}
              height={500}
              priority
            />
          </motion.div>
          
          {/* Right side - Certificate Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
              Industrial Training Certificate
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Upon successful completion of the internship program, you'll
                receive our prestigious certification that validates your
                practical experience and newly acquired skills.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Certificate Benefits
              </h3>
              <ul className="space-y-3">
                {certificateFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="bg-white rounded-lg p-6 shadow mt-16">
        <h2 className="text-2xl font-bold mb-6">Internship Curriculum</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {currentContent.modules.map((module, index) => (
            <AccordionItem
              key={index}
              value={`module-${index}`}
              className="border rounded-lg overflow-hidden px-0 mt-0 "
            >
              <AccordionTrigger className="hover:no-underline px-6 py-4 bg-gray-50">
                <div className="items-center gap-4 text-gray-500">
                  <p className="font-medium text-lg text-black">
                    {module.title}
                  </p>
                  <span className="font-medium text-sm">
                    Module {module.module}
                  </span>
                  <span className="rounded-full px-1">.</span>
                  <span className="font-medium text-sm">{module.duration}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-6 px-6">
                <ul className="space-y-3">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default InternshipDetails;
