import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  lightText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', lightText = true }) => {
  return (
    <Link href="/" className={`flex items-center gap-[14px] hover:opacity-95 transition-opacity ${className}`}>
      {/* LEFT: Infinity Icon extracted from official logo */}
      <div className="relative h-[44px] w-auto flex items-center justify-center shrink-0">
        <Image 
          src="/logo-icon.png" 
          alt="Infinity Green Energy Icon" 
          width={85}
          height={44}
          className="h-[44px] w-auto object-contain block"
          priority
        />
      </div>

      {/* RIGHT: HTML Wordmark */}
      <div className="flex flex-col justify-center leading-none select-none">
        <span 
          className={`font-heading tracking-[0.15em] font-light uppercase leading-tight text-lg md:text-xl ${
            lightText ? 'text-white' : 'text-slate-900'
          }`}
          style={{ fontWeight: 300 }}
        >
          INFINITY
        </span>
        <span className="font-heading tracking-[0.3em] font-bold uppercase text-[9px] md:text-[10px] text-primary mt-0.5">
          GREEN ENERGY
        </span>
      </div>
    </Link>
  );
};

export default Logo;
