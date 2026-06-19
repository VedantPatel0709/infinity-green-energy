import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, Mail } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | Infinity Green Energy',
  description: 'The requested route does not exist. Return to the main portal or contact support.',
};

export default function NotFound() {
  return (
    <div className="bg-slate-950 min-h-screen text-white flex items-center justify-center font-sans py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D7A5F_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <span className="text-[10px] bg-primary/20 border border-primary/25 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="text-3xl font-black font-heading uppercase tracking-tight text-white leading-tight">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-xs font-sans leading-relaxed">
            The requested grid route or document registry code could not be resolved. It might have moved or the URL contains an error.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-4 border-t border-slate-800/80">
          <Link href="/" className="btn-primary py-2.5 px-5 text-xs font-bold uppercase tracking-wider w-full sm:w-auto flex items-center justify-center gap-1.5 shadow">
            <Home className="w-3.5 h-3.5" /> Return Home
          </Link>
          <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs transition-all uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" /> Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
