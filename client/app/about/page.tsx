'use client';
import React, { useState, useEffect } from 'react';
import { User, Users, Award, Milestone, Lightbulb, Compass, ShieldCheck, LineChart, TrendingUp, Network } from 'lucide-react';
import { Metadata } from 'next';

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
    <div className="bg-light min-h-screen text-dark py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <main className="max-w-7xl mx-auto space-y-24">
        {/* Who We Are Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto" id="who-we-are">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark tracking-tight uppercase leading-none mt-4">
            INFINITY GREEN ENERGY
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Infinity Green Energy is India’s premier industrial renewable energy procurement and energy optimization platform. We serve as a strategic partner connecting energy producers with bulk industrial consumers.
          </p>
        </section>

        {/* Company Story */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="company-story">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Our Roots</span>
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-dark">Company Story</h2>
            <div className="w-12 h-1 bg-primary rounded" />
          </div>
          <div className="lg:col-span-7 text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
            <p>{cms.companyStory}</p>
          </div>
        </section>

        {/* Why Infinity Green Exists */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="why-exists">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">The Market Problem</span>
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-dark">Why Infinity Green Exists</h2>
            <div className="w-12 h-1 bg-primary rounded" />
          </div>
          <div className="lg:col-span-7 text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
            <p>{cms.whyExistsBody}</p>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto"><Milestone className="w-6 h-6" /></div>
            <h3 className="text-2xl font-bold text-dark font-heading uppercase tracking-tight">Our Mission</h3>
            <p className="text-slate-500 text-sm md:text-base font-sans leading-relaxed max-w-2xl mx-auto">
              {cms.mission}
            </p>
          </div>
        </section>



        {/* Operating Model Section */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="operating-model">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Agile Matrix</span>
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-dark">Operating Model</h2>
            <div className="w-12 h-1 bg-primary rounded" />
          </div>
          <div className="lg:col-span-7 text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
            <p>{cms.companyStructure}</p>
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




      </main>
    </div>
  );
}
