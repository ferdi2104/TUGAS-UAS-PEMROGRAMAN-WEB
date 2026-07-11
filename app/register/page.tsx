'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setSuccessMsg('Account created! Check your email for a confirmation link, then sign in.');
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,204,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold font-headline tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(255,45,120,0.8)] inline-block mb-2">
            NEON-ACTION
          </Link>
          <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">Create Your Account</p>
        </div>

        <div className="bg-surface-container border border-primary/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,45,120,0.1)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
            <h1 className="text-2xl font-headline font-bold text-on-surface">Register</h1>
          </div>

          {errorMsg && (
            <div className="bg-error/10 border border-error/30 rounded-lg px-4 py-3 mb-6 text-sm text-error font-label flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span> {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg px-4 py-3 mb-6 text-sm text-secondary font-label flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">check_circle</span> {successMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant mb-2">Full Name</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name"
                className="w-full bg-surface border border-outline/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" />
            </div>
            <div>
              <label className="block text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu"
                className="w-full bg-surface border border-outline/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" />
            </div>
            <div>
              <label className="block text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters"
                className="w-full bg-surface border border-outline/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" />
            </div>
            <div>
              <label className="block text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant mb-2">Confirm Password</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat your password"
                className="w-full bg-surface border border-outline/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-secondary text-on-secondary font-bold font-label uppercase tracking-wider py-3 rounded-lg hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span> Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span> Register
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-on-surface-variant text-sm font-label">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-secondary font-bold transition-colors">Sign in here</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-on-surface-variant/40 text-xs font-label mt-6 uppercase tracking-widest">NEON-ACTION Cinema © 2024</p>
      </div>
    </main>
  );
}
