'use client';

import Link from 'next/link';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';

const legalPages = [
  { title: 'Terms of Service', content: 'These terms govern your use of the Tomis website and services. By accessing our site, you agree to these terms. Tomis reserves the right to modify these terms at any time. Continued use of the site constitutes acceptance of any changes.' },
  { title: 'Privacy Policy', content: 'We collect personal information you provide directly, such as your name, email, and shipping address. We use this information to process orders, communicate with you, and improve our services. We do not sell your personal information to third parties. We use industry-standard encryption to protect your data.' },
  { title: 'Cookie Policy', content: 'We use cookies to improve your browsing experience, analyze site traffic, and personalize content. Essential cookies are necessary for the site to function. Analytics cookies help us understand how visitors interact with our site. You can control cookie preferences through your browser settings.' },
  { title: 'Return Policy', content: 'We offer free returns within 14 days of delivery for unworn items with tags attached. To initiate a return, contact our support team with your order number. Refunds are processed within 5-7 working days of receiving the returned item. Exchanges are available for different sizes of the same product.' },
  { title: 'Shipping Policy', content: 'Lagos delivery: 1-2 working days. Nationwide delivery: 2-5 working days. Free shipping on orders over ₦50,000 in Lagos. All orders include tracking information sent via email and SMS.' },
  { title: 'Refund Policy', content: 'Refunds are processed to the original payment method within 5-7 working days of return confirmation. Paystack refunds are processed instantly. Bank transfers may take additional time depending on your bank.' },
];

export default function LegalPage() {
  return (
    <div>
      <Section variant="transparent" className="section-spacing">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '2rem', marginBottom: '2rem' }}>Legal</h1>
          <Stack gap={0}>
            {legalPages.map(page => (
              <details key={page.title} className="group" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <summary style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--text-primary)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {page.title}
                  <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)', transition: 'transform 0.2s' }}>+</span>
                </summary>
                <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: 'var(--color-text-secondary, #78716C)', lineHeight: 1.7 }}>
                  {page.content}
                </p>
              </details>
            ))}
          </Stack>
          <Link href="/" style={{ fontSize: '0.875rem', color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            ← Back to home
          </Link>
        </div>
      </Section>
    </div>
  );
}
