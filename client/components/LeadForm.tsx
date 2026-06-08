'use client';
import React, { useState } from 'react';
import { api } from '@/services/api'; 
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

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
      <div className="bg-white border border-slate-100 p-12 rounded-3xl text-center space-y-6 shadow-xl shadow-slate-100/50">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-heading text-dark">Proposal Request Received</h3>
          <p className="text-slate-500 mt-2 text-sm">Our enterprise energy consultants will reach out with a detailed feasibility breakdown within 24 hours.</p>
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="text-primary font-semibold text-sm hover:underline flex items-center gap-1 mx-auto"
        >
          Submit another proposal request <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6 relative">
      <div>
        <h3 className="text-xl font-bold font-heading text-dark mb-1">Request Feasibility Proposal</h3>
        <p className="text-xs text-slate-500">Provide basic tariff details to analyze Open Access grid availability.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Representative Name</label>
          <input 
            required
            type="text" 
            placeholder="e.g. John Doe" 
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Corporate Email Address</label>
          <input 
            required
            type="email" 
            placeholder="e.g. name@company.com" 
            className="input-field"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contact Number</label>
          <input 
            required
            type="tel" 
            placeholder="e.g. +91 98765 43210" 
            className="input-field"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company / Industry Name</label>
          <input 
            required
            type="text" 
            placeholder="e.g. Acme Textiles Pvt Ltd" 
            className="input-field"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Average Monthly Power Tariff (₹)</label>
        <input 
          required
          type="number" 
          placeholder="Average Monthly Bill" 
          className="input-field"
          value={formData.bill}
          onChange={(e) => setFormData({...formData, bill: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Facility Specifications (Optional)</label>
        <textarea 
          placeholder="Include details about rooftop area, grid voltage load, or compliance requirements." 
          rows={3}
          className="input-field"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin text-white" /> : 'Request Custom Feasibility Study'}
      </button>
    </form>
  );
};

export default LeadForm;
