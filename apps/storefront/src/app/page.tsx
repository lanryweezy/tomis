'use client';
import dynamic from 'next/dynamic';
import { Skeleton } from '@astryxdesign/core/Skeleton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Hero from '@/components/home/Hero';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import FeaturedProducts from '@/components/home/FeaturedProducts';

const EditorialHero = dynamic(() => import('@/components/home/EditorialHero'), { loading: () => <Skeleton height="80vh" radius="none" /> });
const ColourGrid = dynamic(() => import('@/components/home/ColourGrid'), { loading: () => <Skeleton height={400} radius="none" /> });
const BentoGrid = dynamic(() => import('@/components/home/BentoGrid'), { loading: () => <Skeleton height={600} radius="none" /> });
const Philosophy = dynamic(() => import('@/components/home/Philosophy'), { loading: () => <Skeleton height={300} radius="none" /> });
const CTA = dynamic(() => import('@/components/home/CTA'), { loading: () => <Skeleton height={300} radius="none" /> });

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
