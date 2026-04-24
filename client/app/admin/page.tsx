'use client';
import { useState, useEffect } from 'react';
import api from '@/services/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Mail, Phone, Calendar, Building2 } from 'lucide-react';

/**
 * Admin Dashboard - Viewing Lead Submissions
 */
export default function AdminPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await api.get('/leads');
        setLeads(data);
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  return (
    <ProtectedRoute adminOnly>
      <div className="py-20 px-4 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Admin Panel</h1>
              <p className="text-zinc-500 mt-2">Manage incoming inquiries and customer leads.</p>
            </div>
            <div className="bg-zinc-900 px-6 py-3 rounded-2xl border border-zinc-800">
              <span className="text-primary font-bold text-2xl">{leads.length}</span>
              <span className="text-zinc-500 ml-2 text-sm uppercase font-bold tracking-widest">Total Leads</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-zinc-500">Loading leads...</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {leads.map((lead) => (
                <div key={lead._id} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 flex flex-col md:flex-row justify-between gap-8 group hover:border-primary/30 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{lead.name}</h3>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        {lead.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Mail className="w-4 h-4" /> {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Phone className="w-4 h-4" /> {lead.phone}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Building2 className="w-4 h-4" /> {lead.company}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Calendar className="w-4 h-4" /> {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-end border-l border-zinc-800 pl-8">
                    <span className="text-zinc-500 text-xs font-bold uppercase mb-1">Monthly Bill</span>
                    <span className="text-3xl font-black text-white">₹{lead.bill?.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
