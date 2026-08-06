import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Terms of service, privacy policy, and other legal information for Tomis.',
  alternates: {
    canonical: 'https://tomis.fit/legal',
  }
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
