'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus, Info, Upload, Loader2 } from 'lucide-react';
import { registerProducer } from '@/src/services/auth.service';
import { toast } from 'react-hot-toast';

export default function ProducerRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    technology: 'Solar PV',
    installedCapacity: '',
    state: 'Gujarat',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerProducer({
        email: formData.email,
        password: formData.password,
        fullName: formData.contactPerson,
        phone: formData.phone,
        companyName: formData.companyName,
        technology: formData.technology,
        capacityMw: formData.installedCapacity,
        state: formData.state,
        description: formData.description,
        contactPerson: formData.contactPerson
      });

      toast.success('Generator Node registration successful!');
      router.push('/login');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
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
          <form className="space-y-5" onSubmit={handleSubmit}>
            
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

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Secure account password" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-primary transition-colors"
                required 
              />
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

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-primary text-white font-black font-heading text-xs uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : 'Verify & Register Asset'}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
