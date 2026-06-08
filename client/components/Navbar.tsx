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
    { name: 'Solutions & Services', href: '/services' },
    { name: 'Savings Analytics', href: '/calculator' },
    { name: 'Contact & Support', href: '/contact' },
    { name: 'Client Portal', href: '/dashboard' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm' 
        : 'bg-white/85 backdrop-blur-md border-b border-slate-100/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
              <LeafIcon className="w-6 h-6 fill-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-dark font-heading leading-tight">
                INFINITY GREEN
              </span>
              <span className="text-[10px] tracking-widest text-primary font-bold uppercase leading-none mt-0.5">
                ENERGY PLATFORM
              </span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-slate-600 hover:text-primary font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary py-2.5 px-6 text-sm">
              Request Proposals
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 hover:text-primary focus:outline-none transition-colors p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block text-slate-600 hover:text-primary font-semibold text-lg transition-colors py-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Link 
              href="/contact" 
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full"
            >
              Request Proposals
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

