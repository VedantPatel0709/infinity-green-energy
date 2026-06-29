import React from 'react';
import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';

export const metadata: Metadata = {
  title: 'Industrial Energy Case Studies | Infinity Green Energy',
  description: 'Explore industrial renewable energy procurement case studies across textiles, manufacturing, chemicals, pharma, and engineering.',
  alternates: {
    canonical: 'https://infinitygreenenergy.in/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-light min-h-screen text-dark font-sans py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase">
            Proven Feasibility
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark uppercase tracking-tight leading-tight">
            Industrial Case Studies
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Review structured energy procurement profiles across high-consumption sectors.
          </p>
        </div>

        {/* Empty State */}
        <div className="py-12">
          <EmptyState 
            title="Case Studies Coming Soon"
            subtitle="No Records Available"
            badgeText="Awaiting Backend Integration"
            description="Verified case study records and real client load optimization datasets will appear here after backend synchronization."
          />
        </div>

      </div>
    </div>
  );
}
