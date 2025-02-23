import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

export default async function PurchaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-20">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
