'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
import { supabase } from '@/src/lib/supabase/client';
import { 
  Zap, TrendingUp, History, Download, Shield, User, Bell, 
  Search, Filter, Plus, FileText, ChevronRight, Layers, Factory, 
  HelpCircle, Landmark, CheckCircle2, AlertCircle, RefreshCw, LogOut, CheckSquare, Settings, X
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

  // Consumer Portal backend data states
  const [profileData, setProfileData] = useState<any>(null);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [dbNotifications, setDbNotifications] = useState<any[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Energy Assessment form state
  const [assessmentState, setAssessmentState] = useState('');
  const [assessmentIndustry, setAssessmentIndustry] = useState('');
  const [assessmentBill, setAssessmentBill] = useState(0);
  const [assessmentLoad, setAssessmentLoad] = useState(0);
  const [assessmentReq, setAssessmentReq] = useState(0);
  const [assessmentAnnual, setAssessmentAnnual] = useState(0);
  const [assessmentTariff, setAssessmentTariff] = useState(0);
  const [assessmentHours, setAssessmentHours] = useState(0);
  const [assessmentNotes, setAssessmentNotes] = useState('');

  // Consultation form state
  const [consultType, setConsultType] = useState('Solar Consultation');
  const [consultNotes, setConsultNotes] = useState('');
  const [viewingReport, setViewingReport] = useState<any>(null);

  // Document upload state
  const [docType, setDocType] = useState('Electricity Bill');
  const [docName, setDocName] = useState('');
  const [docUrl, setDocUrl] = useState('');

  // Profile Form state
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editIndustryType, setEditIndustryType] = useState('');
  const [editState, setEditState] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editContactPerson, setEditContactPerson] = useState('');
  const [editDesignation, setEditDesignation] = useState('');
  const [editMonthlyBill, setEditMonthlyBill] = useState(0);
  const [editAnnualConsumption, setEditAnnualConsumption] = useState(0);
  const [editConnectedLoad, setEditConnectedLoad] = useState(0);

  // Producer Portal backend data states
  const [producerProfile, setProducerProfile] = useState<any>(null);
  const [producerListings, setProducerListings] = useState<any[]>([]);
  const [buyerOpportunities, setBuyerOpportunities] = useState<any[]>([]);

  // Marketplace V1 states
  const [requirements, setRequirements] = useState<any[]>([]);
  const [marketplaceOpportunities, setMarketplaceOpportunities] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [reqIndustry, setReqIndustry] = useState('');
  const [reqState, setReqState] = useState('');
  const [reqCapacity, setReqCapacity] = useState(0);
  const [reqConsumption, setReqConsumption] = useState(0);
  const [reqTariff, setReqTariff] = useState(0);
  const [reqNotes, setReqNotes] = useState('');

  // Proposal Creation modal states
  const [showCreateProposalModal, setShowCreateProposalModal] = useState(false);
  const [selectedOppForProposal, setSelectedOppForProposal] = useState<any>(null);
  const [newPropNumber, setNewPropNumber] = useState('');
  const [newPropAmount, setNewPropAmount] = useState(0);
  const [newPropNotes, setNewPropNotes] = useState('');
  const [newPropCapacity, setNewPropCapacity] = useState('');
  const [newPropTariff, setNewPropTariff] = useState(0);
  const [newPropValidUntil, setNewPropValidUntil] = useState('');
  
  // Producer Listing form state
  const [listingEnergyType, setListingEnergyType] = useState('Solar');
  const [listingCapacity, setListingCapacity] = useState(0);
  const [listingTariff, setListingTariff] = useState(0);
  const [listingLocation, setListingLocation] = useState('');
  const [listingAvailDate, setListingAvailDate] = useState('');
  const [listingNotes, setListingNotes] = useState('');

  // Producer Profile form state
  const [prodCompanyName, setProdCompanyName] = useState('');
  const [prodEnergyType, setProdEnergyType] = useState('Solar');
  const [prodCapacity, setProdCapacity] = useState(0);
  const [prodTariff, setProdTariff] = useState(0);
  const [prodLocation, setProdLocation] = useState('');
  const [prodContactPerson, setProdContactPerson] = useState('');

  const fetchProducerData = async () => {
    if (currentRole !== 'producer' || !user?.id) return;
    try {
      try {
        const { data: profRes, error: profErr } = await supabase
          .from('producers')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profErr) throw profErr;

        setProducerProfile(profRes);
        setProdCompanyName(profRes.company_name || '');
        setProdEnergyType(profRes.technology || 'Solar PV');
        setProdCapacity(profRes.capacity_mw || 0);
        setProdTariff(profRes.tariff || 0);
        setProdLocation(profRes.state || '');
        setProdContactPerson(profRes.contact_person || '');
      } catch (profErr) {
        console.warn('Producer profile not found in Supabase:', profErr);
      }

      const { data: docRes } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id);
      setDocuments(docRes || []);

      const { data: notifRes } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id);
      setDbNotifications(notifRes || []);

      const { data: oppsProp } = await supabase
        .from('proposals')
        .select('*')
        .eq('user_id', user.id);
      setProposals(oppsProp || []);

    } catch (err) {
      console.error('Error loading producer data:', err);
    }
  };

  useEffect(() => {
    if (currentRole === 'producer') {
      fetchProducerData();
    }
  }, [currentRole]);

  // Producer handlers
  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/listings', {
        energyType: listingEnergyType,
        capacityAvailable: Number(listingCapacity),
        tariff: Number(listingTariff),
        location: listingLocation,
        availabilityDate: listingAvailDate ? new Date(listingAvailDate) : undefined,
        notes: listingNotes
      });
      alert('Marketplace listing published successfully! ⚡');
      setListingCapacity(0);
      setListingTariff(0);
      setListingLocation('');
      setListingAvailDate('');
      setListingNotes('');
      fetchProducerData();
    } catch (err: any) {
      alert(err.message || 'Failed to publish listing ❌');
    }
  };

  const handleUpdateListingStatus = async (listingId: string, newStatus: string) => {
    try {
      await api.put(`/listings/${listingId}`, { status: newStatus });
      alert(`Listing ${newStatus} successfully! ✅`);
      fetchProducerData();
    } catch (err: any) {
      alert(err.message || 'Failed to update listing ❌');
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      await api.delete(`/listings/${listingId}`);
      alert('Listing deleted successfully! ✅');
      fetchProducerData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete listing ❌');
    }
  };

  const handleSaveProducerProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/producers/profile', {
        companyName: prodCompanyName,
        energyType: prodEnergyType,
        plantCapacity: Number(prodCapacity),
        tariff: Number(prodTariff),
        location: prodLocation,
        contactPerson: prodContactPerson
      });
      alert('Producer profile updated successfully! ✅');
      fetchProducerData();
    } catch (err: any) {
      alert(err.message || 'Failed to update profile ❌');
    }
  };

  const fetchConsumerData = async () => {
    if (currentRole !== 'consumer') return;
    setLoadingProfile(true);
    try {
      // Load Profile
      try {
        const profRes: any = await api.get('/consumers/profile');
        setProfileData(profRes);
        setEditCompanyName(profRes.companyName || '');
        setEditIndustryType(profRes.industryType || '');
        setEditState(profRes.state || '');
        setEditAddress(profRes.address || '');
        setEditContactPerson(profRes.contactPerson || '');
        setEditDesignation(profRes.designation || '');
        setEditMonthlyBill(profRes.monthlyElectricityBill || 0);
        setEditAnnualConsumption(profRes.annualConsumption || 0);
        setEditConnectedLoad(profRes.connectedLoad || 0);
      } catch (profErr) {
        console.warn('Profile not found, user needs to create one.');
      }

      // Load Assessments
      const assessRes: any = await api.get('/assessments/my');
      setAssessments(assessRes || []);

      // Load Consultations
      const consultRes: any = await api.get('/consultations/my');
      setConsultations(consultRes || []);

      // Load Proposals
      const proposalRes: any = await api.get('/proposals/my');
      setProposals(proposalRes || []);

      // Load Contracts
      const contractRes: any = await api.get('/contracts/my');
      setContracts(Array.isArray(contractRes) ? contractRes : []);

      // Load Documents
      const docRes: any = await api.get('/documents/my');
      setDocuments(docRes || []);

      // Load Notifications
      const notifRes: any = await api.get('/notifications');
      setDbNotifications(notifRes || []);

      const requirementsRes: any = await api.get('/requirements/my');
      setRequirements(Array.isArray(requirementsRes) ? requirementsRes : []);

      const marketOppRes: any = await api.get('/marketplace-opportunities/my');
      setMarketplaceOpportunities(Array.isArray(marketOppRes) ? marketOppRes : []);

    } catch (err) {
      console.error('Error loading consumer data:', err);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchConsumerData();
  }, [currentRole]);

  // Handler functions
  const handleCreateAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/assessments', {
        state: assessmentState,
        industry: assessmentIndustry,
        monthlyElectricityBill: Number(assessmentBill),
        connectedLoad: Number(assessmentLoad),
        energyRequirement: Number(assessmentReq),
        annualConsumption: Number(assessmentAnnual),
        currentTariff: Number(assessmentTariff),
        operatingHours: Number(assessmentHours),
        additionalNotes: assessmentNotes
      });
      setAssessmentAnnual(0);
      setAssessmentTariff(0);
      setAssessmentHours(0);
      setAssessmentNotes('');
      fetchConsumerData();
    } catch (err: any) {
      alert(err.message || 'Failed to submit assessment request ❌');
    }
  };

  const handleCreateRequirement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/requirements', {
        industry: reqIndustry,
        state: reqState,
        requiredCapacity: Number(reqCapacity),
        monthlyConsumption: Number(reqConsumption),
        preferredTariff: Number(reqTariff),
        notes: reqNotes
      });
      alert('Energy requirement posted to marketplace successfully! ⚡');
      setReqIndustry('');
      setReqState('');
      setReqCapacity(0);
      setReqConsumption(0);
      setReqTariff(0);
      setReqNotes('');
      fetchConsumerData();
    } catch (err: any) {
      alert(err.message || 'Failed to post requirement ❌');
    }
  };

  const handleUpdateOpportunity = async (oppId: string, status: string) => {
    try {
      await api.put(`/marketplace-opportunities/${oppId}`, { status });
      alert(`Opportunity status updated to ${status} successfully ✅`);
      if (currentRole === 'consumer') fetchConsumerData();
      else fetchProducerData();
    } catch (err: any) {
      alert(err.message || 'Failed to update opportunity ❌');
    }
  };

  const handleCreateProposalByProducer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOppForProposal) return;
    try {
      await api.post('/proposals', {
        userId: selectedOppForProposal.consumerId?._id || selectedOppForProposal.consumerId,
        producerId: selectedOppForProposal.producerId?._id || selectedOppForProposal.producerId,
        opportunity: selectedOppForProposal._id,
        proposalNumber: newPropNumber,
        capacityRequirement: newPropCapacity || `${selectedOppForProposal.requirementId?.requiredCapacity || 0} MW`,
        estimatedTariff: Number(newPropTariff || selectedOppForProposal.listingId?.tariff || 0),
        amount: Number(newPropAmount),
        notes: newPropNotes,
        validUntil: newPropValidUntil ? new Date(newPropValidUntil) : undefined,
        status: 'under_review'
      });
      alert('Proposal drafted and submitted for review successfully! 📄');
      setShowCreateProposalModal(false);
      setSelectedOppForProposal(null);
      setNewPropNumber('');
      setNewPropAmount(0);
      setNewPropNotes('');
      setNewPropCapacity('');
      setNewPropTariff(0);
      setNewPropValidUntil('');
      fetchProducerData();
    } catch (err: any) {
      alert(err.message || 'Failed to submit proposal ❌');
    }
  };

  const handleConsumerActionOnProposal = async (propId: string, status: string) => {
    try {
      await api.put(`/proposals/${propId}`, { status });
      alert(`Proposal ${status} successfully! ✅`);
      fetchConsumerData();
    } catch (err: any) {
      alert(err.message || 'Failed to update proposal status ❌');
    }
  };

  const handleSignContract = async (contractId: string) => {
    try {
      await api.post(`/contracts/${contractId}/sign`, {});
      alert('Contract signed successfully! ✍️');
      if (currentRole === 'consumer') fetchConsumerData();
      else fetchProducerData();
    } catch (err: any) {
      alert(err.message || 'Failed to sign contract ❌');
    }
  };

  const handleCreateConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/consultations', {
        consultationType: consultType,
        notes: consultNotes
      });
      alert('Consultation scheduled successfully! ✅');
      setConsultNotes('');
      fetchConsumerData();
    } catch (err: any) {
      alert(err.message || 'Failed to request consultation ❌');
    }
  };

  const handleUpdateProposal = async (proposalId: string, newStatus: string) => {
    try {
      await api.put(`/proposals/${proposalId}`, { status: newStatus });
      alert(`Proposal ${newStatus} successfully! ✅`);
      fetchConsumerData();
    } catch (err: any) {
      alert(err.message || 'Failed to update proposal status ❌');
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName || !docUrl) {
      alert('Please provide document title and simulated URL.');
      return;
    }
    try {
      await api.post('/documents', {
        documentType: docType,
        fileName: docName,
        fileUrl: docUrl
      });
      alert('Document metadata logged successfully! ✅');
      setDocName('');
      setDocUrl('');
      fetchConsumerData();
    } catch (err: any) {
      alert(err.message || 'Failed to save document record ❌');
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm('Are you sure you want to remove this document?')) return;
    try {
      await api.delete(`/documents/${docId}`);
      alert('Document removed successfully! ✅');
      fetchConsumerData();
    } catch (err: any) {
      alert(err.message || 'Failed to remove document ❌');
    }
  };

  const handleMarkNotifRead = async (notifId: string) => {
    try {
      await api.put(`/notifications/${notifId}/read`, {});
      fetchConsumerData();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteNotif = async (notifId: string) => {
    try {
      await api.delete(`/notifications/${notifId}`);
      fetchConsumerData();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/consumers/profile', {
        companyName: editCompanyName,
        industryType: editIndustryType,
        state: editState,
        address: editAddress,
        contactPerson: editContactPerson,
        designation: editDesignation,
        monthlyElectricityBill: Number(editMonthlyBill),
        annualConsumption: Number(editAnnualConsumption),
        connectedLoad: Number(editConnectedLoad)
      });
      alert('Company profile updated successfully! ✅');
      fetchConsumerData();
    } catch (err: any) {
      alert(err.message || 'Failed to update profile ❌');
    }
  };

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
        const data = await api.get('/leads');
        setLeads(Array.isArray(data) ? data : []);
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
                  onClick={() => setConsumerTab('assessments')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${consumerTab === 'assessments' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <Factory className="w-4 h-4" /> Energy Assessments
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
                  onClick={() => setConsumerTab('contracts')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${consumerTab === 'contracts' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <CheckSquare className="w-4 h-4" /> Contract Center
                </button>
                <button 
                  onClick={() => setConsumerTab('marketplace')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${consumerTab === 'marketplace' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <Search className="w-4 h-4" /> Marketplace Requirements
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
                  {dbNotifications.filter(n => !n.read).length > 0 && (
                    <span className="bg-accent text-dark text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {dbNotifications.filter(n => !n.read).length}
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
                  <TrendingUp className="w-4 h-4" /> Buyer Opportunities
                </button>
                <button 
                  onClick={() => setProducerTab('contracts')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${producerTab === 'contracts' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <CheckSquare className="w-4 h-4" /> Capacity Management
                </button>
                <button 
                  onClick={() => setProducerTab('documents')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${producerTab === 'documents' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <FileText className="w-4 h-4" /> Documents
                </button>
                <button 
                  onClick={() => setProducerTab('notifications')} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${producerTab === 'notifications' ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <span className="flex items-center gap-3"><Bell className="w-4 h-4" /> Notifications</span>
                  {dbNotifications.filter(n => !n.read).length > 0 && (
                    <span className="bg-accent text-dark text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {dbNotifications.filter(n => !n.read).length}
                    </span>
                  )}
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
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Monthly Energy Bill</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">
                          ₹{profileData?.monthlyElectricityBill?.toLocaleString('en-IN') || '0'}
                        </div>
                        <div className="text-[10px] text-primary font-bold mt-1">✓ Active Connection</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Potential Monthly Savings</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">
                          ₹{profileData?.monthlyElectricityBill ? (profileData.monthlyElectricityBill * 0.35).toLocaleString('en-IN') : '0'}
                        </div>
                        <div className="text-[10px] text-accent font-bold mt-1">↓ ~35% Potential Offset</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Consultations</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">
                          {consultations.length}
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans mt-1">Scheduled & running</div>
                      </div>
                      <div className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/10">
                        <span className="opacity-90 text-[10px] font-bold uppercase tracking-wider">Estimated Connected Load</span>
                        <div className="text-2xl font-black mt-2 font-heading">
                          {profileData?.connectedLoad || '0'} kW
                        </div>
                        <div className="text-[10px] opacity-80 mt-1">Audited Capacity</div>
                      </div>
                    </div>

                    {/* Quick overview grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Active Proposals */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4">
                        <h3 className="font-heading font-bold text-dark text-sm">Active Proposals</h3>
                        {proposals.length === 0 ? (
                          <p className="text-xs text-slate-400 font-sans">No active contract proposals at this time.</p>
                        ) : (
                          <div className="space-y-3 font-sans text-xs">
                            {proposals.slice(0, 3).map((prop) => (
                              <div key={prop._id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                                <div>
                                  <div className="font-bold text-dark">{prop.proposalNumber}</div>
                                  <div className="text-[10px] text-slate-400">Tariff: ₹{prop.estimatedTariff}/unit</div>
                                </div>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold ${
                                  prop.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  prop.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {prop.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Recent Assessments */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4">
                        <h3 className="font-heading font-bold text-dark text-sm">Energy Assessments</h3>
                        {assessments.length === 0 ? (
                          <p className="text-xs text-slate-400 font-sans">No energy assessment studies requested yet.</p>
                        ) : (
                          <div className="space-y-3 font-sans text-xs">
                            {assessments.slice(0, 3).map((ass) => (
                              <div key={ass._id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                                <div>
                                  <div className="font-bold text-dark">{ass.industry} ({ass.state})</div>
                                  <div className="text-[10px] text-slate-400">Load: {ass.connectedLoad} kW</div>
                                </div>
                                <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-bold">
                                  {ass.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {consumerTab === 'assessments' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <h3 className="text-lg font-bold font-heading text-dark">Submit Energy Assessment Request</h3>
                      <form onSubmit={handleCreateAssessment} className="space-y-4 font-sans text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">State</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="e.g. Gujarat" 
                              className="input-field" 
                              value={assessmentState} 
                              onChange={(e) => setAssessmentState(e.target.value)} 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Industry Type</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="e.g. Chemical Manufacturing" 
                              className="input-field" 
                              value={assessmentIndustry} 
                              onChange={(e) => setAssessmentIndustry(e.target.value)} 
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Monthly Bill (₹)</label>
                            <input 
                              required 
                              type="number" 
                              placeholder="e.g. 500000" 
                              className="input-field" 
                              value={assessmentBill || ''} 
                              onChange={(e) => setAssessmentBill(Number(e.target.value))} 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Connected Load (kW)</label>
                            <input 
                              required 
                              type="number" 
                              placeholder="e.g. 150" 
                              className="input-field" 
                              value={assessmentLoad || ''} 
                              onChange={(e) => setAssessmentLoad(Number(e.target.value))} 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Energy Requirement (kWh/month)</label>
                            <input 
                              required 
                              type="number" 
                              placeholder="e.g. 75000" 
                              className="input-field" 
                              value={assessmentReq || ''} 
                              onChange={(e) => setAssessmentReq(Number(e.target.value))} 
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Annual Consumption (kWh/yr)</label>
                            <input 
                              required 
                              type="number" 
                              placeholder="e.g. 900000" 
                              className="input-field" 
                              value={assessmentAnnual || ''} 
                              onChange={(e) => setAssessmentAnnual(Number(e.target.value))} 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Current Tariff (₹/unit)</label>
                            <input 
                              required 
                              type="number" 
                              step="0.01"
                              placeholder="e.g. 8.20" 
                              className="input-field" 
                              value={assessmentTariff || ''} 
                              onChange={(e) => setAssessmentTariff(Number(e.target.value))} 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Operating Hours (hrs/day)</label>
                            <input 
                              required 
                              type="number" 
                              placeholder="e.g. 16" 
                              className="input-field" 
                              value={assessmentHours || ''} 
                              onChange={(e) => setAssessmentHours(Number(e.target.value))} 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Additional Load Details & Notes</label>
                          <textarea 
                            rows={3} 
                            placeholder="Describe any rooftop spaces, load curves or wheeling details..." 
                            className="input-field" 
                            value={assessmentNotes} 
                            onChange={(e) => setAssessmentNotes(e.target.value)} 
                          />
                        </div>

                        <button type="submit" className="btn-primary py-3 px-6 text-xs font-bold rounded-xl">Request Free Feasibility Study</button>
                      </form>
                    </div>

                    {/* Assessment History Table */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-heading font-bold text-dark text-sm">Assessment History</h3>
                      </div>
                      <div className="overflow-x-auto text-xs text-slate-500">
                        {assessments.length === 0 ? (
                          <div className="p-6 text-center text-slate-400 font-sans">No assessments filed yet.</div>
                        ) : (
                          <table className="w-full text-left">
                            <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100 text-dark">
                              <tr>
                                <th className="px-6 py-3">Industry</th>
                                <th className="px-6 py-3">State</th>
                                <th className="px-6 py-3">Connected Load</th>
                                <th className="px-6 py-3">Req. Energy</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-sans text-xs">
                              {assessments.map((ass) => (
                                <tr key={ass._id} className="hover:bg-slate-50/50">
                                  <td className="px-6 py-4 font-bold text-dark">{ass.industry}</td>
                                  <td className="px-6 py-4">{ass.state}</td>
                                  <td className="px-6 py-4">{ass.connectedLoad} kW</td>
                                  <td className="px-6 py-4">{ass.energyRequirement?.toLocaleString()} kWh</td>
                                  <td className="px-6 py-4">
                                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{ass.status.replace('_', ' ')}</span>
                                  </td>
                                  <td className="px-6 py-4 text-slate-400">{new Date(ass.createdAt).toLocaleDateString()}</td>
                                  <td className="px-6 py-4 text-right">
                                    {ass.generatedReport ? (
                                      <button 
                                        onClick={() => setViewingReport(ass)}
                                        className="bg-primary hover:bg-primary-dark text-white text-[9px] px-2.5 py-1 rounded-lg font-bold"
                                      >
                                        View Report
                                      </button>
                                    ) : (
                                      <span className="text-[10px] text-slate-400">Processing</span>
                                    )}
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

                {consumerTab === 'consultations' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <h3 className="text-lg font-bold font-heading text-dark">Schedule Consultation</h3>
                      <form onSubmit={handleCreateConsultation} className="space-y-4 font-sans text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Consultation Objective</label>
                          <select 
                            className="input-field" 
                            value={consultType} 
                            onChange={(e) => setConsultType(e.target.value)}
                          >
                            <option>Solar Consultation</option>
                            <option>Open Access Consultation</option>
                            <option>Energy Audit</option>
                            <option>General Consultation</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Discussion Notes & Scope</label>
                          <textarea 
                            rows={3} 
                            placeholder="Share your available energy billing cycles or compliance goals..." 
                            className="input-field" 
                            value={consultNotes} 
                            onChange={(e) => setConsultNotes(e.target.value)} 
                          />
                        </div>
                        <button type="submit" className="btn-primary py-3 px-6 text-xs font-bold rounded-xl">Book Advisory Session</button>
                      </form>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-heading font-bold text-dark text-sm">Consultation Requests</h3>
                      </div>
                      <div className="overflow-x-auto text-xs text-slate-500">
                        {consultations.length === 0 ? (
                          <div className="p-6 text-center text-slate-400 font-sans">No consultation sessions booked.</div>
                        ) : (
                          <table className="w-full text-left">
                            <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100 text-dark">
                              <tr>
                                <th className="px-6 py-3">Objective</th>
                                <th className="px-6 py-3">Notes</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date Requested</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-sans">
                              {consultations.map((c) => (
                                <tr key={c._id} className="hover:bg-slate-50/50">
                                  <td className="px-6 py-4 font-bold text-dark">{c.consultationType}</td>
                                  <td className="px-6 py-4 max-w-xs truncate">{c.notes}</td>
                                  <td className="px-6 py-4">
                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                                      c.status === 'completed' ? 'bg-green-100 text-green-800' :
                                      c.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                      'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {c.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {consumerTab === 'proposals' && (
                  <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold font-heading text-dark">Active PPA Tariff Proposals</h3>
                        <span className="text-[10px] bg-accent/20 text-accent font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {proposals.filter(p => p.status === 'draft' || p.status === 'under_review').length} Actionable Options
                        </span>
                      </div>
                      
                      <div className="space-y-4 font-sans text-xs text-slate-500">
                        {proposals.length === 0 ? (
                          <p className="text-xs text-slate-400">No active tariff agreements loaded.</p>
                        ) : (
                          proposals.map((prop) => (
                            <div key={prop._id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <h4 className="font-bold text-dark text-sm">{prop.proposalNumber}</h4>
                                <div className="text-xs text-slate-500 mt-1 space-y-1">
                                  <p>Feeder Capacity: <strong>{prop.capacityRequirement || 'N/A'}</strong> • Proposed Tariff: <strong>₹{prop.estimatedTariff}/unit</strong></p>
                                  <p>Proposed Amount: <strong>₹{prop.amount?.toLocaleString()}</strong> • Status: <strong className="uppercase">{prop.status}</strong></p>
                                  {prop.producerId && <p>Producer Company: <strong>{prop.producerId.companyName}</strong></p>}
                                  {prop.notes && <p className="italic text-[10px]">Notes: &quot;{prop.notes}&quot;</p>}
                                </div>
                              </div>
                              
                              {prop.status === 'under_review' && (
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => handleConsumerActionOnProposal(prop._id, 'approved')} 
                                    className="btn-primary py-2 px-4 text-xs font-bold rounded-lg whitespace-nowrap bg-primary text-white"
                                  >
                                    Accept Proposal
                                  </button>
                                  <button 
                                    onClick={() => handleConsumerActionOnProposal(prop._id, 'rejected')} 
                                    className="py-2 px-4 text-xs font-bold rounded-lg whitespace-nowrap border border-slate-200 hover:bg-slate-100 text-slate-600 bg-white"
                                  >
                                    Decline
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {consumerTab === 'contracts' && (
                  <div className="space-y-6 max-w-4xl animate-in fade-in duration-200 font-sans text-xs text-slate-500">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold font-heading text-dark">Your Power Purchase Agreements (PPAs)</h3>
                        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Contracts Queue</span>
                      </div>
                      
                      <div className="space-y-4">
                        {contracts.length === 0 ? (
                          <div className="text-center p-6 text-slate-400">No contracts active or pending signature.</div>
                        ) : (
                          contracts.map((contract) => (
                            <div key={contract._id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-dark text-sm">{contract.contractNumber}</h4>
                                  <p className="text-slate-500 mt-1">
                                    Producer Partner: <strong>{contract.producer?.companyName || 'Green Energy Producer'}</strong>
                                  </p>
                                  <p className="text-slate-400 text-[10px] mt-1">
                                    Validity: {new Date(contract.startDate).toLocaleDateString()} to {new Date(contract.endDate).toLocaleDateString()}
                                  </p>
                                  <div className="mt-2 text-[10px] text-slate-400 space-y-1">
                                    <div>Consumer Signature Status: {contract.signedByConsumer ? '✍️ Signed' : '❌ Pending'}</div>
                                    <div>Producer Signature Status: {contract.signedByProducer ? '✍️ Signed' : '❌ Pending'}</div>
                                  </div>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                  contract.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  contract.status === 'pending_signature' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  'bg-slate-100 text-slate-500 border border-slate-200'
                                }`}>
                                  {contract.status.replace('_', ' ')}
                                </span>
                              </div>

                              {contract.status === 'pending_signature' && !contract.signedByConsumer && (
                                <div className="pt-2 border-t border-slate-200 flex justify-end">
                                  <button 
                                    onClick={() => handleSignContract(contract._id)}
                                    className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-[10px] font-bold"
                                  >
                                    Sign Contract (Confirm PPA)
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {consumerTab === 'documents' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <h3 className="text-lg font-bold font-heading text-dark">Log Grid Document Upload</h3>
                      <form onSubmit={handleUploadDocument} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end font-sans text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Document Category</label>
                          <select 
                            className="input-field" 
                            value={docType} 
                            onChange={(e) => setDocType(e.target.value)}
                          >
                            <option>Electricity Bill</option>
                            <option>Feasibility NOC</option>
                            <option>Tax Registration</option>
                            <option>Corporate PPA Draft</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">File Name</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="e.g. Q1_Audit_Manson.pdf" 
                            className="input-field" 
                            value={docName} 
                            onChange={(e) => setDocName(e.target.value)} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Simulated URL path</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="e.g. /uploads/ NOC.pdf" 
                            className="input-field" 
                            value={docUrl} 
                            onChange={(e) => setDocUrl(e.target.value)} 
                          />
                        </div>
                        <button type="submit" className="sm:col-span-4 btn-primary py-3 px-6 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 max-w-xs">
                          <Plus className="w-4 h-4" /> Save Document Info
                        </button>
                      </form>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-sans">
                      {documents.length === 0 ? (
                        <div className="sm:col-span-3 text-center p-6 text-slate-400">No documents uploaded yet.</div>
                      ) : (
                        documents.map((doc) => (
                          <div key={doc._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/30 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-dark truncate font-heading">{doc.fileName}</h4>
                                <span className="text-[10px] text-slate-400">{doc.documentType}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-50">
                              <button 
                                onClick={() => alert(`Downloading Document: ${doc.fileName} from path ${doc.fileUrl}`)} 
                                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                              >
                                <Download className="w-4.5 h-4.5" /> Download
                              </button>
                              <button 
                                onClick={() => handleDeleteDocument(doc._id)} 
                                className="text-xs font-bold text-red-500 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {consumerTab === 'notifications' && (
                  <div className="max-w-3xl bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-heading font-bold text-dark text-sm">Notifications Feed</h3>
                      <button 
                        onClick={() => {
                          dbNotifications.forEach(n => handleMarkNotifRead(n._id));
                          alert('Marked all notifications as read! ✅');
                        }} 
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Mark All Read
                      </button>
                    </div>
                    <div className="divide-y divide-slate-100 font-sans text-xs">
                      {dbNotifications.length === 0 ? (
                        <div className="p-6 text-center text-slate-400">No active alerts.</div>
                      ) : (
                        dbNotifications.map((n) => (
                          <div key={n._id} className={`p-6 flex items-start justify-between gap-4 transition-colors ${n.read ? 'bg-white' : 'bg-primary/5'}`}>
                            <div className="flex items-start gap-4">
                              <button 
                                onClick={() => handleMarkNotifRead(n._id)}
                                className={`p-2 rounded-xl mt-0.5 ${n.read ? 'bg-slate-100 text-slate-400' : 'bg-primary/10 text-primary'}`}
                              >
                                <Bell className="w-4 h-4" />
                              </button>
                              <div>
                                <h4 className="font-bold text-dark text-sm">{n.title}</h4>
                                <p className="text-slate-500 mt-1">{n.message}</p>
                                <span className="text-[9px] text-slate-400 block mt-2">
                                  {new Date(n.createdAt).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDeleteNotif(n._id)} 
                              className="text-slate-400 hover:text-red-500 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {consumerTab === 'profile' && (
                  <div className="max-w-3xl bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold font-heading text-dark mb-6">Company Profile Settings</h3>
                    <form onSubmit={handleSaveProfile} className="space-y-4 font-sans text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Company Name</label>
                          <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={editCompanyName} 
                            onChange={(e) => setEditCompanyName(e.target.value)} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Industry Sector</label>
                          <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={editIndustryType} 
                            onChange={(e) => setEditIndustryType(e.target.value)} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">State Node</label>
                          <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={editState} 
                            onChange={(e) => setEditState(e.target.value)} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Company Address</label>
                          <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={editAddress} 
                            onChange={(e) => setEditAddress(e.target.value)} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Contact Person</label>
                          <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={editContactPerson} 
                            onChange={(e) => setEditContactPerson(e.target.value)} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Corporate Designation</label>
                          <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={editDesignation} 
                            onChange={(e) => setEditDesignation(e.target.value)} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Avg Monthly Electricity Bill (₹)</label>
                          <input 
                            required 
                            type="number" 
                            className="input-field" 
                            value={editMonthlyBill || ''} 
                            onChange={(e) => setEditMonthlyBill(Number(e.target.value))} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Annual Grid Consumption (Units)</label>
                          <input 
                            required 
                            type="number" 
                            className="input-field" 
                            value={editAnnualConsumption || ''} 
                            onChange={(e) => setEditAnnualConsumption(Number(e.target.value))} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Connected Grid Load (kW)</label>
                          <input 
                            required 
                            type="number" 
                            className="input-field" 
                            value={editConnectedLoad || ''} 
                            onChange={(e) => setEditConnectedLoad(Number(e.target.value))} 
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn-primary py-3.5 px-6 text-xs font-bold rounded-xl mt-4">Save Company Profile</button>
                    </form>
                  </div>
                )}
                {consumerTab === 'marketplace' && (
                  <div className="space-y-8 animate-in fade-in duration-200 text-xs font-sans">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left: Create Requirement Form */}
                      <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                        <div>
                          <h3 className="text-base font-bold font-heading text-dark">Submit Energy Requirement</h3>
                          <p className="text-slate-400 text-[10px] mt-1">Post your power requirements for manual B2B matchmaking</p>
                        </div>
                        <form onSubmit={handleCreateRequirement} className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Industry Type</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="e.g. Textiles, Steel, Automotive"
                              className="input-field" 
                              value={reqIndustry} 
                              onChange={(e) => setReqIndustry(e.target.value)} 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">State Node</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="e.g. Gujarat, Maharashtra"
                              className="input-field" 
                              value={reqState} 
                              onChange={(e) => setReqState(e.target.value)} 
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Capacity (MW)</label>
                              <input 
                               required 
                               type="number" 
                               step="any"
                               placeholder="e.g. 5"
                               className="input-field" 
                               value={reqCapacity || ''} 
                               onChange={(e) => setReqCapacity(Number(e.target.value))} 
                             />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Tariff (₹/kWh)</label>
                              <input 
                               required 
                               type="number" 
                               step="any"
                               placeholder="e.g. 4.5"
                               className="input-field" 
                               value={reqTariff || ''} 
                               onChange={(e) => setReqTariff(Number(e.target.value))} 
                             />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Monthly Consumption (kWh)</label>
                            <input 
                              required 
                              type="number" 
                              placeholder="e.g. 150000"
                              className="input-field" 
                              value={reqConsumption || ''} 
                              onChange={(e) => setReqConsumption(Number(e.target.value))} 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Additional Notes</label>
                            <textarea 
                              rows={3}
                              placeholder="Describe preferred scheduling, contract period, etc..."
                              className="input-field py-2" 
                              value={reqNotes} 
                              onChange={(e) => setReqNotes(e.target.value)} 
                            />
                          </div>
                          <button type="submit" className="w-full btn-primary py-3 px-4 font-bold rounded-xl flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" /> Post Energy Requirement
                          </button>
                        </form>
                      </div>

                      {/* Right: Requirements and Opportunities Trackers */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Posted Requirements */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4">
                          <h3 className="text-base font-bold font-heading text-dark">Your Postings</h3>
                          {requirements.length === 0 ? (
                            <p className="text-slate-400 text-xs py-4 text-center">No energy requirements posted yet.</p>
                          ) : (
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                              {requirements.map((reqItem: any) => (
                                <div key={reqItem._id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center">
                                  <div>
                                    <div className="font-bold text-dark">{reqItem.requiredCapacity} MW - {reqItem.industry}</div>
                                    <div className="text-[10px] text-slate-400 mt-1">
                                      Tariff Limit: ₹{reqItem.preferredTariff}/unit • State: {reqItem.state} • Consumption: {reqItem.monthlyConsumption?.toLocaleString()} kWh
                                    </div>
                                    {reqItem.notes && <p className="text-[10px] text-slate-400 italic mt-1">&quot;{reqItem.notes}&quot;</p>}
                                  </div>
                                  <div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                      reqItem.status === 'open' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                      reqItem.status === 'matched' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                      reqItem.status === 'negotiation' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                      'bg-slate-100 text-slate-600 border border-slate-200'
                                    }`}>
                                      {reqItem.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Matched B2B Opportunities */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4">
                          <h3 className="text-base font-bold font-heading text-dark">B2B Matched Opportunities</h3>
                          {marketplaceOpportunities.length === 0 ? (
                            <p className="text-slate-400 text-xs py-4 text-center">No matched opportunities from the grid administrators yet.</p>
                          ) : (
                            <div className="space-y-4">
                              {marketplaceOpportunities.map((opp: any) => (
                                <div key={opp._id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="text-[9px] font-bold text-accent uppercase tracking-wider">Matched Partner</span>
                                      <h4 className="font-bold text-dark text-sm mt-0.5">{opp.producerId?.companyName || 'Green Power Producer'}</h4>
                                      <div className="text-[10px] text-slate-400 mt-1">
                                        Plant Capacity: {opp.listingId?.capacityAvailable} MW • Type: {opp.listingId?.energyType} • Listing Tariff: ₹{opp.listingId?.tariff}/unit
                                      </div>
                                      <div className="text-[10px] text-slate-400 mt-1">
                                        Your Demand: {opp.requirementId?.requiredCapacity} MW • Target Tariff: ₹{opp.requirementId?.preferredTariff}/unit
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
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
                                    </div>
                                  </div>
                                  
                                  {/* Action Buttons to Transition Status */}
                                  <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2 items-center justify-between">
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">Change Status:</span>
                                    <div className="flex gap-1.5">
                                      <button 
                                        onClick={() => handleUpdateOpportunity(opp._id, 'contacted')}
                                        className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded text-[9px] font-bold"
                                      >
                                        Contacted
                                      </button>
                                      <button 
                                        onClick={() => handleUpdateOpportunity(opp._id, 'negotiation')}
                                        className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded text-[9px] font-bold"
                                      >
                                        Negotiate
                                      </button>
                                      <button 
                                        onClick={() => handleUpdateOpportunity(opp._id, 'won')}
                                        className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 px-2 py-1 rounded text-[9px] font-bold"
                                      >
                                        Accept Offer
                                      </button>
                                      <button 
                                        onClick={() => handleUpdateOpportunity(opp._id, 'lost')}
                                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 px-2 py-1 rounded text-[9px] font-bold"
                                      >
                                        Reject Offer
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Feeder Grid Capacity</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">
                          {producerProfile?.plantCapacity || '0'} MW
                        </div>
                        <div className="text-[10px] text-accent font-bold mt-1">✓ Live Injection</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Listings</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">
                          {producerListings.filter(l => l.status === 'active').length} Offers
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans mt-1">Marketplace Spot Feed</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Buyer Opportunities</span>
                        <div className="text-2xl font-black text-dark mt-2 font-heading">
                          {buyerOpportunities.length} Leads
                        </div>
                        <div className="text-[10px] text-primary font-bold mt-1">Ready for Matchmaking</div>
                      </div>
                      <div className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/10">
                        <span className="opacity-90 text-[10px] font-bold uppercase tracking-wider">Feeder Base Tariff</span>
                        <div className="text-2xl font-black mt-2 font-heading">
                          ₹{producerProfile?.tariff || '0.00'}/u
                        </div>
                        <div className="text-[10px] opacity-80 mt-1">Wheeling Rate Locked</div>
                      </div>
                    </div>

                    {/* Dashboard charts and logs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Active Marketplace listings */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4">
                        <h3 className="font-heading font-bold text-dark text-sm">Active Energy Listings</h3>
                        {producerListings.length === 0 ? (
                          <p className="text-xs text-slate-400">No active spot capacity offers registered.</p>
                        ) : (
                          <div className="space-y-3 font-sans text-xs">
                            {producerListings.slice(0, 3).map((list) => (
                              <div key={list._id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                                <div>
                                  <div className="font-bold text-dark">{list.capacityAvailable} MW - {list.energyType}</div>
                                  <div className="text-[10px] text-slate-400">Tariff: ₹{list.tariff}/unit • {list.location}</div>
                                </div>
                                <span className="text-[9px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold uppercase">{list.status}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Buyer Opportunities */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4">
                        <h3 className="font-heading font-bold text-dark text-sm">Industrial Buyer Needs</h3>
                        {buyerOpportunities.length === 0 ? (
                          <p className="text-xs text-slate-400">No active buyer tenders published.</p>
                        ) : (
                          <div className="space-y-3 font-sans text-xs">
                            {buyerOpportunities.slice(0, 3).map((opp) => (
                              <div key={opp._id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                                <div>
                                  <div className="font-bold text-dark">{opp.companyName}</div>
                                  <div className="text-[10px] text-slate-400">{opp.industryType} • Load: {opp.requiredCapacity} MW</div>
                                </div>
                                <span className="text-[9px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold uppercase">{opp.status}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {producerTab === 'listings' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
                      <h3 className="text-lg font-bold font-heading text-dark mb-4">Register New Spot Capacity</h3>
                      <form onSubmit={handleCreateListing} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end font-sans text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Generation Source</label>
                          <select 
                            className="input-field" 
                            value={listingEnergyType} 
                            onChange={(e) => setListingEnergyType(e.target.value)}
                          >
                            <option>Solar</option>
                            <option>Wind</option>
                            <option>Hydro</option>
                            <option>Hybrid</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Capacity (in MW)</label>
                          <input 
                            required
                            type="number" 
                            step="0.1" 
                            placeholder="e.g. 3.5" 
                            className="input-field"
                            value={listingCapacity || ''}
                            onChange={(e) => setListingCapacity(Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Target Tariff (₹/unit)</label>
                          <input 
                            required
                            type="number" 
                            step="0.05" 
                            placeholder="e.g. 4.10" 
                            className="input-field"
                            value={listingTariff || ''}
                            onChange={(e) => setListingTariff(Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Interconnection Location</label>
                          <input 
                            required
                            type="text" 
                            placeholder="e.g. Charanka, Gujarat" 
                            className="input-field"
                            value={listingLocation}
                            onChange={(e) => setListingLocation(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Availability Date</label>
                          <input 
                            required
                            type="date" 
                            className="input-field"
                            value={listingAvailDate}
                            onChange={(e) => setListingAvailDate(e.target.value)}
                          />
                        </div>
                        <button type="submit" className="btn-primary w-full py-4 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"><Plus className="w-4 h-4" /> Publish Listing</button>
                      </form>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden text-xs text-slate-500">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-heading font-bold text-dark text-sm">Active Marketplace Listings</h3>
                      </div>
                      <div className="overflow-x-auto">
                        {producerListings.length === 0 ? (
                          <div className="p-6 text-center text-slate-400 font-sans">No listings posted.</div>
                        ) : (
                          <table className="w-full text-left">
                            <thead className="bg-slate-50/60 uppercase font-bold text-[9px] tracking-wider border-b border-slate-100 text-dark">
                              <tr>
                                <th className="px-6 py-3">Capacity</th>
                                <th className="px-6 py-3">Generation Type</th>
                                <th className="px-6 py-3">Tariff</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-sans">
                              {producerListings.map(listing => (
                                <tr key={listing._id} className="hover:bg-slate-50/50">
                                  <td className="px-6 py-4 font-bold text-dark">{listing.capacityAvailable} MW</td>
                                  <td className="px-6 py-4">{listing.energyType}</td>
                                  <td className="px-6 py-4 font-semibold text-primary">₹{listing.tariff}/unit</td>
                                  <td className="px-6 py-4">{listing.location}</td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                      listing.status === 'active' ? 'bg-primary/10 text-primary' : 
                                      listing.status === 'paused' ? 'bg-amber-100 text-amber-700' :
                                      'bg-slate-100 text-slate-500'
                                    }`}>
                                      {listing.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right flex justify-end gap-2 items-center">
                                    <div className="flex gap-2">
                                      {listing.status !== 'active' && (
                                        <button 
                                          onClick={() => handleUpdateListingStatus(listing._id, 'active')}
                                          className="text-[10px] font-bold text-primary hover:underline"
                                        >
                                          Activate
                                        </button>
                                      )}
                                      {listing.status !== 'paused' && (
                                        <button 
                                          onClick={() => handleUpdateListingStatus(listing._id, 'paused')}
                                          className="text-[10px] font-bold text-amber-600 hover:underline"
                                        >
                                          Pause
                                        </button>
                                      )}
                                      {listing.status !== 'closed' && (
                                        <button 
                                          onClick={() => handleUpdateListingStatus(listing._id, 'closed')}
                                          className="text-[10px] font-bold text-slate-500 hover:underline"
                                        >
                                          Close
                                        </button>
                                      )}
                                      <button 
                                        onClick={() => handleDeleteListing(listing._id)}
                                        className="text-[10px] font-bold text-red-500 hover:underline"
                                      >
                                        Delete
                                      </button>
                                    </div>
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

                {producerTab === 'requests' && (
                  <div className="space-y-6 max-w-4xl animate-in fade-in duration-200 text-xs font-sans text-slate-500">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold font-heading text-dark">Active Buyer Opportunities</h3>
                        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Tenders Queue</span>
                      </div>
                      
                      <div className="space-y-4">
                        {buyerOpportunities.length === 0 ? (
                          <div className="text-center p-6 text-slate-400">No buyer needs published.</div>
                        ) : (
                          buyerOpportunities.map((opp) => (
                            <div key={opp._id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase">{opp.industryType}</span>
                                <h4 className="font-bold text-dark text-sm mt-0.5">{opp.companyName}</h4>
                                <p className="text-slate-500 mt-1">Required Capacity: {opp.requiredCapacity} MW • Target Hub: {opp.location} • Status: <strong className="uppercase">{opp.status}</strong></p>
                              </div>
                              <button 
                                onClick={() => {
                                  alert(`Offer matching generated for ${opp.companyName}! Proposal logged.`);
                                }} 
                                className="btn-primary py-2 px-4 text-xs font-bold rounded-lg whitespace-nowrap"
                              >
                                Match Capacity
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {/* B2B Marketplace Opportunities Section */}
                      <div className="pt-6 border-t border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-base font-bold font-heading text-dark">B2B Matched Opportunities</h3>
                          <span className="text-[10px] bg-accent/20 text-accent font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Marketplace Matches</span>
                        </div>

                        <div className="space-y-4">
                          {marketplaceOpportunities.length === 0 ? (
                            <div className="text-center p-6 text-slate-400">No admin-matched B2B opportunities.</div>
                          ) : (
                            marketplaceOpportunities.map((opp: any) => (
                              <div key={opp._id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="text-[9px] font-bold text-primary uppercase tracking-wider">Matched Buyer</span>
                                    <h4 className="font-bold text-dark text-sm mt-0.5">{opp.consumerId?.companyName || 'Energy Consumer'}</h4>
                                    <div className="text-[10px] text-slate-400 mt-1">
                                      Industry: {opp.requirementId?.industry} • Location: {opp.requirementId?.state}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-1">
                                      Required: {opp.requirementId?.requiredCapacity} MW • Target Tariff: ₹{opp.requirementId?.preferredTariff}/unit • Consumption: {opp.requirementId?.monthlyConsumption?.toLocaleString()} kWh
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-1 font-bold">
                                      Matched Listing: {opp.listingId?.capacityAvailable} MW @ ₹{opp.listingId?.tariff}/unit ({opp.listingId?.energyType})
                                    </div>
                                    {opp.notes && <p className="text-[10px] text-slate-400 italic mt-1">&quot;Match Notes: {opp.notes}&quot;</p>}
                                  </div>
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
                                </div>

                                <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2 items-center justify-between">
                                  <span className="text-[9px] text-slate-400 font-bold uppercase">Actions:</span>
                                  <div className="flex gap-1.5">
                                    <button 
                                      onClick={() => {
                                        setSelectedOppForProposal(opp);
                                        setNewPropNumber(`PROP-${Date.now()}`);
                                        setNewPropAmount(Number((opp.requirementId?.monthlyConsumption || 0) * (opp.listingId?.tariff || 4)));
                                        setNewPropCapacity(`${opp.requirementId?.requiredCapacity || 0} MW`);
                                        setNewPropTariff(opp.listingId?.tariff || 0);
                                        setShowCreateProposalModal(true);
                                      }}
                                      className="bg-primary hover:bg-primary-dark text-white px-2.5 py-1 rounded text-[9px] font-bold"
                                    >
                                      Create Proposal
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateOpportunity(opp._id, 'contacted')}
                                      className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded text-[9px] font-bold"
                                    >
                                      Contact Buyer
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateOpportunity(opp._id, 'proposal_sent')}
                                      className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded text-[9px] font-bold"
                                    >
                                      Send Proposal
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateOpportunity(opp._id, 'negotiation')}
                                      className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded text-[9px] font-bold"
                                    >
                                      Negotiate
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateOpportunity(opp._id, 'won')}
                                      className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 px-2 py-1 rounded text-[9px] font-bold"
                                    >
                                      Mark Won
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateOpportunity(opp._id, 'lost')}
                                      className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 px-2 py-1 rounded text-[9px] font-bold"
                                    >
                                      Mark Lost
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {producerTab === 'contracts' && (
                  <div className="space-y-8 animate-in fade-in duration-200 font-sans text-xs text-slate-500">
                    {/* Part 1: Proposal Tracking */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold font-heading text-dark">Your Submitted B2B Proposals</h3>
                        <span className="text-[10px] bg-primary/15 text-primary font-bold px-2 py-0.5 rounded-full uppercase">Deal Pipeline</span>
                      </div>
                      <div className="space-y-4">
                        {proposals.length === 0 ? (
                          <p className="text-center p-6 text-slate-400">No drafted or submitted proposals.</p>
                        ) : (
                          proposals.map((prop) => (
                            <div key={prop._id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center">
                              <div>
                                <h4 className="font-bold text-dark text-xs">{prop.proposalNumber}</h4>
                                <div className="text-[10px] text-slate-400 mt-1">
                                  Capacity: {prop.capacityRequirement} • Tariff: ₹{prop.estimatedTariff}/unit • Amount: ₹{prop.amount?.toLocaleString()}
                                </div>
                                {prop.notes && <p className="italic text-[10px] text-slate-400 mt-1">Notes: &quot;{prop.notes}&quot;</p>}
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                prop.status === 'draft' ? 'bg-slate-100 text-slate-500' :
                                prop.status === 'under_review' ? 'bg-amber-100 text-amber-700' :
                                prop.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {prop.status.replace('_', ' ')}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Part 2: Contract Management */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold font-heading text-dark">Power Purchase Agreements (Contracts)</h3>
                        <span className="text-[10px] bg-accent/20 text-accent font-bold px-2 py-0.5 rounded-full uppercase">Legal Registry</span>
                      </div>
                      <div className="space-y-4">
                        {contracts.length === 0 ? (
                          <p className="text-center p-6 text-slate-400">No active contracts drafted.</p>
                        ) : (
                          contracts.map((contract) => (
                            <div key={contract._id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-dark text-xs">{contract.contractNumber}</h4>
                                  <p className="text-[10px] text-slate-400 mt-1">Consumer Client: {contract.consumer?.companyName || 'Corporate Buyer'}</p>
                                  <p className="text-[10px] text-slate-400">Validity: {new Date(contract.startDate).toLocaleDateString()} to {new Date(contract.endDate).toLocaleDateString()}</p>
                                  <div className="mt-2 text-[10px] text-slate-400 space-y-1">
                                    <div>Consumer Signature Status: {contract.signedByConsumer ? '✍️ Signed' : '❌ Pending'}</div>
                                    <div>Producer Signature Status: {contract.signedByProducer ? '✍️ Signed' : '❌ Pending'}</div>
                                  </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                  contract.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                  contract.status === 'pending_signature' ? 'bg-amber-100 text-amber-700' :
                                  'bg-slate-100 text-slate-500'
                                }`}>
                                  {contract.status.replace('_', ' ')}
                                </span>
                              </div>

                              {contract.status === 'pending_signature' && !contract.signedByProducer && (
                                <div className="pt-2 border-t border-slate-200 flex justify-end">
                                  <button 
                                    onClick={() => handleSignContract(contract._id)}
                                    className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-[10px] font-bold"
                                  >
                                    Sign Contract (Execute Deal)
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {producerTab === 'documents' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
                      <h3 className="text-lg font-bold font-heading text-dark">Log Grid Certifications & Documents</h3>
                      <form onSubmit={handleUploadDocument} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end font-sans text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Document Category</label>
                          <select 
                            className="input-field" 
                            value={docType} 
                            onChange={(e) => setDocType(e.target.value)}
                          >
                            <option>Regulatory Approval</option>
                            <option>Plant Certification</option>
                            <option>Generation Report</option>
                            <option>Grid Feeder NOC</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">File Name</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="e.g. SLDC_Sync_SLA.pdf" 
                            className="input-field" 
                            value={docName} 
                            onChange={(e) => setDocName(e.target.value)} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Simulated URL path</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="e.g. /uploads/feeder-noc.pdf" 
                            className="input-field" 
                            value={docUrl} 
                            onChange={(e) => setDocUrl(e.target.value)} 
                          />
                        </div>
                        <button type="submit" className="sm:col-span-4 btn-primary py-3 px-6 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 max-w-xs">
                          <Plus className="w-4 h-4" /> Log Certification File
                        </button>
                      </form>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-sans">
                      {documents.length === 0 ? (
                        <div className="sm:col-span-3 text-center p-6 text-slate-400">No documents cataloged yet.</div>
                      ) : (
                        documents.map((doc) => (
                          <div key={doc._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/30 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-dark truncate font-heading">{doc.fileName}</h4>
                                <span className="text-[10px] text-slate-400">{doc.documentType}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-50 text-xs">
                              <button 
                                onClick={() => alert(`Downloading Certificate: ${doc.fileName} from path ${doc.fileUrl}`)} 
                                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                              >
                                <Download className="w-4.5 h-4.5" /> Download
                              </button>
                              <button 
                                onClick={() => handleDeleteDocument(doc._id)} 
                                className="text-xs font-bold text-red-500 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {producerTab === 'notifications' && (
                  <div className="max-w-3xl bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden animate-in fade-in duration-200">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-heading font-bold text-dark text-sm">Notifications Feed</h3>
                      <button 
                        onClick={() => {
                          dbNotifications.forEach(n => handleMarkNotifRead(n._id));
                          alert('Marked all notifications as read! ✅');
                        }} 
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Mark All Read
                      </button>
                    </div>
                    <div className="divide-y divide-slate-100 font-sans text-xs">
                      {dbNotifications.length === 0 ? (
                        <div className="p-6 text-center text-slate-400">No active alerts.</div>
                      ) : (
                        dbNotifications.map((n) => (
                          <div key={n._id} className={`p-6 flex items-start justify-between gap-4 transition-colors ${n.read ? 'bg-white' : 'bg-primary/5'}`}>
                            <div className="flex items-start gap-4">
                              <button 
                                onClick={() => handleMarkNotifRead(n._id)}
                                className={`p-2 rounded-xl mt-0.5 ${n.read ? 'bg-slate-100 text-slate-400' : 'bg-primary/10 text-primary'}`}
                              >
                                <Bell className="w-4 h-4" />
                              </button>
                              <div>
                                <h4 className="font-bold text-dark text-sm">{n.title}</h4>
                                <p className="text-slate-500 mt-1">{n.message}</p>
                                <span className="text-[9px] text-slate-400 block mt-2">
                                  {new Date(n.createdAt).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDeleteNotif(n._id)} 
                              className="text-slate-400 hover:text-red-500 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {producerTab === 'profile' && (
                  <div className="max-w-3xl bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold font-heading text-dark mb-6">Producer Plant Settings</h3>
                    <form onSubmit={handleSaveProducerProfile} className="space-y-4 font-sans text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Plant Owner Entity</label>
                          <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={prodCompanyName} 
                            onChange={(e) => setProdCompanyName(e.target.value)} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Energy Type</label>
                          <select 
                            className="input-field" 
                            value={prodEnergyType} 
                            onChange={(e) => setProdEnergyType(e.target.value)}
                          >
                            <option>Solar</option>
                            <option>Wind</option>
                            <option>Hydro</option>
                            <option>Hybrid</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Plant Location</label>
                          <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={prodLocation} 
                            onChange={(e) => setProdLocation(e.target.value)} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Contact Person</label>
                          <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={prodContactPerson} 
                            onChange={(e) => setProdContactPerson(e.target.value)} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Plant Capacity (in MW)</label>
                          <input 
                            required 
                            type="number" 
                            className="input-field" 
                            value={prodCapacity || ''} 
                            onChange={(e) => setProdCapacity(Number(e.target.value))} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Base Tariff Wheeling Rate (₹/unit)</label>
                          <input 
                            required 
                            type="number" 
                            step="0.05"
                            className="input-field" 
                            value={prodTariff || ''} 
                            onChange={(e) => setProdTariff(Number(e.target.value))} 
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn-primary py-3.5 px-6 text-xs font-bold rounded-xl mt-4">Save Plant Configurations</button>
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
                        <div className="text-xl font-black text-slate-300 mt-2 font-heading">Awaiting Sync</div>
                        <div className="text-[10px] text-slate-400 font-sans mt-1">No operational data available yet</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Unresolved Inquiries</span>
                        <div className="text-xl font-black text-slate-300 mt-2 font-heading">Awaiting Sync</div>
                        <div className="text-[10px] text-slate-400 font-sans mt-1">No operational data available yet</div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Grid Wheeling Volume</span>
                        <div className="text-xl font-black text-slate-300 mt-2 font-heading">Awaiting Sync</div>
                        <div className="text-[10px] text-slate-400 font-sans mt-1">No operational data available yet</div>
                      </div>
                      <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg">
                        <span className="opacity-95 text-[10px] font-bold uppercase tracking-wider">Total Revenue Managed</span>
                        <div className="text-xl font-black text-slate-500 mt-2 font-heading">Awaiting Sync</div>
                        <div className="text-[10px] opacity-80 mt-1">No operational data available yet</div>
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
                          <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-sans text-xs">
                              Awaiting Backend Sync
                            </td>
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
                      <div className="p-20 text-center text-slate-400 font-sans text-xs">Awaiting Backend Sync</div>
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
                          <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-sans text-xs">
                              Awaiting Backend Sync
                            </td>
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
                          <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-sans text-xs">
                              Awaiting Backend Sync
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

      {/* Energy Assessment Report Modal */}
      {viewingReport && (
        <div className="fixed inset-0 bg-dark/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setViewingReport(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <div id="printable-report">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider font-heading">Feasibility Study</span>
                  <h3 className="text-lg font-bold font-heading text-dark">Infinity Green Energy Assessment</h3>
                </div>
                <div className="text-right text-[10px] text-slate-400 font-mono">
                  <div>Status: <span className="text-primary font-bold uppercase">{viewingReport.status.replace('_', ' ')}</span></div>
                  <div>Dated: {new Date(viewingReport.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 font-sans text-xs">
                <div>
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase mb-1">Company/Facility Details</h4>
                  <p className="text-dark font-medium">{viewingReport.industry} Facility</p>
                  <p className="text-slate-500">State jurisdiction: {viewingReport.state}</p>
                  <p className="text-slate-500">Operating hours: {viewingReport.operatingHours || 0} hrs/day</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase mb-1">Grid Parameters</h4>
                  <p className="text-slate-500">Connected Contracted Load: {viewingReport.connectedLoad} kW</p>
                  <p className="text-slate-500">Annual Consumption: {viewingReport.annualConsumption?.toLocaleString() || 0} kWh</p>
                  <p className="text-slate-500">Monthly Bill Size: ₹{viewingReport.monthlyElectricityBill?.toLocaleString()}</p>
                  <p className="text-slate-500">Current Tariff: ₹{viewingReport.currentTariff ? viewingReport.currentTariff.toFixed(2) : '0.00'}/unit</p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-6">
                <h4 className="text-emerald-800 font-bold font-heading text-xs mb-3">Green Energy Forecast Output</h4>
                <div className="grid grid-cols-3 gap-4 font-sans text-xs">
                  <div>
                    <span className="block text-[10px] text-emerald-600 font-bold uppercase">Estimated Savings</span>
                    <strong className="text-lg font-black text-emerald-800">₹{viewingReport.generatedReport?.estimatedSavings?.toLocaleString()}/yr</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-emerald-600 font-bold uppercase">Solar Roof Potential</span>
                    <strong className="text-lg font-black text-emerald-800">{viewingReport.generatedReport?.solarPotential} kW</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-emerald-600 font-bold uppercase">Open Access Potential</span>
                    <strong className="text-lg font-black text-emerald-800">{viewingReport.generatedReport?.openAccessPotential || 0} kW</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-4 font-sans text-xs border-t border-slate-100 pt-5">
                <div>
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase mb-1">Recommended Solution</h4>
                  <p className="text-dark font-semibold">{viewingReport.generatedReport?.suggestedSolution || 'Processing preliminary data...'}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase mb-1">Consultation Recommendation</h4>
                  <p className="text-slate-700">{viewingReport.generatedReport?.consultationRecommendation}</p>
                </div>
                {viewingReport.recommendations && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-600 text-[10px] uppercase mb-1">Admin Advisor Remarks</h4>
                    <p className="text-slate-800 italic">&quot;{viewingReport.recommendations}&quot;</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => window.print()} 
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Export Report (PDF)
              </button>
              <button 
                onClick={() => setViewingReport(null)} 
                className="btn-primary px-4 py-2 rounded-xl text-xs font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Producer B2B Proposal Creation Modal */}
      {showCreateProposalModal && selectedOppForProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans text-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-heading font-bold text-dark text-sm">Draft B2B Power Proposal</h3>
              <button onClick={() => setShowCreateProposalModal(false)} className="text-slate-400 hover:text-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateProposalByProducer} className="p-6 space-y-4 text-slate-600">
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                <div className="font-bold text-dark text-[10px] uppercase">Matched Buyer Client:</div>
                <div className="text-sm font-black text-primary mt-1">{selectedOppForProposal.consumerId?.companyName || 'Corporate Buyer'}</div>
                <div className="text-[10px] text-slate-400 mt-1">Matched Listing: {selectedOppForProposal.listingId?.capacityAvailable} MW @ ₹{selectedOppForProposal.listingId?.tariff}/unit</div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Proposal Code / Number</label>
                <input 
                  required 
                  type="text" 
                  className="input-field" 
                  value={newPropNumber} 
                  onChange={(e) => setNewPropNumber(e.target.value)} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Capacity Target</label>
                  <input 
                    required 
                    type="text" 
                    className="input-field" 
                    value={newPropCapacity} 
                    onChange={(e) => setNewPropCapacity(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Tariff (₹/unit)</label>
                  <input 
                    required 
                    type="number" 
                    step="0.01" 
                    className="input-field" 
                    value={newPropTariff || ''} 
                    onChange={(e) => setNewPropTariff(Number(e.target.value))} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Estimated Amount (₹)</label>
                  <input 
                    required 
                    type="number" 
                    className="input-field" 
                    value={newPropAmount || ''} 
                    onChange={(e) => setNewPropAmount(Number(e.target.value))} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Valid Until</label>
                  <input 
                    required 
                    type="date" 
                    className="input-field" 
                    value={newPropValidUntil} 
                    onChange={(e) => setNewPropValidUntil(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Proposal Memo / Notes</label>
                <textarea 
                  rows={2}
                  placeholder="Terms of delivery, scheduling grid injection details..."
                  className="input-field py-2" 
                  value={newPropNotes} 
                  onChange={(e) => setNewPropNotes(e.target.value)} 
                />
              </div>

              <button type="submit" className="w-full btn-primary py-3 font-bold rounded-xl bg-primary text-white">
                Submit Proposal for Admin Approval
              </button>
            </form>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}