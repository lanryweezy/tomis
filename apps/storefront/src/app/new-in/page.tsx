'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Badge } from '@astryxdesign/core/Badge';
import { Stack } from '@astryxdesign/core/Stack';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { fadeIn, stagger } from '@/lib/animations';
import { products, formatPrice } from '@/data/products';

export default function NewInPage() {
  const newProducts = products.slice(0, 6);

  return (
    <div>
      <Section variant="transparent" style={{ padding: '5rem 0', backgroundColor: 'var(--inverted)', color: 'var(--inverted-text)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: 'var(--accent)' }}>Just Arrived</span>
          <h1 className="section-title" style={{ color: 'white' }}>NEW IN</h1>
          <Text type="body" style={{ color: 'var(--inverted-text-muted)' }}>The latest additions to the Tomis collection.</Text>
        </div>
      </Section>

      <Section variant="transparent" className="section-spacing">
        <div className="container">
          <Grid columns={{ minWidth: 280 }} gap={6}>
            {newProducts.map((product, index) => {
              const variant = product.variants[0];
              const img = variant.images.find(i => i.type === 'product');
              return (
                <motion.div key={product.id} {...stagger} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <ClickableCard label={product.name}>
                      <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden', position: 'relative', marginBottom: '1rem' }}>
                        <img src={img?.src || variant.images[0]?.src} alt={`${variant.color} ${product.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                          <Badge label="NEW" />
                        </div>
                      </div>
                      <Text type="label" color="secondary">{variant.color}</Text>
                      <Text type="body" weight="medium">{product.name}</Text>
                      <Text type="body">{formatPrice(variant.price)}</Text>
                    </ClickableCard>
                  </Link>
                </motion.div>
              );
            })}
          </Grid>
        </div>
      </Section>
    </div>
  );
}
