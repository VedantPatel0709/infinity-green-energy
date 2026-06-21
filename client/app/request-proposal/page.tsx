import { Metadata } from 'next';
import ProposalForm from '@/components/ProposalForm';
import { ShieldCheck, BarChart3, Factory, Globe2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Request Renewable Energy Proposal | Infinity Green Energy',
  description: 'Evaluate open-access grid feasibility, hybrid wind-solar blends, and onsite industrial rooftop solar sourcing.',
  openGraph: {
    title: 'Request Renewable Energy Proposal | Infinity Green Energy',
    description: 'Submit your industrial energy requirements and our team will evaluate potential sourcing opportunities.',
    url: 'https://infinitygreenenergy.com/request-proposal',
    type: 'website'
  }
};

export default function RequestProposalPage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            Enterprise Grid Procurement
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-dark font-heading mt-4 mb-6 uppercase tracking-tight">
            Request Renewable Energy Proposal
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Submit your industrial energy requirements and our team will evaluate potential sourcing opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Proposal Side Pillars Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
              <h3 className="text-lg font-bold font-heading text-dark border-b border-slate-100 pb-3 uppercase tracking-wider text-[11px]">
                Sourcing Opportunities
              </h3>
              
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0 h-11"><Globe2 className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-xs uppercase tracking-tight">Open Access Opportunities</h4>
                  <p className="text-slate-500 text-[11px] font-sans leading-relaxed mt-1">Feasibility analysis for InSTS and ISTS open access wheeling options.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0 h-11"><Factory className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-xs uppercase tracking-tight">Industrial Solar Opportunities</h4>
                  <p className="text-slate-500 text-[11px] font-sans leading-relaxed mt-1">Direct captive rooftop, group captive farms, and grid-tied IPP configurations.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0 h-11"><BarChart3 className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-xs uppercase tracking-tight">Renewable Energy Assessments</h4>
                  <p className="text-slate-500 text-[11px] font-sans leading-relaxed mt-1">Comparing current utility tariffs against synchronized IPP power rates.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0 h-11"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-xs uppercase tracking-tight">Regulatory Compliance</h4>
                  <p className="text-slate-500 text-[11px] font-sans leading-relaxed mt-1">Verifying captive group eligibility (26% equity / 51% consumption guidelines).</p>
                </div>
              </div>

            </div>

            {/* Platform notice */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D7A5F_2px,transparent_2px)] [background-size:16px_16px]" />
              <div className="relative z-10 space-y-4">
                <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-primary">Load Curves & FEASIBILITY</h4>
                <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                  Sourcing proposal analysis requires loading hourly billing curves to match against solar radiation or wind profiles. Please submit approximate connected load for quick checks.
                </p>
              </div>
            </div>

          </div>

          {/* Proposal Specifications Form */}
          <div className="lg:col-span-8">
            <ProposalForm />
          </div>
        </div>

      </div>
    </div>
  );
}
