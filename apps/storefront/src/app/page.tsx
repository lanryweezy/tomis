'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid, GridSpan } from '@astryxdesign/core/Grid';
import { Divider } from '@astryxdesign/core/Divider';
import { Badge } from '@astryxdesign/core/Badge';
import { Link as AstryxLink } from '@astryxdesign/core/Link';
import { TopNav, TopNavHeading, TopNavItem, TopNavMegaMenu, TopNavMegaMenuItem } from '@astryxdesign/core/TopNav';
import { MobileNav } from '@astryxdesign/core/MobileNav';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Theme } from '@astryxdesign/core/theme';
import { Thumbnail } from '@astryxdesign/core/Thumbnail';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Card } from '@astryxdesign/core/Card';
import { Overlay } from '@astryxdesign/core/Overlay';
import { products, formatPrice } from '@/data/products';

const heroProducts = products.slice(0, 4);

const timeOfDay = [
  { time: '08:00', label: 'The Office', description: 'From boardroom to brainstorm.', image: '/images/lifestyle/white-executive.jpg' },
  { time: '13:00', label: 'Lunch', description: 'The midday break, dressed right.', image: '/images/lifestyle/olive-cafe.jpg' },
  { time: '18:00', label: 'After Work', description: 'From desk to dinner.', image: '/images/lifestyle/tan-waterfront.jpg' },
  { time: '21:00', label: 'Dinner', description: 'Evening elegance, effortless.', image: '/images/lifestyle/black-office.jpg' },
  { time: 'Sunday', label: 'Leisure', description: 'Weekend ease, Tomis style.', image: '/images/lifestyle/olive-interior.jpg' },
];

function TomisNav() {
  return (
    <TopNav>
      <TopNavHeading>
        <Link href="/" className="flex items-center">
          <img src="/images/brand/wordmark.svg" alt="TOMIS" className="h-5" />
        </Link>
      </TopNavHeading>
      <TopNavItem label="SHOP" href="/shop" />
      <TopNavItem label="NEW IN" href="/new-in" />
      <TopNavMegaMenu
        label="COLLECTIONS"
        items={
          <>
            <TopNavMegaMenuItem href="/shop" title="Half-Collar Shirts" description="Best sellers and new arrivals" />
            <TopNavMegaMenuItem href="/shop" title="Shop by Colour" description="Find your signature look" />
            <TopNavMegaMenuItem href="/collections" title="All Collections" description="Browse everything" />
          </>
        }
      />
      <TopNavItem label="ABOUT" href="/about" />
      <TopNavItem label="JOURNAL" href="/journal" />
    </TopNav>
  );
}

function SplitScreenHero() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero-black-rooftop.jpg"
          alt="Tomis Half-Collar Shirt on Lagos rooftop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(11,31,94,0.85) 0%, rgba(11,31,94,0.4) 50%, transparent 100%)' }} />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center" style={{ padding: '0 3rem', maxWidth: '80rem', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Text type="large" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
            The Signature Collection
          </Text>
          <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginTop: '1rem', color: 'white' }}>
            HALF THE COLLAR.
          </h1>
          <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
            ALL THE CHARACTER.
          </h1>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Text type="body" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '28rem', margin: '0 auto 2rem' }}>
          The signature Tomis half-collar shirt. Designed to move effortlessly between work, leisure and everything in between.
        </Text>
        <Stack direction="horizontal" gap={3} style={{ justifyContent: 'center' }}>
          <Link href="/shop">
            <Button label="SHOP THE SIGNATURE" />
          </Link>
          <Link href="/about">
            <Button label="DISCOVER TOMIS" variant="secondary" />
          </Link>
        </Stack>
      </motion.div>
    </section>
  );
}

function InteractiveHalfMoment() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
        <div style={{ flex: 1, backgroundColor: 'var(--color-background-inverted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '2rem' }}>
          <span className="font-display text-white" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', whiteSpace: 'nowrap' }}>
            TWO COLOURS.
          </span>
        </div>
        <div style={{ flex: 1, backgroundColor: 'var(--color-background-surface)', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '2rem' }}>
          <span className="font-display" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', whiteSpace: 'nowrap', color: 'var(--color-text-primary)' }}>
            ONE IDENTITY.
          </span>
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          THE HALF-COLLAR.
        </h2>
        <Text type="label" color="secondary">Tomis Signature</Text>
      </div>
    </section>
  );
}

