import { Play, Clock, Copy, Share, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  title: string;
  duration: string;
  progress: number;
  image: string;
  color: string;
}

// Certificate Modal Component
const CertificateModal = ({
  isOpen,
  onClose,
  courseTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    console.log("Downloading certificate...");
  };

  const handleShare = () => {
    console.log("Sharing certificate...");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Course Certificate</h2>

        <div className="bg-white rounded-lg mb-6">
          <img
            src="/Webdev-Course-Certificate.png"
            alt="Course Certificate"
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleDownload}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-lg transition-colors"
          >
            Download Certificate
          </button>

          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Share className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  duration,
  progress,
  image,
  color,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleCertificateClaim = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border">
        <div className={`relative h-40 ${color}`}>
          <img
            src="/CradImage.png"
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
          <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
            <Clock className="w-4 h-4" /> {duration}
          </p>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/course-purchase-preview/${generateSlug(title)}`}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm"
            >
              <Play size={14} /> View Course
            </Link>
            {progress === 100 && (
              <button
                onClick={handleCertificateClaim}
                className="flex-1 bg-blue-100 text-blue-700 py-1.5 text-sm rounded-lg hover:bg-blue-200"
              >
                Claim Certificate
              </button>
            )}
          </div>
        </div>
      </div>

      <CertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseTitle={title}
      />
    </>
  );
};
