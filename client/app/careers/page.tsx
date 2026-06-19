import React from 'react';
import type { Metadata } from 'next';
import { Briefcase, Heart, Award, ArrowUpRight, Search, Clock, MapPin } from 'lucide-react';

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

          {/* Job Search Mock Controls */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                placeholder="Search job titles..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary transition-colors cursor-not-allowed"
                disabled
              />
            </div>
            <div className="flex gap-2 flex-wrap text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 cursor-not-allowed">All Departments</span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 cursor-not-allowed">Grid Operations</span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 cursor-not-allowed">Advisory</span>
            </div>
          </div>

          {/* Empty State List */}
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
            <div className="max-w-md mx-auto space-y-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                <Briefcase className="w-6 h-6 text-slate-300" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-black text-dark text-xs uppercase tracking-wider">
                  No positions available currently
                </h4>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                  We are not actively hiring. Follow our LinkedIn channel to receive alerts when hiring portals for open-access analysts and grid developers reopen.
                </p>
              </div>
            </div>
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
              'description': 'Work culture and career opportunities at Infinity Green Energy.',
              'url': 'https://infinitygreenenergy.in/careers'
            })
          }}
        />

      </div>
    </div>
  );
}
