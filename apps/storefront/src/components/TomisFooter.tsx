'use client';

import Link from 'next/link';
import { Text } from '@astryxdesign/core/Text';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Button } from '@astryxdesign/core/Button';

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
              <a href="mailto:hello@tomis.ng" style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>hello@tomis.ng</a>
              <a href="https://wa.me/2349033967809" rel="noreferrer" target="_blank" style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>Chat on WhatsApp</a>
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
                  <Link key={item.label} href={item.href} style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{item.label}</Link>
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
          <form action="/api/newsletter" method="post" style={{ display: 'flex', gap: '0.5rem' }}>
            <label htmlFor="footer-email" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>Email address</label>
            <input id="footer-email" name="email" aria-label="Email address" type="email" placeholder="Your email" required style={{ flex: 1, minWidth: '200px', padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.875rem', outline: 'none' }} />
            <Button type="submit" label="SUBSCRIBE" />
          </form>
        </Stack>

        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', margin: '1.5rem 0' }} />

        <Stack direction="horizontal" gap={4} style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text type="supporting" style={{ color: 'var(--inverted-text-muted)' }}>&copy; {new Date().getFullYear()} Tomis. All rights reserved.</Text>
          <Stack direction="horizontal" gap={4}>
            {legalLinks.map(item => (
              <Link key={item.label} href={item.href} style={{ fontSize: '0.75rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{item.label}</Link>
            ))}
          </Stack>
        </Stack>
      </div>
    </footer>
  );
}
