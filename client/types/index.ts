/**
 * Global Type Definitions
 */

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Closed';
}

export interface EnergyData {
  userId: string;
  monthlyUsage: number;
  savings: number;
}