function SignatureProduct() {
  const [selectedColor, setSelectedColor] = useState(0);
  const colors = [
    { name: 'Black', code: '#101114', accent: '#FFFFFF' },
    { name: 'Navy', code: '#0B1F5E', accent: '#FFFFFF' },
    { name: 'Olive', code: '#7A8065', accent: '#C4B8A8' },
    { name: 'Pink', code: '#D4A5A5', accent: '#FFFFFF' },
    { name: 'Brown', code: '#8B6F47', accent: '#F5F0E8' },
  ];

  return (
    <Section style={{ padding: '6rem 0', backgroundColor: 'var(--color-background-surface)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Text type="label" color="secondary">The Tomis Signature</Text>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-text-primary)', margin: '0.75rem 0' }}>
            THE HALF-COLLAR SHIRT
          </h2>
          <Text type="body" color="secondary" style={{ maxWidth: '32rem', margin: '0 auto' }}>
            A silhouette designed to make everyday dressing effortless.
          </Text>
        </div>

        <Grid columns={2} gap={8} style={{ alignItems: 'center' }}>
          <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-background-muted)', position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor}
                style={{ position: 'absolute', inset: 0, display: 'flex' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ width: '50%', backgroundColor: colors[selectedColor].code }} />
                <div style={{ width: '50%', backgroundColor: colors[selectedColor].accent }} />
              </motion.div>
            </AnimatePresence>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-display text-white" style={{ fontSize: '2.5rem', mixBlendMode: 'difference' }}>TOMIS</span>
            </div>
          </div>

          <Stack gap={6}>
            <div>
              <Text type="label" color="secondary">Half-Collar Shirt</Text>
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedColor}
                  style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-text-primary)', margin: '0.5rem 0' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {colors[selectedColor].name}
                </motion.p>
              </AnimatePresence>
              <p style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                {formatPrice(35000)}
              </p>
            </div>

            <div>
              <Text type="label" color="secondary" style={{ marginBottom: '0.75rem', display: 'block' }}>Colour</Text>
              <Stack direction="horizontal" gap={3}>
                {colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(index)}
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      border: selectedColor === index ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                      background: `linear-gradient(135deg, ${color.code} 50%, ${color.accent} 50%)`,
                      transform: selectedColor === index ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                    }}
                    aria-label={color.name}
                  />
                ))}
              </Stack>
            </div>

            <div>
              <Text type="label" color="secondary" style={{ marginBottom: '0.75rem', display: 'block' }}>Size</Text>
              <Stack direction="horizontal" gap={2}>
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      border: '1px solid var(--color-border)',
                      background: 'transparent',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </Stack>
              <AstryxLink href="/support" style={{ fontSize: '0.75rem', marginTop: '0.5rem', display: 'inline-block' }}>
                Size Guide
              </AstryxLink>
            </div>

            <Stack direction="horizontal" gap={3}>
              <Button label="ADD TO BAG" style={{ flex: 1 }} />
              <Button label="BUY NOW" variant="secondary" style={{ flex: 1 }} />
            </Stack>

            <Divider />

            <Stack gap={3}>
              {[
                { label: 'Fabric', value: '100% Premium Cotton' },
                { label: 'Fit', value: 'Relaxed. True to size.' },
                { label: 'Made in', value: 'Lagos, Nigeria' },
                { label: 'Delivery', value: 'Lagos 1–2 days' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <Text type="supporting" color="secondary">{item.label}</Text>
                  <Text type="body">{item.value}</Text>
                </div>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </div>
    </Section>
  );
}

function ManyLives() {
  return (
    <Section style={{ padding: '6rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Text type="label" color="secondary">One Shirt. Many Lives.</Text>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-text-primary)' }}>
            ONE SHIRT.<br />MORE PLACES THAN YOU EXPECTED.
          </h2>
        </div>

        <Grid columns={5} gap={4}>
          {timeOfDay.map((item) => (
            <ClickableCard key={item.time} label={item.label} style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
              <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem' }}>
                <Text type="label" style={{ color: "white", letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.625rem' }}>
                  {item.time}
                </Text>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: 'white', margin: '0.25rem 0' }}>
                  {item.label}
                </h3>
                <Text type="supporting" style={{ color: "white", fontSize: '0.75rem' }}>
                  {item.description}
                </Text>
              </div>
            </ClickableCard>
          ))}
        </Grid>
      </div>
    </Section>
  );
}

function ShopByColour() {
  const colors = [
    { name: 'BLACK', subtitle: 'The Essential', code: '#101114' },
    { name: 'NAVY', subtitle: 'The Classic', code: '#0B1F5E' },
    { name: 'OLIVE', subtitle: 'The Natural', code: '#7A8065' },
    { name: 'PINK', subtitle: 'The Unexpected', code: '#D4A5A5' },
    { name: 'BROWN', subtitle: 'The Warmth', code: '#8B6F47' },
  ];

  return (
    <Section style={{ padding: '6rem 0', backgroundColor: 'var(--color-background-surface)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Text type="label" color="secondary">Shop by Colour</Text>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-text-primary)' }}>
            CHOOSE YOUR MOOD.
          </h2>
        </div>

        <Grid columns={5} gap={4}>
          {colors.map((color) => (
            <Link key={color.name} href="/shop">
              <ClickableCard label={color.name} style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: color.code }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <h3 className="font-display text-white" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
                    {color.name}
                  </h3>
                  <Text type="label" style={{ color: "white", letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.625rem' }}>
                    {color.subtitle}
                  </Text>
                </div>
              </ClickableCard>
            </Link>
          ))}
        </Grid>
      </div>
    </Section>
  );
}

function TomisUniform() {
  return (
    <Section style={{ padding: '6rem 0', backgroundColor: 'var(--color-background-inverted)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <Grid columns={2} gap={10} style={{ alignItems: 'center' }}>
          <Stack gap={6}>
            <Text type="label" style={{ color: "white", letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.5, fontSize: '0.625rem' }}>
              The Tomis Uniform
            </Text>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 0.95 }}>
              FIND YOUR<br />TOMIS.
            </h2>
            <Text type="body" style={{ color: "white", maxWidth: '28rem', opacity: 0.6, lineHeight: 1.6 }}>
              Some people have one. Some have five. Some never leave home without it. You don&apos;t need hundreds of clothes. You need the right ones.
            </Text>
            <Link href="/shop">
              <Button label="EXPLORE THE COLLECTION" variant="secondary" />
            </Link>
          </Stack>

          <Grid columns={2} gap={4}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ aspectRatio: '3/4', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text type="label" style={{ color: "white", opacity: 0.2 }}>DAY {i}</Text>
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </Section>
  );
}

function EditorialSection() {
  return (
    <Section style={{ padding: '6rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Text type="label" color="secondary">The Lookbook</Text>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-text-primary)' }}>
            TOMIS JOURNAL
          </h2>
        </div>

        <Grid columns={3} gap={6}>
          {[
            { issue: 'ISSUE 01', title: 'LAGOS / 07:32', subtitle: 'Morning light, evening style.' },
            { issue: 'ISSUE 02', title: 'THE WORKDAY', subtitle: 'From first meeting to last email.' },
            { issue: 'ISSUE 03', title: 'AFTER HOURS', subtitle: 'When the day gets interesting.' },
          ].map(item => (
            <Link key={item.issue} href="/journal">
              <ClickableCard label={item.title}>
                <div style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-background-muted)', marginBottom: '1rem' }} />
                <Text type="label" color="accent">{item.issue}</Text>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--color-text-primary)', margin: '0.25rem 0' }}>
                  {item.title}
                </h3>
                <Text type="supporting" color="secondary">{item.subtitle}</Text>
              </ClickableCard>
            </Link>
          ))}
        </Grid>
      </div>
    </Section>
  );
}

