import React from 'react';
import { useRouter } from 'next/router';
import CourseDetails from '../../components/CourseDetails'; // Assuming you have a CourseDetails component

const CoursePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Fetch course details based on the slug
  const course = {
    title: decodeURIComponent(slug),
    learners: "99.2k+",
    duration: "9 hrs of learning",
    price: "₹499",
    // Add other course details here
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CourseDetails course={course} />
    </div>
  );
};

export default CoursePage;