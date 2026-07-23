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

const shopDropdown = [
  { label: 'All Shirts', href: '/shop' },
  { label: 'Best Sellers', href: '/shop' },
  { label: 'New Arrivals', href: '/shop' },
];

const shopByColour = [
  { label: 'Black', href: '/shop' },
  { label: 'Navy', href: '/shop' },
  { label: 'Olive', href: '/shop' },
  { label: 'Pink', href: '/shop' },
  { label: 'Brown', href: '/shop' },
];

export default function TomisNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsShopOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Announcement Bar */}
      <div style={{ backgroundColor: 'var(--color-brand-navy, #0B1F5E)', color: 'white', textAlign: 'center', padding: '0.5rem 1rem', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: 500 }}>
        FREE DELIVERY IN LAGOS ON ORDERS OVER ₦50,000
      </div>

      {/* Main Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'var(--color-background-surface, #FFFFFF)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border, #E7E5E4)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{ display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isMobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--color-text-primary, #101114)', textDecoration: 'none' }}>
              Tomis
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            {navItems.map(item => (
              <div
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.label === 'SHOP' && setIsShopOpen(true)}
                onMouseLeave={() => item.label === 'SHOP' && setIsShopOpen(false)}
              >
                <Link
                  href={item.href}
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    color: pathname === item.href ? 'var(--color-text-accent, #1647B8)' : 'var(--color-text-primary, #101114)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </Link>

                {/* Shop Mega Dropdown */}
                {item.label === 'SHOP' && isShopOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '-1rem',
                      width: '400px',
                      backgroundColor: 'white',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      padding: '1.5rem',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1.5rem',
                      marginTop: '0.5rem',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-secondary, #78716C)', marginBottom: '0.75rem' }}>
                        HALF-COLLAR SHIRTS
                      </p>
                      {shopDropdown.map(sub => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          style={{ display: 'block', padding: '0.375rem 0', fontSize: '0.875rem', color: 'var(--color-text-primary, #101114)', textDecoration: 'none' }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-secondary, #78716C)', marginBottom: '0.75rem' }}>
                        SHOP BY COLOUR
                      </p>
                      {shopByColour.map(sub => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          style={{ display: 'block', padding: '0.375rem 0', fontSize: '0.875rem', color: 'var(--color-text-primary, #101114)', textDecoration: 'none' }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/search" style={{ display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-primary, #101114)' }} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </Link>
            <Link href="/account" style={{ display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-primary, #101114)' }} aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link href="/cart" style={{ position: 'relative', display: 'flex', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-primary, #101114)' }} aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '1.125rem', height: '1.125rem', backgroundColor: 'var(--color-text-accent, #1647B8)', color: 'white', fontSize: '0.6rem', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1400 }}
          >
            <div
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '20rem', backgroundColor: 'white', padding: '1.5rem', overflowY: 'auto' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', fontStyle: 'italic' }}>Tomis</span>
                <button onClick={() => setIsMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {navItems.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      color: pathname === item.href ? 'var(--color-text-accent, #1647B8)' : 'var(--color-text-primary, #101114)',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
