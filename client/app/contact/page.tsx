'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/request-proposal/');
  }, [router]);

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-400 text-sm font-semibold">Redirecting to Request Proposal...</p>
      </div>
    </div>
  );
}
