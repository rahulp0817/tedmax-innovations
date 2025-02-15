import React from "react";
import Navbar from "@/components/navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[6rem] flex h-[calc(100vh-36px-4rem)] max-h-full">
      <Navbar />
      {children}
    </div>
  );
}
