'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { fadeIn } from '@/lib/animations';

export default function CTA() {
  return (
    <Section style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', textAlign: 'center' }}>
      <motion.div {...fadeIn}>
        <Stack gap={4} style={{ alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.9, letterSpacing: '-0.03em' }}>EXPERIENCE TOMIS</h2>
          <Text type="body" color="secondary">Discover the shirt that changes the way you dress.</Text>
          <Link href="/shop"><Button label="SHOP THE COLLECTION →" /></Link>
        </Stack>
      </motion.div>
    </Section>
  );
}
