'use client';
import { useState, useEffect } from 'react';
import { api } from '@/services/api'; 
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  TrendingUp, User, Globe2, Zap, Landmark, HelpCircle, FileText, Settings, 
  Search, Filter, Plus, Shield, CheckCircle2, ChevronRight, BarChart3, 
  Database, Award, Trash, Edit, CheckSquare, Layers, Download, Clock, UserCheck, Play, Factory
} from 'lucide-react';


export default function AdminPage() {
  const [activeModule, setActiveModule] = useState<'analytics' | 'users' | 'consumers' | 'producers' | 'marketplace' | 'leads' | 'proposals' | 'consultations' | 'documents' | 'content'>('analytics');
  
  // Leads data
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState<'all' | 'consumer' | 'producer'>('all');

  // Load leads from server
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await api.get('/leads');
        setLeads(data);
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Mock users list
  const [users, setUsers] = useState([
    { id: 1, name: 'Rajesh Mehta', email: 'rajesh@indotex.com', role: 'consumer', load: '4.2 MW', ppa: 'Approved', status: 'Active' },
    { id: 2, name: 'Apex CleanEnergy Ltd', email: 'ops@apexclean.com', role: 'producer', load: '15.0 MW', ppa: 'Active Ingestion', status: 'Active' },
    { id: 3, name: 'Manson Chemicals Pvt Ltd', email: 'energy@mansonchem.com', role: 'consumer', load: '5.0 MW', ppa: 'Negotiating', status: 'Active' },
    { id: 4, name: 'Gupta Steel Castings', email: 'power@guptasteel.com', role: 'consumer', load: '8.5 MW', ppa: 'Feasibility Audit', status: 'Suspended' },
    { id: 5, name: 'Greenfield Wind Farms', email: 'feeder@greenfieldwind.com', role: 'producer', load: '22.0 MW', ppa: 'Approved', status: 'Active' }
  ]);

  // Mock proposals list
  const [proposals, setProposals] = useState([
    { id: 'PROP-2026-09', client: 'Acme Textiles', load: '4.5 MW', tariff: '₹5.10/unit', stage: 'Drafting', date: '06/02/2026' },
    { id: 'PROP-2026-10', client: 'Indo-Tex Spinning', load: '4.2 MW', tariff: '₹4.90/unit', stage: 'Offer Published', date: '06/04/2026' },
    { id: 'PROP-2026-11', client: 'Astra Pharma Labs', load: '1.8 MW', tariff: '₹5.20/unit', stage: 'Approved', date: '06/05/2026' }
  ]);

  // Mock consultations list
  const [consultations, setConsultations] = useState([
    { id: 1, client: 'Manson Chemicals', type: 'Site Load Audit', expert: 'Amit Kumar', date: 'June 14, 2026', status: 'Assigned' },
    { id: 2, client: 'Gupta Steel', type: 'Grid Synch Feasibility', expert: 'Vikram Singh', date: 'June 18, 2026', status: 'Scheduled' }
  ]);

  // Mock marketplace listings
  const [listings, setListings] = useState([
    { id: 1, producer: 'Apex CleanEnergy', capacity: '2.5 MW', type: 'Solar PV', rate: '₹4.20/unit', status: 'Approved' },
    { id: 2, producer: 'Greenfield Wind', capacity: '5.7 MW', type: 'Wind Hybrid', rate: '₹4.60/unit', status: 'Pending Approval' }
  ]);

  // Handle lead status updates
  const handleUpdateLeadStatus = (leadId: string, newStage: string) => {
    setLeads(leads.map(l => l._id === leadId ? { ...l, status: newStage } : l));
    alert(`Lead status updated to ${newStage} successfully ✅`);
  };

  // Toggle user state
  const handleToggleUserStatus = (userId: number) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    alert('User security status toggled successfully.');
  };

  // Moderate listing
  const handleModerateListing = (listingId: number, approve: boolean) => {
    setListings(listings.map(l => l.id === listingId ? { ...l, status: approve ? 'Approved' : 'Flagged' } : l));
    alert(`Listing status set to ${approve ? 'Approved' : 'Flagged'} successfully.`);
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-light flex flex-col md:flex-row text-dark font-sans">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 bg-dark text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Shield className="w-5 h-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white font-heading tracking-wide uppercase leading-none">Infinity Ops</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase mt-0.5 tracking-wider">National Console</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            <button 
              onClick={() => setActiveModule('analytics')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'analytics' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <BarChart3 className="w-4 h-4" /> Analytics Console
            </button>
            <button 
              onClick={() => setActiveModule('users')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'users' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <User className="w-4 h-4" /> User Directory
            </button>
            <button 
              onClick={() => setActiveModule('consumers')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'consumers' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Layers className="w-4 h-4" /> Active Consumers
            </button>
            <button 
              onClick={() => setActiveModule('producers')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'producers' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Factory className="w-4 h-4" /> Active Producers
            </button>
            <button 
              onClick={() => setActiveModule('marketplace')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'marketplace' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Globe2 className="w-4 h-4" /> Marketplace Mods
            </button>
            <button 
              onClick={() => setActiveModule('leads')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${activeModule === 'leads' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <span className="flex items-center gap-3"><HelpCircle className="w-4 h-4" /> Lead Management</span>
              {leads.length > 0 && (
                <span className="bg-accent text-dark text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                  {leads.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveModule('proposals')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'proposals' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <TrendingUp className="w-4 h-4" /> Proposal Pipeline
            </button>
            <button 
              onClick={() => setActiveModule('consultations')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'consultations' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <CheckSquare className="w-4 h-4" /> Consultations Feed
            </button>
            <button 
              onClick={() => setActiveModule('documents')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'documents' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" /> Documents Vault
            </button>
            <button 
              onClick={() => setActiveModule('content')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'content' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Settings className="w-4 h-4" /> Content Manager
            </button>
          </nav>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col min-w-0 bg-light">
          
          {/* Header */}
          <header className="bg-white border-b border-slate-100 px-6 py-5 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest font-heading">Operations Console</span>
              <h1 className="text-xl font-bold font-heading text-dark mt-0.5">Platform Controller</h1>
            </div>
            <span className="text-xs bg-slate-50 border border-slate-200 text-slate-500 font-bold px-3 py-1.5 rounded-xl font-mono">
              NODE ACTIVE
            </span>
          </header>

          <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Total Users</span>
                <span className="text-xl font-black font-heading mt-1 block">1,482</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Active Consumers</span>
                <span className="text-xl font-black font-heading mt-1 block text-primary">940</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Active Producers</span>
                <span className="text-xl font-black font-heading mt-1 block text-primary">542</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">New Leads</span>
                <span className="text-xl font-black font-heading mt-1 block text-yellow-600">{leads.length}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Marketplace</span>
                <span className="text-xl font-black font-heading mt-1 block">18 Feeders</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Consultations</span>
                <span className="text-xl font-black font-heading mt-1 block text-slate-500">{consultations.length} Pending</span>
              </div>
            </div>

            {/* Modules Render Logic */}

            {/* 1. Analytics Module */}
            {activeModule === 'analytics' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                  <h3 className="text-sm font-bold font-heading text-dark mb-4">SLA Grid Synchrony (YTD)</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Plant Feeder Sync Uptime</span>
                      <strong className="text-primary font-mono text-sm">99.85% (Optimal)</strong>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '99.85%' }} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                    <h4 className="text-xs font-bold text-dark font-heading uppercase mb-3">Green Power Transacted (MWh)</h4>
                    <div className="h-40 bg-slate-50 rounded-2xl flex items-end justify-between p-6">
                      <div className="w-8 bg-primary/20 h-1/3 rounded-t-lg" title="Jan" />
                      <div className="w-8 bg-primary/30 h-1/2 rounded-t-lg" title="Feb" />
                      <div className="w-8 bg-primary/50 h-2/3 rounded-t-lg" title="Mar" />
                      <div className="w-8 bg-primary h-5/6 rounded-t-lg" title="Apr" />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                    <h4 className="text-xs font-bold text-dark font-heading uppercase mb-3">Regulatory Audit Logs</h4>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">IEX Settlement Sync</span> <span className="text-primary font-bold">Synchronized</span></div>
                      <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">SLDC Meter Reading</span> <span className="text-primary font-bold">Fetched</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">CSS Tariff Audit</span> <span className="text-primary font-bold">Compliant</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Users Module */}
            {activeModule === 'users' && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="font-heading font-bold text-dark text-sm">Corporate User Registry</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setUserFilter('all')} className={`text-[10px] px-3 py-1.5 rounded-lg font-bold ${userFilter === 'all' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'}`}>All</button>
                    <button onClick={() => setUserFilter('consumer')} className={`text-[10px] px-3 py-1.5 rounded-lg font-bold ${userFilter === 'consumer' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'}`}>Consumers</button>
                    <button onClick={() => setUserFilter('producer')} className={`text-[10px] px-3 py-1.5 rounded-lg font-bold ${userFilter === 'producer' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'}`}>Producers</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-500">
                    <thead className="bg-slate-50 text-[9px] uppercase font-bold tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Client Name</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Power Load</th>
                        <th className="px-6 py-4">Contract PPA Status</th>
                        <th className="px-6 py-4 text-right">Moderation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {users.filter(u => userFilter === 'all' || u.role === userFilter).map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-5">
                            <span className="block font-bold text-dark">{u.name}</span>
                            <span className="text-[10px] text-slate-400">{u.email}</span>
                          </td>
                          <td className="px-6 py-5 capitalize text-[10px] font-bold text-slate-600">{u.role}</td>
                          <td className="px-6 py-5 font-semibold text-dark">{u.load}</td>
                          <td className="px-6 py-5 text-primary font-bold text-[10px]">{u.ppa}</td>
                          <td className="px-6 py-5 text-right">
                            <button 
                              onClick={() => handleToggleUserStatus(u.id)}
                              className={`text-[9px] px-2.5 py-1.5 rounded-lg font-bold ${u.status === 'Active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                            >
                              {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. Consumers Module */}
            {activeModule === 'consumers' && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-heading font-bold text-dark text-sm">Active Power Consumers</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-500">
                    <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Corporate Account</th>
                        <th className="px-6 py-4">Current Draw Rate</th>
                        <th className="px-6 py-4">YTD Savings Accumulated</th>
                        <th className="px-6 py-4 text-right">Compliance Log</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {users.filter(u => u.role === 'consumer').map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-dark">{u.name}</td>
                          <td className="px-6 py-4">{u.load}</td>
                          <td className="px-6 py-4 font-bold text-primary">₹12,45,000</td>
                          <td className="px-6 py-4 text-right text-primary font-bold text-[10px]">Sync OK</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. Producers Module */}
            {activeModule === 'producers' && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-heading font-bold text-dark text-sm">Active Power Producers</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-500">
                    <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Producer plant</th>
                        <th className="px-6 py-4">Total Grid Capacity</th>
                        <th className="px-6 py-4">Injection feeder Node</th>
                        <th className="px-6 py-4 text-right">Synchronization</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {users.filter(u => u.role === 'producer').map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-dark">{u.name}</td>
                          <td className="px-6 py-4">{u.load}</td>
                          <td className="px-6 py-4 font-mono text-[10px]">FEEDER-GRID-0{u.id}</td>
                          <td className="px-6 py-4 text-right text-primary font-bold text-[10px]">Grid Sync OK</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. Marketplace Module */}
            {activeModule === 'marketplace' && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-heading font-bold text-dark text-sm">Marketplace Capacity Moderation</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-500">
                    <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Producer Unit</th>
                        <th className="px-6 py-4">Available Capacity</th>
                        <th className="px-6 py-4">Bid Price Rate</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Moderation Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {listings.map(l => (
                        <tr key={l.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-5 font-bold text-dark">{l.producer}</td>
                          <td className="px-6 py-5">{l.capacity} ({l.type})</td>
                          <td className="px-6 py-5 font-semibold text-primary">{l.rate}</td>
                          <td className="px-6 py-5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${l.status === 'Approved' ? 'bg-primary/10 text-primary' : 'bg-yellow-100 text-yellow-800'}`}>
                              {l.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right flex justify-end gap-2">
                            <button onClick={() => handleModerateListing(l.id, true)} className="bg-primary hover:bg-primary-dark text-white px-2.5 py-1 rounded-lg text-[9px] font-bold">Approve</button>
                            <button onClick={() => handleModerateListing(l.id, false)} className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 rounded-lg text-[9px] font-bold">Flag</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. Leads Module */}
            {activeModule === 'leads' && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-heading font-bold text-dark text-sm">RFP Lead Pipeline</h3>
                </div>
                {loading ? (
                  <div className="p-20 text-center text-slate-400 font-sans text-xs">Loading Leads...</div>
                ) : leads.length === 0 ? (
                  <div className="p-20 text-center text-slate-400 font-sans text-xs">No active proposal requests found.</div>
                ) : (
                  <div className="divide-y divide-slate-100 text-xs">
                    {leads.map((lead) => (
                      <div key={lead._id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-slate-50/50 transition-colors">
                        <div className="space-y-1 font-sans">
                          <h4 className="font-bold text-dark text-sm font-heading">{lead.name}</h4>
                          <p className="text-slate-500">Corporate: <strong>{lead.company}</strong> | Contact: {lead.phone} | {lead.email}</p>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full inline-block mt-1">Monthly bill: ₹{(lead.bill || 0).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-slate-400 uppercase font-bold px-2">Stage:</span>
                          <select 
                            defaultValue={lead.status || 'Review'} 
                            onChange={(e) => handleUpdateLeadStatus(lead._id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-[10px] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary font-bold text-dark"
                          >
                            <option value="Review">Review Inbound</option>
                            <option value="Feasibility Audit">Feasibility Audit</option>
                            <option value="PPA Structured">PPA Structured</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 7. Proposals Module */}
            {activeModule === 'proposals' && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-heading font-bold text-dark text-sm">Proposal Deal Pipeline</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-500">
                    <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Proposal Ref</th>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Target Load</th>
                        <th className="px-6 py-4">Contract Tariff</th>
                        <th className="px-6 py-4 text-right">Negotiation Stage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {proposals.map(prop => (
                        <tr key={prop.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-mono font-bold text-dark">{prop.id}</td>
                          <td className="px-6 py-4 font-semibold text-dark">{prop.client}</td>
                          <td className="px-6 py-4">{prop.load}</td>
                          <td className="px-6 py-4 text-primary font-bold">{prop.tariff}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase ${prop.stage === 'Approved' ? 'bg-primary/10 text-primary' : 'bg-yellow-100 text-yellow-800'}`}>
                              {prop.stage}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. Consultations Module */}
            {activeModule === 'consultations' && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-heading font-bold text-dark text-sm">Consultation Site Audits</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-500">
                    <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Corporate Client</th>
                        <th className="px-6 py-4">Audit Type</th>
                        <th className="px-6 py-4">Assigned Expert</th>
                        <th className="px-6 py-4">Scheduled Timestamp</th>
                        <th className="px-6 py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {consultations.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-dark">{c.client}</td>
                          <td className="px-6 py-4">{c.type}</td>
                          <td className="px-6 py-4">{c.expert}</td>
                          <td className="px-6 py-4 text-slate-500">{c.date}</td>
                          <td className="px-6 py-4 text-right text-primary font-bold text-[10px]">{c.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 9. Documents Module */}
            {activeModule === 'documents' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                {[
                  { title: "NOC Interconnection.pdf", author: "SLDC Node Mumbai", size: "2.4 MB" },
                  { title: "PPA Master Agreement.pdf", author: "Infinity Legal", size: "8.1 MB" },
                  { title: "Tariff Audit Q1.pdf", author: "Grid Audit Team", size: "1.2 MB" }
                ].map((doc, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><FileText className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-dark truncate font-heading">{doc.title}</h4>
                        <span className="text-[10px] text-slate-400">Owner: {doc.author}</span>
                      </div>
                    </div>
                    <button onClick={() => alert(`Downloading Document: ${doc.title}`)} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline mt-4 pt-3 border-t border-slate-50">
                      <Download className="w-4 h-4" /> Download File ({doc.size})
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 10. Content Management Module */}
            {activeModule === 'content' && (
              <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 animate-in fade-in duration-200">
                <h3 className="text-lg font-bold font-heading text-dark mb-6">Portal Configuration & Notifications</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Content settings updated successfully ✅'); }} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Base Cross-Subsidy Charges (CSS)</label>
                    <input type="text" defaultValue="₹1.85 per unit average state offset" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Global System Notification Broadcast</label>
                    <textarea placeholder="Alert all consumers & producers about grid maintenance or SLDC tariff reviews..." rows={3} className="input-field" />
                  </div>
                  <button className="btn-primary py-3 px-6 text-xs font-bold rounded-xl mt-4">Broadcast Alert</button>
                </form>
              </div>
            )}

          </div>
        </main>

      </div>
    </ProtectedRoute>
  );
}
