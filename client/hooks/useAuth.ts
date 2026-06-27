'use client';

import { useAuthContext } from '@/src/context/AuthContext';

/**
 * useAuth Hook - Custom hook to manage user authentication state using Supabase Auth Context
 */
export const useAuth = () => {
  const { user, profile, role, loading } = useAuthContext();
  return { user, profile, role, loading };
};
