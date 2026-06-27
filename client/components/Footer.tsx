'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

/**
 * Footer Component - Rebuilt for B2B Enterprise Compliance (No mock socials/fake newsletters)
 */
const Footer = () => {
  return (
    <footer className="bg-dark text-slate-400 border-t border-slate-800/80 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          
          {/* Brand Column */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/10">
                <LeafIcon className="w-5 h-5 fill-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                INFINITY GREEN
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Infinity Green Energy helps industrial and commercial power consumers optimize energy procurement through renewable sourcing, open access advisory, and long-term cost reduction strategies.
            </p>
            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">Newsletter</span>
              <div className="flex bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-1 max-w-xs">
                <input 
                  type="email" 
                  placeholder="Enter corporate email" 
                  disabled 
                  className="bg-transparent border-0 text-[10px] text-slate-400 px-2 py-1.5 focus:outline-none w-full cursor-not-allowed" 
                />
                <button disabled className="bg-slate-800 text-[10px] text-slate-500 font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg whitespace-nowrap cursor-not-allowed">
                  Join
                </button>
              </div>
              <span className="text-[9px] text-slate-500 font-medium block">Newsletter Subscription Coming Soon</span>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-xs">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/about/team" className="hover:text-primary transition-colors">Team</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-wider mb-5">
              Solutions
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              <li><Link href="/solutions#open-access" className="hover:text-primary transition-colors">Open Access Energy</Link></li>
              <li><Link href="/solutions#industrial-solar" className="hover:text-primary transition-colors">Industrial Solar</Link></li>
              <li><Link href="/solutions#wind" className="hover:text-primary transition-colors">Wind Sourcing</Link></li>
              <li><Link href="/solutions#hybrid" className="hover:text-primary transition-colors">Hybrid Solutions</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-wider mb-5">
              Resources
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/faqs" className="hover:text-primary transition-colors">FAQs Directory</Link></li>
              <li><Link href="/industry-network" className="hover:text-primary transition-colors">Industry Network</Link></li>
              <li><Link href="/knowledge-center" className="hover:text-primary transition-colors">Knowledge Center</Link></li>
            </ul>
          </div>

          {/* Platform Status Column */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" /> Platform Status
            </h4>
            <div className="space-y-2 text-[10px] font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-500">Frontend:</span>
                <span className="text-emerald-500 font-bold">Completed</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-500">Marketplace:</span>
                <span className="text-amber-500 font-bold text-right">Awaiting Sync</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-500">Industry Net:</span>
                <span className="text-slate-400 font-bold">Awaiting Verification</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500">Portal:</span>
                <span className="text-primary font-bold">Under Activation</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Banner Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-slate-900/60 rounded-3xl border border-slate-800/80 items-center">
          <div className="lg:col-span-2 space-y-1">
            <h4 className="text-white font-heading font-semibold text-sm">Ready to evaluate renewable energy opportunities for your facility?</h4>
            <p className="text-xs text-slate-500">Structure power purchase agreements based on average industrial load profiles.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link href="/request-proposal" className="btn-primary py-2.5 px-5 text-xs font-bold whitespace-nowrap">
              Request Proposal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-sans">
          <p>© {new Date().getFullYear()} Infinity Green Energy. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <a href="mailto:madhav@infinitygreen-energy.com" className="hover:text-white transition-colors">madhav@infinitygreen-energy.com</a>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <a href="tel:+916355596149" className="hover:text-white transition-colors">+91 6355 596 149</a>
            </span>
            <span className="flex items-center gap-1.5 text-center md:text-left">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>392, Makarpur GIDC, Makarpura, Vadodara, Gujarat</span>
            </span>
          </div>
          <div className="flex space-x-6 shrink-0">
            <Link href="/privacy-policy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-slate-400">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

const LeafIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

export default Footer;
