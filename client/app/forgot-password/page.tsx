'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light text-dark px-4 font-sans">
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 w-full max-w-md text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-dark">Check Your Inbox</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              We have dispatched a secure grid reset key link to <strong>{email}</strong>. Please click the link to configure a new access password.
            </p>
          </div>
          <Link href="/login" className="btn-primary w-full py-3.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light text-dark px-4 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 w-full max-w-md space-y-8">
        
        <div className="space-y-2 text-center">
          <Link href="/" className="inline-block text-xl font-bold font-heading tracking-tight text-primary">
            INFINITY GREEN
          </Link>
          <h2 className="text-2xl font-black font-heading text-dark uppercase tracking-tight">Recover Node</h2>
          <p className="text-slate-400 text-xs font-sans">Provide registered work email to receive connection credentials.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-6 text-xs">
          <div>
            <label className="block font-bold text-slate-500 uppercase mb-2">Registered Corporate Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4.5 w-4 h-4 text-slate-400" />
              <input
                required
                type="email"
                placeholder="name@company.com"
                className="input-field pl-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button disabled={loading} className="btn-primary w-full py-4 text-sm font-bold">
            {loading ? 'Transmitting Key...' : 'Request Secure Reset Key'}
          </button>
        </form>

        <p className="text-center text-xs">
          <Link href="/login" className="text-slate-500 font-bold hover:text-dark flex items-center justify-center gap-1.5 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Return to Login Page
          </Link>
        </p>

      </div>
    </div>
  );
}
