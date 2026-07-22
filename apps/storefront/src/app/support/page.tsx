'use client';

import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-4xl text-[var(--color-neutral-ink)] mb-8">
          Support
        </h1>

        <div className="space-y-12">
          {/* Contact */}
          <section>
            <h2 className="text-lg font-medium text-[var(--color-neutral-ink)] mb-4">Contact Us</h2>
            <p className="text-sm text-[var(--color-neutral-gray-600)] mb-4">
              Have a question? We&apos;re here to help.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> hello@tomis.ng</p>
              <p><strong>WhatsApp:</strong> +234 XXX XXX XXXX</p>
              <p><strong>Hours:</strong> Monday – Friday, 9am – 5pm WAT</p>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-lg font-medium text-[var(--color-neutral-ink)] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'What sizes do you offer?', a: 'We offer S, M, L, XL, and XXL. Our shirts have a relaxed fit and are true to size.' },
                { q: 'How do I know my size?', a: 'Check our Size Guide for detailed measurements. If you\'re between sizes, we recommend sizing up.' },
                { q: 'What is the half-collar?', a: 'Our signature design features two colours in one shirt, creating a distinctive collar silhouette.' },
                { q: 'How long does delivery take?', a: 'Lagos: 1–2 working days. Nationwide: 2–5 working days.' },
                { q: 'Can I return or exchange?', a: 'Yes. Free returns within 14 days of delivery for unworn items with tags attached.' },
                { q: 'How do I care for my Tomis shirt?', a: 'Machine wash cold with like colours. Tumble dry low. Iron on medium heat. Do not bleach or dry clean.' },
              ].map((faq, i) => (
                <details key={i} className="group border-b border-[var(--color-neutral-gray-200)] pb-4">
                  <summary className="text-sm font-medium text-[var(--color-neutral-ink)] cursor-pointer hover:text-[var(--color-brand-blue)] transition-colors">
                    {faq.q}
                  </summary>
                  <p className="mt-2 text-sm text-[var(--color-neutral-gray-600)] leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section>
            <h2 className="text-lg font-medium text-[var(--color-neutral-ink)] mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Size Guide', href: '/support#size-guide' },
                { label: 'Shipping Info', href: '/support#shipping' },
                { label: 'Returns', href: '/support#returns' },
                { label: 'Care Guide', href: '/support#care' },
              ].map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[var(--color-brand-blue)] underline underline-offset-4 hover:text-[var(--color-brand-navy)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
