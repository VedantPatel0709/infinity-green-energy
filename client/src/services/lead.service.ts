import { supabase } from '@/src/lib/supabase/client';

export const createLead = async (leadData: any) => {
  const { name, email, phone, company, bill, message } = leadData;
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name,
      email,
      phone,
      company,
      bill: Number(bill) || 0,
      message,
      status: 'Pending Assignment'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getLeads = async () => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateLeadStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
