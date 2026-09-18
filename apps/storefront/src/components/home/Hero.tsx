'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Badge } from '@astryxdesign/core/Badge';

export default function Hero() {
  return (
    <Section className="hero-section" style={{ minHeight: 'calc(100svh - 5rem)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: 'clamp(2rem, 5vw, 5rem) 0' }}>
      <div className="hero-image" style={{ position: 'absolute', right: 0, top: 0, width: '57%', height: '100%', overflow: 'hidden' }}>
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src="/images/hero/hero-white-office.jpg"
            alt="Man wearing Tomis half-collar shirt in a modern office setting"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 57vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 80%, transparent) 13%, transparent 54%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, color-mix(in srgb, var(--bg) 18%, transparent), transparent 40%)' }} />
      </div>

      <Stack gap={5} style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', width: '100%' }}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}>
          <Badge label="The Signature Collection · ₦28,000" />
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="section-title" style={{ maxWidth: '680px', fontSize: 'clamp(3.25rem, 8vw, 7rem)', lineHeight: 0.88, letterSpacing: '-0.045em' }}>
          THE SHIRT<br />
          <span style={{ color: 'var(--accent)' }}>YOU LIVE IN.</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }} style={{ maxWidth: '420px' }}>
          <Text type="body" color="secondary" style={{ lineHeight: 1.7 }}>
            A modern half-collar shirt, cut in premium cotton and designed to move with you from first meeting to last light.
          </Text>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.6 }}>
          <Stack direction="horizontal" gap={3} style={{ flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn-primary">SHOP THE SIGNATURE →</Link>
            <Link href="#signature-edit" className="btn-secondary">SEE THE COLOURS</Link>
          </Stack>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.92, duration: 0.6 }}>
          <Stack direction="horizontal" gap={4} style={{ flexWrap: 'wrap', alignItems: 'center' }}>
            <Text type="supporting" weight="medium">₦28,000</Text>
            <Text type="supporting" color="secondary">5 signature colours</Text>
            <Text type="supporting" color="secondary">Made in Lagos</Text>
          </Stack>
        </motion.div>
      </Stack>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)' }} aria-hidden="true">
        <div style={{ width: '1px', height: '42px', backgroundColor: 'var(--border-strong)', position: 'relative', overflow: 'hidden' }}>
          <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: '100%', height: '50%', backgroundColor: 'var(--text-primary)' }} />
        </div>
      </motion.div>
    </Section>
  );
}
