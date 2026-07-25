import Link from 'next/link';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Center } from '@astryxdesign/core/Center';
import { Stack } from '@astryxdesign/core/Stack';

export default function NotFound() {
  return (
    <Section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <Center>
        <Stack gap={6} style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '8rem', lineHeight: 0.9, color: 'var(--text-primary)', opacity: 0.1 }}>404</p>
          <div>
            <h1 style={{ fontFamily: 'var(--font-dm-serif), var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem' }}>Page Not Found</h1>
            <Text type="body" color="secondary">The page you&apos;re looking for doesn&apos;t exist or has been moved.</Text>
          </div>
          <Stack direction="horizontal" gap={3} style={{ justifyContent: 'center' }}>
            <Link href="/"><Button label="BACK TO HOME" /></Link>
            <Link href="/shop"><Button label="SHOP NOW" variant="secondary" /></Link>
          </Stack>
        </Stack>
      </Center>
    </Section>
  );
}
