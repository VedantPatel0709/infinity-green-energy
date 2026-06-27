import { supabase } from '@/src/lib/supabase/client';

export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createNotification = async (userId: string, title: string, message: string, type: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      title,
      message,
      type,
      read: false
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};
