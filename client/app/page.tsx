'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Zap, ArrowRight, CheckCircle2, Shield, Users, 
  MessageSquare, Phone, Mail, Award, Landmark, ChevronRight, Globe2, Building2, Milestone, Lightbulb, Compass, Factory, BarChart3, HelpCircle
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';

export default function HomePage() {
  const router = useRouter();

  // SECTION 2: Industries We Serve
  const targetIndustries = [
    { name: 'Manufacturing', icon: '🏭', desc: 'Heavy manufacturing plants, machinery setups, and casting units.' },
    { name: 'Pharmaceuticals', icon: '💊', desc: 'Sterile laboratories, process control, and cleanroom cooling.' },
    { name: 'Chemicals', icon: '🧪', desc: 'Continuous chemical processors, reactors, and automation lines.' },
    { name: 'Textiles', icon: '🧵', desc: '24/7 spinning, weaving, processing, and finishing mills.' },
    { name: 'Engineering', icon: '⚙️', desc: 'Precision component machining, heavy fabricating, and bulk assembly.' },
    { name: 'Warehousing & Logistics', icon: '📦', desc: 'Large logistics hubs, sorting lines, and refrigerated cold chain stores.' },
    { name: 'Industrial Parks', icon: '⚡', desc: 'Group Captive frameworks and multi-facility industrial clusters.' },
    { name: 'Commercial Campuses', icon: '🏢', desc: 'Corporate tech headquarters, datacenters, and LEED facilities.' }
  ];

  // SECTION 3: Solutions Overview
  const solutionsOverview = [
    {
      title: 'Open Access Energy',
      desc: 'Bypass local utilities and procure renewable grid power directly from off-site private IPPs (Solar, Wind, Hybrid) under flat-rate PPAs.',
      metric: 'Save up to 40% on DISCOM tariffs'
    },
    {
      title: 'Industrial Solar',
      desc: 'Custom-engineered on-site solar systems for factory rooftops and ground mounts, under CAPEX or zero-investment OPEX frameworks.',
      metric: 'On-site generation offset of 20-30%'
    },
    {
      title: 'Wind Energy',
      desc: 'Utility-scale wind power procurement for high-load industrial consumers looking for non-solar hours generation support.',
      metric: 'High Capacity Factors (CUF) in key states'
    },
    {
      title: 'Hybrid Solutions',
      desc: 'Combined wind-solar energy profiles that match 24/7 continuous industrial production curves, maximizing grid wheeling capacity.',
      metric: 'Optimal dispatch matching base load'
    },
    {
      title: 'Energy Procurement',
      desc: 'Structured market buying strategies, bilateral power purchase contracts, and state/national grid code approvals brokerage.',
      metric: 'Risk-managed contract hedging structures'
    },
    {
      title: 'Energy Cost Optimization',
      desc: 'Analytical audits of contract demands, load profiling, power factor optimization, and smart peak-tariff offset scheduling.',
      metric: 'Immediate operational savings potential'
    }
  ];

  // SECTION 4: How Infinity Green Works
  const timelineSteps = [
    { step: '01', title: 'Energy Assessment', desc: 'Analyze current energy consumption and costs to establish baseline demand parameters.' },
    { step: '02', title: 'Consumption Analysis', desc: 'Identify inefficiencies and savings opportunities through detailed chronological load profiling.' },
    { step: '03', title: 'Solution Design', desc: 'Recommend the most suitable renewable energy strategy (Open Access, Onsite Solar, or Hybrid Sourcing).' },
    { step: '04', title: 'Proposal Development', desc: 'Present commercial and technical options including CAPEX vs OPEX modeling and PPA drafts.' },
    { step: '05', title: 'Execution Support', desc: 'Coordinate implementation through trusted partners and manage grid synchronization approvals.' },
    { step: '06', title: 'Ongoing Optimization', desc: 'Monitor and improve long-term performance, manage dispatch bids, and audit state utility bills.' }
  ];

  // SECTION 5: Industry Network Preview (Vetted sample profiles)
  const networkProducers = [
    { name: 'Vibrant Solar Infra', tech: 'Hybrid Solar-Wind', capacity: '450 MW', states: 'Karnataka, Tamil Nadu' },
    { name: 'Aditya Wind Farms Ltd', tech: 'Onshore Wind', capacity: '280 MW', states: 'Gujarat, Maharashtra' }
  ];

  const networkConsumers = [
    { name: 'Indo-Tex Spinning Mill', industry: 'Textiles', state: 'Tamil Nadu', category: 'Open Access PPA' },
    { name: 'Astra Pharmaceuticals', industry: 'Pharmaceuticals', state: 'Himachal Pradesh', category: 'Onsite OPEX Solar' }
  ];

  // SECTION 7: Insights Preview
  const insightsPreview = [
    { title: 'B2B Renewable Energy Open Access: 2026 Procurement Guide', desc: 'A strategic breakdown of ISTS transmission waivers, state open-access surcharges, and group captive equity rules.', category: 'Regulations' },
    { title: 'How Spinning Mills & Textile Units Cut Electricity Tariffs by 35%', desc: 'Case study analysis of shifting daytime load to hybrid solar-wind PPA options.', category: 'Cost Optimization' }
  ];

  return (
    <div className="bg-light min-h-screen text-dark font-sans select-none scroll-smooth">
      
      {/* SECTION 1: HERO */}
      <section className="relative bg-slate-955 bg-slate-950 border-b border-slate-900 text-white overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D7A5F_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] opacity-30 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-primary font-bold text-[10px] tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5 fill-primary" /> Industrial Renewable Procurement
          </span>
          <h1 className="text-4xl md:text-7xl font-black font-heading leading-tight uppercase max-w-5xl mx-auto tracking-tight">
            SMARTER ENERGY.<br />
            <span className="text-primary">GREATER SAVINGS.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            Helping industries reduce electricity costs through renewable energy procurement, industrial solar solutions, open access power, and energy optimization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/contact?proposal=true" className="btn-primary py-4 px-8 text-sm font-bold uppercase tracking-wider w-full sm:w-auto">
              Request Proposal
            </Link>
            <Link href="/solutions" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 text-white font-semibold transition-all duration-300 w-full sm:w-auto font-heading text-sm hover:border-slate-700">
              Explore Solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: INDUSTRIES WE SERVE */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Target Segments</span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark uppercase tracking-tight">Industries We Serve</h2>
            <p className="text-slate-500 text-sm md:text-base font-semibold">
              Helping energy-intensive businesses optimize costs through renewable energy solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetIndustries.map((ind, i) => (
              <div 
                key={i} 
                className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl hover:border-primary/20 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl block mb-4 group-hover:scale-105 transition-transform duration-300">{ind.icon}</span>
                  <h4 className="font-heading font-black text-dark text-base uppercase tracking-tight mb-2">{ind.name}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">{ind.desc}</p>
                </div>
                <Link href="/contact?proposal=true" className="text-primary text-xs font-bold font-heading flex items-center gap-1 mt-6 group-hover:translate-x-1 transition-transform">
                  Learn More <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT PREVIEW */}
      <section className="py-24 bg-slate-55 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Mission Snapshot</span>
            <h2 className="text-3xl md:text-4xl font-black font-heading text-dark uppercase tracking-tight">
              Neutral B2B Renewable Advisors
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">
              We focus purely on medium and heavy industries across India. Infinity Green represents client EBITDA objectives rather than any single developer, structuring grid approvals and transparent open-access tariffs.
            </p>
            <div className="pt-2">
              <Link href="/about" className="btn-primary inline-flex py-3 px-8 text-xs">
                Read More About Us
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 bg-slate-50 border border-slate-150 p-8 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-primary font-bold text-xs">Total Independence</span>
              <p className="text-slate-400 text-xs font-sans">We are vendor-neutral and structure recommendations based purely on load optimization.</p>
            </div>
            <div className="space-y-2">
              <span className="text-primary font-bold text-xs">EBITDA-First Focus</span>
              <p className="text-slate-400 text-xs font-sans">Energy is treated as a core cost item, focusing on IRR, cash flows, and payback cycles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Process Timeline</span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark uppercase tracking-tight">How Infinity Green Works</h2>
            <p className="text-slate-500 text-sm md:text-base">
              A structured roadmap designed to optimize corporate energy procurement and execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timelineSteps.map((step, i) => (
              <div key={i} className="relative bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="absolute top-6 right-6 text-3xl font-black font-heading text-slate-200">
                  {step.step}
                </div>
                <h3 className="font-heading font-black text-dark text-base uppercase tracking-tight">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-sans pr-6">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: SOLUTIONS OVERVIEW */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Our Core Offerings</span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark uppercase tracking-tight">Renewable Sourcing & Optimization</h2>
            <p className="text-slate-500 text-sm md:text-base">
              Connecting bulk consumers with independent energy producers via grid infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionsOverview.slice(0, 3).map((sol, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200/60 p-8 rounded-2xl hover:border-primary/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="font-heading font-black text-dark text-lg uppercase tracking-tight">{sol.title}</h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">{sol.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1">Target Savings Focus</span>
                  <span className="text-xs font-semibold text-dark font-sans">{sol.metric}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link href="/solutions" className="btn-primary inline-flex py-3 px-8 text-sm">
              View All Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: INDUSTRY NETWORK PREVIEW */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Ecosystem Trust</span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark uppercase tracking-tight">Industry Network Preview</h2>
            <p className="text-slate-500 text-sm md:text-base">
              Viewing verified supply-side energy developers and bulk manufacturing consumer nodes across India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Energy Producers Preview Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Zap className="w-5 h-5 fill-primary" /></div>
                <div>
                  <h3 className="font-heading font-black text-dark text-lg uppercase">Energy Producers (IPPs)</h3>
                  <p className="text-[10px] text-slate-400 font-sans font-medium">Supply-side developer nodes</p>
                </div>
              </div>

              <div className="space-y-4">
                {networkProducers.map((p, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center text-xs font-sans">
                    <div>
                      <h4 className="font-bold text-dark">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{p.tech}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-primary">{p.capacity}</span>
                      <p className="text-[9px] text-slate-400 mt-0.5">States: {p.states}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industrial Consumers Preview Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center"><Building2 className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-heading font-black text-dark text-lg uppercase">Industrial Consumers</h3>
                  <p className="text-[10px] text-slate-400 font-sans font-medium">Demand-side bulk offtakers</p>
                </div>
              </div>

              <div className="space-y-4">
                {networkConsumers.map((c, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center text-xs font-sans">
                    <div>
                      <h4 className="font-bold text-dark">{c.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Industry: {c.industry}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[10px]">{c.category}</span>
                      <p className="text-[9px] text-slate-400 mt-1">State: {c.state}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/industry-network" className="btn-primary inline-flex py-3 px-8 text-sm">
              Explore Network
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: INSIGHTS PREVIEW */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Knowledge Center</span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark uppercase tracking-tight">Latest Articles & Reports</h2>
            <p className="text-slate-500 text-sm md:text-base">
              Briefings from our energy procurement desk outlining regulations and cost reduction audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {insightsPreview.map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-150 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-black text-dark text-base uppercase tracking-tight leading-snug">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans">{item.desc}</p>
                </div>
                <Link href="/insights" className="text-primary font-semibold text-xs font-heading flex items-center gap-1 hover:underline">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link href="/insights" className="btn-primary inline-flex py-3 px-8 text-sm">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: REQUEST PROPOSAL CTA */}
      <section className="py-24 bg-slate-50" id="proposal-desk">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
              Enterprise RFP Sourcing
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark uppercase tracking-tight">Request Feasibility Proposal</h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">
              Connect directly with our B2B procurement desk. We will run an audit of your average billing demand tariffs, grid connection limits, and regional open-access grid code availability.
            </p>
          </div>

          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>
      </section>

    </div>
  );
}