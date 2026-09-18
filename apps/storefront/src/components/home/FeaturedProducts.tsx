'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { fadeIn, stagger } from '@/lib/animations';
import { products, formatPrice } from '@/data/products';

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);
  return (
    <Section id="signature-edit" variant="transparent" className="section-spacing">
      <div className="container">
        <motion.div {...fadeIn}>
          <Stack direction="horizontal" gap={4} style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <Stack gap={2}>
              <span className="section-eyebrow">The edit · ₦28,000 each</span>
              <h2 className="section-title">ONE SHIRT.<br /><span style={{ color: 'var(--accent)' }}>FIVE MOODS.</span></h2>
              <Text type="supporting" color="secondary" style={{ maxWidth: '390px', lineHeight: 1.6 }}>The same signature half-collar silhouette, designed to be styled your way.</Text>
            </Stack>
            <Link href="/shop" className="btn-text">VIEW ALL {products.length} COLOURS →</Link>
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
                    <Image src={img?.src || variant.images[0]?.src} alt={`Tomis ${variant.color} half-collar shirt flat lay product photo`} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <Stack gap={1}>
                    <Text type="body" weight="medium" style={{ fontSize: '1.05rem' }}>{product.name}</Text>
                    <Text type="label" color="secondary">{variant.color} · SIGNATURE EDIT</Text>
                    <Text type="body" weight="medium" style={{ fontSize: '1.05rem', marginTop: '0.2rem' }}>{formatPrice(variant.price)}</Text>
                    <Text type="supporting" color="accent" style={{ marginTop: '0.25rem' }}>Choose colour →</Text>
                  </Stack>
                </Link>
              </motion.div>
            );
          })}
        </Grid>
      </div>
    </Section>
  );
}
