'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { products, formatPrice } from '@/data/products';

const fadeIn = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' } as const, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } };
const stagger = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const };

function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg)' }}>
      <div style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', overflow: 'hidden' }}>
        <motion.img
          src="/images/hero/hero-white-office.jpg"
          alt="Man wearing Tomis half-collar shirt"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg) 0%, transparent 30%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', width: '100%' }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>
          The Signature Collection
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-display" style={{ maxWidth: '600px' }}>
          HALF THE COLLAR.<br />
          <span style={{ color: 'var(--accent)' }}>ALL THE CHARACTER.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '440px', marginTop: '1.5rem', lineHeight: 1.7 }}>
          The signature Tomis half-collar shirt. Designed to move effortlessly between work, leisure and everything in between.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', height: '3.25rem', padding: '0 2rem', backgroundColor: 'var(--text-primary)', color: 'var(--bg)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textDecoration: 'none', transition: 'all 0.3s ease' }}>
            SHOP NOW →
          </Link>
          <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', height: '3.25rem', padding: '0 2rem', border: '1px solid var(--border-strong)', color: 'var(--text-primary)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textDecoration: 'none', transition: 'all 0.3s ease' }}>
            DISCOVER TOMIS
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ width: '1px', height: '48px', backgroundColor: 'var(--border-strong)', position: 'relative', overflow: 'hidden' }}>
          <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: '100%', height: '50%', backgroundColor: 'var(--text-primary)' }} />
        </div>
      </motion.div>
    </section>
  );
}

function MarqueeStrip() {
  return (
    <div style={{ overflow: 'hidden', padding: '1.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="marquee">
        <div className="marquee-content" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {['PREMIUM FABRICS', 'CLEAN DESIGN', 'FAST DELIVERY', 'MADE IN LAGOS', 'FREE RETURNS', 'SECURE PAYMENT'].map((item, i) => (
            <span key={i} style={{ padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
              {item}
            </span>
          ))}
          {['PREMIUM FABRICS', 'CLEAN DESIGN', 'FAST DELIVERY', 'MADE IN LAGOS', 'FREE RETURNS', 'SECURE PAYMENT'].map((item, i) => (
            <span key={`d-${i}`} style={{ padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedProducts() {
  const featured = products.slice(0, 4);
  return (
    <section className="section-editorial" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
      <motion.div {...fadeIn} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>New Arrivals</p>
          <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>THE SIGNATURE</h2>
        </div>
        <Link href="/shop" className="link-underline" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--text-primary)', textDecoration: 'none' }}>VIEW ALL →</Link>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'clamp(1rem, 3vw, 2rem)' }}>
        {featured.map((product, index) => {
          const variant = product.variants[0];
          const img = variant.images.find(i => i.type === 'product');
          return (
            <motion.div key={product.id} {...stagger} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <Link href={`/products/${product.slug}`} className="card-lift" style={{ display: 'block', textDecoration: 'none' }}>
                <div className="img-hover" style={{ aspectRatio: '3/4', backgroundColor: 'var(--bg-elevated)', marginBottom: '1rem' }}>
                  <img src={img?.src || variant.images[0]?.src} alt={img?.alt || product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{variant.color}</p>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{product.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{formatPrice(variant.price)}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function EditorialHero() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh', overflow: 'hidden' }}>
      <motion.div initial={{ x: '-100%' }} whileInView={{ x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} style={{ backgroundColor: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.95, color: 'var(--inverted-text)' }}>
            ONE SHIRT.<br />MANY LIVES.
          </h2>
        </div>
      </motion.div>
      <motion.div initial={{ x: '100%' }} whileInView={{ x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/images/lifestyle/olive-glasses.jpg" alt="Tomis lifestyle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
    </section>
  );
}

function ColourGrid() {
  const colours = [
    { name: 'BLACK', sub: 'The Essential', bg: '#101114' },
    { name: 'NAVY', sub: 'The Classic', bg: '#0B1F5E' },
    { name: 'OLIVE', sub: 'The Natural', bg: '#7A8065' },
    { name: 'PINK', sub: 'The Unexpected', bg: '#D4A5A5' },
    { name: 'BROWN', sub: 'The Warmth', bg: '#8B6F47' },
  ];
  return (
    <section className="section-editorial" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
      <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Shop by Colour</p>
        <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>CHOOSE YOUR MOOD.</h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px', backgroundColor: 'var(--border)' }}>
        {colours.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
            <Link href="/shop" style={{ display: 'block', aspectRatio: '3/4', backgroundColor: c.bg, position: 'relative', textDecoration: 'none', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <h3 className="font-display" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', marginBottom: '0.25rem', color: 'white' }}>{c.name}</h3>
                <p style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{c.sub}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="section-editorial" style={{ backgroundColor: 'var(--inverted)', color: 'var(--inverted-text)' }}>
      <motion.div {...fadeIn} style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <p className="font-serif" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.3, fontStyle: 'italic', color: 'var(--inverted-text)', opacity: 0.9 }}>
          &ldquo;The world is full of choices. Your closet doesn&apos;t have to be.&rdquo;
        </p>
        <div style={{ width: '3rem', height: '1px', backgroundColor: 'var(--accent)', margin: '2rem auto' }} />
        <p style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--inverted-text-muted)' }}>The Tomis Philosophy</p>
      </motion.div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section className="section-editorial" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: 'auto auto', gap: '1px', backgroundColor: 'var(--border)' }}>
        <motion.div {...fadeIn} style={{ gridRow: '1 / 3', backgroundColor: 'var(--bg)', padding: 'clamp(2rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>Our Signature</p>
          <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>THE HALF-COLLAR</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '400px', marginBottom: '2rem' }}>
            Our signature mandarin collar design delivers clean lines and modern confidence. One silhouette, infinite possibilities.
          </p>
          <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', height: '3rem', padding: '0 1.5rem', backgroundColor: 'var(--text-primary)', color: 'var(--bg)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textDecoration: 'none', width: 'fit-content', transition: 'all 0.3s' }}>
            SHOP HALF-COLLAR →
          </Link>
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="img-hover" style={{ backgroundColor: 'var(--bg-elevated)', overflow: 'hidden' }}>
          <img src="/images/products/olive-front.jpg" alt="Olive half-collar shirt" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="img-hover" style={{ backgroundColor: 'var(--bg-elevated)', overflow: 'hidden' }}>
          <img src="/images/lifestyle/white-office.jpg" alt="Tomis lifestyle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section-editorial" style={{ textAlign: 'center' }}>
      <motion.div {...fadeIn}>
        <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>EXPERIENCE TOMIS</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Discover the shirt that changes the way you dress.</p>
        <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', height: '3.25rem', padding: '0 2rem', backgroundColor: 'var(--text-primary)', color: 'var(--bg)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textDecoration: 'none', transition: 'all 0.3s' }}>
          SHOP THE COLLECTION →
        </Link>
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  useScrollReveal();
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <FeaturedProducts />
      <EditorialHero />
      <ColourGrid />
      <BentoGrid />
      <Philosophy />
      <CTA />
    </>
  );
}
