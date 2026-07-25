'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Badge } from '@astryxdesign/core/Badge';
import { fadeIn, stagger } from '@/lib/animations';
import { products, formatPrice } from '@/data/products';

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);
  return (
    <Section style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
        <motion.div {...fadeIn}>
          <Stack direction="horizontal" gap={4} style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <Stack gap={1}>
              <Badge label="New Arrivals" />
              <h2 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.9, letterSpacing: '-0.03em' }}>THE SIGNATURE</h2>
            </Stack>
            <Link href="/shop" className="link-underline" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--text-primary)', textDecoration: 'none' }}>VIEW ALL →</Link>
          </Stack>
        </motion.div>

        <Grid columns={{ minWidth: 280 }} gap={6}>
          {featured.map((product, index) => {
            const variant = product.variants[0];
            const img = variant.images.find(i => i.type === 'product');
            return (
              <motion.div key={product.id} {...stagger} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Link href={`/products/${product.slug}`} className="card-lift" style={{ display: 'block', textDecoration: 'none' }}>
                  <div className="img-hover" style={{ aspectRatio: '3/4', backgroundColor: 'var(--bg-elevated)', marginBottom: '1rem', overflow: 'hidden' }}>
                    <img src={img?.src || variant.images[0]?.src} alt={`Tomis ${variant.color} half-collar shirt flat lay product photo`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <Text type="label" color="secondary">{variant.color}</Text>
                  <Text type="body" weight="medium">{product.name}</Text>
                  <Text type="body">{formatPrice(variant.price)}</Text>
                </Link>
              </motion.div>
            );
          })}
        </Grid>
      </div>
    </Section>
  );
}
