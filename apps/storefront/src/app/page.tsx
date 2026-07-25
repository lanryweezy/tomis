'use client';
import dynamic from 'next/dynamic';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Hero from '@/components/home/Hero';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import FeaturedProducts from '@/components/home/FeaturedProducts';

const EditorialHero = dynamic(() => import('@/components/home/EditorialHero'), { loading: () => <div style={{ minHeight: '80vh', backgroundColor: 'var(--bg-elevated)' }} /> });
const ColourGrid = dynamic(() => import('@/components/home/ColourGrid'), { loading: () => <div style={{ height: '400px' }} /> });
const BentoGrid = dynamic(() => import('@/components/home/BentoGrid'), { loading: () => <div style={{ height: '600px' }} /> });
const Philosophy = dynamic(() => import('@/components/home/Philosophy'), { loading: () => <div style={{ height: '300px' }} /> });
const CTA = dynamic(() => import('@/components/home/CTA'), { loading: () => <div style={{ height: '300px' }} /> });

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
