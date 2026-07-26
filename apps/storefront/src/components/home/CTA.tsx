'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { fadeIn } from '@/lib/animations';

export default function CTA() {
  return (
    <Section variant="transparent" className="section-spacing" style={{ textAlign: 'center' }}>
      <motion.div {...fadeIn}>
        <Stack gap={4} style={{ alignItems: 'center' }}>
          <h2 className="section-title">EXPERIENCE TOMIS</h2>
          <Text type="body" color="secondary">Discover the shirt that changes the way you dress.</Text>
          <Link href="/shop" className="btn-primary">SHOP THE COLLECTION →</Link>
        </Stack>
      </motion.div>
    </Section>
  );
}
