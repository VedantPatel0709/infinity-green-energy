import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export const metadata: Metadata = {
  title: 'Consulting Advisory Team | Infinity Green Energy',
  description: 'Meet the executive advisors, open access consultants, and energy regulatory compliance experts at Infinity Green Energy.',
  alternates: {
    canonical: 'https://infinitygreenenergy.in/about/team',
  },
};

export default function TeamPage() {
  return (
    <div className="bg-light min-h-screen text-dark font-sans py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumbs / Back Navigation */}
        <div className="flex items-center gap-2">
          <Link href="/about" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to About
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase">
            <Users className="w-3.5 h-3.5" /> Advisory Directory
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark uppercase tracking-tight leading-tight">
            Platform Team & Advisory
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Infinity Green maintains an in-house network of grid advisors, electrical engineers, and regulatory legal partners.
          </p>
        </div>

        {/* Empty State */}
        <div className="py-12">
          <EmptyState 
            title="Awaiting Backend Integration"
            subtitle="Team information will be published soon."
            badgeText="Coming Soon"
            description="Our organizational directory and specialist advisor list are currently being synchronized with our corporate records."
          />
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              'name': 'Advisory Team - Infinity Green Energy',
              'description': 'Meet the team and advisors driving industrial green energy procurement across India.',
              'publisher': {
                '@type': 'Organization',
                'name': 'Infinity Green Energy Pvt Ltd',
                'logo': {
                  '@type': 'ImageObject',
                  'url': 'https://infinitygreenenergy.in/logo.png'
                }
              }
            })
          }}
        />

      </div>
    </div>
  );
}
