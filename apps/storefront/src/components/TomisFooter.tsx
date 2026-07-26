'use client';

import Link from 'next/link';
import { Text } from '@astryxdesign/core/Text';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';

import { Button } from '@astryxdesign/core/Button';

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
            <Stack direction="horizontal" gap={3}>
              {['Instagram', 'Twitter', 'TikTok'].map(s => (
                <a key={s} href="#" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{s}</a>
              ))}
            </Stack>
          </Stack>
          {[
            { title: 'Shop', items: ['Half-Collar Shirts', 'New Arrivals', 'Best Sellers', 'All Products'] },
            { title: 'Company', items: ['Our Story', 'Journal', 'Careers', 'Sustainability'] },
            { title: 'Support', items: ['Contact Us', 'FAQ', 'Shipping & Delivery', 'Returns & Exchanges', 'Size Guide'] },
          ].map(col => (
            <Stack key={col.title} gap={4}>
              <Text type="label" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.6rem' }}>{col.title}</Text>
              <Stack gap={2}>
                {col.items.map(item => (
                  <Link key={item} href={col.title === 'Shop' ? '/shop' : col.title === 'Company' ? '/about' : '/support'} style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{item}</Link>
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
          <Stack direction="horizontal" gap={2}>
              <input aria-label="Email address" type="email" placeholder="Your email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" style={{ flex: 1, minWidth: '200px', padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.875rem', outline: 'none' }} />
            <Button label="SUBSCRIBE" />
          </Stack>
        </Stack>

        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', margin: '1.5rem 0' }} />

        <Stack direction="horizontal" gap={4} style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text type="supporting" style={{ color: 'var(--inverted-text-muted)' }}>&copy; {new Date().getFullYear()} Tomis. All rights reserved.</Text>
          <Stack direction="horizontal" gap={4}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <Link key={item} href="/legal" style={{ fontSize: '0.75rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{item}</Link>
            ))}
          </Stack>
        </Stack>
      </div>
    </footer>
  );
}
