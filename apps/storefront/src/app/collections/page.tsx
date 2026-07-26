'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Badge } from '@astryxdesign/core/Badge';
import { Stack } from '@astryxdesign/core/Stack';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { fadeIn } from '@/lib/animations';
import { products } from '@/data/products';

const collections = [
  {
    name: 'Signature',
    description: 'The original half-collar collection. 14 colours, one iconic silhouette.',
    productCount: 14,
    image: '/images/products/olive-front.jpg',
    href: '/shop',
  },
  {
    name: 'Essentials',
    description: 'Core colours that anchor every wardrobe. Black, Navy, White.',
    productCount: 6,
    image: '/images/products/black-front.jpg',
    href: '/shop',
  },
  {
    name: 'Earth Tones',
    description: 'Warm, natural colours inspired by the Nigerian landscape.',
    productCount: 5,
    image: '/images/products/brown-front.jpg',
    href: '/shop',
  },
  {
    name: 'Bold',
    description: 'Statement colours for those who dress to be noticed.',
    productCount: 4,
    image: '/images/products/pink-front.jpg',
    href: '/shop',
  },
];

export default function CollectionsPage() {
  return (
    <div>
      <Section variant="transparent" style={{ padding: '5rem 0', backgroundColor: 'var(--inverted)', color: 'var(--inverted-text)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: 'var(--inverted-text-muted)' }}>Explore</span>
          <h1 className="section-title" style={{ color: 'white' }}>COLLECTIONS</h1>
          <Text type="body" style={{ color: 'var(--inverted-text-muted)' }}>Curated groupings of our half-collar shirts, organized by mood and style.</Text>
        </div>
      </Section>

      <Section variant="transparent" className="section-spacing">
        <div className="container">
          <Grid columns={2} gap={6}>
            {collections.map((collection, index) => (
              <motion.div key={collection.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Link href={collection.href} style={{ textDecoration: 'none' }}>
                  <ClickableCard label={collection.name}>
                    <div style={{ aspectRatio: '16/9', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden', marginBottom: '1rem' }}>
                      <img src={collection.image} alt={`${collection.name} collection`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <Badge label={`${collection.productCount} PRODUCTS`} />
                    <h2 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '1.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>
                      {collection.name}
                    </h2>
                    <Text type="body" color="secondary">{collection.description}</Text>
                  </ClickableCard>
                </Link>
              </motion.div>
            ))}
          </Grid>
        </div>
      </Section>
    </div>
  );
}
