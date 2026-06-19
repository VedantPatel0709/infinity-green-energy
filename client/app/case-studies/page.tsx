import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Factory, Beaker, Pill, Scissors, Settings, Search, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Industrial Energy Case Studies | Infinity Green Energy',
  description: 'Explore industrial renewable energy procurement case studies across textiles, manufacturing, chemicals, pharma, and engineering.',
  alternatives: {
    canonical: 'https://infinitygreenenergy.in/case-studies',
  },
};

export default function CaseStudiesPage() {
  const industries = [
    {
      id: 'manufacturing',
      name: 'Heavy Manufacturing',
      icon: Factory,
      description: 'Continuous load profiling, heavy casting, and automated assembly operations.',
      badge: 'ISTS open access / onsite opex solar'
    },
    {
      id: 'chemicals',
      name: 'Chemicals & Process',
      icon: Beaker,
      description: 'Decarbonization pipelines for continuous processes, boilers, and reactors.',
      badge: 'Group captive wind-solar hybrid'
    },
    {
      id: 'pharma',
      name: 'Pharmaceuticals',
      icon: Pill,
      description: 'Sterile environment cooling, HVAC systems, and high-efficiency cleanrooms.',
      badge: 'Grid open access tariff relief'
    },
    {
      id: 'textiles',
      name: 'Textiles & Spinning',
      icon: Scissors,
      description: '24/7 spinning operations requiring steady-state peak load balancing.',
      badge: 'Captive wind wheeling coordination'
    },
    {
      id: 'engineering',
      name: 'Precision Engineering',
      icon: Settings,
      description: 'Multi-axis CNC milling, heat treatment, and precision machinery hubs.',
      badge: 'Flat-rate commercial power tariff'
    }
  ];

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
            Review structured energy procurement profiles across high-consumption sectors. Real client identifiers and validated load optimization metrics will be populated post audit.
          </p>
        </div>

        {/* Filter / Search UI Placeholder */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search by sector or technology..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary transition-colors cursor-not-allowed"
              disabled
            />
          </div>
          <div className="flex gap-2 flex-wrap text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 cursor-not-allowed">All Sectors</span>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 cursor-not-allowed">Solar PV</span>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 cursor-not-allowed">Wind Sourcing</span>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 cursor-not-allowed">ISTS / InSTS</span>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div 
                key={ind.id} 
                className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all flex flex-col justify-between h-[380px] group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full group-hover:bg-primary/5 transition-colors -z-0" />
                
                <div className="space-y-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded">
                      {ind.badge}
                    </span>
                    <h3 className="font-heading font-black text-dark text-lg uppercase tracking-tight leading-snug">
                      {ind.name} Sourcing Profile
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans">
                      {ind.description}
                    </p>
                  </div>
                </div>

                {/* Coming Soon Premium Alert */}
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex items-start gap-2.5 relative z-10">
                  <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-wide text-dark">Case Study Content Coming Soon</h4>
                    <p className="text-[9px] text-slate-400 font-sans leading-relaxed">
                      Subject to regulatory verification and client NDA clears.
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              'name': 'Renewable Sourcing Case Studies',
              'description': 'Case studies and structural profiles for open access procurement across various industries.',
              'url': 'https://infinitygreenenergy.in/case-studies'
            })
          }}
        />

      </div>
    </div>
  );
}
