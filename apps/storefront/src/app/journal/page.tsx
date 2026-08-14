'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Stack } from '@astryxdesign/core/Stack';
import { Badge } from '@astryxdesign/core/Badge';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { fadeIn } from '@/lib/animations';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import '@astryxdesign/theme-neutral/theme.css';

const articles = [
  {
    id: 'the-half-collar-story',
    title: 'The Half-Collar Story',
    excerpt: 'How a simple design idea became the Tomis signature.',
    date: 'January 2025',
    readTime: '5 min read',
    category: 'Brand',
    image: '/images/products/olive-front.jpg',
  },
  {
    id: 'dressing-in-lagos',
    title: 'Dressing in Lagos: A Style Guide',
    excerpt: 'From business meetings to weekend brunches — how to navigate Lagos style.',
    date: 'February 2025',
    readTime: '8 min read',
    category: 'Style',
    image: '/images/lifestyle/olive-glasses.jpg',
  },
  {
    id: 'cotton-quality',
    title: 'Why We Choose Premium Cotton',
    excerpt: 'The fabric behind the half-collar. 140 GSM of pure comfort.',
    date: 'March 2025',
    readTime: '4 min read',
    category: 'Craft',
    image: '/images/editorial/craft-tools.jpg',
  },
  {
    id: 'one-shirt-many-places',
    title: 'One Shirt, Many Places',
    excerpt: 'Five Tomis customers. Five different ways to wear the same shirt.',
    date: 'April 2025',
    readTime: '6 min read',
    category: 'Stories',
    image: '/images/lifestyle/white-office.jpg',
  },
  {
    id: 'made-in-lagos',
    title: 'Made in Lagos',
    excerpt: 'The artisans behind every Tomis shirt. A look inside our workshop.',
    date: 'May 2025',
    readTime: '7 min read',
    category: 'Behind the Scenes',
    image: '/images/lifestyle/tan-waterfront.jpg',
  },
  {
    id: 'capsule-wardrobe',
    title: 'The Tomis Capsule Wardrobe',
    excerpt: 'Build a complete wardrobe with just 5 pieces.',
    date: 'June 2025',
    readTime: '5 min read',
    category: 'Style',
    image: '/images/lifestyle/black-office.jpg',
  },
];

export default function JournalPage() {
  return (
    <>
      <Theme theme={neutralTheme} mode="dark">
        <Section variant="section" style={{ padding: '5rem 0' }}>
          <Stack gap={3} align="center" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', textAlign: 'center' }}>
            <Badge label="Stories & Style" />
            <Text type="display-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 0.9 }}>JOURNAL</Text>
            <Text type="body" color="secondary">Stories about style, craft, and the Tomis way of dressing.</Text>
          </Stack>
        </Section>
      </Theme>

      <Section variant="section" className="section-spacing">
        <Stack style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
          {/* Featured Article */}
          <motion.div {...fadeIn}>
            <Link href={`/journal/${articles[0].id}`} className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-4" style={{ textDecoration: 'none' }}>
              <Grid columns={2} gap={8} style={{ alignItems: 'center', marginBottom: '4rem' }}>
                <Stack style={{ aspectRatio: '4/3', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden', position: 'relative' }}>
                  <Image src={articles[0].image} alt={articles[0].title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
                </Stack>
                <Stack gap={3} align="start">
                  <Badge label={`${articles[0].category} • ${articles[0].date}`} />
                  <h2 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text-primary)' }}>
                    {articles[0].title}
                  </h2>
                  <Text type="body" color="secondary">{articles[0].excerpt}</Text>
                  <Text type="supporting" color="secondary">{articles[0].readTime}</Text>
                </Stack>
              </Grid>
            </Link>
          </motion.div>

          {/* Articles Grid */}
          <Grid columns={3} gap={6}>
            {articles.slice(1).map((article, index) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Link href={`/journal/${article.id}`} className="focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] focus-visible:outline-offset-4" style={{ textDecoration: 'none' }}>
                  <ClickableCard label={article.title}>
                    <Stack style={{ aspectRatio: '4/3', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
                      <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                    </Stack>
                    <Badge label={article.category} />
                    <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                      {article.title}
                    </h3>
                    <Text type="supporting" color="secondary">{article.excerpt}</Text>
                    <Text type="supporting" color="secondary" style={{ marginTop: '0.5rem' }}>
                      {article.date} • {article.readTime}
                    </Text>
                  </ClickableCard>
                </Link>
              </motion.div>
            ))}
          </Grid>
        </Stack>
      </Section>
    </>
  );
}
