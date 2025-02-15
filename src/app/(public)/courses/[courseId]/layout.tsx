import React from 'react';

interface Props {
  children: React.ReactNode;
}

const CourseLayout = (props: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="wrapper w-full">{props.children}</div>
    </div>
  );
};

export default CourseLayout;
