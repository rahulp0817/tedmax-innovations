"use client";

// Sample data for mentors
const mentorsData: Mentor[] = [
  {
    id: 1,
    name: "John Doe",
    profession: "Software Engineer",
    university: "MIT",
    imageUrl: "/images/john-doe.jpg",
    experience: "5 years",
    rating: 4.5,
    specialization: "Web Development",
    bio: "John is a seasoned software engineer with a passion for teaching.",
    expertise: ["JavaScript", "React", "Node.js"],
    achievements: ["Published 3 books", "Speaker at 10+ conferences"],
    availability: {
      days: "Monday to Friday",
      hours: "9 AM to 5 PM",
    },
    sessionsCompleted: 100,
    studentsHelped: 200,
  },
  // Add more mentor objects as needed
];

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  Briefcase,
  GraduationCap,
  Award,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

// This would typically come from your database/API
type Mentor = {
  id: number;
  name: string;
  profession: string;
  university: string;
  imageUrl: string;
  experience: string;
  rating: number;
  specialization: string;
  bio: string;
  expertise: string[];
  achievements: string[];
  availability: {
    days: string;
    hours: string;
  };
  sessionsCompleted: number;
  studentsHelped: number;
};


export default function MentorProfile({ params }: { params: { slug: string } }) {
  const mentor = mentorsData.find((mentor) => mentor.name.toLowerCase().replace(/ /g, "-") === params.slug);

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Mentor Not Found</h1>
          <Link href="/mentors" className="text-red-600 hover:text-red-700">
            Back to Mentors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/mentors"
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Mentors
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={mentor.imageUrl}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full border-4 border-gray-50 mb-4"
                  />
                  <span className="absolute top-0 right-0 bg-yellow-400 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {mentor.rating}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{mentor.name}</h1>
                <p className="text-red-600 font-medium">{mentor.specialization}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Briefcase className="w-5 h-5" />
                  <span>{mentor.profession}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{mentor.university}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{mentor.experience} experience</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{mentor.availability.days}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{mentor.availability.hours}</span>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Schedule Session
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Detailed Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            {/* Bio Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{mentor.bio}</p>
            </div>

            {/* Expertise Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
              <ul className="space-y-3">
                {mentor.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {mentor.sessionsCompleted}+
                </div>
                <div className="text-gray-600">Sessions Completed</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {mentor.studentsHelped}+
                </div>
                <div className="text-gray-600">Students Helped</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}