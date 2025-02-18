// app/dashboard/components/InternshipCard.tsx
import { Play, Calendar } from "lucide-react";

interface InternshipCardProps {
  title: string;
  duration: string;
  progress: number;
  image: string;
  color: string;
}

export default function InternshipCard({
  title,
  duration,
  progress,
  image,
  color,
}: InternshipCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`relative h-40 ${color}`}>
        <img
          src="/Image.png"
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
        <p className="text-gray-500 text-sm mt-2 flex items-center gap-2"><Calendar className="w-4 h-4"/> {duration}</p>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 text-sm">
            <Play size={14} /> View Internship
          </button>
          {progress === 100 && (
            <button className="flex-1 bg-blue-100 text-blue-700 py-2 text-sm rounded-lg hover:bg-blue-200">
              Claim Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
