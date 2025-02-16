'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import CourseDetails from '@/components/course-details';
import courses from "@/app/(public)/courses/data"
function Page() {
  const params = useParams();
  const courseId = parseInt(params.courseId);

  
  const courseSlug = params.courseId; // This will now be the URL-friendly course title

  // Function to generate URL-friendly slugs (same as in CourseExplorer)
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
  };

  // Find the selected course based on the URL parameter
  const selectedCourse = courses.find(
    course => generateSlug(course.title) === courseSlug
  );

  if (!selectedCourse) {
    return <div className="p-8 text-center">Course not found</div>;
  }

  return (
    <div>
      <CourseDetails course={selectedCourse} />
    </div>
  );
}

export default Page;