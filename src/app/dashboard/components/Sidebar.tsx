// app/dashboard/components/Sidebar.tsx
'use client';
import { Home, BookOpen, Settings, LogOut, Compass } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoutModal from './LogoutModal';

interface SidebarProps {
    isOpen: boolean;
    onTabChange: (tab: 'courses' | 'internship' | 'settings') => void;
    activeTab: 'courses' | 'internship' | 'settings';
}

export default function Sidebar({ isOpen, onTabChange, activeTab }: SidebarProps) {
    const pathname = usePathname();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const menuItems = [
        { icon: <Home size={20} />, label: 'My Courses', href: '/dashboard', tab: 'courses' },
        { icon: <BookOpen size={20} />, label: 'Internship', href: '/dashboard/internship', tab: 'internship' },
        { icon: <Compass size={20} />, label: 'Explore Courses', href: '/dashboard/explore', tab: 'explore' },
    ];
    
    const bottomMenuItems = [
        { icon: <Settings size={20} />, label: 'Settings', href: '/dashboard/settings', tab: 'settings' },
        { icon: <LogOut size={20} />, label: 'Logout', href: '#', tab: 'logout' },
    ];

    const isActive = (href: string) => {
        if (href === '/dashboard' && pathname === '/dashboard') {
            return true;
        }
        return pathname.startsWith(href) && href !== '/dashboard';
    };

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const handleCloseLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    return (
        <aside className={`bg-white h-full shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className="flex flex-col h-full justify-between py-4">
                <div>
                    <nav>
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => onTabChange(item.tab as 'courses' | 'internship')}
                                className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 cursor-pointer ${
                                    activeTab === item.tab ? 'bg-gray-100' : ''
                                }`}
                            >
                                <div className={`flex ${isOpen ? '' : 'justify-center w-full'}`}>
                                    {item.icon}
                                </div>
                                {isOpen && <span className="ml-4">{item.label}</span>}
                            </div>
                        ))}
                    </nav>
                </div>
                
                <div>
                    <nav>
                        {bottomMenuItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    if (item.tab === 'logout') {
                                        handleLogoutClick();
                                    } else {
                                        onTabChange(item.tab as 'settings');
                                    }
                                }}
                                className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 cursor-pointer ${
                                    activeTab === item.tab ? 'bg-gray-100' : ''
                                }`}
                            >
                                <div className={`flex ${isOpen ? '' : 'justify-center w-full'}`}>
                                    {item.icon}
                                </div>
                                {isOpen && <span className="ml-4">{item.label}</span>}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Logout Modal */}
            <LogoutModal isOpen={isLogoutModalOpen} onClose={handleCloseLogoutModal} />
        </aside>
    );
}