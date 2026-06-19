'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/services/api'; 
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  TrendingUp, User, Globe2, Zap, Landmark, HelpCircle, FileText, Settings, 
  Search, Filter, Plus, Shield, CheckCircle2, ChevronRight, BarChart3, 
  Database, Award, Trash, Edit, CheckSquare, Layers, Download, Clock, UserCheck, Play, Factory, Send, X
} from 'lucide-react';

export default function AdminPage() {
  const [activeModule, setActiveModule] = useState<'analytics' | 'users' | 'consumers' | 'producers' | 'listings' | 'requests' | 'proposals' | 'consultations' | 'documents' | 'notifications' | 'logs' | 'assessments' | 'crm' | 'communications' | 'content' | 'insights' | 'settings'>('analytics');
  
  // Communication Center states
  const [notificationLogs, setNotificationLogs] = useState<any[]>([]);
  const [broadcastType, setBroadcastType] = useState<'in_app' | 'email' | 'sms'>('in_app');
  const [broadcastUserType, setBroadcastUserType] = useState<'all' | 'consumer' | 'producer'>('all');
  
  // Security & Compliance states
  const [securityMetrics, setSecurityMetrics] = useState<any>(null);
  const [securityFilters, setSecurityFilters] = useState({ action: '', ip: '', email: '' });
  
  // Live KPI Metrics state
  const [metrics, setMetrics] = useState<any>({
    totalUsers: 0,
    consumers: 0,
    producers: 0,
    activeListings: 0,
    consultationRequests: 0,
    openOpportunities: 0,
    proposals: 0,
    revenuePipeline: 0,
    recentActivity: []
  });

  const [biData, setBiData] = useState<any>(null);
  const [biTab, setBiTab] = useState<'executive' | 'kpi' | 'trends' | 'marketplace' | 'revenue'>('executive');
  const [biLoading, setBiLoading] = useState(true);

  const fetchBiData = async () => {
    setBiLoading(true);
    try {
      const data = await api.get('/analytics');
      if (data) {
        setBiData(data);
      }
    } catch (err) {
      console.error('Error fetching BI report:', err);
    } finally {
      setBiLoading(false);
    }
  };

  // Module datasets
  const [users, setUsers] = useState<any[]>([]);
  const [consumers, setConsumers] = useState<any[]>([]);
  const [producers, setProducers] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [energyRequirements, setEnergyRequirements] = useState<any[]>([]);
  const [marketplaceOpps, setMarketplaceOpps] = useState<any[]>([]);
  const [selectedRequirementForMatch, setSelectedRequirementForMatch] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [crmAnalytics, setCrmAnalytics] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [assignUserId, setAssignUserId] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [docFilter, setDocFilter] = useState('all');
  
  // Modal / Editing states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<'user' | 'consumer' | 'producer' | 'proposal' | 'consultation' | 'assessment' | null>(null);
  
  // Input fields for creation
  const [broadcastTarget, setBroadcastTarget] = useState('all');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const [newProposal, setNewProposal] = useState({
    userId: '',
    producerId: '',
    proposalNumber: '',
    capacityRequirement: '',
    estimatedTariff: '',
    validUntil: ''
  });

  // Fetch KPI dashboard metrics
  const fetchMetrics = async () => {
    try {
      const data = await api.get('/users/metrics');
      if (data) {
        setMetrics(data);
      }
    } catch (err) {
      console.error('Error fetching metrics:', err);
    }
  };

  // Main data loader based on active tab
  const fetchModuleData = async () => {
    setLoading(true);
    try {
      if (activeModule === 'analytics') {
        await fetchMetrics();
        await fetchBiData();
      } else if (activeModule === 'users') {
        const data = await api.get('/users');
        setUsers(Array.isArray(data) ? data : []);
      } else if (activeModule === 'consumers') {
        const data = await api.get('/consumers');
        setConsumers(Array.isArray(data) ? data : []);
      } else if (activeModule === 'producers') {
        const data = await api.get('/producers');
        setProducers(Array.isArray(data) ? data : []);
      } else if (activeModule === 'listings') {
        const data = await api.get('/listings');
        setListings(Array.isArray(data) ? data : []);
      } else if (activeModule === 'requests') {
        const data = await api.get('/opportunities');
        setRequests(Array.isArray(data) ? data : []);
        
        try {
          const reqsData = await api.get('/requirements');
          setEnergyRequirements(Array.isArray(reqsData) ? reqsData : []);
          
          const listingsData = await api.get('/listings');
          setListings(Array.isArray(listingsData) ? listingsData : []);

          const mOpps = await api.get('/marketplace-opportunities');
          setMarketplaceOpps(Array.isArray(mOpps) ? mOpps : []);
        } catch (err) {
          console.error('Error fetching marketplace control center data:', err);
        }
      } else if (activeModule === 'proposals') {
        const data = await api.get('/proposals');
        setProposals(Array.isArray(data) ? data : []);
        const usersRes = await api.get('/users');
        setUsers(Array.isArray(usersRes) ? usersRes : []);

        try {
          const contractsData = await api.get('/contracts');
          setContracts(Array.isArray(contractsData) ? contractsData : []);
        } catch (err) {
          console.error('Error loading contracts in proposals tab:', err);
        }
      } else if (activeModule === 'consultations') {
        const data = await api.get('/consultations');
        setConsultations(Array.isArray(data) ? data : []);
        const usersRes = await api.get('/users');
        setUsers(Array.isArray(usersRes) ? usersRes : []);
      } else if (activeModule === 'documents') {
        const data = await api.get('/documents');
        setDocuments(Array.isArray(data) ? data : []);
      } else if (activeModule === 'logs') {
        const queryParams = new URLSearchParams(securityFilters).toString();
        const data = await api.get(`/security/audit-logs?${queryParams}`);
        setActivityLogs(Array.isArray(data) ? data : []);
        try {
          const metricsData = await api.get('/security/session-metrics');
          setSecurityMetrics(metricsData);
        } catch (err) {
          console.error('Error loading session metrics:', err);
        }
        const usersData = await api.get('/users');
        setUsers(Array.isArray(usersData) ? usersData : []);
      } else if (activeModule === 'assessments') {
        const data = await api.get('/assessments');
        setAssessments(Array.isArray(data) ? data : []);
      } else if (activeModule === 'crm') {
        const data = await api.get('/leads');
        setLeads(Array.isArray(data) ? data : []);
        
        try {
          const analyticsData = await api.get('/leads/analytics');
          setCrmAnalytics(analyticsData);
        } catch (err) {
          console.error('Error fetching CRM analytics:', err);
        }

        const usersRes = await api.get('/users');
        setUsers(Array.isArray(usersRes) ? usersRes : []);

        const assessData = await api.get('/assessments');
        setAssessments(Array.isArray(assessData) ? assessData : []);

        const oppsData = await api.get('/marketplace-opportunities');
        setMarketplaceOpps(Array.isArray(oppsData) ? oppsData : []);

        const propData = await api.get('/proposals');
        setProposals(Array.isArray(propData) ? propData : []);
      } else if (activeModule === 'communications') {
        const data = await api.get('/notifications/logs');
        setNotificationLogs(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(`Error loading dataset for active module ${activeModule}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchBiData();
  }, []);

  useEffect(() => {
    fetchModuleData();
    setSearchTerm('');
  }, [activeModule]);

  // Actions for User Management
  const handleToggleUserStatus = async (userId: string) => {
    try {
      const data = await api.put(`/users/${userId}/status`, {});
      setUsers(users.map(u => u._id === userId ? { ...u, accountStatus: data.status } : u));
      fetchMetrics();
      alert(`User account status updated successfully ✅`);
    } catch (err: any) {
      alert(`Error updating user status: ${err.message}`);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.put(`/users/${editingItem._id}`, editingItem);
      setUsers(users.map(u => u._id === editingItem._id ? { ...u, ...data } : u));
      setEditingItem(null);
      setEditingType(null);
      alert('User details updated successfully ✅');
    } catch (err: any) {
      alert(`Error updating user: ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This will also remove any consumer or producer profiles.')) return;
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
      fetchMetrics();
      alert('User account and profiles deleted successfully ✅');
    } catch (err: any) {
      alert(`Error deleting user: ${err.message}`);
    }
  };

  // Actions for Consumer Profile Management
  const handleUpdateConsumer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.put(`/consumers/profile/${editingItem._id}`, editingItem);
      setConsumers(consumers.map(c => c._id === editingItem._id ? { ...c, ...data } : c));
      setEditingItem(null);
      setEditingType(null);
      alert('Consumer profile updated successfully ✅');
    } catch (err: any) {
      alert(`Error updating consumer profile: ${err.message}`);
    }
  };

  // Actions for Producer Profile Management
  const handleUpdateProducer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.put(`/producers/profile/${editingItem._id}`, editingItem);
      setProducers(producers.map(p => p._id === editingItem._id ? { ...p, ...data } : p));
      setEditingItem(null);
      setEditingType(null);
      alert('Producer profile updated successfully ✅');
    } catch (err: any) {
      alert(`Error updating producer profile: ${err.message}`);
    }
  };

  // Actions for Consultation Management
  const handleAssignAdmin = async (consultationId: string, assignedAdmin: string) => {
    try {
      const data = await api.put(`/consultations/${consultationId}`, { assignedAdmin });
      setConsultations(consultations.map(c => c._id === consultationId ? { ...c, assignedAdmin: data.assignedAdmin } : c));
      alert('Expert Admin assigned successfully ✅');
    } catch (err: any) {
      alert(`Error assigning consultation: ${err.message}`);
    }
  };

  const handleUpdateConsultationStatus = async (consultationId: string, status: string) => {
    try {
      const data = await api.put(`/consultations/${consultationId}`, { status });
      setConsultations(consultations.map(c => c._id === consultationId ? { ...c, status: data.status } : c));
      alert(`Consultation status set to ${status} successfully ✅`);
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  const handleUpdateConsultationNotes = async (consultationId: string, notes: string) => {
    try {
      const data = await api.put(`/consultations/${consultationId}`, { notes });
      setConsultations(consultations.map(c => c._id === consultationId ? { ...c, notes: data.notes } : c));
      alert('Consultation notes updated successfully ✅');
    } catch (err: any) {
      alert(`Error saving notes: ${err.message}`);
    }
  };

  // Actions for Energy Listings
  const handleModerateListing = async (listingId: string, status: string) => {
    try {
      const data = await api.put(`/listings/${listingId}`, { status });
      setListings(listings.map(l => l._id === listingId ? { ...l, status: data.status } : l));
      fetchMetrics();
      alert(`Listing status updated to ${status} successfully ✅`);
    } catch (err: any) {
      alert(`Error moderating listing: ${err.message}`);
    }
  };

  // Actions for Buyer Opportunities (Marketplace Requests)
  const handleUpdateOpportunityStatus = async (oppId: string, status: string) => {
    try {
      const data = await api.put(`/opportunities/${oppId}`, { status });
      setRequests(requests.map(r => r._id === oppId ? { ...r, status: data.status } : r));
      alert(`Marketplace request status updated to ${status} successfully ✅`);
    } catch (err: any) {
      alert(`Error matching request: ${err.message}`);
    }
  };

  const handleMatchB2B = async (requirementId: string, consumerId: string, listingId: string, producerId: string) => {
    try {
      await api.post('/marketplace-opportunities', {
        consumerId,
        producerId,
        listingId,
        requirementId,
        notes: `Matched manually by Admin on ${new Date().toLocaleDateString()}`
      });
      alert('Manual B2B Match created successfully! ⚡');
      setSelectedRequirementForMatch(null);
      fetchModuleData();
    } catch (err: any) {
      alert(err.message || 'Failed to create B2B match ❌');
    }
  };

  const handleUpdateMarketplaceOppStatus = async (oppId: string, status: string) => {
    try {
      await api.put(`/marketplace-opportunities/${oppId}`, { status });
      alert(`Opportunity status updated to ${status} successfully ✅`);
      fetchModuleData();
    } catch (err: any) {
      alert(err.message || 'Failed to update opportunity status ❌');
    }
  };

  // Actions for Proposal Management
  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProposal.userId || !newProposal.proposalNumber || !newProposal.capacityRequirement || !newProposal.estimatedTariff) {
      alert('Please fill out all required fields');
      return;
    }
    try {
      const data = await api.post('/proposals', {
        ...newProposal,
        estimatedTariff: Number(newProposal.estimatedTariff)
      });
      setProposals([data, ...proposals]);
      setNewProposal({
        userId: '',
        producerId: '',
        proposalNumber: '',
        capacityRequirement: '',
        estimatedTariff: '',
        validUntil: ''
      });
      fetchMetrics();
      alert('Proposal generated and stored in Pipeline successfully ✅');
    } catch (err: any) {
      alert(`Error creating proposal: ${err.message}`);
    }
  };

  const handleUpdateProposalStatus = async (proposalId: string, status: string) => {
    try {
      const data = await api.put(`/proposals/${proposalId}`, { status });
      setProposals(proposals.map(p => p._id === proposalId ? { ...p, status: data.status } : p));
      fetchMetrics();
      alert(`Proposal status updated to ${status} successfully ✅`);
      // Reload contracts if proposal is approved to capture the auto-drafted contract
      if (status === 'approved') {
        const contractsData = await api.get('/contracts');
        setContracts(Array.isArray(contractsData) ? contractsData : []);
      }
    } catch (err: any) {
      alert(`Error updating proposal status: ${err.message}`);
    }
  };

  const handleUpdateContractStatus = async (contractId: string, status: string) => {
    try {
      const data = await api.put(`/contracts/${contractId}`, { status });
      setContracts(contracts.map(c => c._id === contractId ? { ...c, status: data.status } : c));
      alert(`Contract status updated to ${status} successfully ✅`);
    } catch (err: any) {
      alert(`Error updating contract: ${err.message}`);
    }
  };

  const handleUpdateLeadField = async (leadId: string, fields: any) => {
    try {
      const data = await api.put(`/leads/${leadId}`, fields);
      setLeads(leads.map(l => l._id === leadId ? { ...l, ...data } : l));
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead({ ...selectedLead, ...data });
      }
      alert('Lead details updated successfully! ✅');
      const analyticsData = await api.get('/leads/analytics');
      setCrmAnalytics(analyticsData);
    } catch (err: any) {
      alert(err.message || 'Failed to update lead ❌');
    }
  };

  const handleAddLeadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    try {
      const data = await api.post(`/leads/${selectedLead._id}/notes`, { content: newNoteText });
      setLeads(leads.map(l => l._id === selectedLead._id ? data : l));
      setSelectedLead(data);
      setNewNoteText('');
      alert('Lead note added successfully! ✍️');
    } catch (err: any) {
      alert(err.message || 'Failed to add note ❌');
    }
  };

  const handleAssignLead = async (leadId: string, userId: string) => {
    try {
      const data = await api.post(`/leads/${leadId}/assign`, { assignedTo: userId });
      setLeads(leads.map(l => l._id === leadId ? data : l));
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead(data);
      }
      alert('Lead assignment updated successfully! 👥');
    } catch (err: any) {
      alert(err.message || 'Failed to assign lead ❌');
    }
  };

  const handleUpdateAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.put(`/assessments/${editingItem._id}`, editingItem);
      setAssessments(assessments.map(a => a._id === editingItem._id ? { ...a, ...data } : a));
      setEditingItem(null);
      setEditingType(null);
      fetchMetrics();
      alert('Energy Assessment study updated successfully ✅');
    } catch (err: any) {
      alert(`Error updating assessment: ${err.message}`);
    }
  };

  const handleUpdateAssessmentStatus = async (assessmentId: string, status: string) => {
    try {
      const data = await api.put(`/assessments/${assessmentId}`, { status });
      setAssessments(assessments.map(a => a._id === assessmentId ? { ...a, status: data.status } : a));
      fetchMetrics();
      alert(`Assessment status updated to ${status} successfully ✅`);
    } catch (err: any) {
      alert(`Error updating assessment status: ${err.message}`);
    }
  };

  // Actions for Document Management
  const handleDeleteDocument = async (docId: string) => {
    if (!confirm('Are you sure you want to permanently delete this document from the vault?')) return;
    try {
      await api.delete(`/documents/${docId}`);
      setDocuments(documents.filter(d => d._id !== docId));
      alert('Document removed successfully ✅');
    } catch (err: any) {
      alert(`Error deleting document: ${err.message}`);
    }
  };

  // Actions for Notification Center
  const handleBroadcastNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) {
      alert('Please provide title and message content');
      return;
    }
    try {
      const data = await api.post('/notifications', {
        userId: broadcastTarget,
        title: broadcastTitle,
        message: broadcastMessage
      });
      setBroadcastTitle('');
      setBroadcastMessage('');
      alert(data.message || 'Notification sent successfully ✅');
    } catch (err: any) {
      alert(`Error sending notification: ${err.message}`);
    }
  };

  // Universal Filter/Search Helpers
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.phone?.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.accountStatus === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredConsumers = consumers.filter(c => {
    return c.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           c.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           c.industryType?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredProducers = producers.filter(p => {
    return p.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.energyType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.location?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredListings = listings.filter(l => {
    return l.energyType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           l.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           l.userId?.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredRequests = requests.filter(r => {
    return r.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           r.industryType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           r.location?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredProposals = proposals.filter(p => {
    return p.proposalNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.userId?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.userId?.firstName?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredDocuments = documents.filter(d => {
    const matchesSearch = d.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.documentType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.userId?.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = docFilter === 'all' || d.documentType === docFilter;
    return matchesSearch && matchesType;
  });

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
              <span className="text-[9px] text-slate-500 font-bold uppercase mt-0.5 tracking-wider">Enterprise Controller</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <button 
              onClick={() => setActiveModule('analytics')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'analytics' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <BarChart3 className="w-4 h-4" /> 1. Executive Board
            </button>
            <button 
              onClick={() => setActiveModule('users')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'users' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <User className="w-4 h-4" /> 2. User Directory
            </button>
            <button 
              onClick={() => setActiveModule('consumers')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'consumers' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Layers className="w-4 h-4" /> 3. Consumer Accounts
            </button>
            <button 
              onClick={() => setActiveModule('producers')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'producers' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Factory className="w-4 h-4" /> 4. Producer Accounts
            </button>
            <button 
              onClick={() => setActiveModule('listings')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'listings' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Zap className="w-4 h-4" /> 5. Energy Listings
            </button>
            <button 
              onClick={() => setActiveModule('requests')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'requests' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Globe2 className="w-4 h-4" /> 6. Buyer RFPs
            </button>
            <button 
              onClick={() => setActiveModule('proposals')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'proposals' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <TrendingUp className="w-4 h-4" /> 7. Proposal Pipeline
            </button>
            <button 
              onClick={() => setActiveModule('consultations')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'consultations' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <CheckSquare className="w-4 h-4" /> 8. Consultations
            </button>
            <button 
              onClick={() => setActiveModule('documents')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'documents' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" /> 9. Document Vault
            </button>
            <button 
              onClick={() => setActiveModule('notifications')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'notifications' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Send className="w-4 h-4" /> 10. Notification Hub
            </button>
            <button 
              onClick={() => setActiveModule('logs')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'logs' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Clock className="w-4 h-4" /> 11. Security Audit Logs
            </button>
            <button 
              onClick={() => setActiveModule('assessments')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'assessments' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Award className="w-4 h-4" /> 12. Energy Assessments
            </button>
            <button 
              onClick={() => setActiveModule('crm')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'crm' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <TrendingUp className="w-4 h-4" /> 13. CRM Sales Console
            </button>
            <button 
              onClick={() => setActiveModule('communications')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'communications' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Send className="w-4 h-4" /> 14. Communication Center
            </button>
            <Link 
              href="/admin/employees"
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors hover:bg-slate-800 hover:text-white text-slate-300"
            >
              <User className="w-4 h-4" /> 15. Employees
            </Link>
            <button 
              onClick={() => setActiveModule('content')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'content' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" /> 16. Content Management
            </button>
            <button 
              onClick={() => setActiveModule('insights')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'insights' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <TrendingUp className="w-4 h-4" /> 17. Platform Insights
            </button>
            <button 
              onClick={() => setActiveModule('settings')} 
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${activeModule === 'settings' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Settings className="w-4 h-4" /> 18. Settings
            </button>
          </nav>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col min-w-0 bg-light">
          
          {/* Header */}
          <header className="bg-white border-b border-slate-100 px-6 py-5 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest font-heading">Operations Portal</span>
              <h1 className="text-xl font-bold font-heading text-dark mt-0.5 capitalize">
                {activeModule.replace('analytics', 'Executive Dashboard').replace('logs', 'Security Audit Logs').replace('requests', 'Marketplace Buyer Requests').replace('listings', 'Energy Listings Moderator').replace('content', 'Content Management').replace('insights', 'Platform Insights').replace('settings', 'System Settings')}
              </h1>
            </div>
            <span className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold px-3 py-1.5 rounded-xl font-mono flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> SYSTEM ONLINE
            </span>
          </header>

          <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Users</span>
                <span className="text-[10px] font-black text-slate-450 mt-2 block uppercase font-mono tracking-tight text-slate-400">AWAITING SYNC</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Consumers</span>
                <span className="text-[10px] font-black text-slate-450 mt-2 block uppercase font-mono tracking-tight text-slate-400">AWAITING SYNC</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Producers</span>
                <span className="text-[10px] font-black text-slate-450 mt-2 block uppercase font-mono tracking-tight text-slate-400">AWAITING SYNC</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Energy Listings</span>
                <span className="text-[10px] font-black text-slate-450 mt-2 block uppercase font-mono tracking-tight text-slate-400">AWAITING SYNC</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Buyer RFPs</span>
                <span className="text-[10px] font-black text-slate-450 mt-2 block uppercase font-mono tracking-tight text-slate-400">AWAITING SYNC</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Consultations</span>
                <span className="text-[10px] font-black text-slate-450 mt-2 block uppercase font-mono tracking-tight text-slate-400">AWAITING SYNC</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Revenue Pipeline</span>
                <span className="text-[10px] font-black text-slate-450 mt-2 block uppercase font-mono tracking-tight text-slate-400">AWAITING SYNC</span>
              </div>
            </div>

            {/* Loading Indicator */}
            {loading && activeModule !== 'analytics' ? (
              <div className="p-20 text-center text-slate-400 font-sans text-xs flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                Syncing database collections...
              </div>
            ) : (
              <div className="space-y-6">

                {/* 1. Analytics Module (Executive Board) */}
                {activeModule === 'analytics' && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* BI Tab Navigation */}
                    <div className="flex flex-wrap border-b border-slate-200 pb-px gap-4 md:gap-6 text-[10px] md:text-xs font-heading font-bold uppercase tracking-wider">
                      <button 
                        onClick={() => setBiTab('executive')}
                        className={`pb-4 border-b-2 transition-all ${biTab === 'executive' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                      >
                        Executive Dashboard
                      </button>
                      <button 
                        onClick={() => setBiTab('kpi')}
                        className={`pb-4 border-b-2 transition-all ${biTab === 'kpi' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                      >
                        KPI Reports
                      </button>
                      <button 
                        onClick={() => setBiTab('trends')}
                        className={`pb-4 border-b-2 transition-all ${biTab === 'trends' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                      >
                        Trend Reports
                      </button>
                      <button 
                        onClick={() => setBiTab('marketplace')}
                        className={`pb-4 border-b-2 transition-all ${biTab === 'marketplace' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                      >
                        Marketplace Analytics
                      </button>
                      <button 
                        onClick={() => setBiTab('revenue')}
                        className={`pb-4 border-b-2 transition-all ${biTab === 'revenue' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                      >
                        Revenue Analytics
                      </button>
                    </div>

                    {biLoading ? (
                      <div className="text-center py-20 text-xs text-slate-400 font-sans">
                        Compiling platform business intelligence data...
                      </div>
                    ) : biData ? (
                      <div className="space-y-6">
                        
                        {/* A. EXECUTIVE DASHBOARD SUB-TAB */}
                        {biTab === 'executive' && (
                          <div className="space-y-6">
                            {/* KPI Metrics Summary Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-heading">Total Platform Users</span>
                                <h3 className="text-3xl font-black text-dark font-heading mt-1">{biData.executiveSummary.totalUsers}</h3>
                                <div className="mt-2 text-[10px] text-slate-500 font-sans flex justify-between">
                                  <span>{biData.executiveSummary.totalConsumers} Consumers</span>
                                  <span>{biData.executiveSummary.totalProducers} Producers</span>
                                </div>
                              </div>
                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-heading">Active Pipeline Volume</span>
                                <h3 className="text-3xl font-black text-primary font-heading mt-1">₹{biData.executiveSummary.pipelineRevenue?.toLocaleString('en-IN')}</h3>
                                <p className="text-[10px] text-slate-500 font-sans mt-2">Sum of pending/draft proposals</p>
                              </div>
                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-heading">Closed-Won Revenue</span>
                                <h3 className="text-3xl font-black text-emerald-600 font-heading mt-1">₹{biData.executiveSummary.totalRevenue?.toLocaleString('en-IN')}</h3>
                                <p className="text-[10px] text-slate-500 font-sans mt-2">Sum of approved proposals</p>
                              </div>
                            </div>

                            {/* Live transaction progress bar */}
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                              <h4 className="text-xs font-bold font-heading text-dark mb-4">Closed PPA Match Progress Ratio</h4>
                              <div className="space-y-2 font-sans text-xs">
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-500">Total Approved Contracts / Opportunities Ratio</span>
                                  <strong className="text-primary font-mono">{biData.executiveSummary.totalContracts} of {biData.executiveSummary.totalOpportunities} Matches Approved</strong>
                                </div>
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-primary h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${biData.executiveSummary.totalOpportunities > 0 ? (biData.executiveSummary.totalContracts / biData.executiveSummary.totalOpportunities * 100) : 0}%` }} 
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Bottom panels */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
                                <h4 className="text-xs font-bold text-dark font-heading uppercase">Client Assessments & Consults</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold font-heading">Site Audits</span>
                                    <h4 className="text-xl font-bold font-heading text-dark mt-1">{biData.executiveSummary.totalConsultations}</h4>
                                  </div>
                                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold font-heading">Assessments</span>
                                    <h4 className="text-xl font-bold font-heading text-dark mt-1">{biData.executiveSummary.totalAssessments}</h4>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
                                <h4 className="text-xs font-bold text-dark font-heading uppercase">Live Security Actions Log</h4>
                                <div className="space-y-2 text-[10px] font-mono text-slate-500">
                                  {metrics.recentActivity && metrics.recentActivity.length > 0 ? (
                                    metrics.recentActivity.slice(0, 3).map((log: any, i: number) => (
                                      <div key={i} className="flex justify-between border-b border-slate-50 pb-1">
                                        <span className="text-slate-600 truncate max-w-[200px]">{log.action}: {log.details}</span>
                                        <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-center py-4 text-slate-400">No operational alerts triggered.</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* B. KPI REPORTS SUB-TAB */}
                        {biTab === 'kpi' && (
                          <div className="space-y-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                              <h4 className="text-xs font-bold text-dark font-heading uppercase mb-4">Core KPI Metric Distributions</h4>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                <div className="border border-slate-100 p-4 rounded-2xl text-center space-y-1">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Listings</span>
                                  <h3 className="text-2xl font-black text-primary font-heading">{biData.executiveSummary.totalListings}</h3>
                                </div>
                                <div className="border border-slate-100 p-4 rounded-2xl text-center space-y-1">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Matched Opps</span>
                                  <h3 className="text-2xl font-black text-primary font-heading">{biData.executiveSummary.totalOpportunities}</h3>
                                </div>
                                <div className="border border-slate-100 p-4 rounded-2xl text-center space-y-1">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Proposals Issued</span>
                                  <h3 className="text-2xl font-black text-primary font-heading">{biData.executiveSummary.totalProposals}</h3>
                                </div>
                                <div className="border border-slate-100 p-4 rounded-2xl text-center space-y-1">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Contracts Active</span>
                                  <h3 className="text-2xl font-black text-primary font-heading">{biData.executiveSummary.totalContracts}</h3>
                                </div>
                              </div>
                            </div>

                            {/* Detailed conversion statuses */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
                                <h4 className="text-xs font-bold text-dark font-heading uppercase">Buyer Opp Match Stages</h4>
                                <div className="space-y-2 text-xs font-sans">
                                  {Object.entries(biData.kpiBreakdowns.opportunities).map(([stage, count]: any) => (
                                    <div key={stage} className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                      <span className="capitalize text-slate-500">{stage}</span>
                                      <strong className="text-dark font-bold font-mono">{count}</strong>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
                                <h4 className="text-xs font-bold text-dark font-heading uppercase">Proposal Pipeline Breakdown</h4>
                                <div className="space-y-2 text-xs font-sans">
                                  {Object.entries(biData.kpiBreakdowns.proposals).map(([status, count]: any) => (
                                    <div key={status} className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                      <span className="capitalize text-slate-500">{status.replace('_', ' ')}</span>
                                      <strong className="text-dark font-bold font-mono">{count}</strong>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* C. TREND REPORTS SUB-TAB */}
                        {biTab === 'trends' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              
                              {/* Users Growth Chart */}
                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                                <h4 className="text-xs font-bold text-dark font-heading uppercase mb-4">Platform Signups Trend (6 Months)</h4>
                                <div className="h-44 flex items-end justify-between px-2 pt-6">
                                  {biData.trendReports.map((trend: any, idx: number) => {
                                    const maxVal = Math.max(...biData.trendReports.map((t: any) => t.newUsers)) || 1;
                                    const heightPct = (trend.newUsers / maxVal) * 80; // scale to max 80%
                                    return (
                                      <div key={idx} className="flex flex-col items-center group w-12">
                                        <div className="text-[10px] font-bold text-primary font-mono mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          {trend.newUsers}
                                        </div>
                                        <div 
                                          className="w-6 bg-primary/20 hover:bg-primary rounded-t-md transition-colors" 
                                          style={{ height: `${Math.max(heightPct, 5)}%` }} 
                                        />
                                        <span className="text-[9px] text-slate-400 font-bold mt-2 uppercase font-mono">{trend.label.split(' ')[0]}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Revenue Growth Chart */}
                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                                <h4 className="text-xs font-bold text-dark font-heading uppercase mb-4">Monthly Revenue Ingestion (6 Months)</h4>
                                <div className="h-44 flex items-end justify-between px-2 pt-6">
                                  {biData.trendReports.map((trend: any, idx: number) => {
                                    const maxVal = Math.max(...biData.trendReports.map((t: any) => t.revenue)) || 1;
                                    const heightPct = (trend.revenue / maxVal) * 80;
                                    return (
                                      <div key={idx} className="flex flex-col items-center group w-12">
                                        <div className="text-[9px] font-bold text-emerald-600 font-mono mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          ₹{(trend.revenue / 100000).toFixed(1)}L
                                        </div>
                                        <div 
                                          className="w-6 bg-emerald-100 hover:bg-emerald-500 rounded-t-md transition-colors" 
                                          style={{ height: `${Math.max(heightPct, 5)}%` }} 
                                        />
                                        <span className="text-[9px] text-slate-400 font-bold mt-2 uppercase font-mono">{trend.label.split(' ')[0]}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                            </div>
                          </div>
                        )}

                        {/* D. MARKETPLACE ANALYTICS SUB-TAB */}
                        {biTab === 'marketplace' && (
                          <div className="space-y-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                              <h4 className="text-xs font-bold text-dark font-heading uppercase mb-4">Capacity & Tariff Averages</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-50 p-6 rounded-2xl text-center space-y-1">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest font-heading">Total Grid Capacity</span>
                                  <h3 className="text-2xl font-black text-primary font-heading">{biData.marketplace.totalAvailableCapacity} MW</h3>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl text-center space-y-1">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest font-heading">Average Tariff</span>
                                  <h3 className="text-2xl font-black text-primary font-heading">₹{biData.marketplace.averageListingTariff} / unit</h3>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl text-center space-y-1">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest font-heading">Min / Max Range</span>
                                  <h3 className="text-xl font-black text-primary font-heading">₹{biData.marketplace.minTariff} - ₹{biData.marketplace.maxTariff}</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* E. REVENUE ANALYTICS SUB-TAB */}
                        {biTab === 'revenue' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              
                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
                                <h4 className="text-xs font-bold text-dark font-heading uppercase">Closed-Won & Active Pipeline</h4>
                                <div className="space-y-4">
                                  <div className="bg-emerald-50 p-4 rounded-2xl">
                                    <span className="text-[10px] text-emerald-700 uppercase font-bold font-heading">Closed-Won Revenue</span>
                                    <h3 className="text-2xl font-black text-emerald-800 font-heading">₹{biData.executiveSummary.totalRevenue?.toLocaleString('en-IN')}</h3>
                                  </div>
                                  <div className="bg-slate-50 p-4 rounded-2xl">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold font-heading">Under Review / Negotiation Pipeline</span>
                                    <h3 className="text-2xl font-black text-slate-800 font-heading">₹{biData.executiveSummary.pipelineRevenue?.toLocaleString('en-IN')}</h3>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
                                <h4 className="text-xs font-bold text-dark font-heading uppercase">Revenue Contract Breakdown</h4>
                                <div className="space-y-2 text-xs font-sans">
                                  {Object.entries(biData.kpiBreakdowns.contracts).map(([status, count]: any) => (
                                    <div key={status} className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                      <span className="capitalize text-slate-500">{status.replace('_', ' ')}</span>
                                      <strong className="text-dark font-bold font-mono">{count}</strong>
                                    </div>
                                  ))}
                                </div>
                              </div>

                            </div>
                          </div>
                        )}

                      </div>
                    ) : (
                      <div className="text-center py-20 text-xs text-slate-500 font-sans space-y-2">
                        <h4 className="font-heading font-black text-dark text-sm uppercase tracking-wider">Awaiting Backend Integration</h4>
                        <p className="text-[10px] text-slate-400">This module is ready and will automatically display live data once backend services are connected.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. User Directory Module */}
                {activeModule === 'users' && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading font-bold text-dark text-sm">Security User Accounts Directory</h3>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            placeholder="Search names, emails..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg text-[10px] pl-8 pr-3 py-1.5 focus:outline-none focus:border-primary text-dark"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select 
                          value={roleFilter} 
                          onChange={(e) => setRoleFilter(e.target.value)}
                          className="bg-white border border-slate-200 text-[10px] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary font-bold text-slate-600"
                        >
                          <option value="all">All Roles</option>
                          <option value="consumer">Consumers</option>
                          <option value="producer">Producers</option>
                          <option value="admin">Admins</option>
                        </select>
                        <select 
                          value={statusFilter} 
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="bg-white border border-slate-200 text-[10px] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary font-bold text-slate-600"
                        >
                          <option value="all">All Statuses</option>
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-500">
                        <thead className="bg-slate-50 text-[9px] uppercase font-bold tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-4">Name / Contact</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Registration Date</th>
                            <th className="px-6 py-4">Account Status</th>
                            <th className="px-6 py-4 text-right">Moderation Controls</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          {filteredUsers.map((user: any) => (
                            <tr key={user._id} className="hover:bg-slate-50/50">
                              <td className="px-6 py-4">
                                <span className="block font-bold text-dark">{user.firstName} {user.lastName}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{user.phone || 'No phone'}</span>
                              </td>
                              <td className="px-6 py-4">{user.email}</td>
                              <td className="px-6 py-4"><span className="capitalize bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold text-[9.5px]">{user.role}</span></td>
                              <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${user.accountStatus === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                                  {user.accountStatus}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right flex justify-end gap-2">
                                <button 
                                  onClick={() => { setEditingItem(user); setEditingType('user'); }}
                                  className="text-[9px] bg-slate-50 text-slate-600 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg font-bold border border-slate-200"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleToggleUserStatus(user._id)}
                                  className={`text-[9px] px-2.5 py-1.5 rounded-lg font-bold ${user.accountStatus === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                                >
                                  {user.accountStatus === 'active' ? 'Suspend' : 'Activate'}
                                </button>
                                <button 
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="text-[9px] bg-red-50 text-red-600 hover:bg-red-100 px-2.5 py-1.5 rounded-lg font-bold"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. Consumer Accounts Module */}
                {activeModule === 'consumers' && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-heading font-bold text-dark text-sm">Enterprise Consumer Profiles</h3>
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          placeholder="Search consumer files..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg text-[10px] pl-8 pr-3 py-1.5 focus:outline-none focus:border-primary text-dark"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-500">
                        <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-4">Company Details</th>
                            <th className="px-6 py-4">Industry / Region</th>
                            <th className="px-6 py-4">Monthly Electricity Bill</th>
                            <th className="px-6 py-4">Annual Draw / Connected Load</th>
                            <th className="px-6 py-4 text-right">Moderation Control</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          {filteredConsumers.map((consumer: any) => (
                            <tr key={consumer._id} className="hover:bg-slate-50/50">
                              <td className="px-6 py-4">
                                <span className="block font-bold text-dark">{consumer.companyName}</span>
                                <span className="text-[10px] text-slate-400">{consumer.contactPerson} ({consumer.designation})</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="block font-medium text-slate-700">{consumer.industryType}</span>
                                <span className="text-[10px] text-slate-400">{consumer.state}</span>
                              </td>
                              <td className="px-6 py-4 font-bold text-primary">₹{(consumer.monthlyElectricityBill || 0).toLocaleString('en-IN')}</td>
                              <td className="px-6 py-4">
                                <span className="block">{consumer.annualConsumption || 0} kWh / yr</span>
                                <span className="text-[10px] text-slate-400 font-mono">{consumer.connectedLoad || 0} MW load</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => { setEditingItem(consumer); setEditingType('consumer'); }}
                                  className="text-[9px] bg-slate-50 text-slate-600 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg font-bold border border-slate-200"
                                >
                                  Edit Profile
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. Producer Accounts Module */}
                {activeModule === 'producers' && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-heading font-bold text-dark text-sm">Enterprise Producer Profiles</h3>
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          placeholder="Search producer plants..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg text-[10px] pl-8 pr-3 py-1.5 focus:outline-none focus:border-primary text-dark"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-500">
                        <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-4">Producer Company</th>
                            <th className="px-6 py-4">Capacity / Tariff Rate</th>
                            <th className="px-6 py-4">Energy Type</th>
                            <th className="px-6 py-4">Availability Status</th>
                            <th className="px-6 py-4 text-right">Moderation Control</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          {filteredProducers.map((producer: any) => (
                            <tr key={producer._id} className="hover:bg-slate-50/50">
                              <td className="px-6 py-4 font-bold text-dark">
                                <span className="block">{producer.companyName}</span>
                                <span className="text-[10px] text-slate-400">{producer.location}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="block font-bold">{producer.plantCapacity || 0} MW</span>
                                <span className="text-[10px] text-slate-400 font-mono">₹{(producer.tariff || 0).toFixed(2)}/unit Base</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="capitalize bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[9.5px]">{producer.energyType}</span>
                              </td>
                              <td className="px-6 py-4 font-semibold text-slate-700">{producer.availability}</td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => { setEditingItem(producer); setEditingType('producer'); }}
                                  className="text-[9px] bg-slate-50 text-slate-600 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg font-bold border border-slate-200"
                                >
                                  Edit Profile
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 5. Energy Listings Module */}
                {activeModule === 'listings' && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-heading font-bold text-dark text-sm">Producer Energy Listings Moderation</h3>
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          placeholder="Search listings..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg text-[10px] pl-8 pr-3 py-1.5 focus:outline-none focus:border-primary text-dark"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-500">
                        <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-4">Producer Info</th>
                            <th className="px-6 py-4">Available Capacity</th>
                            <th className="px-6 py-4">Tariff Rate</th>
                            <th className="px-6 py-4">Availability Date / Notes</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Moderation Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          {filteredListings.map((listing: any) => (
                            <tr key={listing._id} className="hover:bg-slate-50/50">
                              <td className="px-6 py-5 font-bold text-dark">
                                <span className="block">{listing.userId?.companyName || 'Producer Account'}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{listing.userId?.email}</span>
                              </td>
                              <td className="px-6 py-5">
                                <span className="block font-bold">{listing.capacityAvailable} MW</span>
                                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full capitalize">{listing.energyType}</span>
                              </td>
                              <td className="px-6 py-5 font-bold text-primary">₹{(listing.tariff || 0).toFixed(2)}/unit</td>
                              <td className="px-6 py-5">
                                <span className="block text-slate-700">{listing.location}</span>
                                <span className="text-[9.5px] text-slate-400 block truncate max-w-[150px]">{listing.notes || 'No notes'}</span>
                              </td>
                              <td className="px-6 py-5">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                  listing.status === 'approved' || listing.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  listing.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                  'bg-red-50 text-red-600 border border-red-200'
                                }`}>
                                  {listing.status}
                                </span>
                              </td>
                              <td className="px-6 py-5 text-right flex justify-end gap-2">
                                <button 
                                  onClick={() => handleModerateListing(listing._id, 'approved')} 
                                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1.5 rounded-lg text-[9px] font-bold"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleModerateListing(listing._id, 'rejected')} 
                                  className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1.5 rounded-lg text-[9px] font-bold"
                                >
                                  Reject
                                </button>
                                <button 
                                  onClick={() => handleModerateListing(listing._id, 'archived')} 
                                  className="bg-slate-50 hover:bg-slate-100 text-slate-500 px-2.5 py-1.5 rounded-lg text-[9px] font-bold border border-slate-200"
                                >
                                  Archive
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 6. Marketplace Requests Module / B2B Control Center */}
                {activeModule === 'requests' && (
                  <div className="space-y-8 animate-in fade-in duration-200 text-xs font-sans text-slate-500">
                    {/* Top Section: Open Consumer Requirements */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div>
                          <h3 className="font-heading font-bold text-dark text-sm">Open Consumer Requirements</h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">Select a requirement below to initiate manual B2B matchmaking with active listings</p>
                        </div>
                        {selectedRequirementForMatch && (
                          <div className="flex items-center gap-2">
                            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg font-bold text-[10px]">
                              Selected: {selectedRequirementForMatch.userId?.companyName || 'Consumer'} ({selectedRequirementForMatch.requiredCapacity} MW)
                            </span>
                            <button 
                              onClick={() => setSelectedRequirementForMatch(null)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="overflow-x-auto">
                        {energyRequirements.length === 0 ? (
                          <p className="text-center p-6 text-slate-400">No open consumer requirements found.</p>
                        ) : (
                          <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                              <tr>
                                <th className="px-6 py-4">Consumer Account</th>
                                <th className="px-6 py-4">Industry / State</th>
                                <th className="px-6 py-4">Capacity Needed</th>
                                <th className="px-6 py-4">Consumption / Tariff</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Matching Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-600">
                              {energyRequirements.map((reqItem: any) => {
                                const isSelected = selectedRequirementForMatch?._id === reqItem._id;
                                return (
                                  <tr key={reqItem._id} className={`hover:bg-slate-50/50 transition-colors ${isSelected ? 'bg-amber-50/40 hover:bg-amber-50/60' : ''}`}>
                                    <td className="px-6 py-4">
                                      <span className="block font-bold text-dark">{reqItem.userId?.companyName || 'Not Set'}</span>
                                      <span className="text-[10px] text-slate-400">{reqItem.userId?.email}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                      <span className="block capitalize">{reqItem.industry}</span>
                                      <span className="text-[10px] text-slate-400">{reqItem.state}</span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-primary">{reqItem.requiredCapacity} MW</td>
                                    <td className="px-6 py-4">
                                      <span className="block">{reqItem.monthlyConsumption?.toLocaleString()} kWh</span>
                                      <span className="text-[10px] text-slate-400">₹{reqItem.preferredTariff}/unit</span>
                                    </td>
                                    <td className="px-6 py-4">
                                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                        reqItem.status === 'open' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                        reqItem.status === 'matched' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                        reqItem.status === 'negotiation' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                        'bg-slate-100 text-slate-600 border border-slate-200'
                                      }`}>
                                        {reqItem.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      {isSelected ? (
                                        <button 
                                          onClick={() => setSelectedRequirementForMatch(null)}
                                          className="bg-amber-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold"
                                        >
                                          Deselect
                                        </button>
                                      ) : (
                                        <button 
                                          onClick={() => setSelectedRequirementForMatch(reqItem)}
                                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-bold"
                                        >
                                          Select for Match
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>

                    {/* Middle Section: Active Listings for Matchmaking */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-heading font-bold text-dark text-sm">Active Producer Listings</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Select a consumer requirement above first, then click &quot;Match&quot; to pair them</p>
                      </div>
                      <div className="overflow-x-auto">
                        {listings.filter(l => l.status === 'active').length === 0 ? (
                          <p className="text-center p-6 text-slate-400">No active producer listings available.</p>
                        ) : (
                          <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                              <tr>
                                <th className="px-6 py-4">Producer</th>
                                <th className="px-6 py-4">Energy Type</th>
                                <th className="px-6 py-4">Capacity Available</th>
                                <th className="px-6 py-4">Location / Tariff</th>
                                <th className="px-6 py-4 text-right">Matching controls</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-600">
                              {listings.filter(l => l.status === 'active').map((listing: any) => (
                                <tr key={listing._id} className="hover:bg-slate-50/50">
                                  <td className="px-6 py-4 font-bold text-dark">{listing.producerId?.companyName || 'Green Energy Producer'}</td>
                                  <td className="px-6 py-4 font-semibold text-primary">{listing.energyType}</td>
                                  <td className="px-6 py-4 font-bold">{listing.capacityAvailable} MW</td>
                                  <td className="px-6 py-4">
                                    <span className="block">{listing.location}</span>
                                    <span className="text-[10px] text-slate-400">₹{listing.tariff}/unit</span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    {selectedRequirementForMatch ? (
                                      <button 
                                        onClick={() => handleMatchB2B(
                                          selectedRequirementForMatch._id,
                                          selectedRequirementForMatch.userId?._id || selectedRequirementForMatch.userId,
                                          listing._id,
                                          listing.producerId?._id || listing.producerId
                                        )}
                                        className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-[10px] font-bold"
                                      >
                                        Match with {selectedRequirementForMatch.userId?.companyName || 'Consumer'}
                                      </button>
                                    ) : (
                                      <span className="text-[10px] text-slate-400 italic">Select consumer first</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>

                    {/* Bottom Section: Track B2B Matches (Opportunities) */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-heading font-bold text-dark text-sm">B2B Matched Opportunities</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Track and moderate active B2B negotiations and deal states</p>
                      </div>
                      <div className="overflow-x-auto">
                        {marketplaceOpps.length === 0 ? (
                          <p className="text-center p-6 text-slate-400">No B2B matched opportunities recorded yet.</p>
                        ) : (
                          <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                              <tr>
                                <th className="px-6 py-4">Consumer Company</th>
                                <th className="px-6 py-4">Producer Company</th>
                                <th className="px-6 py-4">Requirements Matched</th>
                                <th className="px-6 py-4">Negotiation Status</th>
                                <th className="px-6 py-4 text-right">Moderator Controls</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-600">
                              {marketplaceOpps.map((opp: any) => (
                                <tr key={opp._id} className="hover:bg-slate-50/50">
                                  <td className="px-6 py-4 font-bold text-dark">{opp.consumerId?.companyName || 'Consumer Client'}</td>
                                  <td className="px-6 py-4 font-bold text-dark">{opp.producerId?.companyName || 'Producer Partner'}</td>
                                  <td className="px-6 py-4">
                                    <span className="block font-semibold">Demand: {opp.requirementId?.requiredCapacity} MW @ ₹{opp.requirementId?.preferredTariff}/unit</span>
                                    <span className="text-[10px] text-slate-400">Supply: {opp.listingId?.capacityAvailable} MW @ ₹{opp.listingId?.tariff}/unit ({opp.listingId?.energyType})</span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                      opp.status === 'new' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                      opp.status === 'contacted' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                      opp.status === 'proposal_sent' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                                      opp.status === 'negotiation' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                      opp.status === 'won' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                      'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                      {opp.status.replace('_', ' ')}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right flex justify-end gap-1.5">
                                    <select
                                      value={opp.status}
                                      onChange={(e) => handleUpdateMarketplaceOppStatus(opp._id, e.target.value)}
                                      className="bg-white border border-slate-200 rounded px-2 py-1 text-[10px] font-bold text-slate-600 focus:outline-none focus:border-primary"
                                    >
                                      <option value="new">New</option>
                                      <option value="contacted">Contacted</option>
                                      <option value="proposal_sent">Proposal Sent</option>
                                      <option value="negotiation">Negotiation</option>
                                      <option value="won">Won (Deal Closed)</option>
                                      <option value="lost">Lost</option>
                                    </select>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. Proposal Pipeline Module */}
                {activeModule === 'proposals' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
                    
                    {/* Create Proposal Form */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md h-fit">
                      <h3 className="text-sm font-bold font-heading text-dark mb-4">Generate B2B Proposal</h3>
                      <form onSubmit={handleCreateProposal} className="space-y-3 font-sans text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Consumer Account</label>
                          <select 
                            value={newProposal.userId} 
                            onChange={(e) => setNewProposal({ ...newProposal, userId: e.target.value })}
                            className="bg-slate-50 border border-slate-200 text-xs rounded-lg w-full p-2 focus:outline-none focus:border-primary text-dark"
                          >
                            <option value="">Select consumer...</option>
                            {users.filter(u => u.role === 'consumer').map(u => (
                              <option key={u._id} value={u._id}>{u.firstName} {u.lastName} ({u.companyName || u.email})</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Producer Plant</label>
                          <select 
                            value={newProposal.producerId} 
                            onChange={(e) => setNewProposal({ ...newProposal, producerId: e.target.value })}
                            className="bg-slate-50 border border-slate-200 text-xs rounded-lg w-full p-2 focus:outline-none focus:border-primary text-dark"
                          >
                            <option value="">Select producer (optional)...</option>
                            {users.filter(u => u.role === 'producer').map(u => (
                              <option key={u._id} value={u._id}>{u.companyName || `${u.firstName} ${u.lastName}`}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Proposal Reference Number</label>
                          <input 
                            type="text" 
                            placeholder="PROP-2026-X" 
                            value={newProposal.proposalNumber}
                            onChange={(e) => setNewProposal({ ...newProposal, proposalNumber: e.target.value })}
                            className="bg-slate-50 border border-slate-200 text-xs rounded-lg w-full p-2 focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Load (MW)</label>
                            <input 
                              type="text" 
                              placeholder="4.5 MW" 
                              value={newProposal.capacityRequirement}
                              onChange={(e) => setNewProposal({ ...newProposal, capacityRequirement: e.target.value })}
                              className="bg-slate-50 border border-slate-200 text-xs rounded-lg w-full p-2 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tariff (₹/Unit)</label>
                            <input 
                              type="number" 
                              step="0.01" 
                              placeholder="4.90" 
                              value={newProposal.estimatedTariff}
                              onChange={(e) => setNewProposal({ ...newProposal, estimatedTariff: e.target.value })}
                              className="bg-slate-50 border border-slate-200 text-xs rounded-lg w-full p-2 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Validity Date</label>
                          <input 
                            type="date" 
                            value={newProposal.validUntil}
                            onChange={(e) => setNewProposal({ ...newProposal, validUntil: e.target.value })}
                            className="bg-slate-50 border border-slate-200 text-xs rounded-lg w-full p-2 focus:outline-none"
                          />
                        </div>
                        <button className="btn-primary w-full py-2.5 mt-2 rounded-xl font-bold flex items-center justify-center gap-2">
                          <Plus className="w-4 h-4" /> Generate Proposal
                        </button>
                      </form>
                    </div>

                    {/* Proposal List */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden lg:col-span-2">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-heading font-bold text-dark text-sm">Proposal Deal Pipeline</h3>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            placeholder="Search proposals..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg text-[10px] pl-8 pr-3 py-1.5 focus:outline-none focus:border-primary text-dark"
                          />
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-500">
                          <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                            <tr>
                              <th className="px-6 py-4">Proposal Ref</th>
                              <th className="px-6 py-4">Client Consumer</th>
                              <th className="px-6 py-4">Capacity / Tariff</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Status Controls</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            {filteredProposals.map((prop: any) => (
                              <tr key={prop._id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-mono font-bold text-dark">{prop.proposalNumber}</td>
                                <td className="px-6 py-4 font-semibold text-dark">
                                  <span className="block">{prop.userId?.companyName || 'Corporate Client'}</span>
                                  <span className="text-[10px] text-slate-400">{prop.userId?.firstName} {prop.userId?.lastName}</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-primary">
                                  <span className="block text-slate-700">{prop.capacityRequirement}</span>
                                  <span>₹{(prop.estimatedTariff || 0).toFixed(2)}/unit</span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                    prop.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                    prop.status === 'rejected' ? 'bg-red-50 text-red-600 border border-red-200' :
                                    'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                  }`}>
                                    {prop.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                  <button 
                                    onClick={() => handleUpdateProposalStatus(prop._id, 'approved')} 
                                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[9px] font-bold"
                                  >
                                    Approve
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateProposalStatus(prop._id, 'rejected')} 
                                    className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded text-[9px] font-bold"
                                  >
                                    Reject
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Executed PPAs & Contracts */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden lg:col-span-3 mt-6">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div>
                          <h3 className="font-heading font-bold text-dark text-sm">Corporate Power Purchase Agreements (Contracts)</h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">Moderate legal PPA documents, signatures, and contract lifecycle status</p>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        {contracts.length === 0 ? (
                          <p className="text-center p-6 text-slate-400">No executed PPAs or contracts found.</p>
                        ) : (
                          <table className="w-full text-left text-xs text-slate-500">
                            <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                              <tr>
                                <th className="px-6 py-4">Contract Number</th>
                                <th className="px-6 py-4">Consumer Account</th>
                                <th className="px-6 py-4">Producer Partner</th>
                                <th className="px-6 py-4">Duration & Validity</th>
                                <th className="px-6 py-4">Signature Status</th>
                                <th className="px-6 py-4">Lifecycle State</th>
                                <th className="px-6 py-4 text-right">Moderator Controls</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-sans">
                              {contracts.map((contract: any) => (
                                <tr key={contract._id} className="hover:bg-slate-50/50">
                                  <td className="px-6 py-4 font-mono font-bold text-dark">{contract.contractNumber}</td>
                                  <td className="px-6 py-4 font-semibold text-dark">
                                    <span className="block">{contract.consumer?.companyName || 'Corporate Client'}</span>
                                    <span className="text-[10px] text-slate-400">{contract.consumer?.email}</span>
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-dark">
                                    <span className="block">{contract.producer?.companyName || 'Producer Partner'}</span>
                                    <span className="text-[10px] text-slate-400">{contract.producer?.email}</span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="block font-bold text-primary">
                                      {new Date(contract.startDate).toLocaleDateString()} to {new Date(contract.endDate).toLocaleDateString()}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 space-y-1">
                                    <div className="text-[10px]">Consumer: {contract.signedByConsumer ? '✍️ Signed' : '❌ Pending'}</div>
                                    <div className="text-[10px]">Producer: {contract.signedByProducer ? '✍️ Signed' : '❌ Pending'}</div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                      contract.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                      contract.status === 'pending_signature' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                      'bg-slate-100 text-slate-600 border border-slate-200'
                                    }`}>
                                      {contract.status.replace('_', ' ')}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <select
                                      value={contract.status}
                                      onChange={(e) => handleUpdateContractStatus(contract._id, e.target.value)}
                                      className="bg-white border border-slate-200 rounded px-2 py-1 text-[10px] font-bold text-slate-600 focus:outline-none focus:border-primary"
                                    >
                                      <option value="draft">Draft</option>
                                      <option value="pending_signature">Pending Signature</option>
                                      <option value="active">Active</option>
                                      <option value="expired">Expired</option>
                                      <option value="terminated">Terminated</option>
                                    </select>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
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
                            <th className="px-6 py-4">Consumer Client</th>
                            <th className="px-6 py-4">Audit Type</th>
                            <th className="px-6 py-4">Assigned Expert</th>
                            <th className="px-6 py-4">Audited Date</th>
                            <th className="px-6 py-4">Notes</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Moderation Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          {consultations.map((c: any) => (
                            <tr key={c._id} className="hover:bg-slate-50/50">
                              <td className="px-6 py-4 font-bold text-dark">
                                <span className="block">{c.userId?.companyName || 'Corporate Account'}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{c.userId?.email}</span>
                              </td>
                              <td className="px-6 py-4 capitalize">{c.consultationType.replace('_', ' ')}</td>
                              <td className="px-6 py-4">
                                <select 
                                  value={c.assignedAdmin?._id || c.assignedAdmin || ''} 
                                  onChange={(e) => handleAssignAdmin(c._id, e.target.value)}
                                  className="bg-slate-50 border border-slate-200 text-[10px] rounded-lg p-1 text-dark"
                                >
                                  <option value="">Unassigned</option>
                                  {users.filter(u => u.role === 'admin').map(u => (
                                    <option key={u._id} value={u._id}>{u.firstName} {u.lastName}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-6 py-4 text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5">
                                  <input 
                                    type="text" 
                                    defaultValue={c.notes} 
                                    onBlur={(e) => handleUpdateConsultationNotes(c._id, e.target.value)}
                                    placeholder="Click to type notes..." 
                                    className="bg-transparent hover:bg-slate-50 border-b border-transparent focus:border-slate-300 px-1 py-0.5 rounded text-[10px] text-slate-700 outline-none w-32"
                                  />
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                  c.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                                  c.status === 'in_progress' ? 'bg-yellow-50 text-yellow-700' :
                                  'bg-slate-100 text-slate-600'
                                }`}>
                                  {c.status.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right flex justify-end gap-1">
                                <button 
                                  onClick={() => handleUpdateConsultationStatus(c._id, 'in_progress')} 
                                  className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[9px] font-bold border border-yellow-200"
                                >
                                  In Progress
                                </button>
                                <button 
                                  onClick={() => handleUpdateConsultationStatus(c._id, 'completed')} 
                                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[9px] font-bold border border-emerald-200"
                                >
                                  Done
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 9. Document Vault Module */}
                {activeModule === 'documents' && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading font-bold text-dark text-sm">Regulatory Document Vault</h3>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            placeholder="Search file names..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg text-[10px] pl-8 pr-3 py-1.5 focus:outline-none focus:border-primary text-dark"
                          />
                        </div>
                      </div>
                      <select 
                        value={docFilter} 
                        onChange={(e) => setDocFilter(e.target.value)}
                        className="bg-white border border-slate-200 text-[10px] rounded-lg px-2.5 py-1.5 focus:outline-none"
                      >
                        <option value="all">All Documents</option>
                        <option value="PPA_Contract">PPA Agreements</option>
                        <option value="SLA_Grid_Sync">SLA / Grid Synchrony</option>
                        <option value="NOC_Interconnect">SLDC NOC Documents</option>
                      </select>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-500">
                        <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-4">File Name</th>
                            <th className="px-6 py-4">Owner Account</th>
                            <th className="px-6 py-4">Category Type</th>
                            <th className="px-6 py-4">Uploaded Timestamp</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          {filteredDocuments.map((doc: any) => (
                            <tr key={doc._id} className="hover:bg-slate-50/50">
                              <td className="px-6 py-4 font-bold text-dark flex items-center gap-2">
                                <FileText className="w-4 h-4 text-slate-400" /> {doc.fileName}
                              </td>
                              <td className="px-6 py-4 font-semibold text-slate-700">{doc.userId?.companyName || 'Internal / Admin'}</td>
                              <td className="px-6 py-4 font-mono text-[10px]">{doc.documentType}</td>
                              <td className="px-6 py-4 text-slate-500">{new Date(doc.uploadedAt).toLocaleString()}</td>
                              <td className="px-6 py-4 text-right flex justify-end gap-2">
                                <a 
                                  href={doc.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-[9px] bg-slate-50 text-slate-600 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg font-bold border border-slate-200 inline-flex items-center gap-1"
                                >
                                  <Download className="w-3.5 h-3.5" /> Download
                                </a>
                                <button 
                                  onClick={() => handleDeleteDocument(doc._id)} 
                                  className="text-[9px] bg-red-50 text-red-600 hover:bg-red-100 px-2.5 py-1.5 rounded-lg font-bold"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 10. Notification Center Hub */}
                {activeModule === 'notifications' && (
                  <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-100 shadow-xl animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold font-heading text-dark mb-6">Operations Broadcast & Notifications Hub</h3>
                    <form onSubmit={handleBroadcastNotification} className="space-y-4 font-sans text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Notification Broadcast Scope</label>
                        <select 
                          value={broadcastTarget}
                          onChange={(e) => setBroadcastTarget(e.target.value)}
                          className="bg-slate-50 border border-slate-200 text-xs rounded-xl w-full p-3 focus:outline-none focus:border-primary text-dark"
                        >
                          <option value="all">Broadcast Global Alert (All Accounts)</option>
                          <option value="consumer">Broadcast to Power Consumers Only</option>
                          <option value="producer">Broadcast to Energy Producers Only</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Alert Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. SLDC Cross-Subsidy Surcharges (CSS) offset revisions..." 
                          value={broadcastTitle}
                          onChange={(e) => setBroadcastTitle(e.target.value)}
                          className="bg-slate-50 border border-slate-200 text-xs rounded-xl w-full p-3 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Detailed Alert Message</label>
                        <textarea 
                          placeholder="Provide details of grid synchrony maintenance, SLA revisions, regulatory changes, or direct instructions..." 
                          rows={4} 
                          value={broadcastMessage}
                          onChange={(e) => setBroadcastMessage(e.target.value)}
                          className="bg-slate-50 border border-slate-200 text-xs rounded-xl w-full p-3 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <button className="btn-primary py-3 px-6 text-xs font-bold rounded-xl mt-4 flex items-center gap-2">
                        <Send className="w-4 h-4" /> Dispatch System Alert
                      </button>
                    </form>
                  </div>
                )}

                {/* 11. Security & Compliance Console */}
                {activeModule === 'logs' && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    
                    {/* Security Indicators Grid */}
                    {securityMetrics && (
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md text-center space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total User Pool</span>
                          <h3 className="text-2xl font-black text-dark font-heading">{securityMetrics.totalUsers}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md text-center space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Suspended Users</span>
                          <h3 className="text-2xl font-black text-rose-600 font-heading">{securityMetrics.suspendedUsers}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md text-center space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Failed Logins</span>
                          <h3 className="text-2xl font-black text-amber-500 font-heading">{securityMetrics.loginFailedCount}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md text-center space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Rate Limit Blocks</span>
                          <h3 className="text-2xl font-black text-red-600 font-heading">{securityMetrics.rateLimitViolations}</h3>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Left side: Compliance Audit logs */}
                      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden lg:col-span-2 space-y-4 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <h3 className="font-heading font-bold text-dark text-sm">Compliance Security Audit Trail</h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">Filter immutable log events across users, actions, and node IPs.</p>
                          </div>
                          
                          {/* Search / Filters Panel */}
                          <div className="flex flex-wrap items-center gap-2">
                            <input 
                              type="text" 
                              placeholder="Search User Email..."
                              value={securityFilters.email}
                              onChange={(e) => setSecurityFilters({ ...securityFilters, email: e.target.value })}
                              className="bg-slate-50 border border-slate-200 rounded-lg text-[9px] px-2 py-1.5 focus:outline-none text-dark"
                            />
                            <input 
                              type="text" 
                              placeholder="Search IP Address..."
                              value={securityFilters.ip}
                              onChange={(e) => setSecurityFilters({ ...securityFilters, ip: e.target.value })}
                              className="bg-slate-50 border border-slate-200 rounded-lg text-[9px] px-2 py-1.5 focus:outline-none text-dark"
                            />
                            <button 
                              onClick={() => fetchModuleData()}
                              className="bg-primary hover:bg-primary-dark text-white rounded-lg text-[9px] px-3 py-1.5 font-bold uppercase transition-colors"
                            >
                              Filter
                            </button>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-500">
                            <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                              <tr>
                                <th className="px-4 py-3">Trigger User</th>
                                <th className="px-4 py-3">Action</th>
                                <th className="px-4 py-3">Details</th>
                                <th className="px-4 py-3">IP Node</th>
                                <th className="px-4 py-3 text-right">Time</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-mono text-[10px]">
                              {activityLogs.map((log: any) => (
                                <tr key={log._id} className="hover:bg-slate-50/50">
                                  <td className="px-4 py-3 font-bold text-dark">
                                    {log.userId ? `${log.userId.firstName || ''} ${log.userId.lastName || ''}` : 'System / Guest'}
                                    <span className="block text-[8px] text-slate-400 font-normal">{log.userId?.email || ''}</span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                      log.action.includes('EXCEEDED') || log.action.includes('FAILED') || log.action.includes('SUSPEND')
                                        ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    }`}>
                                      {log.action}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-slate-600 font-sans text-xs max-w-[150px] truncate" title={log.details}>
                                    {log.details}
                                  </td>
                                  <td className="px-4 py-3 text-slate-400">{log.ipAddress || 'Internal'}</td>
                                  <td className="px-4 py-3 text-right text-slate-400">
                                    {new Date(log.createdAt).toLocaleTimeString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right side: Security Controls (User suspensions) */}
                      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 space-y-4 lg:col-span-1">
                        <div>
                          <h3 className="font-heading font-bold text-dark text-sm">Account Lockout & Suspension</h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">Administratively lock or unlock platform authentication nodes.</p>
                        </div>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto font-sans text-xs">
                          {users.map((user: any) => (
                            <div key={user._id} className="flex justify-between items-center p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                              <div>
                                <div className="font-bold text-dark">{user.firstName} {user.lastName}</div>
                                <div className="text-[10px] text-slate-400 leading-none">{user.email}</div>
                                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                                  user.accountStatus === 'suspended' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {user.accountStatus || 'active'}
                                </span>
                              </div>
                              
                              <button
                                onClick={async () => {
                                  const newStatus = user.accountStatus === 'suspended' ? 'active' : 'suspended';
                                  try {
                                    await api.put(`/security/users/${user._id}/status`, { status: newStatus });
                                    alert(`User status changed to ${newStatus} successfully ✅`);
                                    fetchModuleData();
                                  } catch (err: any) {
                                    alert(`Failed to change user status: ${err.message}`);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-colors shrink-0 ${
                                  user.accountStatus === 'suspended' 
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                    : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                                }`}
                              >
                                {user.accountStatus === 'suspended' ? 'Activate' : 'Suspend'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 12. Energy Assessments Module */}
                {activeModule === 'assessments' && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-heading font-bold text-dark text-sm">Energy Feasibility Assessment Studies</h3>
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          placeholder="Search assessments..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg text-[10px] pl-8 pr-3 py-1.5 focus:outline-none focus:border-primary text-dark"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-500">
                        <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-4">Assessment Inquirer</th>
                            <th className="px-6 py-4">Industry / Node</th>
                            <th className="px-6 py-4">Bill Sum</th>
                            <th className="px-6 py-4">Capacity / Tariff</th>
                            <th className="px-6 py-4">Status State</th>
                            <th className="px-6 py-4 text-right">Moderator Controls</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          {assessments.map((ass: any) => (
                            <tr key={ass._id} className="hover:bg-slate-50/50">
                              <td className="px-6 py-4">
                                <span className="block font-bold text-dark">{ass.userId?.companyName || 'Corporate Inquirer'}</span>
                                <span className="text-[10px] text-slate-400">{ass.userId?.email}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="block capitalize">{ass.industry}</span>
                                <span className="text-[10px] text-slate-400">{ass.state}</span>
                              </td>
                              <td className="px-6 py-4 font-bold text-dark">₹{ass.monthlyElectricityBill?.toLocaleString()}</td>
                              <td className="px-6 py-4 text-slate-700 font-semibold">
                                <span className="block">{ass.energyRequirement} MW needed</span>
                                <span className="text-[10px] text-slate-400">₹{ass.currentTariff}/kWh current</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                  ass.status === 'report_ready' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  ass.status === 'completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                  'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}>
                                  {ass.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right flex justify-end gap-1.5">
                                <button 
                                  onClick={() => { setEditingItem(ass); setEditingType('assessment'); }} 
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg text-[9px] font-bold border border-slate-200"
                                >
                                  Review
                                </button>
                                <button 
                                  onClick={() => handleUpdateAssessmentStatus(ass._id, 'report_ready')} 
                                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1.5 rounded-lg text-[9px] font-bold"
                                >
                                  Approve
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 13. CRM Sales Console Module */}
                {activeModule === 'crm' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-xs font-sans text-slate-500">
                    {/* Analytics Summary */}
                    {crmAnalytics && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Sales Inquiries</span>
                          <div className="text-2xl font-black text-dark mt-2 font-heading">{crmAnalytics.totalLeads} Leads</div>
                          <div className="text-[10px] text-primary font-bold mt-1">✓ Active pipeline</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Deal Conversion Efficiency</span>
                          <div className="text-2xl font-black text-dark mt-2 font-heading">{crmAnalytics.conversionRate}%</div>
                          <div className="text-[10px] text-accent font-bold mt-1">Won / Total ratio</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Pipeline Target Valuation</span>
                          <div className="text-2xl font-black text-dark mt-2 font-heading">₹{crmAnalytics.totalPipelineValue?.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400 mt-1">Sum of monthly bills</div>
                        </div>
                        <div className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/10">
                          <span className="opacity-90 text-[10px] font-bold uppercase tracking-wider">Closed Won Deal Margin</span>
                          <div className="text-2xl font-black mt-2 font-heading">₹{crmAnalytics.wonValue?.toLocaleString()}</div>
                          <div className="text-[10px] opacity-80 mt-1">Secured revenue base</div>
                        </div>
                      </div>
                    )}

                    {/* Leads Table */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div>
                          <h3 className="font-heading font-bold text-dark text-sm">Corporate Lead Pipeline</h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">Moderate sales stages, handler assignments, follow-ups, and activity histories</p>
                        </div>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            placeholder="Search leads..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg text-[10px] pl-8 pr-3 py-1.5 focus:outline-none focus:border-primary text-dark"
                          />
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        {leads.length === 0 ? (
                          <p className="text-center p-6 text-slate-400">No CRM leads recorded.</p>
                        ) : (
                          <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[9px] tracking-wider uppercase font-bold border-b border-slate-100">
                              <tr>
                                <th className="px-6 py-4">Contact & Company</th>
                                <th className="px-6 py-4">Inquiry details</th>
                                <th className="px-6 py-4">Bill Margin</th>
                                <th className="px-6 py-4">Assigned Handler</th>
                                <th className="px-6 py-4">Deal Stage</th>
                                <th className="px-6 py-4 text-right">CRM Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-600">
                              {leads
                                .filter(l => 
                                  l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  l.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  l.email.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((lead: any) => (
                                  <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                      <span className="block font-bold text-dark">{lead.name}</span>
                                      <span className="block text-[10px] text-slate-400">{lead.company}</span>
                                      <span className="text-[10px] text-slate-400">{lead.email} • {lead.phone}</span>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate">
                                      {lead.message || 'No remarks provided'}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-dark">
                                      ₹{lead.bill?.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                      <select
                                        value={lead.assignedTo?._id || lead.assignedTo || ''}
                                        onChange={(e) => handleAssignLead(lead._id, e.target.value)}
                                        className="bg-slate-50 border border-slate-200 rounded text-[10px] p-1 font-semibold text-slate-600 focus:outline-none"
                                      >
                                        <option value="">Unassigned</option>
                                        {users.filter(u => u.role === 'admin').map((adminUser: any) => (
                                          <option key={adminUser._id} value={adminUser._id}>{adminUser.firstName} {adminUser.lastName}</option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="px-6 py-4">
                                      <select
                                        value={lead.status}
                                        onChange={(e) => handleUpdateLeadField(lead._id, { status: e.target.value })}
                                        className={`border rounded text-[10px] p-1 font-bold ${
                                          lead.status === 'Won' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                                          lead.status === 'Lost' ? 'border-red-200 bg-red-50 text-red-700' :
                                          'border-slate-200 bg-white text-slate-600'
                                        }`}
                                      >
                                        <option value="New">New</option>
                                        <option value="Contacted">Contacted</option>
                                        <option value="Qualified">Qualified</option>
                                        <option value="Proposal Sent">Proposal Sent</option>
                                        <option value="Negotiation">Negotiation</option>
                                        <option value="Won">Won</option>
                                        <option value="Lost">Lost</option>
                                      </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <button
                                        onClick={() => setSelectedLead(lead)}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-bold"
                                      >
                                        Timeline & Details
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 14. Communication & Broadcast Center */}
                {activeModule === 'communications' && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Left: Broadcast Composer */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-4 lg:col-span-1">
                        <h3 className="font-heading font-bold text-dark text-sm">Send Dispatch Broadcast</h3>
                        <p className="text-[10px] text-slate-400">Broadcast updates to select business contacts across email, SMS, or in-app channels.</p>
                        
                        <div className="space-y-3 font-sans text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target Audience</label>
                            <select 
                              value={broadcastUserType}
                              onChange={(e: any) => setBroadcastUserType(e.target.value)}
                              className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none font-sans text-xs text-dark"
                            >
                              <option value="all">All Stakeholders</option>
                              <option value="consumer">Consumers Only</option>
                              <option value="producer">Producers Only</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Delivery Channel</label>
                            <select 
                              value={broadcastType}
                              onChange={(e: any) => setBroadcastType(e.target.value)}
                              className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none font-sans text-xs text-dark"
                            >
                              <option value="in_app">In-App Notification</option>
                              <option value="email">Email Dispatch</option>
                              <option value="sms">SMS Notification</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Subject / Title</label>
                            <input 
                              type="text" 
                              placeholder="e.g. New Policy Surcharge Schedulers" 
                              value={broadcastTitle}
                              onChange={(e) => setBroadcastTitle(e.target.value)}
                              className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none text-dark font-sans text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Message Body</label>
                            <textarea 
                              rows={4}
                              placeholder="Type details..." 
                              value={broadcastMessage}
                              onChange={(e) => setBroadcastMessage(e.target.value)}
                              className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none text-dark font-sans text-xs"
                            />
                          </div>

                          <button 
                            onClick={async () => {
                              if (!broadcastTitle || !broadcastMessage) {
                                alert('Please complete title and message body.');
                                return;
                              }
                              try {
                                await api.post('/notifications', {
                                  userId: broadcastUserType,
                                  title: broadcastTitle,
                                  message: broadcastMessage,
                                  type: broadcastType
                                });
                                alert('Broadcast dispatched successfully ✅');
                                setBroadcastTitle('');
                                setBroadcastMessage('');
                                // Refresh logs
                                const logsData = await api.get('/notifications/logs');
                                setNotificationLogs(Array.isArray(logsData) ? logsData : []);
                              } catch (err: any) {
                                alert(`Failed to broadcast: ${err.message}`);
                              }
                            }}
                            className="btn-primary w-full py-3 text-xs"
                          >
                            Dispatch Broadcast
                          </button>
                        </div>
                      </div>

                      {/* Right: Logs audit */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl lg:col-span-2 space-y-4">
                        <h3 className="font-heading font-bold text-dark text-sm">Delivery & Verification Log</h3>
                        
                        <div className="overflow-x-auto">
                          {notificationLogs.length === 0 ? (
                            <div className="text-center py-10 text-xs text-slate-400 font-sans">
                              No dispatches registered yet.
                            </div>
                          ) : (
                            <table className="w-full text-left border-collapse text-xs font-sans">
                              <thead>
                                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                  <th className="pb-3">Recipient / Channel</th>
                                  <th className="pb-3">Title</th>
                                  <th className="pb-3">Status</th>
                                  <th className="pb-3">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {notificationLogs.map((log: any) => (
                                  <tr key={log._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                    <td className="py-3">
                                      <div className="font-bold text-dark">{log.userId?.name || log.userId?.email || 'System'}</div>
                                      <div className="text-[10px] text-slate-400">{log.recipient} ({log.type})</div>
                                    </td>
                                    <td className="py-3">
                                      <div className="font-semibold text-slate-700">{log.title}</div>
                                      <div className="text-[10px] text-slate-400 truncate max-w-[200px]" title={log.message}>
                                        {log.message}
                                      </div>
                                    </td>
                                    <td className="py-3">
                                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                                        log.status === 'sent' 
                                          ? 'bg-emerald-100 text-emerald-800' 
                                          : log.status === 'failed' 
                                            ? 'bg-rose-100 text-rose-800' 
                                            : 'bg-slate-100 text-slate-800'
                                      }`}>
                                        {log.status}
                                      </span>
                                    </td>
                                    <td className="py-3 text-[10px] text-slate-400">
                                      {new Date(log.createdAt).toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 15. Content Management Module */}
                {activeModule === 'content' && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6 animate-in fade-in duration-200">
                    
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4">
                      <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-700 font-semibold">Content Management</span>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="font-heading font-black text-dark text-base uppercase tracking-tight">Ecosystem Article Registry</h3>
                        <p className="text-[10px] text-slate-400 mt-1">Manage public advisory publications, feasibility research papers, and grid newsletters.</p>
                      </div>
                      <button 
                        onClick={() => alert('Backend integration required to publish content.')}
                        className="btn-primary py-2 px-4 text-xs font-bold uppercase tracking-wider"
                      >
                        Create Article
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-slate-50 font-bold uppercase text-[9px] tracking-wider text-slate-400 border-b border-slate-100">
                          <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Author</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-4 py-4 font-bold text-dark">Group Captive Equity Requirements under Electricity Rules 2005</td>
                            <td className="px-4 py-4"><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[9.5px]">Regulatory Updates</span></td>
                            <td className="px-4 py-4">Profile To Be Added</td>
                            <td className="px-4 py-4"><span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold text-[9px] uppercase">Published</span></td>
                            <td className="px-4 py-4 text-right flex justify-end gap-2">
                              <button onClick={() => alert('Backend integration required to publish content.')} className="bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded text-[10px] font-bold border border-slate-200">Edit</button>
                              <button onClick={() => alert('Backend integration required to publish content.')} className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold">Delete</button>
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-4 py-4 font-bold text-dark">Introduction to ISTS and InSTS Grid Wheeling Tariffs for Textile Units</td>
                            <td className="px-4 py-4"><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[9.5px]">Technical Articles</span></td>
                            <td className="px-4 py-4">Profile To Be Added</td>
                            <td className="px-4 py-4"><span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full font-bold text-[9px] uppercase">Draft</span></td>
                            <td className="px-4 py-4 text-right flex justify-end gap-2">
                              <button onClick={() => alert('Backend integration required to publish content.')} className="bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded text-[10px] font-bold border border-slate-200">Edit</button>
                              <button onClick={() => alert('Backend integration required to publish content.')} className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-4 bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-2xl border border-amber-200 text-center">
                      ⚠️ Note: Backend integration required to publish content.
                    </div>
                  </div>
                )}

                {/* 16. Platform Insights Module */}
                {activeModule === 'insights' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-xs font-sans">
                    
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4">
                      <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-700 font-semibold">Platform Insights</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
                      <h4 className="text-xs font-bold text-dark font-heading uppercase text-primary border-b border-slate-50 pb-2">📈 Market Trends</h4>
                      <div className="py-8 text-center text-slate-400 space-y-2">
                        <p className="font-bold text-slate-500">No Trends Synchronized</p>
                        <p className="text-[10px] text-slate-400">Trading index pricing logs will establish baseline feeds after grid API link validation.</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
                      <h4 className="text-xs font-bold text-dark font-heading uppercase text-primary border-b border-slate-50 pb-2">📋 Industry Reports</h4>
                      <div className="py-8 text-center text-slate-400 space-y-2">
                        <p className="font-bold text-slate-500">Reports Archive Empty</p>
                        <p className="text-[10px] text-slate-400">Sector audits, annual off-taker volumes, and carbon footprint reduction records await DB sync.</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
                      <h4 className="text-xs font-bold text-dark font-heading uppercase text-primary border-b border-slate-50 pb-2">⚖️ Regulatory Updates</h4>
                      <div className="py-8 text-center text-slate-400 space-y-2">
                        <p className="font-bold text-slate-500">No Policy Dispatches</p>
                        <p className="text-[10px] text-slate-400">State SLDC cross-subsidy exemptions and central Ministry of Power notifications pending link-up.</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
                      <h4 className="text-xs font-bold text-dark font-heading uppercase text-primary border-b border-slate-50 pb-2">💡 Renewable Energy Insights</h4>
                      <div className="py-8 text-center text-slate-400 space-y-2">
                        <p className="font-bold text-slate-500">Insights Feed Standby</p>
                        <p className="text-[10px] text-slate-400">National generation capacities, average hybrid plant PLFs, and storage advisory feeds are pending sync.</p>
                      </div>
                    </div>

                    </div>
                  </div>
                )}

                {/* 17. Settings Module */}
                {activeModule === 'settings' && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6 animate-in fade-in duration-200">
                    <h3 className="font-heading font-black text-dark text-base uppercase tracking-tight pb-4 border-b border-slate-100">System Preferences & Settings</h3>
                    
                    <div className="py-20 text-center text-slate-500 font-sans space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                        <Settings className="w-6 h-6 text-slate-300" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-heading font-black text-dark text-xs uppercase tracking-wider">
                          Awaiting Backend Activation
                        </h4>
                        <p className="text-[10px] text-slate-400 max-w-sm mx-auto">
                          System settings will become available after backend activation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </main>
      </div>

      {/* Edit User Modal */}
      {editingType === 'user' && editingItem && (
        <div className="fixed inset-0 bg-dark/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full relative">
            <button onClick={() => { setEditingItem(null); setEditingType(null); }} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold font-heading text-dark mb-4">Edit User Account</h3>
            <form onSubmit={handleUpdateUser} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">First Name</label>
                <input 
                  type="text" 
                  value={editingItem.firstName || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, firstName: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={editingItem.lastName || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, lastName: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={editingItem.email || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Phone</label>
                <input 
                  type="text" 
                  value={editingItem.phone || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Role</label>
                <select 
                  value={editingItem.role || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none focus:border-primary text-dark"
                >
                  <option value="consumer">Consumer</option>
                  <option value="producer">Producer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button className="btn-primary w-full py-3 rounded-xl font-bold">Save User Updates</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Consumer Profile Modal */}
      {editingType === 'consumer' && editingItem && (
        <div className="fixed inset-0 bg-dark/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full relative">
            <button onClick={() => { setEditingItem(null); setEditingType(null); }} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold font-heading text-dark mb-4">Edit Consumer Profile</h3>
            <form onSubmit={handleUpdateConsumer} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={editingItem.companyName || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, companyName: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Industry Type</label>
                  <input 
                    type="text" 
                    value={editingItem.industryType || ''} 
                    onChange={(e) => setEditingItem({ ...editingItem, industryType: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">State</label>
                  <input 
                    type="text" 
                    value={editingItem.state || ''} 
                    onChange={(e) => setEditingItem({ ...editingItem, state: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Monthly Bill (₹)</label>
                  <input 
                    type="number" 
                    value={editingItem.monthlyElectricityBill || 0} 
                    onChange={(e) => setEditingItem({ ...editingItem, monthlyElectricityBill: Number(e.target.value) })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Connected Load (MW)</label>
                  <input 
                    type="number" 
                    value={editingItem.connectedLoad || 0} 
                    onChange={(e) => setEditingItem({ ...editingItem, connectedLoad: Number(e.target.value) })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Address</label>
                <input 
                  type="text" 
                  value={editingItem.address || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, address: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                />
              </div>
              <button className="btn-primary w-full py-3 rounded-xl font-bold">Save Consumer Profile</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Producer Profile Modal */}
      {editingType === 'producer' && editingItem && (
        <div className="fixed inset-0 bg-dark/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full relative">
            <button onClick={() => { setEditingItem(null); setEditingType(null); }} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold font-heading text-dark mb-4">Edit Producer Profile</h3>
            <form onSubmit={handleUpdateProducer} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={editingItem.companyName || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, companyName: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Energy Type</label>
                  <input 
                    type="text" 
                    value={editingItem.energyType || ''} 
                    onChange={(e) => setEditingItem({ ...editingItem, energyType: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Plant Capacity (MW)</label>
                  <input 
                    type="number" 
                    value={editingItem.plantCapacity || 0} 
                    onChange={(e) => setEditingItem({ ...editingItem, plantCapacity: Number(e.target.value) })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Location</label>
                  <input 
                    type="text" 
                    value={editingItem.location || ''} 
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tariff (₹)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={editingItem.tariff || 0} 
                    onChange={(e) => setEditingItem({ ...editingItem, tariff: Number(e.target.value) })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Availability</label>
                <input 
                  type="text" 
                  value={editingItem.availability || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, availability: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                />
              </div>
              <button className="btn-primary w-full py-3 rounded-xl font-bold">Save Producer Profile</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Assessment Modal */}
      {editingType === 'assessment' && editingItem && (
        <div className="fixed inset-0 bg-dark/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full relative">
            <button onClick={() => { setEditingItem(null); setEditingType(null); }} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold font-heading text-dark mb-4">Review Energy Assessment Request</h3>
            <form onSubmit={handleUpdateAssessment} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Connected Load (kW)</label>
                  <input 
                    type="number" 
                    value={editingItem.connectedLoad || 0} 
                    onChange={(e) => setEditingItem({ ...editingItem, connectedLoad: Number(e.target.value) })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Monthly Bill (₹)</label>
                  <input 
                    type="number" 
                    value={editingItem.monthlyElectricityBill || 0} 
                    onChange={(e) => setEditingItem({ ...editingItem, monthlyElectricityBill: Number(e.target.value) })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Annual Consumption (kWh)</label>
                  <input 
                    type="number" 
                    value={editingItem.annualConsumption || 0} 
                    onChange={(e) => setEditingItem({ ...editingItem, annualConsumption: Number(e.target.value) })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Current Tariff (₹/unit)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={editingItem.currentTariff || 0} 
                    onChange={(e) => setEditingItem({ ...editingItem, currentTariff: Number(e.target.value) })}
                    className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Operating Hours (hrs/day)</label>
                <input 
                  type="number" 
                  value={editingItem.operatingHours || 0} 
                  onChange={(e) => setEditingItem({ ...editingItem, operatingHours: Number(e.target.value) })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status</label>
                <select 
                  value={editingItem.status || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none text-dark"
                >
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="report_ready">Report Ready</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Admin Advisor Remarks & Recommendations</label>
                <textarea 
                  rows={3} 
                  value={editingItem.recommendations || ''} 
                  onChange={(e) => setEditingItem({ ...editingItem, recommendations: e.target.value })}
                  placeholder="Add custom engineering feedback or consultation tips..."
                  className="bg-slate-50 border border-slate-200 rounded-lg w-full p-2.5 focus:outline-none"
                />
              </div>
              <button className="btn-primary w-full py-3 rounded-xl font-bold">Save Assessment Review</button>
            </form>
          </div>
        </div>
      )}

      {/* CRM Lead Timeline & Assignment Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-dark/45 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 font-sans text-xs">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-2xl w-full relative flex flex-col max-h-[85vh] overflow-hidden text-slate-600">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-sm font-bold font-heading text-dark">Lead CRM Details: {selectedLead.company}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Stage: <strong>{selectedLead.status}</strong> • Client: {selectedLead.name}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left: General Follow-up & Integrations */}
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-dark text-[11px] uppercase border-b border-slate-100 pb-2">Follow-Up & Operations</h4>
                  
                  {/* Follow up Scheduler */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Scheduled Follow-Up Date</label>
                    <input 
                      type="date"
                      className="input-field text-xs"
                      value={selectedLead.followUpDate ? new Date(selectedLead.followUpDate).toISOString().substring(0,10) : ''}
                      onChange={(e) => handleUpdateLeadField(selectedLead._id, { followUpDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Follow-Up Task Notes</label>
                    <textarea 
                      rows={2}
                      placeholder="e.g. Call to discuss contract parameters"
                      className="input-field text-xs py-2"
                      value={selectedLead.followUpNotes || ''}
                      onChange={(e) => setSelectedLead({ ...selectedLead, followUpNotes: e.target.value })}
                      onBlur={() => handleUpdateLeadField(selectedLead._id, { followUpNotes: selectedLead.followUpNotes })}
                    />
                  </div>

                  {/* CRM Integrations */}
                  <div className="space-y-3 pt-2">
                    <h5 className="font-bold text-dark text-[10px] uppercase">Business Integrations</h5>
                    
                    {/* Linked Consultation */}
                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="font-bold text-[9px] text-slate-400 uppercase">Site Audit Audit Inquiry</div>
                      {selectedLead.consultationId ? (
                        <div className="text-dark font-semibold mt-1">✓ Audit Linked: {selectedLead.consultationId.consultationType}</div>
                      ) : (
                        <div className="text-slate-400 italic mt-1">No site audit linked</div>
                      )}
                    </div>

                    {/* Linked Assessment */}
                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="font-bold text-[9px] text-slate-400 uppercase">Feasibility Study Report</div>
                      {selectedLead.assessmentId ? (
                        <div className="text-dark font-semibold mt-1">✓ Report Linked: {selectedLead.assessmentId.state} Node Feasibility</div>
                      ) : (
                        <div className="text-slate-400 italic mt-1">No feasibility assessment linked</div>
                      )}
                    </div>

                    {/* B2B Opportunity */}
                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="font-bold text-[9px] text-slate-400 uppercase">Marketplace B2B Match</div>
                      <select
                        value={selectedLead.opportunityId?._id || selectedLead.opportunityId || ''}
                        onChange={(e) => handleUpdateLeadField(selectedLead._id, { opportunityId: e.target.value })}
                        className="bg-white border border-slate-200 text-xs rounded w-full p-1 mt-1 font-semibold text-slate-600 focus:outline-none"
                      >
                        <option value="">Unlinked</option>
                        {marketplaceOpps.map(opp => (
                          <option key={opp._id} value={opp._id}>PPA Match: {opp.consumerId?.companyName} & {opp.producerId?.companyName}</option>
                        ))}
                      </select>
                    </div>

                    {/* Proposals */}
                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="font-bold text-[9px] text-slate-400 uppercase">Corporate Proposal</div>
                      <select
                        value={selectedLead.proposalId?._id || selectedLead.proposalId || ''}
                        onChange={(e) => handleUpdateLeadField(selectedLead._id, { proposalId: e.target.value })}
                        className="bg-white border border-slate-200 text-xs rounded w-full p-1 mt-1 font-semibold text-slate-600 focus:outline-none"
                      >
                        <option value="">Unlinked</option>
                        {proposals.map(prop => (
                          <option key={prop._id} value={prop._id}>Proposal: {prop.proposalNumber} (₹{prop.amount?.toLocaleString()})</option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>

                {/* Right: Timeline & Notes */}
                <div className="flex flex-col space-y-4">
                  <h4 className="font-heading font-bold text-dark text-[11px] uppercase border-b border-slate-100 pb-2">Activity Timeline</h4>
                  
                  {/* Scrollable Timeline */}
                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 flex-1">
                    {selectedLead.activities?.map((act: any, idx: number) => (
                      <div key={idx} className="relative pl-4 border-l border-slate-200 pb-2 text-[10px]">
                        <div className="absolute w-2 h-2 rounded-full bg-primary -left-[5px] top-1"></div>
                        <div className="flex justify-between font-bold text-dark">
                          <span>{act.action}</span>
                          <span className="text-slate-400 font-normal">{new Date(act.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-500 mt-0.5">{act.details}</p>
                        <p className="text-slate-400 text-[8px] mt-0.5">Performed by: {act.performedBy}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Notes */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Write CRM Notes</label>
                    <form onSubmit={handleAddLeadNote} className="flex gap-2">
                      <input 
                        required
                        type="text"
                        placeholder="Log contact call summary or deal terms..."
                        className="input-field text-xs"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                      />
                      <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-3.5 rounded-xl font-bold">
                        Add
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
              <button 
                onClick={() => setSelectedLead(null)}
                className="btn-primary py-2 px-4 text-xs font-bold rounded-xl bg-primary text-white"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
