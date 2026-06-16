import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Target Industries & Energy Profiles | Infinity Green Energy',
  description: 'Custom open access solar, wind, and hybrid power solutions for bulk energy consumers: Manufacturing, Pharma, Chemicals, Textiles, and Logistics in India.',
  openGraph: {
    title: 'Target Industries & Energy Profiles | Infinity Green Energy',
    description: 'Custom open access renewable power procurement tailored for India\'s heavy industries.',
    url: 'https://infinitygreenenergy.com/industries',
    type: 'website'
  }
};

export default function IndustriesPage() {
  const industries = [
    {
      id: 'manufacturing',
      name: 'Manufacturing Companies',
      icon: '🏭',
      challenge: 'High daytime energy peaks during heavy machinery cycles. Grid power tariffs consume a massive percentage of overall manufacturing margins.',
      solution: 'Direct Solar or Hybrid Open Access matching operation times, giving you flat, predictable power prices.',
      stats: 'Save up to ₹2.1 per unit of electricity',
      benefits: ['Flat-rate 15-25 year PPAs', 'De-risk against DISCOM price hikes', 'Complete CAPEX/OPEX options']
    },
    {
      id: 'pharma',
      name: 'Pharmaceutical Companies',
      icon: '💊',
      challenge: 'Zero tolerance for power fluctuations or micro-outages. Critical cooling rooms and sterile manufacturing lines need 100% reliable feeds.',
      solution: 'Multi-source round-the-clock (RTC) green power supply combined with backup state grid synchronization.',
      stats: '99.99% grid-uptime SLA assurances',
      benefits: ['Continuous power balancing', 'Global ESG audit compliance', 'Dynamic load tracking dashboard']
    },
    {
      id: 'chemicals',
      name: 'Chemical Industries',
      icon: '🧪',
      challenge: 'High baseline base load operations with continuous chemical processing setups requiring steady power supply.',
      solution: 'Hybrid Wind-Solar Open Access to match day-and-night cycles combined with optimal grid wheeling.',
      stats: '35% average reduction in power bills',
      benefits: ['Optimized nighttime wind wheeling', 'Cross-subsidy surcharge offsets', 'Dedicated energy management desk']
    },
    {
      id: 'textiles',
      name: 'Textile & Spinning Industries',
      icon: '🧵',
      challenge: 'Spinning mills run 24/7. High base load power requirements can eat up to 45% of total yarn production costs.',
      solution: 'Long-term hybrid wind-solar PPA or Group Captive investments with specialized state wheeling scheduling.',
      stats: 'Reduces energy costs from ₹12 Cr to ₹7.5 Cr yearly',
      benefits: ['Exemptions from local surcharges', 'High-capacity ISTS connectivity', 'Long-term operating expense stability']
    },
    {
      id: 'logistics',
      name: 'Warehouses & Logistics Companies',
      icon: '📦',
      challenge: 'Massive rooftop areas left unutilized. Highly variable lighting loads combined with seasonal cooling peaks.',
      solution: 'OPEX Rooftop Solar installations converting vast warehouse roofs into revenue-producing power assets.',
      stats: 'Immediate 45% offset on peak daytime bills',
      benefits: ['Zero upfront investment required', 'Direct net-metering integration', 'Green supply-chain certifications']
    },
    {
      id: 'campuses',
      name: 'Commercial Campuses & Parks',
      icon: '🏢',
      challenge: 'Fluctuating HVAC cooling loads, high daytime usage, and strict carbon-neutral and LEED certification mandates.',
      solution: 'Bilateral open access contracts coupled with solar carports and rooftop integrations.',
      stats: 'Offsets carbon emissions by 40%+',
      benefits: ['LEED green building credits', 'Visually premium solar carports', 'Reduced corporate ESG footprint']
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Hero Header */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            Target Industry Sectors
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark tracking-tight uppercase leading-none mt-4">
            Custom Power for Heavy Industry
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Every industrial sector has unique load profiles and grid rules. We tailor solutions for high-consumption enterprises with monthly energy expenses exceeding ₹10 Lakh.
          </p>
        </section>

        {/* Industry Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
          {industries.map((ind) => (
            <div 
              key={ind.id} 
              id={ind.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-4xl">{ind.icon}</span>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider font-heading">
                    {ind.stats}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-dark font-heading uppercase">{ind.name}</h3>
                
                <div className="space-y-2 pt-2 text-xs md:text-sm font-sans">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">The Challenge</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{ind.challenge}</p>
                  </div>
                  <div className="pt-2">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">Our Solution</span>
                    <p className="text-slate-700 font-medium mt-0.5 leading-relaxed">{ind.solution}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-3">Key Benefits</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-600 font-sans">
                  {ind.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-primary-dark to-primary rounded-3xl p-8 md:p-12 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black font-heading uppercase">
              Analyze State Grid Feasibility & Tariff Options
            </h2>
            <p className="text-primary-light text-xs md:text-sm font-sans">
              Enter your monthly electricity bill, state, and industry to calculate your potential open access cost savings.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/#calculator" className="btn-secondary !text-primary border-none shadow-md">
                Try Energy Assessment Engine
              </Link>
              <Link href="/contact" className="btn-primary border border-primary-light bg-transparent hover:bg-white/10 text-white shadow-none">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
