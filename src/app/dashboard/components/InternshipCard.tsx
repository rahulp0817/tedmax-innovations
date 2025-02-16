'use client';
import React, { useState } from 'react';
import { Play, Users, Clock, Star, Building, CheckCircle, ChevronDown, ChevronUp, X, Calendar, GraduationCap } from 'lucide-react';

interface InternshipCardProps {
    id: string;
    title: string;
    duration: string;
    progress: number;
    image: string;
    color: string;
    company?: string;
    startDate?: string;
    stipend?: string;
}

// InternshipCard Component
export function InternshipCard({ id, title, duration, progress, image, color, company, startDate, stipend }: InternshipCardProps) {
    const [showDetails, setShowDetails] = useState(false);

    const handleViewInternship = () => {
        setShowDetails(true);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`relative h-40 ${color}`}>
                    <img
                        src={image || "/Image.png"}
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
                    <p className="text-gray-500 text-sm mt-1">Duration: {duration}</p>
                    <div className="mt-3 flex gap-2">
                        <button 
                            onClick={handleViewInternship}
                            className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 text-sm"
                        >
                            <Play size={14} /> View Internship
                        </button>
                        {progress === 100 && (
                            <button className="flex-1 bg-blue-100 text-blue-700 py-1.5 text-sm rounded-lg hover:bg-blue-200">
                                Claim Certificate
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Internship Details Modal */}
            {showDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
                        <InternshipDetails 
                            internship={{
                                id,
                                title,
                                duration,
                                company: company || "Tech Corp",
                                startDate: startDate || "Flexible Start Date",
                                stipend: stipend || "₹10,000/month",
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

// InternshipDetails Component
function InternshipDetails({ internship, onClose }) {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedModules, setExpandedModules] = useState({});

    const defaultContent = {
        description: `Join us for an exciting internship opportunity in ${internship?.title}. This program is designed to provide hands-on experience in a real-world setting, working with industry experts on meaningful projects.`,
        modules: [
            {
                title: "Week 1-2: Orientation & Basics",
                duration: "2 weeks",
                topics: ["Company Introduction", "Project Overview", "Tool Setup", "Basic Training"]
            },
            {
                title: "Week 3-6: Core Project Work",
                duration: "4 weeks",
                topics: ["Project Implementation", "Weekly Reviews", "Skill Development", "Mentorship Sessions"]
            },
            {
                title: "Week 7-8: Final Phase",
                duration: "2 weeks",
                topics: ["Project Completion", "Documentation", "Final Presentation", "Performance Review"]
            }
        ]
    };

    const benefits = [
        "Hands-on industry experience",
        "Professional mentorship",
        "Project portfolio building",
        "Performance-based PPO opportunity",
        "Certificate of completion",
        "Networking opportunities"
    ];

    const requirements = [
        "Strong foundation in relevant field",
        "Good communication skills",
        "Ability to work in teams",
        "Basic technical knowledge",
        "Dedication to learning"
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
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Internship Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Internship Image */}
                    <div className="w-full md:w-1/3">
                        <img
                            src={internship?.image}
                            alt={internship?.title}
                            className="rounded-xl object-cover w-full"
                        />
                    </div>
                    
                    {/* Internship Info */}
                    <div className="w-full md:w-2/3">
                        <h1 className="text-2xl font-bold mb-4">{internship?.title}</h1>
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2">
                                <Building className="w-5 h-5" />
                                <span>{internship?.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{internship?.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{internship?.startDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-5 h-5" />
                                <span>{internship?.stipend}</span>
                            </div>
                        </div>
                        <button className="bg-red-600 text-white px-5 py-3 rounded-lg font-medium text-sm">
                            Continue Program
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-6 border-b px-6">
                {['overview', 'schedule', 'requirements'].map((section) => (
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
                            <h2 className="text-2xl font-bold mb-4">Internship Overview</h2>
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

                {activeSection === 'schedule' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Program Schedule</h2>
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

                {activeSection === 'requirements' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                        <div className="space-y-4">
                            {requirements.map((requirement, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle className="w-5 h-5 text-blue-500" />
                                    <span className="text-gray-700">{requirement}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InternshipCard;