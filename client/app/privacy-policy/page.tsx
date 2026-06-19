import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Infinity Green Energy',
  description: 'Privacy policy and data protection framework details for industrial consumers and power producers on Infinity Green.',
  alternates: {
    canonical: 'https://infinitygreenenergy.in/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
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
              <Shield className="w-3.5 h-3.5" /> Compliance & Trust
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-heading text-dark uppercase tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-400 text-[10px] font-mono">Last Updated: June 18, 2026</p>
          </div>

          <div className="prose prose-slate prose-xs text-slate-500 font-sans space-y-6 leading-relaxed text-xs">
            <p>
              At Infinity Green Energy Pvt Ltd (&ldquo;Infinity Green&rdquo;), we treat industrial load curves, billing invoice histories, and grid synchronization compliance data with maximum sensitivity. This Privacy Policy details how we collect, store, and manage your data when registering on our B2B matchmaking platform.
            </p>
            
            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">1. Data We Collect</h3>
            <p>
              We collect information provided directly by you during registry signup, including entity details, plant operational capacity, load profiles, historical DISCOM invoices, grid clearance reports, and corporate contact coordinates.
            </p>

            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">2. Use of Information</h3>
            <p>
              Collected profiles are utilized solely to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Perform energy sourcing feasibility simulations.</li>
              <li>Match registered industrial consumers with verified independent power producers (IPPs).</li>
              <li>Structure Power Purchase Agreements (PPAs) under open access or captive models.</li>
              <li>Maintain platform transaction registries and load telemetries.</li>
            </ul>

            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">3. Data Sharing & NDAs</h3>
            <p>
              Infinity Green does not sell corporate profiles or transactional metrics. Project details, substation locations, and specific load parameters are only disclosed to vetted prospective off-takers or producers under strict mutual Non-Disclosure Agreements (NDAs).
            </p>

            <h3 className="font-heading font-black text-dark text-sm uppercase tracking-wide mt-6">4. Data Security</h3>
            <p>
              All electrical load telemetry records and corporate information are encrypted in transit and at rest using industry-standard enterprise firewalls.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
