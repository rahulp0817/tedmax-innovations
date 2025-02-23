"use client";
import CoursePreviewPage from "../_components/coursePreviewPage";
import courses from "@/app/(public)/courses/data";
import { notFound } from 'next/navigation';

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courses.find(c => 
      c.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-') === params.slug
  );

  if (!course) {
      return notFound();
  }
  //@ts-ignore
  return <CoursePreviewPage course={course} />;
}