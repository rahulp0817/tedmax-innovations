'use client';
import React from 'react';
import { ArrowLeft, Play, Users, Clock, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import courses from '@/app/(public)/courses/data';

const CoursePurchasePage = ({ courseId }: { courseId: string }) => {
    const router = useRouter();
    const course = courses.find(c => c.id.toString() === courseId);

    if (!course) {
        return <div>Course not found</div>;
    }

    const handleBack = () => {
        router.push('/dashboard'); // Navigate back to dashboard
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Back Button */}
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
            >
                <ArrowLeft size={20} />
                <span>Back to Courses</span>
            </button>

            {/* Rest of your component remains the same */}
            {/* ... */}
        </div>
    );
};

export default CoursePurchasePage;
