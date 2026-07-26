'use client';
import { motion } from 'framer-motion';
import { Section } from '@astryxdesign/core/Section';
import { Center } from '@astryxdesign/core/Center';
import { Text } from '@astryxdesign/core/Text';
import { fadeIn } from '@/lib/animations';

export default function Philosophy() {
  return (
    <Section variant="transparent" className="section-spacing" style={{ backgroundColor: 'var(--inverted)', color: 'var(--inverted-text)' }}>
      <motion.div {...fadeIn} style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-cormorant), var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.3, fontStyle: 'italic', color: 'var(--inverted-text)', opacity: 0.9 }}>
          &ldquo;The world is full of choices. Your closet doesn&apos;t have to be.&rdquo;
        </p>
        <div style={{ width: '3rem', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)', margin: '2rem auto' }} />
        <Text type="label" style={{ color: 'var(--inverted-text-muted)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.65rem' }}>The Tomis Philosophy</Text>
      </motion.div>
    </Section>
  );
}
