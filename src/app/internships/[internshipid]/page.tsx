"use client";
import React from "react";
import { usePathname } from "next/navigation";
import InternshipDetails from "@/app/internship-description/internship-details";
import { internships } from "@/app/internships/data";

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
};

const Page = () => {
  const pathname = usePathname();
  
  // Extract internshipId from the URL
  const internshipSlug = pathname.split("/").pop();
  console.log("URL Slug:", internshipSlug);

  // Find the matching internship
  const selectedInternship = internships.find(
    (internship) => generateSlug(internship.title) === internshipSlug
  );

  // Debugging: Log all internships to compare slugs
  internships.forEach((internship) => {
    console.log("Expected Slug:", generateSlug(internship.title), " Title:", internship.title);
  });

  if (!selectedInternship) {
    return <div className="p-8 text-center">❌ Internship Not Found. Check console logs for details.</div>;
  }

  return <InternshipDetails internship={selectedInternship} />;
};

export default Page;
