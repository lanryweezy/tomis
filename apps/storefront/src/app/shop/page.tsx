'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Badge } from '@astryxdesign/core/Badge';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { products, formatPrice, getUniqueColors } from '@/data/products';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import '@astryxdesign/theme-neutral/theme.css';

const allColors = [
  { name: 'All', slug: 'all' },
  ...getUniqueColors().map(color => ({ name: color.name, slug: color.slug })),
];

const collectionColorSlugs: Record<string, string[]> = {
  essentials: ['black', 'navy', 'cream'],
  'earth-tones': ['olive', 'brown', 'terracotta', 'sage', 'sand'],
  bold: ['pink', 'lavender', 'burgundy', 'sky'],
};

function ProductCard({ product }: { product: typeof products[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const variant = product.variants[0];
  const productImage = variant.images.find(i => i.type === 'product');
  const modelImage = variant.images.find(i => i.type === 'model');

  return (
    <Link href={`/products/${product.slug}`} className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-4" style={{ textDecoration: 'none' }}>
      <ClickableCard
        label={product.name}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="card-lift"
      >
        <Stack direction="vertical" style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={isHovered && modelImage ? modelImage.src : (productImage?.src || variant.images[0]?.src)}
              alt={isHovered && modelImage ? modelImage.alt : (productImage?.alt || variant.images[0]?.alt)}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
          {product.tags.includes('best-seller') && (
            <Stack style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
              <Badge label="BEST SELLER" />
            </Stack>
          )}
        </Stack>
        <Stack gap={1} style={{ marginTop: '0.75rem' }}>
          <Text type="label" color="secondary">{variant.color}</Text>
          <Text type="body" weight="medium">{product.name}</Text>
          <Text type="body">{formatPrice(variant.price)}</Text>
          <Text type="supporting" color="accent" style={{ marginTop: '0.25rem' }}>View details →</Text>
        </Stack>
      </ClickableCard>
    </Link>
  );
}

function ShopPageContent() {
  const searchParams = useSearchParams();
  const collection = searchParams.get('collection');
  const queryColor = searchParams.get('color') || (collection && !collectionColorSlugs[collection] ? collection : null);
  const initialColor = queryColor && allColors.some(color => color.slug === queryColor) ? queryColor : 'all';
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const activeCollection = collection && collectionColorSlugs[collection] ? collection : null;
  const filteredProducts = products.filter(p => {
    const matchesColor = selectedColor === 'all' || p.variants.some(v => v.colorSlug === selectedColor);
    const collectionSlugs = collection ? collectionColorSlugs[collection] : undefined;
    const matchesCollection = !collectionSlugs || p.variants.some(v => collectionSlugs.includes(v.colorSlug));
    return matchesColor && matchesCollection;
  });

  return (
    <>
      <Theme theme={neutralTheme} mode="dark">
        <Section variant="section" style={{ padding: '5rem 0' }}>
          <Stack gap={3} align="center" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', textAlign: 'center' }}>
            <Badge label="The Collection" />
            <Text type="display-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 0.9 }}>HALF-COLLAR SHIRTS</Text>
            <Text type="body" color="secondary">{products.length} colours. One signature shirt. Endless possibilities.</Text>
          </Stack>
        </Section>
      </Theme>

      <Section variant="section" style={{ padding: '3rem 0' }}>
        <Stack gap={6} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
          <Stack direction="horizontal" gap={4} style={{ justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <Stack direction="horizontal" gap={3} style={{ alignItems: 'center' }}>
              <Text type="body" color="secondary">{filteredProducts.length} {filteredProducts.length === 1 ? 'colour' : 'colours'} shown</Text>
              {activeCollection && <Badge label={`${activeCollection.replace('-', ' ')} edit`} />}
              {selectedColor !== 'all' && <Badge label={`${allColors.find(color => color.slug === selectedColor)?.name || selectedColor} selected`} />}
            </Stack>
          </Stack>

          <div className="shop-mobile-filter">
            <label htmlFor="shop-colour-filter" style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Filter by colour</label>
            <select id="shop-colour-filter" value={selectedColor} onChange={event => setSelectedColor(event.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-strong)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
              {allColors.map(color => <option key={color.slug} value={color.slug}>{color.name}</option>)}
            </select>
          </div>

          <Stack direction="horizontal" gap={8} align="start" className="shop-results-layout">
            <Stack as="aside" gap={4} className="shop-filter-sidebar" style={{ width: '12rem', flexShrink: 0 }}>
              <Text type="label" color="secondary" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Colour</Text>
              <Stack gap={2}>
                {allColors.map(color => (
                  <button key={color.slug} onClick={() => setSelectedColor(color.slug)} aria-pressed={selectedColor === color.slug} aria-label={`Filter by ${color.name}`} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: selectedColor === color.slug ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: selectedColor === color.slug ? 500 : 400, transition: 'color 0.2s' }}>
                    {color.name}
                  </button>
                ))}
              </Stack>
            </Stack>

            {filteredProducts.length > 0 ? (
              <Grid columns={{ minWidth: 280 }} gap={6} style={{ flex: 1 }}>
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </Grid>
            ) : (
              <div style={{ flex: 1, padding: '4rem 1rem', textAlign: 'center', border: '1px solid var(--border)' }}>
                <Text type="body" weight="medium">No colours match this filter.</Text>
                <Text type="supporting" color="secondary" style={{ display: 'block', marginTop: '0.5rem' }}>Try another colour or view the full signature collection.</Text>
                <button type="button" onClick={() => setSelectedColor('all')} style={{ marginTop: '1.5rem', border: '1px solid var(--border-strong)', background: 'transparent', padding: '0.75rem 1rem', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.12em', fontWeight: 600 }}>VIEW ALL COLOURS</button>
              </div>
            )}
          </Stack>
        </Stack>
      </Section>
    </>
  );
}

export default function ShopPage() {
  return <Suspense fallback={<div style={{ minHeight: '50vh' }} />}><ShopPageContent /></Suspense>;
}
