'use client';
import { notFound } from 'next/navigation';
import CoursePurchasePage from '../CoursePurchasePage';
import courses from '@/app/(public)/courses/data';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
    const course = courses.find(c => 
        c.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-') === params.slug
    );

    if (!course) {
        return notFound();
    }

    return <CoursePurchasePage course={course} />;
}