'use client';

import React from 'react';
import { Database } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Awaiting Backend Integration',
  subtitle = 'No Records Available',
  badgeText = 'Coming Soon',
  description
}) => {
  return (
    <div 
      className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm text-center max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200"
      role="region"
      aria-label="Informational status card"
    >
      <div className="flex flex-col items-center space-y-4">
        {badgeText && (
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 font-semibold text-[10px] tracking-wider uppercase"
            aria-label={`Status badge: ${badgeText}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
            {badgeText}
          </span>
        )}
        
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-400 shadow-inner">
          <Database className="w-6 h-6 text-slate-455" aria-hidden="true" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-heading font-black text-dark uppercase tracking-tight">
          {title}
        </h2>
        <p className="text-slate-500 text-xs md:text-sm font-sans font-medium">
          {subtitle}
        </p>
        {description && (
          <p className="text-slate-400 text-[11px] leading-relaxed max-w-md mx-auto pt-2 border-t border-slate-50 font-sans">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
