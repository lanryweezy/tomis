'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Divider } from '@astryxdesign/core/Divider';
import { Badge } from '@astryxdesign/core/Badge';
import { Center } from '@astryxdesign/core/Center';

const values = [
  { title: 'The Half-Collar', description: 'Our signature mandarin collar design delivers clean lines and modern confidence. One silhouette, infinite possibilities.' },
  { title: 'Made in Lagos', description: 'Every Tomis shirt is crafted in Lagos, Nigeria. Supporting local artisans and African manufacturing.' },
  { title: 'Premium Cotton', description: '140 GSM premium cotton. Breathable, durable, and designed to get better with every wash.' },
  { title: 'Everyday Versatility', description: 'From boardroom to brunch, airport to dinner. One shirt that works everywhere you go.' },
];

const milestones = [
  { year: '2024', event: 'The first Tomis half-collar shirt is designed in Lagos.' },
  { year: '2024', event: 'Prototype testing with 50 men across Lagos.' },
  { year: '2025', event: 'Tomis launches with 14 signature colours.' },
  { year: '2025', event: 'The digital flagship store goes live.' },
];

export default function AboutPage() {
  return (
    <div>
      <Section style={{ height: '70vh', backgroundColor: 'var(--inverted)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          <div style={{ width: '50%', backgroundColor: 'var(--navy)' }} />
          <div style={{ width: '50%', backgroundColor: 'var(--bg)' }} />
        </div>
        <Center style={{ position: 'relative', zIndex: 10 }}>
          <Stack gap={4} style={{ textAlign: 'center' }}>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <Badge label="Our Story" />
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, color: 'var(--inverted-text)' }}>
              TOMIS
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="font-serif" style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--inverted-text)', opacity: 0.7 }}>
              A global fashion brand born in Lagos.
            </motion.p>
          </Stack>
        </Center>
      </Section>

      <Section style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
        <Center style={{ maxWidth: '48rem', padding: '0 1rem' }}>
          <Stack gap={6} style={{ textAlign: 'center' }}>
            <Badge label="Our Philosophy" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2 }}>
              THE WORLD IS FULL OF CHOICES.<br />YOUR CLOSET DOESN&apos;T HAVE TO BE.
            </h2>
            <Divider style={{ width: '4rem', margin: '0 auto' }} />
            <Text type="body" color="secondary" style={{ lineHeight: 1.7, maxWidth: '40rem' }}>
              Tomis was born from a simple observation: modern men are overwhelmed by choice. They don&apos;t need more clothes. They need the right ones. Our signature half-collar shirt is the physical manifestation of that idea. One shirt. One signature. One less decision every morning.
            </Text>
          </Stack>
        </Center>
      </Section>

      <Section style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', backgroundColor: 'var(--bg-elevated)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Badge label="What We Stand For" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3rem)', lineHeight: 0.9 }}>OUR VALUES</h2>
          </div>
          <Grid columns={4} gap={8}>
            {values.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Stack gap={3}>
                  <div style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <Text type="body" weight="medium">{value.title}</Text>
                  <Text type="supporting" color="secondary" style={{ lineHeight: 1.6 }}>{value.description}</Text>
                </Stack>
              </motion.div>
            ))}
          </Grid>
        </div>
      </Section>

      <Section style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', backgroundColor: 'var(--inverted)', color: 'var(--inverted-text)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Badge label="The Journey" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3rem)', lineHeight: 0.9 }}>FROM LAGOS TO THE WORLD</h2>
          </div>
          <Stack gap={8}>
            {milestones.map((milestone, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Stack direction="horizontal" gap={4} style={{ alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--accent)', flexShrink: 0, width: '4rem' }}>{milestone.year}</span>
                  <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.2)', paddingTop: '0.375rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-0.375rem', left: '-0.25rem', width: '0.625rem', height: '0.625rem', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
                  </div>
                  <Text type="body" style={{ color: 'var(--inverted-text)', opacity: 0.7, lineHeight: 1.6 }}>{milestone.event}</Text>
                </Stack>
              </motion.div>
            ))}
          </Stack>
        </div>
      </Section>

      <Section style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
        <Center style={{ maxWidth: '40rem' }}>
          <Stack gap={4} style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3rem)' }}>EXPERIENCE TOMIS</h2>
            <Text type="body" color="secondary">Discover the shirt that changes the way you dress.</Text>
            <Link href="/shop"><Button label="SHOP THE COLLECTION" /></Link>
          </Stack>
        </Center>
      </Section>
    </div>
  );
}
