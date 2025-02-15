import React from "react";
import Footer from "@/components/Footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="no-scrollbar h-full overflow-y-auto pb-20 pt-36">
      {children}
      <Footer />
    </main>
  );
};

export default MarketingLayout;
