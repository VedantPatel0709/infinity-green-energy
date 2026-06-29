'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export default function InsightsPage() {
  // JSON-LD Structured Data Schema for Search Engines (SEO Optimization)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Infinity Green Energy Insights',
    'description': 'Industrial clean energy procurement articles, regulations briefs, and energy optimization reports.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Infinity Green Energy',
      'logo': 'https://infinitygreenenergy.com/logo.png'
    },
    'blogPost': []
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen font-sans">
      {/* Injecting Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            <BookOpen className="w-3.5 h-3.5 inline mr-1" /> Knowledge Hub & Advisory
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark mt-4 mb-6 uppercase tracking-tight">
            RENEWABLE ENERGY INSIGHTS
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Market briefs, legislative analyses, and practical guides detailing industrial energy procurement and optimization.
          </p>
        </div>

        {/* Empty State */}
        <div className="py-12">
          <EmptyState 
            title="Awaiting Backend Integration"
            subtitle="No Records Available"
            badgeText="Coming Soon"
            description="Our energy analysts are auditing current policy guidelines. Verified articles and market reports will appear here after publication."
          />
        </div>

      </div>
    </div>
  );
}
