import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Infinity Green Energy',
  description: 'Terms of service and transaction registry rules governing industrial open access matching on Infinity Green.',
  alternates: {
    canonical: 'https://infinitygreenenergy.in/terms-of-service',
  },
};

export default function TermsOfServicePage() {
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
              <FileText className="w-3.5 h-3.5" /> Platform Governance
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-heading text-dark uppercase tracking-tight">
              Terms of Service
            </h1>
            <p className="text-slate-400 text-[10px] font-mono">Last Updated: June 18, 2026</p>
          </div>

          <div className="prose prose-slate prose-xs text-slate-500 font-sans space-y-6 leading-relaxed text-xs">
            <p>
              Welcome to Infinity Green. By creating a producer registry, consumer profile, or initiating sourcing requests on our platform, you agree to comply with these Terms of Service.
            </p>
            
            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">1. Platform Scope</h3>
            <p>
              Infinity Green Energy Pvt Ltd operates exclusively as a neutral matchmaking and consulting advisory platform. We do not own generating assets, operate transmission lines, or act as an electricity distribution utility. All energy transaction agreements (PPAs) are signed directly between the generator and off-taker.
            </p>

            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">2. Accuracy of Load Data</h3>
            <p>
              Users are solely responsible for ensuring the accuracy of submitted monthly power bills, contract demands, connected loads, and substation telemetry data. Feasibility simulations are generated based on user input, and actual grid feasibility remains subject to finalTRANSCO/SLDC clearances.
            </p>

            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">3. Regulatory Compliance</h3>
            <p>
              All wheeling transactions, captive structures, and open-access applications must comply with state-specific Electricity Regulatory Commission (SERC) codes and Central Electricity Authority (CEA) guidelines. Users are liable for any regulatory fines or surcharge revisions resulting from incorrect compliance submissions.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
