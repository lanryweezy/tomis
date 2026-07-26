'use client';

import Link from 'next/link';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Stack } from '@astryxdesign/core/Stack';
import { Button } from '@astryxdesign/core/Button';
import { Badge } from '@astryxdesign/core/Badge';

const faqs = [
  { q: 'What is the half-collar?', a: 'Our signature mandarin collar design delivers a clean, modern silhouette. One colour, one collar, one confidence.' },
  { q: 'What sizes do you offer?', a: 'We offer S, M, L, XL, and XXL. Our shirts have a relaxed fit and are true to size. Check our Size Guide for detailed measurements.' },
  { q: 'What fabric do you use?', a: '100% premium cotton at 140 GSM. Breathable, durable, and designed to get better with every wash.' },
  { q: 'How do I wash my Tomis shirt?', a: 'Machine wash cold with like colours. Tumble dry low. Iron on medium heat. Do not bleach or dry clean.' },
  { q: 'How long does delivery take?', a: 'Lagos: 1-2 working days. Nationwide: 2-5 working days. Free shipping on orders over ₦50,000 in Lagos.' },
  { q: 'Can I return or exchange?', a: 'Yes. Free returns within 14 days of delivery for unworn items with tags attached. Exchanges available for different sizes.' },
  { q: 'Where are Tomis shirts made?', a: 'Every Tomis shirt is crafted in Lagos, Nigeria. Supporting local artisans and African manufacturing.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship within Nigeria. International shipping is coming soon.' },
];

export default function SupportPage() {
  return (
    <div>
      <Section variant="transparent" className="section-spacing">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '2rem', marginBottom: '2rem' }}>Support</h1>

          <Stack gap={8}>
            {/* Contact */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem' }}>Contact Us</h2>
              <Text type="body" color="secondary" style={{ marginBottom: '1.5rem' }}>
                Have a question? We&apos;re here to help.
              </Text>
              <Grid columns={3} gap={6}>
                <Stack gap={2}>
                  <Text type="label" color="secondary">Email</Text>
                  <Text type="body">hello@tomis.ng</Text>
                </Stack>
                <Stack gap={2}>
                  <Text type="label" color="secondary">WhatsApp</Text>
                  <Text type="body">+234 903 396 7809</Text>
                </Stack>
                <Stack gap={2}>
                  <Text type="label" color="secondary">Hours</Text>
                  <Text type="body">Mon-Fri, 9am-5pm WAT</Text>
                </Stack>
              </Grid>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />

            {/* FAQ */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
              <Stack gap={0}>
                {faqs.map((faq, i) => (
                  <details key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <summary style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)', cursor: 'pointer', listStyle: 'none' }}>
                      {faq.q}
                    </summary>
                    <p style={{ marginTop: '0.75rem', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </Stack>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />

            {/* Quick Links */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem' }}>Quick Links</h2>
              <Grid columns={2} gap={4}>
                {[
                  { label: 'Size Guide', href: '/support' },
                  { label: 'Shipping Info', href: '/support' },
                  { label: 'Returns', href: '/support' },
                  { label: 'Care Guide', href: '/support' },
                ].map(link => (
                  <Link key={link.label} href={link.href} style={{ fontSize: '0.95rem', color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                    {link.label}
                  </Link>
                ))}
              </Grid>
            </section>
          </Stack>
        </div>
      </Section>
    </div>
  );
}
