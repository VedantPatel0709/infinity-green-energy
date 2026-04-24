'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await api.post('/users/login', {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res);

      // ✅ store full user (not just token)
      localStorage.setItem('userInfo', JSON.stringify(res));

      alert('Login successful ✅');

      router.push('/dashboard');

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Login failed ❌');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-10 rounded-2xl space-y-6 w-96">
        
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary w-full">
          Login
        </button>

      </form>
    </div>
  );
}