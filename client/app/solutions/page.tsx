import { Metadata } from 'next';
import Link from 'next/link';
import { Globe2, Zap, Factory, Landmark, HelpCircle, FileCheck2, ArrowRight, Wind, Shuffle, ShieldAlert, Cpu, Leaf, Target, LineChart, Activity, Globe, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B2B Renewable Energy Solutions | Infinity Green Energy',
  description: 'Enterprise open access power wheeling, industrial captive solar farms, wind energy, hybrid solutions, energy procurement, and optimization audits for bulk consumers.',
};

export default function SolutionsPage() {
  const solutions = [
    {
      id: 'open-access',
      title: 'Open Access Energy',
      icon: <Zap className="w-8 h-8 text-primary" />,
      problem: 'Industrial facilities face high, fluctuating grid tariffs from local state DISCOMs, inflating operating expenditures and reducing EBITDA margins.',
      solution: 'We structure PPAs that allow you to bypass state grid defaults and wheel electricity directly from off-site utility solar and wind farms.',
      benefits: [
        'Zero CAPEX commitment required under OPEX/RESCO setups.',
        'Seamless integration via state and national transmission grids.',
        'Long-term price stability with fixed-rate contracts (15-25 years).'
      ],
      savings: 'Up to 30% to 40% tariff reduction on daylight operational load.',
    },
    {
      id: 'industrial-solar',
      title: 'Industrial Solar',
      icon: <Factory className="w-8 h-8 text-primary" />,
      problem: 'Factories, warehouses, and industrial parks have massive, unutilized rooftop and ground spaces that contribute to structural heat gain instead of generating value.',
      solution: 'Custom-engineered, high-yield onsite solar systems configured in outright purchase (CAPEX) or zero-investment pay-as-you-go (OPEX) models.',
      benefits: [
        'Net-metering configuration to feed surplus energy back to the grid.',
        'Accelerated depreciation tax benefits for CAPEX buyers (Section 32 of IT Act).',
        'Guaranteed generation levels backed by strict performance SLAs.'
      ],
      savings: 'Offset 20% to 35% of total grid consumption immediately.',
    },
    {
      id: 'wind-energy',
      title: 'Wind Energy',
      icon: <Wind className="w-8 h-8 text-primary" />,
      problem: 'Continuous 24/7 manufacturing plants, textile mills, and chemical arrays continue to pay peak grid rates during early morning and late night non-solar hours.',
      solution: 'Access utility-scale wind power assets located in high-wind regions, wheeled through intra-state or inter-state transmission systems.',
      benefits: [
        'Higher capacity utilization factor (CUF) compared to standard solar arrays.',
        'Perfect compliance match for wind purchase obligations (RPO).',
        'Bilateral off-take contracts structured to guarantee tariff discounts.'
      ],
      savings: 'Shifts up to 50% of night-shift electricity tariffs to clean-energy pricing.',
    },
    {
      id: 'hybrid-solutions',
      title: 'Hybrid Solutions',
      icon: <Shuffle className="w-8 h-8 text-primary" />,
      problem: 'Solar power is restricted to the day, and wind power fluctuates. Neither alone matches the continuous baseload curve of a heavy industrial facility.',
      solution: 'Integrated wind-solar hybrid procurement plans. We dynamically blend solar and wind profiles to deliver a stable, flat clean-energy supply.',
      benefits: [
        'Higher grid evacuation efficiency and lower transmission losses.',
        'Reduces the need for expensive battery storage solutions.',
        'Provides a smoother generation profile aligning with 24/7 operations.'
      ],
      savings: 'Locks in green power for up to 60-70% of total plant energy consumption.',
    },
    {
      id: 'energy-procurement',
      title: 'Energy Procurement',
      icon: <Landmark className="w-8 h-8 text-primary" />,
      problem: 'Navigating power exchanges (IEX/PXIL), cross-subsidy surcharges (CSS), additional surcharges (AS), and state grid codes requires highly specialized compliance overhead.',
      solution: 'End-to-end procurement advisory. We coordinate power procurement bids, open access filings, group captive equity structures, and exchange trading.',
      benefits: [
        'Bypass local state DISCOM surcharge markups (CSS & AS waivers).',
        'Audit PPA contracts line-by-line to block hidden operational fees.',
        'Leverage real-time spot energy prices through bilateral grid trading.'
      ],
      savings: 'Brings structural power procurement costs down by ₹1.5 - ₹3.0 per kWh.',
    },
    {
      id: 'energy-optimization',
      title: 'Energy Optimization',
      icon: <Cpu className="w-8 h-8 text-primary" />,
      problem: 'Many manufacturing units pay penalty tariffs for poor power factors, reactive power draw, and inefficient peak demand scheduling.',
      solution: 'Continuous digital load profiling and energy audit setups. We optimize contract demand structures and implement power factor correction checks.',
      benefits: [
        'Elimination of utility penalties for reactive draw or demand overrun.',
        'Reschedule peak operations to off-peak slots with lower tariff rates.',
        'Identify leakage, phase imbalances, and motor loading inefficiencies.'
      ],
      savings: 'Saves 5% to 15% on monthly electricity bills with zero capital deployment.'
    }
  ];

  const esgServices = [
    {
      title: 'Renewable Energy Strategy',
      description: 'Develop practical renewable energy strategies aligned with long-term business and sustainability objectives.',
      icon: <Target className="w-5 h-5 text-primary" />
    },
    {
      title: 'Industrial Energy Optimization',
      description: 'Identify opportunities to improve energy efficiency and reduce operational electricity costs.',
      icon: <Activity className="w-5 h-5 text-primary" />
    },
    {
      title: 'Carbon Reduction Support',
      description: 'Support renewable energy adoption that contributes toward reducing operational carbon emissions.',
      icon: <Leaf className="w-5 h-5 text-primary" />
    },
    {
      title: 'Open Access for Sustainability Goals',
      description: 'Leverage Open Access renewable procurement to support corporate sustainability initiatives.',
      icon: <Zap className="w-5 h-5 text-primary" />
    },
    {
      title: 'Long-Term Energy Planning',
      description: 'Build resilient energy procurement strategies designed for future regulatory and market changes.',
      icon: <LineChart className="w-5 h-5 text-primary" />
    },
    {
      title: 'Business Sustainability Support',
      description: 'Integrate renewable energy into broader operational sustainability initiatives for long-term value creation.',
      icon: <Globe className="w-5 h-5 text-primary" />
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            Corporate Solutions Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark mt-4 mb-6 uppercase tracking-tight">
            INDUSTRIAL ENERGY SOLUTIONS
          </h1>
          <p className="text-slate-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Neutral energy consulting and procurement structures tailored specifically for commercial and industrial bulk power consumers.
          </p>
        </div>

        {/* Detailed Solutions List */}
        <div className="space-y-16 mb-24">
          {solutions.map((sol) => (
            <div 
              key={sol.id} 
              id={sol.id} 
              className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-primary/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="lg:col-span-4 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  {sol.icon}
                </div>
                <h2 className="text-2xl font-black font-heading text-dark uppercase tracking-tight">{sol.title}</h2>
                <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Expected Savings</h4>
                  <p className="text-xs font-bold text-slate-800">{sol.savings}</p>
                </div>
                <div className="pt-4">
                  <Link href={`/request-proposal?solution=${sol.id}`} className="btn-primary py-2.5 text-xs font-bold uppercase tracking-wider inline-flex w-full justify-center">
                    Request {sol.title} Audit
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> The Problem
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{sol.problem}</p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Our Solution</h4>
                  <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-semibold">{sol.solution}</p>
                </div>
                
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Key Benefits</h4>
                  <ul className="space-y-3">
                    {sol.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sustainability & ESG Support Section */}
        <section className="space-y-12 mb-24 border-t border-slate-200/65 pt-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
              Sustainability & ESG Support
            </span>
            <h2 className="text-3xl md:text-4xl font-black font-heading text-dark uppercase tracking-tight">
              Sustainability & ESG Support
            </h2>
            <p className="text-slate-700 font-sans text-xs md:text-sm font-semibold leading-relaxed">
              Helping commercial and industrial businesses achieve sustainability objectives through renewable energy procurement, strategic advisory, and long-term energy optimization.
            </p>
            <p className="text-slate-500 font-sans text-xs leading-relaxed">
              Our renewable energy solutions not only reduce electricity costs but also support ESG initiatives, carbon reduction goals, renewable energy adoption, and long-term business sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {esgServices.map((service, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:border-primary/20 hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="font-heading font-black text-dark text-xs uppercase tracking-wider">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ESG Action Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center space-y-4 max-w-4xl mx-auto shadow-lg shadow-slate-950/20">
            <h3 className="text-lg md:text-xl font-black font-heading uppercase text-white tracking-tight">
              Looking to align renewable energy with your sustainability objectives?
            </h3>
            <p className="text-slate-400 text-xs font-sans leading-relaxed max-w-2xl mx-auto">
              Our team helps commercial and industrial organizations evaluate renewable energy opportunities that support both business performance and long-term sustainability goals.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/request-proposal" className="btn-primary py-2 px-5 text-xs font-bold uppercase tracking-wider">
                Request Proposal
              </Link>
              <Link href="/solutions" className="flex items-center justify-center gap-1 px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300">
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-16 text-center space-y-6 shadow-xl relative overflow-hidden border border-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-black font-heading uppercase tracking-tight">
              Request a Custom Procurement Audit
            </h2>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              We analyze your state grid parameters and operational load curves to identify the optimal mix of Open Access, Solar, and Wind capacity.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/request-proposal" className="btn-primary">
                Request Proposal
              </Link>
              <Link href="/industry-network" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-white font-semibold transition-all duration-300 font-heading text-xs uppercase tracking-wider">
                Explore Network <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
