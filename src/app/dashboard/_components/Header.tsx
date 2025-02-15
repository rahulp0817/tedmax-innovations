'use client';
import { Menu, Search, Headphones } from 'lucide-react';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
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

            <div className="relative w-96">
                <input
                    type="text"
                    placeholder="Search courses"
                    className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
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