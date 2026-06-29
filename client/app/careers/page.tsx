import React from 'react';
import type { Metadata } from 'next';
import { Briefcase, Award, Heart, ArrowUpRight } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export const metadata: Metadata = {
  title: 'Careers & Work Culture | Infinity Green Energy',
  description: 'Join the engineering, regulatory advisory, and B2B marketplace matchmaking team at Infinity Green Energy.',
  alternates: {
    canonical: 'https://infinitygreenenergy.in/careers',
  },
};

export default function CareersPage() {
  const pillars = [
    {
      title: 'Why Join Us',
      icon: Award,
      desc: 'Work on cutting-edge open access wheeling modeling. We operate at the intersection of energy grid technology, carbon policy, and corporate finance.'
    },
    {
      title: 'Work Culture',
      icon: Heart,
      desc: 'Collaborative, transparent, and regulatory-focused. We value data integrity, continuous learning of grid codes, and objective advisory frameworks.'
    },
    {
      title: 'Growth Opportunities',
      icon: ArrowUpRight,
      desc: 'As India transitions 50% of energy capacity to renewables, develop deep expertise in PPA structuring, power banking mechanisms, and grid telemetry systems.'
    }
  ];

  return (
    <div className="bg-light min-h-screen text-dark font-sans py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5" /> Join the Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark uppercase tracking-tight leading-tight">
            Careers at Infinity Green
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Help corporate India decarbonize their factory footprint while securing grid cost tariff relief. We are building the transaction registry for green open access.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-black text-dark text-base uppercase tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Openings Section */}
        <div className="space-y-8 pt-8 border-t border-slate-200">
          <div className="space-y-2">
            <h2 className="text-xl md:text-3xl font-black font-heading text-dark uppercase tracking-tight">
              Current Openings
            </h2>
            <p className="text-slate-500 text-xs">Explore career paths across regulatory, engineering, and product roles.</p>
          </div>

          {/* Empty State */}
          <div className="py-12">
            <EmptyState 
              title="Awaiting Backend Integration"
              subtitle="Career opportunities will be published after backend integration."
              badgeText="Coming Soon"
              description="Live job profiles and portal application nodes will populate once our HR database integration is completed."
            />
          </div>
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              'name': 'Careers - Infinity Green Energy',
              'description': 'Explore careers and job listings at Infinity Green Energy.',
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
