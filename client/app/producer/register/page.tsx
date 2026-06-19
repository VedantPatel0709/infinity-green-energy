'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserPlus, Info, Upload, CheckCircle2 } from 'lucide-react';

export default function ProducerRegisterPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    technology: 'Solar PV',
    installedCapacity: '',
    state: 'Gujarat',
    description: '',
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
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
              <UserPlus className="w-3.5 h-3.5" /> Producer Registration
            </span>
            <h1 className="text-2xl md:text-3xl font-black font-heading text-dark uppercase tracking-tight">
              Register Generating Asset
            </h1>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Register utility solar, wind, or hybrid capacity assets. Registries undergo grid audit verification prior to live matchmaking sync.
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
                placeholder="Enter registered entity name" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                required 
              />
            </div>

            {/* Contact Person & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            {/* Phone & Tech Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Generation Technology</label>
                <select 
                  name="technology"
                  value={formData.technology}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                >
                  <option>Solar PV</option>
                  <option>Onshore Wind</option>
                  <option>Wind-Solar Hybrid</option>
                  <option>Small Hydro</option>
                </select>
              </div>
            </div>

            {/* Capacity & State Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Installed Capacity (MW)</label>
                <input 
                  type="number" 
                  name="installedCapacity"
                  value={formData.installedCapacity}
                  onChange={handleInputChange}
                  placeholder="e.g. 50" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                  required 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Asset State Location</label>
                <select 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                >
                  <option>Gujarat</option>
                  <option>Tamil Nadu</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Rajasthan</option>
                  <option>Madhya Pradesh</option>
                  <option>Andhra Pradesh</option>
                </select>
              </div>
            </div>

            {/* Asset Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Asset Description & Grid Sync Details</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Details of connection substation, wheeling capacity, or COD timeline..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {/* Document Placeholders */}
            <div className="space-y-3 pt-2">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Required Asset Documents</label>
              
              {/* GST Certificate */}
              <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs bg-slate-50 hover:border-primary transition-all relative">
                <input type="file" className="absolute inset-0 opacity-0 cursor-not-allowed" disabled />
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-bold text-dark uppercase tracking-wider">GST Certificate</span>
                </div>
                <span className="text-[9px] text-slate-400">PDF / JPG (Max 5MB)</span>
              </div>

              {/* Company Registration */}
              <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs bg-slate-50 hover:border-primary transition-all relative">
                <input type="file" className="absolute inset-0 opacity-0 cursor-not-allowed" disabled />
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-bold text-dark uppercase tracking-wider">Company Registration</span>
                </div>
                <span className="text-[9px] text-slate-400">PDF / Word (Max 10MB)</span>
              </div>

              {/* PAN Document */}
              <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs bg-slate-50 hover:border-primary transition-all relative">
                <input type="file" className="absolute inset-0 opacity-0 cursor-not-allowed" disabled />
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-bold text-dark uppercase tracking-wider">Company PAN Card</span>
                </div>
                <span className="text-[9px] text-slate-400">PDF / PNG (Max 5MB)</span>
              </div>
            </div>

            {/* Awaiting Backend Info Box */}
            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex items-start gap-2.5">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-[10px] font-bold uppercase tracking-wide text-dark">Submission Locked</h4>
                <p className="text-[9px] text-slate-400 font-sans leading-relaxed">
                  Registry synchronization and state SLDC verification databases will go live during phase 2 backend integration.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="button" 
              className="w-full py-3.5 bg-slate-200 text-slate-400 font-black font-heading text-xs uppercase tracking-widest rounded-xl cursor-not-allowed flex items-center justify-center gap-1.5 shadow"
              disabled
            >
              Verify & Register Asset
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
