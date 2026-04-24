import Link from 'next/link';
import { MessageCircle, Zap, Shield, TrendingUp } from 'lucide-react';

/**
 * Hero Component - Premium visual introduction
 */
const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-black py-24 sm:py-32">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-900 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-primary text-sm font-bold mb-8 animate-pulse">
          <Zap className="w-4 h-4 fill-primary" />
          <span>SAVE UP TO 40% ON BILLS</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight uppercase leading-[0.9]">
          The Future is <br />
          <span className="text-primary italic">Infinity</span> Green
        </h1>
        
        <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl mb-12 leading-relaxed">
          Sustainable solar energy solutions tailored for your home and business. 
          Experience the power of nature with zero emissions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/calculator" className="btn-primary px-10 py-4 text-lg w-full sm:w-auto">
            Calculate Savings
          </Link>
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-zinc-700 text-white font-bold hover:bg-zinc-900 transition-all w-full sm:w-auto"
          >
            <MessageCircle className="w-6 h-6 text-green-500" />
            WhatsApp Us
          </a>
        </div>

        {/* Stats / Trust Badges */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-zinc-800 pt-16">
          <div className="flex flex-col items-center">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <span className="text-2xl font-bold text-white">25 Years</span>
            <span className="text-zinc-500 text-sm">Warranty</span>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="w-8 h-8 text-primary mb-4" />
            <span className="text-2xl font-bold text-white">40% Less</span>
            <span className="text-zinc-500 text-sm">Energy Cost</span>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <Leaf className="w-8 h-8 text-primary mb-4" />
            <span className="text-2xl font-bold text-white">Eco Friendly</span>
            <span className="text-zinc-500 text-sm">Zero Carbon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Leaf = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
)

export default Hero;
