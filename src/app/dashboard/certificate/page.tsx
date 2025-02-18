// app/dashboard/certificate/page.tsx
"use client";
import React from 'react';
import { Copy, Share } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function CertificatePage() {
    const searchParams = useSearchParams();
    const courseTitle = searchParams.get('course') || "Web Development Course";

    const handleDownload = () => {
        // Add download logic here
        console.log('Downloading certificate...');
    };

    const handleShare = () => {
        // Add share logic here
        console.log('Sharing certificate...');
    };

    const handleCopyLink = () => {
        // Add copy link logic here
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            {/* Certificate Container */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <img
                    src="/Webdev-Course-Certificate.png"
                    alt="Course Certificate"
                    className="w-full h-auto rounded-lg"
                />
            </div>

            {/* Action Buttons Container */}
            <div className="flex flex-col gap-4 items-center max-w-md mx-auto">
                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    className="w-full py-4 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-lg font-medium text-lg transition-colors shadow-sm"
                >
                    Download Certificate
                </button>

                {/* Share and Copy Link Container */}
                <div className="flex w-full gap-4">
                    {/* Share Button */}
                    <button
                        onClick={handleShare}
                        className="flex-1 py-4 bg-[#3B5998] hover:bg-[#344e86] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                        <Share className="w-5 h-5" />
                        Share
                    </button>

                    {/* Copy Link Button */}
                    <button
                        onClick={handleCopyLink}
                        className="flex-1 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                        <Copy className="w-5 h-5" />
                        Copy link
                    </button>
                </div>
            </div>
        </div>
    );
}

// Optional: Create a DownloadButton component for better organization
const DownloadButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="w-full py-4 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-lg font-medium text-lg transition-colors shadow-sm"
    >
        Download Certificate
    </button>
);

// Optional: Create a ShareButton component
const ShareButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="flex-1 py-4 bg-[#3B5998] hover:bg-[#344e86] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
    >
        <Share className="w-5 h-5" />
        Share
    </button>
);

// Optional: Create a CopyLinkButton component
const CopyLinkButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="flex-1 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
    >
        <Copy className="w-5 h-5" />
        Copy link
    </button>
);