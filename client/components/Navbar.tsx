'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Navbar Component - Premium Enterprise navigation
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Industry Network', href: '/industry-network' },
    { name: 'Insights', href: '/insights' },
    { name: 'About Us', href: '/about' },
    { name: 'Client Portal', href: '/portal' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg' 
        : 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50'
    } text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300 border border-primary/30">
              <LeafIcon className="w-6 h-6 fill-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white font-heading leading-tight">
                INFINITY GREEN
              </span>
              <span className="text-[10px] tracking-widest text-primary font-bold uppercase leading-none mt-0.5">
                ENERGY PLATFORM
              </span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`font-semibold text-xs lg:text-sm transition-colors duration-200 ${
                  link.name === 'Client Portal'
                    ? 'text-primary hover:text-primary-light bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/25'
                    : 'text-slate-300 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/request-proposal" className="btn-primary py-2 px-5 text-xs font-bold uppercase tracking-wider">
              Request Proposal
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-300 hover:text-primary focus:outline-none transition-colors p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block text-slate-300 hover:text-primary font-semibold text-lg transition-colors py-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Link 
              href="/request-proposal" 
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full py-3"
            >
              Request Proposal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const LeafIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

export default Navbar;

