'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('tomis-newsletter-dismissed');
      if (!dismissed) setShow(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShow(false);
        localStorage.setItem('tomis-newsletter-dismissed', 'true');
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [show]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Subscription could not be completed.');
      toast('Thanks for subscribing! Check your inbox.', 'success');
      localStorage.setItem('tomis-newsletter-dismissed', 'true');
      setShow(false);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Subscription could not be completed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('tomis-newsletter-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={dismiss} />
          <motion.div role="dialog" aria-modal="true" aria-labelledby="newsletter-title" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} style={{ position: 'relative', backgroundColor: 'var(--bg-card)', maxWidth: '480px', width: '100%', padding: 'clamp(1.5rem, 5vw, 2.5rem)', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <button onClick={dismiss} aria-label="Close newsletter popup" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.25rem' }}>×</button>
            <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>Join the Tomis Family</p>
            <h2 id="newsletter-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Get 10% Off Your First Order</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Subscribe for new drops, style tips, and exclusive offers.</p>
            <form onSubmit={handleSubmit} className="newsletter-form" style={{ display: 'flex', gap: '0.5rem' }}>
              <input required aria-label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, padding: '0.75rem 1rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
              <button type="submit" aria-label="Subscribe to newsletter" disabled={isSubmitting} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--text-primary)', color: 'var(--bg)', border: 'none', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', cursor: isSubmitting ? 'wait' : 'pointer', transition: 'all 0.3s' }}>{isSubmitting ? 'SENDING…' : 'SUBSCRIBE'}</button>
            </form>
            {status && <p role="alert" style={{ marginTop: '0.75rem', color: 'var(--color-error, #b91c1c)', fontSize: '0.8rem' }}>{status}</p>}
            <button onClick={dismiss} aria-label="Dismiss newsletter" style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.75rem' }}>No thanks</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
