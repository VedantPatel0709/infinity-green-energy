'use client';
import { useState, useEffect } from 'react';
import { TrendingDown, Zap, Info, Loader2 } from 'lucide-react';
import { api } from '@/services/api';

const Calculator = () => {
  const [bill, setBill] = useState<number>(500000); // 5 Lakhs default
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
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-8">
        <div>
          <div className="flex justify-between items-end mb-6">
            <label className="text-slate-500 font-semibold text-xs uppercase tracking-wider">
              Monthly Power Expenditure
            </label>
            <span className="text-primary font-bold text-2xl font-heading">
              ₹{bill.toLocaleString('en-IN')}
            </span>
          </div>

          <input 
            type="range" 
            min="100000" 
            max="10000000" 
            step="10000"
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-2">
            <span>₹1 Lakh</span>
            <span>₹50 Lakhs</span>
            <span>₹1 Crore</span>
          </div>
        </div>  

        <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl flex gap-4">
          <Info className="text-primary shrink-0 w-5 h-5 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Our forecasting models assume open access wheeling charges and solar generation averages calculated for Indian industrial zones. Direct billing offset can range from 25% to 45%.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="bg-primary p-8 md:p-10 rounded-3xl text-white shadow-xl shadow-primary/20">
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <TrendingDown className="w-5 h-5" />
            <span className="font-bold font-heading uppercase text-xs tracking-wider">
              Projected Annual Open Access Savings
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
            ₹{yearlySavings.toLocaleString('en-IN')}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
            <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1 tracking-wider">
              Estimated Monthly Offset
            </span>
            <span className="text-xl font-bold text-dark font-heading">
              ₹{monthlySavings.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50">
            <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1 tracking-wider">
              25-Year Cumulative ROI
            </span>
            <span className="text-xl font-bold text-primary font-heading">
              ₹{lifetimeSavings.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={loading}
          className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin text-white" />
          ) : (
            <Zap className="w-5 h-5 fill-white text-white" />
          )}
          {loading ? 'Saving Projections...' : 'Save Feasibility Projections'}
        </button>
      </div>
    </div>
  );
};

export default Calculator;