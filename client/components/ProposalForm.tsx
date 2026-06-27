'use client';
import React, { useState } from 'react';
import { createLead } from '@/src/services/lead.service';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    name: '',
    designation: '',
    email: '',
    phone: '',
    state: '',
    billRange: '',
    connectedLoad: '',
    requirement: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Map selected bill range string to standard bill number for Mongoose lead schema constraints
    let billValue = 0;
    switch (formData.billRange) {
      case 'Under ₹5 Lakhs':
        billValue = 300000;
        break;
      case '₹5 Lakhs - ₹15 Lakhs':
        billValue = 1000000;
        break;
      case '₹15 Lakhs - ₹50 Lakhs':
        billValue = 3000000;
        break;
      case 'Above ₹50 Lakhs':
        billValue = 7500000;
        break;
      default:
        billValue = 0;
    }

    const requestData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      bill: billValue,
      message: `Designation: ${formData.designation}\nState: ${formData.state}\nIndustry: ${formData.industry}\nConnected Load: ${formData.connectedLoad || 'N/A'}\nBill Range: ${formData.billRange}\n\nRenewable Energy Requirement:\n${formData.requirement}\n\nAdditional Notes:\n${formData.notes || 'None'}`
    };

    try {
      await createLead(requestData);
      setSuccess(true);
      setFormData({
        company: '',
        industry: '',
        name: '',
        designation: '',
        email: '',
        phone: '',
        state: '',
        billRange: '',
        connectedLoad: '',
        requirement: '',
        notes: ''
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Submission failed. Please check grid connections.');
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
          <p className="text-slate-500 mt-2 text-sm">
            Our procurement team has received your industrial specifications. We will review your load feasibility and draft a sourcing proposal options report within 24 hours.
          </p>
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="text-primary font-semibold text-sm hover:underline flex items-center gap-1 mx-auto"
        >
          Submit another specifications request <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
      <div>
        <h3 className="text-xl font-bold font-heading text-dark mb-1">Renewable Sourcing Specifications</h3>
        <p className="text-xs text-slate-500">
          Provide your utility connection specs to run feasibility simulations.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company Name</label>
          <input 
            required
            type="text" 
            placeholder="e.g. Apex Textiles Ltd" 
            className="input-field"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Industry Type</label>
          <select 
            required
            className="input-field cursor-pointer"
            value={formData.industry}
            onChange={(e) => setFormData({...formData, industry: e.target.value})}
          >
            <option value="">Select Industry Type</option>
            <option value="Textiles">Textiles & Spinning</option>
            <option value="Chemicals">Chemicals & Process</option>
            <option value="Pharmaceuticals">Pharmaceuticals</option>
            <option value="Manufacturing">Manufacturing & Casting</option>
            <option value="Engineering">Precision Engineering</option>
            <option value="Logistics">Logistics & Cold Chain</option>
            <option value="Other">Other Energy Intensive Sector</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contact Person</label>
          <input 
            required
            type="text" 
            placeholder="e.g. Jane Smith" 
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Corporate Designation</label>
          <input 
            required
            type="text" 
            placeholder="e.g. Chief Financial Officer, VP Operations" 
            className="input-field"
            value={formData.designation}
            onChange={(e) => setFormData({...formData, designation: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
          <input 
            required
            type="email" 
            placeholder="e.g. name@company.com" 
            className="input-field"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone Number</label>
          <input 
            required
            type="tel" 
            placeholder="e.g. +91 98765 43210" 
            className="input-field"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Operating State</label>
          <select 
            required
            className="input-field cursor-pointer"
            value={formData.state}
            onChange={(e) => setFormData({...formData, state: e.target.value})}
          >
            <option value="">Select State</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Monthly Electricity Bill Range</label>
          <select 
            required
            className="input-field cursor-pointer"
            value={formData.billRange}
            onChange={(e) => setFormData({...formData, billRange: e.target.value})}
          >
            <option value="">Select Bill Range</option>
            <option value="Under ₹5 Lakhs">Under ₹5 Lakhs</option>
            <option value="₹5 Lakhs - ₹15 Lakhs">₹5 Lakhs - ₹15 Lakhs</option>
            <option value="₹15 Lakhs - ₹50 Lakhs">₹15 Lakhs - ₹50 Lakhs</option>
            <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Connected Load (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g. 500 kVA, 2 MW" 
            className="input-field"
            value={formData.connectedLoad}
            onChange={(e) => setFormData({...formData, connectedLoad: e.target.value})}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Renewable Energy Sourcing Sizing / Requirement</label>
        <textarea 
          required
          placeholder="e.g. Looking for 1.5 MW Open Access wind-solar hybrid power wheeled to our spinning facility, or Rooftop solar feasibility options." 
          rows={3}
          className="input-field"
          value={formData.requirement}
          onChange={(e) => setFormData({...formData, requirement: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Additional Notes</label>
        <textarea 
          placeholder="Any custom tariff targets or grid synchronization limitations." 
          rows={2}
          className="input-field"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin text-white" /> : 'Submit Sourcing Specifications'}
      </button>
    </form>
  );
};

export default ProposalForm;
