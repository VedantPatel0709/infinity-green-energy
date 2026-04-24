'use client';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Zap, TrendingUp, History } from 'lucide-react';

/**
 * User Dashboard - Viewing Energy Savings
 */
export default function DashboardPage() {
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnergy = async () => {
      try {
        const res = await api.get('/energy/me'); // ✅ FIXED
        setEnergyData(res);                          // ✅ FIXED
      } catch (err) {
        console.error('Error fetching energy data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnergy();
  }, []);

  const totalSavings = energyData.reduce(
    (acc, curr) => acc + (curr.savings || 0),
    0
  );

  return (
    <div className="py-20 px-4 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-12">
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-primary p-8 rounded-3xl text-black">
            <div className="flex items-center gap-2 mb-2 opacity-80 uppercase text-xs font-black tracking-widest">
              <TrendingUp className="w-4 h-4" /> Total Savings
            </div>
            <h3 className="text-4xl font-black italic">
              ₹{totalSavings.toLocaleString()}
            </h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <div className="flex items-center gap-2 mb-2 text-zinc-500 uppercase text-xs font-black tracking-widest">
              <Zap className="w-4 h-4" /> Records Found
            </div>
            <h3 className="text-4xl font-black text-white">
              {energyData.length}
            </h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <div className="flex items-center gap-2 mb-2 text-zinc-500 uppercase text-xs font-black tracking-widest">
              <History className="w-4 h-4" /> Status
            </div>
            <h3 className="text-4xl font-black text-primary">
              ACTIVE
            </h3>
          </div>

        </div>

        {/* Table */}
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
          
          <div className="p-8 border-b border-zinc-800">
            <h3 className="text-xl font-bold text-white">
              Calculation History
            </h3>
          </div>

          {loading ? (
            <div className="p-20 text-center text-zinc-500">
              Loading your data...
            </div>
          ) : energyData.length === 0 ? (
            <div className="p-20 text-center text-zinc-500">
              No data records found yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                
                <thead className="bg-zinc-950 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Monthly Usage</th>
                    <th className="px-8 py-4 text-right">Savings</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800">
                  {energyData.map((item) => (
                    <tr key={item._id} className="hover:bg-zinc-800/50 transition-colors">
                      
                      <td className="px-8 py-6 text-zinc-300">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>

                      <td className="px-8 py-6 font-medium text-white">
                        {item.monthlyUsage || 0} Units
                      </td>

                      <td className="px-8 py-6 text-right font-bold text-primary">
                        ₹{(item.savings || 0).toLocaleString()}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}