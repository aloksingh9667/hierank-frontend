'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { request } from '@/lib/client-api';
import { setToken } from '@/lib/auth';
import { Field, FormAlert } from '@/components/forms/Field';

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await request('/auth/login', { method: 'POST', body: f });
      setToken(res.token);
      router.replace('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-5 rounded-card border-t-2 border-gold bg-white p-8 shadow-modal">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy font-serif text-xl text-gold">H</span>
          <h1 className="mt-4 font-serif text-2xl text-navy">HBS Admin</h1>
          <p className="text-sm text-muted">Sign in to manage applications and enquiries</p>
        </div>
        <Field label="Email" name="email" required><input id="email" name="email" type="email" className="input" autoComplete="username" required /></Field>
        <Field label="Password" name="password" required><input id="password" name="password" type="password" className="input" autoComplete="current-password" required /></Field>
        <FormAlert>{error}</FormAlert>
        <button disabled={loading} className="btn-primary w-full">{loading && <Loader2 className="h-4 w-4 animate-spin" />}Sign in</button>
      </form>
    </div>
  );
}
