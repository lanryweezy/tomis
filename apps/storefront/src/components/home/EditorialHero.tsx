'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Center } from '@astryxdesign/core/Center';
import { slideInLeft, slideInRight } from '@/lib/animations';

export default function EditorialHero() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh', overflow: 'hidden' }}>
      <motion.div {...slideInLeft} style={{ backgroundColor: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
        <Center>
          <h2 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.95, color: 'var(--inverted-text)', textAlign: 'center' }}>
            ONE SHIRT.<br />MANY LIVES.
          </h2>
        </Center>
      </motion.div>
      <motion.div {...slideInRight} style={{ position: 'relative', overflow: 'hidden' }}>
        <Image src="/images/lifestyle/olive-glasses.jpg" alt="Man wearing Tomis olive half-collar shirt with glasses in modern setting" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </motion.div>
    </section>
  );
}
