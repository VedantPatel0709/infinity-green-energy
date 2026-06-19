import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, ExternalLink, Linkedin, Twitter, ArrowRight } from 'lucide-react';

/**
 * Footer Component - Premium B2B Enterprise Layout
 */
const Footer = () => {
  return (
    <footer className="bg-dark text-slate-400 border-t border-slate-800/80 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          
          {/* Brand & Socials Column */}
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
              Empowering large-scale B2B industries, spinning mills, and chemical plants with grid open-access synchronizations, lower spot tariff structures, and decarbonization paths.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center text-slate-400 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center text-slate-400 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
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
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
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

          {/* Industries Column */}
          <div>
            <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-wider mb-5">
              Industries
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Manufacturing</Link></li>
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Chemicals & Pharma</Link></li>
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Textiles & Spinning</Link></li>
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Heavy Engineering</Link></li>
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

          {/* Newsletter Column */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
              Receive updates on regulatory approvals, grid compliance, and industrial energy tariffs.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter work email" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none focus:border-primary transition-colors"
                disabled
              />
              <button 
                type="button" 
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[10px] uppercase font-bold tracking-wider transition-colors whitespace-nowrap cursor-not-allowed"
                disabled
              >
                Join
              </button>
            </div>
            <span className="text-[9px] text-slate-600 block">Subscription form will be active after launch.</span>
          </div>

        </div>

        {/* CTA Banner Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-slate-900/60 rounded-3xl border border-slate-800/80 items-center">
          <div className="lg:col-span-2 space-y-1">
            <h4 className="text-white font-heading font-semibold text-sm">Need a custom energy procurement simulation?</h4>
            <p className="text-xs text-slate-500">Structure power purchase agreements based on average industrial load profiles.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link href="/contact?proposal=true" className="btn-primary py-2.5 px-5 text-xs font-bold whitespace-nowrap">
              Request Proposal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" /> WhatsApp Advisory
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-sans">
          <p>© {new Date().getFullYear()} Infinity Green Energy Pvt Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
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
