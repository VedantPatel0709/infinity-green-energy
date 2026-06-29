'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-16 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D7A5F_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-25 pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10 bg-slate-900/50 border border-slate-800/80 p-8 sm:p-12 rounded-3xl backdrop-blur-sm shadow-2xl">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase border border-primary/20">
            <ShieldCheck className="w-3.5 h-3.5" /> Gateway
          </span>
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <h1 className="text-4xl font-black font-heading uppercase tracking-tight text-white">
            Portal
          </h1>
          <p className="text-slate-455 text-xs sm:text-sm font-sans leading-relaxed text-slate-400">
            Secure access for Producers, Consumers and Infinity Green Energy administrators.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Link 
            href="/login" 
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/20"
          >
            <KeyRound className="w-4 h-4" /> Sign In
          </Link>
          
          <Link 
            href="/register" 
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800/40 text-slate-350 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
