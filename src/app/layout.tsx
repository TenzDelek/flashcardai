import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flashcard SaaS",
  description: "FlashCard Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <div>
        <Navbar/>
        {children}
        </div>
        <Analytics />
       </body>
    </html>
    </ClerkProvider>
  );
}
