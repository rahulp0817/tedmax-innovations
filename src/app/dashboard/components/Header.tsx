'use client';
import { Menu, Headphones, Search } from 'lucide-react';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { useSearch } from '../contexts/SearchContext';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import courses from '@/app/(public)/courses/data';
import { useRouter } from 'next/navigation';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const router = useRouter();
    const { searchQuery, setSearchQuery, setActiveTab } = useSearch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState<typeof courses>([]);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const handleCourseSelect = (course: typeof courses[0]) => {
        router.push(`/dashboard/course/${course.id}`);
        setShowDropdown(false);
    };

    const getTopCourses = () => {
        return courses
            .sort((a, b) => (b.learners || 0) - (a.learners || 0))
            .slice(0, 5);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);

        if (!value.trim()) {
            setFilteredCourses(getTopCourses());
            return;
        }

        const filtered = courses
            .filter(course =>
                course.title.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 5);

        setFilteredCourses(filtered);

        // Switch to explore tab when searching
        if (value && setActiveTab) {
            setActiveTab('explore');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 pr-8">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg">
                    <Menu size={24} />
                </button>
                <Link href="/" className="flex items-center space-x-2">
                    <img src="/logo.svg" alt="TEDMAX" className="h-8 w-8" />
                    <span className="font-bold text-xl">TEDMAX</span>
                </Link>
            </div>

            <div className="relative w-96" ref={searchContainerRef}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => {
                            setShowDropdown(true);
                            if (!searchQuery) {
                                setFilteredCourses(getTopCourses());
                            }
                        }}
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
                </div>

                <AnimatePresence>
                    {showDropdown && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                        >
                            {!searchQuery && (
                                <div className="px-4 py-2 text-sm text-gray-500 border-b">
                                    Top Courses
                                </div>
                            )}

                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleCourseSelect(course)}
                                    >
                                        <div className="text-sm text-gray-800">{course.title}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                    No courses found. Explore our other courses!
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-0">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Headphones size={24} />
                    </button>
                    <span className="font-medium">Help</span>
                </div>
                <ProfileDropdown />
            </div>
        </header>
    );
}