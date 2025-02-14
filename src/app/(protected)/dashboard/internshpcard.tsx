import React from 'react';
import { useRouter } from 'next/navigation'; // Import router for navigation

const InternshipCard = ({ title, image, progress, duration }) => {
  const router = useRouter(); // Initialize router
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleViewCourse = () => {
    // Generate a URL-friendly course ID
    const courseId = title.toLowerCase().replace(/ /g, "-");
    router.push(`/mycoursecontent/${courseId}`); // Navigate to dynamic route
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="relative">
        <div className="aspect-[1.6/1] bg-gradient-to-br relative">
          {/* Background Image */}
          <img 
            src="/Images.jpg" 
            alt={title}
            className="w-full h-full object-cover absolute inset-0"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />

          {/* Progress circle */}
          <div className="absolute bottom-4 right-4">
            <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 absolute transform rotate-[-90deg]">
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke={progress === 100 ? "#C1272D" : "#C1272D"}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                    transition: 'stroke-dashoffset 0.5s ease'
                  }}
                />
              </svg>
              <span className="text-sm font-medium z-10">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="text-sm text-gray-600 mb-4">
          <span>Video · {duration}</span>
        </div>
        
        <div className={`flex gap-2 ${progress === 100 ? 'flex-row' : 'flex-col'}`}>
          <button 
            onClick={handleViewCourse} // Navigate dynamically
            className={`${
              progress === 100 ? 'flex-1' : 'w-full'
            } bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium`}
          >
            View Internship
          </button>
          
          {progress === 100 && (
            <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors font-medium">
              Claim Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
