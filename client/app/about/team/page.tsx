import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Consulting Advisory Team | Infinity Green Energy',
  description: 'Meet the executive advisors, open access consultants, and energy regulatory compliance experts at Infinity Green Energy.',
  alternates: {
    canonical: 'https://infinitygreenenergy.in/about/team',
  },
};

export default function TeamPage() {
  const departments = [
    {
      title: 'Leadership & Strategy',
      description: 'Guiding enterprise renewable transition and advisory frameworks.',
      count: 3,
    },
    {
      title: 'Renewable Energy Consultants',
      description: 'Load profiling, spot tariff optimization, and PPA structuring specialists.',
      count: 4,
    },
    {
      title: 'Grid Operations & Logistics',
      description: 'Managing cross-subsidy audits, transmission wheeling, and grid approvals.',
      count: 3,
    },
    {
      title: 'Business Development & Accounts',
      description: 'Structuring off-taker matching registries and corporate solar/wind sourcing plans.',
      count: 3,
    },
  ];

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
            Infinity Green maintains an in-house network of grid advisors, electrical engineers, and regulatory legal partners. Detailed professional bios are undergoing validation.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="space-y-16">
          {departments.map((dept, dIdx) => (
            <div key={dIdx} className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-lg md:text-2xl font-black font-heading text-dark uppercase tracking-tight">
                  {dept.title}
                </h2>
                <p className="text-slate-500 text-xs mt-1">{dept.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: dept.count }).map((_, cIdx) => (
                  <div 
                    key={cIdx} 
                    className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-md transition-all flex flex-col justify-between h-48 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -z-0 group-hover:bg-primary/5 transition-colors" />
                    
                    <div className="space-y-4 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-heading font-black text-slate-400 text-sm uppercase tracking-wider">
                          Profile To Be Added
                        </h4>
                        <p className="text-[10px] text-slate-400 font-sans">Verification in Progress</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[9px] uppercase tracking-wider font-bold text-slate-400">
                      <span>Ref Code: IG-{(dIdx + 1) * 10 + cIdx}</span>
                      <span className="text-primary bg-primary/5 px-2 py-0.5 rounded">Advisory Node</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
