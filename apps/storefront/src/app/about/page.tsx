'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Divider } from '@astryxdesign/core/Divider';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';

const values = [
  { title: 'The Half-Collar', description: 'Our signature design divides two worlds. One shirt. Two styles. Infinite confidence.' },
  { title: 'Made in Lagos', description: 'Every Tomis shirt is crafted in Lagos, Nigeria. Supporting local artisans and African manufacturing.' },
  { title: 'Premium Cotton', description: '140 GSM premium cotton. Breathable, durable, and designed to get better with every wash.' },
  { title: 'Everyday Versatility', description: 'From boardroom to brunch, airport to dinner. One shirt that works everywhere you go.' },
];

const milestones = [
  { year: '2024', event: 'The first Tomis half-collar shirt is designed in Lagos.' },
  { year: '2024', event: 'Prototype testing with 50 men across Lagos.' },
  { year: '2025', event: 'Tomis launches with 14 signature colourways.' },
  { year: '2025', event: 'The digital flagship store goes live.' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <TopNav>
        <TopNavHeading heading="TOMIS" headingHref="/" />
        <TopNavItem label="SHOP" href="/shop" />
        <TopNavItem label="NEW IN" href="/new-in" />
        <TopNavItem label="COLLECTIONS" href="/collections" />
        <TopNavItem label="ABOUT" href="/about" isSelected />
        <TopNavItem label="JOURNAL" href="/journal" />
      </TopNav>

      <main>
        <section style={{ height: '70vh', backgroundColor: 'var(--color-background-inverted)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
            <div style={{ width: '50%', backgroundColor: 'var(--color-brand-navy)' }} />
            <div style={{ width: '50%', backgroundColor: 'white' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center', width: '100%' }}>
            <motion.p
              style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '1rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Story
            </motion.p>
            <motion.h1
              className="font-display"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'white', lineHeight: 0.9, marginBottom: '1.5rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              TOMIS
            </motion.h1>
            <motion.p
              className="font-serif"
              style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', maxWidth: '32rem', margin: '0 auto' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              A global fashion brand born in Lagos.
            </motion.p>
          </div>
        </section>

        <Section style={{ padding: '6rem 0' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
            <Text type="label" color="secondary" style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.625rem', marginBottom: '1rem', display: 'block' }}>
              Our Philosophy
            </Text>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text-primary)', marginBottom: '2rem', lineHeight: 1.2 }}>
              THE WORLD IS FULL OF CHOICES.<br />YOUR CLOSET DOESN&apos;T HAVE TO BE.
            </h2>
            <Divider style={{ width: '4rem', margin: '0 auto 2rem' }} />
            <Text type="body" color="secondary" style={{ lineHeight: 1.7 }}>
              Tomis was born from a simple observation: modern men are overwhelmed by choice.
              They don&apos;t need more clothes. They need the right ones. Our signature half-collar shirt
              is the physical manifestation of that idea. Two fits. One shirt. One signature.
              One less decision every morning.
            </Text>
          </div>
        </Section>

        <Section style={{ padding: '6rem 0', backgroundColor: 'var(--color-background-surface)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <Text type="label" color="secondary" style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.625rem', marginBottom: '0.75rem', display: 'block' }}>
                What We Stand For
              </Text>
              <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', color: 'var(--color-text-primary)' }}>
                OUR VALUES
              </h2>
            </div>
            <Grid columns={4} gap={8}>
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--color-brand-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <span className="font-display" style={{ fontSize: '1.25rem' }}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <Text type="body" weight="medium" style={{ marginBottom: '0.5rem' }}>{value.title}</Text>
                  <Text type="supporting" color="secondary" style={{ lineHeight: 1.6 }}>{value.description}</Text>
                </motion.div>
              ))}
            </Grid>
          </div>
        </Section>

        <Section style={{ padding: '6rem 0', backgroundColor: 'var(--color-background-inverted)' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <Text type="label" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.625rem', marginBottom: '0.75rem', display: 'block' }}>
                The Journey
              </Text>
              <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', color: 'white' }}>
                FROM LAGOS TO THE WORLD
              </h2>
            </div>
            <Stack gap={8}>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-accent)', flexShrink: 0, width: '4rem' }}>
                    {milestone.year}
                  </span>
                  <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.2)', position: 'relative', paddingTop: '0.375rem' }}>
                    <div style={{ position: 'absolute', top: '-0.375rem', left: '-0.25rem', width: '0.625rem', height: '0.625rem', backgroundColor: 'var(--color-text-accent)', borderRadius: '50%' }} />
                  </div>
                  <Text type="body" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {milestone.event}
                  </Text>
                </motion.div>
              ))}
            </Stack>
          </div>
        </Section>

        <Section style={{ padding: '6rem 0' }}>
          <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
              EXPERIENCE TOMIS
            </h2>
            <Text type="body" color="secondary" style={{ marginBottom: '2rem' }}>
              Discover the shirt that changes the way you dress.
            </Text>
            <Link href="/shop">
              <Button label="SHOP THE COLLECTION" />
            </Link>
          </div>
        </Section>
      </main>

      <footer style={{ backgroundColor: 'var(--color-background-inverted)', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
        <Text type="supporting" style={{ color: 'rgba(255,255,255,0.3)' }}>
          &copy; {new Date().getFullYear()} Tomis. All rights reserved.
        </Text>
      </footer>
    </div>
  );
}
