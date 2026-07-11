'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@lib/supabase/client';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(error === 'auth_failed' ? 'Authentication failed. Please try again.' : '');
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,45,120,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold font-headline tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(255,45,120,0.8)] inline-block mb-2">
            NEON-ACTION
          </Link>
          <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">Student Access Portal</p>
        </div>

        <div className="bg-surface-container border border-primary/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,45,120,0.1)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <h1 className="text-2xl font-headline font-bold text-on-surface">Sign In</h1>
          </div>

          {errorMsg && (
            <div className="bg-error/10 border border-error/30 rounded-lg px-4 py-3 mb-6 text-sm text-error font-label flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu"
                className="w-full bg-surface border border-outline/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" />
            </div>
            <div>
              <label className="block text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full bg-surface border border-outline/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-primary text-on-primary font-bold font-label uppercase tracking-wider py-3 rounded-lg hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span> Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>login</span> Sign In
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-on-surface-variant text-sm font-label">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary hover:text-secondary font-bold transition-colors">Register here</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-on-surface-variant/40 text-xs font-label mt-6 uppercase tracking-widest">NEON-ACTION Cinema © 2024</p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center"><div className="text-primary font-label animate-pulse">Loading...</div></main>}>
      <LoginForm />
    </Suspense>
  );
}
