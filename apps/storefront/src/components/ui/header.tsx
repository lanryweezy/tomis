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

  useEffect(() => {
    const isOverlayOpen = isMobileMenuOpen || isSearchOpen;
    if (!isOverlayOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen, isSearchOpen]);

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
              className="lg:hidden w-10 h-10 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] rounded-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-overlay"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
                className="w-10 h-10 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] rounded-sm"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-expanded={isSearchOpen}
                aria-controls="search-overlay"
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              <Link href="/account" className="hidden md:flex w-10 h-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] rounded-sm" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>

              <Link href="/cart" className="relative w-10 h-10 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] rounded-sm" aria-label="Cart">
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
                  {[
                    { label: 'Best Seller', href: '/products/half-collar-shirt-black' },
                    { label: 'Curated Colour Edit', href: '/new-in' },
                    { label: 'All Signature Shirts', href: '/shop' },
                  ].map(item => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-sm text-[var(--color-neutral-ink)] hover:text-[var(--color-brand-blue)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-2">
                        {item.label}
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
                  {[
                    { label: 'Black', href: '/shop?color=black' },
                    { label: 'Navy', href: '/shop?color=navy' },
                    { label: 'Olive', href: '/shop?color=olive' },
                    { label: 'Pink', href: '/shop?color=pink' },
                    { label: 'Brown', href: '/shop?color=brown' },
                  ].map(item => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-sm text-[var(--color-neutral-ink)] hover:text-[var(--color-brand-blue)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-2">
                        {item.label}
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
                  {[
                    { label: 'Journal', href: '/journal' },
                    { label: 'Lookbook', href: '/journal' },
                    { label: 'Our Story', href: '/about' },
                    { label: 'Size Guide', href: '/size-guide' },
                  ].map(item => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-sm text-[var(--color-neutral-ink)] hover:text-[var(--color-brand-blue)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-2">
                        {item.label}
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
        <div id="mobile-menu-overlay" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" className="fixed inset-0 z-[var(--z-modal)] lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[calc(100vw-2rem)] bg-white p-6 overflow-y-auto">
            <h2 id="mobile-menu-title" className="sr-only">Tomis menu</h2>
            <div className="flex justify-between items-center mb-8">
              <img src="/images/brand/wordmark.svg" alt="TOMIS" className="h-5" />
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] rounded-sm">
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
        <div id="search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-overlay-title" className="fixed inset-0 z-[var(--z-modal)] bg-white">
          <div className="max-w-2xl mx-auto px-4 pt-20">
            <h2 id="search-overlay-title" className="sr-only">Search Tomis</h2>
            <div className="flex items-center gap-4 border-b-2 border-[var(--color-neutral-ink)] pb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search Tomis..."
                aria-label="Search query"
                className="flex-1 text-xl outline-none bg-transparent placeholder:text-[var(--color-neutral-gray-400)]"
                autoFocus
              />
              <button onClick={() => setIsSearchOpen(false)} aria-label="Close search" className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] rounded-sm">
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
                  {[
                  { label: 'Half-collar shirt', href: '/shop' },
                  { label: 'Black', href: '/shop?color=black' },
                  { label: 'Navy', href: '/shop?color=navy' },
                  { label: 'Curated colour edit', href: '/new-in' },
                  { label: 'Best seller', href: '/products/half-collar-shirt-black' },
                ].map(tag => (
                  <Link key={tag.label} href={tag.href} onClick={() => setIsSearchOpen(false)} className="px-4 py-2 border border-[var(--color-neutral-gray-200)] text-sm hover:border-[var(--color-neutral-ink)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] transition-colors">
                    {tag.label}
                  </Link>
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
