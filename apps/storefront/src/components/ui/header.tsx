'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-sm)]'
            : 'bg-[var(--color-neutral-paper)]'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-[var(--color-brand-navy)] text-white text-center py-2 text-xs tracking-widest font-medium">
          FREE DELIVERY IN LAGOS ON ORDERS OVER ₦50,000
        </div>

        {/* Main Nav */}
        <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-[var(--header-height-desktop)]">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isMobileMenuOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M3 8h18M3 16h18" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/images/brand/wordmark.svg"
                alt="TOMIS"
                className="h-6 md:h-7"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { label: 'SHOP', href: '/shop' },
                { label: 'NEW IN', href: '/new-in' },
                { label: 'COLLECTIONS', href: '/collections' },
                { label: 'ABOUT', href: '/about' },
                { label: 'JOURNAL', href: '/journal' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium tracking-[0.15em] text-[var(--color-neutral-ink)] hover:text-[var(--color-brand-blue)] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                className="w-10 h-10 flex items-center justify-center"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              <Link href="/account" className="hidden md:flex w-10 h-10 items-center justify-center" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>

              <Link href="/cart" className="relative w-10 h-10 flex items-center justify-center" aria-label="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--color-brand-blue)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <div className="hidden lg:block border-t border-[var(--color-neutral-gray-200)]">
          <div className="max-w-[var(--max-wide-width)] mx-auto px-8">
            <div className="py-8 grid grid-cols-4 gap-8">
              <div>
                <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-neutral-gray-500)] mb-4">
                  Half-Collar Shirts
                </h4>
                <ul className="space-y-2.5">
                  {['Best Sellers', 'New Arrivals', 'All Shirts'].map(item => (
                    <li key={item}>
                      <Link href="/shop" className="text-sm text-[var(--color-neutral-ink)] hover:text-[var(--color-brand-blue)] transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-neutral-gray-500)] mb-4">
                  Shop by Colour
                </h4>
                <ul className="space-y-2.5">
                  {['Black', 'Navy', 'Olive', 'Pink', 'Brown'].map(item => (
                    <li key={item}>
                      <Link href="/shop" className="text-sm text-[var(--color-neutral-ink)] hover:text-[var(--color-brand-blue)] transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-neutral-gray-500)] mb-4">
                  Coming Soon
                </h4>
                <ul className="space-y-2.5">
                  {['Polos', 'Bottoms', 'Bags', 'Women'].map(item => (
                    <li key={item}>
                      <span className="text-sm text-[var(--color-neutral-gray-400)] cursor-default">
                        {item} <span className="text-[9px] tracking-wider text-[var(--color-brand-blue)]">SOON</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-neutral-gray-500)] mb-4">
                  The Tomis World
                </h4>
                <ul className="space-y-2.5">
                  {['Journal', 'Lookbook', 'Our Story', 'Size Guide'].map(item => (
                    <li key={item}>
                      <Link href="/about" className="text-sm text-[var(--color-neutral-ink)] hover:text-[var(--color-brand-blue)] transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <img src="/images/brand/wordmark.svg" alt="TOMIS" className="h-5" />
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            <nav className="space-y-6">
              {[
                { label: 'SHOP', href: '/shop' },
                { label: 'NEW IN', href: '/new-in' },
                { label: 'COLLECTIONS', href: '/collections' },
                { label: 'ABOUT', href: '/about' },
                { label: 'JOURNAL', href: '/journal' },
              ].map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-lg font-medium tracking-[0.1em] text-[var(--color-neutral-ink)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] bg-white">
          <div className="max-w-2xl mx-auto px-4 pt-20">
            <div className="flex items-center gap-4 border-b-2 border-[var(--color-neutral-ink)] pb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search Tomis..."
                className="flex-1 text-xl outline-none bg-transparent placeholder:text-[var(--color-neutral-gray-400)]"
                autoFocus
              />
              <button onClick={() => setIsSearchOpen(false)} aria-label="Close search">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            <div className="mt-8">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-neutral-gray-500)] mb-4">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Half-collar', 'Black', 'Navy', 'New Arrivals', 'Best Sellers'].map(tag => (
                  <span key={tag} className="px-4 py-2 border border-[var(--color-neutral-gray-200)] text-sm hover:border-[var(--color-neutral-ink)] cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-[calc(var(--header-height-desktop)+2rem)]" />
    </>
  );
}
