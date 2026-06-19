'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserPlus, Info, Activity } from 'lucide-react';

export default function ConsumerRegisterPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Manufacturing',
    contactPerson: '',
    email: '',
    phone: '',
    monthlyBill: '10 Lakhs - 25 Lakhs',
    requiredCapacity: '',
    requirementType: 'Open Access Grid PPA',
    location: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-light min-h-screen text-dark font-sans py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation */}
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          
          <div className="space-y-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase">
              <UserPlus className="w-3.5 h-3.5" /> Consumer Registration
            </span>
            <h1 className="text-2xl md:text-3xl font-black font-heading text-dark uppercase tracking-tight">
              Request Sourcing Connection
            </h1>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Industrial consumers looking to audit energy tariffs and match with open-access or rooftop solar plants.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Company Name</label>
              <input 
                type="text" 
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter corporate entity name" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                required 
              />
            </div>

            {/* Industry & Contact Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Industry Segment</label>
                <select 
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                >
                  <option>Manufacturing</option>
                  <option>Chemicals</option>
                  <option>Pharmaceuticals</option>
                  <option>Textiles & Spinning</option>
                  <option>Heavy Engineering</option>
                  <option>Warehousing & Logistics</option>
                  <option>Other C&I Segment</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Contact Person</label>
                <input 
                  type="text" 
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Full name" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                  required 
                />
              </div>
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Work Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                  required 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                  required 
                />
              </div>
            </div>

            {/* Monthly Power Bill & Capacity Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Monthly Electricity Bill</label>
                <select 
                  name="monthlyBill"
                  value={formData.monthlyBill}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                >
                  <option>Under 10 Lakhs</option>
                  <option>10 Lakhs - 25 Lakhs</option>
                  <option>25 Lakhs - 50 Lakhs</option>
                  <option>50 Lakhs - 1 Crore</option>
                  <option>Above 1 Crore</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Required Capacity (MW)</label>
                <input 
                  type="number" 
                  name="requiredCapacity"
                  value={formData.requiredCapacity}
                  onChange={handleInputChange}
                  placeholder="e.g. 5" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                  required 
                />
              </div>
            </div>

            {/* Requirement Type & Location Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Requirement Type</label>
                <select 
                  name="requirementType"
                  value={formData.requirementType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                >
                  <option>Open Access Grid PPA</option>
                  <option>Group Captive Setup</option>
                  <option>Rooftop Solar (OPEX)</option>
                  <option>Rooftop Solar (CAPEX)</option>
                  <option>Wind-Solar Hybrid Wheeling</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Plant Location (State / City)</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Surat, Gujarat" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                  required 
                />
              </div>
            </div>

            {/* Awaiting Backend Info Box */}
            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex items-start gap-2.5">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-[10px] font-bold uppercase tracking-wide text-dark">Submission Locked</h4>
                <p className="text-[9px] text-slate-400 font-sans leading-relaxed">
                  Your load profiling details and distribution sub-station parameters will be processed automatically once backend database integration completes.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="button" 
              className="w-full py-3.5 bg-slate-200 text-slate-400 font-black font-heading text-xs uppercase tracking-widest rounded-xl cursor-not-allowed flex items-center justify-center gap-1.5 shadow"
              disabled
            >
              Analyze Load Profile & Connect
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
