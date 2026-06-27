import { supabase } from '@/src/lib/supabase/client';

export const uploadDocument = async (file: File, bucket: string, userId: string, ownerType: 'producer' | 'consumer' | 'employee') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  const docFields: any = {
    file_name: file.name,
    file_url: publicUrl,
    owner_type: ownerType,
  };

  if (ownerType === 'producer') docFields.producer_id = userId;
  else if (ownerType === 'consumer') docFields.consumer_id = userId;
  else if (ownerType === 'employee') docFields.employee_id = userId;

  const { data: dbData, error: dbError } = await supabase
    .from('documents')
    .insert(docFields)
    .select()
    .single();

  if (dbError) throw dbError;
  return dbData;
};

export const deleteDocument = async (id: string, bucket: string, filePath: string) => {
  if (filePath) {
    const { error: storageError } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
    if (storageError) console.warn('Storage file deletion error:', storageError);
  }

  const { error: dbError } = await supabase
    .from('documents')
    .delete()
    .eq('id', id);

  if (dbError) throw dbError;
};

export const getDocuments = async (userId?: string) => {
  let query = supabase.from('documents').select('*');
  if (userId) {
    query = query.or(`consumer_id.eq.${userId},producer_id.eq.${userId},employee_id.eq.${userId}`);
  }
  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};
