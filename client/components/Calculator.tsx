'use client';
import { useState, useEffect } from 'react';
import { TrendingDown, Zap, Info, Loader2 } from 'lucide-react';
import { api } from '@/services/api';

const Calculator = () => {
  const [bill, setBill] = useState<number>(5000);
  const [loading, setLoading] = useState(false);

  const [monthlySavings, setMonthlySavings] = useState(0);
  const [yearlySavings, setYearlySavings] = useState(0);
  const [lifetimeSavings, setLifetimeSavings] = useState(0);

  useEffect(() => {
    const savingsFactor = 0.35;
    const monthly = bill * savingsFactor;
    setMonthlySavings(monthly);
    setYearlySavings(monthly * 12);
    setLifetimeSavings(monthly * 12 * 25);
  }, [bill]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // ✅ FIXED ENDPOINT
      const res = await api.post('/energy', {
        monthlyUsage: bill / 8,
        savings: yearlySavings
      });

      console.log('Saved:', res);
      alert('Savings stored successfully ✅');

    } catch (err: any) {
      console.error("FULL ERROR 👉", err);
      alert(err.message || 'Error saving data ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      {/* Inputs */}
      <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-8">
        <div>
          <div className="flex justify-between mb-4">
            <label className="text-zinc-400 font-medium">Monthly Electricity Bill</label>
            <span className="text-primary font-bold text-xl">₹{bill.toLocaleString()}</span>
          </div>

          <input 
            type="range" 
            min="100000" 
            max="10000000" 
            step="500"
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          />
        </div>  

        <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex gap-4">
          <Info className="text-primary shrink-0" />
          <p className="text-sm text-zinc-400">
            Based on current electricity tariffs, solar can reduce grid usage and save 20–40%.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="bg-primary p-8 rounded-3xl text-black">
          <div className="flex items-center gap-3 mb-2 opacity-80">
            <TrendingDown className="w-5 h-5" />
            <span className="font-bold uppercase text-xs tracking-wider">
              Estimated Yearly Savings
            </span>
          </div>
          <h3 className="text-5xl font-black tracking-tighter">
            ₹{yearlySavings.toLocaleString()}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
            <span className="text-zinc-500 text-xs font-bold uppercase block mb-1">
              Monthly
            </span>
            <span className="text-2xl font-bold text-white">
              ₹{monthlySavings.toLocaleString()}
            </span>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
            <span className="text-zinc-500 text-xs font-bold uppercase block mb-1">
              25 Year ROI
            </span>
            <span className="text-2xl font-bold text-primary">
              ₹{lifetimeSavings.toLocaleString()}
            </span>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={loading}
          className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin text-black" />
          ) : (
            <Zap className="w-5 h-5 fill-black" />
          )}
          {loading ? 'Saving...' : 'Save My Savings'}
        </button>
      </div>
    </div>
  );
};

export default Calculator;