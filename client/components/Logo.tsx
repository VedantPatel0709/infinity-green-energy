import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link href="/" className={`inline-block hover:opacity-90 transition-opacity ${className}`}>
      {/* Official Approved Infinity Green Energy Logo */}
      <Image 
        src="/logo.png" 
        alt="Infinity Green Energy" 
        width={220}
        height={56}
        className="h-12 md:h-14 w-auto object-contain block"
        priority
      />
    </Link>
  );
};

export default Logo;
