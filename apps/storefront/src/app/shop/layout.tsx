import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Shirts',
  description: 'Shop the complete collection of Tomis half-collar shirts. 14 colors. One signature silhouette.',
  alternates: {
    canonical: 'https://tomis.fit/shop',
  }
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
