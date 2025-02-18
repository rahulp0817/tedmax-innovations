// app/dashboard/components/CourseCard.tsx
import { Play, Clock } from "lucide-react";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  title: string;
  duration: string;
  progress: number;
  image: string;
  color: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  duration,
  progress,
  image,
  color,
}) => {
  const router = useRouter();

  const handleCertificateClaim = () => {
    router.push(`/dashboard/certificate?course=${encodeURIComponent(title)}`);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border ">
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
        <p className="text-gray-500 text-sm mt-2 flex items-center gap-2"><Clock className="w-4 h-4" /> {duration}</p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/explore-courses/${generateSlug(title)}`}
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
  );
}
