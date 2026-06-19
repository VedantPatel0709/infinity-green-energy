import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Regulatory Disclaimer | Infinity Green Energy',
  description: 'Legal disclaimer regarding state grid codes, open access approvals, and utility billing surcharges.',
  alternates: {
    canonical: 'https://infinitygreenenergy.in/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="bg-light min-h-screen text-dark font-sans py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation */}
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>

        {/* Article Container */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase">
              <AlertCircle className="w-3.5 h-3.5" /> Legal Notice
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-heading text-dark uppercase tracking-tight">
              Platform Disclaimer
            </h1>
            <p className="text-slate-400 text-[10px] font-mono">Last Updated: June 18, 2026</p>
          </div>

          <div className="prose prose-slate prose-xs text-slate-500 font-sans space-y-6 leading-relaxed text-xs">
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl flex gap-3 text-[11px] text-dark font-sans font-semibold">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>
                Important: Renewable energy open-access transaction approvals are subject to final grid code clearances, substation banking limits, and state DISCOM guidelines.
              </span>
            </div>

            <p>
              The information, simulations, and tariff calculations provided on the Infinity Green Energy Pvt Ltd (&ldquo;Infinity Green&rdquo;) platform are intended solely for general guidance and preliminary feasibility analysis. They do not constitute formal commercial offers or guarantee grid connectivity.
            </p>
            
            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">1. Regulatory Variations</h3>
            <p>
              Open access charges, including Cross-Subsidy Surcharges (CSS), Additional Surcharges (AS), Transmission losses, and Wheeling fees, are governed by state-specific SERC orders and are subject to frequent regulatory changes. Infinity Green cannot be held liable for alterations in project feasibility resulting from tariff revisions or grid code amendments.
            </p>

            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">2. Third-Party Risks</h3>
            <p>
              While Infinity Green audits and vets registered Independent Power Producers (IPPs) and consumers, we do not guarantee the financial solvency, capacity delivery, or operational performance of any transacting parties.
            </p>

            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">3. Technical Limitations</h3>
            <p>
              Any load curve evaluations, capacity suggestions, or billing audits are estimations based on typical C&I load profiles. Plant managers must conduct independent physical load audits and obtain SLDC NOCs before executing long-term PPAs.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
