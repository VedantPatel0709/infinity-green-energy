'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
import { 
  Zap, TrendingUp, History, Download, Shield, User, Bell, 
  Search, Filter, Plus, FileText, ChevronRight, Layers, Factory, 
  HelpCircle, Landmark, CheckCircle2, AlertCircle, RefreshCw, LogOut, CheckSquare, Settings
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Simulation helper so the user can easily toggle roles to preview Consumer/Producer/Admin dashboards
  const [simulatedRole, setSimulatedRole] = useState<string>('');
  
  useEffect(() => {
    if (user && user.role) {
      setSimulatedRole(user.role);
    }
  }, [user]);

  const currentRole = simulatedRole || (user ? user.role : 'consumer');

  // Active Tab State (separate per role to avoid key overlap)
  const [consumerTab, setConsumerTab] = useState('overview');
  const [producerTab, setProducerTab] = useState('overview');
  const [adminTab, setAdminTab] = useState('analytics');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Mock State for lists to make them interactive
  const [energyListings, setEnergyListings] = useState([
    { id: 1, capacity: '2.5 MW', type: 'Solar PV', rate: '₹4.20/unit', status: 'Active', buyer: 'Acme Textiles' },
    { id: 2, capacity: '1.8 MW', type: 'Wind Hybrid', rate: '₹4.80/unit', status: 'Pending Approval', buyer: 'None' },
    { id: 3, capacity: '5.0 MW', type: 'Solar Ground', rate: '₹3.90/unit', status: 'Contracted', buyer: 'Manson Chemical' }
  ]);
  const [newCapacity, setNewCapacity] = useState('');
  const [newRate, setNewRate] = useState('');

  // Mock lead management for admin
  const [leads, setLeads] = useState<any[]>([]);
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await api.get('/leads');
        setLeads(data);
      } catch (err) {
        console.error('Error fetching leads:', err);
      }
    };
    if (currentRole === 'admin') {
      fetchLeads();
    }
  }, [currentRole]);

  const handleAddListing = (e: any) => {
    e.preventDefault();
    if (!newCapacity || !newRate) return;
    setEnergyListings([
      ...energyListings,
      {
        id: Date.now(),
        capacity: `${newCapacity} MW`,
        type: 'Solar PV',
        rate: `₹${newRate}/unit`,
        status: 'Active',
        buyer: 'None'
      }
    ]);
    setNewCapacity('');
    setNewRate('');
    alert('Listing created successfully! ⚡');
  };

  // Mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Open Access Sync Successful', body: 'Your plant load is now synced with the state SLDC node.', time: '2 hours ago', read: false },
    { id: 2, title: 'New Proposal Received', body: 'Infinity Green trading desk published a GDAM proposal.', time: '1 day ago', read: true }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // MOCK LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-light flex flex-col md:flex-row text-dark font-sans">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-dark text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white font-heading tracking-wide uppercase leading-none">Infinity Portal</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase mt-0.5 tracking-wider">Enterprise Node</span>
            </div>
          </div>

          <div className="p-4 bg-slate-900/40 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                {user?.name?.slice(0, 2) || 'US'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate font-heading leading-tight">{user?.name || 'Authorized Operator'}</span>
                <span className="text-[9px] text-primary font-bold uppercase tracking-wider mt-0.5">{currentRole}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links per Role */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            
            {/* Consumer Dashboard Links */}
            {currentRole === 'consumer' && (
              <>
                <button 
                  onClick={() => setConsumerTab('overview')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${consumerTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <Layers className="w-4 h-4" /> Energy Overview
                </button>
                <button 
                  onClick={() => setConsumerTab('consultations')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${consumerTab === 'consultations' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <HelpCircle className="w-4 h-4" /> Active Consultations
                </button>
                <button 
                  onClick={() => setConsumerTab('proposals')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${consumerTab === 'proposals' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <TrendingUp className="w-4 h-4" /> Proposal Center
                </button>
                <button 
                  onClick={() => setConsumerTab('documents')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${consumerTab === 'documents' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <FileText className="w-4 h-4" /> Documents
                </button>
                <button 
                  onClick={() => setConsumerTab('notifications')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${consumerTab === 'notifications' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <span className="flex items-center gap-3"><Bell className="w-4 h-4" /> Notifications</span>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="bg-accent text-dark text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setConsumerTab('profile')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${consumerTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <User className="w-4 h-4" /> Profile Details
                </button>
              </>
            )}

            {/* Producer Dashboard Links */}
            {currentRole === 'producer' && (
              <>
                <button 
                  onClick={() => setProducerTab('overview')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${producerTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <Layers className="w-4 h-4" /> Capacity Overview
                </button>
                <button 
                  onClick={() => setProducerTab('listings')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${producerTab === 'listings' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <Zap className="w-4 h-4" /> Energy Listings
                </button>
                <button 
                  onClick={() => setProducerTab('requests')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${producerTab === 'requests' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <TrendingUp className="w-4 h-4" /> Buyer Requests
                </button>
                <button 
                  onClick={() => setProducerTab('contracts')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${producerTab === 'contracts' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <CheckSquare className="w-4 h-4" /> Contracts
                </button>
                <button 
                  onClick={() => setProducerTab('documents')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${producerTab === 'documents' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <FileText className="w-4 h-4" /> Documents
                </button>
                <button 
                  onClick={() => setProducerTab('profile')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${producerTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <User className="w-4 h-4" /> Profile Details
                </button>
              </>
            )}

            {/* Admin Dashboard Links */}
            {currentRole === 'admin' && (
              <>
                <button 
                  onClick={() => setAdminTab('analytics')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${adminTab === 'analytics' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <TrendingUp className="w-4 h-4" /> Analytics & Stats
                </button>
                <button 
                  onClick={() => setAdminTab('users')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${adminTab === 'users' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <User className="w-4 h-4" /> User Management
                </button>
                <button 
                  onClick={() => setAdminTab('leads')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${adminTab === 'leads' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <span className="flex items-center gap-3"><HelpCircle className="w-4 h-4" /> Lead Management</span>
                  {leads.length > 0 && (
                    <span className="bg-accent text-dark text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {leads.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setAdminTab('proposals')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${adminTab === 'proposals' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <FileText className="w-4 h-4" /> Proposal Tracking
                </button>
                <button 
                  onClick={() => setAdminTab('marketplace')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${adminTab === 'marketplace' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <Layers className="w-4 h-4" /> Marketplace Moderation
                </button>
                <button 
                  onClick={() => setAdminTab('content')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${adminTab === 'content' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <Settings className="w-4 h-4" /> Content Management
                </button>
              </>
            )}

          </nav>

          <div className="p-4 border-t border-slate-800 space-y-3">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </aside>

        {/* Main Dashboard Space */}
        <main className="flex-1 flex flex-col min-w-0 bg-light">
          
          {/* Header */}
          <header className="bg-white border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl font-bold font-heading text-dark flex items-center gap-2">
                <span>Enterprise Dashboard</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full capitalize">
                  {currentRole} Role
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-sans">Active operational session for Infinity Green Energy Pvt Ltd.</p>
            </div>

            {/* Simulated Role Toggle for Preview & Testing */}
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/60 shrink-0">
              <span className="text-[9px] text-slate-400 font-bold uppercase px-2">Preview Dashboards:</span>
              <button 
                onClick={() => setSimulatedRole('consumer')} 
                className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition-all ${currentRole === 'consumer' ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}
              >
                Consumer
              </button>
              <button 
                onClick={() => setSimulatedRole('producer')} 
                className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition-all ${currentRole === 'producer' ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}
              >
                Producer
              </button>
              <button 
                onClick={() => setSimulatedRole('admin')} 
                className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition-all ${currentRole === 'admin' ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}
              >
                Admin
              </button>
            </div>
          </header>

          {/* Tab Render Area */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto">
            
            {/* ========================================================
                CONSUMER DASHBOARD VIEW
                ======================================================== */}
            {currentRole === 'consumer' && (
              <>
                {consumerTab === 'overview' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    
                    {/* KPI cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Current Plant Load</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">1.2 MW</div>
                        <div className="text-[10px] text-accent font-bold mt-1">↑ Active PPA Feed</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Tariffs</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">₹5.20 / Unit</div>
                        <div className="text-[10px] text-accent font-bold mt-1">↓ 42% Below DISCOM</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Estimated Monthly Offset</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">₹1,75,000</div>
                        <div className="text-[10px] text-slate-400 font-sans mt-1">Auto saving tracked</div>
                      </div>
                      <div className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/10">
                        <span className="opacity-90 text-[10px] font-bold uppercase tracking-wider">YTD Cumulative Savings</span>
                        <div className="text-2xl font-black mt-2 font-heading">₹21,00,000</div>
                        <div className="text-[10px] opacity-80 mt-1">Audited Green Power</div>
                      </div>
                    </div>

                    {/* Data Lists */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-heading font-bold text-dark text-sm">Open Access Wheeling Log</h3>
                        <span className="text-[10px] text-primary font-bold uppercase bg-primary/10 px-2 py-0.5 rounded-full">Grid Active</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-500">
                          <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100">
                            <tr>
                              <th className="px-6 py-3">Billing Cycle</th>
                              <th className="px-6 py-3">Wheeled Energy (Units)</th>
                              <th className="px-6 py-3">PPA Tariff rate</th>
                              <th className="px-6 py-3 text-right">Invoiced Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            <tr className="hover:bg-slate-50/50">
                              <td className="px-6 py-4 font-bold text-dark">May 2026</td>
                              <td className="px-6 py-4">3,37,500 Units</td>
                              <td className="px-6 py-4 font-semibold text-primary">₹5.20</td>
                              <td className="px-6 py-4 text-right font-bold text-dark">₹17,55,000</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50">
                              <td className="px-6 py-4 font-bold text-dark">April 2026</td>
                              <td className="px-6 py-4">3,12,000 Units</td>
                              <td className="px-6 py-4 font-semibold text-primary">₹5.20</td>
                              <td className="px-6 py-4 text-right font-bold text-dark">₹16,22,400</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {consumerTab === 'consultations' && (
                  <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Scheduled Node</span>
                          <h3 className="text-xl font-bold font-heading text-dark mt-2">Open Access Feasibility Study</h3>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Pending Site Visit</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed font-sans">
                        Our load modeling consultants will review your transformer boundaries and regional grid line compliance to design the hybrid supply structure.
                      </p>
                      <div className="border-t border-slate-100 pt-6 space-y-3 font-sans text-xs text-slate-600">
                        <div className="flex justify-between"><span className="text-slate-400">Representative Assigned:</span> <span className="font-semibold text-dark">Amit Kumar (Grid Expert)</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Scheduled Date:</span> <span className="font-semibold text-dark">June 14, 2026</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {consumerTab === 'proposals' && (
                  <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold font-heading text-dark">Active PPA Tariff Proposals</h3>
                        <span className="text-[10px] bg-accent/20 text-accent font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">2 Options Available</span>
                      </div>
                      
                      <div className="space-y-4 font-sans">
                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <h4 className="font-bold text-dark text-sm">Solar OPEX 15-Year Wheeling</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Zero capital layout. Tariff locked at ₹5.10 / Unit flat rate.</p>
                          </div>
                          <button onClick={() => alert('Proposal Accepted! Proposal Center will update your contract details.')} className="btn-primary py-2 px-4 text-xs font-bold rounded-lg whitespace-nowrap">Accept Proposal</button>
                        </div>

                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <h4 className="font-bold text-dark text-sm">Wind-Solar Hybrid Open Access</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Flexible demand matching. Tariff locked at ₹4.90 / Unit.</p>
                          </div>
                          <button onClick={() => alert('Proposal Accepted! Proposal Center will update your contract details.')} className="btn-primary py-2 px-4 text-xs font-bold rounded-lg whitespace-nowrap">Accept Proposal</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {consumerTab === 'documents' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                    {[
                      { title: "NOC Grid Interconnection.pdf", type: "Certificate", size: "2.4 MB" },
                      { title: "Power Purchase Agreement (Draft).pdf", type: "Legal Draft", size: "8.1 MB" },
                      { title: "Tariff Audit Report - Q1.pdf", type: "Financial Audit", size: "1.2 MB" }
                    ].map((doc, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/30 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><FileText className="w-5 h-5" /></div>
                          <div>
                            <h4 className="text-sm font-bold text-dark truncate font-heading">{doc.title}</h4>
                            <span className="text-[10px] text-slate-400">{doc.type}</span>
                          </div>
                        </div>
                        <button onClick={() => alert(`Downloading: ${doc.title}`)} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline mt-4 pt-3 border-t border-slate-50">
                          <Download className="w-4.5 h-4.5" /> Download File ({doc.size})
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {consumerTab === 'notifications' && (
                  <div className="max-w-3xl bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-heading font-bold text-dark text-sm">Notifications</h3>
                      <button onClick={markAllRead} className="text-xs font-bold text-primary hover:underline">Mark All Read</button>
                    </div>
                    <div className="divide-y divide-slate-100 font-sans text-xs">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-6 flex items-start gap-4 transition-colors ${n.read ? 'bg-white' : 'bg-primary/5'}`}>
                          <div className={`p-2 rounded-xl mt-0.5 ${n.read ? 'bg-slate-100 text-slate-400' : 'bg-primary/10 text-primary'}`}>
                            <Bell className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-dark text-sm">{n.title}</h4>
                            <p className="text-slate-500 mt-1">{n.body}</p>
                            <span className="text-[9px] text-slate-400 block mt-2">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {consumerTab === 'profile' && (
                  <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold font-heading text-dark mb-6">Profile Settings</h3>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Profile information updated ✅'); }} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Company Name</label>
                          <input type="text" defaultValue="Acme Textiles Pvt Ltd" className="input-field" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Grid Connection ID</label>
                          <input type="text" defaultValue="GRID-MUM-44021" disabled className="input-field bg-slate-50 text-slate-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Authorized Email Address</label>
                        <input type="email" defaultValue={user?.email || 'name@company.com'} className="input-field" />
                      </div>
                      <button className="btn-primary py-3 px-6 text-xs font-bold rounded-xl mt-4">Save Changes</button>
                    </form>
                  </div>
                )}
              </>
            )}

            {/* ========================================================
                PRODUCER DASHBOARD VIEW
                ======================================================== */}
            {currentRole === 'producer' && (
              <>
                {producerTab === 'overview' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    
                    {/* KPI cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Grid Feeder Capacity</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">15.0 MW</div>
                        <div className="text-[10px] text-accent font-bold mt-1">✓ Live Integration</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Subscribed Capacity</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">9.3 MW</div>
                        <div className="text-[10px] text-slate-400 font-sans mt-1">62% Contract Allocation</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Available Spot Capacity</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">5.7 MW</div>
                        <div className="text-[10px] text-primary font-bold mt-1">Ready for exchange trading</div>
                      </div>
                      <div className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/10">
                        <span className="opacity-90 text-[10px] font-bold uppercase tracking-wider">YTD Revenue Traded</span>
                        <div className="text-2xl font-black mt-2 font-heading">₹84,50,000</div>
                        <div className="text-[10px] opacity-80 mt-1">Settled on PXIL/IEX</div>
                      </div>
                    </div>

                    {/* Data Lists */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-heading font-bold text-dark text-sm">Active Grid Generation Log</h3>
                        <span className="text-[10px] text-accent font-bold uppercase bg-accent/10 px-2 py-0.5 rounded-full">Injecting Power</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-500">
                          <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100">
                            <tr>
                              <th className="px-6 py-3">Feeder ID</th>
                              <th className="px-6 py-3">Injected Power (MWh)</th>
                              <th className="px-6 py-3">Grid Frequency</th>
                              <th className="px-6 py-3 text-right">Settlement Rate</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            <tr className="hover:bg-slate-50/50">
                              <td className="px-6 py-4 font-bold text-dark">FEED-PV-SOL-01</td>
                              <td className="px-6 py-4">1,820 MWh</td>
                              <td className="px-6 py-4">49.95 Hz</td>
                              <td className="px-6 py-4 text-right font-bold text-dark">₹4.20 / unit</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50">
                              <td className="px-6 py-4 font-bold text-dark">FEED-PV-HYB-02</td>
                              <td className="px-6 py-4">2,140 MWh</td>
                              <td className="px-6 py-4">50.02 Hz</td>
                              <td className="px-6 py-4 text-right font-bold text-dark">₹4.80 / unit</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {producerTab === 'listings' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
                      <h3 className="text-lg font-bold font-heading text-dark mb-4">Register New Spot Capacity</h3>
                      <form onSubmit={handleAddListing} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Capacity (in MW)</label>
                          <input 
                            required
                            type="number" 
                            step="0.1" 
                            placeholder="e.g. 3.5" 
                            className="input-field"
                            value={newCapacity}
                            onChange={(e) => setNewCapacity(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Base Spot Rate (₹/unit)</label>
                          <input 
                            required
                            type="number" 
                            step="0.05" 
                            placeholder="e.g. 4.10" 
                            className="input-field"
                            value={newRate}
                            onChange={(e) => setNewRate(e.target.value)}
                          />
                        </div>
                        <button type="submit" className="btn-primary w-full py-4 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"><Plus className="w-4 h-4" /> Publish Listing</button>
                      </form>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-heading font-bold text-dark text-sm">Active Marketplace Listings</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-500">
                          <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100">
                            <tr>
                              <th className="px-6 py-3">Capacity</th>
                              <th className="px-6 py-3">Generation Type</th>
                              <th className="px-6 py-3">Target Rate</th>
                              <th className="px-6 py-3">Status</th>
                              <th className="px-6 py-3 text-right">Assigned Buyer</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            {energyListings.map(listing => (
                              <tr key={listing.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-bold text-dark">{listing.capacity}</td>
                                <td className="px-6 py-4">{listing.type}</td>
                                <td className="px-6 py-4 font-semibold text-primary">{listing.rate}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${listing.status === 'Active' ? 'bg-primary/10 text-primary' : listing.status === 'Contracted' ? 'bg-slate-100 text-slate-500' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {listing.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-dark">{listing.buyer}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {producerTab === 'requests' && (
                  <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold font-heading text-dark">Industrial Demand Requests</h3>
                        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New Tender Feed</span>
                      </div>
                      
                      <div className="space-y-4 font-sans text-xs">
                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Acme Textile Mills</span>
                            <h4 className="font-bold text-dark text-sm mt-0.5">Wheeling demand for 4.5 MW load</h4>
                            <p className="text-slate-500 mt-1">Required start date: July 2026. Prefers Solar-Wind hybrid source mix.</p>
                          </div>
                          <button onClick={() => alert('Proposal submitted to Acme Textile Mills!')} className="btn-primary py-2 px-4 text-xs font-bold rounded-lg whitespace-nowrap">Submit Proposal</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {producerTab === 'contracts' && (
                  <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-heading font-bold text-dark text-sm">Active Power Purchase Agreements (PPA)</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-500">
                          <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100">
                            <tr>
                              <th className="px-6 py-3">Contract Ref</th>
                              <th className="px-6 py-3">Buyer Company</th>
                              <th className="px-6 py-3">Contracted Capacity</th>
                              <th className="px-6 py-3">Duration Locked</th>
                              <th className="px-6 py-3 text-right">Regulatory sync</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            <tr className="hover:bg-slate-50/50">
                              <td className="px-6 py-4 font-bold text-dark">PPA-ACME-Spin-01</td>
                              <td className="px-6 py-4">Acme Textiles Ltd</td>
                              <td className="px-6 py-4">4.2 MW</td>
                              <td className="px-6 py-4">15 Years (until 2041)</td>
                              <td className="px-6 py-4 text-right"><span className="text-primary font-bold">Approved Node</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {producerTab === 'documents' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                    {[
                      { title: "SLDC Grid Synchronization.pdf", type: "Grid Approval", size: "3.2 MB" },
                      { title: "Sovereign Transmission SLA.pdf", type: "SLDC Node", size: "1.4 MB" },
                      { title: "Environmental Feeder Audits.pdf", type: "Carbon Offset", size: "6.7 MB" }
                    ].map((doc, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/30 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><FileText className="w-5 h-5" /></div>
                          <div>
                            <h4 className="text-sm font-bold text-dark truncate font-heading">{doc.title}</h4>
                            <span className="text-[10px] text-slate-400">{doc.type}</span>
                          </div>
                        </div>
                        <button onClick={() => alert(`Downloading: ${doc.title}`)} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline mt-4 pt-3 border-t border-slate-50">
                          <Download className="w-4.5 h-4.5" /> Download File ({doc.size})
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {producerTab === 'profile' && (
                  <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold font-heading text-dark mb-6">Producer Plant Settings</h3>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Producer plant settings saved ✅'); }} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Plant Owner Entity</label>
                          <input type="text" defaultValue="Apex CleanEnergy Infrastructure" className="input-field" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Grid Feeder ID</label>
                          <input type="text" defaultValue="FEED-PV-SOL-01" disabled className="input-field bg-slate-50 text-slate-400" />
                        </div>
                      </div>
                      <button className="btn-primary py-3 px-6 text-xs font-bold rounded-xl mt-4">Save Changes</button>
                    </form>
                  </div>
                )}
              </>
            )}

            {/* ========================================================
                ADMIN DASHBOARD VIEW
                ======================================================== */}
            {currentRole === 'admin' && (
              <>
                {adminTab === 'analytics' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    
                    {/* KPI cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active System Users</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">1,482</div>
                        <div className="text-[10px] text-accent font-bold mt-1">↑ 12% Growth this mo</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Unresolved Inquiries</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">{leads.length} Leads</div>
                        <div className="text-[10px] text-yellow-600 font-bold mt-1">Require Feasibility Study</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Grid Wheeling Volume</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">48,210 MWh</div>
                        <div className="text-[10px] text-slate-400 font-sans mt-1">Total platform allocation</div>
                      </div>
                      <div className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/10">
                        <span className="opacity-90 text-[10px] font-bold uppercase tracking-wider">Total Revenue Managed</span>
                        <div className="text-2xl font-black mt-2 font-heading">₹4,89,00,000</div>
                        <div className="text-[10px] opacity-80 mt-1">Locked platform contracts</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-heading font-bold text-dark text-sm">System Operations Log</h3>
                        <span className="text-[10px] text-primary font-bold uppercase bg-primary/10 px-2 py-0.5 rounded-full">All Nodes Normal</span>
                      </div>
                      <div className="p-8 text-center text-slate-400 text-xs font-sans">
                        📊 Live interactive system data visualizations loaded on demand. No connectivity issues detected.
                      </div>
                    </div>
                  </div>
                )}

                {adminTab === 'users' && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h3 className="font-heading font-bold text-dark text-sm">User Management</h3>
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search user directory..." className="w-full pl-9 pr-4 py-2 bg-slate-50 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-primary font-sans" />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-500">
                        <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-3">Account Name</th>
                            <th className="px-6 py-3">Corporate Email</th>
                            <th className="px-6 py-3">Assigned Role</th>
                            <th className="px-6 py-3">Created Date</th>
                            <th className="px-6 py-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 font-bold text-dark">Rajesh Mehta</td>
                            <td className="px-6 py-4">rajesh@indotex.com</td>
                            <td className="px-6 py-4 uppercase font-semibold text-[10px] text-slate-600">Consumer</td>
                            <td className="px-6 py-4">June 02, 2026</td>
                            <td className="px-6 py-4 text-right"><span className="text-primary font-bold">Active</span></td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 font-bold text-dark">Apex CleanEnergy</td>
                            <td className="px-6 py-4">ops@apexclean.com</td>
                            <td className="px-6 py-4 uppercase font-semibold text-[10px] text-slate-600">Producer</td>
                            <td className="px-6 py-4">May 12, 2026</td>
                            <td className="px-6 py-4 text-right"><span className="text-primary font-bold">Active</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {adminTab === 'leads' && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="font-heading font-bold text-dark text-sm">Lead Management</h3>
                    </div>
                    {leads.length === 0 ? (
                      <div className="p-20 text-center text-slate-400 font-sans text-xs">No active proposal requests found.</div>
                    ) : (
                      <div className="divide-y divide-slate-100 text-xs">
                        {leads.map((lead) => (
                          <div key={lead._id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                            <div className="space-y-1">
                              <h4 className="font-bold text-dark text-sm font-heading">{lead.name}</h4>
                              <p className="text-slate-500 font-sans text-xs">Company: <strong>{lead.company}</strong> | Contact: {lead.phone} | {lead.email}</p>
                              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full inline-block font-sans mt-1">Monthly Bill: ₹{(lead.bill || 0).toLocaleString('en-IN')}</span>
                            </div>
                            <button 
                              onClick={() => alert(`Creating feasibility report for: ${lead.company}`)}
                              className="btn-primary py-2.5 px-4 text-xs font-bold rounded-lg shrink-0"
                            >
                              Initialize PPA Study
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {adminTab === 'proposals' && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="font-heading font-bold text-dark text-sm">Active PPA Proposal Pipeline</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-500">
                        <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-3">Proposal ID</th>
                            <th className="px-6 py-3">Client Company</th>
                            <th className="px-6 py-3">Allocated Load</th>
                            <th className="px-6 py-3">Base Tariff Target</th>
                            <th className="px-6 py-3 text-right">Negotiation Stage</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 font-bold text-dark">PROP-ACME-4290</td>
                            <td className="px-6 py-4">Acme Textiles Pvt Ltd</td>
                            <td className="px-6 py-4">4.2 MW</td>
                            <td className="px-6 py-4 font-semibold text-primary">₹5.20 / unit</td>
                            <td className="px-6 py-4 text-right"><span className="text-yellow-600 font-bold">Offer Published</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {adminTab === 'marketplace' && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="font-heading font-bold text-dark text-sm">Marketplace Capacity Moderation</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-500">
                        <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-3">Producer Entity</th>
                            <th className="px-6 py-3">Capacity Offered</th>
                            <th className="px-6 py-3">Base Price</th>
                            <th className="px-6 py-3">Grid Point</th>
                            <th className="px-6 py-3 text-right">Moderation Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 font-bold text-dark">Apex CleanEnergy</td>
                            <td className="px-6 py-4">1.8 MW spot</td>
                            <td className="px-6 py-4 font-semibold text-primary">₹4.80 / unit</td>
                            <td className="px-6 py-4">GRID-PV-HYB-02</td>
                            <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                              <button onClick={() => alert('Capacity approved on exchange marketplace! ⚡')} className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg font-bold text-[10px]">Approve</button>
                              <button onClick={() => alert('Capacity listing flagged for audit ❌')} className="bg-red-500 hover:bg-red-650 text-white px-3 py-1.5 rounded-lg font-bold text-[10px]">Flag Listing</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {adminTab === 'content' && (
                  <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold font-heading text-dark mb-6">Portal Configuration</h3>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Content sync successful ✅'); }} className="space-y-4 font-sans text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Base Cross-Subsidy Surcharges (CSS)</label>
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
              </>
            )}

          </div>
        </main>

      </div>
    </ProtectedRoute>
  );
}