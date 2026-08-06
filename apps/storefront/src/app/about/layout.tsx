import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'The story behind Tomis and the half-collar shirt. A global fashion brand born in Lagos.',
  alternates: {
    canonical: 'https://tomis.fit/about',
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
