'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase/client';

type AuthContextType = {
  user: any;
  profile: any;
  role: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  role: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileAndSetState = async (sessionUser: any) => {
    if (!sessionUser) {
      setUser(null);
      setProfile(null);
      setRole(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      setUser(sessionUser);
      setProfile(data || null);
      setRole(data?.role || null);
    } catch (err) {
      console.error('Error loading user profile:', err);
      setUser(sessionUser);
      setProfile(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchProfileAndSetState(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      fetchProfileAndSetState(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
