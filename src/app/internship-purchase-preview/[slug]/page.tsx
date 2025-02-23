"use client";
import InternshipsPreviewPage from "@/components/InternshipPreviewPage";
import { internships } from "@/app/(public)/internships/data";
import { notFound } from "next/navigation";

export default function internshipsPage({ params }: { params: { slug: string } }) {
  const course = internships.find(
    (c) => c.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-") === params.slug
  );

  if (!course) {
    return notFound();
  }

  //@ts-ignore
  return <InternshipsPreviewPage course={course} />;
}
