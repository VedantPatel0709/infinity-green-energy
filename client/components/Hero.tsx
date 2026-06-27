import Link from 'next/link';
import { Zap, Shield, TrendingDown, Layers } from 'lucide-react';

/**
 * Hero Component - Premium enterprise B2B visual introduction
 */
const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-dark py-24 sm:py-32 border-b border-slate-800/50">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 text-accent text-sm font-semibold mb-8">
          <Zap className="w-4 h-4 fill-accent" />
          <span>National Grid Energy Procurement Platform</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight font-heading leading-tight max-w-5xl mx-auto uppercase">
          Smarter Energy. <br />
          <span className="text-primary italic">Greater</span> Savings.
        </h1>
        
        <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed font-sans">
          Industrial Renewable Energy Procurement & Open Access advisory platform. We optimize commercial and industrial energy supply across India through hybrid, wind, and captive solar sourcing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/request-proposal" className="btn-primary px-8 py-4 text-base w-full sm:w-auto">
            Request Proposal
          </Link>
          <Link href="/solutions" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-700 bg-slate-850 hover:bg-slate-800 text-white font-semibold hover:border-slate-600 transition-all duration-300 w-full sm:w-auto font-heading">
            Explore Solutions
          </Link>
        </div>

        {/* Trust Badges Section is now part of Section 2 (Trust Indicators) in page.tsx */}
      </div>
    </div>
  );
};

export default Hero;


