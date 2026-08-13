'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

interface VerificationResult {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  paidAt?: string;
}

function CheckoutVerifyContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const { clearCart } = useCart();
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!reference) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- derive the initial error from the callback URL.
      setError('No payment reference was provided.');
      setState('error');
      return;
    }

    let cancelled = false;
    fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
      .then(async response => {
        const data = await response.json();
        if (!response.ok || data.data?.status !== 'success') throw new Error(data.error || 'Payment could not be verified.');
        return data.data as VerificationResult;
      })
      .then(data => {
        if (cancelled) return;
        setResult(data);
        setState('success');
        clearCart();
      })
      .catch(reason => {
        if (cancelled) return;
        setError(reason instanceof Error ? reason.message : 'Payment could not be verified.');
        setState('error');
      });

    return () => { cancelled = true; };
  }, [clearCart, reference]);

  return (
    <main style={{ maxWidth: '640px', margin: '0 auto', padding: '8rem 1.5rem', textAlign: 'center' }}>
      {state === 'loading' && <><p aria-live="polite">Verifying your payment…</p><p style={{ color: 'var(--text-secondary)' }}>Please keep this window open.</p></>}
      {state === 'error' && <><h1 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '2.5rem' }}>Payment needs attention</h1><p role="alert" style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{error}</p><p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>If money was deducted, please contact hello@tomis.ng with your payment reference.</p><Link href="/support" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--accent)', textDecoration: 'underline' }}>Contact support</Link></>}
      {state === 'success' && result && <><h1 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '2.5rem' }}>Payment confirmed</h1><p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Thank you for your Tomis order. Your payment was verified successfully.</p><div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--border)', textAlign: 'left' }}><p><strong>Reference:</strong> {result.reference}</p><p style={{ marginTop: '0.5rem' }}><strong>Total:</strong> ₦{(result.amount / 100).toLocaleString('en-NG')}</p></div><Link href="/shop" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--accent)', textDecoration: 'underline' }}>Continue shopping</Link></>}
    </main>
  );
}

export default function CheckoutVerifyPage() {
  return <Suspense fallback={<main style={{ maxWidth: '640px', margin: '0 auto', padding: '8rem 1.5rem', textAlign: 'center' }}>Verifying your payment…</main>}><CheckoutVerifyContent /></Suspense>;
}
