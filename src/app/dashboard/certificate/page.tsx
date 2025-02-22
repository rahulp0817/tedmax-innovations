import { Play, Clock, Copy, Share, X } from "lucide-react";
import React, { useState } from 'react';
import Link from 'next/link';

// Modal Component
const CertificateModal = ({ 
  isOpen, 
  onClose, 
  courseTitle 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  courseTitle: string;
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    console.log('Downloading certificate...');
  };

  const handleShare = () => {
    console.log('Sharing certificate...');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Course Certificate</h2>
        
        {/* Certificate Image */}
        <div className="bg-white rounded-lg mb-6">
          <img
            src="/Webdev-Course-Certificate.png"
            alt="Course Certificate"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-lg transition-colors"
          >
            Download Certificate
          </button>

          {/* Share and Copy Link Container */}
          <div className="flex gap-4">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Share className="w-5 h-5" />
              Share
            </button>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Copy className="w-5 h-5" />
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};