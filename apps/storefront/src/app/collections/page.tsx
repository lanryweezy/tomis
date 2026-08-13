'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Badge } from '@astryxdesign/core/Badge';
import { Stack } from '@astryxdesign/core/Stack';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import '@astryxdesign/theme-neutral/theme.css';
import { products, getUniqueColors } from '@/data/products';

const colors = getUniqueColors();
const colorSlugs = new Set(colors.map(color => color.slug));
const collections = [
  {
    name: 'Signature',
    description: `The original half-collar collection. ${products.length} colours, one iconic silhouette.`,
    productCount: products.length,
    image: '/images/products/olive-front.jpg',
    href: '/shop',
  },
  {
    name: 'Essentials',
    description: 'Core colours that anchor every wardrobe: Black, Navy, and Cream.',
    productCount: ['black', 'navy', 'cream'].filter(slug => colorSlugs.has(slug)).length,
    image: '/images/products/black-front.jpg',
    href: '/shop?collection=essentials',
  },
  {
    name: 'Earth Tones',
    description: 'Warm, natural colours inspired by the Nigerian landscape.',
    productCount: ['olive', 'brown', 'terracotta', 'sage', 'sand'].filter(slug => colorSlugs.has(slug)).length,
    image: '/images/products/brown-front.jpg',
    href: '/shop?collection=earth-tones',
  },
  {
    name: 'Bold',
    description: 'Statement colours for those who dress to be noticed.',
    productCount: ['pink', 'lavender', 'burgundy', 'sky'].filter(slug => colorSlugs.has(slug)).length,
    image: '/images/products/pink-front.jpg',
    href: '/shop?collection=bold',
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Theme theme={neutralTheme} mode="dark">
        <Section variant="section" style={{ padding: '5rem 0' }}>
          <Stack gap={3} align="center" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', textAlign: 'center' }}>
            <Badge label="Explore" />
            <Text type="display-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 0.9 }}>COLLECTIONS</Text>
            <Text type="body" color="secondary">Curated views of one signature silhouette, organized by mood and colour.</Text>
          </Stack>
        </Section>
      </Theme>

      <Section variant="section" className="section-spacing">
        <Stack style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
          <Grid columns={2} gap={6}>
            {collections.map((collection, index) => (
              <motion.div key={collection.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Link href={collection.href} style={{ textDecoration: 'none' }}>
                  <ClickableCard label={collection.name}>
                    <Stack style={{ aspectRatio: '16/9', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden', marginBottom: '1rem' }}>
                      <img src={collection.image} alt={`${collection.name} collection`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Stack>
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
        </Stack>
      </Section>
    </>
  );
}
