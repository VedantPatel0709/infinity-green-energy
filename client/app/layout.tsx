import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Infinity Green Energy Pvt Ltd',
  description: 'Sustainable solar energy solutions for a greener future.',
};

/**
 * Root Layout - Wraps all pages with Navbar, Footer, and Toast UI
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />

        {/* ✅ Toast Notifications */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}