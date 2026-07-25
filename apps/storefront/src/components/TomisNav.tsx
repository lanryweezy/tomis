'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Stack } from '@astryxdesign/core/Stack';

import { useTheme } from '@/hooks/useTheme';
import { useCart } from '@/hooks/useCart';
import { navItems } from '@/data/constants';

export default function TomisNav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const { itemCount: cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* Marquee announcement */}
      <div className="marquee" style={{ backgroundColor: 'var(--navy)', color: 'var(--inverted-text)', padding: '0.5rem 0', fontSize: '0.6rem', letterSpacing: '0.2em', fontWeight: 500 }}>
        <div className="marquee-content">
          {['FREE DELIVERY IN LAGOS ON ORDERS OVER ₦50,000', 'EASY RETURNS WITHIN 14 DAYS', 'MADE IN LAGOS, NIGERIA'].map((text, i) => (
            <span key={i} style={{ padding: '0 3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
              {text}
            </span>
          ))}
          {['FREE DELIVERY IN LAGOS ON ORDERS OVER ₦50,000', 'EASY RETURNS WITHIN 14 DAYS', 'MADE IN LAGOS, NIGERIA'].map((text, i) => (
            <span key={`d-${i}`} style={{ padding: '0 3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header
        className={isScrolled ? 'glass' : ''}
        style={{
          position: 'sticky', top: 0, zIndex: 1200,
          backgroundColor: isScrolled ? undefined : 'var(--bg)',
          borderBottom: isScrolled ? 'none' : '1px solid var(--border)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Stack direction="horizontal" gap={4} padding={4} style={{ maxWidth: '1400px', margin: '0 auto', alignItems: 'center', justifyContent: 'space-between', height: isScrolled ? '3.5rem' : '4.5rem', transition: 'height 0.4s ease' }}>
          {/* Mobile toggle */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} style={{ display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isMobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>

          {/* Logo - left aligned */}
          <Link href="/" style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}>
            <span className="font-display" style={{ fontSize: isScrolled ? '1.25rem' : '1.5rem', color: 'var(--text-primary)', transition: 'font-size 0.4s ease, color 0.3s', fontStyle: 'italic' }}>Tomis</span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'none' }} className="desktop-nav" aria-label="Main">
            {navItems.map(item => (
              <Link key={item.label} href={item.href} className="link-underline" style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', color: pathname === item.href ? 'var(--accent)' : 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.3s' }}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <Stack direction="horizontal" gap={2}>
            <button onClick={toggle} className="magnetic-btn" style={{ display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', transition: 'color 0.3s' }} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
              )}
            </button>
            <Link href="/account" className="magnetic-btn" style={{ display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', transition: 'color 0.3s' }} aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </Link>
            <Link href="/cart" className="magnetic-btn" style={{ position: 'relative', display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', transition: 'color 0.3s' }} aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '16px', height: '16px', backgroundColor: 'var(--accent)', color: 'white', fontSize: '0.55rem', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
              )}
            </Link>
          </Stack>
        </Stack>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 1400 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={() => setIsMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '85vw', maxWidth: '320px', backgroundColor: 'var(--bg)', padding: '2rem', overflowY: 'auto', borderRight: '1px solid var(--border)' }}>
              <Stack gap={6}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-display" style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>Tomis</span>
                  <button onClick={() => setIsMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M6 18L18 6" /></svg>
                  </button>
                </div>
                <Stack gap={4}>
                  {navItems.map((item, i) => (
                    <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <Link href={item.href} onClick={() => setIsMobileOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.05em', color: pathname === item.href ? 'var(--accent)' : 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.3s' }}>
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </Stack>
                <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0' }} />
                <button onClick={toggle} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.875rem', transition: 'color 0.3s' }}>
                  {theme === 'light' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                  )}
                  Switch to {theme === 'light' ? 'dark' : 'light'} mode
                </button>
              </Stack>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
