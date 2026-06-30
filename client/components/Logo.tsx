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
      <div className="relative h-[36px] w-auto flex items-center justify-center shrink-0">
        <Image 
          src="/logo-icon.png?v=4" 
          alt="Infinity Green Energy Icon" 
          width={110}
          height={36}
          className="h-[36px] w-auto object-contain block"
          priority
        />
      </div>

      {/* RIGHT: Refined HTML Wordmark */}
      <div className="flex flex-col justify-center leading-none select-none">
        <span className={`font-heading tracking-[0.12em] font-black uppercase text-[21px] ${textColorClass} transition-colors duration-300`}>
          INFINITY
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <div className={`h-[1px] w-4 ${lineColorClass} opacity-80`} />
          <span className="font-heading tracking-[0.22em] font-bold uppercase text-[7px] text-primary whitespace-nowrap">
            GREEN ENERGY
          </span>
          <div className={`h-[1px] w-4 ${lineColorClass} opacity-80`} />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
