'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Landmark, Lightbulb, Info, Search } from 'lucide-react';

export default function KnowledgeCenterPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'reports' | 'regulatory' | 'insights'>('articles');

  const tabs = [
    { id: 'articles', label: 'Technical Articles', icon: BookOpen },
    { id: 'reports', label: 'Feasibility Reports', icon: FileText },
    { id: 'regulatory', label: 'Regulatory Updates', icon: Landmark },
    { id: 'insights', label: 'Industry Insights', icon: Lightbulb },
  ];

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
            Deep resources, regulatory updates, and technical analyses. Our central CMS dashboard synchronizes articles post audit.
          </p>
        </section>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-heading uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow' 
                    : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Mock Controls */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search resource library..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary transition-colors cursor-not-allowed"
              disabled
            />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            CMS Synchronization: Standby
          </span>
        </div>

        {/* Resource List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-md transition-all flex flex-col justify-between h-[280px] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full group-hover:bg-primary/5 transition-colors -z-0" />
              
              <div className="space-y-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <Info className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded">
                    Resource Placeholder
                  </span>
                  <h3 className="font-heading font-black text-dark text-base uppercase tracking-tight leading-snug">
                    Article Coming Soon
                  </h3>
                  <p className="text-slate-450 text-[11px] leading-relaxed font-sans">
                    Detailed publications regarding grid compliance modeling and spot tariffs are currently undergoing editorial check.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[9px] uppercase tracking-wider font-bold text-slate-400 flex items-center justify-between relative z-10">
                <span>Publish Code: KC-{idx + 10}</span>
                <span className="text-primary font-bold">CMS Syncing</span>
              </div>
            </div>
          ))}
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
