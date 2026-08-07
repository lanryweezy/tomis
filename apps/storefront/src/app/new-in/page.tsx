'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Badge } from '@astryxdesign/core/Badge';
import { Stack } from '@astryxdesign/core/Stack';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { stagger } from '@/lib/animations';
import { products, formatPrice } from '@/data/products';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import '@astryxdesign/theme-neutral/theme.css';

export default function NewInPage() {
  const newProducts = products.slice(0, 6);

  return (
    <>
      <Theme theme={neutralTheme} mode="dark">
        <Section variant="section" style={{ padding: '5rem 0' }}>
          <Stack gap={3} align="center" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', textAlign: 'center' }}>
            <Badge label="Just Arrived" />
            <Text type="display-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 0.9 }}>NEW IN</Text>
            <Text type="body" color="secondary">The latest additions to the Tomis collection.</Text>
          </Stack>
        </Section>
      </Theme>

      <Section variant="section" className="section-spacing">
        <Stack style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
          <Grid columns={{ minWidth: 280 }} gap={6}>
            {newProducts.map((product, index) => {
              const variant = product.variants[0];
              const img = variant.images.find(i => i.type === 'product');
              return (
                <motion.div key={product.id} {...stagger} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <ClickableCard label={product.name}>
                      <Stack style={{ aspectRatio: '3/4', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden', position: 'relative', marginBottom: '1rem' }}>
                        <img src={img?.src || variant.images[0]?.src} alt={`${variant.color} ${product.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <Stack style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                          <Badge label="NEW" />
                        </Stack>
                      </Stack>
                      <Text type="label" color="secondary">{variant.color}</Text>
                      <Text type="body" weight="medium">{product.name}</Text>
                      <Text type="body">{formatPrice(variant.price)}</Text>
                    </ClickableCard>
                  </Link>
                </motion.div>
              );
            })}
          </Grid>
        </Stack>
      </Section>
    </>
  );
}
