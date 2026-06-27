import { supabase } from '@/src/lib/supabase/client';

export const registerConsumer = async (fields: any) => {
  const { email, password, fullName, phone, companyName, industry, location, requiredCapacityMw, requirementType, monthlyBill } = fields;

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  const user = data.user;
  if (!user) throw new Error('User creation failed');

  // Update profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      phone: phone,
      role: 'consumer'
    })
    .eq('id', user.id);
  if (profileError) throw profileError;

  // Insert consumer metadata
  const { error: consumerError } = await supabase
    .from('consumers')
    .insert({
      id: user.id,
      profile_id: user.id,
      company_name: companyName,
      industry: industry,
      location: location,
      required_capacity_mw: Number(requiredCapacityMw) || 0,
      requirement_type: requirementType,
      monthly_bill: monthlyBill
    });
  if (consumerError) throw consumerError;

  return user;
};

export const registerProducer = async (fields: any) => {
  const { email, password, fullName, phone, companyName, technology, capacityMw, state, website, description, contactPerson } = fields;

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  const user = data.user;
  if (!user) throw new Error('User creation failed');

  // Update profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      phone: phone,
      role: 'producer'
    })
    .eq('id', user.id);
  if (profileError) throw profileError;

  // Insert producer metadata
  const { error: producerError } = await supabase
    .from('producers')
    .insert({
      id: user.id,
      profile_id: user.id,
      company_name: companyName,
      technology: technology,
      capacity_mw: Number(capacityMw) || 0,
      state: state,
      website: website || '',
      description: description || '',
      contact_person: contactPerson,
      email: email,
      phone: phone
    });
  if (producerError) throw producerError;

  return user;
};

export const login = async (credentials: any) => {
  const { email, password } = credentials;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const forgotPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login/reset`
  });
  if (error) throw error;
  return data;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return { user, profile };
};
