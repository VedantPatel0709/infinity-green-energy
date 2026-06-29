'use client';
import React, { useState, useEffect } from 'react';
import { User, Users, Award, Milestone, Lightbulb, Compass, ShieldCheck, LineChart, TrendingUp, Network } from 'lucide-react';
import { Metadata } from 'next';
import { COMPANY_INFO } from '@/utils/company';

export default function AboutPage() {
  const [cms, setCms] = useState({
    companyStory: 'Founded with a vision to revolutionize B2B energy supply in India, Infinity Green Energy bridges the gap between bulk industrial consumers and independent green developers. Our journey started when we realized factories spend up to 40% of their operational expenses on energy tariffs without any transparent purchasing pathways.',
    mission: 'To strip away grid complexity and regulatory friction, allowing heavy Indian industries to transition to clean energy while improving operational profit margins and locking in tariff predictability.',
    whyExistsBody: 'Heavy industries in India pay some of the highest grid tariffs globally. Default DISCOM networks are often inefficient, while navigating complex open access rules, group captive models, and grid synchronization compliance creates massive operational friction for factories. Infinity Green exists to bridge this gap. We provide a transparent, neutral procurement marketplace where industrial consumers pool energy demand and source wheeled solar, wind, and hybrid power directly from vetted utility-scale developers.',
    companyStructure: 'Infinity Green Energy operates under a flat, agile organizational matrix designed to expedite regulatory analysis and engineering approvals. The organization is divided into three key pillars: 1. Regulatory Grid Advisory: Specialists in open-access grid code, state DISCOM rules, and PPA compliance; 2. Sourcing & Matchmaking Operations: Connecting developer nodes with consumer load profiles; 3. Long-Term Portfolio Desk: Auditing monthly wheeling invoices, grid compliance billing, and telemetry reports.'
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('about_cms');
      if (local) {
        try {
          setCms(JSON.parse(local));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const values = [
    {
      title: 'Transparency',
      desc: 'Line-by-line breakdown of all grid surcharges, CSS, and IPP bidding rates with zero hidden markups.',
      icon: <ShieldCheck className="w-5 h-5 text-primary" />
    },
    {
      title: 'Partnership',
      desc: 'Acting as your dedicated long-term energy advisory desk rather than a simple transactional vendor.',
      icon: <Users className="w-5 h-5 text-primary" />
    },
    {
      title: 'Innovation',
      desc: 'Developing state-of-the-art load profile algorithms to calculate wind-solar blend capacities.',
      icon: <Lightbulb className="w-5 h-5 text-primary" />
    },
    {
      title: 'Reliability',
      desc: 'Sourcing capacity only from grid-synchronized, credit-vetted utility developers (IPPs).',
      icon: <Milestone className="w-5 h-5 text-primary" />
    },
    {
      title: 'Sustainability',
      desc: 'Driving genuine carbon reductions to align manufacturing clients with global ESG standards.',
      icon: <Compass className="w-5 h-5 text-primary" />
    }
  ];

  return (
    <div className="bg-light text-dark font-sans py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Intro Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            Our Organization
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark uppercase tracking-tight">
            INFINITY GREEN ENERGY
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Infinity Green Energy is India’s premier industrial renewable energy procurement and energy optimization platform. We serve as a strategic partner connecting energy producers with bulk industrial consumers.
          </p>
        </section>

        {/* Company Story */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-dark">Our Story</h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
              {cms.companyStory}
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Milestone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black font-heading uppercase text-dark">Our Mission</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
              {cms.mission}
            </p>
          </div>
        </section>

        {/* Why Infinity Green Exists */}
        <section className="bg-slate-950 text-white p-8 md:p-16 rounded-3xl relative overflow-hidden border border-slate-900 shadow-xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="relative z-10 space-y-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-white">Why Infinity Green Exists</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {cms.whyExistsBody}
            </p>
          </div>
        </section>

        {/* Corporate Operations desk */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-slate-200/80 pt-16 items-start">
          <div className="md:col-span-5 space-y-4">
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Headquarters</span>
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-dark">Our Office</h2>
            <div className="w-12 h-1 bg-primary rounded" />
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm">
              Connect directly with our corporate advisory operations desk.
            </p>
          </div>
          <div className="md:col-span-7 space-y-6 text-xs md:text-sm text-slate-500">
            <div className="space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block">Office Address</span>
              <p className="font-semibold text-slate-800 leading-relaxed">
                {COMPANY_INFO.address.line1}<br />
                {COMPANY_INFO.address.line2}<br />
                {COMPANY_INFO.address.city}<br />
                {COMPANY_INFO.address.state}<br />
                {COMPANY_INFO.address.country}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block">Email</span>
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-primary font-semibold hover:underline">{COMPANY_INFO.email}</a>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block">Phone</span>
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-primary font-semibold hover:underline">{COMPANY_INFO.phone}</a>
              </div>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Our Guiding Pillars</span>
            <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tight text-dark">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {val.icon}
                </div>
                <h3 className="text-sm font-bold text-dark font-heading uppercase tracking-tight">{val.title}</h3>
                <p className="text-slate-500 text-[10px] leading-relaxed font-sans">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>




      </div>
    </div>
  );
}
