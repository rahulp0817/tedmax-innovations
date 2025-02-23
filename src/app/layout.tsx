import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

// Initialize Lato from Google Fonts
const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lato",
});

// Initialize Glaser Stencil D as a local font
const glaserStencil = localFont({
  src: "./fonts/Glaser-Stencil-D-Regular.ttf",
  variable: "--font-glaser-stencil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tedmax",
  description: "Education platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${glaserStencil.variable}`}>
      <body className={`${lato.className}`}>
        <Providers>
          <NextTopLoader />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
