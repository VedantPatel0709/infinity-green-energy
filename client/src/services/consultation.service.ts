import { supabase } from '@/src/lib/supabase/client';

export const getConsultations = async (userId?: string) => {
  let query = supabase.from('consultations').select('*');
  if (userId) {
    query = query.eq('user_id', userId);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createConsultation = async (consultationData: any) => {
  const { data, error } = await supabase
    .from('consultations')
    .insert({
      ...consultationData,
      status: 'Scheduled'
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateConsultation = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('consultations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};
