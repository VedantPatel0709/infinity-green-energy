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



  const targetIndustries = [
    { name: 'Chemicals', icon: '🧪', desc: 'Continuous chemical processors, reactors, and automation lines.' },
    { name: 'Manufacturing', icon: '🏭', desc: 'Heavy manufacturing plants, machinery setups, and casting units.' },
    { name: 'Textile', icon: '🧵', desc: '24/7 spinning, weaving, processing, and finishing mills.' },
    { name: 'Pharma', icon: '💊', desc: 'Sterile laboratories, process control, and cleanroom cooling.' },
    { name: 'Logistics', icon: '📦', desc: 'Large logistics hubs, sorting lines, and refrigerated cold chain stores.' },
    { name: 'Engineering', icon: '⚙️', desc: 'Precision component machining, heavy fabricating, and bulk assembly.' }
  ];

  const flowSteps = [
    { step: '01', title: 'Energy Producers', desc: 'Utility-scale IPPs register their available clean power capacities.' },
    { step: '02', title: 'Verification & Onboarding', desc: 'Infinity Green audits grid synchronization parameters and IPP credit ratings.' },
    { step: '03', title: 'Infinity Green Platform', desc: 'Our central marketplace aggregates data, matchmaking profiles, and wheeling metrics.' },
    { step: '04', title: 'Consumer Requirements', desc: 'Bulk industrial consumers register their load profiles, current tariffs, and ESG targets.' },
    { step: '05', title: 'Proposal Creation', desc: 'Automatic feasibility modeling structures tariff optimization and draft PPAs.' },
    { step: '06', title: 'Energy Procurement', desc: 'PPA execution begins, drawing direct flat-rate wheeled power over state grid lines.' }
  ];

  const networkProducers = [
    { name: 'Verified Producer Listing', tech: 'Data Available After Registration', capacity: 'Awaiting Backend Sync', states: '—', status: 'Awaiting Sync' },
    { name: 'Verified Producer Listing', tech: 'Data Available After Registration', capacity: 'Awaiting Backend Sync', states: '—', status: 'Awaiting Sync' }
  ];

  const networkConsumers = [
    { name: 'Verified Consumer Listing', industry: 'Data Available After Registration', state: '—', category: 'Awaiting Backend Sync', status: 'Awaiting Sync' },
    { name: 'Verified Consumer Listing', industry: 'Data Available After Registration', state: '—', category: 'Awaiting Backend Sync', status: 'Awaiting Sync' }
  ];

  return (
    <div className="bg-light min-h-screen text-dark font-sans select-none scroll-smooth">
      
      {/* SECTION 1: HERO */}
      <section className="relative bg-slate-950 border-b border-slate-900 text-white overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D7A5F_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] opacity-30 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-primary font-bold text-[10px] tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5 fill-primary" /> B2B Renewable Energy Marketplace
          </span>
          <h1 className="text-4xl md:text-7xl font-black font-heading leading-tight uppercase max-w-5xl mx-auto tracking-tight text-white">
            SMARTER ENERGY.<br />
            <span className="text-primary">GREATER SAVINGS.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            A specialized Renewable Energy Procurement & Marketplace Platform connecting Energy Producers and Industrial Consumers across India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/contact?proposal=true" className="btn-primary py-4 px-8 text-sm font-bold uppercase tracking-wider w-full sm:w-auto">
              Request Sourcing Proposal
            </Link>
            <Link href="/solutions" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 text-white font-semibold transition-all duration-300 w-full sm:w-auto font-heading text-sm hover:border-slate-700">
              Explore Solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1.5: WHY INFINITY GREEN ENERGY (TRUST & CREDIBILITY) */}
      <section className="py-16 bg-slate-900 border-b border-slate-800 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Why Infinity Green Energy</span>
            <h2 className="text-2xl md:text-4xl font-black font-heading text-white uppercase tracking-tight">Enterprise Consulting Framework</h2>
            <p className="text-slate-400 text-xs md:text-sm">
              Independent advisory structuring procurement corridors and regulatory compliance registries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 hover:border-primary/45 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider">Vendor Neutral Advisory</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">No asset ownership in projects, ensuring unbiased feasibility analysis for optimal PPA generation.</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 hover:border-primary/45 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider">Open Access Expertise</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">Navigating ISTS/InSTS surcharges, transmission billing, and grid wheeling regulations across multiple states.</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 hover:border-primary/45 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider">Industrial Renewable Procurement</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">Blended hybrid profiles, onshore wind wheeling, and commercial rooftop solar matching continuous factory loads.</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 hover:border-primary/45 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Factory className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider">Pan India Network</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">Connecting energy loads with regional transmission networks in Gujarat, Tamil Nadu, and Karnataka.</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 hover:border-primary/45 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider">Regulatory Guidance</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">Continuous policy audits on CSS/AS surcharges and captive equity structure compliance rules (26/51 rules).</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 hover:border-primary/45 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Milestone className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider">End-to-End Execution Support</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">Guiding corporate boards from initial load curve modeling to grid synchronization NOC clearances.</p>
            </div>
          </div>

          {/* Trust & Compliance Section */}
          <div className="pt-8 border-t border-slate-800 space-y-4 text-center">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block">Trust & Compliance Registry</span>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] uppercase font-bold tracking-wider text-slate-400">
              <span className="px-3.5 py-2 rounded bg-slate-950 border border-slate-850">MSME Registration: Verification Pending</span>
              <span className="px-3.5 py-2 rounded bg-slate-950 border border-slate-850">GST Registration: Verification Pending</span>
              <span className="px-3.5 py-2 rounded bg-slate-950 border border-slate-850">Startup Recognition: Verification Pending</span>
              <span className="px-3.5 py-2 rounded bg-slate-950 border border-slate-850">Industry Compliance: Audited</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1.7: COMPANY TIMELINE */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Corporate Timeline</span>
            <h2 className="text-2xl md:text-4xl font-black font-heading text-dark uppercase tracking-tight">Our Growth Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 text-xs font-sans">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-2 relative">
              <span className="text-primary font-black font-heading text-base block">01 / Foundation</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">Establishing transactional registry principles and consulting models for B2B procurement advisory.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-2 relative">
              <span className="text-primary font-black font-heading text-base block">02 / Market Expansion</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">Extending feasibility analysis mapping capabilities to major industrial zones in western/southern grids.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-2 relative">
              <span className="text-primary font-black font-heading text-base block">03 / Platform Development</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">Digitizing load profiles and structuring automated proposal draft simulations for group captive contracts.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-2 relative">
              <span className="text-primary font-black font-heading text-base block">04 / Nationwide Network</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">Enabling pan-India transaction verification registries bridging IPP nodes with corporate off-taker sites.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: CORE PLATFORM ARCHITECTURE (Visual Concept) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Central Marketplace</span>
            <h2 className="text-3xl font-black font-heading text-dark uppercase tracking-tight">Ecosystem Architecture</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center pt-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-150 text-center space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl font-bold mx-auto">☀️</div>
              <h3 className="font-heading font-black text-dark text-base uppercase">Energy Producers</h3>
              <p className="text-slate-500 text-xs font-sans leading-relaxed">Utility-scale developers looking to deploy wheeled grid solar, wind, or blended hybrid capacity directly to bulk consumers.</p>
            </div>
            
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-900 text-center space-y-4 shadow-xl text-white relative">
              <div className="absolute inset-0 bg-primary/5 pointer-events-none rounded-3xl" />
              <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center text-xl font-bold mx-auto">⚡</div>
              <h3 className="font-heading font-black text-white text-base uppercase">Infinity Green Platform</h3>
              <p className="text-slate-400 text-xs font-sans leading-relaxed">The central matchmaker facilitating regulatory grid compliance, load profiling audits, tariff simulations, and draft PPA generation.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-150 text-center space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl font-bold mx-auto">🏭</div>
              <h3 className="font-heading font-black text-dark text-base uppercase">Industrial Consumers</h3>
              <p className="text-slate-500 text-xs font-sans leading-relaxed">Heavy manufacturing, chemical plants, and textile spinning mills spending over ₹10 Lakhs monthly looking to secure tariff relief.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: HOW OUR NETWORK WORKS (Visual Flow) */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Visual Process Flow</span>
            <h2 className="text-3xl font-black font-heading text-dark uppercase tracking-tight">How Our Network Works</h2>
            <p className="text-slate-500 text-sm">A structured workflow aligning supply capacity with consumer energy profiles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {flowSteps.map((step, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded uppercase tracking-wider">Step {step.step}</span>
                    {i < 5 && <span className="text-slate-300 font-bold hidden lg:block">→</span>}
                  </div>
                  <h4 className="font-heading font-black text-dark text-xs uppercase tracking-tight leading-snug">{step.title}</h4>
                  <p className="text-slate-400 text-[10px] leading-relaxed font-sans">{step.desc}</p>
                </div>
                {i < 5 && <div className="text-center text-slate-300 block lg:hidden my-2">↓</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY INFINITY GREEN EXISTS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Market Challenges</span>
            <h2 className="text-3xl font-black font-heading text-dark uppercase tracking-tight">Why Infinity Green Exists</h2>
            <p className="text-slate-500 text-sm">Solving the key bottlenecks in industrial clean power acquisition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-150 space-y-4 hover:shadow-md transition-all">
              <span className="text-2xl">⚡</span>
              <h3 className="text-sm font-heading font-black uppercase text-dark">Rising Industrial Energy Costs</h3>
              <p className="text-slate-500 text-[11px] font-sans leading-relaxed">Electricity bills constitute a major overhead for manufacturing hubs. Flat-rate open access energy acts as an immediate operational cost control tool.</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-150 space-y-4 hover:shadow-md transition-all">
              <span className="text-2xl">⚙️</span>
              <h3 className="text-sm font-heading font-black uppercase text-dark">Complexity of Renewable Procurement</h3>
              <p className="text-slate-500 text-[11px] font-sans leading-relaxed">Navigating open-access grid codes, cross-subsidy surcharges, transmission billing, and group captive equity structures requires deep expertise.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-150 space-y-4 hover:shadow-md transition-all">
              <span className="text-2xl">🔍</span>
              <h3 className="text-sm font-heading font-black uppercase text-dark">Lack of Transparent Sourcing</h3>
              <p className="text-slate-500 text-[11px] font-sans leading-relaxed">Industrial off-takers often lack direct, unverified broker lines to utility developers, making bidding and contract pricing opaque.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-150 space-y-4 hover:shadow-md transition-all">
              <span className="text-2xl">🌐</span>
              <h3 className="text-sm font-heading font-black uppercase text-dark">Need for Centralized Networks</h3>
              <p className="text-slate-500 text-[11px] font-sans leading-relaxed">We provide a unified ecosystem mapping grid availability, connecting verified generators with credit-vetted industrial consumers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRIES WE SERVE */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Target Segments</span>
            <h2 className="text-3xl font-black font-heading text-dark uppercase tracking-tight">Industries We Serve</h2>
            <p className="text-slate-500 text-sm">Providing B2B energy cost controls to energy-intensive industries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetIndustries.map((ind, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl block mb-4 group-hover:scale-105 transition-transform duration-300">{ind.icon}</span>
                  <h4 className="font-heading font-black text-dark text-sm uppercase tracking-tight mb-2">{ind.name}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">{ind.desc}</p>
                </div>
                <Link href="/contact" className="text-primary text-xs font-bold font-heading flex items-center gap-1 mt-6 group-hover:translate-x-1 transition-transform">
                  Initiate Sourcing <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: ECOSYSTEM PREVIEW */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Ecosystem Preview</span>
            <h2 className="text-3xl font-black font-heading text-dark uppercase tracking-tight">Ecosystem Directory Preview</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Energy Producers Card */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-150 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xl">☀️</span>
                <h3 className="font-heading font-black text-dark text-base uppercase">Sample Energy Producers (IPPs)</h3>
              </div>
              <div className="space-y-4">
                {networkProducers.map((p, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center text-xs font-sans">
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

            {/* Industrial Consumers Card */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-155 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏭</span>
                <h3 className="font-heading font-black text-dark text-base uppercase">Sample Industrial Consumers</h3>
              </div>
              <div className="space-y-4">
                {networkConsumers.map((c, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center text-xs font-sans">
                    <div>
                      <h4 className="font-bold text-dark">{c.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Industry: {c.industry}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[9px]">{c.category}</span>
                      <p className="text-[9px] text-slate-400 mt-1">State: {c.state}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 8: REQUEST PROPOSAL CTA */}
      <section className="py-20 bg-white" id="proposal-desk">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
              Enterprise Sourcing
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark uppercase tracking-tight">Request Sourcing Proposal</h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">
              Connect directly with our B2B procurement desk. We will run an audit of your average billing demand tariffs, grid connection limits, and regional open-access grid code availability.
            </p>
          </div>

          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* PRE-FOOTER B2B CTA BANNER */}
      <section className="py-16 bg-slate-900 border-t border-slate-800 text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-black font-heading text-white uppercase tracking-tight">Ready to Transition to Clean Tariff Power?</h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto font-sans leading-relaxed">
            Audit your corporate electricity load profile under expert regulatory guidelines. Match with vetted producers in state grids today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/consumer/register" className="btn-primary py-3.5 px-6 text-xs font-bold uppercase tracking-wider">
              Register as Consumer
            </Link>
            <Link href="/producer/register" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs transition-all uppercase tracking-wider font-heading">
              Register as Generator Node
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}