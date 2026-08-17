'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Badge } from '@astryxdesign/core/Badge';
import { fadeIn } from '@/lib/animations';

export default function Hero() {
  return (
    <Section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', overflow: 'hidden' }}>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src="/images/hero/hero-white-office.jpg"
            alt="Man wearing Tomis half-collar shirt in a modern office setting"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg) 0%, transparent 30%)' }} />
      </div>

      <Stack gap={4} style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', width: '100%' }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <Badge label="The Signature Collection" />
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="section-title" style={{ maxWidth: '600px', fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
          HALF THE COLLAR.<br />
          <span style={{ color: 'var(--accent)' }}>ALL THE CHARACTER.</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} style={{ maxWidth: '440px' }}>
          <Text type="body" color="secondary" style={{ lineHeight: 1.7 }}>
            The signature Tomis half-collar shirt. Designed to move effortlessly between work, leisure and everything in between.
          </Text>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}>
          <Stack direction="horizontal" gap={3}>
            <Link href="/shop" className="btn-primary">SHOP THE SIGNATURE →</Link>
            <Link href="/shop?color=black" className="btn-secondary">EXPLORE COLOURS</Link>
          </Stack>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: 0.6 }}>
          <Stack direction="horizontal" gap={4} style={{ flexWrap: 'wrap', alignItems: 'center' }}>
            <Text type="supporting" color="secondary">₦35,000</Text>
            <Text type="supporting" color="secondary">5 signature colours</Text>
            <Text type="supporting" color="secondary">Made in Lagos</Text>
          </Stack>
        </motion.div>
      </Stack>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ width: '1px', height: '48px', backgroundColor: 'var(--border-strong)', position: 'relative', overflow: 'hidden' }}>
          <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: '100%', height: '50%', backgroundColor: 'var(--text-primary)' }} />
        </div>
      </motion.div>
    </Section>
  );
}
