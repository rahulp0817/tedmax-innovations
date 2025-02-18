
'use client';
import React from 'react';
import { ArrowLeft, Play, Users, Clock, Award, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import courses from '@/app/(public)/courses/data';

const CoursePurchasePage = ({ courseId }: { courseId: string }) => {
    const router = useRouter();
    const course = courses.find(c => c.id.toString() === courseId);

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Back Button */}
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
                    {/* Video Player Section at the top with increased border radius */}
                    <div className="relative aspect-video mb-8 rounded-3xl overflow-hidden">
                        <img
                            src="/videoImage.png"
                            alt="Course Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            {/* Play Button */}
                            <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <Play size={32} className="text-gray-900 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Course Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>

                    {/* Course Creator */}
                    <p className="text-gray-600 mb-4">by Kitani Studio</p>

                    {/* Course Description */}
                    <p className="text-gray-600 mb-6">
                        Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces.
                        Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.
                    </p>

                    {/* Course Stats */}
                    <div className="flex gap-6 mb-8">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-600">2,345 learners</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-600">{course.duration}</span>
                        </div>
                    </div>

                    {/* Course Details Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cybersecurity</h2>
                        <p className="text-gray-600">
                            Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces.
                            Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.
                        </p>
                    </div>
                </div>

                {/* Right Column with Payment and Certificate */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Purchase Card */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        {/* Price Display */}
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-gray-900">INR ₹{course.price}</span>
                            <span className="text-gray-500 line-through ml-2">₹3200</span>
                        </div>

                        {/* Buy Button */}
                        <button className="w-full bg-yellow-400 text-white py-3 rounded-full font-medium hover:bg-yellow-500 transition-colors mb-4">
                            Buy
                        </button>

                        {/* Share Button */}
                        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <Share2 size={16} />
                            <span>Share</span>
                        </button>

                        {/* Course Stats */}
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">22 Sections</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">152 Lectures</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">21h 33m Total length</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">English</span>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Preview with centered button and blurred background */}
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

