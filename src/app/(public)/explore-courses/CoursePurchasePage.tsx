'use client';
import React from 'react';
import { ArrowLeft, Play, Users, Clock, Award, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Course } from '@/app/(public)/courses/data';

interface CoursePurchasePageProps {
    course: Course;
}

const CoursePurchasePage: React.FC<CoursePurchasePageProps> = ({ course }) => {
    const router = useRouter();

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
            >
                <ArrowLeft size={20} />
                <span>Back to Courses</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Content Column */}
                <div className="lg:col-span-2">
                    <div className="relative aspect-video mb-8 rounded-3xl overflow-hidden">
                        <img
                            src={course.image || "/videoImage.png"}
                            alt="Course Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <Play size={32} className="text-gray-900 ml-1" />
                            </button>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                    {/* <p className="text-gray-600 mb-4">by {course.instructor}</p> */}
                    <p className="text-gray-600 mb-6">{course.description}</p>

                    <div className="flex gap-6 mb-8">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-600">{course.learnerCount} learners</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-600">{course.duration}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-gray-900">INR {course.price}</span>
                            <span className="text-gray-500 line-through ml-2">₹3200</span>
                        </div>

                        <button className="w-full bg-yellow-400 text-white py-3 rounded-full font-medium hover:bg-yellow-500 transition-colors mb-4">
                            Buy
                        </button>

                        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <Share2 size={16} />
                            <span>Share</span>
                        </button>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">{course.totalSections} Sections</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">{course.totalLectures} Lectures</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">{course.duration} Total length</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">{course.language}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="relative">
                            <img
                                src="/Webdev-Course-Certificate.png"
                                alt="Certificate Preview"
                                className="w-full rounded-lg blur-sm"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="bg-white text-gray-900 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
                                    View Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePurchasePage;