'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
import { useCart } from '@/hooks/useCart';

function ProductPageContent({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  const { addItem } = useCart();
  const variant = product.variants[selectedColor];

  const addCurrentItem = () => {
    if (!selectedSize) {
      setCartMessage('Choose a size before adding this shirt to your bag.');
      return false;
    }
    addItem({
      variantId: variant.id,
      productId: product.id,
      name: product.name,
      color: variant.color,
      colorCode: variant.colorCode,
      size: selectedSize,
      price: variant.price,
      quantity: 1,
      image: variant.images[0]?.src || '',
    });
    setCartMessage(`${variant.color} / ${selectedSize} added to your bag.`);
    return true;
  };
  const relatedProducts = getRelatedProducts(product.id);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    brand: { '@type': 'Brand', name: 'TOMIS' },
    sku: variant.sku,
    image: variant.images.map(i => `https://tomis.fit${i.src}`),
    offers: {
      '@type': 'Offer',
      price: variant.price,
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
      url: `https://tomis.fit/products/${product.slug}`,
      itemCondition: 'https://schema.org/NewCondition',
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
              <div style={{ position: 'sticky', top: '2rem' }}>
                <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-background-muted)', overflow: 'hidden', position: 'relative' }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={`${variant.id}-${activeImage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', inset: 0 }}>
                      <Image src={variant.images[activeImage]?.src} alt={variant.images[activeImage]?.alt || `${variant.color} ${product.name}`} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority={activeImage === 0} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                {variant.images.length > 1 && (
                  <Stack direction="horizontal" gap={2} style={{ marginTop: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {variant.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        aria-label={`View image ${index + 1}`}
                        aria-pressed={activeImage === index}
                        style={{
                          width: '4rem',
                          height: '5rem',
                          border: activeImage === index ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                          padding: 0,
                          cursor: 'pointer',
                          backgroundColor: 'var(--color-background-muted)',
                          position: 'relative',
                        }}
                      >
                        <Image src={image.src} alt={image.alt} fill sizes="4rem" style={{ objectFit: 'cover' }} />
                      </button>
                    ))}
                  </Stack>
                )}
              </div>
              <Stack gap={6}>
                <div>
                  <Badge label="Signature half-collar" />
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.05, marginTop: '0.75rem' }}>
                    {product.name}
                  </h1>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={variant.id}
                      style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}
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
                  <Stack direction="horizontal" gap={3} style={{ flexWrap: 'wrap', marginTop: '1rem' }}>
                    <Text type="supporting" color="secondary">100% premium cotton</Text>
                    <Text type="supporting" color="secondary">{product.fabricWeight}</Text>
                    <Text type="supporting" color="secondary">Made in Lagos</Text>
                  </Stack>
                </div>
                <Divider />
                <div style={{ padding: '0.85rem 1rem', backgroundColor: 'var(--color-background-muted)', borderLeft: '3px solid var(--color-brand-blue)' }}>
                  <Text type="supporting" color="secondary">One relaxed-fit silhouette, available in {product.variants.length} signature colours. Choose your colour, then your size.</Text>
                </div>
                <div role="group" aria-labelledby="product-colour-label">
                  <Text id="product-colour-label" type="label" color="secondary" style={{ marginBottom: '0.75rem', display: 'block' }}>
                    Colour: <span style={{ color: 'var(--color-text-primary)' }}>{variant.color}</span>
                  </Text>
                  <Stack direction="horizontal" gap={3}>
                    {product.variants.map((v, index) => (
                      <button
                        key={v.id}
                        onClick={() => { setSelectedColor(index); setSelectedSize(null); setActiveImage(0); setCartMessage(null); }}
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
                        className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-2"
                        aria-label={v.color}
                        aria-pressed={selectedColor === index}
                      />
                    ))}
                  </Stack>
                </div>
                <div role="group" aria-labelledby="product-size-label">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <Text id="product-size-label" type="label" color="secondary">Size</Text>
                    <Link href="/size-guide" className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-2" style={{ fontSize: '0.75rem', color: 'var(--color-text-accent)', textDecoration: 'underline' }}>
                      Size Guide
                    </Link>
                  </div>
                  <Stack direction="horizontal" gap={2}>
                    {product.sizes.map(size => (
                      <button
                        key={size.value}
                        disabled={!size.inStock}
                        title={!size.inStock ? "Out of stock" : undefined}
                        aria-label={`${size.label}${!size.inStock ? ' (Out of stock)' : ''}`}
                        onClick={() => setSelectedSize(size.value)}
                        aria-pressed={selectedSize === size.value}
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
                        className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-2"
                      >
                        {size.label}
                      </button>
                    ))}
                  </Stack>
                </div>
                <Stack direction="horizontal" gap={3} className="pdp-actions">
                  <button type="button" onClick={addCurrentItem} className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-2" style={{ flex: 1, minHeight: '3.25rem', border: 'none', backgroundColor: 'var(--color-brand-blue)', color: 'white', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600 }}>ADD TO BAG</button>
                  <button type="button" onClick={() => { if (addCurrentItem()) window.location.href = '/checkout'; }} className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-2" style={{ flex: 1, minHeight: '3.25rem', border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-text-primary)', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600 }}>BUY NOW</button>
                </Stack>
                <p aria-live="polite" style={{ minHeight: '1.5rem', fontSize: '0.875rem', color: cartMessage?.includes('added') ? 'var(--color-brand-blue)' : 'var(--color-text-secondary)' }}>{cartMessage}</p>
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
        <Section style={{ padding: '3rem 0', backgroundColor: 'var(--color-background-muted)' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
            <Text type="label" color="secondary" style={{ display: 'block', marginBottom: '1rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.625rem' }}>STYLE NOTES</Text>
            <Text type="body" color="secondary" style={{ lineHeight: 1.7 }}>Keep the half-collar shirt crisp with tailored trousers, relaxed denim, or layered under a lightweight jacket. The silhouette is designed to move between everyday settings without overthinking the outfit.</Text>
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
                          <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-background-muted)', marginBottom: '0.75rem', position: 'relative', overflow: 'hidden' }}><Image src={p.variants[0].images[0]?.src} alt={`${p.variants[0].color} ${p.name}`} fill sizes="(max-width: 900px) 33vw, 25vw" style={{ objectFit: 'cover' }} /></div>
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
