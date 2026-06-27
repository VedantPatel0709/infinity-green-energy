import React from 'react';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast'; 
import { AuthProvider } from '@/src/context/AuthContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'Infinity Green Energy | Enterprise Renewable Energy Solutions',
  description: 'Accelerating industrial transition to green energy through open access power, energy exchange, and smart commercial solar solutions.',
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
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased bg-light text-dark-light selection:bg-primary/20`}>
        <AuthProvider>
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />

          {/* ✅ Toast Notifications */}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}