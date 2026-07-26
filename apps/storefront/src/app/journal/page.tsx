'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Stack } from '@astryxdesign/core/Stack';
import { Badge } from '@astryxdesign/core/Badge';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { fadeIn } from '@/lib/animations';

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
    <div>
      <Section variant="transparent" style={{ padding: '5rem 0', backgroundColor: 'var(--inverted)', color: 'var(--inverted-text)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: 'var(--inverted-text-muted)' }}>Stories & Style</span>
          <h1 className="section-title" style={{ color: 'white' }}>JOURNAL</h1>
          <Text type="body" style={{ color: 'var(--inverted-text-muted)' }}>Stories about style, craft, and the Tomis way of dressing.</Text>
        </div>
      </Section>

      <Section variant="transparent" className="section-spacing">
        <div className="container">
          {/* Featured Article */}
          <motion.div {...fadeIn}>
            <Link href={`/journal/${articles[0].id}`} style={{ textDecoration: 'none' }}>
              <Grid columns={2} gap={8} style={{ alignItems: 'center', marginBottom: '4rem' }}>
                <div style={{ aspectRatio: '4/3', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden' }}>
                  <img src={articles[0].image} alt={articles[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Stack gap={3}>
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
                <Link href={`/journal/${article.id}`} style={{ textDecoration: 'none' }}>
                  <ClickableCard label={article.title}>
                    <div style={{ aspectRatio: '4/3', backgroundColor: 'var(--bg-elevated)', overflow: 'hidden', marginBottom: '1rem' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
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
        </div>
      </Section>
    </div>
  );
}
