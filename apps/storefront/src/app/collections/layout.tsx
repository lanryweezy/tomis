import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore curated groupings of our half-collar shirts, organized by mood and style.',
  alternates: {
    canonical: 'https://tomis.fit/collections',
  }
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
