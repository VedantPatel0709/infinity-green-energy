import api from './api';

/**
 * Auth Service - Authentication related API calls
 */
export const login = async (credentials: any) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post('/users', userData);
  return response.data;
};
