import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site-config";
import NextTopLoader from "nextjs-toploader";

const inter = Lato({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = siteConfig;

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
