'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Text } from '@astryxdesign/core/Text';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Button } from '@/components/ui/button';

const shopLinks = [
  { label: 'Half-Collar Shirts', href: '/shop' },
  { label: 'New Arrivals', href: '/new-in' },
  { label: 'Collections', href: '/collections' },
  { label: 'All Products', href: '/shop' },
];

const companyLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Careers', href: '/careers' },
  { label: 'Sustainability', href: '/sustainability' },
];

const supportLinks = [
  { label: 'Contact Us', href: '/support#contact' },
  { label: 'FAQ', href: '/support#faq' },
  { label: 'Shipping & Delivery', href: '/shipping' },
  { label: 'Returns & Exchanges', href: '/returns' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'Care Guide', href: '/support#care' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

export default function TomisFooter() {
  const [newsletterStatus, setNewsletterStatus] = useState<string>('');

  async function handleNewsletterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setNewsletterStatus('Joining…');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.get('email') }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Unable to subscribe');
      setNewsletterStatus('You’re on the list.');
      form.reset();
    } catch (error) {
      setNewsletterStatus(error instanceof Error ? error.message : 'Unable to subscribe');
    }
  }

  return (
    <footer style={{ backgroundColor: 'var(--inverted)', color: 'var(--inverted-text)', padding: '4rem 1rem 2rem', transition: 'background-color 0.3s, color 0.3s' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Grid columns={4} gap={10}>
          <Stack gap={4}>
            <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--inverted-text)', textDecoration: 'none' }}>Tomis</Link>
            <Text type="body" style={{ color: 'var(--inverted-text-muted)', lineHeight: 1.6, maxWidth: '16rem' }}>
              The signature half-collar shirt. Designed for the life you actually live.
            </Text>
            <Stack gap={2}>
              <a href="mailto:hello@tomis.ng" className="focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>hello@tomis.ng</a>
              <a href="https://wa.me/2349033967809" rel="noreferrer" target="_blank" aria-label="Chat with Tomis on WhatsApp (opens in a new tab)" className="focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>Chat on WhatsApp</a>
              <a href="https://www.instagram.com/tomis_inc/" rel="noreferrer" target="_blank" aria-label="Tomis on Instagram (opens in a new tab)" className="focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>Instagram @tomis_inc</a>
            </Stack>
          </Stack>

          {[
            { title: 'Shop', items: shopLinks },
            { title: 'Company', items: companyLinks },
            { title: 'Support', items: supportLinks },
          ].map(col => (
            <Stack key={col.title} gap={4}>
              <Text type="label" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.6rem' }}>{col.title}</Text>
              <Stack gap={2}>
                {col.items.map(item => (
                  <Link key={item.label} href={item.href} className="focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{item.label}</Link>
                ))}
              </Stack>
            </Stack>
          ))}
        </Grid>

        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', margin: '2rem 0' }} />

        <Stack direction="horizontal" gap={4} style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <Text type="body" weight="medium" style={{ marginBottom: '0.25rem' }}>Stay in the loop</Text>
            <Text type="supporting" style={{ color: 'var(--inverted-text-muted)' }}>New drops, stories, and the Tomis way of dressing.</Text>
          </div>
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <label htmlFor="footer-email" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>Email address</label>
            <input id="footer-email" name="email" aria-label="Email address" type="email" placeholder="Your email" required style={{ flex: 1, minWidth: '200px', padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.875rem', outline: 'none' }} />
            <Button type="submit" style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg)', border: 'none' }}>SUBSCRIBE</Button>
            {newsletterStatus && <Text type="supporting" role="status" aria-live="polite" style={{ color: 'var(--inverted-text-muted)', flexBasis: '100%' }}>{newsletterStatus}</Text>}
          </form>
        </Stack>

        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', margin: '1.5rem 0' }} />

        <Stack direction="horizontal" gap={4} style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text type="supporting" style={{ color: 'var(--inverted-text-muted)' }}>&copy; {new Date().getFullYear()} Tomis. All rights reserved.</Text>
          <Stack direction="horizontal" gap={4}>
            {legalLinks.map(item => (
              <Link key={item.label} href={item.href} className="focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" style={{ fontSize: '0.75rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{item.label}</Link>
            ))}
          </Stack>
        </Stack>
      </div>
    </footer>
  );
}
