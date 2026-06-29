'use client';

import React, { useState, useCallback } from 'react';
import { Activity, ShieldCheck, HelpCircle, Network, Info, Zap, Building2, ArrowRight } from 'lucide-react';
import IndiaMap from '../../components/IndiaMap';

export default function IndustryNetworkPage() {
  const [selectedStateInfo, setSelectedStateInfo] = useState<{ name: string; id: string } | null>(null);

  const handleStateClick = useCallback((state: any) => {
    setSelectedStateInfo({ name: state.name, id: state.id });
  }, []);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            Enterprise Grid Ecosystem
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark mt-4 mb-6 uppercase tracking-tight">
            THE INDUSTRY NETWORK
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Connecting leading Independent Power Producers (IPPs) directly with high-volume industrial energy consumers across India via a transparent open access framework.
          </p>
        </div>

        {/* SECTION A: Marketplace Copy & Education */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-black text-dark uppercase tracking-tight">
                What is the Industry Network?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                The Industry Network is Infinity Green Energy&apos;s national grid directory. It maps utility-scale green energy assets (Solar PV, Onshore Wind, Hybrid blends) alongside major commercial and industrial load centers. By offering visual clarity on generator locations and local transmission grids, it serves as a neutral framework to streamline energy sourcing.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-primary font-bold uppercase tracking-wider">
              <span>Marketplace Transparency</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-black text-dark uppercase tracking-tight">
                How Producers & Consumers Connect
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Independent Power Producers (IPPs) list their capacity coordinates, tariff requirements, and commissioning schedules. High-volume industrial off-takers supply their continuous load profiles. Infinity Green&apos;s smart matchmaking protocols calculate optimal hybrid blends, facilitating bilateral contract negotiation under Captive and Group Captive regulations.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-primary font-bold uppercase tracking-wider">
              <span>Open Access Sourcing</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-black text-dark uppercase tracking-tight">
                Independent Grid Advisory
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Bypassing standard DISCOM inefficiency requires deep navigation of transmission surcharges, cross-subsidy levies (CSS), and wheeling agreements. Our independent grid advisory desk performs monthly telemetry audits, invoice reconciliation, and regulatory compliance screening to ensure guaranteed tariff predictability.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-primary font-bold uppercase tracking-wider">
              <span>Regulatory Compliance Guarantee</span>
            </div>
          </div>
        </section>

        {/* SECTION B: Interactive India Map Section */}
        <section className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 border border-slate-900 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column: Interactive Map Controls and Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/15 px-3.5 py-1.5 rounded-full border border-primary/20">
                  National Grid Mapping
                </span>
                <h2 className="text-2xl md:text-4xl font-black font-heading uppercase tracking-tight text-white leading-tight">
                  India Grid Presence
                </h2>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Interactive view of regional solar, wind, and hybrid grid capacity. Use the map to explore renewable energy open access opportunities across Indian states.
                </p>
              </div>

              {/* Map Legend */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Grid Status Legend</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-4.5 h-4.5 rounded-lg bg-slate-800 shrink-0 border border-slate-700 block" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">Awaiting Backend Integration</span>
                    <span className="text-[9px] text-slate-500">Live grid nodes will populate post-launch.</span>
                  </div>
                </div>
              </div>

              {/* State Detail Info Panel */}
              {selectedStateInfo ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <h4 className="font-heading font-black text-white text-sm uppercase tracking-wider flex justify-between items-center">
                    <span>{selectedStateInfo.name} Node Details</span>
                    <span className="text-[8px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase font-mono">
                      {selectedStateInfo.id.toUpperCase()}
                    </span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-900 pb-2">
                      <span className="text-slate-400">Open Access Surcharges:</span>
                      <span className="text-amber-500 font-semibold">Awaiting API Splicing</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-2">
                      <span className="text-slate-400">Bilateral Wheeling Status:</span>
                      <span className="text-amber-500 font-semibold">Awaiting API Splicing</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/20 border border-slate-900 border-dashed rounded-2xl p-6 text-center text-slate-500 text-xs py-8">
                  <Info className="w-5 h-5 mx-auto mb-2 text-slate-600" />
                  Hover over or focus on a state on the map to review regional availability.
                </div>
              )}
            </div>

            {/* Right Column: Dynamic Responsive SVG Map Component */}
            <div className="lg:col-span-7 bg-slate-900/30 border border-slate-900 rounded-3xl p-6 flex items-center justify-center relative min-h-[480px]">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl pointer-events-none" />
              <IndiaMap onStateClick={handleStateClick} />
            </div>
          </div>
        </section>

        {/* SECTION C: Empty State Information Card */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
            Awaiting Backend Integration
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-dark uppercase tracking-tight">
            Industry Network Under Development
          </h2>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-sans">
            Producer and consumer registrations will appear here after backend integration. The platform is designed to provide complete transparency into regional energy capacities, wheeling tariffs, and green power matchmaking registries.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-150 p-4 rounded-2xl justify-start sm:w-64 text-left">
              <Building2 className="w-8 h-8 text-slate-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-dark uppercase">Industrial Consumers</h4>
                <p className="text-[10px] text-slate-400">Load profile mapping pending grid sync.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-150 p-4 rounded-2xl justify-start sm:w-64 text-left">
              <Zap className="w-8 h-8 text-slate-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-dark uppercase">IPP Developers</h4>
                <p className="text-[10px] text-slate-400">Generation capacity awaiting API splice.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
