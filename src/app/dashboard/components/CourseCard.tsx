'use client';
import React, { useState } from 'react';
import { Play, Users, Clock, Star, Download, CheckCircle, ChevronDown, ChevronUp, ChevronRight, House, X } from 'lucide-react';

interface CourseCardProps {
    id: string;
    title: string;
    duration: string;
    progress: number;
    image: string;
    color: string;
    learners?: number;
}

// CourseCard Component
export function CourseCard({ id, title, duration, progress, image, color, learners }: CourseCardProps) {
    const [showDetails, setShowDetails] = useState(false);

    const handleViewCourse = () => {
        setShowDetails(true);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`relative h-40 ${color}`}>
                    <img
                        src={image || "/CradImage.png"}
                        alt={title}
                        className="w-full h-full object-cover shadow-inner"
                    />
                    <div className="absolute bottom-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                        <div className="relative">
                            <svg className="w-10 h-10 -rotate-90">
                                <circle
                                    className="text-gray-200"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="16"
                                    cx="20"
                                    cy="20"
                                />
                                <circle
                                    className="text-red-500"
                                    strokeWidth="2"
                                    strokeDasharray={100.48}
                                    strokeDashoffset={100.48 * (1 - progress / 100)}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="16"
                                    cx="20"
                                    cy="20"
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                                {progress}%
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-3">
                    <h3 className="font-semibold text-base">{title}</h3>
                    <p className="text-gray-500 text-sm mt-1">Video: {duration}</p>
                    <div className="mt-3 flex gap-2">
                        <button 
                            onClick={handleViewCourse}
                            className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 text-sm"
                        >
                            <Play size={14} /> View Course
                        </button>
                        {progress === 100 && (
                            <button className="flex-1 bg-blue-100 text-blue-700 py-1.5 text-sm rounded-lg hover:bg-blue-200">
                                Claim Certificate
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Course Details Modal */}
            {showDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
                        <CourseDetails 
                            course={{
                                id,
                                title,
                                duration,
                                learners,
                                image
                            }}
                            onClose={() => setShowDetails(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

// CourseDetails Component
function CourseDetails({ course, onClose }) {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedModules, setExpandedModules] = useState({});

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

    const benefits = [
        "Industry-recognized certification",
        "Hands-on practical experience",
        "Real-world project exposure",
        "Expert mentorship",
        "Career guidance and support",
        "Networking opportunities"
    ];

    const toggleModule = (moduleTitle) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleTitle]: !prev[moduleTitle]
        }));
    };

    return (
        <div className="relative">
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Course Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Course Image */}
                    <div className="w-full md:w-1/3">
                        <img
                            src={course?.image}
                            alt={course?.title}
                            className="rounded-xl object-cover w-full"
                        />
                    </div>
                    
                    {/* Course Info */}
                    <div className="w-full md:w-2/3">
                        <h1 className="text-2xl font-bold mb-4">{course?.title}</h1>
                        <div className="space-y-2 mb-6">
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
                        <button className="bg-red-600 text-white px-5 py-3 rounded-lg font-medium text-sm">
                            Continue Learning
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-6 border-b px-6">
                {['overview', 'curriculum'].map((section) => (
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
            <div className="p-6">
                {activeSection === 'overview' && (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {defaultContent.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Benefits</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'curriculum' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                        <div className="space-y-4">
                            {defaultContent.modules.map((module, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg overflow-hidden"
                                >
                                    <button
                                        className="w-full px-6 py-4 flex justify-between items-center bg-gray-50"
                                        onClick={() => toggleModule(module.title)}
                                    >
                                        <span className="font-medium">{module.title}</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-gray-500">{module.duration}</span>
                                            {expandedModules[module.title] ? 
                                                <ChevronUp className="w-5 h-5" /> : 
                                                <ChevronDown className="w-5 h-5" />
                                            }
                                        </div>
                                    </button>
                                    {expandedModules[module.title] && (
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
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseCard;