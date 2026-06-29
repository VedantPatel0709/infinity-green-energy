'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export default function KnowledgeCenterPage() {
  return (
    <div className="bg-light min-h-screen text-dark font-sans py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase">
            <BookOpen className="w-3.5 h-3.5" /> Education Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark tracking-tight uppercase leading-none">
            Knowledge Center
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-sans max-w-xl mx-auto">
            Deep resources, regulatory updates, and technical analyses.
          </p>
        </section>

        {/* Empty State */}
        <div className="py-12">
          <EmptyState 
            title="Awaiting Backend Integration"
            subtitle="No Records Available"
            badgeText="Awaiting Backend Integration"
            description="Educational resources and industry insights will appear here after publication."
          />
        </div>

        {/* Tools Redirect Banner */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-xl font-bold font-heading text-dark uppercase">Estimate your carbon offset and cost savings</h3>
          <p className="text-slate-500 text-xs font-sans max-w-lg mx-auto">
            Use our interactive energy calculator to get solar potential estimates, open access feasibility, and projected cash flow sheets.
          </p>
          <div>
            <Link href="/calculator" className="btn-primary inline-flex text-xs py-2.5 px-8">
              Start Energy Assessment
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
