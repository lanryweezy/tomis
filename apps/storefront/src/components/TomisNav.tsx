'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'SHOP', href: '/shop' },
  { label: 'NEW IN', href: '/new-in' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'ABOUT', href: '/about' },
  { label: 'JOURNAL', href: '/journal' },
];

export default function TomisNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* Announcement Bar - marquee style */}
      <div className="marquee" style={{ backgroundColor: '#0B1F5E', color: 'white', padding: '0.5rem 0', fontSize: '0.6rem', letterSpacing: '0.2em', fontWeight: 500 }}>
        <div className="marquee-content">
          <span style={{ padding: '0 3rem' }}>FREE DELIVERY IN LAGOS ON ORDERS OVER ₦50,000</span>
          <span style={{ padding: '0 3rem' }}>EASY RETURNS WITHIN 14 DAYS</span>
          <span style={{ padding: '0 3rem' }}>MADE IN LAGOS, NIGERIA</span>
          <span style={{ padding: '0 3rem' }}>FREE DELIVERY IN LAGOS ON ORDERS OVER ₦50,000</span>
          <span style={{ padding: '0 3rem' }}>EASY RETURNS WITHIN 14 DAYS</span>
          <span style={{ padding: '0 3rem' }}>MADE IN LAGOS, NIGERIA</span>
        </div>
      </div>

      {/* Header */}
      <header
        className={isScrolled ? 'glass' : ''}
        style={{
          position: 'sticky', top: 0, zIndex: 1200,
          backgroundColor: isScrolled ? undefined : '#FAFAF9',
          borderBottom: isScrolled ? 'none' : '1px solid rgba(0,0,0,0.06)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: isScrolled ? '3.5rem' : '4.5rem', transition: 'height 0.4s ease' }}>
          {/* Mobile toggle */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} style={{ display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isMobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none' }}>
            <span className="font-display" style={{ fontSize: isScrolled ? '1.25rem' : '1.5rem', color: '#101114', transition: 'font-size 0.4s ease', fontStyle: 'italic' }}>
              Tomis
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'none' }} className="desktop-nav" aria-label="Main navigation">
            {navItems.map(item => (
              <Link key={item.label} href={item.href} className="link-underline" style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', color: pathname === item.href ? '#1647B8' : '#101114', textDecoration: 'none' }}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/search" className="magnetic-btn" style={{ display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', color: '#101114' }} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </Link>
            <Link href="/account" className="magnetic-btn" style={{ display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', color: '#101114' }} aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </Link>
            <Link href="/cart" className="magnetic-btn" style={{ position: 'relative', display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', color: '#101114' }} aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', top: '-2px', right: '-2px', width: '16px', height: '16px', backgroundColor: '#1647B8', color: 'white', fontSize: '0.55rem', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 1400 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={() => setIsMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '85vw', maxWidth: '320px', backgroundColor: '#FAFAF9', padding: '2rem', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <span className="font-display" style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>Tomis</span>
                <button onClick={() => setIsMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M6 18L18 6" /></svg>
                </button>
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {navItems.map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={item.href} onClick={() => setIsMobileOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.05em', color: pathname === item.href ? '#1647B8' : '#101114', textDecoration: 'none' }}>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
