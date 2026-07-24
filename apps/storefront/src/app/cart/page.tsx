'use client';
import { useToast } from '@/components/ui/Toast';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';


import { Button } from '@/components/ui/button';

const sampleCart = [
  { id: '1', name: 'Half-Collar Shirt', color: 'Black', size: 'L', price: 35000, quantity: 1, image: '/images/products/black-white-front.jpg' },
  { id: '2', name: 'Half-Collar Shirt', color: 'Navy', size: 'M', price: 35000, quantity: 1, image: '/images/products/navy-white-front.jpg' },
];

export default function CartPage() {
  const [cart, setCart] = useState(sampleCart);
  const [promoCode, setPromoCode] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50000 ? 0 : 2500;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8 py-12 md:py-16">
        <h1 className="font-display text-3xl md:text-4xl text-[var(--color-neutral-ink)] mb-8">
          YOUR BAG
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-[var(--color-neutral-gray-500)] mb-6">Your bag is empty</p>
            <Link href="/shop">
              <Button variant="primary" size="lg">CONTINUE SHOPPING</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-4 md:gap-6 py-6 border-b border-[var(--color-neutral-gray-200)]"
                  >
                    <div className="w-24 h-32 md:w-32 md:h-40 bg-[var(--color-neutral-gray-50)] shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-sm font-medium text-[var(--color-neutral-ink)]">{item.name}</h3>
                          <p className="text-xs text-[var(--color-neutral-gray-500)]">{item.color} / {item.size}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--color-neutral-gray-400)] hover:text-[var(--color-neutral-ink)] transition-colors"
                          aria-label="Remove item"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 6l12 12M6 18L18 6" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[var(--color-neutral-gray-200)]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-neutral-gray-50)] transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-neutral-gray-50)] transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString('en-NG')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[var(--color-neutral-gray-50)] p-6 sticky top-24">
                <h2 className="text-sm font-medium tracking-[0.1em] uppercase mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-neutral-gray-600)]">Subtotal</span>
                    <span>₦{subtotal.toLocaleString('en-NG')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-neutral-gray-600)]">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString('en-NG')}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] text-[var(--color-brand-blue)]">
                      Free shipping on orders over ₦50,000
                    </p>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mt-6 pt-6 border-t border-[var(--color-neutral-gray-200)]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-[var(--color-neutral-gray-200)] text-sm bg-white focus:outline-none focus:border-[var(--color-neutral-ink)]"
                    />
                    <Button variant="secondary" size="sm">APPLY</Button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[var(--color-neutral-gray-200)]">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>₦{total.toLocaleString('en-NG')}</span>
                  </div>
                </div>

                <Button variant="primary" size="lg" fullWidth className="mt-6">
                  PROCEED TO CHECKOUT
                </Button>

                <Link href="/shop" className="block text-center mt-4 text-xs text-[var(--color-brand-blue)] underline underline-offset-4 hover:text-[var(--color-brand-navy)]">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
