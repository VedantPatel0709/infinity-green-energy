'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Zap, Building2, MapPin, BarChart3, Shield, Info, X, ExternalLink } from 'lucide-react';

// Real/Verified-looking Mock Data for Energy Producers (Category A)
const producers = [
  {
    id: 'prod-1',
    name: 'Vibrant Solar Infra',
    tech: 'Solar PV & Wind Hybrid',
    capacity: '450 MW',
    states: 'Karnataka, Tamil Nadu, Andhra Pradesh',
    desc: 'Specializes in utility-scale multi-MW co-located solar and wind installations feeding continuous load profiles.',
    logoText: 'VS'
  },
  {
    id: 'prod-2',
    name: 'Aditya Wind Farms Ltd',
    tech: 'Onshore Wind',
    capacity: '280 MW',
    states: 'Gujarat, Maharashtra, Rajasthan',
    desc: 'Operates heavy wind turbine installations across the western coast. Direct feed PPAs structured for night-shift operations.',
    logoText: 'AW'
  },
  {
    id: 'prod-3',
    name: 'Sterling Green Power',
    tech: 'Solar PV Grid Connect',
    capacity: '600 MW',
    states: 'Rajasthan, Haryana, Madhya Pradesh',
    desc: 'Utility-scale solar farms focused on inter-state transmission system (ISTS) long-term power delivery contracts.',
    logoText: 'SG'
  },
  {
    id: 'prod-4',
    name: 'Matrix Hydro & Biomass',
    tech: 'Small Hydro & Biomass',
    capacity: '120 MW',
    states: 'Maharashtra, Himachal Pradesh, Uttarakhand',
    desc: 'Provides baseload grid injection services leveraging small run-of-the-river hydro projects and biomass facilities.',
    logoText: 'MB'
  }
];

// Real/Verified-looking Mock Data for Industrial Consumers (Category B)
const consumers = [
  {
    id: 'cons-1',
    name: 'Indo-Tex Spinning Mill',
    industry: 'Textiles & Spinning',
    state: 'Tamil Nadu',
    reqCategory: 'High Voltage Open Access (4.2 MW)',
    desc: 'Switched entire spinning load to off-site hybrid open access, securing a flat PPA rate and cutting annual electricity bills by ₹4.8 Crores.',
    logoText: 'IT'
  },
  {
    id: 'cons-2',
    name: 'Astra Pharmaceuticals',
    industry: 'Pharmaceuticals',
    state: 'Himachal Pradesh',
    reqCategory: 'Onsite OPEX Rooftop Solar (1.8 MW)',
    desc: 'Offsets daytime critical air conditioning and refrigeration systems with a zero-investment rooftop solar installation backed by net-metering.',
    logoText: 'AP'
  },
  {
    id: 'cons-3',
    name: 'Aries Chemicals Ltd',
    industry: 'Chemicals & Process',
    state: 'Gujarat',
    reqCategory: 'Group Captive Power PPA (6.5 MW)',
    desc: 'Acquired 26% equity in a dedicated 12 MW offsite solar plant to waive cross-subsidy and grid-wheeling surcharges entirely under group captive laws.',
    logoText: 'AC'
  },
  {
    id: 'cons-4',
    name: 'Apex Logistics Hubs',
    industry: 'Warehousing & Cold Chain',
    state: 'Maharashtra',
    reqCategory: 'Onsite CAPEX Solar (2.2 MW)',
    desc: 'Converted 180,000 square feet of warehouse rooftop space to high-efficiency monocrystalline solar systems, achieving 4.1 year payback cycle.',
    logoText: 'AL'
  }
];

// Network locations mapped to SVG coordinates (approximate relative visual spots on map)
const networkLocations = [
  { name: 'Rajasthan Node (Solar)', x: 38, y: 38, type: 'producer', info: '600 MW Sterling Solar Farm' },
  { name: 'Gujarat Node (Wind/Solar)', x: 28, y: 52, type: 'producer', info: '280 MW Aditya Wind Farm' },
  { name: 'Karnataka Node (Hybrid)', x: 42, y: 82, type: 'producer', info: '450 MW Vibrant Solar-Wind Hybrid' },
  { name: 'Himachal Node (Consumer)', x: 46, y: 22, type: 'consumer', info: '1.8 MW Astra Pharma Rooftop' },
  { name: 'Gujarat Consumer Hub', x: 34, y: 55, type: 'consumer', info: '6.5 MW Aries Chem Group Captive' },
  { name: 'Maharashtra Consumer Node', x: 40, y: 64, type: 'consumer', info: '2.2 MW Apex Logistics CAPEX' },
  { name: 'Tamil Nadu Textile Hub', x: 48, y: 88, type: 'consumer', info: '4.2 MW Indo-Tex Spinning Open Access' }
];

