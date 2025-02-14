import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Lato({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "TedMax-Learning Platform",
  description: "E-learning platform for students and teachers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
