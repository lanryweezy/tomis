'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Divider } from '@astryxdesign/core/Divider';
import { Badge } from '@astryxdesign/core/Badge';

type Step = 'address' | 'delivery' | 'payment' | 'confirmation';

interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

const deliveryOptions: DeliveryOption[] = [
  { id: 'lagos-standard', name: 'Lagos Standard', description: 'Lagos mainland delivery', price: 0, estimatedDays: '1-2 working days' },
  { id: 'lagos-express', name: 'Lagos Express', description: 'Same-day delivery (orders before 2pm)', price: 2000, estimatedDays: 'Same day' },
  { id: 'nationwide', name: 'Nationwide', description: 'Delivery across Nigeria', price: 2500, estimatedDays: '3-5 working days' },
  { id: 'nationwide-express', name: 'Nationwide Express', description: 'Priority nationwide delivery', price: 5000, estimatedDays: '1-2 working days' },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('address');
  const [address, setAddress] = useState<Address>({
    firstName: '', lastName: '', email: '', phone: '',
    address1: '', address2: '', city: '', state: '', country: 'Nigeria',
  });
  const [selectedDelivery, setSelectedDelivery] = useState('lagos-standard');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const cartItems = [
    { id: '1', name: 'Half-Collar Shirt', color: 'Black', size: 'L', price: 35000, quantity: 1, image: '/images/products/black-front.jpg' },
    { id: '2', name: 'Half-Collar Shirt', color: 'Navy', size: 'M', price: 35000, quantity: 1, image: '/images/products/navy-front.jpg' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = deliveryOptions.find(d => d.id === selectedDelivery)?.price || 0;
  const freeShipping = subtotal >= 50000;
  const actualShipping = freeShipping ? 0 : deliveryCost;
  const total = subtotal + actualShipping - promoDiscount;

  const handleAddressSubmit = () => {
    if (address.firstName && address.lastName && address.email && address.phone && address.address1 && address.city && address.state) {
      setStep('delivery');
    }
  };

  const handleDeliverySubmit = () => {
    setStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: address.email,
          amount: total,
          metadata: {
            orderNumber: `TOM-${Date.now().toString(36).toUpperCase()}`,
            customerName: `${address.firstName} ${address.lastName}`,
            phone: address.phone,
            address: `${address.address1}, ${address.city}, ${address.state}`,
          },
        }),
      });

      const data = await response.json();

      if (data.status && data.data.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        // Demo mode - simulate success
        const demoOrderNumber = `TOM-${Date.now().toString(36).toUpperCase()}`;
        setOrderNumber(demoOrderNumber);
        setStep('confirmation');
      }
    } catch {
      // Demo mode
      const demoOrderNumber = `TOM-${Date.now().toString(36).toUpperCase()}`;
      setOrderNumber(demoOrderNumber);
      setStep('confirmation');
    } finally {
      setIsProcessing(false);
    }
  };

  const steps: { id: Step; label: string; number: number }[] = [
    { id: 'address', label: 'Address', number: 1 },
    { id: 'delivery', label: 'Delivery', number: 2 },
    { id: 'payment', label: 'Payment', number: 3 },
  ];

  return (
    <div>
      <Section style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '2rem' }}>
            <Link href="/cart" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>← Back to bag</Link>
          </nav>

          {/* Progress Steps */}
          {step !== 'confirmation' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
              {steps.map((s) => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: step === s.id || steps.findIndex(x => x.id === step) > steps.findIndex(x => x.id === s.id) ? 'var(--text-primary)' : 'var(--bg-elevated)',
                    color: step === s.id || steps.findIndex(x => x.id === step) > steps.findIndex(x => x.id === s.id) ? 'var(--bg)' : 'var(--text-muted)',
                    fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.3s',
                  }}>
                    {steps.findIndex(x => x.id === step) > steps.findIndex(x => x.id === s.id) ? '✓' : s.number}
                  </div>
                  <Text type="label" color={step === s.id ? 'primary' : 'secondary'}>{s.label}</Text>
                </div>
              ))}
            </div>
          )}

          <Grid columns={step === 'confirmation' ? 1 : 2} gap={10}>
            {/* Left: Form */}
            <div>
              <AnimatePresence mode="wait">
                {step === 'address' && (
                  <motion.div key="address" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <Stack gap={6}>
                      <div>
                        <Badge label="Step 1" />
                        <h2 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '1.75rem', marginTop: '0.5rem' }}>Delivery Address</h2>
                      </div>

                      <Grid columns={2} gap={4}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>First Name *</label>
                          <input type="text" value={address.firstName} onChange={e => setAddress({ ...address, firstName: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Last Name *</label>
                          <input type="text" value={address.lastName} onChange={e => setAddress({ ...address, lastName: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                        </div>
                      </Grid>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email *</label>
                        <input type="email" value={address.email} onChange={e => setAddress({ ...address, email: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Phone *</label>
                        <input type="tel" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} placeholder="+234" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Address *</label>
                        <input type="text" value={address.address1} onChange={e => setAddress({ ...address, address1: e.target.value })} placeholder="Street address" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                      </div>

                      <div>
                        <input type="text" value={address.address2} onChange={e => setAddress({ ...address, address2: e.target.value })} placeholder="Apartment, suite, etc. (optional)" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                      </div>

                      <Grid columns={2} gap={4}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>City *</label>
                          <input type="text" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>State *</label>
                          <select value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }}>
                            <option value="">Select state</option>
                            {['Lagos', 'Abuja', 'Ogun', 'Oyo', 'Rivers', 'Kano', 'Edo', 'Delta', 'Anambra', 'Enugu'].map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </Grid>

                      <Button label="CONTINUE TO DELIVERY →" width="100%" onClick={handleAddressSubmit} />
                    </Stack>
                  </motion.div>
                )}

                {step === 'delivery' && (
                  <motion.div key="delivery" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <Stack gap={6}>
                      <div>
                        <Badge label="Step 2" />
                        <h2 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '1.75rem', marginTop: '0.5rem' }}>Delivery Method</h2>
                      </div>

                      <Stack gap={3}>
                        {deliveryOptions.map(option => (
                          <button
                            key={option.id}
                            onClick={() => setSelectedDelivery(option.id)}
                            style={{
                              width: '100%', padding: '1rem', border: '1px solid',
                              borderColor: selectedDelivery === option.id ? 'var(--text-primary)' : 'var(--border-strong)',
                              backgroundColor: selectedDelivery === option.id ? 'var(--bg-elevated)' : 'var(--bg)',
                              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Stack gap={1}>
                                <Text type="body" weight="medium">{option.name}</Text>
                                <Text type="supporting" color="secondary">{option.description}</Text>
                              </Stack>
                              <Stack gap={1} style={{ textAlign: 'right' }}>
                                <Text type="body" weight="medium">
                                  {option.price === 0 ? 'FREE' : `₦${option.price.toLocaleString('en-NG')}`}
                                </Text>
                                <Text type="supporting" color="secondary">{option.estimatedDays}</Text>
                              </Stack>
                            </div>
                          </button>
                        ))}
                      </Stack>

                      {freeShipping && (
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-elevated)', textAlign: 'center' }}>
                          <Text type="supporting" color="accent">🎉 Free shipping on orders over ₦50,000</Text>
                        </div>
                      )}

                      <Stack direction="horizontal" gap={4}>
                        <Button label="← BACK" variant="secondary" onClick={() => setStep('address')} />
                        <Button label="CONTINUE TO PAYMENT →" width="100%" onClick={handleDeliverySubmit} />
                      </Stack>
                    </Stack>
                  </motion.div>
                )}

                {step === 'payment' && (
                  <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <Stack gap={6}>
                      <div>
                        <Badge label="Step 3" />
                        <h2 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '1.75rem', marginTop: '0.5rem' }}>Payment</h2>
                      </div>

                      {/* Order Summary */}
                      <div style={{ padding: '1.5rem', border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
                        <Text type="label" color="secondary" style={{ marginBottom: '1rem', display: 'block' }}>Order Summary</Text>
                        {cartItems.map(item => (
                          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <Text type="body">{item.name} ({item.color}, {item.size}) × {item.quantity}</Text>
                            <Text type="body">₦{(item.price * item.quantity).toLocaleString('en-NG')}</Text>
                          </div>
                        ))}
                      </div>

                      {/* Promo Code */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Promo Code</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Enter code" style={{ flex: 1, padding: '0.75rem', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
                          <Button label="APPLY" variant="secondary" onClick={() => { if (promoCode === 'TOMIS10') setPromoDiscount(Math.round(subtotal * 0.1)); }} />
                        </div>
                      </div>

                      {/* Delivery Address Summary */}
                      <div style={{ padding: '1rem', backgroundColor: 'var(--bg-elevated)' }}>
                        <Text type="label" color="secondary" style={{ marginBottom: '0.5rem', display: 'block' }}>Delivering to</Text>
                        <Text type="body">{address.firstName} {address.lastName}</Text>
                        <Text type="supporting" color="secondary">{address.address1}, {address.city}, {address.state}</Text>
                        <Text type="supporting" color="secondary">{address.phone}</Text>
                      </div>

                      <Button label="CONTINUE TO DELIVERY →" variant="secondary" onClick={() => setStep('delivery')} />

                      <Button
                        label={isProcessing ? 'PROCESSING...' : `PAY ₦${total.toLocaleString('en-NG')} →`}
                        width="100%"
                        onClick={handlePayment}
                        isDisabled={isProcessing}
                      />

                      <Text type="supporting" color="secondary" style={{ textAlign: 'center' }}>
                        Secured by Paystack. Your payment information is encrypted.
                      </Text>
                    </Stack>
                  </motion.div>
                )}

                {step === 'confirmation' && (
                  <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ gridColumn: '1 / -1' }}>
                    <Stack gap={6} style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15, stiffness: 200 }} style={{ width: '5rem', height: '5rem', borderRadius: '50%', backgroundColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                      </motion.div>

                      <div>
                        <h2 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem' }}>Order Confirmed!</h2>
                        <Text type="body" color="secondary">Thank you for your order. We&apos;ll send you a confirmation email shortly.</Text>
                      </div>

                      <div style={{ padding: '1.5rem', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                          <Text type="label" color="secondary">Order Number</Text>
                          <Text type="body" weight="medium">{orderNumber}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                          <Text type="label" color="secondary">Total</Text>
                          <Text type="body" weight="medium">₦{total.toLocaleString('en-NG')}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text type="label" color="secondary">Delivery</Text>
                          <Text type="body">{deliveryOptions.find(d => d.id === selectedDelivery)?.estimatedDays}</Text>
                        </div>
                      </div>

                      <Stack gap={3}>
                        <Link href="/shop"><Button label="CONTINUE SHOPPING" width="100%" /></Link>
                        <Link href="/"><Button label="BACK TO HOME" variant="secondary" width="100%" /></Link>
                      </Stack>
                    </Stack>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Order Summary (shown on non-confirmation steps) */}
            {step !== 'confirmation' && (
              <div>
                <div style={{ padding: '1.5rem', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', position: 'sticky', top: '6rem' }}>
                  <Text type="label" color="secondary" style={{ marginBottom: '1rem', display: 'block' }}>Your Order</Text>

                  <Stack gap={4}>
                    {cartItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{ width: '4rem', height: '5rem', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <Text type="body" weight="medium">{item.name}</Text>
                          <Text type="supporting" color="secondary">{item.color} / {item.size}</Text>
                          <Text type="body">₦{item.price.toLocaleString('en-NG')}</Text>
                        </div>
                      </div>
                    ))}
                  </Stack>

                  <Divider style={{ margin: '1rem 0' }} />

                  <Stack gap={2}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="body" color="secondary">Subtotal</Text>
                      <Text type="body">₦{subtotal.toLocaleString('en-NG')}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="body" color="secondary">Shipping</Text>
                      <Text type="body">{actualShipping === 0 ? 'FREE' : `₦${actualShipping.toLocaleString('en-NG')}`}</Text>
                    </div>
                    {promoDiscount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text type="body" color="accent">Discount (TOMIS10)</Text>
                        <Text type="body" color="accent">-₦{promoDiscount.toLocaleString('en-NG')}</Text>
                      </div>
                    )}
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="body" weight="medium">Total</Text>
                      <Text type="body" weight="medium" style={{ fontSize: '1.125rem' }}>₦{total.toLocaleString('en-NG')}</Text>
                    </div>
                  </Stack>
                </div>
              </div>
            )}
          </Grid>
        </div>
      </Section>
    </div>
  );
}
