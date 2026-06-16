'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building2, User, Layers, BarChart3, FileText, 
  MessageSquare, Settings, LogOut, CheckCircle2, ChevronRight, HelpCircle 
} from 'lucide-react';
import { api } from '@/services/api';

export default function ConsumerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'requirements' | 'proposals' | 'matched' | 'docs' | 'reports' | 'settings'>('profile');

  // Consumer Data States
  const [profile, setProfile] = useState({
    companyName: 'Indo-Tex Spinning Mill',
    email: 'consumer@indotex.com',
    phone: '+91 98765 00000',
    industry: 'Textiles & Spinning',
    location: 'Coimbatore, Tamil Nadu',
    expense: '₹18 Lakh/month'
  });

  const [requirements, setRequirements] = useState([
    { id: 1, type: 'Open Access Grid Wheeling', capacity: '4.2 MW', frequency: 'Continuous Baseload', status: 'Approved' }
  ]);

  const [proposals, setProposals] = useState([
    { id: 1, developer: 'Vibrant Solar Infra', rates: '₹4.20 / kWh', term: '20 Years', status: 'Negotiation' }
  ]);

  const [matchedProducers, setMatchedProducers] = useState([
    { name: 'Vibrant Solar Infra', tech: 'Hybrid Wind-Solar PV', capacity: '450 MW', matchScore: '96%' },
    { name: 'Sterling Green Power', tech: 'Grid Connected Solar PV', capacity: '600 MW', matchScore: '88%' }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    router.push('/portal');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-955 bg-slate-950 p-6 flex flex-col justify-between border-r border-slate-800">
        <div className="space-y-8">
          <div>
            <span className="text-xl font-bold font-heading text-primary block">INFINITY GREEN</span>
            <span className="text-[10px] tracking-widest text-slate-500 font-bold block uppercase mt-0.5">CONSUMER PANEL</span>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'profile', label: 'Company Profile', icon: <User className="w-4 h-4" /> },
              { id: 'requirements', label: 'Energy Requirements', icon: <Layers className="w-4 h-4" /> },
              { id: 'proposals', label: 'Proposal Hub', icon: <FileText className="w-4 h-4" /> },
              { id: 'matched', label: 'Matched IPPs', icon: <CheckCircle2 className="w-4 h-4" /> },
              { id: 'docs', label: 'Document Vault', icon: <FileText className="w-4 h-4" /> },
              { id: 'reports', label: 'Savings Reports', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold w-full text-left transition-all ${
                  activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-850 hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold w-full text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all mt-8"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black font-heading uppercase tracking-tight">
            {activeTab.toUpperCase()} PANEL
          </h2>
          <p className="text-xs text-slate-500">Monitor and purchase green energy contracts synched from India&apos;s IPPs.</p>
        </div>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-slate-955 bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6 max-w-2xl">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Industrial Account Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-slate-400 font-bold block mb-1">Company Name</span>
                <span className="font-semibold text-slate-200 block bg-slate-900 px-4 py-3 rounded-xl">{profile.companyName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block mb-1">Industry Type</span>
                <span className="font-semibold text-slate-200 block bg-slate-900 px-4 py-3 rounded-xl">{profile.industry}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block mb-1">Headquarters Location</span>
                <span className="font-semibold text-slate-200 block bg-slate-900 px-4 py-3 rounded-xl">{profile.location}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block mb-1">Average Grid Spend</span>
                <span className="font-semibold text-slate-200 block bg-slate-900 px-4 py-3 rounded-xl">{profile.expense}</span>
              </div>
            </div>
          </div>
        )}

        {/* REQUIREMENTS TAB */}
        {activeTab === 'requirements' && (
          <div className="space-y-6 max-w-3xl">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Load & Grid Specifications</h3>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              {requirements.map(r => (
                <div key={r.id} className="flex justify-between items-start text-xs">
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">{r.type}</h4>
                    <p className="text-slate-400 mt-1">Load Schedule: {r.frequency}</p>
                    <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold px-2 py-0.5 rounded mt-2">{r.status}</span>
                  </div>
                  <span className="text-base font-black font-heading text-primary">{r.capacity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROPOSALS TAB */}
        {activeTab === 'proposals' && (
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Active PPA Opportunities</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4">Developer</th>
                    <th className="py-3 px-4">Wheeling Rates</th>
                    <th className="py-3 px-4">Contract Term</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map(p => (
                    <tr key={p.id} className="border-b border-slate-900 text-slate-200">
                      <td className="py-3 px-4 font-bold">{p.developer}</td>
                      <td className="py-3 px-4">{p.rates}</td>
                      <td className="py-3 px-4">{p.term}</td>
                      <td className="py-3 px-4">
                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded">{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MATCHED PRODUCERS TAB */}
        {activeTab === 'matched' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Smart-Grid Developer Matches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchedProducers.map((m, idx) => (
                <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-200">{m.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{m.tech}</p>
                    <p className="text-[10px] text-primary font-bold mt-1">Grid Match: {m.matchScore}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-400">{m.capacity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCS TAB */}
        {activeTab === 'docs' && (
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-4 max-w-md">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Document Vault</h3>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-slate-200">Industrial Load Profile NOC.pdf</p>
                <p className="text-[10px] text-slate-400 mt-0.5">DISCOM Grid Stamp</p>
              </div>
              <ChevronRight className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center py-16 max-w-xl">
            <BarChart3 className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="font-heading font-black text-slate-300 uppercase">Savings Analysis Hub</h3>
            <p className="text-slate-400 text-xs mt-2">Interactive generation vs consumption offsets reports will update hourly upon commission.</p>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-slate-955 bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6 max-w-md">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Security Settings</h3>
            <div className="space-y-4 text-xs">
              <button className="w-full bg-slate-900 hover:bg-slate-850 text-slate-200 py-3 rounded-xl border border-slate-850 transition-all text-left px-4">
                Manage Login Connections
              </button>
              <button className="w-full bg-slate-900 hover:bg-slate-850 text-slate-200 py-3 rounded-xl border border-slate-850 transition-all text-left px-4">
                Update Corporate Billing Contacts
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
