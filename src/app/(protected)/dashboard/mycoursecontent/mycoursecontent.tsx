import React from 'react';
import { useRouter } from 'next/router';

const CourseContent = () => {
  const router = useRouter();
  const { courseId } = router.query; // Ensure dynamic route is captured

  if (!courseId) {
    return <p className="text-center mt-10 text-gray-600">Loading course content...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          {courseId.replace(/-/g, ' ').toUpperCase()} Content
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome to the {courseId.replace(/-/g, ' ')} learning module. 
        </p>

        {/* Sample Lesson List */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Lessons:</h2>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Introduction to {courseId.replace(/-/g, ' ')}</li>
            <li>Advanced Concepts</li>
            <li>Practical Implementation</li>
            <li>Final Project</li>
          </ul>
        </div>

        {/* Go Back Button */}
        <button 
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => router.push('/')}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
