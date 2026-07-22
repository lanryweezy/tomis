'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-md mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-8">
          <img src="/images/brand/wordmark.svg" alt="TOMIS" className="h-6 mx-auto mb-6" />
          <h1 className="font-display text-3xl text-[var(--color-neutral-ink)] mb-2">
            {isLogin ? 'WELCOME BACK' : 'JOIN TOMIS'}
          </h1>
          <p className="text-sm text-[var(--color-neutral-gray-500)]">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-neutral-gray-500)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--color-neutral-gray-200)] text-sm focus:outline-none focus:border-[var(--color-neutral-ink)] transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-neutral-gray-500)] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--color-neutral-gray-200)] text-sm focus:outline-none focus:border-[var(--color-neutral-ink)] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button className="text-xs text-[var(--color-brand-blue)] underline underline-offset-4 hover:text-[var(--color-brand-navy)]">
                Forgot password?
              </button>
            </div>
          )}

          <Button variant="primary" size="lg" fullWidth>
            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-[var(--color-neutral-gray-200)] text-center">
          <p className="text-sm text-[var(--color-neutral-gray-500)]">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[var(--color-brand-blue)] underline underline-offset-4 hover:text-[var(--color-brand-navy)]"
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-neutral-gray-200)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[var(--color-neutral-paper)] px-4 text-[var(--color-neutral-gray-500)]">or</span>
            </div>
          </div>

          <Button variant="secondary" size="lg" fullWidth className="mt-6">
            <svg width="18" height="18" viewBox="0 0 24 24" className="mr-2">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            CONTINUE WITH GOOGLE
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
