'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';



const articles = [
  {
    id: 'the-half-collar-story',
    title: 'The Half-Collar Story',
    excerpt: 'How a simple design idea became the Tomis signature.',
    date: 'January 2025',
    readTime: '5 min read',
    category: 'Brand',
  },
  {
    id: 'dressing-in-lagos',
    title: 'Dressing in Lagos: A Style Guide',
    excerpt: 'From business meetings to weekend brunches — how to navigate Lagos style.',
    date: 'February 2025',
    readTime: '8 min read',
    category: 'Style',
  },
  {
    id: 'cotton-quality',
    title: 'Why We Choose Premium Cotton',
    excerpt: 'The fabric behind the half-collar. 140 GSM of pure comfort.',
    date: 'March 2025',
    readTime: '4 min read',
    category: 'Craft',
  },
  {
    id: 'one-shirt-many-places',
    title: 'One Shirt, Many Places',
    excerpt: 'Five Tomis customers. Five different ways to wear the same shirt.',
    date: 'April 2025',
    readTime: '6 min read',
    category: 'Stories',
  },
  {
    id: 'made-in-lagos',
    title: 'Made in Lagos',
    excerpt: 'The artisans behind every Tomis shirt. A look inside our workshop.',
    date: 'May 2025',
    readTime: '7 min read',
    category: 'Behind the Scenes',
  },
  {
    id: 'capsule-wardrobe',
    title: 'The Tomis Capsule Wardrobe',
    excerpt: 'Build a complete wardrobe with just 5 pieces.',
    date: 'June 2025',
    readTime: '5 min read',
    category: 'Style',
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero */}
        <section className="bg-[var(--color-neutral-ink)] text-white py-20 md:py-28">
          <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8 text-center">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/40 mb-3">
              Stories & Style
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4">
              JOURNAL
            </h1>
            <p className="text-sm text-white/60 max-w-md mx-auto">
              Stories about style, craft, and the Tomis way of dressing.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16 md:py-24">
          <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8">
            <Link href={`/journal/${articles[0].id}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/3] bg-[var(--color-neutral-gray-100)] overflow-hidden">
                  <motion.div
                    className="w-full h-full bg-[var(--color-neutral-gray-200)]"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-brand-blue)] mb-2">
                    {articles[0].category} • {articles[0].date}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-[var(--color-neutral-ink)] mb-4 group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {articles[0].title}
                  </h2>
                  <p className="text-base text-[var(--color-neutral-gray-600)] leading-relaxed mb-4">
                    {articles[0].excerpt}
                  </p>
                  <p className="text-xs text-[var(--color-neutral-gray-500)]">
                    {articles[0].readTime}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 md:py-24 bg-[var(--color-neutral-paper)]">
          <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/journal/${article.id}`} className="group block">
                    <div className="aspect-[4/3] bg-[var(--color-neutral-gray-100)] mb-4 overflow-hidden">
                      <motion.div
                        className="w-full h-full bg-[var(--color-neutral-gray-200)]"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-brand-blue)] mb-1">
                      {article.category}
                    </p>
                    <h3 className="text-lg font-medium text-[var(--color-neutral-ink)] mb-2 group-hover:text-[var(--color-brand-blue)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--color-neutral-gray-500)] mb-2">
                      {article.excerpt}
                    </p>
                    <p className="text-xs text-[var(--color-neutral-gray-400)]">
                      {article.date} • {article.readTime}
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
