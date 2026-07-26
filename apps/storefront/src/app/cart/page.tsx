'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';

import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/Toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');

  const shipping = subtotal >= 50000 ? 0 : 2500;
  const total = subtotal + shipping;

  return (
    <div>
      <Section style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '2rem', marginBottom: '2rem' }}>Your Bag</h1>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <Text type="body" color="secondary" style={{ marginBottom: '1.5rem' }}>Your bag is empty</Text>
              <Link href="/shop"><Button label="CONTINUE SHOPPING" /></Link>
            </div>
          ) : (
            <Grid columns={2} gap={10}>
              <Stack gap={0}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: '5rem', height: '6rem', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <Text type="body" weight="medium">{item.name}</Text>
                          <Text type="supporting" color="secondary">{item.color} / {item.size}</Text>
                        </div>
                        <button onClick={() => removeItem(item.id)} aria-label="Remove item" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                        <div style={{ display: 'flex', border: '1px solid var(--border-strong)' }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity" style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>−</button>
                          <span style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity" style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
                        </div>
                        <Text type="body" weight="medium">{formatPrice(item.price * item.quantity)}</Text>
                      </div>
                    </div>
                  </div>
                ))}
              </Stack>

              <div>
                <div style={{ padding: '1.5rem', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', position: 'sticky', top: '6rem' }}>
                  <Text type="label" color="secondary" style={{ marginBottom: '1rem', display: 'block' }}>Order Summary</Text>
                  <Stack gap={2}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="body" color="secondary">Subtotal</Text>
                      <Text type="body">{formatPrice(subtotal)}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="body" color="secondary">Shipping</Text>
                      <Text type="body">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</Text>
                    </div>
                    {shipping > 0 && (
                      <Text type="supporting" color="accent">Free shipping on orders over ₦50,000</Text>
                    )}
                  </Stack>

                  <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '1rem 0' }} />

                  <div>
                    <label htmlFor="promoCode" style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Promo Code</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input id="promoCode" type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Enter code" style={{ flex: 1, padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                      <Button label="APPLY" variant="secondary" />
                    </div>
                  </div>

                  <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '1rem 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <Text type="body" weight="medium">Total</Text>
                    <Text type="body" weight="medium" style={{ fontSize: '1.125rem' }}>{formatPrice(total)}</Text>
                  </div>

                  <Link href="/checkout"><Button label="PROCEED TO CHECKOUT" width="100%" /></Link>
                  <Link href="/shop" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
                    <Text type="supporting" color="accent">CONTINUE SHOPPING</Text>
                  </Link>
                </div>
              </div>
            </Grid>
          )}
        </div>
      </Section>
    </div>
  );
}

function formatPrice(price: number): string {
  return `₦${price.toLocaleString('en-NG')}`;
}
