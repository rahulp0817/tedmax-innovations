import Navbar from "@/components/navbar";
import React from "react";

export default async function AdminLayout({
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
