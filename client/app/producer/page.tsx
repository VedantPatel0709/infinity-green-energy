'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Zap, User, Shield, Key, Mail, Phone, FileText, 
  MessageSquare, Settings, LogOut, Layers, Globe, BarChart3, Plus, ArrowUpRight 
} from 'lucide-react';
import { api } from '@/services/api';
import EmptyState from '@/components/EmptyState';

export default function ProducerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'capacity' | 'leads' | 'docs' | 'messages' | 'settings'>('profile');
  
  // Producer Data States
  const [profile, setProfile] = useState({
    companyName: 'Awaiting Marketplace Records',
    email: 'producer@vibrant.com',
    phone: '+91 99999 11111',
    techType: 'Solar & Wind Hybrid',
    capacity: '450 MW',
    statesServed: 'Karnataka, Tamil Nadu'
  });

  const [capacities, setCapacities] = useState([
    { id: 1, site: 'Tumkur Farm', tech: 'Solar PV', capacity: '250 MW', status: 'Active' },
    { id: 2, site: 'Koppal Wing', tech: 'Wind Onshore', capacity: '200 MW', status: 'Active' }
  ]);

  const [leads, setLeads] = useState([
    { id: 1, consumer: 'Awaiting Marketplace Records', req: '4.2 MW', type: 'Hybrid PPA', status: 'Negotiation' }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    router.push('/portal');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 p-6 flex flex-col justify-between border-r border-slate-800">
        <div className="space-y-8">
          <div>
            <span className="text-xl font-bold font-heading text-primary block">INFINITY GREEN</span>
            <span className="text-[10px] tracking-widest text-slate-500 font-bold block uppercase mt-0.5">PRODUCER PANEL</span>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'profile', label: 'Company Profile', icon: <User className="w-4 h-4" /> },
              { id: 'capacity', label: 'Capacity Sourcing', icon: <Layers className="w-4 h-4" /> },
              { id: 'leads', label: 'Lead Sourcing', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'docs', label: 'Document Vault', icon: <FileText className="w-4 h-4" /> },
              { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
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
          <p className="text-xs text-slate-500">Scale and coordinate renewable assets wheeled to grid connection terminals.</p>
        </div>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6 max-w-2xl">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Ecosystem Registration Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-slate-400 font-bold block mb-1">Company Name</span>
                <span className="font-semibold text-slate-200 block bg-slate-900 px-4 py-3 rounded-xl">{profile.companyName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block mb-1">Technology Type</span>
                <span className="font-semibold text-slate-200 block bg-slate-900 px-4 py-3 rounded-xl">{profile.techType}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block mb-1">Capacity Registered</span>
                <span className="font-semibold text-slate-200 block bg-slate-900 px-4 py-3 rounded-xl">{profile.capacity}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block mb-1">States Served</span>
                <span className="font-semibold text-slate-200 block bg-slate-900 px-4 py-3 rounded-xl">{profile.statesServed}</span>
              </div>
            </div>
          </div>
        )}

        {/* CAPACITY TAB */}
        {activeTab === 'capacity' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Farm Generations</h3>
            <EmptyState 
              title="Awaiting Backend Integration"
              subtitle="No Records Available"
              badgeText="Awaiting Backend Integration"
              description="Registered utility-scale capacity nodes and generation profiles will populate here after backend database sync."
            />
          </div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Active Off-taker Opportunities</h3>
            <EmptyState 
              title="Awaiting Backend Integration"
              subtitle="No Records Available"
              badgeText="Awaiting Backend Integration"
              description="Active C&I off-taker bids and power purchase RFPs will synchronize here after backend activation."
            />
          </div>
        )}

        {/* DOCS TAB */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Uploaded Documents</h3>
            <EmptyState 
              title="Awaiting Backend Integration"
              subtitle="No Records Available"
              badgeText="Awaiting Backend Integration"
              description="Connectivity agreements, state grid NOCs, and wheeling contracts will be managed here once the document vault is online."
            />
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center py-16 max-w-xl">
            <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="font-heading font-black text-slate-300 uppercase">Communication Node</h3>
            <p className="text-slate-400 text-xs mt-2">Bilateral chat logs with consumers will synchronise once proposal drafts are initiated.</p>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6 max-w-md">
            <h3 className="text-lg font-bold font-heading uppercase text-primary">Security Configurations</h3>
            <div className="space-y-4 text-xs">
              <button className="w-full bg-slate-900 hover:bg-slate-850 text-slate-200 py-3 rounded-xl border border-slate-850 transition-all text-left px-4">
                Update Account API Keys
              </button>
              <button className="w-full bg-slate-900 hover:bg-slate-850 text-slate-200 py-3 rounded-xl border border-slate-850 transition-all text-left px-4">
                Configure Two-Factor Auth (2FA)
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
