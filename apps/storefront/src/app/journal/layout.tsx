import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Stories about style, craft, and the Tomis way of dressing.',
  alternates: {
    canonical: 'https://tomis.fit/journal',
  }
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
