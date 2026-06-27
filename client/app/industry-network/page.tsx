'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Zap, Building2, MapPin, BarChart3, Shield, Info, X, ExternalLink, Activity } from 'lucide-react';
import IndiaMap from '../../components/IndiaMap';

// Empty arrays to represent un-integrated state registry records
const producers: any[] = [];
const consumers: any[] = [];

export default function IndustryNetworkPage() {
  const [activeTab, setActiveTab] = useState<'energy' | 'industry'>('energy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  
  // Modal State for profile views
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

  // Hardcoded states/technology for visual completeness of dropdowns
  const stateOptions = ['All', 'Gujarat', 'Tamil Nadu', 'Maharashtra', 'Karnataka', 'Rajasthan', 'Madhya Pradesh'];

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

        {/* Network Overview section showing: Technologies, Industries, Regions */}
        <section className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-xl space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-heading font-black text-dark uppercase tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Network Overview
            </h2>
            <p className="text-xs text-slate-400 mt-1">Ecosystem distribution matrix across technology, industrial, and regional segments.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-sans">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">Technologies Offered</span>
              <ul className="space-y-2.5 text-slate-600">
                <li className="flex justify-between font-medium"><span>Solar PV Grid Connect</span> <span className="text-slate-400 font-bold">IPP Sourced</span></li>
                <li className="flex justify-between font-medium"><span>Onshore Wind Power</span> <span className="text-slate-400 font-bold">IPP Sourced</span></li>
                <li className="flex justify-between font-medium"><span>Wind-Solar Hybrid Blend</span> <span className="text-slate-400 font-bold">Optimal CUF</span></li>
                <li className="flex justify-between font-medium"><span>Onsite Rooftop CAPEX/OPEX</span> <span className="text-slate-400 font-bold">Industrial</span></li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">Industries Served</span>
              <ul className="space-y-2.5 text-slate-600">
                <li className="flex justify-between font-medium"><span>Chemicals & Processing</span> <span className="text-slate-400 font-bold">High Thermal & Base Load</span></li>
                <li className="flex justify-between font-medium"><span>Textiles & Spinning Mills</span> <span className="text-slate-400 font-bold">Continuous 24/7 Operations</span></li>
                <li className="flex justify-between font-medium"><span>Heavy Engineering & Assembly</span> <span className="text-slate-400 font-bold">High Peak Surcharges</span></li>
                <li className="flex justify-between font-medium"><span>Pharmaceuticals & Cleanrooms</span> <span className="text-slate-400 font-bold">Critical Load Offset</span></li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">Active Grid Regions</span>
              <ul className="space-y-2.5 text-slate-600">
                <li className="flex justify-between font-medium"><span>Southern Grid</span> <span className="text-slate-400 font-bold">KA, TN, AP Nodes</span></li>
                <li className="flex justify-between font-medium"><span>Western Grid</span> <span className="text-slate-400 font-bold">GJ, MH Nodes</span></li>
                <li className="flex justify-between font-medium"><span>Northern Grid</span> <span className="text-slate-400 font-bold">HR, RJ, MP Nodes</span></li>
                <li className="flex justify-between font-medium"><span>Interstate wheeled (ISTS)</span> <span className="text-slate-400 font-bold">National Grid</span></li>
              </ul>
            </div>
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
              <h2 className="text-2xl md:text-4xl font-black font-heading uppercase tracking-tight text-white leading-tight">
                India Renewable Energy Network
              </h2>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Live producer and consumer coverage will appear automatically after onboarding and backend activation.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-350">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-800 shrink-0 border border-slate-700" />
                  <span><strong>Gray:</strong> No Live Data Available</span>
                </div>
              </div>
            </div>

            {/* Interactive India Map */}
            <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex items-center justify-center relative min-h-[450px]">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl pointer-events-none" />
              <IndiaMap producers={producers} consumers={consumers} />
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

              <select
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-xl focus:outline-none focus:border-primary cursor-pointer"
                disabled
              >
                <option>All Technologies</option>
                <option>Solar PV Grid Connect</option>
                <option>Onshore Wind Power</option>
                <option>Wind-Solar Hybrid</option>
                <option>Small Hydro Sourcing</option>
              </select>

              <select
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-xl focus:outline-none focus:border-primary cursor-pointer"
                disabled
              >
                <option>All Capacities</option>
                <option>Under 10 MW</option>
                <option>10 MW - 50 MW</option>
                <option>Above 50 MW</option>
              </select>

              <select
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-xl focus:outline-none focus:border-primary cursor-pointer"
                disabled
              >
                <option>All Industries</option>
                <option>Chemicals & Process</option>
                <option>Textiles & Spinning</option>
                <option>Heavy Engineering</option>
                <option>Pharmaceuticals</option>
              </select>
            </div>
          </div>

          {/* Directory Listings */}
          <div>
            {activeTab === 'energy' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducers.length > 0 ? (
                  filteredProducers.map(p => (
                    <div key={p.id} className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-heading font-black text-primary text-lg">
                            {p.logoText}
                          </div>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {p.status}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-heading font-black text-dark text-base uppercase">{p.name}</h3>
                          <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit mt-1">
                            {p.tech}
                          </span>
                        </div>
                        <p className="text-slate-500 text-xs font-sans leading-relaxed mt-2">{p.desc}</p>
                        <div className="space-y-1.5 pt-2 text-xs font-sans border-t border-slate-100">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Total Capacity:</span>
                            <span className="font-bold text-dark">{p.capacity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">States Served:</span>
                            <span className="font-semibold text-dark text-right truncate max-w-[160px]" title={p.states}>{p.states}</span>
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
                  <div className="col-span-full py-24 text-center bg-white border border-slate-200 rounded-3xl">
                    <div className="max-w-md mx-auto space-y-4 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Zap className="w-6 h-6 text-slate-350" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-heading font-black text-dark text-xs uppercase tracking-wider">
                          Awaiting Verified Producer Records
                        </h4>
                        <p className="text-[10px] text-slate-400 font-sans leading-relaxed px-4">
                          Renewable generation asset registries are currently undergoing regulatory synchronization. Vetted nodes will populate post-launch.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConsumers.length > 0 ? (
                  filteredConsumers.map(c => (
                    <div key={c.id} className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-6">
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
                          <h3 className="font-heading font-black text-dark text-base uppercase">{c.name}</h3>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">Location: {c.state}</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed font-sans">
                          {c.desc}
                        </p>
                        <div className="space-y-1.5 pt-2 text-xs font-sans border-t border-slate-100">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Requirement Category:</span>
                            <span className="font-bold text-dark">{c.reqCategory}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Status:</span>
                            <span className="font-bold text-primary">{c.status}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedProfile(c)}
                        className="w-full bg-slate-50 border border-slate-150 hover:bg-primary hover:text-white text-dark py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5"
                      >
                        View Profile Details <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-24 text-center bg-white border border-slate-200 rounded-3xl">
                    <div className="max-w-md mx-auto space-y-4 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Building2 className="w-6 h-6 text-slate-350" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-heading font-black text-dark text-xs uppercase tracking-wider">
                          Awaiting Verified Consumer Records
                        </h4>
                        <p className="text-[10px] text-slate-400 font-sans leading-relaxed px-4">
                          Industrial off-taker load profiles are currently undergoing regulatory synchronization. Vetted nodes will populate post-launch.
                        </p>
                      </div>
                    </div>
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
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-primary font-bold uppercase tracking-wider">
                      {selectedProfile.tech || selectedProfile.industry}
                    </span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {selectedProfile.status}
                    </span>
                  </div>
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
                    <span className="font-bold text-slate-400">Location:</span>
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

              <div className="pt-4">
                <Link 
                  href={`/request-proposal?node=${selectedProfile.id}`}
                  onClick={() => setSelectedProfile(null)}
                  className="btn-primary w-full text-xs font-bold uppercase tracking-widest py-3 text-center"
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
