import Link from 'next/link';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';

export interface InfoSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
}

export default function InfoPage({ eyebrow, title, intro, sections }: InfoPageProps) {
  return (
    <Section variant="transparent" className="section-spacing">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        <Stack gap={8}>
          <header>
            <Text type="label" color="secondary" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>{eyebrow}</Text>
            <h1 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: 'clamp(2.5rem, 7vw, 4rem)', lineHeight: 1.05, marginTop: '0.75rem' }}>{title}</h1>
            <Text type="body" color="secondary" style={{ marginTop: '1rem', lineHeight: 1.7 }}>{intro}</Text>
          </header>

          <Stack gap={6}>
            {sections.map(section => (
              <section key={section.title}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '0.9rem' }}>{section.title}</h2>
                <Stack gap={3}>
                  {section.paragraphs?.map(paragraph => (
                    <Text key={paragraph} type="body" color="secondary" style={{ lineHeight: 1.75 }}>{paragraph}</Text>
                  ))}
                  {section.items && (
                    <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                      {section.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </Stack>
              </section>
            ))}
          </Stack>

          <nav aria-label="Helpful Tomis links" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <Stack direction="horizontal" gap={4} style={{ flexWrap: 'wrap' }}>
              <Link href="/shop" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Shop the collection</Link>
              <Link href="/support" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Contact support</Link>
            </Stack>
          </nav>
        </Stack>
      </div>
    </Section>
  );
}
