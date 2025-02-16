'use client';
import React, { useState, useEffect } from 'react';
import { Search, Users, Clock } from 'lucide-react';
import courses from '@/app/(public)/courses/data';
import { useSearch } from '../contexts/SearchContext';
import { useRouter, useSearchParams } from 'next/navigation';

const ExploreCoursesContent = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const { searchQuery, setSearchQuery } = useSearch();
    const searchParams = useSearchParams();

// In ExploreCoursesContent.tsx
const handleCourseClick = (courseId: number) => {
    router.push(`/dashboard/course/${courseId}`);
};


    // Sync with URL parameters on mount and when URL changes
    useEffect(() => {
        const search = searchParams.get('search');
        if (search) {
            setSearchQuery(search);
        }
    }, [searchParams, setSearchQuery]);


    // Price ranges with radio details
    const priceRanges = [
        { id: 'all', name: 'All', label: 'All' },
        { id: '499', name: '₹499.00', label: '₹499.00' },
        { id: '1999', name: '₹1999.00', label: '₹1999.00' },
        { id: '2499', name: '₹2499.00', label: '₹2499.00' },
    ];

    const categories = [
        { id: 'all', name: 'All Programs', count: 25 },
        { id: 'popular', name: 'Popular Programs', count: 10 },
        { id: 'cs', name: 'Computer Science & Technology', count: 8 },
        { id: 'ee', name: 'Electrical & Electronics Engineering', count: 5 },
        { id: 'me', name: 'Mechanical & Manufacturing Engineering', count: 5 },
        { id: 'business', name: 'Business & Commerce', count: 7 },
    ];

    const levels = [
        { id: 'all', name: 'All Levels' },
        { id: 'basic', name: 'Beginner' },
        { id: 'advanced', name: 'Advanced' }
    ];

    const filteredCourses = courses.filter(course => {
        const matchesCategory = selectedCategory === 'all' || course.category.includes(selectedCategory);
        const matchesLevel = selectedLevel === 'all' || course.difficulty === selectedLevel;
        const matchesPrice = selectedPrice === 'all' || course.price === selectedPrice;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesLevel && matchesPrice && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Explore Courses</h1>
                {/* <div className="relative">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                </div> */}
            </div>

            <div className="flex gap-6">
                {/* Filter Panel */}
                <div className="w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Filter</h3>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSelectedLevel('all');
                                    setSelectedPrice('all');
                                }}
                                className="text-red-500 text-sm"
                            >
                                Clear
                            </button>
                        </div>

                        {/* Price Details */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium mb-3">Price Details</h4>
                            <div className="space-y-2">
                                {priceRanges.map((price) => (
                                    <label key={price.id} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="price"
                                            value={price.id}
                                            checked={selectedPrice === price.id}
                                            onChange={(e) => setSelectedPrice(e.target.value)}
                                            className="form-radio text-red-500 focus:ring-red-500"
                                        />
                                        <span className="text-sm text-gray-600">{price.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium mb-3">Categories</h4>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category.id}
                                            checked={selectedCategory === category.id}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="form-radio text-red-500 focus:ring-red-500"
                                        />
                                        <span className="text-sm text-gray-600 flex-1">{category.name}</span>
                                        <span className="text-sm text-gray-400">({category.count})</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Level */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium mb-3">Level</h4>
                            <div className="space-y-2">
                                {levels.map((level) => (
                                    <label key={level.id} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="level"
                                            value={level.id}
                                            checked={selectedLevel === level.id}
                                            onChange={(e) => setSelectedLevel(e.target.value)}
                                            className="form-radio text-red-500 focus:ring-red-500"
                                        />
                                        <span className="text-sm text-gray-600">{level.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Cards Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                                onClick={() => handleCourseClick(course.id)}
                            >
                                <div className="relative h-48">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover opacity-90"
                                        />
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-black/30 backdrop-blur-sm rounded-full">
                                            {course.difficulty}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <span className="inline-block px-2 py-1 text-sm font-medium text-white bg-black/30 backdrop-blur-sm rounded-full">
                                            ₹{course.price}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 h-16">
                                        {course.title}
                                    </h3>

                                    <div className="flex items-center gap-6 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span className="text-sm">2,345 learners</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">{course.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreCoursesContent;