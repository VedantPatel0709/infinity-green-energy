import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false, lightText = true }) => {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      {/* Official SVG Logo: Intertwined Infinity Loop & Leaf */}
      <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300 border border-primary/15 shrink-0">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-5.5 h-5.5 text-primary fill-primary/10"
        >
          {/* Infinity loop path combined with leaf elements */}
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
          <path d="M12 6c1.5-1.5 3-2 5-2s3 1.5 3 3.5c0 2-1 4.5-3 5.5" className="text-emerald-400 stroke-[1.5]" />
        </svg>
      </div>
      {!iconOnly && (
        <span className={`text-xl font-bold tracking-tight font-heading group-hover:text-primary transition-colors ${lightText ? 'text-white' : 'text-slate-900'}`}>
          INFINITY GREEN
        </span>
      )}
    </Link>
  );
};

export default Logo;
