'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Divider } from '@astryxdesign/core/Divider';
import { Badge } from '@astryxdesign/core/Badge';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Breadcrumbs, BreadcrumbItem } from '@astryxdesign/core/Breadcrumbs';
import { Collapsible } from '@astryxdesign/core/Collapsible';
import { products, getProductBySlug, formatPrice, getRelatedProducts } from '@/data/products';
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack gap={4} align="center">
          <h1 className="font-display" style={{ fontSize: '2.5rem' }}>Product Not Found</h1>
          <Link href="/shop"><Button label="BACK TO SHOP" /></Link>
        </Stack>
      </div>
    );
  }
  return <ProductPageContent product={product} />;
}
function ProductPageContent({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const variant = product.variants[selectedColor];
  const relatedProducts = getRelatedProducts(product.id);
  return (
    <div>
        <Section style={{ padding: '1rem 0' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
            <Breadcrumbs>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/shop">Shop</BreadcrumbItem>
              <BreadcrumbItem>{product.name}</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </Section>
        <Section style={{ padding: '2rem 0 4rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
            <Grid columns={2} gap={10} style={{ alignItems: 'start' }}>
              <div>
                <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-background-muted)', position: 'relative', overflow: 'hidden' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${selectedColor}-${activeImage}`}
                      src={variant.images[activeImage]?.src || '/images/products/black-front.jpg'}
                      alt={variant.images[activeImage]?.alt || product.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                </div>
                <Stack direction="horizontal" gap={2} style={{ marginTop: '0.75rem' }}>
                  {variant.images.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImage(index)}
                      style={{
                        width: '5rem',
                        height: '6rem',
                        border: activeImage === index ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                    >
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </Stack>
              </div>
              <Stack gap={6}>
                <div>
                  <Badge label={product.collection} />
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginTop: '0.5rem' }}>
                    {product.name}
                  </h1>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selectedColor}
                      style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {variant.color}
                    </motion.p>
                  </AnimatePresence>
                  <p style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-text-primary)', marginTop: '1rem' }}>
                    {formatPrice(variant.price)}
                  </p>
                  <Text type="body" color="secondary" style={{ marginTop: '1rem', lineHeight: 1.6 }}>
                    {product.shortDescription}
                  </Text>
                </div>
                <Divider />
                <div>
                  <Text type="label" color="secondary" style={{ marginBottom: '0.75rem', display: 'block' }}>
                    Colour: <span style={{ color: 'var(--color-text-primary)' }}>{variant.color}</span>
                  </Text>
                  <Stack direction="horizontal" gap={3}>
                    {product.variants.map((v, index) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedColor(index)}
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '50%',
                          border: selectedColor === index ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                          backgroundColor: v.colorCode,
                          transform: selectedColor === index ? 'scale(1.1)' : 'scale(1)',
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                        }}
                        aria-label={v.color}
                      />
                    ))}
                  </Stack>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <Text type="label" color="secondary">Size</Text>
                    <Link href="/support" style={{ fontSize: '0.75rem', color: 'var(--color-text-accent)', textDecoration: 'underline' }}>
                      Size Guide
                    </Link>
                  </div>
                  <Stack direction="horizontal" gap={2}>
                    {product.sizes.map(size => (
                      <button
                        key={size.value}
                        disabled={!size.inStock}
                        onClick={() => setSelectedSize(size.value)}
                        style={{
                          width: '3rem',
                          height: '3rem',
                          border: selectedSize === size.value
                            ? '1px solid var(--color-text-primary)'
                            : '1px solid var(--color-border)',
                          backgroundColor: selectedSize === size.value ? 'var(--color-text-primary)' : 'transparent',
                          color: selectedSize === size.value ? 'var(--color-background-surface)' : 'var(--color-text-primary)',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          cursor: size.inStock ? 'pointer' : 'not-allowed',
                          opacity: size.inStock ? 1 : 0.3,
                          textDecoration: size.inStock ? 'none' : 'line-through',
                        }}
                      >
                        {size.label}
                      </button>
                    ))}
                  </Stack>
                </div>
                <Stack direction="horizontal" gap={3}>
                  <Button label="ADD TO BAG" style={{ flex: 1 }} />
                  <Button label="BUY NOW" variant="secondary" style={{ flex: 1 }} />
                </Stack>
                <div style={{ backgroundColor: 'var(--color-background-muted)', padding: '1rem' }}>
                  <Stack gap={2}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                      <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg></span>
                      <span><strong>Lagos Delivery:</strong> 1–2 working days</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                      <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg></span>
                      <span><strong>Nationwide:</strong> 2–5 working days</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                      <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></span>
                      <span><strong>Returns:</strong> Free within 14 days</span>
                    </div>
                  </Stack>
                </div>
                <Divider />
                <Stack gap={0}>
                  <Collapsible
                    trigger={<Text type="body" weight="medium">Product Details</Text>}
                    defaultIsOpen={false}
                  >
                    <Stack gap={2} style={{ paddingTop: '0.5rem' }}>
                      <Text type="supporting" color="secondary"><strong>Fabric:</strong> {product.material}</Text>
                      <Text type="supporting" color="secondary"><strong>Weight:</strong> {product.fabricWeight}</Text>
                      <Text type="supporting" color="secondary"><strong>Fit:</strong> {product.fitDescription}</Text>
                      <Text type="supporting" color="secondary"><strong>Made in:</strong> {product.countryOfManufacture}</Text>
                    </Stack>
                  </Collapsible>
                  <Divider />
                  <Collapsible
                    trigger={<Text type="body" weight="medium">Care Instructions</Text>}
                    defaultIsOpen={false}
                  >
                    <ul style={{ paddingTop: '0.5rem', paddingLeft: '1rem' }}>
                      {product.careInstructions.map((instruction, i) => (
                        <li key={i}><Text type="supporting" color="secondary">{instruction}</Text></li>
                      ))}
                    </ul>
                  </Collapsible>
                  <Divider />
                  <Collapsible
                    trigger={<Text type="body" weight="medium">Shipping & Returns</Text>}
                    defaultIsOpen={false}
                  >
                    <Stack gap={2} style={{ paddingTop: '0.5rem' }}>
                      <Text type="supporting" color="secondary">{product.shippingInfo}</Text>
                      <Text type="supporting" color="secondary">{product.returnPolicy}</Text>
                    </Stack>
                  </Collapsible>
                </Stack>
              </Stack>
            </Grid>
          </div>
        </Section>
        <Section style={{ padding: '4rem 0', backgroundColor: 'var(--color-background-muted)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
            <Text type="label" color="secondary" style={{ textAlign: 'center', display: 'block', marginBottom: '3rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.625rem' }}>
              HOW TO WEAR IT
            </Text>
            <Grid columns={3} gap={6}>
              {['WORK', 'WEEKEND', 'EVENING'].map(look => (
                <ClickableCard key={look} label={look}>
                  <div style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-background-muted)', marginBottom: '0.75rem' }} />
                  <Text type="label" color="secondary">{look}</Text>
                </ClickableCard>
              ))}
            </Grid>
          </div>
        </Section>
        {relatedProducts.length > 0 && (
          <Section style={{ padding: '4rem 0' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
              <Text type="label" color="secondary" style={{ textAlign: 'center', display: 'block', marginBottom: '3rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.625rem' }}>
                YOU MAY ALSO LIKE
              </Text>
              <Grid columns={3} gap={6}>
                {relatedProducts.slice(0, 3).map(p => (
                  <Link key={p.id} href={`/products/${p.slug}`}>
                    <ClickableCard label={p.name}>
                      <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-background-muted)', marginBottom: '0.75rem' }} />
                      <Text type="label" color="secondary" style={{ letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.625rem' }}>
                        {p.variants[0].color}
                      </Text>
                      <Text type="body" weight="medium">{p.name}</Text>
                      <Text type="body" weight="medium">{formatPrice(p.variants[0].price)}</Text>
                    </ClickableCard>
                  </Link>
                ))}
              </Grid>
            </div>
          </Section>
        )}
    </div>
  );
}
