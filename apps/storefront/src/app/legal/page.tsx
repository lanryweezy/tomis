'use client';

import Link from 'next/link';



const legalPages = [
  { title: 'Terms of Service', content: 'These terms govern your use of the Tomis website and services.' },
  { title: 'Privacy Policy', content: 'How we collect, use, and protect your personal information.' },
  { title: 'Cookie Policy', content: 'How we use cookies to improve your browsing experience.' },
  { title: 'Return Policy', content: 'Free returns within 14 days of delivery for unworn items.' },
  { title: 'Shipping Policy', content: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.' },
  { title: 'Refund Policy', content: 'Refunds processed within 5–7 working days of return confirmation.' },
];

export default function LegalPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-4xl text-[var(--color-neutral-ink)] mb-8">
          Legal
        </h1>
        <div className="space-y-6">
          {legalPages.map(page => (
            <details key={page.title} className="group border-b border-[var(--color-neutral-gray-200)] pb-6">
              <summary className="text-lg font-medium text-[var(--color-neutral-ink)] cursor-pointer hover:text-[var(--color-brand-blue)] transition-colors">
                {page.title}
              </summary>
              <p className="mt-3 text-sm text-[var(--color-neutral-gray-600)] leading-relaxed">
                {page.content}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/" className="text-sm text-[var(--color-brand-blue)] underline underline-offset-4 hover:text-[var(--color-brand-navy)]">
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
