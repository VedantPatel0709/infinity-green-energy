'use client';
import React, { useState } from 'react';
import api from '@/services/api';
import { CheckCircle2, Loader2 } from 'lucide-react';

/**
 * LeadForm Component - Connected to Backend API
 */
const LeadForm = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '',
    bill: '',
    message: '' 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/leads', {
        ...formData,
        bill: Number(formData.bill)
      });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', bill: '', message: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-zinc-900 border border-primary/20 p-12 rounded-3xl text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        <h3 className="text-2xl font-bold">Inquiry Sent!</h3>
        <p className="text-zinc-400">Our team will contact you within 24 hours.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-primary font-bold hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-4 shadow-2xl relative">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          required
          type="text" 
          placeholder="Full Name" 
          className="input-field"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          required
          type="email" 
          placeholder="Email Address" 
          className="input-field"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          required
          type="tel" 
          placeholder="Phone Number" 
          className="input-field"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        <input 
          required
          type="text" 
          placeholder="Company Name" 
          className="input-field"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
        />
      </div>

      <input 
        required
        type="number" 
        placeholder="Average Monthly Electricity Bill (₹)" 
        className="input-field"
        value={formData.bill}
        onChange={(e) => setFormData({...formData, bill: e.target.value})}
      />

      <textarea 
        placeholder="Additional Details (Optional)" 
        rows={4}
        className="input-field"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
      />

      <button 
        disabled={loading}
        type="submit" 
        className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : 'Get Free Consultation'}
      </button>
    </form>
  );
};

export default LeadForm;
