'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Badge } from '@astryxdesign/core/Badge';
import { Center } from '@astryxdesign/core/Center';
import { Stack } from '@astryxdesign/core/Stack';
import { fadeIn } from '@/lib/animations';
import { colourGrid } from '@/data/constants';

export default function ColourGrid() {
  return (
    <Section variant="transparent" className="section-spacing">
      <div className="container">
        <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-eyebrow">Shop by Colour</span>
          <h2 className="section-title">CHOOSE YOUR MOOD.</h2>
        </motion.div>
        <Grid columns={5} gap={2}>
          {colourGrid.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <Link href={`/shop?collection=${c.slug}`} aria-label={`Shop ${c.name.toLowerCase()} Tomis shirts`} style={{ display: 'block', aspectRatio: '3/4', backgroundColor: c.bg, position: 'relative', textDecoration: 'none', overflow: 'hidden' }}>
                <Center style={{ position: 'absolute', inset: 0 }}>
                  <Stack gap={1} style={{ textAlign: 'center' }}>
                    <h3 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', color: 'white' }}>{c.name}</h3>
                    <Text type="label" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.6rem' }}>{c.sub}</Text>
                  </Stack>
                </Center>
              </Link>
            </motion.div>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
