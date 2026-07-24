'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('tomis-newsletter-dismissed');
      if (!dismissed) setShow(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (!email) return;
    toast('Thanks for subscribing! Check your inbox.', 'success');
    setShow(false);
    localStorage.setItem('tomis-newsletter-dismissed', 'true');
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
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} style={{ position: 'relative', backgroundColor: 'var(--bg-card)', maxWidth: '480px', width: '100%', padding: '2.5rem', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <button onClick={dismiss} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.25rem' }}>×</button>
            <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>Join the Tomis Family</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Get 10% Off Your First Order</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Subscribe for new drops, style tips, and exclusive offers.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, padding: '0.75rem 1rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
              <button onClick={handleSubmit} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--text-primary)', color: 'var(--bg)', border: 'none', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.3s' }}>SUBSCRIBE</button>
            </div>
            <button onClick={dismiss} style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.75rem' }}>No thanks</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
