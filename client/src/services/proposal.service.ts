import { supabase } from '@/src/lib/supabase/client';

export const getProposals = async (userId?: string) => {
  let query = supabase.from('proposals').select('*');
  if (userId) {
    query = query.eq('user_id', userId);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const updateProposalStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('proposals')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};
