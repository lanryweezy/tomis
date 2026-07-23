'use client';

import Link from 'next/link';



export default function NewInPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="bg-[var(--color-neutral-ink)] text-white py-20 md:py-28">
          <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8 text-center">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--color-brand-blue)] mb-3">
              Just Arrived
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4">
              NEW IN
            </h1>
            <p className="text-sm text-white/60 max-w-md mx-auto">
              The latest additions to the Tomis collection.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8 text-center">
            <p className="text-lg text-[var(--color-neutral-gray-500)] mb-6">
              New products coming soon.
            </p>
            <Link href="/shop" className="text-sm text-[var(--color-brand-blue)] underline underline-offset-4 hover:text-[var(--color-brand-navy)]">
              Browse the full collection →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
