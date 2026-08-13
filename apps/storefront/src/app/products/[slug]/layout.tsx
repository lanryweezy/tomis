import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const images = product.variants[0]?.images.map(img => `https://tomis.fit${img.src}`) || [];

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: {
      canonical: `https://tomis.fit/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | TOMIS`,
      description: product.shortDescription,
      url: `https://tomis.fit/products/${product.slug}`,
      images: images.map(url => ({
        url,
        alt: product.name,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | TOMIS`,
      description: product.shortDescription,
      images: images,
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
