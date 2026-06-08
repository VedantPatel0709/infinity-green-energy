import { useState, useEffect } from 'react';

/**
 * useAuth Hook - Custom hook to manage user authentication state
 */
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for B2B session keys
    const storedUserInfo = localStorage.getItem('userInfo') || localStorage.getItem('user');
    if (storedUserInfo) {
      try {
        setUser(JSON.parse(storedUserInfo));
      } catch (e) {
        console.error("Error parsing user session:", e);
      }
    }
    setLoading(false);
  }, []);

  return { user, loading };
};
