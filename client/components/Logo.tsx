import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  lightText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', lightText = true }) => {
  const textColorClass = lightText ? 'text-white' : 'text-slate-900';
  const lineColorClass = lightText ? 'bg-primary' : 'bg-primary/70';

  return (
    <Link href="/" className={`flex items-center gap-[12px] hover:opacity-95 transition-opacity ${className}`}>
      {/* LEFT: Infinity Icon */}
      <div className="relative h-[38px] w-auto flex items-center justify-center shrink-0">
        <Image 
          src="/logo-icon.png?v=3" 
          alt="Infinity Green Energy Icon" 
          width={73}
          height={38}
          className="h-[38px] w-auto object-contain block"
          priority
        />
      </div>

      {/* RIGHT: HTML Wordmark matching the reference image */}
      <div className="flex flex-col justify-center leading-none select-none">
        <span className={`font-heading tracking-[0.08em] font-black uppercase text-[20px] ${textColorClass}`}>
          INFINITY
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <div className={`h-[1px] w-3.5 ${lineColorClass}`} />
          <span className="font-heading tracking-[0.18em] font-bold uppercase text-[7px] text-primary whitespace-nowrap">
            GREEN ENERGY
          </span>
          <div className={`h-[1px] w-3.5 ${lineColorClass}`} />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
