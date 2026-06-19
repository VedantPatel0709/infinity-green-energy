'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Zap, Building2, ArrowRight } from 'lucide-react';

export default function PortalPage() {
  const router = useRouter();

  const handleSimulateLogin = (role: 'admin' | 'producer' | 'consumer') => {
    // Save simulated session details
    localStorage.setItem('userInfo', JSON.stringify({
      token: `simulated-token-${role}`,
      name: `Demo ${role.toUpperCase()}`,
      email: `${role}@infinitygreen.com`,
      role: role
    }));
    
    // Redirect to the explicit dashboard route
    if (role === 'admin') router.push('/admin');
    else if (role === 'producer') router.push('/producer');
    else router.push('/consumer');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-16 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D7A5F_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-25 pointer-events-none" />

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        <div className="space-y-4">
          <Link href="/" className="inline-block text-xl font-bold font-heading tracking-widest text-primary hover:text-primary-light transition-colors">
            INFINITY GREEN ENERGY
          </Link>
          <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight">
            CLIENT PORTAL GATEWAY
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Select your enterprise sync role to access secure power dashboards, billing, and proposals.
          </p>
        </div>

        {/* Portal Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Admin */}
          <div 
            onClick={() => handleSimulateLogin('admin')}
            className="bg-slate-900 border border-slate-800 p-8 rounded-3xl cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[360px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-primary group-hover:scale-105 transition-all">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black font-heading uppercase text-white tracking-tight">Admin Portal</h3>
              
              <div className="space-y-2 text-xs font-sans text-slate-350">
                <p><strong>Purpose:</strong> Oversee network nodes, manage lead distributions, and structure bilat PPAs.</p>
                <p><strong>Features:</strong> Employee assignment module, CMS control, proposals dashboard, and analytics center.</p>
                <p><strong>Access Type:</strong> Write-Access (Enterprise Operations Command)</p>
              </div>
            </div>
            <div className="text-primary font-bold text-xs uppercase flex items-center gap-1 mt-6 group-hover:translate-x-1 transition-transform">
              Access Admin <ArrowRight className="w-4.5 h-4.5" />
            </div>
          </div>

          {/* Producer */}
          <div 
            onClick={() => handleSimulateLogin('producer')}
            className="bg-slate-900 border border-slate-800 p-8 rounded-3xl cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[360px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-primary group-hover:scale-105 transition-all">
                <Zap className="w-6 h-6 fill-primary" />
              </div>
              <h3 className="text-lg font-black font-heading uppercase text-white tracking-tight">IPP Producer</h3>
              
              <div className="space-y-2 text-xs font-sans text-slate-350">
                <p><strong>Purpose:</strong> Register utility-scale solar/wind assets and offer grid wheeled capacity.</p>
                <p><strong>Features:</strong> Publish generation profiles, upload telemetries, and bid for consumer offtake RFPs.</p>
                <p><strong>Access Type:</strong> Producer Node (Read / Self-Update)</p>
              </div>
            </div>
            <div className="text-primary font-bold text-xs uppercase flex items-center gap-1 mt-6 group-hover:translate-x-1 transition-transform">
              Access Producer <ArrowRight className="w-4.5 h-4.5" />
            </div>
          </div>

          {/* Consumer */}
          <div 
            onClick={() => handleSimulateLogin('consumer')}
            className="bg-slate-900 border border-slate-800 p-8 rounded-3xl cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[360px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-primary group-hover:scale-105 transition-all">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black font-heading uppercase text-white tracking-tight">Consumer Portal</h3>
              
              <div className="space-y-2 text-xs font-sans text-slate-350">
                <p><strong>Purpose:</strong> Procure green open access grid power and monitor load profiling audits.</p>
                <p><strong>Features:</strong> Upload bill demands, track matching PPAs, and check real-time savings offsets.</p>
                <p><strong>Access Type:</strong> Offtaker Account (Read / Lead Submission)</p>
              </div>
            </div>
            <div className="text-primary font-bold text-xs uppercase flex items-center gap-1 mt-6 group-hover:translate-x-1 transition-transform">
              Access Consumer <ArrowRight className="w-4.5 h-4.5" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
