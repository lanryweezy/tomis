'use client';

import { motion } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    id: string;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

export function CartDrawer({ isOpen, onClose, items }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-modal)]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-full max-w-[var(--cart-drawer-width)] bg-white shadow-xl"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-neutral-gray-200)]">
            <h2 className="text-sm font-medium tracking-[0.1em] uppercase">
              YOUR BAG ({items.length})
            </h2>
            <button onClick={onClose} aria-label="Close cart" className="text-[var(--color-neutral-gray-400)] hover:text-[var(--color-neutral-ink)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-sm text-[var(--color-neutral-gray-500)] mb-4">Your bag is empty</p>
                <a href="/shop" className="text-sm text-[var(--color-brand-blue)] underline underline-offset-4">
                  Continue Shopping
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-[var(--color-neutral-gray-100)]">
                    <div className="w-20 h-24 bg-[var(--color-neutral-gray-50)] shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-xs text-[var(--color-neutral-gray-500)]">{item.color} / {item.size}</p>
                        </div>
                        <button aria-label="Remove item" className="text-[var(--color-neutral-gray-400)] hover:text-[var(--color-neutral-ink)]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 6l12 12M6 18L18 6" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[var(--color-neutral-gray-200)]">
                          <button aria-label="Decrease quantity" className="w-7 h-7 flex items-center justify-center text-sm">−</button>
                          <span className="w-7 h-7 flex items-center justify-center text-sm">{item.quantity}</span>
                          <button aria-label="Increase quantity" className="w-7 h-7 flex items-center justify-center text-sm">+</button>
                        </div>
                        <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString('en-NG')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 py-4 border-t border-[var(--color-neutral-gray-200)]">
              <div className="flex justify-between text-sm mb-4">
                <span className="text-[var(--color-neutral-gray-500)]">Subtotal</span>
                <span className="font-medium">₦{subtotal.toLocaleString('en-NG')}</span>
              </div>
              <p className="text-[10px] text-[var(--color-neutral-gray-500)] mb-4">
                Shipping calculated at checkout
              </p>
              <a
                href="/cart"
                className="block w-full h-11 bg-[var(--color-brand-blue)] text-white text-sm font-medium tracking-wider text-center leading-[44px] hover:bg-[var(--color-brand-navy)] transition-colors"
              >
                VIEW BAG
              </a>
              <a
                href="/checkout"
                className="block w-full h-11 border border-[var(--color-neutral-ink)] text-[var(--color-neutral-ink)] text-sm font-medium tracking-wider text-center leading-[44px] hover:bg-[var(--color-neutral-ink)] hover:text-white transition-colors mt-2"
              >
                CHECKOUT
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  if (!isOpen) return null;

  return (
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
          <button onClick={onClose} aria-label="Close search">
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
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] lg:hidden">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <img src="/images/brand/wordmark.svg" alt="TOMIS" className="h-5" />
          <button onClick={onClose} aria-label="Close menu">
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
            <a
              key={item.label}
              href={item.href}
              className="block text-lg font-medium tracking-[0.1em] text-[var(--color-neutral-ink)]"
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
