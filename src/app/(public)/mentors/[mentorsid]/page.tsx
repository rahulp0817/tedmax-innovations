"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Github,
  Building2,
  GraduationCap
} from "lucide-react";

// Define mentor data structure
const mentorsData = [
  {
    id: 1,
    name: "John Doe",
    profession: "Software Engineer",
    university: "MIT",
    imageUrl: "/default-avatar.jpg",
    experience: "8+ years",
    specialization: "Full Stack Development",
    about: "A seasoned software engineer with expertise in full stack development. Passionate about teaching and mentoring aspiring developers.",
    languages: ["JavaScript", "Python", "Java", "C++"],
    workExperience: [
      {
        company: "Google",
        period: "2018 - Present",
        role: "Senior Software Engineer"
      },
      {
        company: "Microsoft",
        period: "2015 - 2018",
        role: "Software Engineer"
      }
    ],
    socialLinks: {
      instagram: "#",
      facebook: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    profession: "Data Scientist",
    university: "Stanford",
    imageUrl: "/default-avatar.jpg",
    experience: "6+ years",
    specialization: "Machine Learning",
    about: "Expert data scientist with focus on machine learning and AI. Experienced in building and deploying ML models at scale.",
    languages: ["Python", "R", "SQL", "TypeScript"],
    workExperience: [
      {
        company: "Amazon",
        period: "2019 - Present",
        role: "Senior Data Scientist"
      },
      {
        company: "Facebook",
        period: "2016 - 2019",
        role: "Data Scientist"
      }
    ],
    socialLinks: {
      instagram: "#",
      facebook: "#",
      linkedin: "#",
      github: "#"
    }
  }
];

// Color mapping for language badges
const languageColors: { [key: string]: string } = {
  JavaScript: "bg-yellow-400",
  Python: "bg-purple-500",
  Java: "bg-red-500",
  "C++": "bg-blue-600",
  TypeScript: "bg-green-500",
  R: "bg-teal-500",
  SQL: "bg-pink-500",
  NodeJS: "bg-teal-500",
  "C#": "bg-purple-600"
};

export default function InstructorProfile({ params }: { params: { mentorsid: string } }) {
  // Find mentor by URL slug
  const mentor = mentorsData.find(
    (m) => m.name.toLowerCase().replace(/ /g, "-") === params.mentorsid
  );

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
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div className="relative h-[300px] bg-gradient-to-r from-teal-900 to-teal-700">
        {/* Profile Image */}
        <div className="absolute -bottom-20 left-16">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
            <img
              src={mentor.imageUrl}
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Mentor Name and Social Links */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {mentor.name}
          </h1>
          <p className="text-gray-600 mb-4">{mentor.specialization}</p>
          <div className="flex gap-2">
            <Link href={mentor.socialLinks.instagram} className="text-pink-500 hover:text-pink-600">
              <Instagram size={20} />
            </Link>
            <Link href={mentor.socialLinks.facebook} className="text-blue-600 hover:text-blue-700">
              <Facebook size={20} />
            </Link>
            <Link href={mentor.socialLinks.linkedin} className="text-blue-500 hover:text-blue-600">
              <Linkedin size={20} />
            </Link>
            <Link href={mentor.socialLinks.github} className="text-gray-800 hover:text-gray-900">
              <Github size={20} />
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About Instructor</h2>
          <p className="text-gray-600 leading-relaxed">{mentor.about}</p>
        </div>

        {/* Education Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="flex items-start gap-3">
            <GraduationCap className="w-6 h-6 text-gray-400 mt-1" />
            <div>
              <p className="text-gray-600">{mentor.university}</p>
            </div>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <div className="space-y-4">
            {mentor.workExperience.map((exp, index) => (
              <div key={index} className="flex items-start gap-3">
                <Building2 className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{exp.company}</span>
                    <span className="text-gray-500">({exp.period})</span>
                  </div>
                  <p className="text-gray-600">Role: {exp.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Language</h2>
          <div className="flex flex-wrap gap-2">
            {mentor.languages.map((lang, index) => (
              <span
                key={index}
                className={`${languageColors[lang] || 'bg-gray-500'} text-white px-4 py-1 rounded-md text-sm`}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}