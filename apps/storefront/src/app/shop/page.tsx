'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Badge } from '@astryxdesign/core/Badge';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { products, formatPrice } from '@/data/products';

const allColors = [
  { name: 'All', slug: 'all' },
  { name: 'Black', slug: 'black' },
  { name: 'Navy', slug: 'navy' },
  { name: 'Olive', slug: 'olive' },
  { name: 'Pink', slug: 'pink' },
  { name: 'Brown', slug: 'brown' },
  { name: 'Terracotta', slug: 'terracotta' },
  { name: 'Lavender', slug: 'lavender' },
  { name: 'Sage', slug: 'sage' },
  { name: 'Stone', slug: 'stone' },
  { name: 'Cream', slug: 'cream' },
  { name: 'Sand', slug: 'sand' },
  { name: 'Burgundy', slug: 'burgundy' },
  { name: 'Sky Blue', slug: 'sky' },
];

function ProductCard({ product }: { product: typeof products[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const variant = product.variants[0];
  const productImage = variant.images.find(i => i.type === 'product');
  const modelImage = variant.images.find(i => i.type === 'model');

  return (
    <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
      <ClickableCard
        label={product.name}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="card-lift"
      >
        <div className="img-hover" style={{ aspectRatio: '3/4', backgroundColor: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
          <motion.img
            src={isHovered && modelImage ? modelImage.src : (productImage?.src || variant.images[0]?.src)}
            alt={isHovered && modelImage ? modelImage.alt : (productImage?.alt || variant.images[0]?.alt)}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          {product.tags.includes('best-seller') && (
            <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
              <Badge label="BEST SELLER" />
            </div>
          )}
        </div>
        <Stack gap={1} style={{ marginTop: '0.75rem' }}>
          <Text type="label" color="secondary">{variant.color}</Text>
          <Text type="body" weight="medium">{product.name}</Text>
          <Text type="body">{formatPrice(variant.price)}</Text>
        </Stack>
      </ClickableCard>
    </Link>
  );
}

export default function ShopPage() {
  const [selectedColor, setSelectedColor] = useState('all');
  const filteredProducts = products.filter(p => {
    if (selectedColor === 'all') return true;
    return p.variants.some(v => v.colorSlug === selectedColor);
  });

  return (
    <div>
      <Section style={{ padding: '5rem 0', backgroundColor: 'var(--inverted)', color: 'var(--inverted-text)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', textAlign: 'center' }}>
          <Badge label="The Collection" />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 0.9, marginTop: '0.75rem' }}>HALF-COLLAR SHIRTS</h1>
          <Text type="body" style={{ color: 'var(--inverted-text-muted)', marginTop: '0.5rem' }}>{products.length} shirts. One signature. Endless possibilities.</Text>
        </div>
      </Section>

      <Section style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
          <Stack direction="horizontal" gap={4} style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <Text type="body" color="secondary">{filteredProducts.length} products</Text>
          </Stack>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <aside style={{ width: '12rem', flexShrink: 0 }}>
              <Text type="label" color="secondary" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.625rem', marginBottom: '1rem', display: 'block' }}>Colour</Text>
              <Stack gap={2}>
                {allColors.map(color => (
                  <button key={color.slug} onClick={() => setSelectedColor(color.slug)} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: selectedColor === color.slug ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: selectedColor === color.slug ? 500 : 400, transition: 'color 0.2s' }}>
                    {color.name}
                  </button>
                ))}
              </Stack>
            </aside>

            <div style={{ flex: 1 }}>
              <Grid columns={{ minWidth: 280 }} gap={6}>
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
