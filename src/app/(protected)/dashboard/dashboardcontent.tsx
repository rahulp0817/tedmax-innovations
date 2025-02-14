import React from 'react';
import CourseCard from './coursecard';
import InternshipCard from './internshpcard';
import SettingsContent from './settingscontent';
const DashboardContent = ({ activeView }) => {
  const courses = [
    {
      title: "MOBILE DEV REACT NATIVE",
      image: "/Images.jpg",
      progress: 58,
      duration: "4hrs 22min"
    },
    {
      title: "UI DESIGN FOR BEGINNERS",
      image: "/Images.jpg",
      progress: 22,
      duration: "4hrs 22min"
    },
    {
      title: "WEBSITE DEV ZERO TO HERO",
      image: "/Images.jpg",
      progress: 10,
      duration: "4hrs 22min"
    },
    {
      title: "VUE JAVASCRIPT COURSE",
      image: "/Images.jpg",
      progress: 100,
      duration: "4hrs 22min"
    }
  ];

  const internships = [
    {
      title: "Full Stack Developer",
      image: "/Images.jpg",
      progress: 10,
      duration: "100hrs 22min"
    },
    {
      title: "Data Science",
      image: "/Images.jpg",
      progress: 100,
      duration: "100hrs 22min"
    },
  ];
  const renderContent = () => {
    switch (activeView) {
      case 'courses':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.title}
                  image={course.image}
                  progress={course.progress}
                  duration={course.duration}
                />
              ))}
            </div>
          </>
        );
      case 'internship':
        return (
          <>
            <div>
              <h1 className="text-2xl font-bold mb-4">Internship Opportunities</h1>
              <p>Explore available internship positions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {internships.map((course, index) => (
                <InternshipCard
                  key={index}
                  title={course.title}
                  image={course.image}
                  progress={course.progress}
                  duration={course.duration}
                />
              ))}
            </div>
          </>
        );

      case 'settings':
        return <SettingsContent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardContent;