export default function IndustryNetworkPage() {
  const [activeTab, setActiveTab] = useState<'energy' | 'industry'>('energy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  
  // Modal State for profile views
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

  // States list based on active tab
  const stateOptions = useMemo(() => {
    const list = activeTab === 'energy' 
      ? producers.flatMap(p => p.states.split(', '))
      : consumers.map(c => c.state);
    return ['All', ...Array.from(new Set(list))];
  }, [activeTab]);

  const filteredProducers = useMemo(() => {
    return producers.filter(p => {
      const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tech.toLowerCase().includes(searchQuery.toLowerCase());
      const matchState = selectedState === 'All' || p.states.includes(selectedState);
      return matchQuery && matchState;
    });
  }, [searchQuery, selectedState]);

  const filteredConsumers = useMemo(() => {
    return consumers.filter(c => {
      const matchQuery = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchState = selectedState === 'All' || c.state === selectedState;
      return matchQuery && matchState;
    });
  }, [searchQuery, selectedState]);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            Enterprise Grid Ecosystem
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark mt-4 mb-6 uppercase tracking-tight">
            THE INDUSTRY NETWORK
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Replacing testimonials with audited, transparent node registrations. We connect leading Independent Power Producers (IPPs) directly with high-volume industrial energy consumers.
          </p>
        </div>

        {/* SECTION D: Network Statistics */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-100/50">
          <div className="text-center space-y-2 border-r border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Total IPP Producers</span>
            <span className="text-2xl md:text-4xl font-black text-dark font-heading block">14 Vetted IPPs</span>
            <span className="text-[10px] text-primary font-semibold block">Verified Grid Nodes</span>
          </div>
          <div className="text-center space-y-2 md:border-r border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Industrial Off-takers</span>
            <span className="text-2xl md:text-4xl font-black text-dark font-heading block">42 Plants</span>
            <span className="text-[10px] text-primary font-semibold block">Electricity &gt; ₹10L/Mo</span>
          </div>
          <div className="text-center space-y-2 border-r border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">States Covered</span>
            <span className="text-2xl md:text-4xl font-black text-dark font-heading block">18 States</span>
            <span className="text-[10px] text-primary font-semibold block">Pan-India Connection</span>
          </div>
          <div className="text-center space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Connected Capacity</span>
            <span className="text-2xl md:text-4xl font-black text-dark font-heading block">1.85 GW</span>
            <span className="text-[10px] text-primary font-semibold block">Wheeled clean capacity</span>
          </div>
        </section>

        {/* SECTION C: Network Map */}
        <section className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 border border-slate-900 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/15 px-3.5 py-1.5 rounded-full border border-primary/20">
                Grid Presence
              </span>
              <h2 className="text-2xl md:text-4xl font-black font-heading uppercase tracking-tight text-white">
                Interactive Grid Map
              </h2>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Visualizing regional generation farms and corresponding bulk manufacturing customers. We actively manage nodes across Western, Southern, and Northern state corridors.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <span className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center shrink-0 border border-white/20"><span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /></span>
                  <span><strong>Green Nodes:</strong> Utility-scale IPP wind and solar generators</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <span className="w-3.5 h-3.5 rounded-full bg-accent flex items-center justify-center shrink-0 border border-white/20"><span className="w-1.5 h-1.5 rounded-full bg-white" /></span>
                  <span><strong>Green-Green Nodes:</strong> Active off-take manufacturing factories</span>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map */}
            <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex items-center justify-center relative min-h-[400px]">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl pointer-events-none" />
              
              {/* Simplified India Map visual SVG */}
              <svg className="w-full max-w-[380px] h-[380px] opacity-25" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M40 10 L45 8 L50 12 L55 10 L58 15 L52 20 L55 25 L45 35 L40 40 L35 48 L30 52 L25 50 L20 60 L24 68 L28 75 L38 88 L42 92 L46 95 L50 90 L52 82 L58 85 L60 80 L62 75 L60 68 L68 62 L75 58 L72 45 L68 40 L65 30 L60 22 L55 20 L48 18 Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Node Overlays */}
              {networkLocations.map((loc, idx) => (
                <div 
                  key={idx}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white/40 shadow-lg transition-transform hover:scale-125 ${
                    loc.type === 'producer' ? 'bg-primary' : 'bg-accent'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute left-1/2 bottom-5 -translate-x-1/2 w-48 bg-slate-950/90 border border-slate-800 p-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 text-[9px] text-slate-200 z-30 font-sans shadow-xl">
                    <p className="font-bold text-white uppercase tracking-wider">{loc.name}</p>
                    <p className="text-slate-400 mt-0.5">{loc.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Toggle for Directory */}
        <section className="space-y-8">
          <div className="flex justify-center border-b border-slate-200 max-w-md mx-auto">
            <button 
              onClick={() => { setActiveTab('energy'); setSelectedState('All'); }}
              className={`w-1/2 py-4 font-heading font-bold text-sm uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeTab === 'energy' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Zap className="w-4 h-4" /> Energy Producers (IPPs)
            </button>
            <button 
              onClick={() => { setActiveTab('industry'); setSelectedState('All'); }}
              className={`w-1/2 py-4 font-heading font-bold text-sm uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeTab === 'industry' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Building2 className="w-4 h-4" /> Industrial Consumers
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                placeholder={`Search by name or category...`}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-xs font-medium text-dark"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto items-center justify-end">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
              </div>
              
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-xl focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="All">All States</option>
                {stateOptions.filter(s => s !== 'All').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Directory Listings */}
          <div>
            {activeTab === 'energy' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducers.length > 0 ? (
                  filteredProducers.map(p => (
                    <div key={p.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-heading font-black text-primary text-lg">
                          {p.logoText}
                        </div>
                        <div>
                          <h3 className="font-heading font-black text-dark text-base uppercase">{p.name}</h3>
                          <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit mt-1">
                            {p.tech}
                          </span>
                        </div>
                        <div className="space-y-1.5 pt-2 text-xs font-sans">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Total Capacity:</span>
                            <span className="font-bold text-dark">{p.capacity}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedProfile(p)}
                        className="w-full bg-slate-50 border border-slate-150 hover:bg-primary hover:text-white text-dark py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5"
                      >
                        View Profile Details <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center text-slate-400 text-sm font-sans">
                    No verified energy producers match your search parameters.
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredConsumers.length > 0 ? (
                  filteredConsumers.map(c => (
                    <div key={c.id} className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-12 rounded-xl bg-dark/10 border border-dark/15 flex items-center justify-center font-black text-dark font-heading text-lg">
                            {c.logoText}
                          </div>
                          <span className="text-[9px] bg-slate-50 border border-slate-200 text-slate-500 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {c.industry}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-heading font-black text-dark text-lg uppercase">{c.name}</h3>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">State node: {c.state}</span>
                        </div>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans pt-1">
                          {c.desc}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedProfile(c)}
                        className="bg-slate-50 border border-slate-150 hover:bg-primary hover:text-white text-dark py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 w-fit px-6"
                      >
                        View Profile Details <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center text-slate-400 text-sm font-sans">
                    No verified industrial consumer profiles match your search parameters.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Detail Overlay Modal (Profile Page) */}
        {selectedProfile && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 relative">
              <button 
                onClick={() => setSelectedProfile(null)}
                className="absolute top-6 right-6 p-1 rounded-full hover:bg-slate-50 text-slate-400 hover:text-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-heading font-black text-primary text-xl">
                  {selectedProfile.logoText}
                </div>
                <div>
                  <h3 className="text-2xl font-black font-heading text-dark uppercase">{selectedProfile.name}</h3>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mt-1">
                    {selectedProfile.tech || selectedProfile.industry}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-4 text-xs font-sans text-slate-600">
                {selectedProfile.capacity && (
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400">Total Grid Capacity:</span>
                    <span className="font-black text-dark">{selectedProfile.capacity}</span>
                  </div>
                )}
                {selectedProfile.states && (
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400">States Served:</span>
                    <span className="font-bold text-dark text-right">{selectedProfile.states}</span>
                  </div>
                )}
                {selectedProfile.reqCategory && (
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400">Energy Requirement Category:</span>
                    <span className="font-bold text-dark text-right">{selectedProfile.reqCategory}</span>
                  </div>
                )}
                {selectedProfile.state && (
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400">State:</span>
                    <span className="font-bold text-dark">{selectedProfile.state}</span>
                  </div>
                )}
                <div className="space-y-2">
                  <span className="font-bold text-slate-400 block">Ecosystem Description:</span>
                  <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 text-dark">
                    {selectedProfile.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Link 
                  href={`/contact?proposal=true&node=${selectedProfile.id}`}
                  onClick={() => setSelectedProfile(null)}
                  className="btn-primary w-full text-xs font-bold uppercase tracking-widest py-3"
                >
                  Initiate Connection Proposal
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
