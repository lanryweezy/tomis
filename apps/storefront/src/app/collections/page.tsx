'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';



const collections = [
  {
    name: 'Signature',
    description: 'The original half-collar collection. 14 colourways, one iconic silhouette.',
    productCount: 14,
    href: '/shop',
  },
  {
    name: 'Essentials',
    description: 'Core colours that anchor every wardrobe. Black, Navy, White.',
    productCount: 6,
    href: '/shop',
  },
  {
    name: 'Earth Tones',
    description: 'Warm, natural colours inspired by the Nigerian landscape.',
    productCount: 5,
    href: '/shop',
  },
  {
    name: 'Bold',
    description: 'Statement colours for those who dress to be noticed.',
    productCount: 4,
    href: '/shop',
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero */}
        <section className="bg-[var(--color-neutral-ink)] text-white py-20 md:py-28">
          <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8 text-center">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/40 mb-3">
              Explore
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4">
              COLLECTIONS
            </h1>
            <p className="text-sm text-white/60 max-w-md mx-auto">
              Curated groupings of our half-collar shirts, organized by mood and style.
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={collection.href} className="group block">
                    <div className="aspect-[16/9] bg-[var(--color-neutral-gray-100)] mb-4 overflow-hidden">
                      <motion.div
                        className="w-full h-full bg-[var(--color-neutral-gray-200)]"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-brand-blue)] mb-1">
                      {collection.productCount} PRODUCTS
                    </p>
                    <h2 className="text-2xl font-medium text-[var(--color-neutral-ink)] mb-2 group-hover:text-[var(--color-brand-blue)] transition-colors">
                      {collection.name}
                    </h2>
                    <p className="text-sm text-[var(--color-neutral-gray-500)]">
                      {collection.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
