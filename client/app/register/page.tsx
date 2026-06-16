'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import Link from 'next/link';
import { Zap, Mail, Phone, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'consumer' | 'producer'>('consumer');
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/users/register', {
        name,
        email,
        password,
        role,
        phone
      });

      console.log("REGISTER RESPONSE:", res);
      localStorage.setItem('userInfo', JSON.stringify(res));
      alert('Registration successful! ✅ Welcome to the portal.');
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Registration failed. Please check details ❌');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSimulate = async () => {
    const emailInput = prompt('Enter Google Account Email to connect with Workspace SSO:', 'partner@google-workspace.com');
    if (!emailInput) return;
    setLoading(true);
    try {
      const res = await api.post('/users/google-login', {
        email: emailInput,
        googleId: `google-sso-${emailInput.replace(/[^a-zA-Z0-9]/g, '')}`,
        name: 'Google Partner Operator',
        role: role
      });
      localStorage.setItem('userInfo', JSON.stringify(res));
      alert('Authenticated via Google Workspace successfully ✅');
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Google Workspace SSO failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light text-dark px-4 py-12 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 w-full max-w-lg space-y-8">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block text-xl font-bold font-heading tracking-tight text-primary">
            INFINITY GREEN
          </Link>
          <h2 className="text-2xl font-black font-heading text-dark uppercase tracking-tight">Create Portal Node</h2>
          <p className="text-slate-400 text-xs">Establish credentials to access grid tariffs and listings.</p>
        </div>

        {/* Role Selection Blocks */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            type="button"
            onClick={() => setRole('consumer')}
            className={`p-4 rounded-xl border text-center transition-all ${role === 'consumer' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
          >
            <div className="text-lg mb-1">⚡</div>
            <div className="text-xs font-heading">Energy Consumer</div>
            <span className="text-[9px] opacity-75 font-normal">Industries & Buildings</span>
          </button>
          <button 
            type="button"
            onClick={() => setRole('producer')}
            className={`p-4 rounded-xl border text-center transition-all ${role === 'producer' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
          >
            <div className="text-lg mb-1">☀️</div>
            <div className="text-xs font-heading">Energy Producer</div>
            <span className="text-[9px] opacity-75 font-normal">IPP & Plant Owners</span>
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-5 text-xs">
          
          <div>
            <label className="block font-bold text-slate-500 uppercase mb-2">Corporate Entity Name</label>
            <div className="relative">
              <User className="absolute left-4 top-4.5 w-4 h-4 text-slate-400" />
              <input
                required
                type="text"
                placeholder="e.g. Manson Textiles Ltd"
                className="input-field pl-11"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-2">Work Email</label>
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

            <div>
              <label className="block font-bold text-slate-500 uppercase mb-2">Mobile Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-4.5 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  className="input-field pl-11"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase mb-2">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4.5 w-4 h-4 text-slate-400" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-field pl-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-400 hover:text-dark focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button disabled={loading} className="btn-primary w-full py-4 text-sm font-bold">
            {loading ? 'Configuring Node...' : 'Establish Connection Account'}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-100 w-full absolute" />
          <span className="bg-white px-4 text-[10px] text-slate-400 font-bold uppercase relative z-10">Or Connect via SSO</span>
        </div>

        <button 
          onClick={handleGoogleSimulate}
          className="w-full flex items-center justify-center gap-2 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.48 3.77v3.08h3.97c2.33-2.14 3.56-5.3 3.56-8.7z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.97-3.08c-1.12.75-2.54 1.19-3.96 1.19-3.05 0-5.63-2.06-6.55-4.83H1.37v3.19A11.99 11.99 0 0 0 12 24z"/>
            <path fill="#FBBC05" d="M5.45 14.37a7.17 7.17 0 0 1 0-4.74V6.44H1.37a11.98 11.98 0 0 0 0 11.12l4.08-3.19z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.94 11.94 0 0 0 12 0 11.99 11.99 0 0 0 1.37 6.44l4.08 3.19c.92-2.77 3.5-4.83 6.55-4.83z"/>
          </svg>
          Google Workspace SSO
        </button>

        <p className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Sign In Here
          </Link>
        </p>

      </div>
    </div>
  );
}
