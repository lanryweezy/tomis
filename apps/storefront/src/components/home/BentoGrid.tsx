'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Badge } from '@astryxdesign/core/Badge';
import { fadeIn } from '@/lib/animations';

export default function BentoGrid() {
  return (
    <Section className="section-spacing">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: 'auto auto', gap: '1px', backgroundColor: 'var(--border)' }}>
          <motion.div {...fadeIn} style={{ gridRow: '1 / 3', backgroundColor: 'var(--bg)', padding: 'clamp(2rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Stack gap={4}>
              <span className="section-eyebrow">Our Signature</span>
              <h2 className="section-title">THE HALF-COLLAR</h2>
              <Text type="body" color="secondary" style={{ lineHeight: 1.7, maxWidth: '400px' }}>
                Our signature mandarin collar design delivers clean lines and modern confidence. One silhouette, infinite possibilities.
              </Text>
              <Link href="/shop" className="btn-primary">SHOP HALF-COLLAR →</Link>
            </Stack>
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="img-hover" style={{ backgroundColor: 'var(--bg-elevated)', overflow: 'hidden' }}>
            <img src="/images/products/olive-front.jpg" alt="Olive green Tomis half-collar shirt flat lay product photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="img-hover" style={{ backgroundColor: 'var(--bg-elevated)', overflow: 'hidden' }}>
            <img src="/images/lifestyle/white-office.jpg" alt="Man wearing Tomis white half-collar shirt in modern office" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
