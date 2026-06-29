'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Mail, MapPin, Phone, MessageSquare, ArrowRight, ShieldCheck, Zap, Award, Globe, HelpCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/utils/company';

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
            <Logo />
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Infinity Green Energy helps industrial and commercial power consumers optimize energy procurement through renewable sourcing, open access advisory, and long-term cost reduction strategies.
            </p>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-xs font-sans">
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

          {/* Ecosystem Column */}
          <div>
            <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-wider mb-5">
              Ecosystem
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              <li><Link href="/industry-network" className="hover:text-primary transition-colors">Industry Network</Link></li>
              <li><Link href="/knowledge-center" className="hover:text-primary transition-colors">Knowledge Center</Link></li>
              <li><Link href="/insights" className="hover:text-primary transition-colors">Insights</Link></li>
              <li><Link href="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/request-proposal" className="hover:text-primary transition-colors">Request Proposal</Link></li>
            </ul>
          </div>

          {/* Why Infinity Green Energy Column */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <h4 className="text-white font-heading font-semibold text-xs uppercase tracking-wider">
              Why Infinity Green
            </h4>
            <ul className="space-y-3 text-[10px] font-sans text-slate-500 leading-normal">
              <li className="flex gap-2 items-start">
                <Award className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>Commercial & Industrial Renewable Energy Specialists</span>
              </li>
              <li className="flex gap-2 items-start">
                <HelpCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>Independent Energy Advisory</span>
              </li>
              <li className="flex gap-2 items-start">
                <Zap className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>Open Access & Captive Solutions</span>
              </li>
              <li className="flex gap-2 items-start">
                <Globe className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>Pan-India Renewable Energy Support</span>
              </li>
            </ul>
          </div>

        </div>

        {/* CTA Banner Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-slate-900/60 rounded-3xl border border-slate-800/80 items-center">
          <div className="lg:col-span-2 space-y-1">
            <h4 className="text-white font-heading font-semibold text-sm">Ready to evaluate renewable energy opportunities for your facility?</h4>
            <p className="text-xs text-slate-400">
              Helping Commercial & Industrial businesses transition to renewable energy through strategic procurement, advisory and long-term partnerships.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link href="/request-proposal" className="btn-primary py-2.5 px-5 text-xs font-bold whitespace-nowrap">
              Request Proposal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-sans">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">{COMPANY_INFO.email}</a>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-white transition-colors">{COMPANY_INFO.phone}</a>
            </span>
            <span className="flex items-center gap-1.5 text-center md:text-left">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{COMPANY_INFO.address.fullSingleLine}</span>
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

export default Footer;