function BrandStatement() {
  return (
    <Section style={{ padding: '8rem 0' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
        <p className="font-serif" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-text-primary)', lineHeight: 1.3, fontStyle: 'italic' }}>
          &ldquo;The world is full of choices. Your closet doesn&apos;t have to be.&rdquo;
        </p>
        <Divider style={{ width: '4rem', margin: '2rem auto' }} />
        <Text type="label" color="secondary">The Tomis Philosophy</Text>
      </div>
    </Section>
  );
}

function TomisFooter() {
  return (
    <footer style={{ backgroundColor: 'var(--color-background-inverted)', color: 'white', padding: '4rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <Grid columns={4} gap={10}>
          <Stack gap={4}>
            <img src="/images/brand/logo-light.svg" alt="TOMIS" style={{ height: '1.5rem' }} />
            <Text type="body" style={{ color: "white", opacity: 0.5, maxWidth: '16rem', lineHeight: 1.6 }}>
              The signature half-collar shirt. Designed for the life you actually live.
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text type="label" style={{ color: "white", letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Shop</Text>
            {['Half-Collar Shirts', 'New Arrivals', 'Best Sellers', 'All Products'].map(item => (
              <AstryxLink key={item} href="/shop" style={{ color: "white", opacity: 0.5 }}>{item}</AstryxLink>
            ))}
          </Stack>

          <Stack gap={4}>
            <Text type="label" style={{ color: "white", letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Company</Text>
            {['Our Story', 'Journal', 'Careers', 'Sustainability'].map(item => (
              <AstryxLink key={item} href="/about" style={{ color: "white", opacity: 0.5 }}>{item}</AstryxLink>
            ))}
          </Stack>

          <Stack gap={4}>
            <Text type="label" style={{ color: "white", letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.625rem' }}>Support</Text>
            {['Contact Us', 'FAQ', 'Shipping & Delivery', 'Returns & Exchanges', 'Size Guide'].map(item => (
              <AstryxLink key={item} href="/support" style={{ color: "white", opacity: 0.5 }}>{item}</AstryxLink>
            ))}
          </Stack>
        </Grid>

        <Divider style={{ margin: '3rem 0', borderColor: 'rgba(255,255,255,0.1)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text type="supporting" style={{ color: "white", opacity: 0.3 }}>
            &copy; {new Date().getFullYear()} Tomis. All rights reserved.
          </Text>
          <Stack direction="horizontal" gap={6}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <AstryxLink key={item} href="/legal" style={{ color: "white", opacity: 0.3, fontSize: '0.75rem' }}>{item}</AstryxLink>
            ))}
          </Stack>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <TomisNav />
      <main>
        <SplitScreenHero />
        <InteractiveHalfMoment />
        <SignatureProduct />
        <ManyLives />
        <ShopByColour />
        <TomisUniform />
        <EditorialSection />
        <BrandStatement />
      </main>
      <TomisFooter />
    </div>
  );
}
