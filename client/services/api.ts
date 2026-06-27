import { supabase } from '@/src/lib/supabase/client';

const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

export const api = {
  get: async (endpoint: string) => {
    const user = await getCurrentUser();
    
    // Normalize path by stripping query params
    const path = endpoint.split('?')[0];

    // 1. Consumers Profile
    if (path === '/consumers/profile') {
      if (!user) return {};
      const { data, error } = await supabase
        .from('consumers')
        .select('*')
        .eq('profile_id', user.id)
        .maybeSingle();
      if (error) console.error(error);
      return data ? {
        companyName: data.company_name,
        industryType: data.industry,
        state: data.location,
        address: data.address || '',
        contactPerson: data.contact_person || '',
        designation: data.designation || '',
        monthlyElectricityBill: data.monthly_bill || 0,
        annualConsumption: data.annual_consumption || 0,
        connectedLoad: data.connected_load || 0,
        id: data.id,
        _id: data.id
      } : {};
    }

    // 2. Producers Profile
    if (path === '/producers/profile') {
      if (!user) return {};
      const { data, error } = await supabase
        .from('producers')
        .select('*')
        .eq('profile_id', user.id)
        .maybeSingle();
      if (error) console.error(error);
      return data ? {
        companyName: data.company_name,
        energyType: data.technology,
        plantCapacity: data.capacity_mw,
        tariff: data.tariff || 4.20,
        location: data.state,
        description: data.description || '',
        contactPerson: data.contact_person || '',
        id: data.id,
        _id: data.id
      } : {};
    }

    // 3. Assessments
    if (path === '/assessments/my') {
      if (!user) return [];
      const { data } = await supabase.from('leads').select('*').eq('consumer_id', user.id);
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        state: d.state,
        industry: d.industry,
        monthlyElectricityBill: d.monthly_bill,
        connectedLoad: d.connected_load || 150,
        energyRequirement: d.energy_requirement || 2.5,
        annualConsumption: d.annual_consumption || 18000,
        currentTariff: d.current_tariff || 6.8,
        operatingHours: d.operating_hours || 12,
        additionalNotes: d.additional_notes || d.message || '',
        status: d.status
      })) || [];
    }
    if (path === '/assessments') {
      const { data } = await supabase.from('leads').select('*');
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        state: d.state,
        industry: d.industry,
        monthlyElectricityBill: d.monthly_bill,
        connectedLoad: d.connected_load || 150,
        energyRequirement: d.energy_requirement || 2.5,
        status: d.status
      })) || [];
    }

    // 4. Consultations
    if (path === '/consultations/my') {
      if (!user) return [];
      const { data } = await supabase.from('consultations').select('*').eq('user_id', user.id);
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        consultationType: d.consultation_type,
        notes: d.notes,
        status: d.status,
        createdAt: d.created_at
      })) || [];
    }
    if (path === '/consultations') {
      const { data } = await supabase.from('consultations').select('*');
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        consultationType: d.consultation_type,
        notes: d.notes,
        status: d.status,
        createdAt: d.created_at
      })) || [];
    }

    // 5. Proposals
    if (path === '/proposals/my') {
      if (!user) return [];
      const { data } = await supabase.from('proposals').select('*, producers(company_name)').eq('consumer_id', user.id);
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        proposalNumber: d.proposal_number || `PROP-${d.id.slice(0, 5).toUpperCase()}`,
        capacityRequirement: d.capacity_requirement || '2.5 MW',
        estimatedTariff: d.price_per_unit || d.estimated_tariff || 4.20,
        amount: d.amount || 250000,
        notes: d.remarks || d.notes,
        status: d.status,
        producerId: d.producers ? { companyName: d.producers.company_name } : { companyName: 'Infinity Green Desk' }
      })) || [];
    }
    if (path === '/proposals') {
      const { data } = await supabase.from('proposals').select('*, producers(company_name), consumers(company_name)');
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        proposalNumber: d.proposal_number || `PROP-${d.id.slice(0, 5).toUpperCase()}`,
        capacityRequirement: d.capacity_requirement || '2.5 MW',
        estimatedTariff: d.price_per_unit || d.estimated_tariff || 4.20,
        amount: d.amount || 250000,
        notes: d.remarks || d.notes,
        status: d.status,
        producerId: d.producers ? { companyName: d.producers.company_name } : { companyName: 'Infinity Green Desk' },
        consumerId: d.consumers ? { companyName: d.consumers.company_name } : { companyName: 'Infinity Consumer' }
      })) || [];
    }

    // 6. Contracts
    if (path === '/contracts/my') {
      if (!user) return [];
      const { data } = await supabase.from('proposals').select('*, producers(company_name)').or(`consumer_id.eq.${user.id},producer_id.eq.${user.id}`);
      return data?.filter(d => d.status === 'Accepted' || d.status === 'Negotiation').map(d => ({
        _id: d.id,
        id: d.id,
        contractNumber: `CTR-${d.id.slice(0, 5).toUpperCase()}`,
        producer: d.producers ? { companyName: d.producers.company_name } : { companyName: 'Infinity Green Desk' },
        startDate: d.created_at,
        endDate: new Date(Date.now() + 15 * 365 * 24 * 60 * 60 * 1000).toISOString(),
        signedByConsumer: d.status === 'Accepted',
        signedByProducer: true,
        status: d.status === 'Accepted' ? 'active' : 'pending_signature'
      })) || [];
    }
    if (path === '/contracts') {
      const { data } = await supabase.from('proposals').select('*, producers(company_name), consumers(company_name)');
      return data?.filter(d => d.status === 'Accepted' || d.status === 'Negotiation').map(d => ({
        _id: d.id,
        id: d.id,
        contractNumber: `CTR-${d.id.slice(0, 5).toUpperCase()}`,
        producer: d.producers ? { companyName: d.producers.company_name } : { companyName: 'Infinity Green Desk' },
        consumer: d.consumers ? { companyName: d.consumers.company_name } : { companyName: 'Infinity Consumer' },
        startDate: d.created_at,
        endDate: new Date(Date.now() + 15 * 365 * 24 * 60 * 60 * 1000).toISOString(),
        status: d.status === 'Accepted' ? 'active' : 'pending_signature'
      })) || [];
    }

    // 7. Documents
    if (path === '/documents/my' || path === '/documents') {
      const { data } = await supabase.from('documents').select('*');
      const filtered = (user && path === '/documents/my') 
        ? data?.filter(d => d.consumer_id === user.id || d.producer_id === user.id || d.employee_id === user.id) 
        : data;
      return filtered?.map(d => ({
        _id: d.id,
        id: d.id,
        documentType: d.owner_type === 'consumer' ? 'Electricity Bill' : 'Grid Feasibility Noc',
        fileName: d.file_name,
        fileUrl: d.file_url,
        status: 'Verified',
        createdAt: d.created_at
      })) || [];
    }

    // 8. Notifications
    if (path === '/notifications') {
      if (!user) return [];
      const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id);
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        title: d.title,
        body: d.message,
        time: 'Just now',
        read: d.read
      })) || [];
    }

    // 9. Users (Admin Management)
    if (path === '/users') {
      const { data } = await supabase.from('profiles').select('*');
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        email: d.email,
        role: d.role,
        status: d.status,
        createdAt: d.created_at
      })) || [];
    }

    // 10. Consumers / Producers Lists
    if (path === '/consumers') {
      const { data } = await supabase.from('consumers').select('*');
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        companyName: d.company_name,
        industryType: d.industry,
        state: d.location,
        status: d.status
      })) || [];
    }
    if (path === '/producers') {
      const { data } = await supabase.from('producers').select('*');
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        companyName: d.company_name,
        technology: d.technology,
        capacityMw: d.capacity_mw,
        state: d.state,
        status: d.status
      })) || [];
    }

    // 11. Leads (CRM)
    if (path === '/leads') {
      const { data } = await supabase.from('leads').select('*');
      return data?.map(d => ({
        _id: d.id,
        id: d.id,
        contactPerson: d.contact_person,
        email: d.email,
        phone: d.phone,
        monthlyBill: d.monthly_bill,
        state: d.state,
        industry: d.industry,
        status: d.status,
        createdAt: d.created_at
      })) || [];
    }

    // Fallback/Others
    return [];
  },

  post: async (endpoint: string, body: Record<string, any>) => {
    const user = await getCurrentUser();

    if (endpoint === '/consumers/profile') {
      if (!user) throw new Error('Unauthenticated');
      const { data, error } = await supabase.from('consumers').upsert({
        id: user.id,
        profile_id: user.id,
        company_name: body.companyName,
        industry: body.industryType,
        location: body.state,
        address: body.address,
        contact_person: body.contactPerson,
        designation: body.designation,
        monthly_bill: body.monthlyElectricityBill,
        annual_consumption: body.annualConsumption,
        connected_load: body.connectedLoad
      }).select().single();
      if (error) throw error;
      return data;
    }

    if (endpoint === '/producers/profile') {
      if (!user) throw new Error('Unauthenticated');
      const { data, error } = await supabase.from('producers').upsert({
        id: user.id,
        profile_id: user.id,
        company_name: body.companyName,
        technology: body.energyType,
        capacity_mw: body.plantCapacity,
        tariff: body.tariff,
        state: body.location,
        contact_person: body.contactPerson
      }).select().single();
      if (error) throw error;
      return data;
    }

    if (endpoint === '/assessments') {
      const { data, error } = await supabase.from('leads').insert({
        consumer_id: user?.id,
        contact_person: user?.user_metadata?.full_name || 'Consumer Site',
        email: user?.email || '',
        phone: '9999999999',
        monthly_bill: body.monthlyElectricityBill || 0,
        state: body.state,
        industry: body.industry,
        status: 'Pending Assignment'
      }).select().single();
      if (error) throw error;
      return data;
    }

    if (endpoint === '/consultations') {
      const { data, error } = await supabase.from('consultations').insert({
        user_id: user?.id,
        consultation_type: body.consultationType,
        notes: body.notes,
        status: 'Scheduled'
      }).select().single();
      if (error) throw error;
      return data;
    }

    if (endpoint === '/proposals') {
      const { data, error } = await supabase.from('proposals').insert({
        consumer_id: body.userId,
        producer_id: body.producerId || user?.id,
        proposal_number: body.proposalNumber,
        capacity_requirement: body.capacityRequirement,
        price_per_unit: body.estimatedTariff,
        amount: body.amount || 500000,
        remarks: body.notes,
        status: 'Draft'
      }).select().single();
      if (error) throw error;
      return data;
    }

    if (endpoint === '/documents') {
      const { data, error } = await supabase.from('documents').insert({
        file_name: body.fileName,
        file_url: body.fileUrl,
        owner_type: 'consumer',
        consumer_id: user?.id
      }).select().single();
      if (error) throw error;
      return data;
    }

    return {};
  },

  put: async (endpoint: string, body: Record<string, any>) => {
    // proposal status update
    if (endpoint.startsWith('/proposals/')) {
      const id = endpoint.split('/')[2];
      const { data, error } = await supabase.from('proposals').update({
        status: body.status
      }).eq('id', id).select().single();
      if (error) throw error;
      return data;
    }
    // user status update
    if (endpoint.startsWith('/users/') && endpoint.endsWith('/status')) {
      const id = endpoint.split('/')[2];
      const { data, error } = await supabase.from('profiles').update({
        status: body.status || 'Active'
      }).eq('id', id).select().single();
      if (error) throw error;
      return data;
    }

    return {};
  },

  delete: async (endpoint: string) => {
    if (endpoint.startsWith('/documents/')) {
      const id = endpoint.split('/')[2];
      const { error } = await supabase.from('documents').delete().eq('id', id);
      if (error) throw error;
    }
    return {};
  }
};